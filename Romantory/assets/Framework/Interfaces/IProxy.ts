/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-19 16:54:29
 * @FilePath: \RomantoryApp\assets\Framework\Interfaces\IProxy.ts
 */
import { IDispose } from "./IDispose";

export interface IProxy extends IDispose {
    initialize(): void;
}
