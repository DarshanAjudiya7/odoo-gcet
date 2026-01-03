import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { Plus } from "lucide-react";

export default async function UsersPage() {
    await connectDB();
    const users = await User.find({}).sort({ createdAt: -1 });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Employee
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <Card key={user._id.toString()} className="overflow-hidden transition-all hover:scale-[1.02]">
                        <CardHeader className="flex flex-row items-center gap-4 bg-muted/50 p-6">
                            <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                                <AvatarImage src={user.profileImage} alt={user.name} />
                                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <CardTitle>{user.name}</CardTitle>
                                <div className="text-sm text-muted-foreground">{user.jobTitle || "Employee"}</div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Department</span>
                                    <span className="font-medium">Engineering</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Email</span>
                                    <span className="font-medium">{user.email}</span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <Badge variant={user.isActive ? "success" : "secondary"}>
                                        {user.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
