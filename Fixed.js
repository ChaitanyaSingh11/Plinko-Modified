// Dedicated PARENT CLASS for fixed rectangular bodies in the game
class Fixed {
    constructor(x, y, w, h, image) {
        var options = {
            isStatic: true,
            friction: 0,
            chamfer: {
                radius: 20
            }
        };
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;

        this.image = image;
        World.add(world, this.body);
    }
    show() {
        var pos = this.body.position;

        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.w, this.h);
        pop();
    }
}