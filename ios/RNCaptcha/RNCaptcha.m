//
//  RNCaptcha.m
//  RNCaptcha
//
//  Created by meow4world on 2021/2/25.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "RNCaptcha.h"
#import <React/RCTLog.h>

@implementation CaptchaHelper {
  NTESVerifyCodeManager *_manager;
  bool hasListeners;
}

// 在添加第一个监听函数时触发
- (void)startObserving {
  hasListeners = YES;
}

// 停止
- (void)stopObserving {
  hasListeners = NO;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(init: (NSString *)captchaid) {
    NSLog(@"收到初始化captchaid:%@",captchaid);
    self->_manager = [NTESVerifyCodeManager getInstance];
    if (captchaid != nil && self->_manager) {
      
      // 如果需要了解组件的执行情况,则实现回调
      self->_manager.delegate = self;
          
      // 传统验证码
      // NSString *captchaid = captchaid;
      self->_manager.mode = NTESVerifyCodeNormal;
      
      [self->_manager configureVerifyCode:captchaid timeout:7.0];
      
      // 设置语言
      self->_manager.lang = NTESVerifyCodeLangCN;
      
      // 设置透明度
      self->_manager.alpha = 1;
      
      // 设置颜色
      self->_manager.color = [UIColor colorWithWhite:0 alpha:0.3];
      
      // 设置frame
      self->_manager.frame = CGRectNull;
      
      // 是否隐藏关闭按钮
      self->_manager.closeButtonHidden = NO;
      
    }
}

RCT_REMAP_METHOD(showCaptcha,
                 : (RCTPromiseResolveBlock)resolve
                 : (RCTPromiseRejectBlock)reject) {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] delegate].window.windowLevel = UIWindowLevelAlert;
        // 显示验证码
        [self->_manager openVerifyCodeView];
        [self startObserving];
        resolve(nil);
    });
    
}

#pragma mark - NTESVerifyCodeManagerDelegate

/**
 * 验证码组件初始化完成
 */
- (void)verifyCodeInitFinish {
  if (hasListeners) {
    [self sendEventWithName:VERIFY_CODE_INIT_FINISH body:@{@"status": @"verifyCodeInitFinish"}];
  }
  NSLog(@"收到初始化完成的回调");
}

/**
 * 验证码组件初始化出错
 *
 * @param message 错误信息
 */
- (void)verifyCodeInitFailed:(NSString *)message{
  if (hasListeners) {
    [self sendEventWithName:VERIFY_CODE_INIT_FAILED body:@{
      @"status": @"verifyCodeInitFailed",
      @"message": message,
    }];
  }
  NSLog(@"收到初始化失败的回调:%@",message);
}

/**
 * 完成验证之后的回调
 *
 * @param result 验证结果 BOOL:YES/NO
 * @param validate 二次校验数据，如果验证结果为false，validate返回空
 * @param message 结果描述信息
 *
 */
- (void)verifyCodeValidateFinish:(BOOL)result validate:(NSString *)validate message:(NSString *)message{

  if (hasListeners) {
    [self sendEventWithName:VERIFY_CODE_VALIDATE_FINISH body:@{
      @"status": @"verifyCodeValidateFinish",
      @"result" : @(result),
      @"validate": validate,
      @"message": message,
    }];
  }
  NSLog(@"收到验证结果的回调:(%d,%@,%@)", result, validate, message);
}

/**
 * 关闭验证码窗口后的回调
 */
- (void)verifyCodeCloseWindow{
NSLog(@"收到关闭验证码视图的回调");
  //用户关闭验证后执行的方法
  if (hasListeners) {
    [self sendEventWithName:VERIFY_CODE_CLOSE_WINDOW body:@{@"status": @"verifyCodeCloseWindow"}];
    [self stopObserving];
  }
    
  
}

- (NSArray<NSString *> *)supportedEvents {
  return @[VERIFY_CODE_INIT_FINISH, VERIFY_CODE_INIT_FAILED, VERIFY_CODE_VALIDATE_FINISH, VERIFY_CODE_CLOSE_WINDOW];
}


@end
