var GlueyNotes={};

GlueyNotes.pipe = new Sortie.IO.Pipe().GetInstance();
GlueyNotes.gateway = new Sortie.IO.Gateway(GlueyNotes.pipe, true);

GlueyNotes.selected_list = "todo";
GlueyNotes.current_hash = "";
GlueyNotes.app_offset = "http://glueynotes.com";