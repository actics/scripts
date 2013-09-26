function BoyerMoore(str, substr) {
	function SufNum(Sstr, Ssubstr, Slit) { // Ищет самую левую подстроку, элемент перед которой != Slit
		var Slensub = Ssubstr.length;
		var i=Sstr.length - Slensub;
		do {
			if (Sstr.charAt(i-1) != Slit)
				return i+Slensub-1;
			i = Sstr.lastIndexOf(Ssubstr,i-1);
		} while(i>-1)
		return -1;
	}
	function PullStr(Pstr, Psubstr) { // Натягивание
		var Plensub = Psubstr.length;
		for (var i=Plensub-1; i>-1; i--)
			if (Pstr.slice(0,i+1) == Psubstr.slice(Plensub-i-1))
				return i+1;
		return 0;
	}
	var t1 = new Date().getTime();
	var lensub = substr.length;
	var StopTable = [];
	for (i=0; i<lensub-1; i++) // Создание StopTable
		if (substr.charAt(i) in StopTable) {
			if (i>StopTable[substr.charAt(i)])
				StopTable[substr.charAt(i)] = i;
		}
		else
			StopTable[substr.charAt(i)] = i;
	var SufTable = [];
	var Suf = "";
	for (var i=lensub-1; i>0; i--) { // Создание таблицы суффиксов
		Suf = substr.charAt(i) + Suf;
		var NeedSuf = SufNum(substr, Suf, substr.charAt(i-1));
		if (NeedSuf != -1)
			SufTable[Suf] = lensub - 1 - NeedSuf;
		else
			SufTable[Suf] = lensub - PullStr(substr,Suf);
	}
	SufTable[substr] = lensub; // Добавление шаблона в таблицу суффиксов
	for (var i=lensub-2; i>-1; i--)
		if (substr.slice(0,i+1) == substr.slice(lensub-i-1)) {
			SufTable[substr] = lensub - (i+1);
			break;
		}
	SufTable[""] = 1;
	var t2 = new Date().getTime();
	var req = [];
	var k = 3, cou = 0;
	var level = lensub-1;
	while (level < str.length) {
		var suf = "";
		for (var i=level; i>(level - lensub); i--) {
			suf = str.charAt(i) + suf;
			if (suf == substr) {
				req[k++] = level - lensub + 1;
				level += SufTable[substr];
				break;
			}
			else {
				if (!(suf in SufTable))
					if (str.charAt(i) in StopTable) {
						level += Math.max(SufTable[suf.slice(1)], (level-i)-StopTable[str.charAt(i)]);
						break;
					}
					else {
						level += Math.max(SufTable[suf.slice(1)], (level-i)-lensub+1);
						break;
					}
				cou++;
			}
			cou++;
		}
	}
	var t3 = new Date().getTime();
	req[0] = t2 - t1;
	req[1] = t3 - t2;
	req[2] = cou;
	return req;
}