(function Jeu() {


    var joueur;
    var connexion;
    var canvas;
    var listeJoueur = [];

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
                break;
            case 83:
                connexion.envoyerTouchesEnfoncee('bas', true);
                break;
            case 65:
                connexion.envoyerTouchesEnfoncee('gauche', true);
                break;
            case 87:
                connexion.envoyerTouchesEnfoncee('haut', true);
                break;
        }
    }

    function gererLesTouchesLachee(evenement)
    {
        switch(evenement.keyCode){
            case 68:
                connexion.envoyerTouchesEnfoncee('droite', false);
                break;
            case 83:
                connexion.envoyerTouchesEnfoncee('bas', false);
                break;
            case 65:
                connexion.envoyerTouchesEnfoncee('gauche', false);
                break;
            case 87:
                connexion.envoyerTouchesEnfoncee('haut', false);
                break;
        }
    }

    function recupererPositionJoueur()
    {
        //canvas.clearRect(0, 0, 500, 500);

    }

    initialiser();

})();