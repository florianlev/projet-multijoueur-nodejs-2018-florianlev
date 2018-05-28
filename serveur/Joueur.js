function Joueur(nouveauId) {

    joueur = this;
    this.id;
    this.x;
    this.y;
    this.pressGauche;
    this.pressDroite;
    this.pressHaut;
    this.pressBas;
    this.maxVitesse;
    this.estCreer;
    this.etatDirectionCourant;
    this.score;
    this.couleur;
    this.enDeplacement;

    this.coordonneesCaseCourante = {
        indiceLigne : 0,
        indiceColonne : 0
    }

    this.caseIdCourant;
    
    const etatDirection = {
        droite: "droite",
        gauche: "gauche",
        haut: "haut",
        bas: "bas"
    }

    this.etatVie = {
        vivant: "vivant",
        mort: "mort"
    }

    this.etatVieCourant;


    function initialiser() {
        console.log("initialiserJoueur");

        joueur.retourPos = false;
        joueur.posChanger = false;
        joueur.etatVieCourant = joueur.etatVie.vivant;

        /* joueur.x = entierAleatoire(0,700);
        joueur.y = entierAleatoire(0,700); */
        joueur.enDeplacement = false;
        joueur.x = 0;
        joueur.y = 0;


        joueur.etatDirectionCourant = etatDirection.gauche;
        joueur.maxVitesse = 0;
        joueur.id = nouveauId;
        joueur.estCreer = false;
        // genererCouleur
        joueur.couleur = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

    }



    this.setVitesse = function (vitesse) {
        joueur.maxVitesse = vitesse;
    }

    this.mettreAjourPosition = function () {
        //console.log(joueur.positionDepartX);
        /* console.log("joueurPosition " + joueur.x);
        console.log("PositionDepart " + joueur.positionDepartX); */
        console.log("joueur.positionDepartY " + joueur.positionDepartY);
        console.log("joueur.y " + joueur.y);
        console.log("joueur.positionDepartX " + joueur.positionDepartX);
        console.log("joueur.x " + joueur.x);


    }

    function updatePosition() {
        tween.update();
        //console.log(joueur.x);
    }

    function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initialiser();

}

function debug(message, cat) {
    switch (cat) {

        case "a":
            console.log(message + "salut");
        default:
            console.log(message);
    }
}
module.exports = Joueur;
