// Dedicated CLASS for PLINKOS !!
class Plinko {
    constructor(x, y) {
        var options = {
            isStatic: true,
            restitution: 0.8,
            friction: 0
        }
        this.r = 10;
        this.plinko = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("Assets/plinko.png");
        this.color = color(random(0, 255), random(0, 255), random(0, 255));
        World.add(world, this.plinko);
    }
    show() {
        var pos = this.plinko.position;
        push();
        if (this.image) {
            imageMode(CENTER);
            image(this.image, pos.x, pos.y, this.r * 2, this.r * 2);
        } else {
            ellipseMode(CENTER);
            noStroke();
            fill(this.color);
            ellipse(pos.x, pos.y, this.r * 2);
        }
        pop();
    }
}