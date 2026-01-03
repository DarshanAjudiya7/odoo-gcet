import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, CalendarOff, Activity } from "lucide-react";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Attendance from "@/models/Attendance";
import Leave from "@/models/Leave";

async function getStats() {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalUsers, presentToday, pendingLeaves] = await Promise.all([
        User.countDocuments({ isActive: true }),
        Attendance.countDocuments({ date: today, status: "Present" }), // Assuming today, might need date range logic usually
        Leave.countDocuments({ status: "Pending" })
    ]);

    return { totalUsers, presentToday, pendingLeaves };
}

export default async function DashboardPage() {
    const stats = await getStats();

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Employees
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            Active employees
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Present Today
                        </CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.presentToday}</div>
                        <p className="text-xs text-muted-foreground">
                            Checked in
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
                        <CalendarOff className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingLeaves}</div>
                        <p className="text-xs text-muted-foreground">
                            Requires approval
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Activity
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity or detailed view could go here */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">No recent activity to show.</p>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Buttons for quick actions */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
