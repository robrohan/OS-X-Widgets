FTP Uploader Widget
====================

The FTP Uploader widgets allows you to use drag and drop to upload a file to an FTP server. You can setup several FTP servers, and you don’t need to buy anything to get it to work. The software is made available under the terms of the LGPL.

FTP Widget Server Setup
------------------------

To setup a server, begin by clicking the (i) in the lower right hand corner of the widget (the i will become visible when your cursor enters the widget area).

After you click the (i) the widget will flip over to expose the widget settings. If you are setting up your first server, simply begin by filling out the form. If you are adding a second or third server click the [+] button on the upper right of the widget. Here is a brief description and example of what each field means:

Name: This is a name for the server. This is anything you’d like it to be. Any text that will help you remember this group of settings. For example, My Work Server or Blog Number 1. The only rule is the name must be unique, you can not have two groups of settings named the same. After you have that filled out the Name field, hit TAB to go to the next field (the Server name will now appear in the list above)

Host: This is the FTP server address. It can either be in text form (ftp.host.com for example), or in IP form (192.168.1.333 for example). This setting should only be the server name without any ftp:// or path information. For example these are all ‘incorrect’

_ftp://ftp.myhost.com_

_ftp://user@host:192.168.1.4/test/test_

For those example URIs you would put ftp.myhost.com and “192.168.1.4” in the Host field and nothing more.

Host Directory: If after login you have to navigate to a subdirectory, enter the path here. For example, using ftp://user@host:192.168.1.4/test/test the Host Directory would be "test/test". Often you’ll have something like "www" or "main_html" on your account you’ll want the files to upload to. If you want the files to upload into the main directory use "." for this setting.

User Name: is your account's user name

Password: is your accounts password

FTP Widget Server Select
-------------------------

If you have more than one server setup for uploading, you can select which server the file gets up loaded to by doing the following:

* Click the (i) to flip the widget over.
* In the upper part of the widget, highlight the server you wish to upload to.
* Click Done.

When the widget flips back over you’ll see Server: _Server Name_ at the top of the widget - where _Server Name_ will be the server you’ve selected.

FTP Widget Server Delete
-------------------------

To delete a server do the following:

* Click the (i) to flip the widget over
* Highlight the server you wish to remove, and click the [-] button on the upper right.
* Click Done

FTP Widget Default Server Setting
----------------------------------

If you redistribute the widget, you may want to setup a server by default. For example, and ISP could pre-configure the widget to upload to a users home directory.

To setup a default server, view the widget code by right clicking the widget (or command click) and choose Show Package Contents

Within that directory there is a file called PresetServerSettings.js - open this file in a text editor.

There are a few variables that can be set in this file. Here is the file contents:

	//the nickname of the server (i.e. My Service)
	var PRE_MARKNAME = "";
	//the host (i.e. ftp.mysite.com)
	var PRE_HOST = "";
	//the target directory after login (i.e. htdocs/)
	var PRE_TARGET = "";
	//the user name to use for login
	var PRE_USER = "";
	//the password to use for login
	var PRE_PASSWORD = "";

The variables should be self explanatory. Once they are set, the first time the widget is started these setting will be in effect. The client can, however, delete or edit the server setting in the normal way.



Regex Widget
=============

Simple regular expression tester. Useful when trying out regexs for Javascript code, and somewhat useful when trying to build regular expressions for other languages (like sed, ruby, or perl).

The match area at the bottom shows the array of matches and the index. It is running the match through the Javascript code Array = String.match(_your regex_).

The software is made available under the terms of the LGPL. By downloading or using the software you agree to the terms of the LGPL.



Chinese Word Widget
====================

The Chinese Word Widget will show a new Chinese Word daily (or at least frequently). The word is shown in pinyin, simplified, and traditional characters. When you flip the widget over you can see the English translation so the widget can be used in a flash card like manner.


ShakeASpear
============

Shakespearean-like insult generator. It is inspired by the site http://www.pangloss.com/seidel/Shaker/

This widget was a gift for my wife (it was her idea, and she asked me if I could write it for her).

ShakeASpear is made available under the terms of the LGPL so enjoy, you vain pottle-deep devil-monk.


HexCalculator Widget
=====================

HexCalculator Widget - Hex Calculator Widget can do calculations in base 2, 10 and 16 with the most common features implemented. It has key bindings for most everything, and is designed to be a coder’s calculator. It is based around a signed 32-bit integer.


Terminal Widget
================

Javascript and System terminal. In other words, it is an interactive javascript shell and a bash shell emulator. The javascript shell contains all of the Neuromancer libraries.