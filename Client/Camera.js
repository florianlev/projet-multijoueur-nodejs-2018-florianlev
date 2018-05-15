function Camera(xVue, yVue, sceneWidth, sceneHeight, mondeWidth, mondeHeight) {

    var AXES = {
        RIEN: "rien",
        HORIZONTALE: "horizontale",
        VERTICALE: "verticale",
        BOTH: "both"
    }

    camera = this;
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
        camera.xVue = xVue || 0;
        camera.yVue = yVue || 0;


        camera.wVue = sceneWidth;
        camera.hVue = sceneHeight;

        camera.xZoneDeMort = 0;
        camera.yZoneDeMort = 0;

        camera.axes = AXES.BOTH;
        camera.suivre = null;

        camera.viewportRectangle = new Rectangle(camera.xVue, camera.yVue, camera.wVue, camera.hVue);
        

        camera.mondeRectangle = new Rectangle(0,0,mondeWidth, mondeHeight);
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
            if(camera.axes == AXES.HORIZONTALE || camera.axes == AXES.BOTH)
            {
                if(camera.suivre.x - camera.xVue + camera.xZoneDeMort > camera.wVue)
                {
                    console.log(camera.xVue);

                    camera.xVue = camera.suivre.x - (camera.wVue - camera.xZoneDeMort);
                }
                    
                else if(camera.suivre.x - camera.xZoneDeMort < camera.xVue)
                {


                    camera.xVue = camera.suivre.x - camera.xZoneDeMort;

                }
            }
            if(camera.axes == AXES.VERTICALE || camera.axes == AXES.BOTH)
            {
                if(camera.suivre.y - camera.yVue + camera.yZoneDeMort > camera.hVue)
                    camera.yVue = camera.suivre.y - (camera.hVue - camera.yZoneDeMort);
                else if(camera.suivre.y - camera.yZoneDeMort < camera.yVue)
                    camera.yVue = camera.suivre.y - camera.yZoneDeMort;
            }
        }
        //console.log(viewportRectangle);

        camera.viewportRectangle.setRectangle(camera.xVue,camera.yVue);

        /* if(!this.viewportRectangle.withinRectangle(this.mondeRectangle))
        {
            if(this.viewportRectangle.gauche < this.mondeRectangle.gauche)
                camera.xVue = this.mondeRectangle.gauche;
            if(this.viewportRectangle.dessus < this.mondeRectangle.dessus)
                camera.yVue = this.mondeRectangle.dessus;
            if(this.viewportRectangle.droite > this.mondeRectangle.droite)
                camera.xVue = this.mondeRectangle.droite - this.wVue;
            if(this.viewportRectangle.dessous > this.mondeRectangle.dessous)
                camera.yVue = this.mondeRectangle.dessous - this.hVue;

        } */
    }

    initialiser();
}