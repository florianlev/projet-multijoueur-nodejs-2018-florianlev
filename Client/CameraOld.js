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
        
        camera.suivre = joueur;
        /* camera.xZoneDeMort = xZoneDeMort;
        camera.yZoneDeMort = yZoneDeMort; */
    }

    this.updateCamera = function()
    {
        window.scrollX = camera.suivre.x - 500

        /* if(this.suivre != null)
        {
            if(camera.axes == AXES.HORIZONTALE || camera.axes == AXES.BOTH)
            {
                if(camera.suivre.x - camera.xVue + camera.xZoneDeMort > camera.wVue)
                {
                    camera.xVue = camera.suivre.x - (camera.wVue - camera.xZoneDeMort);
                    console.log("XVIEW : " + camera.xVue);

                }
                    
                else if(camera.suivre.x - camera.xZoneDeMort < camera.xVue)
                {
                    camera.xVue = camera.suivre.x - camera.xZoneDeMort;
                    console.log("XVIEW : " + camera.xVue);

                }
            }
            if(camera.axes == AXES.VERTICALE || camera.axes == AXES.BOTH)
            {
                if(camera.suivre.y - camera.yVue + camera.yZoneDeMort > camera.hVue)
                {
                    camera.yVue = camera.suivre.y - (camera.hVue - camera.yZoneDeMort);
                    console.log("YVIEW : " + camera.yVue);

                }

                else if(camera.suivre.y - camera.yZoneDeMort < camera.yVue)
                {
                    camera.yVue = camera.suivre.y - camera.yZoneDeMort;
                    console.log("YVIEW : " + camera.yVue);


                }
            }
        } */
        //console.log(viewportRectangle);

        //camera.viewportRectangle.setRectangle(camera.xVue,camera.yVue);
        /* if(!camera.viewportRectangle.withinRectangle(camera.mondeRectangle))
        {
            console.log();
            if(camera.viewportRectangle.gauche < camera.mondeRectangle.gauche)
                camera.xVue = camera.mondeRectangle.gauche;
            if(camera.viewportRectangle.dessus < camera.mondeRectangle.dessus)
                camera.yVue = camera.mondeRectangle.dessus;
            if(camera.viewportRectangle.droite > camera.mondeRectangle.droite)
                camera.xVue = camera.mondeRectangle.droite - camera.wVue;
            if(camera.viewportRectangle.dessous > camera.mondeRectangle.dessous)
                camera.yVue = camera.mondeRectangle.dessous - camera.hVue;

        }  */
    }

    initialiser();
}