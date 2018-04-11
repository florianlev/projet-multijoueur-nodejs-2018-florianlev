var http = require('http');
var websocket = require('websocket');


(function Seveur()
{
    var initialiser = function()
    {
        var serveur =  http.createServer();
        serveur.listen(8080);
        var serveurJeu = new websocket.server({httpServer: serveur});

        console.log('Preparation de la connection');
        //serveurJeu.on('request', conn)
    }

    initialiser();
})()