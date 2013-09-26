var fso = new ActiveXObject("Scripting.FileSystemObject");
var ProgFile = fso.OpenTextFile(WSH.Arguments(0), 2, true);
var HelpFile = fso.OpenTextFile(WSH.Arguments(1));
ProgFile.Write(HelpFile.ReadAll());
ProgFile.Close();
HelpFile.Close();
