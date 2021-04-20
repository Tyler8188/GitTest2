import { FContext } from "../../../Framework/Core/FContext";

/*
 * @Author: 
 * @Date: 2021-02-19 16:32:40
 * @Description: 
 * @LastEditTime : 2021-02-19 16:34:13
 * @FilePath: \RomantoryApp\assets\Script\ApplicationContext.ts
 */
export class ApplicationContext extends FContext {
    public static ClassName: string = "ApplicationContext";

    protected initDatas() {
        cc.game.setFrameRate(50);
        super.initDatas();
    }

    /**初始化全局模块 */
    protected initModules(): void {
        super.initModules();
    }
    protected onLoadSceneComplete(data: any, sceneName: string) {
        super.onLoadSceneComplete(data, sceneName);
    }

}
