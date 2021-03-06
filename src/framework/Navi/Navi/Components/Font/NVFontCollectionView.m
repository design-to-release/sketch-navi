//
//  NVFontCollectionView.m
//  Navi
//
//  Created by Qian,Sicheng on 2020/10/16.
//  Copyright © 2020 Qian,Sicheng. All rights reserved.
//

#import "NVFontCollectionView.h"
#import "NVCollectionDelegate.h"
#import "NVFontCollectionItemView.h"
#import "NVSectionHeader.h"
#import "HexColor.h"
#import "NVBundle.h"

@implementation NVFontCollectionView {
}

- (void)awakeFromNib {
    [super awakeFromNib];
    self.dataSource = [[NVFontSource alloc]init];
    [self.dataSource onUpdated: ^void(){
        [self.toggleDelegate clearActive];
        [self reloadData];
    }];

    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVFontSemanticItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-1"];
    [self registerNib:[[NSNib alloc] initWithNibNamed:@"NVFontCollectionItem" bundle:[NVBundle bundlePath]] forItemWithIdentifier:@"Item-0"];
}

#pragma mark NSCollectionViewDelegate

-(void)collectionView:(NSCollectionView *)collectionView willDisplayItem:(NSCollectionViewItem *)item forRepresentedObjectAtIndexPath:(NSIndexPath *)indexPath{
    NVFontSpec spec = [self.dataSource getSpecAt:indexPath];
    NVFontCollectionItemView *view = item.view;
    // if (view.indexPath == nil) {
        [view reset];
        view.spec = spec;
        view.indexPath = indexPath;
//        [view removeConstraints:view.constraints];
//        [view addConstraint:[view.heightAnchor constraintEqualToConstant: spec.iosFontSize + 30]];
    // }
    [view onMouseDown:^void(NSEvent* event, NSBox* box) {
         [self.toggleDelegate clearActive];
         [self.toggleDelegate setActive:((NVToggleBox *)box).indexPath];
    }];
}


- (void)collectionView:(NSCollectionView *)collectionView willDisplaySupplementaryView:(NSView *)view forElementKind:(NSCollectionViewSupplementaryElementKind)kind atIndexPath:(NSIndexPath *) indexPath{
    if (kind == NSCollectionElementKindSectionHeader && [[self.dataSource getDims] count] > 1) {
        [(NVSectionHeader*)view setTitle:[self.dataSource getDims][indexPath.section]];
    }
}

#pragma mark NSCollectionViewDelegateFlowLayout

- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
    if (self.dataSource.semanticMode) {
        self.isLiveResize = YES;
        return NSMakeSize([self autoItemWithBetween:218 and:536], 31);
    } else {
        self.isLiveResize = YES;
        NVFontSpec spec = [self.dataSource getSpecAt:indexPath];
        double size = 48/3;
        if (spec.iosFontSize > 78) {
            size = 65/3;
        }
        return NSMakeSize([self autoItemWithBetween:218 and:536], size + 30);
    }

}

- (NSSize)collectionView:(NSCollectionView *)collectionView layout:(NSCollectionViewLayout*)collectionViewLayout referenceSizeForHeaderInSection:(NSInteger)section {
    if ([[self.dataSource getDims] count] < 2)
        return NSMakeSize(0, 10);
    else
        return [super collectionView:collectionView layout:collectionViewLayout referenceSizeForHeaderInSection:section]; //NSMakeSize(0, 26);
}



@end
