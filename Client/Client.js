(function () {


    var joueur;
    var connexion;

    function initialiser()
    {

        console.log("initialiserClient()");
        var canvas = document.getElementById('ctx').getContext("2d");
        //canvas.font = '30px Arial';
        connexion = new ConnexionNode(canvas);
        joueur = new Joueur(canvas);
    }

    initialiser();

})();