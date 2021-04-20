/*
 * @Author: 
 * @Date: 2021-01-29 12:31:10
 * @Description: 
 * @LastEditTime : 2021-02-19 16:16:37
 * @FilePath: \RomantoryApp\assets\Script\LoginScene\LoginMediator.ts
 */

import { FMediator } from "../../../../Framework/Core/FMediator";
import { GameLayer } from "../../../../Framework/Enums/GameLayer";
import { FEvent } from "../../../../Framework/Events/FEvent";
import { addEvent } from "../../../../Framework/Utility/dx/addEvent";
import { GameEvent } from "../../Common/GameEvent";
import { ModuleNames } from "../../Common/ModuleNames";
import { BookCoverModule } from "../../Modules/BookCover/BookCoverModule";
import { BookShelfModule } from "../../Modules/BookShelf/BookShelfModule";
import { MainModule } from "../../Modules/MainModule/MainModule";

export class MainMediator extends FMediator {

    protected initDatas() {
        super.initDatas();
    }

    public startMediator() {
        // cc.view.enableAntiAlias(true);
        super.startMediator();
    }
    public initModules(): void {
        super.initModules();

        this.addModule(ModuleNames.MainModule, MainModule, GameEvent.GameStart);
        // this.addModule(ModuleNames.BookShelfModule, BookShelfModule);
        this.addModule(ModuleNames.BookCoverModule, BookCoverModule);

    }
    public showModules(): void {
        super.showModules();
        this.showModule(ModuleNames.MainModule, GameLayer.Content);
        // this.showModule(ModuleNames.BookShelfModule, GameLayer.UI);
    }

    protected addEvents(): void {
        super.addEvents();
        addEvent(this, GameEvent.OpenBookCover, this.openBookCover);
    }


    /**打开书的详情封面 */
    private openBookCover(evt: FEvent): void {
        this.showModule(ModuleNames.BookCoverModule, GameLayer.Popup, evt.data);
    }

    public dispose() {
        super.dispose();
    }
}


