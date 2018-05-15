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
    this.viewportRectangle;
    this.mondeRectangle;


    function initialiser() {
        console.log("initialiserCamera()");
        this.xVue = xVue || 0;
        this.yVue = yVue || 0;

        this.wVue = sceneWidth;
        this.hVue = sceneHeight;

        this.xZoneDeMort = 0;
        this.yZoneDeMort = 0;

        this.axes = AXES.BOTH;
        console.log(this.axes);
        this.suivre = null;

        console.log(this.xVue);
        this.viewportRectangle = new Rectangle(this.xVue, this.yVue, this.wVue, this.hVue);
        

        this.mondeRectangle = new Rectangle(0,0,mondeWidth, mondeHeight);
    }

    this.suivreJoueur = function(joueur, xZoneDeMort, yZoneDeMort)
    {
        console.log(axes);
        this.suivre = joueur;
        this.xZoneDeMort = xZoneDeMort;
        this.yZoneDeMort = yZoneDeMort;
    }

    this.updateCamera = function()
    {
        if(this.suivre != null)
        {
            if(axes == AXES.HORIZONTALE || axes == AXES.BOTH)
            {
                console.log("test");
                if(this.suivre.x - this.xVue + this.xZoneDeMort > this.wVue)
                    this.xVue = this.suivre.x - (this.wVue - this.xZoneDeMort);
                else if(this.suivre.x - this.xZoneDeMort < this.xVue)
                    this.xVue = this.suivre.x - this.xZoneDeMort;
            }
            if(axes == AXES.VERTICALE || axes == AXES.BOTH)
            {
                if(this.suivre.y - this.yVue + this.yZoneDeMort > this.hVue)
                    this.yVue = this.suivre.y - (this.hVue - this.yZoneDeMort);
                else if(this.suivre.y - this.yZoneDeMort < this.yVue)
                    this.yVue = this.suivre.y - this.yZoneDeMort;
            }
        }
        //console.log(viewportRectangle);

        viewportRectangle.setRectangle(this.xVue,this.yVue);

        /* if(!this.viewportRectangle.withinRectangle(this.mondeRectangle))
        {
            if(this.viewportRectangle.gauche < this.mondeRectangle.gauche)
                this.xVue = this.mondeRectangle.gauche;
            if(this.viewportRectangle.dessus < this.mondeRectangle.dessus)
                this.yVue = this.mondeRectangle.dessus;
            if(this.viewportRectangle.droite > this.mondeRectangle.droite)
                this.xVue = this.mondeRectangle.droite - this.wVue;
            if(this.viewportRectangle.dessous > this.mondeRectangle.dessous)
                this.yVue = this.mondeRectangle.dessous - this.hVue;

        } */
    }

    initialiser();
}