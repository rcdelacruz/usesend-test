import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true
})

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/usesend-test',
  assetPrefix: '/usesend-test/'
}

export default withNextra(nextConfig)
