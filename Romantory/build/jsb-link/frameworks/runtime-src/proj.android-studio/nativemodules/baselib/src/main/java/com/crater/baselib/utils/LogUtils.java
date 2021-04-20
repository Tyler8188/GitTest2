package com.crater.baselib.utils;

import android.util.Log;

/**
 * Author: 陈勇
 * Version: 1.0
 * Date: 2021/3/2
 * Mender:
 * Modify:
 * Description: Log工具类
 */
public class LogUtils {

    public static void i(String tag, String msg) {
        if (DebugUtils.isLogDebugMode) {
            Log.i(tag, msg);
        }
    }

    public static void e(String tag, String msg) {
        if (DebugUtils.isLogDebugMode) {
            Log.e(tag, msg);
        }
    }
}
