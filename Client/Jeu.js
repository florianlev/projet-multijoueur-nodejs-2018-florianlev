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



    const configuration = {
        droite : 68, // d
        bas : 83, // s
        gauche : 65, // a
        haut : 87 // w
    }

    function initialiser() {

        console.log("initialiserClient()");
        canvas = document.getElementById('ctx');
        scene = new createjs.Stage(canvas);
        canvas.font = '30px Arial';
        connexion = new ConnexionNode(recupererJoueurInitial,
                                      recupererListeJoueur,
                                      recupererPositionJoueur);
        
        document.onkeydown = gererLesTouchesEnfoncee;
        document.onkeyup = gererLesTouchesLachee;
        
        toucheDroiteEnfoncee = false;
        toucheGaucheEnfoncee = false;
        toucheHautEnfoncee = false;
        toucheBasEnfoncee = false;
    }

    function recupererListeJoueur(listeJoueurServeur)
    {
        var joueurServeur;
        for(ordreJoueur in listeJoueurServeur)
        {
            idJoueurServeurCourant = listeJoueurServeur[ordreJoueur].id;


            if(!listeJoueur[ordreJoueur])
            {
                console.log("Le joueur " + idJoueurServeurCourant + " s'est connecter !" );
                joueurServeur = listeJoueurServeur[ordreJoueur];
                autreJoueur = new Joueur(scene, joueurServeur);
                listeJoueur.push(autreJoueur);
                autreJoueur.afficher();
                autreJoueur.setPositionx(200);
                connexion.changerEtatEstCreer(true);
            }
        }
    }

    function recupererJoueurInitial(listeJoueurServeur)
    {
        if(!listeJoueur.length)
        {
            var joueurInitial = listeJoueurServeur[listeJoueurServeur.length - 1];
            listeJoueur.push(joueurInitial);
            joueur = new Joueur(scene, joueurInitial);
            joueur.afficher();
    
            createjs.Ticker.addEventListener("tick", rafraichirEcran);
        }

       

    }

    function rafraichirEcran(evenement)
    {
        scene.update(evenement);

    }

    function gererLesTouchesEnfoncee(evenement) {

        switch(evenement.keyCode){
            case configuration.droite:
                if(!toucheDroiteEnfoncee)
                {
                    connexion.envoyerTouchesEnfoncee('droite', true);
                    toucheDroiteEnfoncee = true;
                }
                break;
            case configuration.bas:
                if(!toucheBasEnfoncee)
                {
                    connexion.envoyerTouchesEnfoncee('bas', true);
                    toucheBasEnfoncee = true;
                }
                break;
            case configuration.gauche:
                if(!toucheGaucheEnfoncee)
                {
                    connexion.envoyerTouchesEnfoncee('gauche', true);
                    toucheGaucheEnfoncee = true;
                }
                break;

            case configuration.haut:
                if(!toucheHautEnfoncee)
                {
                    connexion.envoyerTouchesEnfoncee('haut', true);
                    toucheHautEnfoncee = true;
                }
                break;
        }
    }

    function gererLesTouchesLachee(evenement)
    {
        switch(evenement.keyCode){
            case configuration.droite:
                connexion.envoyerTouchesEnfoncee('droite', false);
                toucheDroiteEnfoncee = false;
                break;
            case configuration.bas:
                connexion.envoyerTouchesEnfoncee('bas', false);
                toucheBasEnfoncee = false;
                break;
            case configuration.gauche:
                connexion.envoyerTouchesEnfoncee('gauche', false);
                toucheGaucheEnfoncee = false;
                break;
            case configuration.haut:
                connexion.envoyerTouchesEnfoncee('haut', false);
                toucheHautEnfoncee = false;
                break;
        }
    }

    function recupererPositionJoueur()
    {
        //canvas.clearRect(0, 0, 500, 500);

    }

    initialiser();

})();