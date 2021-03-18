//
//  MSStyledLayer.h
//  Navi
//
//  Created by Qian,Sicheng on 2021/3/5.
//  Copyright © 2021 Qian,Sicheng. All rights reserved.
//
#import "_MSStyledLayer.h"
#import "MSSharedStyle.h"

@interface MSStyledLayer : _MSStyledLayer
{
    BOOL ignoreStyleDidChangeNotifications;
}

+ (void)pasteExportOptions:(id)arg1 onLayers:(id)arg2;
+ (void)pasteTextStyle:(id)arg1 onLayers:(id)arg2 document:(id)arg3;
+ (void)pasteStyleDict:(id)arg1 onLayers:(id)arg2 document:(id)arg3;
+ (void)pasteStyleFromPasteboard:(id)arg1 onLayers:(id)arg2 document:(id)arg3;
+ (void)pasteStyleFromPasteboardOnLayers:(id)arg1 document:(id)arg2;
+ (id)supportedPasteboardTypesForStyleCopying;
@property(retain, nonatomic) MSColor *fillColor;
- (void)setStyle:(id)arg1;
- (BOOL)propertiesAreEqual:(id)arg1 forPurpose:(unsigned long long)arg2;
- (BOOL)hasMarkers;
- (BOOL)hasEnabledFill;
- (id)usedStyle;
- (BOOL)hasEnabledBackgroundBlur;
- (void)multiplyBy:(double)arg1;
- (void)layerStyleDidChange;
- (id)sharedObject;
- (void)correctInvalidGamma;
- (id)setupWithLayerBuilderDictionary:(id)arg1;
- (id)CSSAttributes;
- (id)sharedStylesReferencedInDocument:(id)arg1;
- (id)copiedStyleAttributesForLayer:(id)arg1;
- (void)writeStyleToPasteboard:(id)arg1;
- (void)copyStyleToPasteboard:(id)arg1;
- (id)copyStyleToPasteboard;
@property(nonatomic) __weak MSSharedStyle *sharedStyle;
- (id)foreignSharedStyles;
- (id)localSharedStyles;
- (id)styleContainer;
- (void)updateSharedStyleToMatchSelf;
- (id)createSharedStyleWithName:(id)arg1;
- (void)resetSharedStyle;
@property(readonly, nonatomic) BOOL isSharedStyleOutOfSync;
- (void)updateSharedStyleReferencesFrom:(id)arg1 to:(id)arg2;
- (void)applyOverrides:(id)arg1 document:(id)arg2 visitedSymbols:(id)arg3;
- (void)applyOverride:(id)arg1 document:(id)arg2;

// Remaining properties
@property(readonly, nonatomic) struct CGAffineTransform CGTransformForFrame;
@property(readonly, nonatomic) struct CGRect bounds;
@property(readonly, copy) NSString *debugDescription;
@property(readonly, copy) NSString *description;
@property(readonly, nonatomic) BOOL hasTransforms;
@property(readonly) unsigned long long hash;
@property(readonly, nonatomic) struct BCEdgePaddings influenceRectEdgePaddingsThatCascadeToContainedLayers;
@property(readonly, nonatomic) BOOL isFlippedHorizontal;
@property(readonly, nonatomic) BOOL isFlippedVertical;
@property(readonly, nonatomic) BOOL isLayerExportable;
@property(readonly, nonatomic) BOOL isVisible;
@property(readonly, nonatomic) NSString *objectID;
@property(readonly, nonatomic) struct CGPoint origin;
@property(readonly, nonatomic) struct CGRect rect;
@property(readonly, nonatomic) double rotation;
@property(readonly) Class superclass;

@end
