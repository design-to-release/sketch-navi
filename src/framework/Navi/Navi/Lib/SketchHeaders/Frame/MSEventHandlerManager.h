//
//     Generated by class-dump 3.5 (64 bit) (Debug version compiled Jul  6 2018 12:02:43).
//
//     class-dump is Copyright (C) 1997-1998, 2000-2001, 2004-2015 by Steve Nygard.
//

#import <objc/NSObject.h>
#import "MSEventHandler.h"
#import "MSEventHandlerManagerDelegate-Protocol.h"

@interface MSEventHandlerManager : NSObject
{
    id _document;
    id <MSEventHandlerManagerDelegate> _delegate;
    MSEventHandler *_currentHandler;
    // MSNormalEventHandler *_normalHandler;
    long long _lastMouseDownClickCount;
    unsigned long long _lastEventType;
    struct CGPoint _lastEventLocationInWindow;
}

@property(nonatomic) unsigned long long lastEventType; // @synthesize lastEventType=_lastEventType;
@property(nonatomic) long long lastMouseDownClickCount; // @synthesize lastMouseDownClickCount=_lastMouseDownClickCount;
@property(nonatomic) struct CGPoint lastEventLocationInWindow; // @synthesize lastEventLocationInWindow=_lastEventLocationInWindow;
// @property(retain, nonatomic) MSNormalEventHandler *normalHandler; // @synthesize normalHandler=_normalHandler;
@property(retain, nonatomic) MSEventHandler *currentHandler; // @synthesize currentHandler=_currentHandler;
@property(nonatomic) __weak id <MSEventHandlerManagerDelegate> delegate; // @synthesize delegate=_delegate;
@property(nonatomic) __weak id *document; // @synthesize document=_document;
- (id)overlayItems:(unsigned long long)arg1 parameters:(struct MSRenderingParameters)arg2;
- (id)overlayItemImages:(struct CGColorSpace *)arg1 backingScale:(double)arg2;
- (void)documentDidChange:(id)arg1;
- (void)recordEvent:(id)arg1;
- (void)sendMouseMovedEvent:(id)arg1;
- (void)sendMouseUpEvent:(id)arg1;
- (void)sendMouseDraggedEvent:(id)arg1;
- (void)sendMouseDownEvent:(id)arg1;
- (void)setCurrentHandler:(id)arg1 force:(BOOL)arg2;
- (id)switchToEventHandlerClass:(Class)arg1;
- (id)toggleHandlerClass:(Class)arg1;
- (id)handlerForClass:(Class)arg1;
- (id)initWithDelegate:(id)arg1;

// Remaining properties
@property(readonly, copy) NSString *debugDescription;
@property(readonly, copy) NSString *description;
@property(readonly) unsigned long long hash;
@property(readonly) Class superclass;

@end

