(function Jeu() {

    var joueur;
    var connexion;
    var canvas;
    var scene;
    var sceneSVG;
    var listeJoueur = [];
    var autreJoueur;
    var idCourant;
    var terrainJoueur;
    var terrainPartie;

    var estDemarer;
    var joueurInitial;
    var joueurInitialClient;
    var joueurInitialPret;
    var pretAAfficher;
    var joueurPretACommencer;
    var autreJoueurCourant;
    const zoneJeu = {
        width: 10000,
        height: 10000
    }

    var toucheDroiteEnfoncee;
    var toucheGaucheEnfoncee;
    var toucheHautEnfoncee;
    var toucheBasEnfoncee;

    const etatDirection = {
        droite: "droite",
        bas: "bas",
        gauche: "gauche",
        haut: "haut"
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

        fenetreWidth = window.innerWidth;
        fenetreHeight = window.innerHeight;
        var body = document.getElementsByTagName('body')[0];
        body.style.width = fenetreWidth + "px";
        body.style.height = fenetreHeight + "px";


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
        document.getElementById('texte-attente').style.display = 'none';
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

        else if (intructionNavigation.match(/^#gagner$/)) {
            gagnerVue.afficher();
        }
        else if (intructionNavigation.match(/^#perdu$/)) {
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
                autreJoueur = new Joueur(terrainJoueur, scene, joueurServeur);
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

            //terrainpartie : MAP
            console.log(fenetreWidth);
            console.log(fenetreHeight);
            terrainPartie = SVG('terrainPartie').size(fenetreWidth, fenetreHeight);
            /*  terrainPartie.x(- (zoneJeu.width /2));
             terrainPartie.y(- (zoneJeu.height / 2)); */
            /* terrainPartie.x(fenetreWidth / 2);
            terrainPartie.y(fenetreHeight / 2); */

            terrainPartieHtml = document.getElementById("terrainPartie");
            terrainPartieHtml.style.left = 0 + "px";

            terrainPartieHtml.style.top = 0 + "px";

            /*  carreVert = terrainPartie.rect(50,50).attr({fill: '#98FB98'});
             carreVert.x(fenetreWidth/2);
             carreVert.y(fenetreHeight/2);  */
            //terrainJoueur : deplacement du joueurInitial

            terrainJoueur = SVG('terrainJoueur').size(fenetreWidth, fenetreHeight)
            terrainJoueurHtml = document.getElementById("terrainJoueur");
            terrainJoueurHtml.style.width = fenetreWidth + "px";
            terrainJoueurHtml.style.height = fenetreHeight + "px";

            //terrainJoueur = sceneSVG.rect(500,500).attr({ fill: '#ffffff' });
            //carreVert = terrain.rect(10,10).attr({fill: '#98FB98'});

            terrainJoueur.x(0);
            terrainJoueur.y(0);
            joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];
            console.log(scene);
            joueur = new Joueur(terrainJoueur, scene, joueurInitial);
            joueur.id = joueurInitial.id;
            listeJoueur.push(joueur);
            joueur.afficher();
            //var camera = new Camera(0,0,fenetreWidth,fenetreHeight,3000,3000);
            var camera = new Camera(terrainPartieHtml);
            //camera.suivreJoueur(joueur,fenetreWidth/2, fenetreHeight/2);

            setInterval(function () {
                camera.updateCamera(etatDirectionCourant);
            }, 1000 / 30);



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

    function gererJoueurGagnant(joueurGagnant) {
        console.log("GAGNANT");
        console.log(joueurGagnant.id);
        if (joueurGagnant.id == joueur.id) {
            window.location = "#gagner";
            connexion.envoyerJoueurGagner(joueurGagnant);
        }
    }

    function gererLesTouchesEnfoncee(evenement) {

        switch (evenement.keyCode) {
            case configuration.droite:
                etatDirectionCourant = etatDirection.droite;
                connexion.envoyerTouchesEnfoncee('droite', true);
                toucheDroiteEnfoncee = true;
                //window.scrollX += 5;
                break;
            case configuration.bas:
                etatDirectionCourant = etatDirection.bas;
                connexion.envoyerTouchesEnfoncee('bas', true);
                toucheBasEnfoncee = true;

                break;
            case configuration.gauche:
                etatDirectionCourant = etatDirection.gauche;
                connexion.envoyerTouchesEnfoncee('gauche', true);
                toucheGaucheEnfoncee = true;
                window.scrollX -= 5;

                break;
            case configuration.haut:
                etatDirectionCourant = etatDirection.haut;
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