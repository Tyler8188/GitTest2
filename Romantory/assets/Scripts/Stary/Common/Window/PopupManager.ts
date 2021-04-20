import { Application } from "../../../../Framework/Core/Application";
import { Assets } from "../../../../Framework/Core/Assets";
import { GameLayer } from "../../../../Framework/Enums/GameLayer";
import { Loader } from "../../../../Framework/Loaders/Loader";
import { ResourceManager } from "../../../../Framework/Managers/ResourceManager";
import { AssetUtility } from "../../../../Framework/Utility/AssetUtility";
import { cancelDelayReleaseRes } from "../../../../Framework/Utility/dx/cancelDelayReleaseRes";
import Alert from "./Alert";
import RequestMask from "./RequestMask";
import Tips from "./Tips";

export default class PopupManager {
    private static requestCount: number = 0;
    private static requestMaskNode: cc.Node = null;
    public static alert(params: AlertInfo): void {
        let prefabName = params.prefabPath || "Common/Alert"
        let loader: Loader = Loader.Get();
        loader.cacheAsset = true;
        loader.addCallback(null, () => {
            let node: cc.Node = ResourceManager.InstantiatePrefab(prefabName);
            node.getComponent(Alert).init(params);
            node.getComponent(Alert).show(Application.CurrentScene.getLayer(GameLayer.Popup));
        }, () => { });
        let assetData = Assets.GetAssets([prefabName]);
        cancelDelayReleaseRes(assetData.assets);
        AssetUtility.RemoveInvalidAsset(assetData);
        loader.loads(assetData.assets, assetData.assetTypes);
    }

    public static tip(params: TipInfo): void {
        let prefabName = params.prefabPath || "Common/Tips"
        let loader: Loader = Loader.Get();
        loader.cacheAsset = true;
        loader.addCallback(null, () => {
            let node: cc.Node = ResourceManager.InstantiatePrefab(prefabName);
            node.getComponent(Tips).init(params);
            node.getComponent(Tips).show(Application.CurrentScene.getLayer(GameLayer.Window));
        }, () => { });
        let assetData = Assets.GetAssets([prefabName]);
        cancelDelayReleaseRes(assetData.assets);
        AssetUtility.RemoveInvalidAsset(assetData);
        loader.loads(assetData.assets, assetData.assetTypes);
    }

    public static showRequestMask() {
        this.requestCount++;
        if (this.requestCount > 1) {
            return
        }
        let prefabName = "Common/RequestMask"
        let loader: Loader = Loader.Get();
        loader.cacheAsset = true;
        loader.addCallback(null, () => {
            if (this.requestCount > 0) {
                let node: cc.Node = ResourceManager.InstantiatePrefab(prefabName);
                node.getComponent(RequestMask).show(Application.CurrentScene.getLayer(GameLayer.WindowMask));
                this.requestMaskNode = node;
            }
        }, () => { });
        let assetData = Assets.GetAssets([prefabName]);
        cancelDelayReleaseRes(assetData.assets);
        AssetUtility.RemoveInvalidAsset(assetData);
        loader.loads(assetData.assets, assetData.assetTypes);
    }

    public static hideRequestMask() {
        this.requestCount--;
        if (this.requestCount <= 0) {
            if (this.requestMaskNode) {
                this.requestMaskNode.removeFromParent();
                this.requestMaskNode = null;
            }
        }
    }

}