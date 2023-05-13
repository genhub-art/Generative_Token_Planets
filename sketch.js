class Orbiter {
  constructor(color, rad, orbitAlt, orbitAngle = 0, orbitAngleMod = 1) {
    console.log("here", color)
    this.color=color;
    this.orbitAngle = orbitAngle;
    this.orbitAngleMod = orbitAngleMod;
    this.rad = rad;
    this.orbitAlt = orbitAlt;
    this.x = this.orbitAlt * Math.cos(orbitAngle);
    this.y = this.orbitAlt * Math.sin(orbitAngle);
  }

  orbit(object) {
    this.x = object.x + this.orbitAlt * Math.cos(radians(this.orbitAngle));
    this.y = object.y + this.orbitAlt * Math.sin(radians(this.orbitAngle));
    this.orbitAngle = (this.orbitAngle + this.orbitAngleMod) % 360;
  }

  display() {
    noStroke();
    fill(this.color.replace(' ', ''));
    ellipse(this.x, this.y, this.rad, this.rad);
  }
}

const color_palette = ['Indian Red', 'Light Coral', 'Light Salmon', 'Brown', "Green", 'Dark Orange', 'Tomato', 'Sandy Brown', 'Green Yellow', 'Powder Blue', 'Cornflower Blue', 'Black'];
const sun = new Orbiter("yellow", 100, 0);
const n = Math.floor(randm(3,10))
const planets = Array(n).fill(0).map((_, i) => {return new Orbiter(color_palette[Math.floor(randm(0, color_palette.length))], 10 + i * 5 + randm(-5, 25), 125 + i * 50, i*30, randm(-4,4) || 3)})

function randm(min, max) {
  return Math.floor(rand() * (max - min) + min);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  window.metadata=() => {return {
    name: `Solar System #${token_id}`,
    description: `A randomly generated solar system with ${n} planets: ${planets.map(p => `${p.color.startsWith } ${p.color.toLowerCase()} planet with a radius of ${p.rad}`).join(', ')}.`,
    image: canvas.toDataURL("image/png"),
    attributes: 
      [{trait_type: 'Number of Planets', value: n}].concat(
      planets.map((p, i) => {return {trait_type: `Planet ${i} Color`, value: p.color}})
      .concat(planets.map((p,i) => {return {trait_type: `Planet ${i} Radius`, value: p.rad}}))),
    properties: {
      "Number of Planets": n,
      ...planets.reduce((acc, p, i) => {
        acc[`Planet ${i} Color`] = p.color;
        acc[`Planet ${i} Radius`] = p.rad;
        return acc;
      }, {})
    }

  }}
  console.log(seed, metadata())
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(min(width, height)/1000)
  
  sun.display();
  for (let i = 0; i < n; i++) {
    planets[i].orbit(sun);
    planets[i].display();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

