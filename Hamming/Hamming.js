a = [[1,2,-1],[3,5,0],[2,3,-5]];
function Minor(Array,x,y) {
	ArrayM = [];
	i1 = j1 = 0;
	for (i=0; i<Array.length; i++)
		if (i != x) {
			ArrayM[i1] = [];
			for (j=0; j<Array.length; j++)
				if (j != y) {
					ArrayM[i1][j1] = Array[i][j];
					j1++;
				}
			i1++;
			j1 = 0;
		}
	return ArrayM;
}
function Determinant(Array) {
	D = 0;
	var i;
	if (Array.length != 1)
		for (i=0; i<Array.length; i++)
			D += Array[0][i] * Math.pow(-1,i) * Determinant(Minor(Array,0,i));
	else 
		D = Array[0][0];
	return D;
}
function MultNum(Array,num) {
	for (i=0; i<Array.length; i++)
		for (j=0; j<Array.length; j++)
			Array[i][j] *= num;
	return Array;
}
function Inverse(Array) {
	ArrayI = [];
	var i;
	for (i=0; i<Array.length; i++) {
		ArrayI[i] = [];
		var j;
		for (j=0; j<Array.length; j++)
			ArrayI[i][j] = Math.pow(-1,i+j)*Determinant(Minor(Array,i,j));
	}
	Det = 1/Determinant(Array);
	MultNum(ArrayI,Det);
	return Transpose(ArrayI);
}
WSH.Echo(Inverse(a));