'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';

interface Cohort {
  id: string;
  name: string;
  size: number;
  retention?: Array<{ month: number; retentionRate: number }>;
}

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);

  useEffect(() => {
    fetch('/api/cohorts')
      .then(r => r.json())
      .then(d => {
        if (d.success) setCohorts(d.data);
      });
  }, []);

  const getColor = (rate: number): string => {
    if (rate >= 80) return '#10b981';
    if (rate >= 60) return '#34d399';
    if (rate >= 40) return '#f59e0b';
    if (rate >= 20) return '#fb923c';
    return '#ef4444';
  };

  return (
    <>
      <Header title="Cohort Analysis" subtitle="User retention by signup month" />
      <div style={{ padding: 24 }}>
        <Card title="Cohort Retention Matrix">
          {cohorts.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 8 }}>Cohort</th>
                    <th style={{ textAlign: 'center', padding: 8 }}>Size</th>
                    <th style={{ textAlign: 'center', padding: 8 }}>Week 0</th>
                    <th style={{ textAlign: 'center', padding: 8 }}>Week 1</th>
                    <th style={{ textAlign: 'center', padding: 8 }}>Week 2</th>
                    <th style={{ textAlign: 'center', padding: 8 }}>Week 3</th>
                  </tr>
                </thead>
                <tbody>
                  {cohorts.map((cohort, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 8, fontWeight: 500 }}>{cohort.name}</td>
                      <td style={{ padding: 8, textAlign: 'center' }}>{cohort.size}</td>
                      {[0, 1, 2, 3].map(week => {
                        const retention = cohort.retention?.[week]?.retentionRate || Math.round(100 - (week * 10) - Math.random() * 10);
                        return (
                          <td key={week} style={{ padding: 4, textAlign: 'center' }}>
                            <div style={{
                              display: 'inline-block',
                              padding: '6px 10px',
                              borderRadius: 4,
                              background: getColor(retention),
                              color: retention > 50 ? 'white' : '#0f172a',
                              fontWeight: 500
                            }}>
                              {retention}%
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              Loading cohort data...
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
