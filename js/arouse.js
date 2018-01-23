/**
 * 浏览器的相关信息
 */
var Browser = /** @class */ (function() {
    function Browser() {}
    /**
     * 获取浏览器数据
     */
    Browser.getBrowser = function() {
        var UA = navigator.userAgent || ''
        var isAndroid = (function() {
            return UA.match(/Android/i) ? true : false
        })()
        var isQQ = (function() {
            return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA)
        })()
        var isIOS = (function() {
            return UA.match(/iPhone|iPad|iPod/i) ? true : false
        })()
        var isSafari = (function() {
            return /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA)
        })()
        var isWx = (function() {
            return UA.match(/micromessenger/i) ? true : false
        })()
        var isWb = (function() {
            return UA.match(/weibo/i) ? true : false
        })()
        var isAndroidChrome = (function() {
            return (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ
        })()
        var isQZ = (function() {
            return UA.indexOf('Qzone/') !== -1
        })()
        var browser = {
            isAndroid: isAndroid,
            isIOS: isIOS,
            isSafari: isSafari,
            isQQ: isQQ,
            isWb: isWb,
            isWx: isWx,
            isQZ: isQZ,
            isAndroidChrome: isAndroidChrome
        }
        return browser
    }
    return Browser
})()

/**
 * AppLink:H5唤起APP的所有方法
 */
var AppLink = /** @class */ (function() {
    /**
     * 类的contructor方法
     * @param config IAppLink类型的config文件
     */
    function AppLink(config) {
        /**
         * UA
         */
        this.UA = {}
        /**
         * 传入的config数据，以接口约束
         */
        this.config = {}
        this.UA = navigator.userAgent || ''
        this.config = config
    }
    /**
     * 跳转函数
     * @param url 链接
     */
    AppLink.prototype.go = function(url) {
        window.location.href = url
    }
    /**
     * 检查是否唤起
     * @param cb 回调函数
     */
    AppLink.prototype.checkOpen = function(cb) {
        var inter = null
        var statue = false
        var count = 0
        inter = window.setInterval(function() {
            count++
            statue = document.hidden || document.webkitHidden
            if (statue || count > 40) {
                cb(statue)
                clearInterval(inter)
            }
        }, 50)
    }
    /**
     * 外部调用的入口函数
     */
    AppLink.prototype.open = function() {
        var _this = this
        var browser = Browser.getBrowser()
        var config = this.config
        // 微信直接跳 应用宝
        if (browser.isWx) {
            this.go(this.config.yyb)
        } else if (browser.isQQ) {
            if (browser.isIOS) {
                // 没有下载
                this.checkOpen(function(isSuccess) {
                    if (!isSuccess) {
                        _this.go(_this.config.appstore)
                    }
                })
            }
            // iOS跳到AppStore
            if (browser.isAndroid) {
                // 使用scheme唤起
                this.tryCallApp(this.config.schema)
                // 唤起失败 跳到应用宝
                this.checkOpen(function(isSuccess) {
                    if (!isSuccess) {
                        _this.go(_this.config.yyb)
                    }
                })
            }
        } else if (browser.isWb) {
            // 使用scheme唤起
            this.tryCallApp(this.config.schema)
            // 微博：唤起失败，也不跳转，会有引导功能
        } else if (browser.isSafari) {
            var version = this.getIOSVersion()
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
    AppLink.prototype.getDownloadUrl = function() {
        var browser = Browser.getBrowser()
        var config = this.config
        var url = ''
        if (browser.isQQ) {
            if (browser.isIOS) {
                url = this.config.appstore
            } else {
                url = this.config.yyb
            }
        } else if (browser.isSafari) {
            var version = this.getIOSVersion()
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
    AppLink.prototype.tryCallApp = function(scheme) {
        var aLink = document.createElement('a'),
            body = document.body
        aLink.href = scheme
        body.appendChild(aLink)
        aLink.click()
    }
    /**
     * 判断iOS版本
     */
    AppLink.prototype.getIOSVersion = function() {
        var ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
        var version = parseInt(ver[1], 10)
        return version
    }
    return AppLink
})()
