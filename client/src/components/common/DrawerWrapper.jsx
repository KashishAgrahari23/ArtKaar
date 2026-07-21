"use client";

import { Drawer } from "antd";

export default function DrawerWrapper({
  title,
  open,
  onClose,
  children,
  width = 500,
}) {
  return (
    <Drawer
      title={title}
      open={open}
      onClose={onClose}
      width={width}
      destroyOnClose
      maskClosable={false}
    >
      {children}
    </Drawer>
  );
}