var ABC = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ,.".split("");
var GFT = "631438132572720716621028352652902340455321010904120503151715020618302929";
var fso = new ActiveXObject("Scripting.FileSystemObject");
function infile(fname) {
	var file = fso.OpenTextFile(fname);
	arr = file.ReadAll().split("");
	file.Close();
	return arr;
}
function outfile(fname,str) {
	var file = fso.OpenTextFile(fname, 2, true);
	file.Write(str);
	file.Close();
}
function CreateGFT(a,alph) {
	var GFT = [];
	for (var i=0; i<alph.length; i++)
		GFT[alph[i]] = parseInt(a.substr(i*2,2),10)/1000;
	return GFT;
}
function ReABC(ABC) {
	var h = [];
	for (var i=0; i<ABC.length; i++)
		h[ABC[i]] = i;
	return h;
}
function CreateLFT(a) {
	var table = [];
	for (var i=0; i<a.length; i++)
		if (a[i].toUpperCase() in table)
			table[a[i].toUpperCase()]++;
		else
			table[a[i].toUpperCase()] = 1;
	for (i in table)
		table[i] /= a.length;
	return table;
}
function Cipher(s, A, k) {
	var a = s.slice(0);
	var R = ReABC(A);
	if (k > 0)
		k -= Math.floor(k/ABC.length)*ABC.length;
	else
		k -= Math.ceil(k/ABC.length)*ABC.length;
	for (var i=0; i<a.length; i++) {
		var h = R[a[i].toUpperCase()]+k;
		if (h > -1)
			if (h < A.length)
				a[i] = A[h];
			else
				a[i] = A[h-A.length];
		else
			if (h > -A.length)
				a[i] = A[A.length+h];
			else
				a[i] = A[2*A.length+h];
	}
	return a;
}
function EnCode(inf, outf, k, ABC) {
	var s = infile(inf);
	s = Cipher(s, ABC, k);
	outfile(outf,s.join(""));
}
function DeCode(inf, outf, k, ABC) {
	var s = infile(inf);
	s = Cipher(s, ABC, -k);
	outfile(outf,s.join(""));
}
function Guess(s, ABC, GFT) {
	var min = 2*s.length, k = 0;
	for (var i=0; i<ABC.length; i++) {
		var s1 = Cipher(s, ABC, i);
		var LFT = CreateLFT(s1);
		var sum = 0;
		for (var j=1; j<s1.length-1; j++)
			sum += Math.abs(GFT[s1[j].toUpperCase()] - LFT[s1[j].toUpperCase()]);
		if (sum < min) {
			min = sum;
			k = i;
		}
	}
	return k;
}
function doing(p1, p2, k, GFT) {
	var s = infile(p1);
	var s = Cipher(s, ABC, k);
	var d = Guess(s, ABC, GFT);
	outfile(p2, Cipher(s, ABC, d).join(""));
	WSH.Echo(ABC.length - d);
}
try {
	Arg = WSH.Arguments;
	if ((Arg.length < 3) || ((Arg(0) == "-s") && (Arg.length < 5))) throw "Недостаточно параметров!";
	else
		if (Arg(0) != "-s") {
			var GFT = CreateGFT(GFT, ABC);
			if (Arg(2)/1)
				doing(Arg(0), Arg(1), Arg(2), GFT);
			else throw "Сдвиг не число!";
		}
		else {
			var s = infile(Arg(4));
			var GFT = CreateLFT(s);
			for (i=0; i<ABC.length; i++)
				if (!(ABC[i] in GFT))
					GFT[ABC[i]] = 0;
			if (Arg(3)/1)
				doing(Arg(1), Arg(2), Arg(3), GFT);
			else throw "Сдвиг не число!";
		}
}
catch (e) {
	if (e == "[object Error]")
		WSH.Echo("Не существует входного файла!");
	else
		WSH.Echo(e);
}