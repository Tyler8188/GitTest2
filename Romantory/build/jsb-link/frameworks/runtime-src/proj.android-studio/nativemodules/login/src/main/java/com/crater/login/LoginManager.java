package com.crater.login;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.IntDef;

import com.crater.baselib.utils.ActivityUtils;
import com.crater.baselib.utils.LogUtils;
import com.crater.login.utils.GoogleServiceUtils;
import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * Author: 陈勇
 * Version: 1.0
 * Date: 2021/3/2
 * Mender:
 * Modify:
 * Description: 登录管理类
 */
public class LoginManager {

    // 登录类型  1/2 --> google/facebook
    @IntDef({LOGIN_TYPE.GOOGLE, LOGIN_TYPE.FACEBOOK})
    @Retention(RetentionPolicy.SOURCE)
    public @interface LOGIN_TYPE {
        int GOOGLE = 1;
        int FACEBOOK = 2;
    }

    private static final String TAG = "LoginManager";
    /**
     * google登录requestCode
     */
    private static final int GOOGLE_RC_SIGN_IN = 9001;

    private GoogleSignInClient mGoogleSignInClient = null;
    /**
     * facebook登录按钮
     */
    private LoginButton mFacebookLoginButton = null;
    /**
     * facebook登录回调
     */
    private CallbackManager mCallbackManager = null;
    /**
     * 登录类型
     */
    private int mLoginType = 0;
    /**
     * 登录回调接口
     */
    private LoginListener mLoginListener = null;
    /**
     * 退出登录回调接口
     */
    private LogoutListener mLogoutListener = null;

    private LoginManager() {

    }

    private static class InstanceHolder {
        private static final LoginManager sInstance = new LoginManager();
    }

    public static LoginManager getInstance() {
        return InstanceHolder.sInstance;
    }

    /**
     * 初始化登录
     *
     * @param activity
     */
    public void init(Activity activity) {
        initGoogleLogin(activity);
        initFacebookLogin(activity);
    }

    /**
     * 登录
     *
     * @param activity
     * @param loginType 登录类型
     * @param listener
     */
    public void login(Activity activity, @LOGIN_TYPE int loginType, LoginListener listener) {
        if (ActivityUtils.assertActivityDestroyed(activity)) {
            if (listener != null) {
                listener.onFail();
            }
            return;
        }

        mLoginType = loginType;
        mLoginListener = listener;

        switch (mLoginType) {
            case LOGIN_TYPE.GOOGLE:
                loginWithGoogle(activity);
                break;

            case LOGIN_TYPE.FACEBOOK:
                loginWithFacebook();
                break;

            default:
                break;
        }
    }

    /**
     * 退出登录
     *
     * @param activity
     * @param loginType 登录类型
     * @param listener
     */
    public void logout(Activity activity, @LOGIN_TYPE int loginType, LogoutListener listener) {
        if (ActivityUtils.assertActivityDestroyed(activity)) {
            if (listener != null) {
                listener.onSuccess();
            }
            return;
        }

        mLogoutListener = listener;

        switch (loginType) {
            case LOGIN_TYPE.GOOGLE:
                logoutGoogle(activity);
                break;

            case LOGIN_TYPE.FACEBOOK:
                logoutFacebook();
                break;

            default:
                break;
        }
    }

    /**
     * 在登录页面activity的onActivityResult()方法中调用该方法
     *
     * @param requestCode
     * @param resultCode
     * @param data
     */
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (mLoginType) {
            case LOGIN_TYPE.GOOGLE:
                if (requestCode == GOOGLE_RC_SIGN_IN) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        onLoginCancel();
                    } else {
                        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
                        handleSignInResult(task);
                    }
                }
                break;

            case LOGIN_TYPE.FACEBOOK:
                if (mCallbackManager != null) {
                    mCallbackManager.onActivityResult(requestCode, resultCode, data);
                }
                break;

            default:
                break;
        }
    }

    /**
     * 初始化google登录
     *
     * @param activity
     */
    private void initGoogleLogin(Activity activity) {
        if (GoogleServiceUtils.makeServicesAvailable(activity)) {
            GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                    .requestIdToken(activity.getString(R.string.login_google_service_client_id))
                    .requestEmail()
                    .build();
            mGoogleSignInClient = GoogleSignIn.getClient(activity, gso);
        }
    }

    /**
     * 初始化facebook登录
     *
     * @param activity
     */
    private void initFacebookLogin(Activity activity) {
        mCallbackManager = CallbackManager.Factory.create();
        mFacebookLoginButton = new LoginButton(activity);
        mFacebookLoginButton.setPermissions("email");
        mFacebookLoginButton.registerCallback(mCallbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                if (loginResult != null && loginResult.getAccessToken() != null) {
                    AccessToken accessToken = loginResult.getAccessToken();
                    onLoginSuccess(accessToken.getUserId(), accessToken.getToken());
                    LogUtils.i(TAG, "facebook login success userId: " + accessToken.getUserId() + ", token: " + accessToken.getToken());
                } else {
                    onLoginFail();
                }
            }

            @Override
            public void onCancel() {
                onLoginCancel();
            }

            @Override
            public void onError(FacebookException error) {
                onLoginFail();
            }
        });
    }

    /**
     * google登录
     *
     * @param activity
     */
    private void loginWithGoogle(Activity activity) {
        if (GoogleServiceUtils.makeServicesAvailable(activity)) {
            if (mGoogleSignInClient == null) {
                initGoogleLogin(activity);
            }

            if (mGoogleSignInClient != null) {
                Intent signInIntent = mGoogleSignInClient.getSignInIntent();
                activity.startActivityForResult(signInIntent, GOOGLE_RC_SIGN_IN);
            } else {
                onLoginFail();
            }
        } else {
            onLoginFail();
        }
    }

    /**
     * facebook登录
     */
    private void loginWithFacebook() {
        if (mFacebookLoginButton != null) {
            // facebook登录按钮LoginButton内部点击事件回调中实现了登录功能，模拟按钮点击即可实现登录
            mFacebookLoginButton.performClick();
        } else {
            onLoginFail();
        }
    }

    /**
     * 退出google登录
     *
     * @param activity
     */
    private void logoutGoogle(Activity activity) {
        if (mGoogleSignInClient == null) {
            onLogoutSuccess();
            return;
        }

        mGoogleSignInClient.signOut()
                .addOnCompleteListener(activity, task -> {
                    onLogoutSuccess();
                    LogUtils.i(TAG, "google logout");
                });
    }

    /**
     * 退出facebook登录
     */
    private void logoutFacebook() {
        com.facebook.login.LoginManager.getInstance().logOut();
        onLogoutSuccess();
        LogUtils.i(TAG, "facebook logout");
    }

    /**
     * 处理google登录结果
     *
     * @param completedTask
     */
    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            if (account != null) {
                onLoginSuccess(account.getId(), account.getIdToken());
                LogUtils.i(TAG, "google login success id: " + account.getId() + ", idToken: " + account.getIdToken());
            } else {
                onLoginFail();
            }
        } catch (ApiException e) {
            e.printStackTrace();
            onLoginFail();
        }
    }

    /**
     * 登录成功回调
     *
     * @param id
     * @param token
     */
    private void onLoginSuccess(String id, String token) {
        if (mLoginListener != null) {
            mLoginListener.onSuccess(id, token);
        }
    }

    /**
     * 登录取消回调
     */
    private void onLoginCancel() {
        if (mLoginListener != null) {
            mLoginListener.onCancel();
        }
    }

    /**
     * 登录失败回调
     */
    private void onLoginFail() {
        if (mLoginListener != null) {
            mLoginListener.onFail();
        }
    }

    /**
     * 退出登录成功回调
     */
    private void onLogoutSuccess() {
        if (mLogoutListener != null) {
            mLogoutListener.onSuccess();
        }
    }

    /**
     * 登录回调接口
     */
    public interface LoginListener {
        void onSuccess(String id, String token);

        void onCancel();

        void onFail();
    }

    /**
     * 退出登录回调接口
     */
    public interface LogoutListener {
        void onSuccess();
    }
}
