export default class DownImage{
    public static downloadRemoteImageAndSave(url:string, callback){
        let names = url.split("/");
        let tempFileName = names[names.length - 1];
        if(jsb){
            let dirpath = jsb.fileUtils.getWritablePath() + 'save_remote_image_res/';
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
                            jsb.fileUtils.createDirectory(dirpath);
                        }
                        if (jsb.fileUtils.writeDataToFile(new Uint8Array(xhr.response), dirpath + tempFileName)) {
                            callback(dirpath + tempFileName);
                        } 
                    } 
                }
            }.bind(this);
            //responseType一定要在外面设置
            xhr.responseType = 'arraybuffer';
            xhr.open("GET", url, true);
            xhr.send();
            cc.assetManager.loadRemote
        }
    }
}