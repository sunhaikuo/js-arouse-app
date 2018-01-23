#### 概述

使用`js`唤起`Native`下的`App`，在 QQ、微博、微信中的简单库文件，只需要配置三项，库来帮你完成所有情况的唤起

#### 用法

* js：直接引用`./js/arouse.js`到 HTML 中
* ts：如果你项目基于`ts`，请使用把`ts`目录下所有文件拷贝到项目中

#### ts 结构

* `Browser.ts`为判断系统、浏览器，不涉及业务
* `AppLink.ts`为判断环境，跳转相应操作，为主要代码
* `IBrowser.ts`和`IAppLink.ts`为相应的约束接口

#### 使用

* 引入 `AppLink`和`IAppLink`
* 配置必须的信息(js 版不用添加 IAppLink 约束，其他一样)

```
let config: IAppLink = {
    // 和app协定的scheme
    schema: 'mtlf://scheme?p=home',
    // iOS下的App在appstore的地址
    appstore: '//itunes.apple.com/cn/app/%E4%BE%83%E4%BE%83%E7%8C%A9/id1267259289?mt=8',
    // 应用宝的地址
    yyb: '//a.app.qq.com/o/simple.jsp?pkgname=com.mtime.lookface&fromcase=40002'
}
```

* 初始化

```
let applink = new AppLink(config)
applink.open()
```

#### 为什么没有 demo

因为把这个页配置成`universal link`，必须使用域名直接访问，使用`localhost`或`ip`访问，效果会很差，所以只提供源码，demo 在博客中可以扫码体验。

#### 技术细节及流程，请参照：[js 在微信、微博、QQ、Safari 唤起 App 的解决方案][1]

[1]: https://segmentfault.com/a/1190000012940046
