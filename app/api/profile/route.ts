import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    const { name, bio } = await req.json();
    if (!userId || !name) {
        return NextResponse.json({ error: "missing username or name" }, { status: 400 });
    }
    const profile = await prisma.userProfile.upsert({
        where: { userId },
        update: { name, bio },
        create: { userId, name, bio },
    });
    return NextResponse.json(profile);
}
export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "missing userId" }, { status: 400 });
    }
    const profile = await prisma.userProfile.findUnique({ where: { userId } });
    return NextResponse.json(profile);
}