function Grille(envoyerPossessionCase)
{

    this.gameMap;
    

    const NombreCases = {
        casesW: 100,
        casesH: 100
    }


    function initialiser(){

        console.log("initialiserGrille()");
        gameMap = new Array();
        
        nettoyerMap();
    }

    function nettoyerMap()
    {
        for (i=0;i<200;i++)
        {
            gameMap.push(0);
        }
    }

    this.gererPossessionCases = function(idJoueur)
    {
        for (var y = 0; y< NombreCases.casesH; y++)
        {
            for(var x = 0; x < NombreCases.casesW;x++)
            {
                if(gameMap[((y * casesW) + x)] == idJoueur)
                {
                    envoyerPossessionCase(idJoueur);
                }
            }
        }
    }

    initialiser();
    
}
module.exports = Grille;
