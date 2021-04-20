/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime: 2021-02-23 15:41:12
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\getCamera.ts
 */
import { Application } from "../../Core/Application";

export function getCamera(name: string): cc.Camera {
    return Application.CurrentScene.getCamera(name);
}