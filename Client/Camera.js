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
            if(joueur.x - window.scrollX + xZoneDeMort > window.innerWidth)
            {
                x =  joueur.x - (window.innerWidth - xZoneDeMort);
                window.scroll(x,y);
            }
    
            else if(joueur.x - xZoneDeMort < window.scrollX)
            {
                x =  joueur.x - xZoneDeMort;
                window.scroll(x,y);
            }
    
    
            if(joueur.y - window.scrollY + yZoneDeMort > window.innerHeight)
            {
                y = joueur.y - (window.innerHeight - yZoneDeMort);
                window.scroll(x,y);
            }
            else if (joueur.y - yZoneDeMort < window.scrollY)
            {
                y = joueur.y - yZoneDeMort;
                window.scroll(x,y);
            }
    
            if(joueur.x >= zoneJeu.width - 50 || joueur.x < 0)
            {
                console.log("MORT");
                sortieZone(joueur);
            }
            else if(joueur.y >= zoneJeu.height - 50 || joueur.y < 0)
            {
                console.log("MORT");
                sortieZone(joueur);
            }
        }
        
        
    }

    initialiser();
}