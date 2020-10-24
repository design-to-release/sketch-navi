//
//  NVLinePanel.h
//  Navi
//
//  Created by Qian,Sicheng on 2020/10/15.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import "NVPanelHeaderView.h"
#import "NVPanelController.h"
#import "NVLineCollectionView.h"

NS_ASSUME_NONNULL_BEGIN

@interface NVLinePanel : NVPanelController

@property (nonatomic,strong) IBOutlet NVLineCollectionView *collectionView;
@property (nonatomic,strong) NSArray<MSLayer*> *selections;

@end

NS_ASSUME_NONNULL_END
