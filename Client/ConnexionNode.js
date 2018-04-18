function ConnexionNode(canvas)
{
    var connexion;

    function initialiser()
    {


        connexion = io.connect('http://127.0.0.1:2000');


        connexion.on('nouvellesPositions', changerNouvellesPositions);
    }

    function changerNouvellesPositions(evenement)
    {
        console.log("toto");
        canvas.clearRect(0, 0, 500, 500);
        for (var i = 0; i < evenement.length; i++)
            canvas.fillText(evenement[i].number, evenement[i].x, evenement[i].y);
    }

    initialiser();

}