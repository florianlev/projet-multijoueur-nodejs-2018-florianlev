function ConnexionNode(recupererJoueurInitial,
                        recupererListeJoueur,
                        gererNouvellesPositions
                        ) {
    var connexion;

    
    function initialiser() {
        connexion = io.connect('http://127.0.0.1:2000');
        connexion.on('connexionJoueur', gererConnexionJoueur);
        connexion.on('logout', gererDeconnexionJoueur);
        connexion.on('nombreJoueurPret', gererPreparationDebutPartie);

        //connexion.on('disconnect', gererDeconnexionJoueur);
    }

    function gererPreparationDebutPartie()
    {
        console.log("gererPreparationDebutPartie()");
        connexion.on('nouvellesPositions', chargerNouvellesPositions);

    }

    function chargerNouvellesPositions(evenement) {
        listeJoueurServeur = JSON.parse(evenement);
 
        for (var i = 0; i < listeJoueurServeur.length; i++)
        {
            x = listeJoueurServeur[i].x;
            y = listeJoueurServeur[i].y;
            id = listeJoueurServeur[i].id;
            gererNouvellesPositions(x,y,id);
        }
    }

    function gererConnexionJoueur(evenement) {
        console.log("gererConnexionJoueur()");
        listeJoueurServeur = JSON.parse(evenement);
        recupererJoueurInitial(listeJoueurServeur);
        recupererListeJoueur(listeJoueurServeur);

    }

    function gererDeconnexionJoueur(evenement)
    {
        console.log("gererDeconnexionJoueur()");
        //console.log(evenement.id);
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