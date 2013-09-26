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
function EnCode(inf,outf) {
	function node(data,num) {
		this.content = data;
		this.left = null;
		this.right = null;
		this.freq = num;
	}
	function cmp(a,b) {
		if (a.freq > b.freq)
			return -1;
		if (a.freq < b.freq)
			return 1;
		if (a.content.length > b.content.length)
			return -1;
		if (a.content.length < b.content.length)
			return 1;
		return 0;
	}
	function SumNode(a,b) {
		c = new node(a.content+b.content,a.freq+b.freq);
		c.left = a;
		c.right = b;
		return c;
	}
	function LevelRun(a) {
		h = "";
		k = "";
		a[0].freq = "";
		while (a.length>0)
			if (a[0].left != null) {
				h += "1";
				a[0].left.freq = a[0].freq + "0";
				a[0].right.freq = a[0].freq + "1";
				a.push(a[0].left);
				a.push(a[0].right);
				a.shift();
			}
			else {
				abc[a[0].content] = a[0].freq;
				h += "0";
				k += a[0].content;
				a.shift();
			}
		return k+"**"+h.substring(1)+"*";
	}
	s = infile(inf);
	abc = [];
	tree = [];
	k = 0;
	for (i=0; i<s.length; i++)
		if (abc[s[i]] == undefined) {
			abc[s[i]] = 1;
			k++;
		}
		else
			abc[s[i]]++;
	if (k == 1) {
		for (i in abc)
			k = i+"**00*";
		for (i = 0; i < s.length; i++)
			k += "0";
	}
	else {
		k = 0;
		for (i in abc)
			tree[k++] = new node(i,abc[i]);
		while (tree.length > 1) {
			tree.sort(cmp);
			tree.push(SumNode(tree.pop(),tree.pop()));
		}
		k = LevelRun(tree);
		for (i = 0; i < s.length; i++)
			k += abc[s[i]];
	}
	outfile(outf,k);
}
function DeCode(inf,outf) {
	s = infile(inf);
	word = [];
	for (i=0; !((s[i] == "*")&&(s[i+1] == "*")&&(s[i+2] != "*")); i++)
		word[i] = s[i];
	tab = [];
	for (i=word.length+2; s[i] != "*"; i++)
		tab[i-word.length-2] = s[i];
	code = [];
	for (i=word.length+tab.length+2; i < s.length; i++)
		code[i-word.length-tab.length-3] = s[i];
	sm = allLeng = num0 = 0;
	LevLeng = 2;
	k = "";
	for (i=0; i<code.length; i++) {
		if (tab[sm+code[i]*1] == "1") {
			num0 += LevLeng;
			num1 = pos1 = 0;
			for (j=0; j<LevLeng; j++)
				if (tab[j+allLeng] == "1") {
					num1++;
					num0--;
					if (j < sm-allLeng)
						pos1++;
				}
			if ((code[i] == "1")&&(tab[sm] == "1"))
				pos1++;
			sm = allLeng + LevLeng + pos1*2;
			allLeng += LevLeng;
			LevLeng = num1*2;
		}
		else {
			for (j=0; j<sm-allLeng+code[i]*1; j++)
				if (tab[j+allLeng] == "0")
					num0++;
			k += word[num0];
			sm = allLeng = num0 = 0;
			LevLeng = 2;
		}
	}
	outfile(outf,k);
}
try {
	function help() {
		var HelpFile = fso.OpenTextFile(WSH.ScriptName + ":Hufhelp");
		WSH.Echo(HelpFile.ReadAll());
		HelpFile.Close();
	}
	Arg = WSH.Arguments;
	if (!Arg.Length) throw "Параметры не были получены. Для вывода справки введите -help";
	else
		if (Arg(0) == "-help") help();
		else
			if (Arg.Length < 3) throw "Не были получены имена входного или выходного файла. Для вывода справки введите -help";
			else
				if (Arg(0) == "-EnCode") EnCode(Arg(1),Arg(2));
				else
					if (Arg(0) == "-DeCode") DeCode(Arg(1),Arg(2));
					else throw "Были получены неверные параметры. Для вывода справки введите -help";
}
catch (e) {WSH.Echo(e);}