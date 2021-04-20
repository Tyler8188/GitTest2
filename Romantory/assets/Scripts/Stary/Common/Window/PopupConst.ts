interface AlertButtonInfo {
    btnName: string
    callback: Function
}

interface AlertInfo {
    buttonInfos: AlertButtonInfo[]
    title?: string
    content: string
    prefabPath?: string
}

interface TipInfo {
    text: string
    time?: number
    prefabPath?: string
}