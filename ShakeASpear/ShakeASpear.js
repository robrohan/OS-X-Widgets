

function CreateInsult()
{
	return Column1[GetRandomPosition(Column1.length)] + " " 
		+ Column2[GetRandomPosition(Column2.length)] + " " 
		+ Column3[GetRandomPosition(Column3.length)];
}

function GetRandomPosition(len)
{
	var x = Math.round(((Math.random() * len) % len));
	if(x > len)
		x = len;
		
	return x;
}

function WriteInsult()
{
	var domInsult = document.getElementById("insult");
	domInsult.innerHTML = CreateInsult();
}

////////////////////// Mac Cut Copy Paste //////////////////////
function docut(event) 
{
	//just do the same thing for cut and copy
	docopy(event);
}

/*!
 @funciton docopy
 copy the current value to the clipboard
*/
function docopy(event) 
{
	var domInsult = document.getElementById("insult");
	var strinslt = domInsult.innerHTML;
	
	event.clipboardData.setData('text/plain', strinslt);
	event.preventDefault();
	event.stopPropagation();
}

function dopaste (event) 
{
	var clip = event.clipboardData.getData('text/plain');
	
	//loop over the clipboard
	//var plen = clip.length;
	//for(var i = 0; i < plen; i++)
	//{
	//}
	event.preventDefault();
	event.stopPropagation();
}
////////////////////// Mac Cut Copy Paste //////////////////////
