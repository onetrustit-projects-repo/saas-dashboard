'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';

interface FunnelStep {
  name: string;
  conversions: number;
  conversionRate: number;
}

interface Funnel {
  id: string;
  name: string;
  steps: FunnelStep[];
}

export default function FunnelsPage() {
  const [funnels, setFunnels] = useState<Funnel[]>([]);

  useEffect(() => {
    fetch('/api/funnels')
      .then(r => r.json())
      .then(d => {
        if (d.success) setFunnels(d.data);
      });
  }, []);

  return (
    <>
      <Header title="Funnel Analysis" subtitle="Track conversion through steps" />
      <div style={{ padding: 24 }}>
        {funnels.map(funnel => (
          <Card key={funnel.id} title={funnel.name} style={{ marginBottom: 20 }}>
            <div>
              {funnel.steps?.map((step, i) => {
                const width = (step.conversions / funnel.steps[0].conversions) * 100;
                return (
                  <div key={i} style={{ marginBottom: 12 }}>
                    {i > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingLeft: 20 }}>
                        <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #ef4444' }} />
                        <span style={{ fontSize: 12, color: '#ef4444' }}>-{((1 - step.conversions / funnel.steps[i-1].conversions) * 100).toFixed(1)}% drop</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 120, textAlign: 'right' }}>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{step.name}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ width: `${width}%`, height: 40, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 16 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{step.conversions.toLocaleString()}</span>
                        </div>
                      </div>
                      <div style={{ width: 60 }}>
                        <span style={{ fontSize: 14, color: '#64748b' }}>{step.conversionRate}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
        {funnels.length === 0 && (
          <Card title="Funnels">
            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              Loading funnel data...
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
