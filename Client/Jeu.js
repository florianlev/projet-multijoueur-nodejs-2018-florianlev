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
        
        etatCourantJeu = etatEnJeu.enAttente;
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
            recevoirDebutDePartie,
            gererPositionInitiale);
    }

    function gererPositionInitiale(evenement)
    {
        joueur.setPositionx(evenement.x);
        joueur.setPositiony(evenement.y);
    }

    function initialiserJeu()
    {
        console.log("initialiserJeu()");
        document.getElementById('texte-attente').style.visibility='hidden';
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
            if(etatCourantJeu == etatEnJeu.enAttente)
            {
                console.log("En attente d'un second joueur ! ");
                joueurPretACommencer = true;
                connexion.envoyerJoueurPretAJouer(joueurPretACommencer);
            }
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
                autreJoueur = new Joueur(scene, joueurServeur);
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
            joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];
            console.log(scene);
            joueur = new Joueur(scene, joueurInitial);
            joueur.id = joueurInitial.id;
            listeJoueur.push(joueur);
            joueur.afficher();
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