@interface MSMainSplitViewController : NSSplitViewController <NSSplitViewDelegate>
{
    BOOL _inspectorVisible;
    BOOL _isInVersionBrowser;
    BOOL _shouldEncodeCurrentSidebarWidth;
    NSWindow *_window;
//    MSDocument *_document;
//    BCSideBarViewController *_sidebarController;
//    MSCanvasViewController *_canvasController;
//    MSInspectorController *_inspectorController;
    NSLayoutConstraint *_sidebarWidthConstraint;
    long long _leftSide;
    long long _rightSide;
    NSView *_savedInspectorView;
    double _restorableSidebarWidth;
}

@property(nonatomic) double restorableSidebarWidth; // @synthesize restorableSidebarWidth=_restorableSidebarWidth;
@property(nonatomic) BOOL shouldEncodeCurrentSidebarWidth; // @synthesize shouldEncodeCurrentSidebarWidth=_shouldEncodeCurrentSidebarWidth;
@property(retain, nonatomic) NSView *savedInspectorView; // @synthesize savedInspectorView=_savedInspectorView;
@property(nonatomic) BOOL isInVersionBrowser; // @synthesize isInVersionBrowser=_isInVersionBrowser;
@property(nonatomic) long long rightSide; // @synthesize rightSide=_rightSide;
@property(nonatomic) long long leftSide; // @synthesize leftSide=_leftSide;
@property(retain, nonatomic) NSLayoutConstraint *sidebarWidthConstraint; // @synthesize sidebarWidthConstraint=_sidebarWidthConstraint;
@property(nonatomic, getter=isInspectorVisible) BOOL inspectorVisible; // @synthesize inspectorVisible=_inspectorVisible;
//@property(retain, nonatomic) MSInspectorController *inspectorController; // @synthesize inspectorController=_inspectorController;
//@property(retain, nonatomic) MSCanvasViewController *canvasController; // @synthesize canvasController=_canvasController;
//@property(retain, nonatomic) BCSideBarViewController *sidebarController; // @synthesize sidebarController=_sidebarController;
//@property(nonatomic) __weak MSDocument *document; // @synthesize document=_document;
@property(retain, nonatomic) NSWindow *window; // @synthesize window=_window;
- (void)dealloc;
- (void)didExitVersionBrowser;
- (void)didEnterVersionBrowser;
- (void)tearDown;
- (void)setUp;
- (struct CGRect)splitView:(id)arg1 effectiveRect:(struct CGRect)arg2 forDrawnRect:(struct CGRect)arg3 ofDividerAtIndex:(long long)arg4;
- (void)hideInspector;
@property(readonly, nonatomic) NSView *inspectorView;
- (id)showInspector;
- (void)hideComponents;
//@property(readonly, nonatomic) MSComponentGridController *componentsController;
- (id)showComponentsView;
@property(readonly, nonatomic) long long contentModeSplitViewItemIndex;
- (void)hideCanvas;
@property(readonly, nonatomic) NSView *canvasView;
- (id)showCanvas;
- (void)restoreStateWithCoder:(id)arg1;
- (void)encodeRestorableStateWithCoder:(id)arg1;
- (void)splitViewDidResizeSubviews:(id)arg1;
@property(readonly, nonatomic) BOOL isSidebarVisible;
@property(readonly, nonatomic) NSView *sidebarView;
- (void)hideSidebar;
- (id)showSidebar;
- (void)alignWithWindowContentLayoutGuide;
- (unsigned long long)indexOfSplitViewItemForViewController:(id)arg1;
- (BOOL)removeAccessoryViewBeneathCanvas:(id)arg1;
- (BOOL)insertAccessoryViewBeneathCanvas:(id)arg1 constrainingHeight:(double)arg2;
- (BOOL)removeAccessoryViewAtopCanvas:(id)arg1;
- (BOOL)insertAccessoryViewAtopCanvas:(id)arg1 constrainingHeight:(double)arg2;

// Remaining properties
@property(readonly, copy) NSString *debugDescription;
@property(readonly, copy) NSString *description;
@property(readonly) unsigned long long hash;
@property(readonly) Class superclass;

@end

