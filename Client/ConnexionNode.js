function ConnexionNode(recupererJoueurInitial,
                        recupererListeJoueur,
                        gererNouvellesPositions,
                        recevoirDebutDePartie,
                        gererPositionInitiale,
                        gererMortJoueur,
                        gererJoueurGagnant
                        ) {
    var connexion;

    
    function initialiser() {
        connexion = io.connect('http://127.0.0.1:2000');
        connexion.on('connexionJoueur', gererConnexionJoueur);
        connexion.on('logout', gererDeconnexionJoueur);
        //connexion.on('nombreJoueurPret', gererPreparationDebutPartie);
        connexion.on('partieEstCommencer', gererCommencementPartie);
        connexion.on('positionInitiale', gererPositionInitiale);
        connexion.on('mortDunJoueur', gererMortJoueur);
        connexion.on('joueurGagnant', gererJoueurGagnant);
        //connexion.on('disconnect', gererDeconnexionJoueur);
    }

    

    function gererCommencementPartie(evenement)
    {
        console.log("gererCommencementPartie()");
        recevoirDebutDePartie(evenement);

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

    this.joueurMort = function(unJoueur)
    {
        connexion.emit('joueurMort', unJoueur);
    }

    function gererDeconnexionJoueur(evenement)
    {
        console.log("gererDeconnexionJoueur()");
        //console.log(evenement.id);
    }

    this.envoyerJoueurPretAJouer = function(joueurPret){
        console.log("envoyerJoueurPretAJouer()");
        connexion.emit('joueurEstPret',joueurPret);
    }

    this.changerEtatEstCreer = function(estCreer)
    {
        connexion.emit('etatConnexion', estCreer);
    }
    

    this.envoyerTouchesEnfoncee = function (direction, etat) {  
        connexion.emit('toucheEnfoncee', { directionCourante: direction, etatCourant: etat });
    }

    this.envoyerJoueurGagner = function(joueurGagner)
    {
        connexion.emit('joueurGagner', joueurGagner );
    }


    initialiser();

}