"use client";

import { Table } from "antd";

export default function DataTable({
  columns,
  data = [],
  loading = false,
  pagination = {},
  onChange,
  rowKey = "_id",
}) {
  return (
    <Table
      rowKey={rowKey}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        current: pagination?.page ?? 1,
        pageSize: pagination?.limit ?? 10,
        total: pagination?.total ?? 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
      }}
      onChange={onChange}
      scroll={{ x: "max-content" }}
    />
  );
}