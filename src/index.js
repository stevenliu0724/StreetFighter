
import { StreetFighterGame } from "./StreetFighterGame.js";
import { FighterState } from "./constants/fighterC.js";


function populateDropdown() {
    const dropdown = document.getElementById("state-dropdown");

    Object.entries(FighterState).forEach(([, value]) => {
        const option = document.createElement("option");
        option.setAttribute('value' , value);
        option.innerText = value;
        dropdown.appendChild(option);
    })
}



window.addEventListener("load", function() {
    populateDropdown();

new StreetFighterGame().start();
});