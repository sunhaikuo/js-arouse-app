import IBrowser from './/IBrowser'
/**
 * 浏览器的相关信息
 */
class Browser {
    /**
     * 获取浏览器数据
     */
    public static getBrowser() {
        let UA = navigator.userAgent || ''
        let isAndroid = (() => {
            return UA.match(/Android/i) ? true : false
        })()
        let isQQ = (() => {
            return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA)
        })()
        let isIOS = (() => {
            return UA.match(/iPhone|iPad|iPod/i) ? true : false
        })()
        let isSafari = (() => {
            return /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA)
        })()
        let isWx = (() => {
            return UA.match(/micromessenger/i) ? true : false
        })()
        let isWb = (() => {
            return UA.match(/weibo/i) ? true : false
        })()
        let isAndroidChrome = (() => {
            return (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ
        })()
        let isQZ = (() => {
            return UA.indexOf('Qzone/') !== -1
        })()
        let browser: IBrowser = {
            isAndroid,
            isIOS,
            isSafari,
            isQQ,
            isWb,
            isWx,
            isQZ,
            isAndroidChrome
        }
        return browser
    }
}

export default Browser
