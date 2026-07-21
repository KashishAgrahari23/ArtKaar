import { Button, Space, Tag, Tooltip } from "antd";
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
      title: "Parent Category",
      key: "parentCategory",
      render: (_, record) =>
        record.parentCategory?.name || (
          <Tag color="blue">Root</Tag>
        ),
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
      ellipsis: {
        showTitle: false,
      },
      render: (text) =>
        text ? (
          <Tooltip title={text}>
            {text}
          </Tooltip>
        ) : (
          "-"
        ),
    },

    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
      align: "center",
      width: 100,
    },

    {
      title: "Status",
      key: "status",
      width: 120,
      align: "center",
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
      width: 120,
    },

    {
      title: "Actions",
      key: "actions",
      width: 150,
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              onClick={() =>
                onEdit(record)
              }
            />
          </Tooltip>

          {record.deletedAt ? (
            <Tooltip title="Restore">
              <Button
                type="primary"
                icon={<RollbackOutlined />}
                onClick={() =>
                  onRestore(record._id)
                }
              />
            </Tooltip>
          ) : (
            <DeleteConfirm
              title="Delete Category?"
              description="Category can be restored later."
              onConfirm={() =>
                onDelete(record._id)
              }
            >
              <Tooltip title="Delete">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </DeleteConfirm>
          )}
        </Space>
      ),
    },
  ];
}