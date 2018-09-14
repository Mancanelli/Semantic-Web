var express = require('express');
var router = express.Router();

var media = "/book_triples.owl";
var queryString = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
                    "PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
                    "PREFIX ont: <http://www.semanticweb.org/matteo/ontologies/project#> " +
                    "SELECT ?uri ?title ?author ?year " +
                    "WHERE { " +
                    "	?uri rdf:type ont:Book . " +
                    "	?uri ont:book_title ?title . " +
                    "	?uri ont:writtenBy ?aut . " +
                    "	?aut ont:person_name ?author . " +
                    "   ?uri ont:book_year ?year . " +
                    "} ";

var myquery = require('../public/javascripts/query');
var queryResults = myquery(media, queryString);

router.get('/', function(req, res, next) {
    res.render('books', {title: 'Books', data: queryResults});
});

router.get('/*', function(req, res, next) {
    var book = req.url.substring(1, req.url.length);
    var data = {};

    for (var i = 0; i < queryResults.length; i++)
        if (book === queryResults[i].book_uri)
            data = queryResults[i];

    res.render('info', {data: data});
});

module.exports = router;
