/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-19 17:38:21
 * @FilePath: \RomantoryApp\assets\Framework\Events\ApplicationEvent.ts
 */
import { FEvent } from "./FEvent";

export class ApplicationEvent extends FEvent {
    public static ClassName: string = "ApplicationEvent";
    /**退出应用程序的事件 */
    public static readonly ON_EXIT_APPLICATION: string = "OnExitApplication";
}
