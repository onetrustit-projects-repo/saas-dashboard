'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  day: number;
  rate: string;
  users?: number;
}

interface RetentionCurve {
  id: string;
  name: string;
  dataPoints: DataPoint[];
}

export default function RetentionPage() {
  const [curves, setCurves] = useState<RetentionCurve[]>([]);

  useEffect(() => {
    fetch('/api/retention')
      .then(r => r.json())
      .then(d => {
        if (d.success) setCurves(d.data);
      });
  }, []);

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const chartData: Record<string, string | number>[] = [];
  
  if (curves.length > 0 && curves[0].dataPoints) {
    curves[0].dataPoints.forEach((_, i) => {
      const point: Record<string, string | number> = { day: `Day ${i * 7}` };
      curves.forEach((c, j) => {
        if (c.dataPoints[i]) {
          point[c.name] = parseFloat(c.dataPoints[i].rate);
        }
      });
      chartData.push(point);
    });
  }

  return (
    <>
      <Header title="Retention Analysis" subtitle="Track user retention over time" />
      <div style={{ padding: 24 }}>
        <Card title="Retention Curves">
          {curves.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
                <Tooltip />
                <Legend />
                {curves.map((curve, i) => (
                  <Line key={curve.id} type="monotone" dataKey={curve.name} stroke={colors[i % colors.length]} strokeWidth={2} dot={{ r: 3 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              Loading retention data...
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
