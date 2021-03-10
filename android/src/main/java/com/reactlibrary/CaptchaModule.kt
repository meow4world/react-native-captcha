package com.reactlibrary

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CaptchaModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val captchaHelper = CaptchaHelper(reactContext)

    override fun getName(): String {
        return "CaptchaHelper"
    }

    @ReactMethod
    fun init(captchaId: String) {
        currentActivity?.let { captchaHelper.init(it,captchaId) }
    }

    @ReactMethod
    fun debug(debug: Boolean) {
        captchaHelper.debug(debug)
    }

    @ReactMethod
    fun showCaptcha() {
        currentActivity?.let {
            it.runOnUiThread {
              captchaHelper.show()
            }
        }

    }

    @ReactMethod
    fun showCaptchaNoSense() {
        currentActivity?.let {
            it.runOnUiThread {
                captchaHelper.showNoSense()
            }
        }
    }
}