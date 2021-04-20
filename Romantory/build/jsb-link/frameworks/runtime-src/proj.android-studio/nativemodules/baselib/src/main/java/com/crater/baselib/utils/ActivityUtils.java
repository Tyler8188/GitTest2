package com.crater.baselib.utils;

import android.app.Activity;
import android.os.Build;

import java.lang.ref.WeakReference;

/**
 * Author: 陈勇
 * Version: 1.0
 * Date: 2021/3/2
 * Mender:
 * Modify:
 * Description: Activity工具类
 */
public class ActivityUtils {

    /**
     * 判断Activity是否被销毁
     *
     * @param activity
     * @return
     */
    public static boolean assertActivityDestroyed(Activity activity) {
        if (activity == null) {
            return true;
        }

        WeakReference<Activity> weakReference = new WeakReference<>(activity);
        Activity activityRef = weakReference.get();
        if (activityRef != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                return activity.isDestroyed();
            } else {
                return activity.isFinishing();
            }
        }

        return true;
    }
}
