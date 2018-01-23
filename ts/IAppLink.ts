/**
 * AppLink转入config的约束类
 */
interface IAppLink {
    /**
     * schema：类似:scheme?(id=1取的是参数)
     */
    schema: string
    /**
     * appstore地址
     */
    appstore: string
    /**
     * 应用宝地址
     */
    yyb: string
}

export default IAppLink
