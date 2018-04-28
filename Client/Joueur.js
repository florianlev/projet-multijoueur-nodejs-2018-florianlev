function Joueur(scene, joueurInitial)
{
    joueur = this;
    var dessin;
    var x;
    var y;

    const d = 100;
    this.estCreer;
    this.id;
    var estDessiner;

    //console.log(joueurInitial["id"]);


    function initialiser()
    {

        estDessiner = false;
        dessin = new createjs.Shape();
        

        //joueur.id = 0;
        //console.log(joueurInitial.id);
        joueur.id = joueurInitial.id;
        dessinerJoueur();
        this.estCreer = false;


    }

    /*this.tracerChemin = function()
    {
        
        //dessin.graphics.beginFill("#ff0000").drawRect(x, y,100, 100);

        ctx.fillRect(x,y,d,d);
        ctx.fillStyle = "#FF0000";
    }*/


    this.rectangleJoueur = function()
    {
        if(estDessiner)
        {
            dessin.setBounds(dessin.x, dessin.y, 100, 100);
            dessinGetBound = dessin.getBounds();
            return dessinGetBound;

        }
    }

    function dessinerJoueur()
    {
        estDessiner = true;
        dessin.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
        
        //console.log(dessin.getBounds());
    }

    this.setPositionx = function(x)
    {
        dessin.x = x;
    }
    this.setPositiony = function(y)
    {
        dessin.y = y;
    
    }
    this.afficher = function()
    {
        scene.addChild(dessin);
        

    }

    initialiser();
}