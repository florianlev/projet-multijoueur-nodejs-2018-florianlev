function Rectangle(gauche, dessus, width, height) {
    this.gauche;
    this.dessus;
    this.width;
    this.height;
    this.droite;
    this.dessous;


    function intialiser()
    {
        this.gauche = gauche || 0;
        this.dessus = dessus || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.droite = this.gauche + this.width;
        this.dessous = this.dessus + this.height;
    }

    this.setRectangle = function (gauche, dessus, width, height) {
        this.gauche = gauche;
        this.dessus = dessus;
        this.width = width || this.width;
        this.height = height || this.height
        this.droite = (this.gauche + this.width);
        this.dessous = (this.dessus + this.height);
    }

    this.withinRectangle = function(r)
    {
        return (r.gauche <= this.gauche && 
            r.droite >= this.droite &&
            r.dessus <= this.dessus && 
            r.dessous >= this.dessous);
    }

    this.overlapsRectangle = function(r)
    {
        return (this.gauche < r.droite && 
            r.gauche < this.droite && 
            this.dessus < r.dessous &&
            r.dessus < this.dessous);
    }

    intialiser();
}