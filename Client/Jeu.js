(function Jeu() {

    var joueur;
    var connexion;
    var canvas;
    var scene;
    var sceneSVG;
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

    const etatEnJeu = {
        enAttente: "enAttente",
        enJeu: "enJeu"
        
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
            gererJoueurGagnant);
    }

    function gererPositionInitiale(evenement) {
        joueur.setPositionx(evenement.x);
        joueur.setPositiony(evenement.y);
    }

    function initialiserJeu() {
        console.log("initialiserJeu()");
        document.getElementById('texte-attente').style.visibility = 'hidden';
        pretAAfficher = true;
        document.onkeydown = gererLesTouchesEnfoncee;

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

        else if (intructionNavigation.match(/^#gagner$/))
        {
            gagnerVue.afficher();
        }
        else if (intructionNavigation.match(/^#perdu$/))
        {
            perduVue.afficher();
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
                autreJoueur = new Joueur(sceneSVG, scene, joueurServeur);
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
            sceneSVG = SVG('drawing').size(window.innerWidth, window.innerHeight);

            joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];
            console.log(scene);
            joueur = new Joueur(sceneSVG, scene, joueurInitial);
            joueur.id = joueurInitial.id;
            listeJoueur.push(joueur);
            joueur.afficher();
            var camera = new Camera(0,0,window.innerWidth,window.innerHeight,300,300);
            camera.suivreJoueur(joueur,window.innerWidth/2, window.innerHeight/2);

            

            createjs.Ticker.addEventListener("tick", rafraichirEcran);
            joueurInitialPret = true;
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

    function gererJoueurGagnant(joueurGagnant)
    {
        console.log("GAGNANT");
        console.log(joueurGagnant.id);
        if(joueurGagnant.id == joueur.id)
        {
            window.location = "#gagner";
            connexion.envoyerJoueurGagner(joueurGagnant);
        }
    }

    function gererLesTouchesEnfoncee(evenement) {

        switch (evenement.keyCode) {
            case configuration.droite:
                connexion.envoyerTouchesEnfoncee('droite', true);
                toucheDroiteEnfoncee = true;
                window.scrollX += 5;
                break;
            case configuration.bas:
                connexion.envoyerTouchesEnfoncee('bas', true);
                toucheBasEnfoncee = true;
                
                break;
            case configuration.gauche:
                connexion.envoyerTouchesEnfoncee('gauche', true);
                toucheGaucheEnfoncee = true;
                window.scrollX -= 5;

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
        }
    }

    initialiser();

})();