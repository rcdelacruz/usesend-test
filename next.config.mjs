import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true
})

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  ...(isGithubActions && {
    basePath: '/usesend-test',
    assetPrefix: '/usesend-test/'
  })
}

export default withNextra(nextConfig)
