//
//  NVBorderSource.m
//  Navi
//
//  Created by Qian,Sicheng on 2020/11/3.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVBorderSource.h"

@implementation NVBorderSource{
    NVSourceUpdateCallback updatedCallback;
    NSString *searchQuery;
    NSMutableDictionary *dims;
    NSArray<NSDictionary*> *specs;
    NSString *themeMod; // default /dark / night
}

-(instancetype)init{
    NVBorderSource *s = [super init];
//    shapeMod = @"other";
    themeMod = @"default";
    updatedCallback = ^void {};
    return s;
}

-(void)update:(NSArray<NSDictionary*>*) newSpecs {
    specs = newSpecs;
    dims = [NSMutableDictionary new];
    for(NSDictionary* spec in specs) {
        NSArray *dimArr = spec[@"dim"];
         if ([self filter:spec]) {
            if ([dimArr count]) {
                NSString *dim = dimArr[0];
                dims[dim] = dims[dim] == nil ? [NSMutableArray new] : dims[dim];
                [dims[dim] addObject: spec];
            }
         }
    }
    NSMutableArray *others = [NSMutableArray new];
    for(NSString *dim in [dims allKeys]) {
        if ([((NSMutableArray*)dims[dim]) count] < 2) {
            [others addObjectsFromArray:dims[dim]];
            [dims removeObjectForKey:dim];
        }
    }
    if ([others count] > 0) {
        dims[@"其他"] = others;
    }
    updatedCallback();
}

-(BOOL)filter:(NSDictionary*) specDict {

    if (searchQuery == nil || searchQuery.length == 0) {
        return true;
    }
    for(NSString *dim in specDict[@"dim"]) {
        if ([dim containsString:searchQuery]) return true;
    }
    NVBorderSpec spec = [NVBorderSource value:specDict];

    if ([spec.code containsString:searchQuery]) {
        return true;
    } else if ([spec.elementCode containsString:searchQuery]) {
        return true;
    }

    return false;
}

- (void)onUpdated:(NVSourceUpdateCallback) callback {
    updatedCallback = callback;
}

- (void)setQuery:(NSString *) query {

    searchQuery = query;
    [self update: specs];
    updatedCallback();
}

- (void)setSemanticMode:(BOOL) mode {
    _semanticMode = mode;
    updatedCallback();
}

- (void)setShapeMode:(NSString *) mode {
//    NSString *name = [mode isEqual:@"MSTextLayer"] ? @"Text" : @"Others";
//    if (![shapeMod isEqual:name]) {
//        shapeMod = name;
//        [self update: specs];
//        updatedCallback();
//    }
}

- (void)setThemeMode:(NSString *) mode {
    if (![themeMod isEqual:mode]) {
        themeMod = mode;
        [self update: specs];
        updatedCallback();
    }
}

-(NSArray<NSString*>*)getDims{
    NSArray<NSString*>* arr = [dims allKeys];
    NSMutableArray<NSString*>* rs = [NSMutableArray new];
    for(NSString * item in arr) {
        if (![item isEqual:@"其他"]) [rs addObject:item];
    }
    if ([arr count] != [rs count]) {
        [rs addObject:@"其他"];
    }
    return rs;
}

-(NSArray<NSDictionary*>*)getSpecsWith:(NSString *)dim{
    return dims[dim];
}

-(NSArray<NSDictionary*>*)getSpecsIn:(long) section{
    NSString *dim = [self getDims][section];
    return  [dims[dim] sortedArrayUsingComparator: ^NSComparisonResult(NSDictionary* s1, NSDictionary* s2) {
        return [s1[@"code"] doubleValue] > [s2[@"code"] doubleValue];
    }];
}

-(NVBorderSpec)getSpecAt:(NSIndexPath *) indexPath{
    NSDictionary *dict = [self getSpecsIn:indexPath.section][indexPath.item];
    return [NVBorderSource value: dict];
}

+(NVBorderSpec)value:(NSDictionary*) specDict {
    NVBorderSpec spec = {
        .code = specDict[@"code"],
        .cclass = specDict[@"cclass"],
        .cmeaning = specDict[@"cmeaning"],
        .ios = specDict[@"ios"],
        .android = specDict[@"android"],
        .h5 = specDict[@"h5"],

    };
    return spec;
}


#pragma mark NSCollectionViewDataSource

- (NSInteger)collectionView:(NSCollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return [[self getSpecsIn:section] count];
}
- (NSCollectionViewItem *)collectionView:(NSCollectionView *)collectionView itemForRepresentedObjectAtIndexPath:(NSIndexPath *)indexPath {
    NSString *itemId = [NSString stringWithFormat:@"Item-%hhd", self.semanticMode];
    return [collectionView makeItemWithIdentifier:itemId forIndexPath:indexPath];

}

- (NSInteger)numberOfSectionsInCollectionView:(NSCollectionView *)collectionView {
    return [[self getDims] count];
}

- (NSView *)collectionView:(NSCollectionView *)collectionView viewForSupplementaryElementOfKind:(NSCollectionViewSupplementaryElementKind)kind atIndexPath:(NSIndexPath *)indexPath {
    if (kind == NSCollectionElementKindSectionHeader) {
        return [collectionView makeSupplementaryViewOfKind:kind withIdentifier: @"Header" forIndexPath:indexPath];
    }
    return nil;
}


@end
