import { connectDB } from "@/lib/db";
import Leave from "@/models/Leave";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        const query: any = {};
        if (userId) query.user = userId;

        const leaves = await Leave.find(query)
            .populate("user", "name email")
            .sort({ from: -1 });

        return NextResponse.json(leaves);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch leaves" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();
    try {
        const body = await req.json();
        const leave = await Leave.create(body);
        return NextResponse.json(leave, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
