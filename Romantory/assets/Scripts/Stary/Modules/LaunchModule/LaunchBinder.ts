/*
 * @Author: 
 * @Date: 2021-02-22 19:42:48
 * @Description: 
 * @LastEditTime : 2021-02-22 19:43:42
 * @FilePath: \RomantoryApp\assets\Scripts\Stary\Modules\MainModule\MainBinder.ts
 */

import { FBinder } from "../../../../Framework/Core/FBinder";
import { WebManager } from "../../../../Framework/Managers/WebManager";
import { HttpMethod } from "../../../../Framework/Network/Web/HttpMethod";
import { getNodeChildByName } from "../../../../Framework/Utility/dx/getNodeChildByName";
import { ConfigVO } from "../../Common/ConfigVO";
import Util from "../../Common/Util";
import PopupManager from "../../Common/Window/PopupManager";
import { LoginString, Status } from "./LaunchConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LaunchBinder extends FBinder {

    private txtInfo: cc.Label;
    private txtLoadingNum: cc.Label;
    private ldProgress: cc.Node;
    private curStatus: Status;

    protected initViews(): void {
        super.initViews();
        this.txtInfo = getNodeChildByName(this.asset, "txtInfo", cc.Label);
        this.ldProgress = getNodeChildByName(this.asset, "ldProgress");
        this.txtLoadingNum = getNodeChildByName(this.ldProgress, "txtLoadingNum", cc.Label);
        this.ldProgress.active = false;
    }

    public setCurStatus(status: Status) {
        this.curStatus = status;
        this.ldProgress.active = status == Status.loading;
        this.txtInfo.node.active = status == Status.check;
        if (status == Status.check) {
            this.txtInfo.string = LoginString.CHECK;
        }
    }

    public setLoadProgress(progress: number) {
        let p = progress * 100;
        this.ldProgress.getComponent(cc.ProgressBar).progress = progress;
        this.txtLoadingNum.string = Util.getKeepNum(p, 0) + "%";
    }

    protected addEvents(): void {
    }

}
