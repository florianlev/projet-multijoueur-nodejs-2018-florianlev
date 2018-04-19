(function () {


    var joueur;
    var connexion;

    function initialiser() {

        console.log("initialiserClient()");
        var canvas = document.getElementById('ctx').getContext("2d");
        canvas.font = '30px Arial';
        connexion = new ConnexionNode(canvas);
        joueur = new Joueur(canvas);

        document.onkeydown(gererLesTouchesEnfoncee);
        document.onkeyup(gererLesTouchesLachee)
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

    initialiser();

})();