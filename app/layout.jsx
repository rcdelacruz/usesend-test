import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { NavTabs } from '../components/NavTabs'
import './globals.css'

// Load Anthropic Sans font (exact same as Claude Code)
const fontLinks = (
  <>
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </>
)

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
      <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.01em' }}>
        useSend Testing Suite
      </span>
    }
    projectLink="https://github.com/rcdelacruz/usesend-test"
  />
)

// Commented out - navbar causing scroll blocking issues
// const navbar = (
//   <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--bg-000)' }} className="navbar-wrapper">
//     <Navbar
//       logo={
//         <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.01em' }}>
//           useSend Testing Suite
//         </span>
//       }
//       projectLink="https://github.com/rcdelacruz/usesend-test"
//     />
//     <NavTabs />
//   </div>
// )

const footer = (
  <Footer>
    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--claude-text-secondary)' }}>
      <span>MIT {new Date().getFullYear()} © useSend Testing Suite</span>
    </div>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        {fontLinks}
      </Head>
      <body>
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --nextra-primary-hue: 15 !important;
            --nextra-primary-saturation: 55.6% !important;
            --nextra-primary-lightness: 52.4% !important;
            --nextra-bg: 253, 253, 247 !important;
          }
          .dark {
            --nextra-primary-hue: 15 !important;
            --nextra-primary-saturation: 63.1% !important;
            --nextra-primary-lightness: 59.6% !important;
            --nextra-bg: 9, 9, 11 !important;
          }
          .dark body,
          .dark html {
            background-color: rgb(9, 9, 11) !important;
          }
        `}} />
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/rcdelacruz/usesend-test/tree/main"
          footer={footer}
          editLink="Edit this page"
          feedback={{
            content: "Question? Give us feedback →",
            labels: "feedback"
          }}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: false
          }}
          toc={{
            title: "On This Page"
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
