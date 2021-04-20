/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 16:13:05
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\stageWidth.ts
 */
import { Application } from "../../Core/Application";

export function stageWidth(): number {
	if (CC_EDITOR) {
		return cc.Canvas.instance.node.width;
	}
	return Application.Size.x;
}
