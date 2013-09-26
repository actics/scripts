var i,s = "Hello, World!";
// COM-объекты
var fso = new ActiveXObject("Scripting.FileSystemObject");
var file = fso.CreateTextFile("c:\\test.txt", true);
file.WriteLine(s);
file.Close();
WSH.Echo("OK");
var a1 = new Array(1, 2, 3);
var a2 = [1, 2, 3];
WSH.Echo(a1.length + ":" + a2.toString());
a2[100] = "sdgsa";
WSH.Echo(a2[100]);

var o1 = new Object();
o1.xaxa = 5;
o1["xyxy"] = s;
WSH.Echo(o1.xyxy);
var o2 = {xaxa : 4, xyxy : s};
o2.toString = function() {
  return "Мой объект{" + this.xaxa + "}";
};
WSH.Echo(o2);
function Bububu(name) {
  WSH.Echo(name + ", BOOOOOOO!!!!");
}
Bububu("lala");
//Узнать третий способ содания объекта(с использованием конструктора)
/*for (i = 0; i < 2; i++) {
  // Конкатениция
  WSH.Echo(i + ": " + s);
}*/
// tiopox@gmail.com
var i=1,s = "Hello, World!";
WSH.Echo(i,s);
/*var fso = new ActiveXObject("Scripting.FileSystemObject");
var file = fso.OpenTextFile("C:\\Lout Actics\\Мат-Мех\\Скрипты\\dddd.txt", 2, true);  что за 2? что значит тру?
file.WriteLine(s); как переместится на следующую строку или знак
file.Close();*/
var a2 = [1,2];
WSH.Echo(a2[1]);