/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:53:45
 * @FilePath: \RomantoryApp\assets\Framework\Events\ResizeEvent.ts
 */
import { FEvent } from "./FEvent";

export class ResizeEvent extends FEvent {
    public static ClassName: string = "ResizeEvent";
    public static readonly ON_WINDOW_RESIZE: string = "OnWindowResize";

    public oldSize: cc.Vec2;
    public newSize: cc.Vec2;
    public rotation: any = null;

    public constructor(type: string, oldSize: cc.Vec2, newSize: cc.Vec2, data?: any, rotation?: any) {
        super(type, data);
        this.oldSize = oldSize;
        this.newSize = newSize;
        this.rotation = rotation;
    }
}
