(function Jeu() {


    var joueur;
    var connexion;
    var canvas;

    function initialiser() {

        console.log("initialiserClient()");
        canvas = document.getElementById('ctx');
        scene = new createjs.Stage(canvas);
        canvas.font = '30px Arial';
        connexion = new ConnexionNode(recupererPositionJoueur);
        joueur = new Joueur(scene, canvas);


        document.onkeydown = gererLesTouchesEnfoncee;
        document.onkeyup = gererLesTouchesLachee;
        joueur.afficher();

        createjs.Ticker.addEventListener("tick", rafraichirEcran);

    }

    function rafraichirEcran(evenement)
    {
        scene.update(evenement);

    }



    function gererLesTouchesEnfoncee(evenement) {

        switch(evenement.keyCode){
            case 68:
                connexion.envoyerTouchesEnfoncee('droite', true);
            case 83:
                connexion.envoyerTouchesEnfoncee('bas', true);
            case 65:
                connexion.envoyerTouchesEnfoncee('gauche', true);
            case 87:
                connexion.envoyerTouchesEnfoncee('haut', true);
        }
    }

    function gererLesTouchesLachee(evenement)
    {
        switch(evenement.keyCode){
            case 68:
                connexion.envoyerTouchesEnfoncee('droite', false);
            case 83:
                connexion.envoyerTouchesEnfoncee('bas', false);
            case 65:
                connexion.envoyerTouchesEnfoncee('gauche', false);
            case 87:
                connexion.envoyerTouchesEnfoncee('haut', false);
        }
    }

    function recupererPositionJoueur()
    {
        //canvas.clearRect(0, 0, 500, 500);

    }

    initialiser();

})();