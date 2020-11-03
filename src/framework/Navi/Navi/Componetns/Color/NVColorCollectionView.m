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

    self.delegate = self;
    self.dataSource = [[NVColorSource alloc]init];
    [self.dataSource onUpdated: ^void(){
        [self.toggleDelegate clearActive];
        [self reloadData];
    }];

    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVColorSemanticItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-1"];
    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVColorCollectionItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-0"];
    [self registerClass:[NVSectionHeader class] forSupplementaryViewOfKind:NSCollectionElementKindSectionHeader withIdentifier:@"Header"];
}

#pragma mark NSCollectionViewDelegate

-(void)collectionView:(NSCollectionView *)collectionView willDisplayItem:(NSCollectionViewItem *)item forRepresentedObjectAtIndexPath:(NSIndexPath *)indexPath{
    NVColorSpec spec = [self.dataSource getSpecAt:indexPath];
    NVColorCollectionItemView *view = item.view;
    if (view.indexPath == nil) {
        view.spec = spec;
        view.indexPath = indexPath;
    }
    [view onMouseDown:^void(NSEvent* event, NSBox* box) {
         [self.toggleDelegate clearActive];
         [self.toggleDelegate setActive:((NVToggleBox *)box).indexPath];
    }];
}

-(void)collectionView:(NSCollectionView *)collectionView didEndDisplayingItem:(NSCollectionViewItem *)item forRepresentedObjectAtIndexPath:(NSIndexPath *)indexPath{
}


- (void)collectionView:(NSCollectionView *)collectionView willDisplaySupplementaryView:(NSView *)view forElementKind:(NSCollectionViewSupplementaryElementKind)kind atIndexPath:(NSIndexPath *) indexPath{
    if (kind == NSCollectionElementKindSectionHeader) {
        [(NVSectionHeader*)view setTitle:[self.dataSource getDims][indexPath.section]];
    }
}

- (void)collectionView:(NSCollectionView *)collectionView didEndDisplayingSupplementaryView:(NSView *)view forElementOfKind:(NSCollectionViewSupplementaryElementKind)kind atIndexPath:(NSIndexPath *)indexPath {
}


#pragma mark NSCollectionViewDelegateFlowLayout

- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
    if (self.dataSource.semanticMode) {
        return NSMakeSize(215, 31);
    } else {
        return NSMakeSize(31, 31);
    }

}
- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout referenceSizeForHeaderInSection:(NSInteger)section {
    return NSMakeSize(0, 26);

}
- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout referenceSizeForFooterInSection:(NSInteger)section {
    return NSMakeSize(0, 0);
}

@end
