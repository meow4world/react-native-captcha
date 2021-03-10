package com.reactlibrary

import android.app.Activity
import android.widget.Toast
import androidx.annotation.Nullable
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.netease.nis.captcha.Captcha
import com.netease.nis.captcha.CaptchaConfiguration
import com.netease.nis.captcha.CaptchaListener

const val VERIFY_CODE_INIT_FINISH = "verifyCodeInitFinish"
const val VERIFY_CODE_INIT_FAILED = "verifyCodeInitFailed"
const val VERIFY_CODE_VALIDATE_FINISH = "verifyCodeValidateFinish"
const val VERIFY_CODE_CLOSE_WINDOW = "verifyCodeCloseWindow"

class CaptchaHelper(reactContext: ReactApplicationContext) {
    private var mContext: Activity? = null
    private var dimAmount: Float = 0.5f
    private var failedMaxRetryCount: Int = 3
    private var isTouchOutsideDisappear: Boolean = true
    private var langType: CaptchaConfiguration.LangType = CaptchaConfiguration.LangType.LANG_ZH_CN
    private var mCaptchaId: String? = null
    private var mDebug: Boolean = false

    private val mReactContext = reactContext

    fun init(context: Activity, captchaId: String) {
        mContext = context
        mCaptchaId = captchaId
    }

    fun debug(debug: Boolean) {
        mDebug = debug
    }

    fun show() {
        val configuration: CaptchaConfiguration = CaptchaConfiguration
                .Builder()
                .captchaId(mCaptchaId)
                .listener(captchaListener)
                .languageType(langType)
                .debug(mDebug)
                .backgroundDimAmount(dimAmount)
                .touchOutsideDisappear(isTouchOutsideDisappear)
                .build(mContext)
        val captcha = Captcha.getInstance().init(configuration)
        mContext?.runOnUiThread { captcha.validate() }
    }

    fun showNoSense() {
        val configuration: CaptchaConfiguration = CaptchaConfiguration
                .Builder()
                .captchaId(mCaptchaId)
                .mode(CaptchaConfiguration.ModeType.MODE_INTELLIGENT_NO_SENSE)
                .listener(captchaListener)
                .languageType(langType)
                .debug(mDebug)
                .backgroundDimAmount(dimAmount)
                .touchOutsideDisappear(isTouchOutsideDisappear)
                .useDefaultFallback(true)
                .failedMaxRetryCount(failedMaxRetryCount)
                .build(mContext)
        val captcha = Captcha.getInstance().init(configuration)
        mContext?.runOnUiThread { captcha.validate() }
    }

    @ReactMethod
    fun sendEvent(reactContext: ReactContext, eventName: String, @Nullable params: WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit(eventName, params)
    }

    private val captchaListener = object: CaptchaListener {
        override fun onReady() {
            val params = Arguments.createMap()
            params.putString("status", VERIFY_CODE_INIT_FINISH)
            sendEvent(mReactContext, VERIFY_CODE_INIT_FINISH, params)
        }

        override fun onValidate(result: String?, validate: String?, message: String?) {
            val params = Arguments.createMap()
            params.putString("status", VERIFY_CODE_VALIDATE_FINISH)
            params.putString("result", result)
            params.putString("message", message)
            if (validate!!.isNotEmpty()) {
                showToast("验证成功")
            } else {
                showToast("验证失败")
            }
            sendEvent(mReactContext, VERIFY_CODE_VALIDATE_FINISH, params)
        }

        override fun onError(code: Int, message: String?) {
            val params = Arguments.createMap()
            params.putString("status", VERIFY_CODE_INIT_FAILED)
            params.putInt("code", code)
            params.putString("message", message)
            showToast("验证出错，错误码:$code 错误信息:$message")
            sendEvent(mReactContext, VERIFY_CODE_INIT_FAILED, params)
        }

        override fun onClose(type: Captcha.CloseType?) {
            val params = Arguments.createMap()
            params.putString("status", VERIFY_CODE_CLOSE_WINDOW)
            params.putString("type", type.toString())
            sendEvent(mReactContext, VERIFY_CODE_CLOSE_WINDOW, params)
        }

    }



    fun showToast(msg: String) {
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show()
    }
}