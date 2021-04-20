/*
 * @Author: 
 * @Date: 2021-01-29 12:31:10
 * @Description: 
 * @LastEditTime : 2021-02-19 16:14:40
 * @FilePath: \RomantoryApp\assets\Script\LoginScene\LoginScene.ts
 */

import { Application } from "../../../../Framework/Core/Application";
import { FScene } from "../../../../Framework/Core/FScene";
import { ApplicationContext } from "../../Common/ApplicationContext";
import { LoginMediator } from "./LoginMediator";


const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginScene extends FScene {

    onLoad() {
        cc.debug.setDisplayStats(false);
        this.mediator = new LoginMediator();

        //框架启动入口
        Application.Bootstrap(ApplicationContext, cc.v2(1080, 1920));
        super.onLoad();
    }

    start() {
        super.start();
    }

    onDestroy() {
        super.onDestroy();
    }
}