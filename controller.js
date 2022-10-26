//when setting up controllers:

//x and y determines the starting position of the controller
//boxX and boxY determines the posistion of the quadrant or line
//size is the size of the controller
//boxSize is the size of the quandrant or line
//name is the name of the controller that it's being displayed at the bottom

class ControllerQuad {
  constructor(x, y, boxX, boxY, size, boxSize, name = "") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.boxX = boxX;
    this.boxY = boxY;
    this.boxSize = boxSize;
    this.locked = false;
    this.name = name;
  }

  display() {
    //base
    stroke(0);
    strokeWeight(3);

    //base-down
    fill(0);
    rectMode(CENTER);
    rect(
      this.boxX,
      this.boxY + this.boxSize / 4,
      this.boxSize,
      this.boxSize,
      this.size / 2
    );

    //base-up
    fill(255);
    rect(this.boxX, this.boxY, this.boxSize, this.boxSize, this.size / 2);

    //joystick

    strokeWeight(15);
    stroke(0);
    line(this.boxX, this.boxY, this.x, this.y);
    strokeWeight(12);
    stroke(0, 0, 255);
    line(this.boxX, this.boxY, this.x, this.y);

    //title
    noStroke();
    fill(255);
    textSize(this.boxSize / 6);
    textAlign(CENTER, TOP);
    text(
      this.name,
      this.boxX,
      this.boxY + this.boxSize / 2 + this.boxSize / 24
    );

    //ball
    fill(0);
    circle(this.x, this.y, this.size);
  }

  //determines mouse over
  mouseOver() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (d < this.size / 2) {
      return true;
    } else {
      return false;
    }
  }

  //grabbing functionality
  grab() {
    //locked variable makes sure that the controller is still being pulled while the mouse leave the circle area
    if (this.mouseOver() && mouseIsPressed) {
      this.locked = true;
    }

    if (mouseIsPressed === false && this.locked === true) {
      this.locked = !this.locked;
    }

    if (this.locked) {
      this.x = constrain(
        mouseX,
        this.boxX - this.boxSize / 2,
        this.boxX + this.boxSize / 2
      );
      this.y = constrain(
        mouseY,
        this.boxY - this.boxSize / 2,
        this.boxY + this.boxSize / 2
      );
    } else {
      this.x = this.x;
      this.y = this.y;
    }
  }
}

class ControllerSlider {
  constructor(x, y, boxX, boxY, size, boxSize, name) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.boxX = boxX;
    this.boxY = boxY;
    this.boxSize = boxSize;
    this.locked = false;
    this.name = name;
  }
  display() {
    //base
    stroke(0);
    strokeWeight(3);

    //base-down
    line(
      this.boxX - this.boxSize / 2,
      this.boxY,
      this.boxX + this.boxSize / 2,
      this.boxY
    );

    //title
    noStroke();
    fill(0);
    textSize(this.boxSize / 6);
    textAlign(CENTER, TOP);
    text(this.name, this.boxX, this.boxY + this.boxSize / 5);

    //ball
    fill(0);
    circle(this.x, this.y, this.size);
  }

  //determines mouse over
  mouseOver() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (d < this.size / 2) {
      return true;
    } else {
      return false;
    }
  }

  //grabbing functionality
  grab() {
    //locked variable makes sure that the controller is still being pulled while the mouse leave the circle area
    if (this.mouseOver() && mouseIsPressed) {
      this.locked = true;
    }

    if (mouseIsPressed === false && this.locked === true) {
      this.locked = !this.locked;
    }

    if (this.locked) {
      this.x = constrain(
        mouseX,
        this.boxX - this.boxSize / 2,
        this.boxX + this.boxSize / 2
      );
    } else {
      this.x = this.x;
      this.y = this.y;
    }
  }
}
