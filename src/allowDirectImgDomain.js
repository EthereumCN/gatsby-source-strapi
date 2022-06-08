export const allowDirectDomains = [
  'https://i.ibb.co',
  'https://images.mirror-media.xyz',
  'https://mirror.xyz',
  'https://ecn.mirror.xyz',
]

export const isStartWithAllowDirectDomains = filePathname => {
  return allowDirectDomains.some(domain => {
    return filePathname.startsWith(domain)
  })
}
