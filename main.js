const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

//controls

let gobal_radius = 3;

class Particle {
  constructor(radius, color) {
    this.xSpeed = Math.random() * 3 - 1.5; // Random horizontal speed between -1.5 and 1.5
    this.ySpeed = Math.random() * 3 - 1.5; // Random vertical speed between -1.5 and 1.5
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius =  radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.ySpeed = -this.ySpeed;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.draw();
  }

  animate() {
    this.update();
  }
}

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

const draw_stroke = (x1, y1, x2, y2) => {
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = 0.5; // Adjust the line width as needed
  ctx.stroke();
};

// Distance between two points
document.addEventListener("DOMContentLoaded", () => {
  let density = 100;
  const particles = [];

  for (let i = 0; i < density; i++) {
    const particle = new Particle(gobal_radius, getRandomColor());
    particles.push(particle);
  }

  const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const particleA = particles[i];
      particleA.animate();

      for (let j = i + 1; j < particles.length; j++) {
        const particleB = particles[j];
        const d = distance(particleA.x, particleA.y, particleB.x, particleB.y);

        // Adjust this threshold based on when you want the strokes to appear
        if (d < 100) {
          draw_stroke(particleA.x, particleA.y, particleB.x, particleB.y);
        }
      }
    }

    requestAnimationFrame(animation);
  };

  animation();
});

// Random color generator using HSL values
const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 100) + "%";
  const lightness = Math.floor(Math.random() * 100) + "%";

  return `hsl(${hue}, ${saturation}, ${lightness})`;
};
