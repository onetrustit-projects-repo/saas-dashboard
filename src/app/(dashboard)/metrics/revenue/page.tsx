'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function RevenuePage() {
  const [metrics, setMetrics] = useState({ mrr: 0, arr: 0, churn: 0, arpu: 0 });

  useEffect(() => {
    fetch('/api/metrics/revenue')
      .then(r => r.json())
      .then(d => {
        if (d.success) setMetrics(d.data);
      });
  }, []);

  const revenueStats = [
    { label: 'MRR', value: `$${(metrics.mrr || 0).toLocaleString()}`, icon: DollarSign, color: '#10b981' },
    { label: 'ARR', value: `$${(metrics.arr || 0).toLocaleString()}`, icon: DollarSign, color: '#6366f1' },
    { label: 'ARPU', value: `$${(metrics.arpu || 0).toFixed(2)}`, icon: TrendingUp, color: '#f59e0b' },
    { label: 'Churn', value: `${metrics.churn || 0}%`, icon: TrendingUp, color: '#ef4444' },
  ];

  return (
    <>
      <Header title="Revenue Metrics" subtitle="Track MRR, ARR, and churn" />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 24 }}>
          {revenueStats.map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{stat.label}</p>
                <p style={{ fontSize: 28, fontWeight: 600, color: '#0f172a', margin: '8px 0 0' }}>{stat.value}</p>
              </Card>
            );
          })}
        </div>
        <Card title="Revenue Breakdown">
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', padding: 40 }}>
            {['Enterprise: 55%', 'Pro: 30%', 'Starter: 10%', 'Free: 5%'].map(item => (
              <div key={item} style={{ textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <DollarSign size={24} color="#6366f1" />
                </div>
                <p style={{ fontSize: 14, color: '#64748b' }}>{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
