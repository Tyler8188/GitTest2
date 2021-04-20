/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-19 16:54:13
 * @FilePath: \RomantoryApp\assets\Framework\Interfaces\IBinder.ts
 */
import { IDispose } from "./IDispose";

export interface IBinder extends IDispose {
    initialize(): void;
    bindView(asset: cc.Node, ...args): void;
}
