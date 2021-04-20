package com.crater.romantory;

import android.app.Activity;

import com.crater.login.LoginManager;

import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import java.util.Locale;

/**
 * Author: 陈勇
 * Version: 1.0
 * Date: 2021/3/2
 * Mender:
 * Modify:
 * Description: cocos和原生交互js桥工具类
 * 注：cocos调用原生方法时建议在主线程中执行原生方法（调用runOnUiThread()），原生调用cocos函数必须在GL线程中执行cocos函数（调用callCocosFun()）
 */
public class BridgeUtils {

    /**
     * 登录(cocos调用原生)
     *
     * @param loginType
     */
    public static void login(@LoginManager.LOGIN_TYPE int loginType) {
        runOnUiThread(() -> LoginManager.getInstance().login(Cocos2dxHelper.getActivity(), loginType, new LoginManager.LoginListener() {
            @Override
            public void onSuccess(String id, String token) {
                String authInfoJson = String.format("{\"id\":\"%s\",\"token\":\"%s\"}", id, token);
                callCocosFun(String.format(Locale.CHINA, "cc.onLoginSuccess('%d', '%s')", loginType, authInfoJson));
            }

            @Override
            public void onCancel() {
                callCocosFun(String.format(Locale.CHINA, "cc.onLoginCancel('%d')", loginType));
            }

            @Override
            public void onFail() {
                callCocosFun(String.format(Locale.CHINA, "cc.onLoginFail('%d')", loginType));
            }
        }));
    }

    /**
     * 退出登录(cocos调用原生)
     *
     * @param loginType
     */
    public static void logout(@LoginManager.LOGIN_TYPE int loginType) {
        runOnUiThread(() -> LoginManager.getInstance().logout(Cocos2dxHelper.getActivity(), loginType,
                () -> callCocosFun(String.format(Locale.CHINA, "cc.onLogoutSuccess('%d')", loginType))));
    }

    /**
     * 在主线程中执行任务
     *
     * @param runnable
     */
    private static void runOnUiThread(Runnable runnable) {
        Activity activity = Cocos2dxHelper.getActivity();
        if (activity != null) {
            activity.runOnUiThread(runnable);
        }
    }

    /**
     * 原生调用cocos函数
     *
     * @param eval
     */
    private static void callCocosFun(String eval) {
        Cocos2dxHelper.runOnGLThread(() -> {
            try {
                Cocos2dxJavascriptJavaBridge.evalString(eval);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
