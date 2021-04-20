/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:55:04
 * @FilePath: \RomantoryApp\assets\Framework\Interfaces\IMediator.ts
 */
import { IDispose } from './IDispose';

export interface IMediator extends IDispose {
    startMediator(): void;
    initialize(): void;
    sceneName: string;
}