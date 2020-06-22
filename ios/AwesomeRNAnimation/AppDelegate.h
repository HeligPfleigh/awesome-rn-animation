#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
@class RCTBridge;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, readonly) RCTBridge *bridge;
@property (nonatomic, strong) UIWindow *window;

@end
