package com.crater.romantory;

import android.content.Context;
import android.content.Intent;

import com.crater.login.LoginManager;

import org.cocos2dx.javascript.service.SDKClass;
import org.cocos2dx.lib.Cocos2dxHelper;

/**
 * Author: 陈勇
 * Version: 1.0
 * Date: 2021/3/2
 * Mender:
 * Modify:
 * Description: SDKClass实现类(SDKClass显示红色不用管，编译时不会报错)
 * 为了统一管理需要在AppActivity生命周期方法中处理的逻辑，防止改动AppActivity，在jsb-link/project.json
 * 文件的serviceClassPath中配置了该类，serviceClassPath会由SDKWrapper进行加载并创建该类的对象，
 * 在AppActivity触发对应的生命周期方法后，该类相应的生命周期方法也会被调用，按需要在对应的方法中处理逻辑即可。
 * 参考：https://forum.cocos.org/t/cocos-creator-sdk/92145中的"利用 SDKClass 绑定APP的生命周期"
 */
public class SDKClassImpl extends SDKClass {

    @Override
    public void init(Context context) {
        super.init(context);
        LoginManager.getInstance().init(Cocos2dxHelper.getActivity());
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        LoginManager.getInstance().onActivityResult(requestCode, resultCode, data);
    }
}
