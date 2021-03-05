//
//  MSImageData.h
//  Navi
//
//  Created by Qian,Sicheng on 2021/3/5.
//  Copyright © 2021 Qian,Sicheng. All rights reserved.
//

@interface MSImageData : NSObject <NSCopying>
{
    NSData *_sha1;
    NSData *_data;
    NSImage *_image;
    NSObject<OS_dispatch_semaphore> *_dataLock;
//    BCReadWriteLock *_imageLock;
}

+ (id)decodeReferenceFromJSONZipArchive:(id)arg1 withReference:(id)arg2;
+ (id)errorImage;
//@property(readonly, nonatomic) BCReadWriteLock *imageLock; // @synthesize imageLock=_imageLock;
//@property(readonly, nonatomic) NSObject<OS_dispatch_semaphore> *dataLock; // @synthesize dataLock=_dataLock;
@property(retain, nonatomic) NSImage *image; // @synthesize image=_image;
- (BOOL)doesBitmapImageRepRequireDePackingOrDeindexing:(id)arg1;
- (id)ensureBitmapImageRepIsNotIndexedNotPacked:(id)arg1;
- (struct CGImage *)CGImageAtLevelOfDetail:(unsigned long long)arg1 colorSpace:(struct CGColorSpace *)arg2 cache:(id)arg3 owner:(id)arg4;
- (struct CGImage *)CGImageForColorSpace:(struct CGColorSpace *)arg1 cache:(id)arg2 owner:(id)arg3;
- (struct CGImage *)CGImageSuitableForDrawingWithSize:(struct CGSize)arg1 colorSpace:(struct CGColorSpace *)arg2 cache:(id)arg3 owner:(id)arg4;
- (void)correctInvalidGamma;
- (id)imageDataByCorrectingInvalidGamma;
- (void)encodeReferenceInJSONZipArchive:(id)arg1;
- (id)replacementObjectForJSONEncoder:(id)arg1;
- (void)encodeAsJSON:(id)arg1;
- (BOOL)isAssetEqual:(id)arg1;
- (unsigned long long)assetType;
@property(readonly) unsigned long long hash;
- (id)copyWithZone:(struct _NSZone *)arg1;
- (BOOL)isEqual:(id)arg1;
@property(readonly, nonatomic) NSString *archiveReferenceIdentifier_bc;
- (id)initWithUnarchiver:(id)arg1;
- (id)initWithUnarchiver:(id)arg1 migratingFrom:(long long)arg2 toVersion:(long long)arg3;
- (void)decodeWithUnarchiver:(id)arg1;
- (void)encodeWithArchiver:(id)arg1;
- (id)NSImage;
- (BOOL)isLegacy;
- (void)setSha1:(id)arg1;
- (void)setData:(id)arg1;
@property(readonly, nonatomic) NSData *sha1;
@property(readonly, nonatomic) NSData *data;
- (void)waitForDataLock;
- (id)initWithLegacyHash:(id)arg1;
- (id)initWithData:(id)arg1 sha:(id)arg2;
- (id)initWithImage:(id)arg1;
- (id)initDefault;
- (id)treeAsDictionary;

// Remaining properties
@property(readonly, copy) NSString *debugDescription;
@property(readonly, copy) NSString *description;
@property(readonly) Class superclass;

@end

