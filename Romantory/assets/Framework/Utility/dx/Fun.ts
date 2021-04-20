/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-19 16:58:33
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\Fun.ts
 */
import { FFunction } from "../../Core/FFunction";
import { StoreManager } from "../../Managers/StoreManager";

export function Fun(f: Function, target?: any, isOnce: boolean = true, args?: any[]): FFunction {
    let fun: FFunction = StoreManager.New(FFunction);
    fun.isOnce = isOnce;
    fun.fun = f;
    fun.target = target;
    fun.params = args;
    return fun;
}
