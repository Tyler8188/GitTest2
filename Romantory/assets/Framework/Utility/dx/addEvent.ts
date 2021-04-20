/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-19 16:57:28
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\addEvent.ts
 */
import { EventManager } from './../../Managers/EventManager';
export function addEvent(target: any, eventType: string, fun: Function): void {
    EventManager.addEvent(target, eventType, fun);
}