/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-23 15:55:07
 * @FilePath: \RomantoryApp\assets\Framework\Interfaces\IModule.ts
 */
import { IDispose } from "./IDispose";

export interface IModule extends IDispose {
    moduleName: string;
    isValid: boolean;

    assets: any[];
    isInitialize: boolean;

    isNeedPreload: boolean;

    /**是否在销毁时释放资源*/
    isReleaseAsset: boolean;

    isPlayDisposeAnimation: boolean;

    startModule(): void;
    excuteModuleFun(funName: string, ...args): void;


    show(p: cc.Node, data?: object): void;
    hide(data?: any): void;

}
