//
//  NVCollectionViewWithHeader.m
//  Navi
//
//  Created by Qian,Sicheng on 2020/11/3.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVCollectionViewWithHeader.h"

@implementation NVCollectionViewWithHeader

- (void)awakeFromNib {
    [super awakeFromNib];
    self.delegate = self;
    [self registerClass:[NVSectionHeader class] forSupplementaryViewOfKind:NSCollectionElementKindSectionHeader withIdentifier:@"Header"];
}

#pragma mark NSCollectionViewDelegate

-(void)collectionView:(NSCollectionView *)collectionView didEndDisplayingItem:(NSCollectionViewItem *)item forRepresentedObjectAtIndexPath:(NSIndexPath *)indexPath{
    [item.view removeFromSuperview];
    [item removeFromParentViewController];
}

- (void)collectionView:(NSCollectionView *)collectionView didEndDisplayingSupplementaryView:(NSView *)view forElementOfKind:(NSCollectionViewSupplementaryElementKind)kind atIndexPath:(NSIndexPath *)indexPath {
    [view removeFromSuperview];
}

#pragma mark NSCollectionViewDelegateFlowLayout


- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout referenceSizeForHeaderInSection:(NSInteger)section {
    if (section == 0) {
        return NSMakeSize(0, 25);
    } else {
        return NSMakeSize(0, 35);
    }
    

}
- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout referenceSizeForFooterInSection:(NSInteger)section {
    return NSMakeSize(0, 0);
}
@end
