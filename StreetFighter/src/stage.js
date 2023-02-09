export class Stage {
    constructor() {
        this.image = document.getElementById("background");
    }

    update(){

    }

    draw(context){
        context.drawImage(this.image, 0, 0);
    }
}

