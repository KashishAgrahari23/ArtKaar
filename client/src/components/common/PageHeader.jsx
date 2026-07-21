"use client";

import { Button, Space, Typography } from "antd";

const { Title } = Typography;

export default function PageHeader({
  title,
  buttonText,
  onButtonClick,
  buttonIcon,
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Title level={3} style={{ margin: 0 }}>
        {title}
      </Title>

      <Space>
        <Button
          type="primary"
          icon={buttonIcon}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Space>
    </div>
  );
}