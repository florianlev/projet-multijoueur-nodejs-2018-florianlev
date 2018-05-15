function Camera(xVue, yVue, sceneWidth, sceneHeight, mondeWidth, mondeHeight) {

    var AXES = {
        RIEN: "rien",
        HORIZONTALE: "horizontale",
        VERTICALE: "verticale",
        BOTH: "both"
    }

    this.xVue;
    this.yVue;
    this.wVue;
    this.hVue;
    this.axes;
    this.suivre;
    this.xZoneDeMort;
    this.yZoneDeMort;


    function initialiser() {
        this.xVue = xVue || 0;
        this.yVue = yVue || 0;

        this.wVue = sceneWidth;
        this.hVue = sceneHeight;

        this.xZoneDeMort = 0;
        this.yZoneDeMort = 0;

        this.axes = AXES.BOTH;
        this.suivre = null;

        this.viewportRectangle = new Rectangle(this.xVue, this.yView, this.wVue, this.hVue);

        this.mondeRectangle = new Rectangle(0,0,mondeWidth, mondeHeight);
    }

    this.suivreJoueur = function(joueur, xZoneDeMort, yZoneDeMort)
    {
        this.suivre = joueur;
        this.xZoneDeMort = xZoneDeMort;
        this.yZoneDeMort = yZoneDeMort;
    }

    this.updateCamera = function()
    {
        if(this.suivre != null)
        {
            if(this.axes == AXES.HORIZONTALE || this.axes == AXES.BOTH)
            {
                if(this.suivre.x - this.xVue + this.xZoneDeMort > this.wVue)
                    this.xVue = this.suivre.x - (this.wVue - this.xZoneDeMort);
                else if(this.suivre.x - this.xZoneDeMort < this.xVue)
                    this.xVue = this.suivre.x - this.xZoneDeMort;
            }
        }
    }

    initialiser();
}