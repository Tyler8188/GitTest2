/*
 * @Author: 
 * @Date: 2021-01-29 12:31:04
 * @Description: 
 * @LastEditTime : 2021-02-23 15:40:33
 * @FilePath: \RomantoryApp\assets\Framework\Utility\dx\graySprite.ts
 */

export function graySprite(gray: boolean, sp: cc.Sprite) {
    let material = null;
    if (gray) {
        material = cc.Material.getBuiltinMaterial('2d-gray-sprite');
    }
    else {
        material = cc.Material.getBuiltinMaterial('2d-sprite');
    }

    material = cc.MaterialVariant.create(material, sp);
    sp.setMaterial(0, material);
}
