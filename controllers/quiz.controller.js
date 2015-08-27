var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			}
			else
			{
				next(new Error('No existe quizId= '+ quizId));
			}
		}
		).catch(function(error){next(error);});
};
exports.index= function(req, res){
	if (!!req.query.search) {
    	var search = '%' + req.query.search + '%';
    	search = search.replace(/ /g, '%');
    	var where = {where: ["pregunta like ?", search]};
  	}
	models.Quiz.findAll(where).then(function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes});
  	})
};
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: req.quiz});
	})
};

exports.answer = function(req,res){
	var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta) {
			resultado = 'Correcto';
		}
		res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
		
};
exports.author = function(req, res) {
  res.render('author', {errors: []});
};

exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz 
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
};


// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  
  quiz.save({fields: ["pregunta", "respuesta"]}).then( function(){ 
  	res.redirect('/quizes'); 
    })      // res.redirect: Redirección HTTP a lista de preguntas
};