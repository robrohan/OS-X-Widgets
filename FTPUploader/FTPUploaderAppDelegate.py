#
#  FTPUploaderAppDelegate.py
#  FTPUploader
#
#  Created by Rob Rohan on 6/11/09.
#  Copyright Daemon 2009. All rights reserved.
#

from Foundation import *
from AppKit import *

class FTPUploaderAppDelegate(NSObject):
    def applicationDidFinishLaunching_(self, sender):
        NSLog("Application did finish launching.")
