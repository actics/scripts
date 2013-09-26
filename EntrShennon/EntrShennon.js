s = WSH.StdIn.ReadLine().split("");
abc = [];
k = 0;
for (i=0; i < s.length; i++) 
	if (abc[s[i]] == undefined) {
		abc[s[i]] = 1; 
		k++;
	}
	else
		abc[s[i]]++;
En = 0;
for (i in abc)
	En -= (abc[i]/s.length)*Math.log(abc[i]/s.length);
if (k != 1)
	En /= Math.log(k);
WSH.Echo(En);