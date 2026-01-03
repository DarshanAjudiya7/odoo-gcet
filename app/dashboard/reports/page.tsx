import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import Payroll from "@/models/Payroll";

async function getReports() {
    await connectDB();

    const attendanceReport = await Attendance.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                present: {
                    $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] }
                },
                total: { $sum: 1 }
            }
        },
        { $sort: { _id: -1 } },
        { $limit: 7 }
    ]);

    const payrollReport = await Payroll.aggregate([
        {
            $group: {
                _id: "$month",
                totalPayout: { $sum: "$netSalary" },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    return { attendanceReport, payrollReport };
}

export default async function ReportsPage() {
    const { attendanceReport, payrollReport } = await getReports();

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Trends (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {attendanceReport.map((day) => (
                                <li key={day._id} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <span>{day._id}</span>
                                    <span className="font-medium text-green-600">
                                        {day.present} / {day.total} Present
                                    </span>
                                </li>
                            ))}
                            {attendanceReport.length === 0 && <p className="text-muted-foreground">No data available</p>}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payroll Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {payrollReport.map((month) => (
                                <li key={month._id} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <span>{month._id}</span>
                                    <span className="font-bold">
                                        ${month.totalPayout.toLocaleString()} ({month.count} employees)
                                    </span>
                                </li>
                            ))}
                            {payrollReport.length === 0 && <p className="text-muted-foreground">No data available</p>}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
