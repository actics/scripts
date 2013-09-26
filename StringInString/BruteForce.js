function BruteForce(str, substr) {
	var t1 = new Date().getTime();
	str = str.split("");
	substr = substr.split("");
	var k = 2;
	var req = [];
	var Stopfor2 = substr.length;
	var Stopfor1 = str.length - Stopfor2 +1;
	var cou = 0;
	for (var i=0; i<Stopfor1; i++) {
		var flag = true;
		for (var j=0; (j<Stopfor2)&&(flag); j++) {
			cou++;
			if (str[i+j] != substr[j]) {
				flag = false;
				break;
			}
		}
		if (flag)
			req[k++] = i;
	}
	var t2 = new Date().getTime();
	req[0] = t2 - t1;
	req[1] = cou;
	return req;
}