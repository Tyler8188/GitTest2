/**本地缓存数据存储 */


export class LocalCacheData {

    /**是否第一次进入游戏 */
    public static isFirstEnterGame(): boolean {
        let isFirstStr = cc.sys.localStorage.getItem("IS_FIRST_ENTER_GAME")
        return !JSON.parse(isFirstStr) == false
    }

    public static setFirstEnterGame(isFirst: boolean): void {
        let isFirstStr = JSON.stringify(isFirst)
        cc.sys.localStorage.setItem("IS_FIRST_ENTER_GAME", isFirstStr)
    }


}