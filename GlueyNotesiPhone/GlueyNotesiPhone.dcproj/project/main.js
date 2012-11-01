/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 */

//
// Function: load()
// Called by HTML body element's onload event when the web application is ready to start
//
function load()
{
    dashcode.setupParts();
	
	//if (currentPage.id == panel ) return;
	
	//if ( level == null ) 
	var level = 1;
	//if ( start_offset == null ) 
	var start_offset = 0;
	//if ( end_offset == null ) 
	var end_offset = -1;
	
	var position = new Object();
	position.level = level;
	position.start_offset = start_offset;
	position.end_offset = end_offset;
	position.list = GlueyNotes.selected_list;
	var json_pos = JSON.stringify(position);
	
	GlueyNotes.gateway.DoRequest({
		method:"POST",
		url:GlueyNotes.app_offset + "/Remote/GetSection",
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
				alert(conn.status + " " + item_list);
				//getSectionText(start_offset, end_offset, page, backwards);
			} else {
				alert(conn.status + " " + conn.responseText);
			}
		},
		body:json_pos,
		error_handler:function(e){ alert(e.status + " " + e.responseText) }
	});
}
