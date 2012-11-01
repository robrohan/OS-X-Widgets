/* Sortie.Core.$({
	include:new Array(
		"/View/Javascript/Common.js",
		"/View/Javascript/json.js",
		"/View/Javascript/iPhoneNav.js"
	)
});
*/

var CLIP_LENGTH = 24;
var CLIP_LENGTH_LONG = 40;

function showPanel(panel, backwards, level, start_offset, end_offset) {
	if ( panel != 'searchForm' && panel != 'editor' && panel != 'itemInfo') {
		if ( backwards == null) {
			backwards = false;
		}
		
		if (currentPage.id == panel ) return;
		
		if ( level == null ) level = 1;
		if ( start_offset == null ) start_offset = 0;
		if ( end_offset == null ) end_offset = -1;
		
		var position = new Object();
		position.level = level;
		position.start_offset = start_offset;
		position.end_offset = end_offset;
		position.list = GlueyNotes.selected_list;
		var json_pos = JSON.stringify(position);
		
		GlueyNotes.gateway.DoRequest({
			method:"POST",
			url:"/Remote/GetSection",
			handler:function(conn) {
				if(conn.status == 200) {
					var item_list = JSON.parse(conn.responseText);
					//if we have a valid item list, show the list items
					//if we don't then show the edit panel as this is probably
					//notes about an item
					if(item_list && typeof item_list[0].start_offset != 'undefined' ) {
						displayItems(panel, item_list, ++level);
						var page = document.getElementById(panel);
					} else {
						var page = document.getElementById('itemInfo');
					}
					
					//grab the text selection no matter what as the first item
					//can be used as the title, and we can pre populate the editor
					getSectionText(start_offset, end_offset, page, backwards);
				} else {
					//?
				}
			},
			body:json_pos
		});
	} else {
		switch(panel) {
			case 'searchForm':
				showPage(document.getElementById('panel1'), backwards);
				document.getElementById('contextResults').innerHTML = "";
				var input = document.getElementById('contextSelector');
				input.value = "@";
				input.focus();
			break;
			case 'editor':
				openFile();
				document.getElementById('list_editor').focus();
			break;
		}
		showPage(document.getElementById(panel), backwards);
	}
}

function searchContext(context) {
	var ctext = new Object();
	ctext.context = context;
	ctext.list = GlueyNotes.selected_list;
	var json_con = JSON.stringify(ctext)
	
	GlueyNotes.gateway.DoRequest({
		method:"POST",
		url:"/Remote/GetContext",
		handler:function(conn) {
			if(conn.status == 200) {
				var item_list = JSON.parse(conn.responseText);
				var panel = 'contextResults';
				displayItems(panel, item_list, 2);
				showPage(document.getElementById(panel), false);
			} else {
				//?
			}
		},
		body:json_con
	});
}

function tickItem(chkbox, start_offset, end_offset) {
	//this is an all or nothing process, no way to undo
	//at the moment aside from editing the list
	chkbox.disabled = true;
	
	//because people will probably be ticking items
	//pretty quickly, we want to try to make sure each one
	//gets sent to the server as it happens so dont use the shared
	//pipe
	var local_pipe = new Sortie.IO.Pipe().GetInstance();
	var local_gateway = new Sortie.IO.Gateway(local_pipe, true);
	
	var tickmsg = new Object();
	tickmsg.list = GlueyNotes.selected_list;
	tickmsg.start_offset = start_offset;
	tickmsg.end_offset = end_offset;
	
	var json_msg = JSON.stringify(tickmsg);
	
	local_gateway.DoRequest({
		method:"POST",
		url:"/Remote/TickItem",
		handler:function(conn) {
			if(conn.status == 200) {
				var worked = JSON.parse(conn.responseText);
				chkbox.parentNode.nextSibling.className = 'todoItemTextChecked';
				//chkbox.parentNode.className = 'todoMarkHolderChecked';
				
				//because this is a one way event at the moment
				//just disable the checked item. It will disapear on
				//next refresh (we could remove it here if we want)
			} else {
				//?
			}
		},
		body:json_msg
	});
}

function getSectionText(start_offset, end_offset, page, backwards) {
	var stext = new Object();
	stext.start_offset = start_offset;
	stext.end_offset = end_offset;
	stext.list = GlueyNotes.selected_list;
	var json_stext = JSON.stringify(stext)
	
	GlueyNotes.gateway.DoRequest({
		method:"POST",
		url:"/Remote/GetText",
		handler:function(conn) {
			if(conn.status == 200) {
				var item_text = JSON.parse(conn.responseText);
				var panel = 'itemInfo';
				var txtarea = document.getElementById('itemInfoDisplay');
				var txtpanel = document.getElementById(panel);
				
				txtarea.innerHTML = "";
				
				var item_lines = item_text;
				var item_title = __displayItemTitle(item_lines[0].toString(), 35);
				
				page.setAttribute('title', item_title);
				txtpanel.setAttribute('title', item_title);
				
				for(var z=1; z<item_lines.length; z++) {
					//txtarea.value += item_lines[z];
					txtarea.innerHTML += htmlify(item_lines[z]) + "<br />";
				}
				
				showPage(page, backwards);
			} else {
				//?
			}
		},
		body:json_stext
	});
}

/**
 * Try to find phone numbers, emails an links in the notes text
 */
function htmlify(line) {
	line = line.replace(/(\d{3})[-\ \.](\d{3})[-\ \.](\d{4})/gi,"<a href='tel:$1-$2-$3'>$0</a>");
	line = line.replace(/(\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b)/gi,"<a href='mailto:$1'>$0</a>");
	line = line.replace(/([a-zA-Z0-9]+:\/\/[^ ]+)/gi,"<a href='$1' target='_blank'>$1</a>");
	return line;
}

function displayItems(in_panel, item_list, level) {
	if(item_list) {
		var page = document.getElementById(in_panel);
		
		if (!page) {
			var body_ele = document.getElementById('body');
			var new_ul = document.createElement('ul');
			new_ul.setAttribute('id', in_panel);
			new_ul.setAttribute('title', in_panel);
			body_ele.appendChild(new_ul);
			
			page = document.getElementById(in_panel);
		}
		
		
		/* var fc = page.firstChild;
		if (fc)
			page.removeChild(fc);
		*/
		//ok so I am a bit lazy. Plus, this is faster
		//remove all the stuff from the pane
		page.innerHTML = "";
		
		for(var q=0; q<item_list.length; q++) {
			var rtn = "";
			var item = item_list[q];
			
			var li = document.createElement("LI");
			li.setAttribute("title",item.title);
			
			var divTMH = document.createElement("DIV");
			divTMH.setAttribute("class","todoMarkHolder");
			
			var inputTM = document.createElement("INPUT");
			inputTM.setAttribute("type","checkbox");
			inputTM.setAttribute("class","todoMark");
			inputTM.setAttribute("onclick",'tickItem(this, '+item.start_offset +','+item.end_offset+')');
			
			var aTIM = document.createElement("A");
			
			if( itemHasChildren(item) && in_panel != 'contextResults' ) {
				li.setAttribute("class","projItem");
				aTIM.setAttribute("href",'javascript:showPanel(\'panel'+level+'\',false,'+level+','+item.start_offset +','+item.end_offset+')');
			} else {
				li.setAttribute("class","todoItem");
				aTIM.setAttribute("href",'javascript:void()');
			}
			
			aTIM.setAttribute("title",item.title);
			aTIM.setAttribute("class","todoItemText");
			aTIM.appendChild(document.createTextNode( __displayItemTitle(item.title) ));
			
			divTMH.appendChild(inputTM);
			li.appendChild(divTMH);
			li.appendChild(aTIM);
			
			page.appendChild(li);
			
			
			/*	var li = document.createElement("LI");
				li.setAttribute("class","todoItem");
				li.setAttribute("title","item.title");
				
				var divTMH = document.createElement("DIV");
				divTMH.setAttribute("class","todoMarkHolder");
				
				var inputTM = document.createElement("INPUT");
				inputTM.setAttribute("type","checkbox");
				inputTM.setAttribute("class","todoMark");
				inputTM.setAttribute("onclick",'tickItem(this, '+item.start_offset +','+item.end_offset+')');
				
				var aTIM = document.createElement("A");
				aTIM.setAttribute("href",'javascript:void()');
				aTIM.setAttribute("title",item.title);
				aTIM.setAttribute("class","todoItemText");
				aTIM.appendChild(document.createTextNode( __displayItemTitle(item.title) ));
				
				divTMH.appendChild(inputTM);
				li.appendChild(divTMH);
				li.appendChild(aTIM);
				
				page.appendChild(li);
				
				
			} */
			
			/*
			rtn += '<li class="projItem"><div class="todoMarkHolder"><input type="checkbox" class="todoMark" ';
			rtn += ' onclick="tickItem(this, '+item.start_offset +','+item.end_offset+')" /></div>';
			rtn += '<a href="javascript:showPanel(\'panel'+level+'\',false,'+level+','+item.start_offset +','+item.end_offset+')" ';
			rtn += ' title="'+item.title+'" class="todoItemText">' + __displayItemTitle(item.title) + '</a></li>' + "\n";
			page.innerHTML += rtn;
			*/
			/*
			rtn += '<li class="todoItem" title="'+item.title+'"><div class="todoMarkHolder"><input type="checkbox" ';
			rtn += ' class="todoMark" onclick="tickItem(this, '+item.start_offset +','+item.end_offset+')" /></div>';
			rtn += '<div class="todoItemText">';
			rtn += __displayItemTitle(item.title) + '</div></li>';
			page.innerHTML += rtn;
			*/
		}
	}
}

function __displayItemTitle(str, limit) {
	if(!limit) {
		limit = CLIP_LENGTH;
	}
	str = str.replace(/\*+/gi,'');
	if(str.length >= limit) {
		str = str.substring(0, limit) + "...";
	}
	return str;
}

function markItemDone() {
	
}

function itemHasChildren(item) {
	if(item) {
		var a1 = item.end_offset - item.start_offset - 1;
		var a2 = (item.title) ? item.title.length : 0;
		if ( a1 == a2 ) {
			return false;
		}
		
		return true;
	}
	
	return false;
}
