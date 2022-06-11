export const allowDirectDomains = [
  'https://i.ibb.co',
  'https://images.mirror-media.xyz',
  'https://mirror.xyz',
  'https://ecn.mirror.xyz',
  'https://gateway.pinata.cloud',
  'https://news.ethereum.cn',
  'https://vitalik.ca',
  'https://mirror-media.imgix.net',
]

export const isStartWithAllowDirectDomains = filePathname => {
  return allowDirectDomains.some(domain => {
    return filePathname.startsWith(domain)
  })
}
