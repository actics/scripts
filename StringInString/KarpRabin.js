function KarpRabin(str, substr) {
	String.prototype.Hash = function () {
		var i, CHash = 0;
		for (i=0; i<this.length; i++)
			CHash += this.charCodeAt(i)*Math.pow(256,i);
		return CHash;
	}
	var t1 = new Date().getTime();
	var req = [];
	var k = 2;
	var H = str.slice(0,substr.length).Hash(), pH = substr.Hash();
	if (H == pH)
		req[k++] = 0;
	for (i=1; i<str.length-substr.length; i++) {
		H = (H - str.charCodeAt(i-1))/256 + str.charCodeAt(i+substr.length-1)*Math.pow(256,substr.length-1);
		if (H == pH)
			req[k++] = i;
	}
	var t2 = new Date().getTime();
	req[0] = t2 - t1;
	req[1] = str.length-substr.length+1;
	return req;
}