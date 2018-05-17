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

    const etatDirection = {
        droite : "droite",
        gauche : "gauche",
        haut : "haut",
        bas : "bas"
    }

    this.etatVie = {
        vivant: "vivant",
        mort: "mort"
    }

    this.etatVieCourant;


    function initialiser(){
        console.log("initialiserJoueur");

        joueur.etatVieCourant = joueur.etatVie.vivant;

        /* joueur.x = entierAleatoire(0,700);
        joueur.y = entierAleatoire(0,700); */
        joueur.x = 50;
        joueur.y = 50;
        joueur.etatDirectionCourant = etatDirection.bas;
        joueur.maxVitesse = 0;
        joueur.id = nouveauId;
        joueur.estCreer = false;
    }

    this.setVitesse = function(vitesse)
    {
        joueur.maxVitesse = vitesse;
    }

    this.mettreAjourPosition = function () {
        if (etatDirection.droite == joueur.etatDirectionCourant ) joueur.x += joueur.maxVitesse;
        if (etatDirection.gauche == joueur.etatDirectionCourant)  joueur.x -= joueur.maxVitesse;
        if (etatDirection.haut == joueur.etatDirectionCourant) joueur.y -= joueur.maxVitesse;
        if (etatDirection.bas == joueur.etatDirectionCourant) joueur.y += joueur.maxVitesse;
    }

    function entierAleatoire(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initialiser();

}
module.exports = Joueur;
