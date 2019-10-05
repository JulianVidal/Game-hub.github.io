window.onload = () => {
    // Moves the canvas to the div for formatting
    const canvas = document.getElementById("defaultCanvas0");
    const canvasDiv = document.getElementById("canvas");
    canvasDiv.appendChild(canvas);
};

// Adds force text boxes
function addForce() {
    const magnitude = document.createElement("input");
    const angle = document.createElement("input");

    magnitude.setAttribute("type", "number");
    angle.setAttribute("type", "number");

    magnitude.setAttribute("class", "magnitude");
    angle.setAttribute("class", "angle");

    magnitude.setAttribute("value", "0");
    angle.setAttribute("value", "0");

    const forceDiv = document.createElement("div");
    forceDiv.setAttribute("class", "force");

    const inputDiv = document.getElementById("input-div");

    inputDiv.appendChild(forceDiv);

    forceDiv.appendChild(magnitude);
    forceDiv.appendChild(angle);

}

// Button listener
function applyForce() {
    apply = !apply;
}

// Listeners for every drawn arrow

function netForce() {
    netForceB = !netForceB;
    if (netForceB) {
        document.getElementById("red").style.backgroundColor = "rgb(255, 0, 0)";
    } else {
        document.getElementById("red").style.backgroundColor = "rgb(100, 0, 0)";
    }
}

function contactForce() {
    contactForceB = !contactForceB;
    if (contactForceB) {
        document.getElementById("blue").style.backgroundColor = "rgb(0, 0, 255)";
    } else {
        document.getElementById("blue").style.backgroundColor =  "rgb(0, 0, 100)";
    }
}

function forcesAdded() {
    forcesAddedB = !forcesAddedB;
    if (forcesAddedB) {
        document.getElementById("white").style.backgroundColor =  "rgb(255, 255, 255)";
    } else {
        document.getElementById("white").style.backgroundColor =  "rgb(100, 100, 100)";
    }
}

function resolveForce() {
    resolvedNetForceB = !resolvedNetForceB;
    if (resolvedNetForceB) {
        document.getElementById("green").style.backgroundColor = "rgb(0, 255, 0)";
    } else {
        document.getElementById("green").style.backgroundColor = "rgb(0, 100, 0)";
    }
}