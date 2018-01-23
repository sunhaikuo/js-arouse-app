import IAppLink from './IAppLink'
import Browser from './Browser'
/**
 * AppLink:H5唤起APP的所有方法
 */
class AppLink {
    /**
     * UA
     */
    private UA = {} as any
    /**
     * 传入的config数据，以接口约束
     */
    private config = {} as IAppLink
    /**
     * 类的contructor方法
     * @param config IAppLink类型的config文件
     */
    constructor(config: IAppLink) {
        this.UA = navigator.userAgent || ''
        this.config = config
    }
    /**
     * 跳转函数
     * @param url 链接
     */
    private go(url: string) {
        window.location.href = url
    }

    /**
     * 检查是否唤起
     * @param cb 回调函数
     */
    private checkOpen(cb) {
        let d1 = +new Date()
        let inter = null
        let statue = false
        let count = 0
        inter = window.setInterval(() => {
            count++
            statue = document.hidden || (<any>document).webkitHidden
            if (statue || count > 40) {
                cb(statue)
                clearInterval(inter)
            }
        }, 50)
    }

    /**
     * 外部调用的入口函数
     */
    public open() {
        const browser = Browser.getBrowser()
        const config = this.config
        // 微信直接跳 应用宝
        if (browser.isWx) {
            this.go(this.config.yyb)
        } else if (browser.isQQ) {
            if (browser.isIOS) {
                // 没有下载
                this.checkOpen(isSuccess => {
                    if (!isSuccess) {
                        this.go(this.config.appstore)
                    }
                })
            }
            // iOS跳到AppStore
            if (browser.isAndroid) {
                // 使用scheme唤起
                this.tryCallApp(this.config.schema)
                // 唤起失败 跳到应用宝
                this.checkOpen(isSuccess => {
                    if (!isSuccess) {
                        this.go(this.config.yyb)
                    }
                })
            }
        } else if (browser.isWb) {
            // 使用scheme唤起
            this.tryCallApp(this.config.schema)
            // 微博：唤起失败，也不跳转，会有引导功能
        } else if (browser.isSafari) {
            const version = this.getIOSVersion()
            // iOS10以下不支持直接跳转到AppStore，跳到应用宝
            if (version < 10) {
                this.go(this.config.yyb)
            } else {
                this.go(this.config.appstore)
            }
        } else {
            // 其他情况，直接跳应用宝
            this.go(this.config.yyb)
        }
    }
    /**
     * 下载按钮的url地址
     */
    public getDownloadUrl() {
        const browser = Browser.getBrowser()
        const config = this.config
        let url = ''
        if (browser.isQQ) {
            if (browser.isIOS) {
                url = this.config.appstore
            } else {
                url = this.config.yyb
            }
        } else if (browser.isSafari) {
            const version = this.getIOSVersion()
            if (version < 10) {
                url = this.config.yyb
            } else {
                url = this.config.appstore
            }
        } else if (browser.isWb) {
            url = ''
        } else {
            url = this.config.yyb
        }
        return url
    }
    /**
     * 尝试唤起APP
     * @param scheme 唤起的scheme
     */
    private tryCallApp(scheme: string) {
        let aLink = document.createElement('a'),
            body = document.body
        aLink.href = scheme
        body.appendChild(aLink)
        aLink.click()
    }
    /**
     * 判断iOS版本
     */
    private getIOSVersion() {
        const ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
        const version = parseInt(ver[1], 10)
        return version
    }
}

export default AppLink
