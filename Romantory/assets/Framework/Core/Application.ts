/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 框架启动入口
 * @LastEditTime : 2021-02-19 17:41:22
 * @FilePath: \RomantoryApp\assets\Framework\Core\Application.ts
 */
import { IContext } from "../Interfaces/IContext";
import { FContext } from "./FContext";
import { FScene } from "./FScene";
import { Assets } from "./Assets";
import { dispatchFEvent } from "../Utility/dx/dispatchFEvent";
import { SceneEvent } from "../Events/SceneEvent";
import { AudioManager } from "../Managers/AudioManager";

export class Application {
    public static ClassName: string = "Application";
    public static Size: cc.Vec2 = cc.v2(1080, 1920);
    public static CurrentScene: FScene = null;
    private static context: IContext = null;
    public static CanvasScale: cc.Vec2 = cc.v2(1, 1);

    private static isBootStrap: boolean = false;
    /**
     * 
     * @param context 
     * @param stageSize 
     * @param assetClass 
     */
    public static Bootstrap(context: typeof FContext | IContext, stageSize?: cc.Vec2, assetClass?: typeof Assets): void {
        if (this.isBootStrap) return;
        this.SetApplicationSize(stageSize);
        if (assetClass != null) new assetClass();
        else new Assets();
        if (this.context) this.context.dispose();
        if (typeof context === "function") this.context = new context();
        else this.context = context;
        this.context.initialize();
        this.isBootStrap = true;
    }

    public static SetApplicationSize(stageSize: cc.Vec2): void {
        if (stageSize != null) {
            this.Size = stageSize;
        }
    }

    public static SetCurrentScene(scene: FScene): void {
        this.CurrentScene = scene;

        if (("isLayout" in scene) && scene["isLayout"])// 启用布局
        {
            if (cc.sys.isNative)// 只在打包成Native时才生效
            {
                if ("isNativeLockOrien" in scene && scene["isNativeLockOrien"] && "nativeOrientation" in scene) {

                }
            } else {
                if (("isWebOrien" in scene) && scene["isWebOrien"]) {

                }
            }
        }
        dispatchFEvent(new SceneEvent(SceneEvent.SET_CURRENT_SCENE, cc.director.getScene().name));
    }

    public static OnCurrentSceneDestroy(): void {
        this.CurrentScene = null;
    }

    //设置按钮声音
    public static SetButtonSound(): void {
        if (cc.Button.prototype["touchBeganClone"]) return;
        cc.Button.prototype["touchBeganClone"] = cc.Button.prototype["_onTouchBegan"];
        cc.Button.prototype["_onTouchBegan"] = function (event) {
            if (this.interactable && this.enabledInHierarchy && AudioManager.IsCanPlayEffect) {
                AudioManager.PlayEffect("button");
            }
            this.touchBeganClone(event);
        }
    }

    //文本添加字体
    public static AddFont(): void {
        if (cc.Label.prototype["onLoadClone"]) return;
        cc.Label.prototype["onLoadClone"] = cc.Label.prototype["onLoad"];
        cc.Label.prototype["onLoad"] = function () {
            if (!this.font) {
                cc.assetManager.resources.load("Fonts/ALKATIPTor", cc.Font, (err, res) => {
                    if (this.node) {
                        this.font = res;
                        this._forceUpdateRenderData(true);
                    }
                })
            }
            this.onLoadClone();
        }
    }

    public static Exit(): void {
        this.context && this.context.dispose();
        if (cc.sys.isNative) {
            cc.game.end();
            cc.director.end();
        }
    }
}