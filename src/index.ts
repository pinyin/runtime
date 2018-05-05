import {ensure} from '@pinyin/maybe'
import {UAParser} from 'ua-parser-js';

const uaParser = new UAParser(navigator.userAgent)

const browserName = uaParser.getBrowser().name
const deviceType = uaParser.getDevice().type
const OS = uaParser.getOS().name

const isSafari: boolean = ['Safari', 'Mobile Safari'].includes(browserName || '')
const isChrome: boolean = ['Chrome', 'Chrome WebView', 'Chromium'].includes(browserName || '')
const isIOS: boolean = ['iOS'].includes(OS || '')

const version: number =
    parseInt(ensure(uaParser.getBrowser().version, '0' as string).split('.')[0], 10)

const isMobile: boolean = ['mobile', 'tablet', 'wearable', 'embedded'].includes(deviceType || '')

// https://bugs.chromium.org/p/chromium/issues/detail?id=570845
const throttlesTimersWhenScrolling = isChrome && version > 47
const momentumScrollOverridesScrollTop = isIOS

export type RunTime = {
    isChrome: boolean
    isSafari: boolean
    version: number
    isMobile: boolean
    isIOS: boolean
}

export const runtime: RunTime = {
    isChrome,
    isSafari,
    version,
    isMobile,
    isIOS
}

