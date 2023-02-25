import { Ken }  from "./entities/fighters/ken.js";
import { Ryu }  from "./entities/fighters/ryu.js";
import { Stage } from "./stage.js";
import { FpsCounter } from "./FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stageC.js";
import { FighterDirection } from "./constants/fighterC.js";


export class StreetFighterGame {
    constructor () {
        this.context = this.getContext();
        this.fighters = [
            new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT),
            new Ken(280, STAGE_FLOOR, FighterDirection.LEFT),
        ];
        
        this.entities = [
            new Stage(),
            ...this.fighters,
            new FpsCounter(),
        ];
        
        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        };
    }
    getContext () {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        
        context.imageSmoothingEnabled = false;

        return context;
    }

    update() {
        for (const entity of this.entities) {
            entity.update(this.frameTime, this.context);
        };
    }

    draw() {
        for (const entity of this.entities) {
            entity.draw(this.context);
        };
    }

    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));
        
        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        }

        this.update();
        this.draw();
    }

    handleForSubmit(event) {
        event.preventDefault();

        const selectedCheckboxes = Array.from(event.target.querySelectorAll('input:checked')).map(checkbox => checkbox.value);

        const options = event.target.querySelector("select");

        this.fighters.forEach(fighter =>{
            if (selectedCheckboxes.includes(fighter.name)) {
                fighter.changeState(options.value);
            }
        });
    }

    start () {
        document.addEventListener("submit", this.handleForSubmit.bind(this));

        window.requestAnimationFrame(this.frame.bind(this));
    }
}
