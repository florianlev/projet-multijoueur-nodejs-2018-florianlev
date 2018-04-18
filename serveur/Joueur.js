function Joueur(id) {

    var unJoueur;

    var initialiser = function()
    {
        var unJoueur = {
            x: 250,
            y: 250,
            id: id,
            number: "" + Math.floor(10 * Math.random()),
            pressGauche: false,
            pressDroite: false,
            pressHaut: false,
            pressBas: false,
            maxVitesse: 10,
        }
    }
    
    unJoueur.updatePosition = function () {
        if (unJoueur.pressDroite)
            unJoueur.x += unJoueur.maxVitesse;
        if (unJoueur.pressGauche)
            unJoueur.x -= unJoueur.maxVitesse;
        if (unJoueur.pressHaut)
            unJoueur.y -= unJoueur.maxVitesse;
        if (unJoueur.pressBas)
            unJoueur.y += unJoueur.maxVitesse;
    }
    return joueur;
}
}