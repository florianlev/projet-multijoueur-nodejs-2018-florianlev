(function Jeu() {


    var joueur;
    var connexion;
    var canvas;
    var scene;
    var listeJoueur = [];
    var autreJoueur;
    var idCourant;

    var toucheDroiteEnfoncee;
    var toucheGaucheEnfoncee;
    var toucheHautEnfoncee;
    var toucheBasEnfoncee;

    const etatDirection = {
        droite: "droite",
        bas: "bas",
        gauche:"gauche",
        droite:"droite"
    }
    var etatDirectionCourant;

    const configuration = {
        droite: 68, // d
        bas: 83, // s
        gauche: 65, // a
        haut: 87 // w
    }

    function initialiser() {

        console.log("initialiserClient()");
        canvas = document.getElementById('ctx');
        scene = new createjs.Stage(canvas);
        canvas.font = '30px Arial';
        connexion = new ConnexionNode(recupererJoueurInitial,
            recupererListeJoueur,
            gererNouvellesPositions);
 
        document.onkeydown = gererLesTouchesEnfoncee;
        setInterval(collisionnementJoueur, 1000/25);

    }

    function collisionnementJoueur()
    {
        for (ordreJoueurClient in listeJoueur)
        {
            if(joueur.id != listeJoueur[ordreJoueurClient].id)
            {
                if(joueur.rectangleJoueur().intersects(listeJoueur[ordreJoueurClient].rectangleJoueur())){

                    console.log("INTERSECTION");
                } 
            }
        }
    }


    function recupererListeJoueur(listeJoueurServeur) {
        var joueurServeur;
        var estTrouvee;
        for (ordreJoueurServeur in listeJoueurServeur) {
            estTrouvee = false;
            idJoueurServeurCourant = listeJoueurServeur[ordreJoueurServeur].id;
            for (ordreJoueurClient in listeJoueur) {
                if (listeJoueur[ordreJoueurClient].id == idJoueurServeurCourant) {
                    estTrouvee = true;
                }
            }
            if (!estTrouvee) {
                joueurServeur = listeJoueurServeur[ordreJoueurServeur];
                autreJoueur = new Joueur(scene, joueurServeur);
                listeJoueur.push(autreJoueur);
                autreJoueur.afficher();
                connexion.changerEtatEstCreer(true);
            }
        }
    }

    function recupererJoueurInitial(listeJoueurServeur) {
        if (!listeJoueur.length) {
            var joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];

            joueur = new Joueur(scene,joueurInitial);
            joueur.id = joueurInitial.id;
            listeJoueur.push(joueur);
            joueur.afficher();


            createjs.Ticker.addEventListener("tick", rafraichirEcran);
        }
    }

    function rafraichirEcran(evenement) {
        scene.update(evenement);

    }

    

    function gererNouvellesPositions(x, y, id) {
        for (var i = 0; i < listeJoueur.length; i++) {
            if (id == listeJoueur[i].id) {
                listeJoueur[i].setPositionx(x);
                listeJoueur[i].setPositiony(y);
            }
        }
    }

    function gererLesTouchesEnfoncee(evenement) {

        switch (evenement.keyCode) {
            case configuration.droite:
                //if (!toucheDroiteEnfoncee && etatDirection.droite == etatDirectionCourant) {
                    connexion.envoyerTouchesEnfoncee('droite', true);
                    toucheDroiteEnfoncee = true;
                    //etatDirectionCourant = etatDirection.droite;
                //}
                break;
            case configuration.bas:
                //if (!toucheBasEnfoncee) {
                    connexion.envoyerTouchesEnfoncee('bas', true);
                    toucheBasEnfoncee = true;
                //}
                break;
            case configuration.gauche:
                //if (!toucheGaucheEnfoncee) {
                    connexion.envoyerTouchesEnfoncee('gauche', true);
                    toucheGaucheEnfoncee = true;
                //}
                break;

            case configuration.haut:
                //if (!toucheHautEnfoncee) {
                    connexion.envoyerTouchesEnfoncee('haut', true);
                    toucheHautEnfoncee = true;
                //}
                break;
        }
    }



    initialiser();

})();