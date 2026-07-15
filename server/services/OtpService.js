import crypto from "crypto";

import redis from "../config/redis.js";
import ApiError from "../utils/ApiError.js";
import generateOTP from "../utils/generateOTP.js";
import EmailService from "./EmailService.js";

const OTP_EXPIRY = 300; 
const VERIFIED_EXPIRY = 300; 
const COOLDOWN = 60; 
const MAX_ATTEMPTS = 5;

class OtpService {
  normalizeEmail(email) {
    return email.trim().toLowerCase();
  }

  hashOTP(otp) {
    return crypto.createHash("sha256").update(otp).digest("hex");
  }

  otpKey(purpose, email) {
    return `auth:${purpose}:otp:${email}`;
  }

  cooldownKey(purpose, email) {
    return `auth:${purpose}:cooldown:${email}`;
  }

  verifiedKey(purpose, email) {
    return `auth:${purpose}:verified:${email}`;
  }

  attemptsKey(purpose, email) {
    return `auth:${purpose}:attempts:${email}`;
  }

  async sendOTP(email, purpose) {
    email = this.normalizeEmail(email);

    const cooldown = await redis.get(
      this.cooldownKey(purpose, email)
    );

    if (cooldown) {
      throw new ApiError(
        429,
        "Please wait before requesting another OTP."
      );
    }

    const otp = generateOTP();
    const hashedOTP = this.hashOTP(otp);

    await redis
      .multi()
      .set(this.otpKey(purpose, email), hashedOTP, {
        ex: OTP_EXPIRY,
      })
      .set(this.cooldownKey(purpose, email), "true", {
        ex: COOLDOWN,
      })
      .set(this.attemptsKey(purpose, email), "0", {
        ex: OTP_EXPIRY,
      })
      .exec();

    await EmailService.sendMail({
      to: email,
      subject: "Artkaar Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
          <h2>Artkaar</h2>

          <p>Your verification code is</p>

          <h1 style="letter-spacing:6px;">${otp}</h1>

          <p>This OTP will expire in <strong>5 minutes</strong>.</p>

          <p>If you didn't request this OTP, you can safely ignore this email.</p>
        </div>
      `,
    });

    return true;
  }

  async verifyOTP(email, otp, purpose) {
    email = this.normalizeEmail(email);

    const storedOTP = await redis.get(
      this.otpKey(purpose, email)
    );

    if (!storedOTP) {
      throw new ApiError(
        400,
        "OTP expired. Please request a new OTP."
      );
    }

    let attempts = Number(
      (await redis.get(
        this.attemptsKey(purpose, email)
      )) || 0
    );

    if (attempts >= MAX_ATTEMPTS) {
      await this.clearOTP(email, purpose);

      throw new ApiError(
        429,
        "Maximum OTP attempts exceeded. Please request a new OTP."
      );
    }

    const hashedOTP = this.hashOTP(otp);

    if (hashedOTP !== storedOTP) {
      await redis.incr(
        this.attemptsKey(purpose, email)
      );

      throw new ApiError(
        400,
        "Invalid OTP"
      );
    }

    await redis
      .multi()
      .set(this.verifiedKey(purpose, email), "true", {
        ex: VERIFIED_EXPIRY,
      })
      .del(this.otpKey(purpose, email))
      .del(this.attemptsKey(purpose, email))
      .exec();

    return true;
  }

  async isVerified(email, purpose) {
    email = this.normalizeEmail(email);

    return await redis.get(
      this.verifiedKey(purpose, email)
    );
  }

  async clearOTP(email, purpose) {
    email = this.normalizeEmail(email);

    await redis
      .multi()
      .del(this.otpKey(purpose, email))
      .del(this.cooldownKey(purpose, email))
      .del(this.attemptsKey(purpose, email))
      .del(this.verifiedKey(purpose, email))
      .exec();
  }
}

export default new OtpService();