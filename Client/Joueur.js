function Joueur(sceneSVG, scene, joueurInitial)
{
    joueur = this;
    var dessin;
    var svg;
    var x;
    var y;
    var score;
    var rect;

    const etatVie = {
        vivant: "vivant",
        mort: "mort"
    }
    
    var etatVieCourant;

    const d = 100;
    this.estCreer;
    this.id;
    var estDessiner;

    //console.log(joueurInitial["id"]);


    function initialiser()
    {
        
        etatVieCourant = etatVie.vivant;
        estDessiner = false;
        dessin = new createjs.Shape();
        rect = sceneSVG.rect(50, 50).attr({ fill: '#f00' });
        rect.x(100);

        //joueur.id = 0;
        //console.log(joueurInitial.id);
        joueur.id = joueurInitial.id;
        dessinerJoueur();
        this.estCreer = false;
    }

    this.setScene = function(uneScene)
    {
        scene = uneScene;
    }


    this.rectangleJoueur = function()
    {
        if(estDessiner)
        {
            dessin.setBounds(dessin.x, dessin.y, 30, 30);
            dessinGetBound = dessin.getBounds();
            return dessinGetBound;

        }
    }

    function dessinerJoueur()
    {
        estDessiner = true;
        dessin.graphics.beginFill("#ff0000").drawRect(0, 0, 30, 30);
        
        //console.log(dessin.getBounds());
    }

    this.setPositionx = function(x)
    {
        //dessin.x = x;
        rect.x(x);
    }
    this.setPositiony = function(y)
    {
        //dessin.y = y;
        rect.y(y);
    
    }
    this.afficher = function()
    {
        scene.addChild(dessin);
    
    }

    initialiser();
}

//AccueilVue.pageAccueilHTML = document.getElementById("joueur").innerHTML;
