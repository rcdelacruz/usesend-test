'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const tabs = [
  { name: 'Overview', href: '/' },
  { name: 'Getting Started', href: '/getting-started' },
  { name: 'Configuration', href: '/configuration' },
  { name: 'Running Tests', href: '/running-tests' },
  { name: 'API Examples', href: '/api-examples' },
  { name: 'AWS SES', href: '/aws-ses-sandbox' },
]

export function NavTabs() {
  const pathname = usePathname()

  return (
    <div
      className="nextra-nav-tabs"
      style={{
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: 'var(--nextra-content-width, 90rem)',
        margin: '0 auto',
        width: '100%',
        paddingLeft: 'max(env(safe-area-inset-left), 1.5rem)',
        paddingRight: 'max(env(safe-area-inset-right), 1.5rem)',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href ||
                          (tab.href !== '/' && pathname?.startsWith(tab.href))

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`nav-tab-link ${isActive ? 'active' : ''}`}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
