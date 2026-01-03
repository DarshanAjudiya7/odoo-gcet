import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    try {
        const { userId, date, time } = await req.json(); // date and time from client or server time

        // Normalizing date to start of day for query
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);

        // Check if already checked in
        const existing = await Attendance.findOne({
            user: userId,
            date: checkDate
        });

        if (existing) {
            return NextResponse.json({ error: "Already checked in for today" }, { status: 400 });
        }

        const attendance = await Attendance.create({
            user: userId,
            date: checkDate,
            checkIn: new Date(time), // actual timestamp
            status: "Present"
        });

        return NextResponse.json(attendance, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
