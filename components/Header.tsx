"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background/50 backdrop-blur-md px-6 sticky top-0 z-10">
            <div>
                {/* Placeholder for Breadcrumbs or Page Title if needed */}
                <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground hidden md:block">Admin User</span>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
