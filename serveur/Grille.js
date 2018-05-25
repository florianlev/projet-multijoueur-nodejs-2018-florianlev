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
    this.gererPossessionCases = function (idJoueur) {
        for (var y = 0; y < NombreCases.casesH; y++) {
            for (var x = 0; x < NombreCases.casesW; x++) {
                if (gameMap[((y * casesW) + x)] == idJoueur) {
                    //envoyerPossessionCase(idJoueur);
                }
            }
        }
    }
    
    function parcourirGrille() {
    }

    this.determinerCasesSuivante = function (coordonneesCaseCourante, etatDirectionCourant) {
        switch (etatDirectionCourant) {
            case "haut":
                coordonneesCaseCourante.indiceColonne += 1;
                if (coordonneesCaseCourante.indiceColonne >= NombreCases.casesH){
                    console.log("TODO MORT");
                    return null;
                }
                break;
            case "bas":
                coordonneesCaseCourante.indiceColonne -= 1;
                if (coordonneesCaseCourante.indiceColonne < 0) {
                    console.log("TODO MORT");
                    return null;
                }
                break;
            case "droite":
                coordonneesCaseCourante.indiceLigne += 1;
                if (coordonneesCaseCourante.indiceLigne >= NombreCases.casesW){
                    console.log("TODO MORT");
                    return null;
                }
                break;
            case "gauche":
                coordonneesCaseCourante.indiceLigne -= 1;
                if (coordonneesCaseCourante.indiceLigne < 0){
                    console.log("TODO MORT");
                    return null;
                }
                break;
        }
        return gameMap[coordonneesCaseCourante.indiceLigne][coordonneesCaseCourante.indiceColonne];
    }


    initialiser();

}
module.exports = Grille;
