function Joueur(scene, joueurInitial)
{

    var dessin;
    var x;
    var y;
    this.estCreer;

    //console.log(joueurInitial["id"]);


    function initialiser()
    {
        dessin = new createjs.Shape();
        console.log(joueurInitial.id);
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