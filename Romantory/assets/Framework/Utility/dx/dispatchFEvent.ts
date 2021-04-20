/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:45:35
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\dispatchFEvent.ts
 */
import { FEvent } from './../../Events/FEvent';
import { EventManager } from './../../Managers/EventManager';

export function dispatchFEvent(evt: FEvent): void {
    EventManager.dispatchEvent(evt);
}