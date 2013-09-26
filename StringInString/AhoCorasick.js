function AhoCorasick(str, substr) { // str - строка для поиска, второй параметр - шаблон
	var t1 = new Date().getTime(); // засекаем время
	str = str.split(""); // сплитим входные данные ))
	substr = substr.split(""); 
	var lenstr =  str.length; // длина строки, хз зачем так сделал
	var lensubstr = substr.length; // длина подстроки
	var req = []; // массив в который будем класть найденные места. короче его возвращает прога
	var FSM = []; // автомат
	var PrefixTable =[]; // табла префиксов
	for (var i=0; i<lensubstr; i++) { //в цикле создаем таблицу суффиксов и за одно подготавливаем автомат
		if (!(substr[i] in FSM)) // если символа нет в автомате, то мы создаем строку под неё
			FSM[substr[i]] = [];
		PrefixTable[substr.slice(0,i+1).join("")] = i+1; // закидываем префикс в таблицу префиксов. !!!
	}
	var prefix = "";
	var nextprefix = "";
	for (var i=0; i<lensubstr; i++) { // Забиваем автомат
		for (var j in FSM) { // по всем буквам автомата.
			var prefixj = prefix+j; // как рассказывал Макс. Перебераем все префиксы.
			if (prefixj in PrefixTable) { // если подобраный префикс есть префикс шаблона, тогда
				nextprefix = prefixj; // префикс правильный. следующий будет проверяться  по этому.
				FSM[j][i] = PrefixTable[prefixj]; // в автомат забиваем число, которое есть переход на следующую позицию автомата
			}
			else {
				FSM[j][i] = 0;
				for (l=1; l<prefixj.length; l++) {
					var prefjslice = prefixj.slice(l)
					if (prefjslice in PrefixTable) {
						FSM[j][i] = PrefixTable[prefjslice];
						break;
					}
				}
			}
		}
		prefix = nextprefix;
	}
	prefix = substr.join("");
	FSM[substr[lensubstr-1]][lensubstr-1] = "a0";
	for (var i=1; i<lensubstr; i++) {
		var prefjslice = prefix.slice(i);
		if (prefjslice in PrefixTable) {
			FSM[substr[lensubstr-1]][lensubstr-1] = "a"+PrefixTable[prefjslice];
			break;
		}
	}
	var t2 = new Date().getTime();
	var FSMlevel = 0;
	var k = 3;
	var cou = 0;
	for (var i=0; i<str.length-substr.length; i++) {
		if (str[i] in FSM) {
			FSMlevel = FSM[str[i]][FSMlevel];
			if (typeof FSMlevel == "string") {
				FSMlevel = FSMlevel.slice(1);
				req[k++] = i-lensubstr+1;
			}
		}
		else
			FSMlevel = 0;
		cou++;
	}
	var t3 = new Date().getTime();
	req[0] = t2 - t1;
	req[1] = t3 - t2;
	req[2] = cou+2;
	return req;
}