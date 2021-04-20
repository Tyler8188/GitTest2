/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-23 15:54:49
 * @FilePath: \RomantoryApp\assets\Framework\Interfaces\IContext.ts
 */
import { IDispose } from "./IDispose";

export interface IContext extends IDispose {
    initialize(): void;
}