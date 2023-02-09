import { Ken }  from "./ken.js";
import { Ryu }  from "./ryu.js";
import { Stage } from "./stage.js";
import { FpsCounter } from "./FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stageC.js";
import { FighterDirection, FighterState } from "./constants/fighterC.js";


function populateDropdown() {
    const dropdown = document.getElementById("state-dropdown");

    Object.entries(FighterState).forEach(([, value]) => {
        const option = document.createElement("option");
        option.setAttribute('value' , value);
        option.innerText = value;
        dropdown.appendChild(option);
    })
}

function handleForSubmit(event, fighters) {
    event.preventDefault();

    const selectedCheckboxes = Array.from(event.target.querySelectorAll('input:checked')).map(checkbox => checkbox.value);

    const options = event.target.querySelector("select");

    fighters.forEach(fighter =>{
        if (selectedCheckboxes.includes(fighter.name)) {
            fighter.changeState(options.value);
        }
    })

}

window.addEventListener("load", function() {
    populateDropdown();

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    context.imageSmoothingEnabled = false;

    const fighters = [
        new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT),
        new Ken(280, STAGE_FLOOR, FighterDirection.LEFT),
    ]



    const entities = [
        new Stage(),
        ...fighters,
        new FpsCounter(),
    ];

    let frameTime = {
        previous: 0,
        secondsPassed: 0,
    };


    function frame(time){
        window.requestAnimationFrame(frame);
        
        frameTime = {
            secondsPassed: (time - frameTime.previous) / 1000,
            previous: time,
        }


        for (const entity of entities) {
            entity.update(frameTime, context);
        };

        for (const entity of entities) {
            entity.draw(context);
        };
    }
    
    this.document.addEventListener("submit", (event) => handleForSubmit(event, fighters));

    window.requestAnimationFrame(frame);

});