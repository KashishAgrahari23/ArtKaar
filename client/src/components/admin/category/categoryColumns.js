import { Button, Space, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

import DeleteConfirm from "@/components/common/DeleteConfirm";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function categoryColumns({
  onEdit,
  onDelete,
  onRestore,
}) {
  return [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) =>
        a.name.localeCompare(b.name),
    },

    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) =>
        text || "-",
    },

    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag
          color={
            record.isActive
              ? "success"
              : "error"
          }
        >
          {record.isActive
            ? "Active"
            : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: formatDate,
    },

    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            icon={<EditOutlined />}
            onClick={() =>
              onEdit(record)
            }
          />

          {record.deletedAt ? (
            <Button
              type="primary"
              icon={<RollbackOutlined />}
              onClick={() =>
                onRestore(record._id)
              }
            />
          ) : (
            <DeleteConfirm
              title="Delete Category?"
              description="Category can be restored later."
              onConfirm={() =>
                onDelete(record._id)
              }
            >
              <Button
                danger
                icon={<DeleteOutlined />}
              />
            </DeleteConfirm>
          )}
        </Space>
      ),
    },
  ];
}