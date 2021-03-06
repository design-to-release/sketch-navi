//
//  NVColorCollectionView.m
//  Navi
//
//  Created by Qian,Sicheng on 2020/10/16.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVColorCollectionView.h"
#import "NVCollectionDelegate.h"
#import "NVColorCollectionItemView.h"
#import "NVColorSemanticItemView.h"
#import "NVSectionHeader.h"
#import "HexColor.h"
#import "NVBundle.h"

@implementation NVColorCollectionView {
}

- (void)awakeFromNib {
    [super awakeFromNib];
    self.dataSource = [[NVColorSource alloc]init];
    self.dataSource.updateDelegate = self;

    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVColorSemanticItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-1"];
    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVColorCollectionItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-0"];

}

-(void)onSourceUpdated {
    [self.toggleDelegate clearActive];
    [self reloadData];
}

#pragma mark NSCollectionViewDelegate

-(void)collectionView:(NSCollectionView *)collectionView willDisplayItem:(NSCollectionViewItem *)item forRepresentedObjectAtIndexPath:(NSIndexPath *)indexPath{
    NVColorSpec spec = [self.dataSource getSpecAt:indexPath];
    NVColorCollectionItemView *view = item.view;
    // if (view.indexPath == nil) {
    //} else {
        // 复用对象
    [view reset];
    view.spec = spec;
    view.indexPath = indexPath;
    // }
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
        return NSMakeSize([self autoItemWithBetween:215 and:530], 31);
    } else {
        self.isLiveResize = NO;
        return NSMakeSize(31, 31);
    }
}
@end
