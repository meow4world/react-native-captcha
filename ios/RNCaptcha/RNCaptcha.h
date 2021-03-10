//
//  RNCaptcha.h
//  RNCaptcha
//
//  Created by meow4world on 2021/2/25.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <VerifyCode/NTESVerifyCodeManager.h>

#define VERIFY_CODE_INIT_FINISH @"verifyCodeInitFinish"
#define VERIFY_CODE_INIT_FAILED @"verifyCodeInitFailed"
#define VERIFY_CODE_VALIDATE_FINISH @"verifyCodeValidateFinish"
#define VERIFY_CODE_CLOSE_WINDOW @"verifyCodeCloseWindow"

NS_ASSUME_NONNULL_BEGIN

@interface CaptchaHelper
: RCTEventEmitter <RCTBridgeModule, NTESVerifyCodeManagerDelegate>
@end

NS_ASSUME_NONNULL_END
