import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/db";
import Payroll from "@/models/Payroll";

export default async function PayrollPage() {
    await connectDB();
    const payrolls = await Payroll.find({})
        .populate("user", "name email")
        .sort({ month: -1 });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
                <Button variant="outline">Run Payroll</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Salary History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Month</TableHead>
                                <TableHead>Base Salary</TableHead>
                                <TableHead>Deductions</TableHead>
                                <TableHead className="text-right">Net Salary</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payrolls.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground">No payroll records found.</TableCell>
                                </TableRow>
                            ) : (
                                payrolls.map((payroll) => (
                                    <TableRow key={payroll._id.toString()}>
                                        <TableCell className="font-medium">
                                            {payroll.user?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>{payroll.month}</TableCell>
                                        <TableCell>${payroll.baseSalary.toLocaleString()}</TableCell>
                                        <TableCell>${payroll.deductions.toLocaleString()}</TableCell>
                                        <TableCell className="text-right font-bold">${payroll.netSalary.toLocaleString()}</TableCell>
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
