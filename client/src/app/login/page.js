import Logo from "@/components/common/Logo";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-between bg-[#0D3B82] p-14 text-white">

          <Logo />

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-blue-200">
              Design • Develop • Deliver
            </p>

            <h1 className="mt-5 text-6xl font-extrabold leading-tight">
              Welcome
              <br />
              Back.
            </h1>

            <p className="mt-8 max-w-md text-lg leading-8 text-blue-100">
              Login to manage your marketplace, upload
              premium digital products and monitor
              everything from one dashboard.
            </p>
          </div>

          <div className="text-blue-200 text-sm">
            © {new Date().getFullYear()} ArtKaar
          </div>
        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-8 md:p-14">

          <div className="w-full max-w-md">

            <div className="lg:hidden mb-8">
              <Logo />
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Login
            </h2>

            <p className="mt-3 text-gray-500 leading-7">
              Continue to your dashboard.
            </p>

            <div className="mt-10">
              <LoginForm />
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}