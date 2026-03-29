'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Users, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({ dau: 0, wau: 0, mau: 0, mrr: 0, arr: 0, churn: 0 });

  useEffect(() => {
    fetch('/api/metrics/users').then(r => r.json()).then(d => {
      if (d.success) setMetrics(m => ({ ...m, ...d.data }));
    });
    fetch('/api/metrics/revenue').then(r => r.json()).then(d => {
      if (d.success) setMetrics(m => ({ ...m, ...d.data }));
    });
  }, []);

  const stats = [
    { label: 'Active Users', value: metrics.mau?.toLocaleString() || '-', change: '+12.5%', icon: Users, color: '#6366f1' },
    { label: 'Revenue (MRR)', value: `$${(metrics.mrr || 0).toLocaleString()}`, change: '+8.2%', icon: DollarSign, color: '#10b981' },
    { label: 'Conversion Rate', value: '3.24%', change: '-2.1%', icon: TrendingUp, color: '#f59e0b' },
    { label: 'Churn Rate', value: `${metrics.churn || 0}%`, change: '-0.5%', icon: BarChart3, color: '#8b5cf6' },
  ];

  return (
    <>
      <Header title="Dashboard Overview" subtitle="Welcome back!" />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 24 }}>
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{stat.label}</p>
                    <p style={{ fontSize: 28, fontWeight: 600, color: '#0f172a', margin: '4px 0 0' }}>{stat.value}</p>
                    <p style={{ fontSize: 12, color: stat.change.startsWith('+') ? '#10b981' : '#ef4444', margin: '4px 0 0' }}>{stat.change}</p>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color={stat.color} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <Card title="Revenue Trend">
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              Chart will render here
            </div>
          </Card>
          <Card title="Quick Stats">
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              DAU: {metrics.dau} | WAU: {metrics.wau} | MAU: {metrics.mau}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
