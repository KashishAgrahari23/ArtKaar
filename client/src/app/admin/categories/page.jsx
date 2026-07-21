"use client";

import { useMemo, useState } from "react";

import { PlusOutlined } from "@ant-design/icons";

import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";

import CategoryDrawer from "@/components/admin/category/CategoryDrawer";
import categoryColumns from "@/components/admin/category/categoryColumns";

import useCategories from "@/hooks/useCategories";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const {
    categories,
    pagination,
    isLoading,
    create,
    update,
    remove,
    restore,
  } = useCategories({
    page,
    limit,
    search,
  });

  const columns = useMemo(
    () =>
      categoryColumns({
        onEdit: (category) => {
          setSelectedCategory(category);
          setDrawerOpen(true);
        },

        onDelete: (id) => remove.mutate(id),

        onRestore: (id) => restore.mutate(id),
      }),
    [remove, restore]
  );

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setDrawerOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Categories"
        buttonText="Add Category"
        buttonIcon={<PlusOutlined />}
        onButtonClick={handleCreate}
      />

      <div className="flex justify-between mb-5">
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          placeholder="Search category..."
        />
      </div>

      <DataTable
        columns={columns}
        data={categories}
        loading={isLoading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <CategoryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        category={selectedCategory}
        categories={categories}
        createMutation={create}
        updateMutation={update}
      />
    </>
  );
}