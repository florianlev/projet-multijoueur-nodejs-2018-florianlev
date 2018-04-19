function ConnexionNode(setPositionJoueur)
{
    var connexion;

    function initialiser()
    {


        connexion = io.connect('http://127.0.0.1:2000');


        connexion.on('nouvellesPositions', changerNouvellesPositions);
    }

    function changerNouvellesPositions(evenement)
    {
        //canvas.clearRect(0, 0, 500, 500);
        console.log(evenement);
        for (var i = 0; i < evenement.length; i++)
            setPositionJoueur();
            //canvas.fillText(evenement[i].number, evenement[i].x, evenement[i].y);
    }

    this.envoyerTouchesEnfoncee = function(direction,etat)
    {
        connexion.emit('toucheEnfoncee', { inputId: direction, state: etat });

    }

    initialiser();

}