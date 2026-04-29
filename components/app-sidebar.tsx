"use client";

import * as React from "react";
import { Camera, Image as ImageIcon, LayoutDashboard, Settings, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Portfolio",
      items: [
        {
          title: "Manage Projects",
          url: "/admin/projects",
          icon: Camera,
        },
        {
          title: "Manage Frames",
          url: "/admin/frames",
          icon: ImageIcon,
        },
        {
          title: "Testimonials",
          url: "/admin/testimonials",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "General Settings",
          url: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  React.useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-6 py-4">
        <Link href="/admin" className="flex items-center gap-2 font-bold tracking-tight">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
            NP
          </div>
          <span>Admin Panel</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.url ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.url}
                      className={pathname === item.url ? "bg-accent-gold/20! text-black! font-bold hover:bg-accent-gold/30  hover:text-black" : ""}
                    >
                      <Link href={item.url}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  item.items?.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={pathname === subItem.url}
                        className={pathname === subItem.url ? "bg-accent-gold/20! text-black! font-bold hover:bg-accent-gold/30  hover:text-black" : ""}
                      >
                        <Link href={subItem.url}>
                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
