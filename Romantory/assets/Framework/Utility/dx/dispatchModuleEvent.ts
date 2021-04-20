/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:41:34
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\dispatchModuleEvent.ts
 */
import { EventManager } from "../../Managers/EventManager";
import { ModuleEvent } from "../../Events/ModuleEvent";
import { GameLayer } from "../../Enums/GameLayer";

export function dispatchModuleEvent(type: string, moduleName: string, instanceName?: string, gameLayer?: GameLayer | cc.Node, data?: any): void {
    EventManager.dispatchEvent(new ModuleEvent(type, moduleName, instanceName, gameLayer, data));
}