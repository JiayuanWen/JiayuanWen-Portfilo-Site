// Advanced UI elements
import { selfIntroFade } from "./helper/UI/selfintro-fade.js";
import { mainMenuFade } from "./helper/UI/mainmenu-fade.js";
import { contactInfoFade } from "./helper/UI/contactinfo-fade.js";
import { fiberLampFade } from "./helper/UI/fiberlamp-fade.js";
import { backToHomepage } from "./helper/UI/back-button.js";

// Other helpful functions
import { delay } from "./helper/delay.js";
import { isMobile } from "./helper/mobileCheck.js";
import { getDeviceOrientation } from "./helper/orientationMode.js";
import { gpuEnabled } from "./helper/gpu-detect.js";


//---------------------------------------------------------------------------------------- My Projects click handle
document.getElementById("my-projects").addEventListener("click", async function() { 
    let delayer;
    let elementCheck;

    // Hide main page
    selfIntroFade(10,"Out");
    mainMenuFade(10,"Out");

    // Show projects
    loadProjects();
    showProjects()

    // Move lamp to center
    if (gpuEnabled()) {
        document.getElementById("fiber-lamp").style.transition = "1.9s";
        document.getElementById("fiber-lamp").style.paddingRight = "0vw"; 
        delayer = await delay(1900);
        document.getElementById("fiber-lamp").style.position = "fixed";
    }
    else {
        document.getElementById("fiber-lamp-lite").style.left = "50%";
        document.getElementById("fiber-lamp-lite").style.right = "50%";
    }

    // Make page scrollable
    if (isMobile()) {
        document.getElementsByTagName('body')[0].style.overflowY = "auto";
    }

    // Enable back button to allow visitors to go back
    document.getElementById("back-button").style.pointerEvents = "auto";
    document.getElementById("back-button").style.display = "block";

    //---------------------------------------------------------------------------------------- Back button function
    document.getElementById("back-button").addEventListener("click", async function backButton() {
        backToHomepage(1);

        //Hide projects
        document.getElementById("project-container").style.pointerEvents = "none";
        document.getElementById("project-container").style.opacity = "0%";

        // Make page unscrollable
        window.scrollTo(0,0);
        document.getElementsByTagName('body')[0].style.overflowY = "hidden";

        // Hide project container
        document.getElementById("project-border").style.opacity = "100%";
        let delayer = await delay(1000);
        document.getElementById("project-container").style.height = "0.1vh";
        document.getElementById("project-container").style.width = "0.1vw";
        document.getElementById("project-container").style.top = "50vh"; 

        document.getElementById("project-border").style.height = "0.1vh";
        document.getElementById("project-border").style.width = "0.1vw";
        document.getElementById("project-border").style.top = "50vh";
        document.getElementById("project-border").style.borderRadius = "30px";
        
        document.getElementById("myproject").style.visibility = "hidden";
        
        // Remove projects
        removeProjects();

        // Remove back buttom function on click to prevent function overlaps
        document.getElementById("back-button").removeEventListener("click", backButton);
    })
})

//---------------------------------------------------------------------------------------- Show/Hide projects
async function showProjects() {
    let delayer;


    document.getElementById("myproject").style.visibility = "visible";

    document.getElementById("project-container").style.height = "87vh";
    document.getElementById("project-container").style.width = "95vw";
    document.getElementById("project-container").style.top = "5vh";

    document.getElementById("project-border").style.opacity = "100%";
    document.getElementById("project-border").style.height = "87vh";
    document.getElementById("project-border").style.width = "95vw";
    document.getElementById("project-border").style.top = "5vh";
    document.getElementById("project-border").style.borderRadius = "30px";

    document.getElementById("project-container").style.pointerEvents = "auto";

    if (!isMobile()) {
        delayer = await delay(800);
        document.getElementById("project-container").style.opacity = "100%";
        document.getElementById("project-border").style.opacity = "0%";
    } else {
        document.getElementById("project-container").style.opacity = "100%";
    }
    
}



//---------------------------------------------------------------------------------------- Loading projects from data repository
let projectsNumber = 5; // Set when you add a project in https://github.com/JiayuanWen/projects
async function loadProjects() {
    
    let projI = 1;
    // Project images and descriptions hosted on https://github.com/JiayuanWen/projects
    let filePath = `https://raw.githubusercontent.com/JiayuanWen/projects/main/projects/proj${projI}/display.html`;
    let projTotal = projectsNumber;

    let projDiv;

    for (let i = 1; i <= projTotal; i++) {
        projI = i;
        // Project images and descriptions hosted on https://github.com/JiayuanWen/projects
        filePath = `https://raw.githubusercontent.com/JiayuanWen/projects/main/projects/proj${projI}/display.html`;

        // Create project element
        projDiv = document.createElement('div');
        projDiv.setAttribute('id',`project-${projI}`);

        // Insert project element to container
        document.getElementById("project-container").insertAdjacentHTML('beforeend',projDiv.outerHTML);

        // Load project from https://github.com/JiayuanWen/JiayuanWen.github.io.data
        $(`#project-${projI}`).load(filePath);
    }
}

//---------------------------------------------------------------------------------------- Remove projects from page
async function removeProjects() {
    let projI = 1;
    let projTotal = projectsNumber;

    for (let i = 1; i <= projTotal; i++) {
        projI = i;
        document.getElementById(`project-${projI}`).outerHTML = "";
    }
}

//---------------------------------------------------------------------------------------- Mobile layout
if (isMobile()) {
    // Initially check user's device orientation, change stylesheet accordingly
    var device_orientation = getDeviceOrientation(false);

    if (device_orientation == "portrait") {
        toggleMobileLayout_MyProjects(true);
    }
    else {
        toggleMobileLayout_MyProjects(false);
    };

    // Continue to listen for user's device orientation, change stylesheet accordingly
    window.addEventListener('orientationchange', () => {
        var device_orientation = getDeviceOrientation(false);

        if (device_orientation == "portrait") {
            toggleMobileLayout_MyProjects(true);
        }
        else {
            toggleMobileLayout_MyProjects(false);
        };
    });
}

function toggleMobileLayout_MyProjects(mode_) {
    if (mode_ == true) {
        document.getElementById("myproject-style").setAttribute("href", "style/myproject-mobile.css");
    }
    else {
        document.getElementById("myproject-style").setAttribute("href", "style/myproject.css");
    }
}