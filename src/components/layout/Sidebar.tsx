'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, DollarSign, BarChart3, GitBranch, TrendingUp } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/metrics/users', label: 'Users', icon: Users },
  { href: '/metrics/revenue', label: 'Revenue', icon: DollarSign },
  { href: '/cohorts', label: 'Cohorts', icon: BarChart3 },
  { href: '/funnels', label: 'Funnels', icon: GitBranch },
  { href: '/retention', label: 'Retention', icon: TrendingUp },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 240, height: '100vh', background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0 }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={20} color="white" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>Analytics</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', marginBottom: 4, borderRadius: 8, textDecoration: 'none',
              color: isActive ? '#6366f1' : '#64748b', background: isActive ? '#6366f110' : 'transparent', fontWeight: isActive ? 500 : 400, fontSize: 14
            }}>
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
