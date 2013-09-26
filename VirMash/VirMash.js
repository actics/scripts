var proc = {IP: 0, cache1: "0", cache2: "0", cache3: "0", cache4: "0", cache5: "0"}; // В свойства записаны произвольные числа.
var fso = new ActiveXObject("Scripting.FileSystemObject"); // Открываем файл.
var file = fso.OpenTextFile(WSH.Arguments(0), 1, false);
var RAM = new Array(); //Заполняем массив-ОП из файла-ОП.
s = file.ReadAll(); // Разбиваем строку s по переводам строк.
RAM = s.split(/\r?\n/);
file.Close();//Закрываем файл.
function Vib() { //Функция выборки.
	proc.cache1 = RAM[proc.IP];
}
function Vipo() { //Функция выполнения.
	switch(proc.cache1) {
		case "READ": //Считывание с клавиатуры.
			proc.IP++;
			proc.cache2 = RAM[proc.IP]-1;
			RAM[proc.cache2] = WSH.StdIn.ReadLine();
			break;
		case "WRITE": //Вывод на экран.
			proc.IP++;
			proc.cache2 = RAM[proc.IP]-1;
			WSH.StdOut.Write(RAM[proc.cache2]);
			break;
		case "END": //Выход из программы.
			WSH.Quit();
			break;
		case "ENLARGE": // Увеличение числа на 1.
			proc.IP++;
			proc.cache2 = RAM[proc.IP]-1;
			RAM[proc.cache2]++;
			break;
		case "MULTIPLICATION": // Умножение двух чисел.
			proc.IP++;
			proc.cache2 = RAM[proc.IP]-1;
			proc.IP++;
			proc.cache3 = RAM[proc.IP]-1;
			proc.IP++;
			proc.cache4 = RAM[proc.IP]-1;
			RAM[proc.cache4] = RAM[proc.cache2]*RAM[proc.cache3];
			break;
		case "MODULO": // Остаток от деления.
			proc.IP++;
			proc.cache2 = RAM[proc.IP]-1;
			proc.IP++;
			proc.cache3 = RAM[proc.IP]-1;
			proc.IP++;
			proc.cache4 = RAM[proc.IP]-1;
			RAM[proc.cache4] = RAM[proc.cache2]%RAM[proc.cache3];
			break;
		case "GOTO": // Безусловный переход.
			proc.IP++;
			proc.cache2 = RAM[proc.IP]-2;
			proc.IP = proc.cache2;
			break;
		case "IF": // Условный переход.
			proc.IP++;
			proc.cache2 = RAM[proc.IP]-1;
			proc.IP++;
			proc.cache3 = RAM[proc.IP];
			proc.IP++;
			proc.cache4 = RAM[proc.IP]-1;
			proc.IP++;
			proc.cache5 = RAM[proc.IP]-2;
			switch(proc.cache3) {
				case "<=":
					if (RAM[proc.cache2] <= RAM[proc.cache4]) proc.IP = proc.cache5;
					break;
				case ">=":
					if (RAM[proc.cache2] >= RAM[proc.cache4]) proc.IP = proc.cache5;
					break;
				case "<":
					if (RAM[proc.cache2] < RAM[proc.cache4]) proc.IP = proc.cache5;
					break;
				case ">":
					if (RAM[proc.cache2] > RAM[proc.cache4]) proc.IP = proc.cache5;
					break;
				case "=":
					if (RAM[proc.cache2] == RAM[proc.cache4]) proc.IP = proc.cache5;
					break;
				case "!=":
					if (RAM[proc.cache2] != RAM[proc.cache4]) proc.IP = proc.cache5;
					break;
			}
			break;
	}
}
while (true) { //Цикл процессора. Выборка - выполнение - переход. 
	Vib();
	Vipo();
	proc.IP++;
}