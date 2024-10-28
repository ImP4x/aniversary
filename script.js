function PlayAudio() {
  var audio = document.getElementById("fnd");
  audio.volume = 0.4;
  audio.play();
}
var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay:true,
        loop:true,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      });


var canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");

var ww,wh;

function onResize(){
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
}

ctx.strokeStyle = "red";
ctx.shadowBlur = 25;
ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";

var precision = 100;
var hearts = [];
var mouseMoved = false;

function onMove(e) {
  mouseMoved = true;
  let x, y;

  if (e.type === "touchmove") {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
  } else {
      x = e.clientX;
      y = e.clientY;
  }

  // Generar corazones en la posición correcta del mouse
  hearts.push(new Heart(x, y));
  hearts.push(new Heart(x, y));
}

document.addEventListener("DOMContentLoaded", function() {
  const textElement = document.querySelector('.text');
  const messages = [
    { text: "<span>Feliz <br/> </span>Primer mes mi niña! <br/> </span>28-09-2024", top: "300px" },
    { text: "Feliz aniversario mi princesa, cuenta conmigo para todo, disfruta tu día, te amo mucho!!.", top: "280px" },
    { text: "Cada día a tu lado es un regalo.", top: "310px" },
    { text: "Siempre estaré aquí para ti.", top: "310px" },
    { text: "Te amo más de lo que las palabras pueden decir.", top: "310px" },
    { text: "Eres la razón por la que sonrío cada día.", top: "310px" },
    { text: "Te amo con todo mi corazón.", top: "315px" },
    { text: "Eres mi inspiración, mi alegría y mi amor eterno.", top: "310px" },
    { text: "Contigo, cada día es un nuevo capítulo de felicidad.", top: "310px" },
    { text: "No hay nada que desee más que verte feliz. Eres mi todo.", top: "310px" },
    { text: "Eres el sueño que nunca quiero despertar. Te amo.", top: "310px" },
    { text: "Eres la razón por la que creo en el amor verdadero.", top: "310px" },
    { text: "Tus ojitos brillan como estrellas y tu esencia es pura magia. Eres la mujer más hermosa que he conocido.", top: "275px" },
    { text: "Enserio estoy muy enamorado de ti🥹", top: "310px" },
    { text: "Eres la belleza personificada; cada vez que te miro, me doy cuenta de lo afortunado que soy de tenerte en mi vida.", top: "275px" },
    { text: "El amor que siento por ti crece más cada día.", top: "310px" },
    { text: "Tú y yo somos un hermoso equipo, juntos podemos lograr todo.", top: "300px" },
    { text: "Eres la mejor parte de mi vida, siempre lo serás.", top: "310px" },
    { text: "Gracias por ser la persona increíble que eres. Te amo.", top: "310px" }
  ];
  let currentIndex = 0;

  textElement.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % messages.length;
      textElement.innerHTML = messages[currentIndex].text;
      textElement.style.top = messages[currentIndex].top; // Ajustar posición

      // Aplicar animación
      textElement.classList.remove('fade-in');
      void textElement.offsetWidth; // Forzar el reflow
      textElement.classList.add('fade-in');
  });
});



var Heart = function(x,y){
  this.x = x || Math.random()*ww;
  this.y = y || Math.random()*wh;
  this.size = Math.random()*2 + 1;
  this.shadowBlur = Math.random() * 10;
  this.speedX = (Math.random()+0.2-0.6) * 8;
  this.speedY = (Math.random()+0.2-0.6) * 8;
  this.speedSize = Math.random()*0.05 + 0.01;
  this.opacity = 1;
  this.vertices = [];
  for (var i = 0; i < precision; i++) {
    var step = (i / precision - 0.5) * (Math.PI * 2);
    var vector = {
      x : (15 * Math.pow(Math.sin(step), 3)),
      y : -(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step)) 
    }
    this.vertices.push(vector);
  }
}

Heart.prototype.draw = function(){
  this.size -= this.speedSize;
  this.x += this.speedX;
  this.y += this.speedY;
  ctx.save();
  ctx.translate(-1000,this.y);
  ctx.scale(this.size, this.size);
  ctx.beginPath();
  for (var i = 0; i < precision; i++) {
    var vector = this.vertices[i];
    ctx.lineTo(vector.x, vector.y);
  }
  ctx.globalAlpha = this.size;
  ctx.shadowBlur = Math.round((3 - this.size) * 10);
  ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
  ctx.shadowOffsetX = this.x + 1000;
  ctx.globalCompositeOperation = "screen"
  ctx.closePath();
  ctx.fill()
  ctx.restore();
};


function render(a){
  requestAnimationFrame(render);
  
  hearts.push(new Heart())
  ctx.clearRect(0,0,ww,wh);
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    if(hearts[i].size <= 0){
      hearts.splice(i,1);
      i--;
    }
  }
}



onResize();
window.addEventListener("mousemove", onMove);
window.addEventListener("touchmove", onMove);
window.addEventListener("resize", onResize);
requestAnimationFrame(render);