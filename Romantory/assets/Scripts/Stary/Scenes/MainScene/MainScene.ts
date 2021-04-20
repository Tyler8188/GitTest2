/*
 * @Author: 
 * @Date: 2021-01-29 12:31:10
 * @Description: 
 * @LastEditTime : 2021-02-19 16:14:40
 * @FilePath: \RomantoryApp\assets\Script\LoginScene\LoginScene.ts
 */

import { FScene } from "../../../../Framework/Core/FScene";
import { MainMediator } from "./MainMediator";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainScene extends FScene {
    onLoad() {
        this.mediator = new MainMediator();
        super.onLoad();
    }

    start() {
        super.start();
    }

    onDestroy() {
        super.onDestroy();
    }
}