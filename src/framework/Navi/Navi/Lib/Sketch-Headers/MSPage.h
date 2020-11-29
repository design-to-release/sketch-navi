//
//  MSPage.h
//  Navi
//
//  Created by Qian,Sicheng on 2020/11/26.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//
#import "MSLayer.h"
#import "MSLayerArray.h"

@interface MSPage: NSObject

-(void)addLayers:(NSArray*) array;
-(void)addLayer:(MSLayer*) layer;

@end
