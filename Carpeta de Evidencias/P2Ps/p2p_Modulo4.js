var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

//carga del formulario,Transacción 1;
app.get('/preguntas', function(req,res){
	res.send('<!DOCTYPE html>'
		+'<html><head>'
		+'<meta charset="utf-8"><title>Preguntas</title></head>'
		+'<body><h2>Preguntas</h2> <br>'
		+'<form method="get" action="/respuesta" >'
		+'<input type="hidden" name="id" value="1">'
		+'<label for="pregunta1">¿Quién descubrió América?</label>'
		+'<input type="text" name="pregunta1">'
		+'<button type="submit">Enviar</button>'
		+'</form><br>'
		+'<form method="get" action="/respuesta" >'
		+'<input type="hidden" name="id" value="2">'
		+'<label for="pregunta2">¿Cúal es la capital de Portugal?</label>'
		+'<input type="text" name="pregunta2">'
		+'<button type="submit">Enviar</button>'
		+'</form>'
		+'</body></html>');
});

//Envío y proceso de datos, Transacción 2;
app.get('/respuesta', function(req,res){
	if (req.query.pregunta1==="Cristóbal Colón"||req.query.pregunta2==="Lisboa"){
	res.send('Su respuesta es <strong>CORRECTA</strong>.<br>'
		+'<br><a href="/preguntas">Volver a la página inicial</a>');
	}
	else{
		if(req.query.id==="1"){
			res.send('<strong><h2>Incorrecto</h2></strong>La respuesta correcta es <strong>Cristóbal Colón</strong>.<br>'
				+'<br><strong>Nota: </strong>revise sus letras mayúsculas y acentos.<br>'
				+'<br><a href="/preguntas">Volver a la página inicial</a>');
		}
		else{
			res.send('<strong><h2>Incorrecto</h2></strong>La respuesta correcta es <strong>Lisboa</strong>.<br>'
				+'<br><strong>Nota: </strong>Los nombres propios de lugares también inician con mayúscula.<br>'
				+'<br><a href="/preguntas">Volver a la página inicial</a>');
		}
	}
});
app.get('/', function(req,res){
	res.send('P2P Modulo 4: Visitar <a href="http://localhost:8000/preguntas">localhost:8000/preguntas</a>');
});
app.get('*', function(req,res){
	res.send('URL incorrecta');
});

app.listen(8000);