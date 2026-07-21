"use client";

import { Popconfirm } from "antd";

export default function DeleteConfirm({
  title = "Delete?",
  description = "This action can be restored later.",
  onConfirm,
  children,
}) {
  return (
    <Popconfirm
      title={title}
      description={description}
      okText="Yes"
      cancelText="No"
      onConfirm={onConfirm}
    >
      {children}
    </Popconfirm>
  );
}