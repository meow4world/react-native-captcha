
# react-native-captcha

## 声明

1. 本项目是为了能在react-native 0.60 以上版本使用 [网易易盾行为验证码](https://support.dun.163.com/documents/15588062143475712?docId=150401879704260608)
2. 目前仅支持传统验证码简单配置，需要的其他配置自行用[patch-package](https://github.com/ds300/patch-package)修改或提issues
3. 建议用webview去拿数据，官方其实也是这样处理的...

## 1. 安装

`$ npm install react-native-captcha-yidun --save`

or

`$ yarn add react-native-captcha-yidun`

## 2. 配置

### 2.1 Android

* 无

### 2.2 ios

```shell
cd ios && pod install

```

## 3. 引用

### 3.1 js

参考：[index.js](https://github.com/meow4world/react-native-captcha/blob/main/index.js)

### 3.2 example

参考：[App.js](https://github.com/meow4world/react-native-captcha/blob/main/example/App.js)