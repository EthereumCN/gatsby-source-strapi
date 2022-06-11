'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
var allowDirectDomains = (exports.allowDirectDomains = [
  'https://i.ibb.co',
  'https://images.mirror-media.xyz',
  'https://mirror.xyz',
  'https://ecn.mirror.xyz',
  'https://gateway.pinata.cloud',
  'https://news.ethereum.cn',
  'https://vitalik.ca',
  'https://mirror-media.imgix.net',
])

var isStartWithAllowDirectDomains = (exports.isStartWithAllowDirectDomains = function isStartWithAllowDirectDomains(
  filePathname
) {
  return allowDirectDomains.some(function(domain) {
    return filePathname.startsWith(domain)
  })
})
