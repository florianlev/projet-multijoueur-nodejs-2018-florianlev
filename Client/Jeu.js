(function Jeu() {


    var joueur;
    var connexion;
    var canvas;
    var scene;
    var listeJoueur = [];
    var autreJoueur;
    var idCourant;

    var estDemarer;
    var joueurInitial;
    var joueurInitialClient;
    var joueurInitialPret;
    var pretAAfficher;
    var joueurPretACommencer;
    var autreJoueurCourant;

    var toucheDroiteEnfoncee;
    var toucheGaucheEnfoncee;
    var toucheHautEnfoncee;
    var toucheBasEnfoncee;

    const etatDirection = {
        droite: "droite",
        bas: "bas",
        gauche: "gauche",
        droite: "droite"
    }
    var vueCourante;

    const vueActive = {
        accueilVue: "accueilVue",
        attenteVue: "attenteVue",
        jeuVue: "jeuVue"
    }


    var etatDirectionCourant;

    const configuration = {
        droite: 68, // d
        bas: 83, // s
        gauche: 65, // a
        haut: 87, // w
        enter: 13
    }

    function initialiser() {

        console.log("initialiserClient()");
        
        
        estDemarer = false;
        pretAAfficher = false;
        canvasEstExistant = false;
        //initialisation vues
        accueilVue = new AccueilVue();
        attenteJoueurVue = new AttenteJoueurVue();
        jeuVue = new JeuVue();
        accueilVue.afficher();

        window.addEventListener("hashchange", interpreterEvenementLocation);
    }

    function initialiserConnexion()
    {
        console.log("initialiserConnexion()");
        connexion = new ConnexionNode(recupererJoueurInitial,
            recupererListeJoueur,
            gererNouvellesPositions,
            recevoirDebutDePartie);
    }

    function initialiserJeu()
    {
        console.log("initialiserJeu()");
        canvas = document.getElementById('ctx');
        scene = new createjs.Stage(canvas);
        autreJoueurCourant.setScene(scene);
        setInterval(afficherLesjoueurs, 10);
        console.log("CANVAS EXISTANT");
        console.log(canvas);
        pretAAfficher = true;
        debutDePartie();

    }

    function interpreterEvenementLocation(evenement) {

        var intructionNavigation = window.location.hash;
        if (!intructionNavigation || intructionNavigation.match(/^#$/) || intructionNavigation.match(/^#accueil$/)) {
            accueilVue.afficher();
            vueCourante = vueActive.accueilVue;
        }

        else if (intructionNavigation.match(/^#attente$/))
        {
            vueCourante = vueActive.attenteVue;
            console.log("En attente du second joueur");
            attenteJoueurVue.afficher();
            initialiserConnexion();
            joueurPretACommencer = true;
            connexion.envoyerJoueurPretAJouer(joueurPretACommencer);

        }

        else if (intructionNavigation.match(/^#jeu$/)) {
            vueCourante = vueActive.jeuVue;
            jeuVue.afficher();
            initialiserJeu();
        }
    }

    function recevoirDebutDePartie(debutPartie) {
        console.log("recevoirDebutDePartie()");
        window.location = "#jeu";
    }

    function debutDePartie() {
        console.log("debutDePartie()");
        document.onkeydown = gererLesTouchesEnfoncee;
    }

    function collisionnementJoueur() {
        for (ordreJoueurClient in listeJoueur) {
            if (joueur.id != listeJoueur[ordreJoueurCslient].id) {
                if (joueur.rectangleJoueur().intersects(listeJoueur[ordreJoueurClient].rectangleJoueur())) {
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
                console.log("!estTrouvee");
                joueurServeur = listeJoueurServeur[ordreJoueurServeur];
                autreJoueur = new Joueur(scene, joueurServeur);
                listeJoueur.push(autreJoueur);
                autreJoueurCourant = autreJoueur;
                //autreJoueurCourant = listeJoueur[ordreJoueurServeur];
                //afficherLesjoueurs(autreJoueur);
                connexion.changerEtatEstCreer(true);
            }
        }
    }

    function recupererJoueurInitial(listeJoueurServeur) {
        console.log("estDemarer" + estDemarer);
        /* if (joueurInitialPret) {
            console.log("afficher()");

        } */
        if (!listeJoueur.length) {
            joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];
            console.log(scene);
            joueur = new Joueur(scene, joueurInitial);
            joueur.id = joueurInitial.id;
            listeJoueur.push(joueur);
            joueurInitialClient = listeJoueur[0];
            //afficherLesjoueurs();
            /* joueur.afficher();
            createjs.Ticker.addEventListener("tick", rafraichirEcran); */
            joueurInitialPret = true;
        }
    }

    function afficherLesjoueurs() {
        console.log("joueurInitialPret " + joueurInitialPret);
        console.log("pretAAfficher " + pretAAfficher);

        if (pretAAfficher && scene) {
            console.log("testafficherAutreJoueur");
            console.log(scene);
            autreJoueurCourant.afficher();
        }
        if (joueurInitialPret && pretAAfficher && scene) {
            joueurInitialClient.setScene(scene);
            console.log("testJoueurinitial");
            joueurInitialClient.afficher();
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
                connexion.envoyerTouchesEnfoncee('droite', true);
                toucheDroiteEnfoncee = true;
                break;
            case configuration.bas:
                connexion.envoyerTouchesEnfoncee('bas', true);
                toucheBasEnfoncee = true;
                break;
            case configuration.gauche:
                connexion.envoyerTouchesEnfoncee('gauche', true);
                toucheGaucheEnfoncee = true;
                break;
            case configuration.haut:
                connexion.envoyerTouchesEnfoncee('haut', true);
                toucheHautEnfoncee = true;
                break;

            case configuration.enter:
                collisionnementJoueur();
                break;
        }
    }



    initialiser();

})();