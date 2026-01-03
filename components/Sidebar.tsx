"use client";

import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    CalendarDays,
    Banknote,
    FileBarChart,
    LogOut,
    Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Users, label: "Employees", href: "/dashboard/users" },
    { icon: CalendarCheck, label: "Attendance", href: "/dashboard/attendance" },
    { icon: CalendarDays, label: "Leaves", href: "/dashboard/leaves" },
    { icon: Banknote, label: "Payroll", href: "/dashboard/payroll" },
    { icon: FileBarChart, label: "Reports", href: "/dashboard/reports" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            initial={{ width: 240 }}
            animate={{ width: isCollapsed ? 80 : 240 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative flex h-screen flex-col border-r bg-card shadow-sm z-20"
        >
            <div className="flex items-center justify-between p-4">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                        >
                            GCET HRMS
                        </motion.div>
                    )}
                </AnimatePresence>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-auto"
                >
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            <nav className="flex-1 space-y-2 p-2">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className="block group">
                            <div
                                className={cn(
                                    "flex items-center gap-x-3 rounded-lg px-3 py-2 transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="h-5 w-5 mr-2" />
                    {!isCollapsed && <span>Logout</span>}
                </Button>
            </div>
        </motion.aside>
    );
}
