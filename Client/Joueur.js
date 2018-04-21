function Joueur(scene, joueurInitial)
{

    dessin = new createjs.Shape();
    var x;
    var y;
    this.estCreer;



    function initialiser()
    {
        dessinerJoueur();
        this.estCreer = false;
    }

    function dessinerJoueur()
    {
        dessin.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
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