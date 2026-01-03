import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/db";
import Leave from "@/models/Leave";

export default async function LeavesPage() {
    await connectDB();
    const leaves = await Leave.find({})
        .populate("user", "name email")
        .sort({ from: -1 });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Leave Requests</h2>
                <Button>Request Leave</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">No leave requests found.</TableCell>
                                </TableRow>
                            ) : (
                                leaves.map((leave) => (
                                    <TableRow key={leave._id.toString()}>
                                        <TableCell className="font-medium">
                                            {leave.user?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>{leave.type}</TableCell>
                                        <TableCell>{new Date(leave.from).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(leave.to).toLocaleDateString()}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                leave.status === "Approved" ? "success" :
                                                    leave.status === "Rejected" ? "destructive" : "warning"
                                            }>
                                                {leave.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
