import { NextResponse } from 'next/server';
import seedData from '@/data/seed.json';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastActiveAt: string;
  plan: string;
  country: string;
  isActive: boolean;
}

export async function GET() {
  try {
    const users = seedData.users as User[];
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const activeUsers = users.filter((u) => u.isActive);

    const dau = activeUsers.filter(
      (u) => new Date(u.lastActiveAt) >= dayAgo
    ).length;
    const wau = activeUsers.filter(
      (u) => new Date(u.lastActiveAt) >= weekAgo
    ).length;
    const mau = activeUsers.filter(
      (u) => new Date(u.lastActiveAt) >= monthAgo
    ).length;

    return NextResponse.json({
      success: true,
      data: { dau, wau, mau },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
