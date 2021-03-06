//
//  NVLineCollectionView.m
//  Navi
//
//  Created by Bi,Yingshuai on 2020/10/23.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVLineCollectionView.h"
#import "NVCollectionDelegate.h"
#import "NVLineCollectionItemView.h"
#import "NVSectionHeader.h"
#import "HexColor.h"
#import "NVBundle.h"

@implementation NVLineCollectionView {
    NSMutableArray *arr;
}

- (void)awakeFromNib {
    [super awakeFromNib];
    self.dataSource = [[NVLineSource alloc]init];
    [self.dataSource onUpdated: ^void(){
        [self.toggleDelegate clearActive];
        [self reloadData];
    }];

    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVLineSemanticItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-1"];
    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVLineCollectionItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-0"];
}

#pragma mark NSCollectionViewDelegate

-(void)collectionView:(NSCollectionView *)collectionView willDisplayItem:(NSCollectionViewItem *)item forRepresentedObjectAtIndexPath:(NSIndexPath *)indexPath{
    NVLineSpec spec = [self.dataSource getSpecAt:indexPath];
    NVLineCollectionItemView *view = item.view;
//    if (view.indexPath == nil) {
    [view reset];
    view.spec = spec;
    view.indexPath = indexPath;
//    }
    [view onMouseDown:^void(NSEvent* event, NSBox* box) {
         [self.toggleDelegate clearActive];
         [self.toggleDelegate setActive:((NVToggleBox *)box).indexPath];
    }];
}

- (void)collectionView:(NSCollectionView *)collectionView willDisplaySupplementaryView:(NSView *)view forElementKind:(NSCollectionViewSupplementaryElementKind)kind atIndexPath:(NSIndexPath *) indexPath{
    if (kind == NSCollectionElementKindSectionHeader) {
        [(NVSectionHeader*)view setTitle:[self.dataSource getDims][indexPath.section]];
    }
}

#pragma mark NSCollectionViewDelegateFlowLayout

- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
    if (self.dataSource.semanticMode) {
        self.isLiveResize = YES;
        return NSMakeSize([self autoItemWithBetween:218 and:218 * 2], 31);
    } else {
        self.isLiveResize = YES;
        return NSMakeSize([self autoItemWithBetween:218 * 0.75 and:218 * 1.5], 48);
    }

}


@end
