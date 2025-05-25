import PageHead from "@/components/commons/PageHead";
import React, { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@nextui-org/react";

interface PropTypes {
  children: ReactNode;
  title?: string;
  type?: string;
  description?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, title, description, type = "admin" } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            position="static"
            classNames={{ wrapper: "p-0" }}
            isMenuOpen={open}
            onMenuOpenChange={setOpen}
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle className="lg:hidden"></NavbarMenuToggle>
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
