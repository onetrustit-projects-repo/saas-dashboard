'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricData {
  date: string;
  dau: number;
  wau: number;
  mau: number;
}

export default function UsersPage() {
  const [data, setData] = useState<MetricData[]>([]);
  const [totals, setTotals] = useState({ dau: 0, wau: 0, mau: 0 });

  useEffect(() => {
    fetch('/api/metrics/users')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setTotals({ dau: d.data.dau || 0, wau: d.data.wau || 0, mau: d.data.mau || 0 });
          const mockData: MetricData[] = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (30 - i));
            return {
              date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              dau: Math.round((d.data.dau || 100) * (0.8 + Math.random() * 0.4)),
              wau: Math.round((d.data.wau || 500) * (0.8 + Math.random() * 0.4)),
              mau: Math.round((d.data.mau || 2000) * (0.8 + Math.random() * 0.4)),
            };
          });
          setData(mockData);
        }
      });
  }, []);

  return (
    <>
      <Header title="User Metrics" subtitle="Track DAU, WAU, and MAU" />
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 24 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#6366f115', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#6366f1" />
              </div>
              <div>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>DAU</p>
                <p style={{ fontSize: 24, fontWeight: 600, color: '#0f172a', margin: '4px 0 0' }}>{totals.dau.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#10b98115', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#10b981" />
              </div>
              <div>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>WAU</p>
                <p style={{ fontSize: 24, fontWeight: 600, color: '#0f172a', margin: '4px 0 0' }}>{totals.wau.toLocaleString()}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#f59e0b15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#f59e0b" />
              </div>
              <div>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>MAU</p>
                <p style={{ fontSize: 24, fontWeight: 600, color: '#0f172a', margin: '4px 0 0' }}>{totals.mau.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
        <Card title="User Activity Trend">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorDAU" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="dau" name="DAU" stroke="#6366f1" fill="url(#colorDAU)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}
