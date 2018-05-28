function Grille() {

    this.gameMap;


    const NombreCases = {
        casesW: 101,
        casesH: 101
    }

    const TAILLECASE = 50;


    function initialiser() {

        console.log("initialiserGrille()");
        gameMap = new Array();

        nettoyerMap();
        //console.log(gameMap[1][0].id);
    }

    function nettoyerMap() {
        for (i = 0; i < NombreCases.casesW; i++) {
            gameMap[i] = new Array();
        }   
        for (positionLigne = 0; positionLigne < NombreCases.casesW; positionLigne++) {
            
            for (positionColonne = 0; positionColonne < NombreCases.casesH; positionColonne++) {
                
                gameMap[positionLigne][positionColonne] = new Case(positionLigne, positionColonne);

            }
        }
    }

    this.determinerCasesSuivante = function (coordonneesCaseCourante, etatDirectionCourant) {
        console.log("GRILLE " + etatDirectionCourant);
        switch (etatDirectionCourant) {
            case "haut":
                coordonneesCaseCourante.indiceLigne -= 1;
                console.log(coordonneesCaseCourante.indiceLigne);
                if (coordonneesCaseCourante.indiceLigne >= NombreCases.casesH){
                    console.log("TODO MORT HAUT");
                    return null;
                }
                break;
            case "bas":
                console.log(coordonneesCaseCourante.indiceLigne );
                coordonneesCaseCourante.indiceLigne += 1;
                if (coordonneesCaseCourante.indiceLigne < 0) {
                    console.log("TODO MORT BAS");
                    return null;
                }
                break;
            case "droite":
                coordonneesCaseCourante.indiceColonne += 1;
                //console.log(coordonneesCaseCourante.indiceColonne);
                if (coordonneesCaseCourante.indiceColonne >= NombreCases.casesW){
                    console.log("TODO MORT DROITE");
                    return null;
                }
                break;
            case "gauche":
                coordonneesCaseCourante.indiceColonne -= 1;
                if (coordonneesCaseCourante.indiceColonne < 0){
                    console.log("TODO MORT GAUCHE");
                    return null;
                }
                break;
        }
        return gameMap[coordonneesCaseCourante.indiceLigne][coordonneesCaseCourante.indiceColonne];
    }


    initialiser();

}
module.exports = Grille;
