function Rectangle(gauche, dessus, width, height) {
    rectangle = this;
    this.gauche;
    this.dessus;
    this.width;
    this.height;
    this.droite;
    this.dessous;
    console.log(width);


    function intialiser()
    {
        rectangle.gauche = gauche || 0;
        rectangle.dessus = dessus || 0;
        rectangle.width = width || 0;
        rectangle.height = height || 0;
        rectangle.droite = rectangle.gauche + rectangle.width;
        rectangle.dessous = rectangle.dessus + rectangle.height;
    }

    this.setRectangle = function (gauche, dessus, width, height) {
        
        rectangle.gauche = gauche;
        rectangle.dessus = dessus;
        rectangle.width = width || rectangle.width;
        rectangle.height = height || rectangle.height
        rectangle.droite = (rectangle.gauche + rectangle.width);
        rectangle.dessous = (rectangle.dessus + rectangle.height);
    }

    this.withinRectangle = function(r)
    {
        return (r.gauche <= rectangle.gauche && 
            r.droite >= rectangle.droite &&
            r.dessus <= rectangle.dessus && 
            r.dessous >= rectangle.dessous);
    }

    this.overlapsRectangle = function(r)
    {
        return (rectangle.gauche < r.droite && 
            r.gauche < rectangle.droite && 
            rectangle.dessus < r.dessous &&
            r.dessus < rectangle.dessous);
    }

    intialiser();
}