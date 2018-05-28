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
    this.updateCamera = function(joueurX,joueurY)
    {
        if(!camera.estMort)
        {
            if(joueurX - window.scrollX + xZoneDeMort > window.innerWidth)
            {
                x =  joueurX - (window.innerWidth - xZoneDeMort);
                window.scroll(x,y);
            }
    
            else if(joueurX- xZoneDeMort < window.scrollX)
            {
                x =  joueurX - xZoneDeMort;
                window.scroll(x,y);
            }
    
    
            if(joueurY - window.scrollY + yZoneDeMort > window.innerHeight)
            {
                y = joueurY - (window.innerHeight - yZoneDeMort);
                window.scroll(x,y);
            }
            else if (joueurY - yZoneDeMort < window.scrollY)
            {
                y = joueurY - yZoneDeMort;
                window.scroll(x,y);
            }
    
        }
        
        
    }

    initialiser();
}