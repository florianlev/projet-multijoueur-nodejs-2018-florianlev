function ConnexionNode(setPositionJoueur) {
    var connexion;

    
    function initialiser() {
        connexion = io.connect('http://127.0.0.1:2000');
        connexion.on('nouvellesPositions', chargerNouvellesPositions);
        connexion.on('connexionJoueur', recevoirConnexionDunJoueur);   
    }

    function chargerNouvellesPositions(evenement) {
        listeJoueur = JSON.parse(evenement);
        for (var i = 0; i < listeJoueur.length; i++)
            setPositionJoueur();
        //canvas.fillText(evenement[i].number, evenement[i].x, evenement[i].y);
    }

    function recevoirConnexionDunJoueur(evenement) {
        console.log("recevoirConnexionDunJoueur()");
        console.log(evenement);
    }

    this.envoyerTouchesEnfoncee = function (direction, etat) {
        connexion.emit('toucheEnfoncee', { directionCourante: direction, etatCourant: etat });
    }

    initialiser();

}