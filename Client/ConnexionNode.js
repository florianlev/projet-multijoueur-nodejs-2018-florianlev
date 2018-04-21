function ConnexionNode(recupererJoueurInitial,
                        recupererListeJoueur
                        ) {
    var connexion;

    
    function initialiser() {
        connexion = io.connect('http://127.0.0.1:2000');
        connexion.on('nouvellesPositions', chargerNouvellesPositions);
        connexion.on('connexionJoueur', gererConnexionJoueur);   
    }

    function chargerNouvellesPositions(evenement) {
        listeJoueurServeur = JSON.parse(evenement);
        for (var i = 0; i < listeJoueurServeur.length; i++)
        {

        }
            //setPositionJoueur();
        //canvas.fillText(evenement[i].number, evenement[i].x, evenement[i].y);
    }

    function gererConnexionJoueur(evenement) {
        console.log("gererConnexionJoueur()");
        listeJoueurServeur = JSON.parse(evenement);
        recupererJoueurInitial(listeJoueurServeur);
        recupererListeJoueur(listeJoueurServeur);

    }

    this.changerEtatEstCreer = function(estCreer)
    {
        connexion.emit('etatConnexion', estCreer);
    }
    

    this.envoyerTouchesEnfoncee = function (direction, etat) {  
        connexion.emit('toucheEnfoncee', { directionCourante: direction, etatCourant: etat });
    }

    initialiser();

}