//
//  NVUserInfo.m
//  Navi
//
//  Created by QIANSC on 2020/11/4.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVUserInfo.h"
#import "MSStyleFill.h"

@implementation NVUserInfo {
    MSLayer *_layer;
}

static NSMutableDictionary *cache;

+(instancetype)fromLayer:(MSLayer*) layer {
    if (cache == nil) cache = [NSMutableDictionary new];
    if (cache[layer.objectID]) {
        return cache[layer.objectID];
    }
    NVUserInfo * userInfo = [[NVUserInfo alloc] initWithLayer:layer];
    cache[layer.objectID] = userInfo;
    return userInfo;
}

-(void)save{
    NSMutableDictionary *origin;
    if (_layer.userInfo == nil) {
        origin = [NSMutableDictionary new];
    } else {
        origin = [_layer.userInfo mutableCopy];
    }
    [origin setObject:self.data forKey:@"com.baidu.navi"];
    _layer.userInfo = origin;
}

-(instancetype)initWithLayer:(MSLayer*) layer {
    // [super init];
    _layer = layer;
    if (layer.userInfo == nil || layer.userInfo[@"com.baidu.navi"] == nil) {

        self.data = [NSMutableDictionary new];
        self.data[@"objectID"] = _layer.objectID;
        
        self.data[@"style"] = [NSMutableDictionary new];
        
        self.data[@"style"][@"fills"] = [NSMutableArray new];
        self.data[@"fillColorCode"] = @"";
        self.data[@"maskCode"] = @"";
        
        self.data[@"cornerRadiusCodes"] = [NSMutableDictionary new];
        
        self.data[@"style"][@"borders"] = [NSMutableArray new];
        self.data[@"borderColorCode"] = @"";
        self.data[@"borderThicknessCode"] = @"";
        
        self.data[@"style"][@"shadows"] = [NSMutableArray new];
        self.data[@"shadowCode"] = @"";
        
        self.data[@"fontColorCode"] = @"";
        self.data[@"fontCode"] = @"";
        self.data[@"textCode"] = @"";
    } else {
        self.data = [layer.userInfo[@"com.baidu.navi"] mutableCopy];
    }
    return self;
}

-(NSString*)objectID { return self.data[@"objectID"]; }
-(void)updateObjectID {
    // 复制的情况下会发生不一致情况
    self.data[@"objectID"] = _layer.objectID;
    [self save];
}

#pragma mark Text

-(NSString*)textCode { return self.data[@"textCode"]; }
-(void)setTextCode:(NSString*)code {self.data[@"textCode"] = code;[self save];}

-(NSString*)fontCode { return self.data[@"fontCode"]; }
-(void)setFontCode:(NSString*)code {self.data[@"fontCode"] = code;[self save];}

-(NSString*)fontWeightCode { return self.data[@"fontWeightCode"]; }
-(void)setFontWeightCode:(NSString*)code {self.data[@"fontWeightCode"] = code;[self save];}

-(NSString*)fontColorCode { return self.data[@"fontColorCode"]; }
-(void)setFontColorCode:(NSString*)code {self.data[@"fontColorCode"] = code;[self save];}

#pragma mark Style-Fill

-(NSString *)fillColorCode { // 默认只返回一个 如果需要多个自行访问data.style.fills 获取 下同
    for(NSDictionary* d in self.data[@"style"][@"fills"]) {
        if (d[@"colorCode"]) return d[@"colorCode"];
    }
    return nil;
}

-(void)setFillColorCode:(NSString*)code {
    if ([self.data[@"style"][@"fills"] count] == 0)
        [self.data[@"style"][@"fills"] addObject:[NSMutableDictionary new]];
    self.data[@"style"][@"fills"][0][@"colorCode"] = code;
    self.data[@"fillColorCode"] = code;
    [self save];
}

-(NSString *)fillMaskCode { // 默认只返回一个 如果需要多个自行访问data.style.fills 获取 下同
    for(NSDictionary* d in self.data[@"style"][@"fills"]) {
        if (d[@"maskCode"]) return d[@"maskCode"];
    }
    return nil;
}

-(void)setFillMaskCode:(NSString*)code {
    if ([self.data[@"style"][@"fills"] count] == 0)
        [self.data[@"style"][@"fills"] addObject:[NSMutableDictionary new]];
    self.data[@"style"][@"fills"][0][@"maskCode"] = code;
    self.data[@"maskCode"] = code;
    [self save];
}

#pragma mark Style-Border

-(NSString *)borderColorCode {
    for(NSDictionary* d in self.data[@"style"][@"borders"]) {
        if (d[@"colorCode"]) return d[@"colorCode"];
    }
    return nil;
}

-(void)setBorderColorCode:(NSString*)code {
    if ([self.data[@"style"][@"borders"] count] == 0)
        [self.data[@"style"][@"borders"] addObject:[NSMutableDictionary new]];
    self.data[@"style"][@"borders"][0][@"colorCode"] = code;
    self.data[@"borderColorCode"] = code;
    [self save];
}


-(NSString *)borderThicknessCode {
    for(NSDictionary* d in self.data[@"style"][@"borders"]) {
        if (d[@"borderThicknessCode"]) return d[@"borderThicknessCode"];
    }
    return nil;
}

-(void)setBorderThicknessCode:(NSString*)code {
    if ([self.data[@"style"][@"borders"] count] == 0)
        [self.data[@"style"][@"borders"] addObject:[NSMutableDictionary new]];
    self.data[@"style"][@"borders"][0][@"borderThicknessCode"] = code;
    self.data[@"borderThicknessCode"] = code;
    [self save];
}

#pragma mark Style-Shadow

-(NSString *)shadowCode {
    for(NSDictionary* d in self.data[@"style"][@"shadows"]) {
        if (d[@"shadowCode"]) return d[@"shadowCode"];
    }
    return nil;
}

-(void)setShadowCode:(NSString*)code {
    if ([self.data[@"style"][@"shadows"] count] == 0) {

        [self.data[@"style"][@"shadows"] addObject:[NSMutableDictionary new]];
    }
    self.data[@"style"][@"shadows"][0][@"shadowCode"] = code;
    self.data[@"shadowCode"] = code;
    [self save];
}


#pragma mark Points - CurvePoint

-(NSString *)cornerRadiusCode {return self.data[@"cornerRadiusCode"];}
-(void)setCornerRadiusCode:(NSString*)code {
    self.data[@"cornerRadiusCode"] = code;
    [self save];
}

-(NSDictionary *)cornerRadiusCodes {return self.data[@"cornerRadiusCodes"];}
-(void)setCornerRadiusCodes:(NSDictionary*)codes {
    self.data[@"cornerRadiusCodes"] = codes;
    [self save];
}


#pragma mark Frame

-(NSString *)gridWidthCode {return self.data[@"gridWidthCode"];}
-(void)setGridWidthCode:(NSString*)code {self.data[@"gridWidthCode"] = code;[self save];}

-(NSString *)gridScaleCode {return self.data[@"gridScaleCode"];}
-(void)setGridScaleCode:(NSString*)code {self.data[@"gridScaleCode"] = code;[self save];}


-(double)originWidth {return [self.data[@"originWidth"] doubleValue];}
-(void)setOriginWidth:(double)code {self.data[@"originWidth"] = [NSString stringWithFormat:@"%f", code];[self save];}

-(double)originHeight {return [self.data[@"originHeight"] doubleValue];}
-(void)setOriginHeight:(double)code {self.data[@"originHeight"] = [NSString stringWithFormat:@"%f", code];[self save];}

-(NSString *)marginType {return self.data[@"marginType"];}
-(void)setMarginType:(NSString*)code {self.data[@"marginType"] = code;[self save];}

-(NSString *)marginLeftCode {return self.data[@"marginLeftCode"];}
-(void)setMarginLeftCode:(NSString*)code {self.data[@"marginLeftCode"] = code;[self save];}
-(NSString *)marginRightCode {return self.data[@"marginRightCode"];}
-(void)setMarginRightCode:(NSString*)code {self.data[@"marginRightCode"] = code;[self save];}
-(NSString *)marginTopCode {return self.data[@"marginTopCode"];}
-(void)setMarginTopCode:(NSString*)code {self.data[@"marginTopCode"] = code;[self save];}
-(NSString *)marginBottomCode {return self.data[@"marginBottomCode"];}
-(void)setMarginBottomCode:(NSString*)code {self.data[@"marginBottomCode"] = code;[self save];}

-(NSString *)marginLeftTarget {return self.data[@"marginLeftTarget"];}
-(void)setMarginLeftTarget:(NSString*)code {self.data[@"marginLeftTarget"] = code;[self save];}
-(NSString *)marginRightTarget {return self.data[@"marginRightTarget"];}
-(void)setMarginRightTarget:(NSString*)code {self.data[@"marginRightTarget"] = code;[self save];}
-(NSString *)marginTopTarget {return self.data[@"marginTopTarget"];}
-(void)setMarginTopTarget:(NSString*)code {self.data[@"marginTopTarget"] = code;[self save];}
-(NSString *)marginBottomTarget {return self.data[@"marginBottomTarget"];}
-(void)setMarginBottomTarget:(NSString*)code {self.data[@"marginBottomTarget"] = code;[self save];}

-(NSString *)iconCode {return self.data[@"iconCode"];}
-(void)setIconCode:(NSString*)code {self.data[@"iconCode"] = code;[self save];}

@end
