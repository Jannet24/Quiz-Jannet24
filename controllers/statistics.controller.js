var models = require('../models/models.js');

exports.index = function(req,res){
	var numComments;

     models.Comment.count().then(
        function(comments){
            numComments = comments; 
        });

     models.Quiz.count().then(
     	function(quiz){
        	res.render('statistics/index.ejs',{
             	nComments: numComments,
             	nQuizes: quiz,
             	errors: []
            });
        }
     	);

};
