#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
@class RCTBridge; // <-add

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, readonly) RCTBridge *bridge; // <-add
@property (nonatomic, strong) UIWindow *window;

@end
