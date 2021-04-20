
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainPage extends cc.Component {

    start() {
        this.init();
    }

    public async init(): Promise<void> {
        await this.loadUI();
        this.initUI();
    }

    public show(data?: any): void {
        this.node.active = true;
    }

    public reset(): void {
    }

    public async loadUI(): Promise<void> {
    }

    public initUI() {
    }

    public hide(): void {
        this.node.active = false;
    }



}