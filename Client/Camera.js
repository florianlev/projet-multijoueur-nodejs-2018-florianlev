function Camera(joueur, xZoneDeMort, yZoneDeMort, zoneJeu, sortieZone) {
    console.log(window.scrollX);

    camera = this;
    var x;
    var y;
    this.estMort;


    function initialiser() {
        console.log("initialiserCamera()");
        x = 0;
        y = 0;
        camera.estMort = false;

    }
    this.updateCamera = function()
    {
        if(!camera.estMort)
        {
            if(joueur.coords.x - window.scrollX + xZoneDeMort > window.innerWidth)
            {
                x =  joueur.coords.x - (window.innerWidth - xZoneDeMort);
                window.scroll(x,y);
            }
    
            else if(joueur.coords.x - xZoneDeMort < window.scrollX)
            {
                x =  joueur.x - xZoneDeMort;
                window.scroll(x,y);
            }
    
    
            if(joueur.coords.y - window.scrollY + yZoneDeMort > window.innerHeight)
            {
                y = joueur.y - (window.innerHeight - yZoneDeMort);
                window.scroll(x,y);
            }
            else if (joueur.coords.y - yZoneDeMort < window.scrollY)
            {
                y = joueur.y - yZoneDeMort;
                window.scroll(x,y);
            }
    
            /* if(joueur.coords.x >= zoneJeu.width - 50 || joueur.coords.x < 0)
            {
                console.log("MORT");
                sortieZone(joueur);
            }
            else if(joueur.coords.y >= zoneJeu.height - 50 || joueur.coords.y < 0)
            {
                console.log("MORT");
                sortieZone(joueur);
            } */
        }
        
        
    }

    initialiser();
}