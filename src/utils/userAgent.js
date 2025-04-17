const vendors = {
  'Generic Linux': /Linux/i,
  Android: /Android/i,
  BlackBerry: /BlackBerry/i,
  Bluebird: /EF500/i,
  'Chrome OS': /CrOS/i,
  Datalogic: /DL-AXIS/i,
  Honeywell: /CT50/i,
  iPad: /iPad/i,
  iPhone: /iPhone/i,
  iPod: /iPod/i,
  macOS: /Macintosh/i,
  Samsung: /; SM-|; K/i,
  Microsoft: /IEMobile|Windows/i,
  Zebra: /TC70|TC55/i,
  Google: /Pixel/i,
  Motorola: /moto/i,
  Xiaomi: /Redmi|; M210|; 220/i,
  Huawei: /VOG-|MAR-/i,
  OnePlus: /; DE21/i,
  Ubuntu: /Ubuntu/i
}
const browsers = {
  Chrome: /chrome|chromium|crios/i,
  Firefox: /firefox|fxios/i,
  Safari: /safari/i,
  Opera: /opr\//i,
  Edge: /edg/i
}
export default async function deviceInfo() {
  const ua = window.navigator.userAgent
  const uaArray = ua.split(/\s*[)(]\s*/)
  const os = uaArray[1].split('; ')

  const osAndBrowserData = await getOSAndBrowserData(uaArray)

  const userAgentObject = {
    isMobile: !!uaArray[4].match(/Mobile/i),
    model: os[os.length - 1],
    vendor: getUAPart(vendors, uaArray[1]),
    os: uaArray[1],
    ua
  }

  return { ...userAgentObject, ...osAndBrowserData }
}

function getOSAndBrowserData(uaArray) {
  return window.navigator.userAgentData
    .getHighEntropyValues([
      'architecture',
      'model',
      'platform',
      'platformVersion',
      'fullVersionList',
      'os'
    ])
    .then(ua => {
      const platform = ua.platform || 'Unknown'
      const platformVersion =
        ua.platform === 'Windows' &&
        parseInt(ua.platformVersion.split('.')[0]) > 13
          ? 11
          : parseInt(ua.platformVersion.split('.')[0]) > 0
            ? 10
            : ua.platformVersion
      const browser =
        ua.brands[1] || getUAPart(browsers, uaArray[4].split(' ')[0])
      return { platform, platformVersion, browser }
    })
}

function getUAPart(objectPart, value) {
  let part = 'Unknown'
  Object.keys(objectPart).map(v => value.match(objectPart[v]) && (part = v))
  return part
}
