"use client";

import * as React from "react";
import { Camera, Image as ImageIcon, LayoutDashboard, LogOut, MessageSquare, PlayCircle, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { getClientApp } from "@/lib/firebase-client";

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
    {
      title: "Help",
      items: [
        {
          title: "Video Guides",
          url: "/admin/guides",
          icon: PlayCircle,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  React.useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await fetch("/api/auth/session", {
        method: "DELETE",
      });

      const auth = getAuth(getClientApp());
      await signOut(auth);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

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
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="justify-center gap-2 bg-accent-gold text-black hover:bg-accent-hover hover:text-black disabled:opacity-60 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
