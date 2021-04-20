/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-19 16:58:26
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\dispatchSoundEvent.ts
 */
import { SoundEvent } from "../../Events/SoundEvent";
import { EventManager } from "../../Managers/EventManager";

export function dispatchSoundEvent(type: string, data?: any): void {
    EventManager.dispatchEvent(new SoundEvent(type, data));
}