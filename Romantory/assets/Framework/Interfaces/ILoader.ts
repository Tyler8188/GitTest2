/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:54:45
 * @FilePath: \RomantoryApp\assets\Framework\Interfaces\ILoader.ts
 */
import { IDispose } from "./IDispose";
import { LoaderType } from "../Enums/LoaderType";

export interface ILoader extends IDispose {
    length: number;
    load(url: any, assetType?: any, loaderType?: LoaderType): void;
    getAssetType(index: number): any;
    getContent(index: number): any
    addCallback(target: any, complete: Function, progress?: Function, error?: Function): void
}
