/*
 * @Author: cc
 * @Date: 2021-03-10 15:25:56
 * @LastEditors: cc
 * @LastEditTime: 2021-03-10 16:57:31
 * @Description: X.X
 */

type Callback<T> = (result: T) => void
type baseResult = {
  status: string,
  code?: number
}
type messageResult = {
  message: string
} & baseResult
type validateResult = {
  validate: string
} & messageResult
type Fn = () => void

declare module "react-native-captcha" {
  export function init(captchaid: string): void
  export function showCaptcha(): void
  export function verifyCodeInitFinishListener(callback: Callback<baseResult>): void
  export function verifyCodeInitFailedListener(callback: Callback<messageResult>): void
  export function verifyCodeValidateFinishListener(callback: Callback<validateResult>): void
  export function verifyCodeCloseWindowListener(callback: Callback<validateResult & {type?: String}>): void
  export function removeListener(fn: Fn): Fn
}