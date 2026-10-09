"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "@/lib/account-store";
import { cn, formatLongDate } from "@/lib/utils";
import { useAccountReady } from "@/hooks/use-hydrated";
import { initials } from "@/components/dashboard/ui";

const links = [
  { href: "/dashboard/bookings", label: "My Bookings", icon: Ticket },
  { href: "/dashboard/events", label: "Browse Events", icon: CalendarDays },
  { href: "/dashboard/saved", label: "Saved", icon: Heart },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const tabs = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Bookings", icon: Ticket },
  { href: "/dashboard/events", label: "Events", icon: CalendarDays },
  { href: "/dashboard/saved", label: "Saved", icon: Heart },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const ready = useAccountReady();
  const theme = useAccount((state) => state.theme);
  const signedIn = useAccount((state) => state.signedIn);
  const collapsed = useAccount((state) => state.sidebarCollapsed);
  const toggleSidebar = useAccount((state) => state.toggleSidebar);
  const signOut = useAccount((state) => state.signOut);
  const profile = useAccount((state) => state.profile);
  const notices = useAccount((state) => state.notices);
  const markNoticeRead = useAccount((state) => state.markNoticeRead);
  const markAllNoticesRead = useAccount((state) => state.markAllNoticesRead);
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const unread = notices.filter((notice) => !notice.read).length;

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    };
  }, [ready, theme]);

  useEffect(() => {
    if (ready && !signedIn) router.replace("/login");
  }, [ready, router, signedIn]);

  useEffect(() => {
    setMenuOpen(false);
    setNoticesOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setNoticesOpen(false);
        setProfileOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setNoticesOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const logout = () => {
    signOut();
    toast.success("You have been signed out");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-slate-900 dark:bg-[#0c0e14] dark:text-slate-100">
      <div className="lg:flex">
        <aside
          className={cn(
            "sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-xl transition-[width] duration-300 dark:border-white/10 dark:bg-[#12141b]/95 lg:flex",
            collapsed ? "w-[84px]" : "w-[260px]",
          )}
        >
          <Link href="/dashboard" className={cn("flex h-[72px] items-center", collapsed ? "justify-center px-2" : "px-4")} aria-label="Bookora dashboard">
            <Image
              src="/bookora-logo.png"
              alt="Bookora"
              width={2164}
              height={727}
              priority
              className={cn("object-contain object-left", collapsed ? "h-8 w-[68px]" : "h-[68px] w-[205px]")}
            />
          </Link>
          <nav aria-label="Account" className="flex-1 space-y-1 px-3">
            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? link.label : undefined}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600",
                    active
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5",
                    collapsed && "justify-center px-0",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {collapsed ? <span className="sr-only">{link.label}</span> : link.label}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-2 p-3">
            <button
              type="button"
              onClick={logout}
              className={cn(
                "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:text-slate-300 dark:hover:bg-rose-500/10",
                collapsed && "justify-center px-0",
              )}
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              {collapsed ? <span className="sr-only">Logout</span> : "Logout"}
            </button>
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="flex h-10 w-full items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:hover:bg-white/5"
            >
              <ChevronLeft className={cn("h-5 w-5 transition", collapsed && "rotate-180")} aria-hidden="true" />
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#12141b]/80">
            <div ref={menuRef} className="flex h-[72px] items-center gap-3 px-4 sm:px-6">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:text-slate-200 dark:hover:bg-white/10 lg:hidden"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/dashboard" className="relative lg:hidden" aria-label="Bookora dashboard">
                <Image src="/bookora-logo.png" alt="Bookora" width={2164} height={727} className="h-11 w-32 object-contain" />
              </Link>
              <div className="ml-auto flex items-center gap-1 sm:gap-2">
                <div className="relative">
                  <button
                    type="button"
                    aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
                    aria-expanded={noticesOpen}
                    aria-haspopup="dialog"
                    onClick={() => {
                      setNoticesOpen((open) => !open);
                      setProfileOpen(false);
                    }}
                    className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:text-slate-200 dark:hover:bg-white/10"
                  >
                    <Bell className="h-5 w-5" />
                    {unread > 0 ? (
                      <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                        {unread}
                      </span>
                    ) : null}
                  </button>
                  {noticesOpen ? (
                    <div role="dialog" aria-label="Notifications" className="absolute right-0 top-12 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-elevated dark:border-white/10 dark:bg-[#161922]">
                      <div className="flex items-center justify-between px-1">
                        <p className="text-sm font-bold">Notifications</p>
                        <button type="button" onClick={markAllNoticesRead} className="text-xs font-semibold text-rose-600 hover:underline">
                          Mark all read
                        </button>
                      </div>
                      <ul className="mt-2 max-h-80 space-y-1 overflow-auto">
                        {notices.length === 0 ? <li className="px-2 py-6 text-center text-sm text-slate-500">You are all caught up.</li> : null}
                        {notices.map((notice) => (
                          <li key={notice.id}>
                            <Link
                              href={notice.href}
                              onClick={() => markNoticeRead(notice.id)}
                              className={cn("block rounded-xl px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/5", !notice.read && "bg-rose-50/70 dark:bg-rose-500/10")}
                            >
                              <p className="text-sm font-semibold">{notice.title}</p>
                              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{notice.body}</p>
                              <p className="mt-1 text-[11px] text-slate-400">{formatLongDate(notice.at)}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Account menu"
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                    onClick={() => {
                      setProfileOpen((open) => !open);
                      setNoticesOpen(false);
                    }}
                    className="inline-flex h-10 items-center gap-2 rounded-xl pl-1 pr-2 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:hover:bg-white/10"
                  >
                    <Avatar name={profile.name} avatar={profile.avatar} />
                    <span className="hidden text-sm font-semibold sm:inline">{profile.name.split(" ")[0]}</span>
                  </button>
                  {profileOpen ? (
                    <div role="menu" className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-elevated dark:border-white/10 dark:bg-[#161922]">
                      <Link role="menuitem" href="/dashboard/profile" className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5">Profile</Link>
                      <Link role="menuitem" href="/dashboard/settings" className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5">Settings</Link>
                      <button role="menuitem" type="button" onClick={logout} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">Logout</button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </header>
          <div className="px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:pb-10">{!ready || signedIn ? children : <p className="text-sm text-slate-500">Signing you out…</p>}</div>
        </div>
      </div>

      <nav aria-label="Mobile account" className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#12141b]/95 lg:hidden">
        <ul className="grid grid-cols-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(pathname, tab.href);
            return (
              <li key={tab.href}>
                <Link href={tab.href} aria-current={active ? "page" : undefined} className={cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold", active ? "text-rose-600" : "text-slate-500")}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {tab.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button type="button" onClick={() => setMenuOpen(true)} className="flex h-16 w-full flex-col items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
              <Menu className="h-5 w-5" aria-hidden="true" />
              More
            </button>
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-label="Account menu"
              className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(20rem,86vw)] flex-col bg-white p-4 shadow-elevated dark:bg-[#12141b] lg:hidden"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-extrabold">Bookora</p>
                <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-4 space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href} className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/5">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <button type="button" onClick={logout} className="mt-auto flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                <LogOut className="h-5 w-5" aria-hidden="true" />
                Logout
              </button>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Avatar({ name, avatar, className }: { name: string; avatar?: string; className?: string }) {
  if (avatar) {
    return (
      <span
        role="img"
        aria-label=""
        style={{ backgroundImage: `url(${avatar})` }}
        className={cn("inline-block h-9 w-9 rounded-full bg-cover bg-center", className)}
      />
    );
  }
  return (
    <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-800 text-xs font-bold text-white", className)} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
