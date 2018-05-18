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

    var tailleZoneJeu = {
        width: 5000,
        height: 5000   ,
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

        window.scroll(0,0);
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
            window.scroll(0,0);

        }
        else if (intructionNavigation.match(/^#perdu$/))
        {
            perduVue.afficher();
            window.scroll(0,0);

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
                autreJoueur = new Joueur(zoneJeu, scene, joueurServeur);
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
            viewPort = SVG('viewPort').size(window.innerWidth, window.innerHeight);

            //window.scroll(5000,0);
            //console.log(window.scrollX);

            zoneJeu = SVG('zoneJeu').size(tailleZoneJeu.width, tailleZoneJeu.height);
            zoneJeu.x(0);
            zoneJeu.y(0);
            zone = zoneJeu.rect(tailleZoneJeu.width,tailleZoneJeu.height).attr({ stroke : '#000000', 'stroke-width' : 5, fill: 'none'});
            
            zone.x(0);
            zone.y(0);

        
            joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];
            console.log(scene);
            joueur = new Joueur(zoneJeu, scene, joueurInitial);
            joueur.id = joueurInitial.id;
            listeJoueur.push(joueur);
            joueur.afficher();
            var camera = new Camera(joueur,window.innerWidth/2, window.innerHeight/2, tailleZoneJeu,sortieZone);
            //camera.suivreJoueur(joueur,window.innerWidth/2, window.innerHeight/2);

            /* setInterval(function(){
                camera.updateCamera();
            },1000/30); */



            createjs.Ticker.addEventListener("tick", rafraichirEcran);
            joueurInitialPret = true;
        }
    }

    function sortieZone(joueur)
    {
        window.scroll(0,0);
        
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
                camera.updateCamera();

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
            window.scroll(0,0);
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
            window.scroll(0,0);

        }
    }

    initialiser();

})();