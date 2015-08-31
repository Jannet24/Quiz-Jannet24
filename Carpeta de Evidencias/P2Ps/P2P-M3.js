var fs= require('fs');
var numParam = process.argv.length;

if(numParam<4){
	console.log('Error de sintaxis: node merge <destino> <fichero1> ... <fichero2>');
	process.exit();
}

var writeStream = fs.createWriteStream(process.argv[2]);
for (var i = 3; i < numParam; i++) {
	var readStream = fs.createReadStream(process.argv[i]);
	readStream.pipe(writeStream);	
}