/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-23 15:41:38
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\dispatchFEventWith.ts
 */
import { EventManager } from './../../Managers/EventManager';
export function dispatchFEventWith(type: string, data?: any): void {
    EventManager.dispatchEventWith(type, data);
}