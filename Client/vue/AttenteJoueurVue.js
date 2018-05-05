AttenteJoueurVue = function()
{
    var corps;

    
    function initialiser()
    {
        corps = document.getElementsByTagName("body")[0];
    }

    this.afficher = function()
    {
        console.log("afficherVue");
        corps.innerHTML = AttenteJoueurVue.pageAttenteHTML;
     
    }

    initialiser();
}

AttenteJoueurVue.pageAttenteHTML = document.getElementById("page-attente").innerHTML;

