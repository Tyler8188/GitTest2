/*
 * @Author: 
 * @Date: 2021-01-29 12:31:10
 * @Description: 
 * @LastEditTime : 2021-02-19 16:16:37
 * @FilePath: \RomantoryApp\assets\Script\LoginScene\LoginMediator.ts
 */

import { Application } from "../../../../Framework/Core/Application";
import { FMediator } from "../../../../Framework/Core/FMediator";
import { GameLayer } from "../../../../Framework/Enums/GameLayer";
import { WebManager } from "../../../../Framework/Managers/WebManager";
import { HttpMethod } from "../../../../Framework/Network/Web/HttpMethod";
import { ConfigVO } from "../../Common/ConfigVO";
import { ModuleNames } from "../../Common/ModuleNames";
import { LaunchModule } from "../../Modules/LaunchModule/LaunchModule";

export class LoginMediator extends FMediator {

    protected initDatas() {
        super.initDatas();
        Application.SetButtonSound();
        Application.AddFont();
    }

    public initModules(): void {
        super.initModules();
        this.addModule(ModuleNames.LaunchModule, LaunchModule);
    }
    public showModules(): void {
        super.showModules();
        this.showModule(ModuleNames.LaunchModule, GameLayer.Content);
    }

    protected addEvents(): void {
        super.addEvents();
    }

    public dispose() {
        super.dispose();
    }
}
