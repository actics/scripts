var fso = new ActiveXObject("Scripting.FileSystemObject");
function infile(fname) {
	var file = fso.OpenTextFile(fname);
	arr = file.ReadAll().split("");
	file.Close();
	return arr;
}
function outfile(fname,strk) {
	var file = fso.OpenTextFile(fname, 2, true);
	file.Write(strk);
	file.Close();
}
function EscEnCode(inf,outf) {	// Функция кодирования с помощью ESCAPE символа.
	function EnCode() { // Функция записи в результирующую строку кодированных символов.
		while (k > 258) { // Если символов подряд встретилось больше 258.
			a = a + esc + String.fromCharCode(255) + z;
			k -= 258;
		}
		if (k > 3)
			a = a + esc + String.fromCharCode(k-3) + z;
		else 
			if (z != esc)
				while (k-->0)
					a = a + z; // Обработка ситуации с ESCAPE символом в моем алгоритме происходит только в тот момент, когда их подряд идет не больше 3 штук, иначе они кодируются по общим правилам.
			else 
				a = a + esc + String.fromCharCode(k) + esc;
	}
	s = infile(inf);
	a = esc = "#"; 
	z = s[0]; 
	k = 1; 
	for (i=1; i<s.length; i++) // Проход по массиву.
		if (s[i] == s[i-1]) 
			k++;
		else {
			EnCode();
			z = s[i];
			k = 1;
		}
	EnCode();
	outfile(outf,a);
}
function EscDeCode(inf,outf) { // Функция декодирования с помощью ESCAPE символа.
	s = infile(inf);
	esc = s[0]; // ESCAPE символ первый в закодированной строке.
	var a = new String;
	for (i=1; i<s.length; i++)
		if (s[i] == esc) {
			if (s[i+2] != esc)
				k = s[i+1].charCodeAt(0)+3;
			else
				k = s[i+1].charCodeAt(0);
			while (k-->0)
				a = a + s[i+2];
			i += 2;
		}
		else 
			a = a + s[i];
	outfile(outf,a);
}
function JumpEnCode(inf,outf) {	
	function EnCode() {
		if (k < 3)
			for (; k>0; k--) {
				h = h + z;
				if (h.length == 127) {
					a = a + String.fromCharCode(255) + h;
					h = "";
				}
			}
		else {
			if (h.length) {
				a = a + String.fromCharCode(h.length+128) + h;
				h = "";
			}
			while (k > 128) {
				a = a + String.fromCharCode(128) + z;
				k -= 128;
			}
			if (k > 2)
				a = a + String.fromCharCode(k) + z;
			else
				for (; k>0; k--)
					h = h + z;
		}
	}
	s = infile(inf);
	z = s[0];
	k = 1;
	var a = new String();
	var h = new String();
	for (i=1; i<s.length; i++)
		if (s[i-1] == s[i])
			k++;
		else {
			EnCode();
			z = s[i];
			k = 1;
		}
	EnCode();
	if (h.length)
		a = a + String.fromCharCode(h.length+128) + h;
	outfile(outf,a);
}
function JumpDeCode(inf,outf) {
	s = infile(inf);
	var a = new String();
	for (i=0; i<s.length; i++) {
		pom = s[i].charCodeAt(0);
		if (pom > 128) {
			for (j=1; j<=(pom-128); j++) 
				a = a + s[i+j];
			i += pom-128;
		}
		else {
			for (j=1; j<=pom; j++)
				a = a + s[i+1];
			i += 1;
		}
	}
	outfile(outf,a);
}
try {
	function help() { // Функция вывода хелпа из потока.
		var HelpFile = fso.OpenTextFile(WSH.ScriptName + ":RLEhelp");
		WSH.Echo(HelpFile.ReadAll());
		HelpFile.Close();
	}
	Arg = WSH.Arguments; // Выполнение кода и обработка ошибок.
	if (!Arg.Length) throw "Параметры не были получены. Для вывода справки введите -help";
	else
		if (Arg(0) == "-help") help();
		else
			if (Arg.Length < 3) throw "Не были получены имена входного или выходного файла. Для вывода справки введите -help";
			else
				if (Arg(0) == "-EnCode") EscEnCode(Arg(1),Arg(2));
				else
					if (Arg(0) == "-DeCode") EscDeCode(Arg(1),Arg(2));
					else throw "Были получены неверные параметры. Для вывода справки введите -help";
}
catch (e) {WSH.Echo(e);}