"use client";

import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <Input
      allowClear
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: 300,
      }}
    />
  );
}