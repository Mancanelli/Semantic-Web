var express = require('express');
var router = express.Router();

var media = "/game_triples.owl";
var queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
                    "PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
                    "PREFIX ont: <http://www.semanticweb.org/matteo/ontologies/project#> " +
                    "SELECT ?uri ?title ?publisher ?year " +
                    "WHERE { " +
                    "	?uri rdf:type ont:Game . " +
                    "	?uri ont:game_name ?title . " +
                    "	?uri ont:publishedBy ?puburl . " +
                    "	?puburl ont:org_name ?publisher . " +
                    "   ?uri ont:game_year ?year . " +
                    "} ";

var myquery = require('../public/javascripts/query');
var queryResults = myquery(media, queryString);

router.get('/', function(req, res, next) {
    res.render('games', {title: 'Games', data: queryResults});
});

router.get('/*', function(req, res, next) {
    var game = req.url.substring(1, req.url.length);
    var data = {};

    for (var i = 0; i < queryResults.length; i++)
        if (game === queryResults[i].game_uri)
            data = queryResults[i];

    res.render('info', {data: data});
});

module.exports = router;
