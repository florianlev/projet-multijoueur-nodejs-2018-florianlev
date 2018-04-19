function Joueur(stage,canvas)
{

    dessin = new createjs.Shape();


    function initialiser()
    {
        dessinerJoueur();
    }

    function dessinerJoueur()
    {
        dessin.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 100);
    }

    this.afficher = function()
    {
        stage.addChild(dessin);
    }

    initialiser();
}