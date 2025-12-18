import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    template: '%s – useSend Testing Suite',
    default: 'useSend Testing Suite'
  },
  description: 'Comprehensive testing suite for self-hosted useSend instances',
}

const navbar = (
  <Navbar logo={<b>useSend Testing Suite</b>} />
)

const footer = <Footer>MIT {new Date().getFullYear()} © useSend Testing Suite</Footer>

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
