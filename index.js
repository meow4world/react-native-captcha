/*
 * @Author: cc
 * @Date: 2021-02-24 15:26:33
 * @LastEditors: cc
 * @LastEditTime: 2021-03-10 17:04:13
 * @Description: X.X
 */

import { NativeModules, NativeEventEmitter } from 'react-native'

const { CaptchaHelper } = NativeModules
const EventEmitter = new NativeEventEmitter(CaptchaHelper)

/**
 * @description: 监听组
 */
const listeners = {}

/**
 * @description: 初始化（暂时支持默认参数：传统验证码）
 * @param {String} captchaid
*/
export function init(captchaid) {
  CaptchaHelper.init(captchaid)
}

/**
 * @description: 弹出验证码
 */
export function showCaptcha() {
  CaptchaHelper.showCaptcha()
}

/**
 * @description: 验证码组件初始化完成
 * @param {Function} callback
 */
export function verifyCodeInitFinishListener(callback) {
  listeners[callback] = EventEmitter.addListener(
    'verifyCodeInitFinish', res => callback(res)
  )
}

/**
 * @description: 验证码组件初始化出错
 * @param {Fuction} callback
 */
export function verifyCodeInitFailedListener(callback) {
  listeners[callback] = EventEmitter.addListener(
    'verifyCodeInitFailed', res => callback(res)
  )
}

/**
 * @description: 完成验证之后的回调
 * @param {Fuction} callback
 */
export function verifyCodeValidateFinishListener(callback) {
  listeners[callback] = EventEmitter.addListener(
    'verifyCodeValidateFinish', res => callback(res)
  )
}

/**
 * @description: 关闭验证码窗口后的回调
 * @param {Fuction} callback
 */
export function verifyCodeCloseWindowListener(callback) {
  listeners[callback] = EventEmitter.addListener(
    'verifyCodeCloseWindow', res => callback(res)
  )
}

const curry = (fn) => ((...args) => {
  args.forEach(i => fn(i))
  return curry(fn)
})

/**
 * @description: 移除监听
 * @param {Function} callback
 */
export const removeListener = curry(
  callback => {
    if (listeners[callback]) {
      listeners[callback].remove()
      listeners[callback] = null
    }
  }
)


