//
//  NVHoriSemanticItemView.m
//  Navi
//
//  Created by QIANSC on 2020/11/9.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVHoriSemanticItemView.h"
#import "NVUserData.h"

@implementation NVHoriSemanticItemView{
    //    NSBox *box;
    NSTextField *itemTitle;
    NSTextField *itemDesc;
    NSTextField *itemCode;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    NVHoriSemanticItemView *view = [super initWithCoder:coder];
    view.boxType = NSBoxCustom;
    view.borderColor = [NSColor disabledControlTextColor];
    view.borderType = NSLineBorder;
    view.borderWidth = 1;
    view.cornerRadius = 3;
    view.wantsLayer = YES;
    for(NSView *v in view.subviews) {
        //        if ([v.identifier isEqual:@"borderBox"]) {
        //            box = v;
        //        }
        if ([v.identifier isEqual:@"ItemTitle"]) itemTitle = v;
        if ([v.identifier isEqual:@"ItemDesc"]) itemDesc = v;
        if ([v.identifier isEqual:@"ItemCode"]) itemCode = v;
    }
    //    box.fillColor = [NSColor systemGrayColor];
    //    box.borderWidth = 0;
    return view;
}

-(void)setSpec:(NVHoriSpec)borderSpec{
    _spec = borderSpec;
    [self drawStyle];
    itemTitle.stringValue = [NSString stringWithFormat:@"%d", (int)[self dev: _spec]];
    itemDesc.stringValue = self.spec.cmeaning;

    if (self.spec.code && self.spec.code.length > 10){
        itemCode.stringValue = [NSString stringWithFormat:@"%@...", [self.spec.code substringToIndex:9]];
    } else {
        itemCode.stringValue = self.spec.code;
    }
    
    self.toolTip = [NSString stringWithFormat:@"%@ %@", self.spec.code , self.spec.cmeaning];
    //    box.cornerRadius = 0;
    //    box.boxType = NSBoxCustom;
    //    box.borderType = NSLineBorder;
    //    box.wantsLayer = true;
}


-(void)drawStyle {
    [super drawStyle];
    if (self.isSelected) {
        self.borderColor = [NSColor controlAccentColor];
        itemTitle.textColor = [NSColor controlAccentColor];
        itemDesc.textColor = [NSColor controlAccentColor];
        itemCode.textColor = [NSColor controlAccentColor];
    } else if (self.isHover) {
        self.borderColor = [NSColor disabledControlTextColor];
        itemTitle.textColor = [NSColor secondaryLabelColor];
        itemDesc.textColor = [NSColor secondaryLabelColor];
        itemCode.textColor = [NSColor secondaryLabelColor];
    } else {
        self.fillColor  = [NSColor controlBackgroundColor];
        self.borderColor = [NSColor windowBackgroundColor];
        itemTitle.textColor = [NSColor secondaryLabelColor];
        itemDesc.textColor = [NSColor secondaryLabelColor];
        itemCode.textColor = [NSColor secondaryLabelColor];
    }
}

-(double)dev:(NVHoriSpec) spec{
    NSDictionary *data = [NVUserData userData];
    if ([data[@"unit"] isEqual:@"pt"]) {
        return spec.ios;
    } else if ([data[@"unit"] isEqual:@"dp"]) {
        return spec.android;
    } else {
        return spec.h5;
    }
}

@end
