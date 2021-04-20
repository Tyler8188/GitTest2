export enum Status {
    check,
    loading
}


export interface LoadSkeletonData {
    skeletonJson: any,
    atlasText: string,
    textures: cc.Texture2D[]
}

export class LoginString {
    public static CHECK = "正在检测数据...";
}

