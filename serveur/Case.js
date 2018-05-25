
function Case(positionLigne, positionColonne)
{
    maCase = this;
    this.indiceLigne;
    this.indiceColonne;
    this.x;
    this.y;
    this.possesionIdJoueur;
    this.id;
    const TAILLECASE = 50;

    this.etat = {
        estLibre : 'estLibre',
        estOccupee : 'estOccupee', // TEST COLLISION
        estPossedee : 'estPossedee' // APPARTIENT A UN JOUEUR
    }
    this.etatActuel;


    function initialiser()
    {
        maCase.etatActuel = maCase.etat.estLibre;
        maCase.indiceLigne = positionLigne;
        maCase.indiceColonne = positionColonne;
    
        maCase.x = maCase.indiceColonne * TAILLECASE;
        maCase.y = maCase.indiceLigne * TAILLECASE;

       /*  console.log("ligne " + maCase.indiceLigne);
        console.log("Colonne " + maCase.indiceColonne); */
    
        maCase.id = Case.id++;
    }
    initialiser();
}
Case.id = 0;
module.exports = Case;
