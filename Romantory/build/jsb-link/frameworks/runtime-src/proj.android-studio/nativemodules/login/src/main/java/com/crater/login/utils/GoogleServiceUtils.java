package com.crater.login.utils;

import android.app.Activity;
import android.content.Context;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

/**
 * Author: 陈勇
 * Version: 1.0
 * Date: 2021/3/2
 * Mender:
 * Modify:
 * Description: google服务工具类
 */
public class GoogleServiceUtils {

    /**
     * 检测google服务是否可用
     * 验证是否已在此设备上安装并启用了Google Play服务，并且此设备上安装的版本不早于该客户端所需的版本
     *
     * @param context
     * @return
     */
    public static boolean isServicesAvailable(Context context) {
        return (GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(context) == ConnectionResult.SUCCESS);
    }

    /**
     * 先检测google服务是否可用，不可用时弹出对话框
     * 注：该方法必须在主线程中调用
     *
     * @param activity
     * @return
     */
    public static boolean makeServicesAvailable(Activity activity) {
        if (!isServicesAvailable(activity)) {
            GoogleApiAvailability.getInstance().makeGooglePlayServicesAvailable(activity);
            return false;
        }

        return true;
    }
}
