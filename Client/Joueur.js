
function Joueur(sceneSVG, scene, joueurInitial, envoyerArriverDestination) {
    joueur = this;
    var dessin;
    var svg;
    this.x;
    this.y;
    this.coords = {
        x: 0,
        y: 0
    };
    var score;
    var rect;
    this.couleur;
    this.idCaseCourante;
    var enTween;
    var tween;
    var enDeplacement;

    var joueurInitialVrai;

    const etatVie = {
        vivant: "vivant",
        mort: "mort"
    }

    var etatVieCourant;

    const d = 100;
    this.estCreer;
    this.id;
    var estDessiner;



    function initialiser() {
        //recuperer Couleur
        joueurInitialVrai = false;
        joueur.x = 0;
        joueur.y = 0;
        enDeplacement = false;
        joueur.couleur = joueurInitial.couleur;
        console.log(joueur.couleur);
        etatVieCourant = etatVie.vivant;
        estDessiner = false;
        dessin = new createjs.Shape();
        rect = sceneSVG.rect(50, 50).attr({ fill: joueur.couleur });
        rect.x(100);

        //joueur.id = 0;
        //console.log(joueurInitial.id);
        joueur.id = joueurInitial.id;
        dessinerJoueur();
        this.estCreer = false;

    }

    this.setScene = function (uneScene) {
        scene = uneScene;
    }

    this.deplacerJoueur = function (uneCaseDestination, unJoueur) {

        if (!enDeplacement) {
            enDeplacement = true;
            tween = new TWEEN.Tween(joueur.coords)
                .to({ x: uneCaseDestination.x, y: uneCaseDestination.y }, 1000)
                .onUpdate(function () {

                    rect.x(joueur.coords.x);
                    rect.y(joueur.coords.y);
                    joueur.x = joueur.coords.x;
                    joueur.y = joueur.coords.y;
                })
                .start()
                .onComplete(function () {
                    enDeplacement = false;
                    console.log(joueurInitialVrai);
                    if(joueurInitialVrai)
                    {
                        console.log("if(joueur.recupererEstJoueurInitial)");
                        envoyerArriverDestination();
                    }
                    /* if(unJoueur != joueur.id){envoyerArriverDestination();} */
                });
            //requestAnimationFrame(animate);
        }
    }

    this.recupererEstJoueurInitial = function(estJoueurInitial)
    {
        joueurInitialVrai = estJoueurInitial;
    }

    this.animate = function() {
        //requestAnimationFrame(animate);
        TWEEN.update();

    }


    this.rectangleJoueur = function () {
        if (estDessiner) {
            dessin.setBounds(dessin.x, dessin.y, 30, 30);
            dessinGetBound = dessin.getBounds();
            return dessinGetBound;

        }
    }

    function dessinerJoueur() {
        estDessiner = true;
        dessin.graphics.beginFill("#ff0000").drawRect(0, 0, 30, 30);

        //console.log(dessin.getBounds());
    }

    this.setPositionx = function (x) {
        //dessin.x = x;
        rect.x(x);
        this.x = x;

    }
    this.setPositiony = function (y) {
        //dessin.y = y;
        rect.y(y);
        this.y = y;

    }

    this.getPositionX = function()
    {
        return joueur.coords.x;
    }
    this.getPositionY = function()
    {
        return joueur.coords.y;

    }
    this.afficher = function () {
        scene.addChild(dessin);

    }

    initialiser();
}


//AccueilVue.pageAccueilHTML = document.getElementById("joueur").innerHTML;
