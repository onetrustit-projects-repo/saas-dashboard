import { NextResponse } from 'next/server';
import seedData from '@/data/seed.json';

interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: 'active' | 'cancelled';
  startDate: string;
  mrr: number;
  arr: number;
}

export async function GET() {
  try {
    const subscriptions = seedData.subscriptions as unknown as Subscription[];
    const activeSubs = subscriptions.filter((s) => s.status === 'active');
    const mrr = activeSubs.reduce((sum, s) => sum + (s.mrr || 0), 0);
    const arr = mrr * 12;
    const totalSubs = subscriptions.length;
    const cancelledSubs = subscriptions.filter(
      (s) => s.status === 'cancelled'
    ).length;
    const churn =
      totalSubs > 0 ? ((cancelledSubs / totalSubs) * 100).toFixed(2) : '0';
    const arpu =
      activeSubs.length > 0 ? (mrr / activeSubs.length).toFixed(2) : '0';

    return NextResponse.json({
      success: true,
      data: {
        mrr: Math.round(mrr),
        arr: Math.round(arr),
        churn: parseFloat(churn),
        arpu: parseFloat(arpu),
        activeSubscriptions: activeSubs.length,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
