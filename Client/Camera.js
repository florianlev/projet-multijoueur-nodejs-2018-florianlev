function Camera(terrainPartieHtml) {

    const vitesse = 1;

    function initialiser()
    {

    }
    
    this.updateCamera = function(etatDirectionCourant)
    {

        if(etatDirectionCourant == "droite")
        {
            positionGauche = getPositionGauche();
            positionGauche -= vitesse;
            setPositionGauche(positionGauche);

        }
            
        if(etatDirectionCourant == "gauche")
        {
            positionGauche = getPositionGauche();
            positionGauche += vitesse;
            setPositionGauche(positionGauche);
        }

        if(etatDirectionCourant == "haut")
        {
            positionHaut = getPositionHaut();
            positionHaut += vitesse;
            setPositionHaut(positionHaut);
        }
        if(etatDirectionCourant == "bas")
        {
            positionHaut = getPositionHaut();
            positionHaut -= vitesse;
            setPositionHaut(positionHaut);
            
        }
        
    }

    function getPositionGauche()
    {
        positionGauche = terrainPartieHtml.style.left.replace('px', '');
        positionGauche = parseFloat(positionGauche);
        return positionGauche;

    }

    function getPositionHaut()
    {
        positionHaut = terrainPartieHtml.style.top.replace('px', '');
        positionHaut = parseFloat(positionHaut);
        return positionHaut;


    }

    function setPositionGauche(positionGauche){
        terrainPartieHtml.style.left = positionGauche + "px";
    }

    function setPositionHaut(positionHaut)
    {
        terrainPartieHtml.style.top = positionHaut + "px";
        console.log(terrainPartieHtml.style.top);

    }
}