// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { FView } from "../../../../Framework/Core/FView";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { StringUtility } from "../../../../Framework/Utility/StringUtility";
import Util from "../../Common/Util";
import { CategoryStoryData } from "./MainConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainCategoryBookItem extends FView {
    public static ClassName: string = "MainCategoryBookItem";
    @property(cc.Sprite)
    spBg: cc.Sprite = null;
    @property(cc.Label)
    txtName: cc.Label = null;
    @property(cc.Label)
    txtRedNum: cc.Label = null;
    @property(cc.Label)
    txtIntroduction: cc.Label = null;

    private data: CategoryStoryData = null;

    public show(p: cc.Node, data?: CategoryStoryData): void {
        super.show(p, data);
        this.data = data;
        this.txtName.string = data.name;
        this.setRedNum(data.redCount);
        this.setIntroductionStr(data.intro);
        this.loadCoverBg(data.cover);
    }

    public getData(): CategoryStoryData {
        return this.data;
    }

    /**设置阅读次数 */
    private setRedNum(num: number): void {
        this.txtRedNum.string = Util.changeNum2StrSymbol(num) + " Views";
    }

    private setIntroductionStr(introduction: string): void {
        let strLength = StringUtility.GetLength(introduction)
        if (strLength > 107) { /**字符串截取 预定长度107 */
            introduction = introduction.substr(0, 106) + "...";
        }
        this.txtIntroduction.string = introduction;
    }

    private loadCoverBg(cover: string): void {
        ResourceManager.LoadImage(cover, this.spBg);
    }

}
