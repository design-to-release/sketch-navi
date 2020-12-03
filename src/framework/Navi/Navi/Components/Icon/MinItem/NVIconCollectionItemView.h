//
//  NVIconCollectionItemView.h
//  Navi
//
//  Created by QIANSC on 2020/11/6.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <SVGKit/SVGKit.h>
#import "SVGLoader.h"
#import "NVToggleBox.h"
#import "NVIconSource.h"

NS_ASSUME_NONNULL_BEGIN

@interface NVIconCollectionItemView : NVToggleBox

@property (nonatomic) NVIconSpec spec;
@property (nonatomic, strong) IBOutlet SVGKFastImageView *fastImageView;

@end

NS_ASSUME_NONNULL_END
