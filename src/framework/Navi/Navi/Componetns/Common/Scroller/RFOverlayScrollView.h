//
//  RFOverlayScrollView.h
//  RFOverlayScrollView
//
//  Created by Tim Brückmann on 31.12.12.
//  Copyright (c) 2012 Rheinfabrik. All rights reserved.
//

#import <Cocoa/Cocoa.h>

@interface RFOverlayScrollView : NSScrollView

@property int headerOffset;

-(int)tableHeaderOffsetFromSuperview;

@end
