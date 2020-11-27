// various constants for the physics engine
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
// multiple arrays declared
var plinkos = [],
    divisions = [];
var particle;
// counter for clicks
var count = 5;
var score = 0;
var gameState = "drop";

// loading images for the bulb 
function preload() {
    bulbImg = loadAnimation("Assets/bulb1.png", "Assets/bulb2.png");
    bg = loadImage("Assets/bg.jpg");
    bgs = loadSound("Assets/bg.mp3");
    over = loadImage("Assets/over.png")
}

function setup() {
    createCanvas(490, 800);
    engine = Engine.create();
    world = engine.world;

    // Bg sound
    bgs.play();

    // adding plinkos using arrays
    for (var j = 1; j <= 5; j++) {
        for (var i = 15; i <= width; i += 40) {
            plinkos.push(new Plinko(i, 75 * j));
        }
        j++;
        for (var i = 35; i <= width; i += 40) {
            plinkos.push(new Plinko(i, 75 * j));
        }
    }

    // creating a base
    base = new Fixed(width / 2, 775, width, 50);
    bulb = createSprite(width / 2, 775);
    bulb.addAnimation("bulbImg", bulbImg);

    // creating edges
    leftEdge = new Fixed(2.5, height / 2, 5, height, loadImage("Assets/edge.jpg"));
    rightEdge = new Fixed(width - 2.5, height / 2, 5, height, loadImage("Assets/edge.jpg"));

    // creating divisions
    for (var i = 10; i <= width; i += 80) {
        divisions.push(div = new Divisions(i));
    }

    Engine.run(engine);
}

function draw() {
    Engine.update(engine);
    background(bg);

    // displaying elements of an array using a function
    show(plinkos);
    show(divisions);
    // displaying the particles
    if (particle != null) {
        particle.show();
        if (particle.plinko.position.y > 725) {
            if (particle.plinko.position.x < 160)
                score += 100;
            else if (particle.plinko.position.x > 180 & particle.plinko.position.x < 330)
                score += 200;
            else if (particle.plinko.position.x > 340 & particle.plinko.position.x < 490)
                score += 200;
            World.remove(world, particle.plinko);
            particle = null;
        }
    }

    // displaying the borders
    leftEdge.show();
    rightEdge.show();

    // displaying the divisions
    div.show();

    drawSprites();

    // displaying score
    textAlign(CENTER);
    fill(0);
    stroke(255);
    strokeWeight(3);
    textSize(32);
    text("Score : " + score, 120, 50);
    // displaying chances
    textSize(20);
    fill(255);
    stroke(0);
    text("Chances Left : " + count, 400, 50);
    // displaying score labels
    text("100", 50, 725);
    text("100", 130, 725);
    text("200", 210, 725);
    text("200", 290, 725);
    text("300", 370, 725);
    text("300", 450, 725);
    // gameOver State
    if (count == 0) {
        gameState = "over";
        imageMode(CENTER);
        image(over, width / 2, height / 2);
        textAlign(CENTER);
        text("Press 'R' to restart.", width / 2, height / 2 + 100);
    }
    // resetting by pressing 'R'
    if (keyDown("r") && gameState == "over") {
        count = 5;
        score = 0;
        gameState = "drop";
    }
}

// separate function to display the elements of an array
function show(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].show();
    }
}

// creating particles on releasing the mouse
function mouseReleased() {
    if (gameState == "drop") {
        if (mouseY <= 50 & (count > 0) & !particle) {
            particle = new Particle(mouseX, mouseY);
            Body.setStatic(particle.plinko, false);
            count--;
        }
    }
}