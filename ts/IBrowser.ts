/**
 * 所有的浏览器类型
 */
interface IBrowser {
    /**
     * 是否安卓系统
     */
    isAndroid: boolean
    /**
     * 是否iOS系统
     */
    isIOS: boolean
    /**
     * 是否在safari里
     */
    isSafari: boolean
    /**
     * 是否在QQ
     */
    isQQ: boolean
    /**
     * 是否在微信
     */
    isWx: boolean
    /**
     * 是否在微博
     */
    isWb: boolean
    /**
     * 是否在安卓的chrome里
     */
    isAndroidChrome: boolean
    /**
     * 是否在Qzone
     */
    isQZ: boolean
}
export default IBrowser
