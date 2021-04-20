/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-19 16:53:57
 * @FilePath: \RomantoryApp\assets\Framework\Interfaces\Network\IClientMessage.ts
 */
import { IDispose } from "../IDispose";

export interface IClientMessage extends IDispose {
    readonly content: any;
    packetID: number;
    readonly bytes: ArrayBuffer;
    write(value: object): void;
    parser(value: any): void;
    clear(): void;
}
