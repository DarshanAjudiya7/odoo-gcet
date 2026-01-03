import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    try {
        const { userId, date, time } = await req.json();

        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            user: userId,
            date: checkDate
        });

        if (!attendance) {
            return NextResponse.json({ error: "No check-in record found for today" }, { status: 404 });
        }

        attendance.checkOut = new Date(time);
        await attendance.save();

        return NextResponse.json(attendance);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
