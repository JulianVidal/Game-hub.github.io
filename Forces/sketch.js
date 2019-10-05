// Checks if the button Apply force has been pressed
let apply;

// All the forces that will be applied
const forces = [];

// The position of the particle
const particle = {
    x: 0,
    y: 0,
    add: (part, vel) => {
        part.x += vel.x;
        part.y += vel.y;
        console.log(part.x, part.y)
    }
};

// The velocity of the particle
const particleVelocity = {
    x: 0,
    y: 0
};

// Holds the value if the forces should be drawn
let netForceB = true;
let contactForceB = true;
let forcesAddedB = true;
let resolvedNetForceB = true;

function setup() {
    // Creates the canvas on the page
    createCanvas(500, 500);

    // Sets the position of the particle to the middle of the screen
    particle.x = width / 2;
    particle.y = height / 2;

    // Thickness of lines
    strokeWeight(2);
}

function draw() {
    // Black background color
    background('#000');

    // Gets the forces from the page
    getForces();

    // Goes through each force added
    for (let force of forces) {

        // Draws every force
        if (forcesAddedB) {
            force.draw(particle, true, color(255));
        }

        // Adds all forces to the particle velocity and position
        if (apply) {

            // Adds force to velocity
            force.enact(particleVelocity);

            // Adds velocity to displacement
            particle.add(particle, particleVelocity);

        }
    }

    // Draws Net Force
    if (netForceB) {

        // Adds all forces to netForce
        let netForce = forces[0];

        for (let i = 1; i < forces.length; i++) {
            netForce = Vector.add(netForce, forces[i]);
        }

        netForce.draw(particle, true, color(255, 0, 0));
    }

    // Draw the particle
    noStroke();
    fill('#FFF');
    circle(particle.x, particle.y, 10);
}

// Turn radians to degrees
function degrees(angle) {
    return angle / (Math.PI / 180);
}

// Gets forces from the website
function getForces() {
    const magnitudesEl = document.getElementsByClassName("magnitude");
    const anglesEl = document.getElementsByClassName("angle");

    const magnitudes = [];
    const angles = [];


    for (let i = 0; i < magnitudesEl.length; i++) {

        magnitudes[i] = parseFloat(magnitudesEl[i].value);
        angles[i] = parseFloat(anglesEl[i].value);
    }

    for (let i = 0; i < magnitudes.length; i++) {
        const magnitude = magnitudes[i];
        const angle = angles[i];

        forces[i] = new Vector(magnitude, angle);
    }

}