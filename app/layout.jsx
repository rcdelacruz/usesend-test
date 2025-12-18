import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import './globals.css'

export const metadata = {
  title: {
    template: '%s – useSend Testing Suite',
    default: 'useSend Testing Suite'
  },
  description: 'Comprehensive testing suite for self-hosted useSend instances',
}

const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>
        useSend Testing Suite
      </span>
    }
    projectLink="https://github.com/rcdelacruz/usesend-test"
  />
)

const footer = (
  <Footer>
    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
      <span>MIT {new Date().getFullYear()} © useSend Testing Suite</span>
    </div>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/rcdelacruz/usesend-test/tree/main"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
