#
#  main.py
#  FTPUploader
#
#  Created by Rob Rohan on 6/11/09.
#  Copyright Daemon 2009. All rights reserved.
#

#import modules required by application
import objc
import Foundation
import AppKit

from PyObjCTools import AppHelper

# import modules containing classes required to start application and load MainMenu.nib
import FTPUploaderAppDelegate

# pass control to AppKit
AppHelper.runEventLoop()
