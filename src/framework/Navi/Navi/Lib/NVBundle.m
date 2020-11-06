//
//  NVBundle.m
//  Navi
//
//  Created by Qian,Sicheng on 2020/11/2.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVBundle.h"

@implementation NVBundle

+(NSBundle *)bundlePath {
    NSString* const frameworkBundleID  = @"com.baidu.Navi";
    NSBundle* resourceBundlePath = [NSBundle bundleWithIdentifier:frameworkBundleID];
    return resourceBundlePath;
}

@end