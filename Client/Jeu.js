(function Jeu() {

    var joueur;
    var connexion;
    var canvas;
    var scene;
    //var sceneSVG;
    var viewPort;
    var zoneJeu;
    var listeJoueur = [];
    var autreJoueur;
    var idCourant;
    var joueurActuel;

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

    var tailleCase = {
        caseW: 50,
        caseH: 50
    }

    const etatDirection = {
        droite: "droite",
        bas: "bas",
        gauche: "gauche",
        droite: "droite"
    }
    var vueCourante;

    const etatEnJeu = {
        enAttente: "enAttente",
        enJeu: "enJeu"
    }

    var tailleZoneJeu = {
        width: 5000,
        height: 5000,
    }

    var etatCourantJeu;
    var etatDirectionCourant;

    const configuration = {
        droite: 68, // d
        bas: 83, // s
        gauche: 65, // a
        haut: 87, // w
        enter: 13
    }

    function initialiser() {

        window.scroll(0, 0);
        console.log("initialiserClient()");
        console.log(window.innerHeight);
        console.log(window.innerWidth);

        etatCourantJeu = etatEnJeu.enAttente;
        estDemarer = false;
        pretAAfficher = false;
        canvasEstExistant = false;
        //initialisation vues
        accueilVue = new AccueilVue();
        attenteJoueurVue = new AttenteJoueurVue();
        gagnerVue = new GagnerVue();
        perduVue = new PerduVue();
        jeuVue = new JeuVue();
        accueilVue.afficher();

        window.addEventListener("hashchange", interpreterEvenementLocation);

    }

    function initialiserConnexion() {
        console.log("initialiserConnexion()");
        connexion = new ConnexionNode(recupererJoueurInitial,
            recupererListeJoueur,
            gererNouvellesPositions,
            recevoirDebutDePartie,
            gererPositionInitiale,
            gererMortJoueur,
            gererJoueurGagnant,
            gererLesNouvellesPositions);
    }

    function gererPositionInitiale(evenement) {
        joueur.setPositionx(evenement.x);
        joueur.setPositiony(evenement.y);
    }

    function initialiserJeu() {
        console.log("initialiserJeu()");
        document.getElementById('texte-attente').style.visibility = 'hidden';
        pretAAfficher = true;
        document.onkeydown = gererLesTouchesEnfoncee
    }

    function initialiserLaScene() {
        // SCENE DU JEU
        zoneJeu = SVG('zoneJeu').size(tailleZoneJeu.width, tailleZoneJeu.height);
        zoneJeu.x(0);
        zoneJeu.y(0);

        //rectangle delimitant la zone de jeu
        zone = zoneJeu.rect(tailleZoneJeu.width, tailleZoneJeu.height).attr({ stroke: '#000000', 'stroke-width': 5, fill: 'none' });
        zone.x(0);
        zone.y(0);

    }

    function interpreterEvenementLocation(evenement) {

        var intructionNavigation = window.location.hash;
        if (!intructionNavigation || intructionNavigation.match(/^#$/) || intructionNavigation.match(/^#accueil$/)) {
            accueilVue.afficher();
        }

        else if (intructionNavigation.match(/^#jeu$/)) {

            initialiserConnexion();

            jeuVue.afficher();
            if (etatCourantJeu == etatEnJeu.enAttente) {
                console.log("En attente d'un second joueur ! ");
                joueurPretACommencer = true;
                connexion.envoyerJoueurPretAJouer(joueurPretACommencer);
            }
        }

        else if (intructionNavigation.match(/^#gagner$/)) {
            gagnerVue.afficher();
            window.scroll(0, 0);

        }
        else if (intructionNavigation.match(/^#perdu$/)) {
            perduVue.afficher();
            window.scroll(0, 0);

        }
    }

    function recevoirDebutDePartie(debutPartie) {
        console.log("recevoirDebutDePartie()");
        etatCourantJeu = etatEnJeu.enJeu;
    }

    function debutDePartie() {
        console.log("debutDePartie()");
        document.onkeydown = gererLesTouchesEnfoncee;
    }

    function collisionnementJoueur() {
        for (ordreJoueurClient in listeJoueur) {
            if (joueur.id != listeJoueur[ordreJoueurClient].id) {
                if (joueur.rectangleJoueur().intersects(listeJoueur[ordreJoueurClient].rectangleJoueur())) {
                    console.log("INTERSECTION");
                    connexion.joueurMort(listeJoueur[ordreJoueurClient]);
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
                console.log(joueurInitialPret);
                joueurServeur = listeJoueurServeur[ordreJoueurServeur];
                autreJoueur = new Joueur(zoneJeu, scene, joueurServeur, envoyerArriverDestination);
                listeJoueur.push(autreJoueur);
                autreJoueur.afficher();
                connexion.changerEtatEstCreer(true);
                initialiserJeu();

            }
        }
    }

    function recupererJoueurInitial(listeJoueurServeur) {

        if (!listeJoueur.length) {

            canvas = document.getElementById('ctx');

            scene = new createjs.Stage(canvas);

            initialiserLaScene();
            joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];
            joueur = new Joueur(zoneJeu, scene, joueurInitial, envoyerArriverDestination);
            joueur.id = joueurInitial.id;
            listeJoueur.push(joueur);
            joueur.afficher();
            var camera = new Camera(joueur, window.innerWidth / 2, window.innerHeight / 2, tailleZoneJeu, sortieZone);

            createjs.Ticker.addEventListener("tick", rafraichirEcran);
            joueurInitialPret = true;

            setInterval(update, 1000 / 30);

        }
    }

    function update() {
        if(joueurActuel){
            /* console.log(joueurActuel.id);
            console.log(listeJoueur[0].id); */
            if (joueurActuel.id == listeJoueur[0].id) {
                console.log("TEST");
                listeJoueur[0].recupererEstJoueurInitial(true);
                camera.updateCamera(listeJoueur[0].getPositionX(), listeJoueur[0].getPositionY());

            }
    
            else {
                listeJoueur[0].recupererEstJoueurInitial(false);
            }
            joueur.animate();
        }
        
        /* for (var i = 0; i < listeJoueur.length; i++) {
             if (joueur.id == listeJoueur[i].id) {
                 console.log("ID " + listeJoueur[i].id);
                 console.log("X " + listeJoueur[i].getPositionX()); 
                 camera.updateCamera(listeJoueur[i].getPositionX(), listeJoueur[i].getPositionY());
    
             }
         }  */
    }
    /*  */
    function envoyerArriverDestination() {
        connexion.envoyerArriverDestination();
    }

    function sortieZone(joueur) {
        window.scroll(0, 0);

        connexion.sortieZone(joueur);
        camera.estMort = true;
        window.location = "#perdu";

    }

    function rafraichirEcran(evenement) {
        scene.update(evenement);
    }

    function gererNouvellesPositions(x, y, id) {
        for (var i = 0; i < listeJoueur.length; i++) {
            if (id == listeJoueur[i].id) {
                listeJoueur[i].setPositionx(x);
                listeJoueur[i].setPositiony(y);
                //camera.updateCamera();

            }
        }
    }

    function gererLesNouvellesPositions(uneCaseDestination, unJoueur) {
        console.log(unJoueur.id);
        joueurActuel = unJoueur;
        for (var i = 0; i < listeJoueur.length; i++) {
            if (unJoueur.id == listeJoueur[i].id) {
                listeJoueur[i].idCaseCourante = uneCaseDestination.id;
                listeJoueur[i].deplacerJoueur(uneCaseDestination, unJoueur.id);

            }
        }
    }

    function gererJoueurGagnant(joueurGagnant) {
        console.log("GAGNANT");
        console.log(joueurGagnant.id);
        if (joueurGagnant.id == joueur.id) {
            window.location = "#gagner";
            connexion.envoyerJoueurGagner(joueurGagnant);
            window.scroll(0, 0);
        }
    }

    function gererLesTouchesEnfoncee(evenement) {

        switch (evenement.keyCode) {
            case configuration.droite:
                if (etatDirectionCourant != etatDirection.droite) {
                    console.log(etatDirectionCourant);
                    connexion.envoyerTouchesEnfoncee('droite', true);
                }
                etatDirectionCourant = etatDirection.droite;
                break;
            case configuration.bas:
                if (etatDirectionCourant != etatDirection.bas) {
                    connexion.envoyerTouchesEnfoncee('bas', true);
                }
                etatDirectionCourant = etatDirection.bas;
                break;
            case configuration.gauche:
                if (etatDirectionCourant != etatDirection.gauche) {
                    connexion.envoyerTouchesEnfoncee('gauche', true);
                }
                etatDirectionCourant = etatDirection.gauche;
                break;
            case configuration.haut:
                if (etatDirectionCourant != etatDirection.haut) {
                    connexion.envoyerTouchesEnfoncee('haut', true);
                }
                etatDirectionCourant = etatDirection.haut;
                break;

            case configuration.enter:
                collisionnementJoueur();
                break;
        }
    }

    function transfererEtatPosition() {
        //connexion.envoyerTouchesEnfoncee(etatDirectionCourant, true);

    }

    function gererMortJoueur(unJoueurMort) {
        console.log("gererMortJoueur");
        console.log(unJoueurMort.id);
        for (ordreJoueurClient in listeJoueur) {
            if (listeJoueur[ordreJoueurClient].id == unJoueurMort.id) {
                console.log(listeJoueur[ordreJoueurClient].id);
            }
        }
        if (joueur.id == unJoueurMort.id) {
            window.location = "#perdu";
            window.scroll(0, 0);

        }
    }

    initialiser();

})();