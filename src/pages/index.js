

function addcss(name) {
    var css = './pages/' + name + '.css';
    console.log(css)
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('href', css);
    head.appendChild(s);
}

addcss('FLowOfRoses');

fetch('../human/human.json')
.then((response) => {
return response.json();
})
.then((data) => {
 showImages(data, albom, './human/img/')
})

fetch('../human/images.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        showImages(data, elements, './img/Drawings/')
    });



const elements = document.querySelector('.draw__elements');


function showImages(data, el, href) {
    data.map((i) => {
        const img = document.createElement('img');
        img.src = href + i;
        img.onclick = function draw() {
            const el2 = document.querySelector('.drawing ');
            const elementsImage = document.getElementById('sketch');
            let myDetails = document.getElementById("draw"); 
            myDetails.classList.add('dis-active')
            myDetails.classList.remove('active')
            el2.classList.remove('dis-active')
            elementsImage.src = href + i;
            let main = document.getElementById("main");
            if (myDetails.classList.value === 'draw dis-active') {
                main.classList.add('dis-active')
                main.classList.remove('active')
            } else {
                main.classList.remove('dis-active')
                main.classList.add('active')
            }
    
        } 
        el.append(img)

    })
}

let brush = document.getElementById("brush");
brush.onclick = brush_click;

function brush_click() {
    let myDetails = document.getElementById("draw"); 
    let main = document.getElementById("main");
    if (myDetails.classList.value === 'draw dis-active') {
        main.classList.add('dis-active')
        main.classList.remove('active')
        myDetails.classList.remove('dis-active')
        myDetails.classList.add('active')
    } else {
        main.classList.remove('dis-active')
        main.classList.add('active')
        myDetails.classList.add('dis-active')
        myDetails.classList.remove('active')
    }
    currentColor = color;
    currentLineSize = lineSize;

}

let settingBtn = document.getElementById("settingBtn");
settingBtn.onclick = settingBtn_click;
let settingBtn2 = document.getElementById("settingBtn2");
settingBtn2.onclick = settingBtn_click;
function settingBtn_click() {
    let setting = document.getElementById("setting");
    if (setting.classList.value === 'setting dis-active') {
        setting.classList.remove('dis-active')
        setting.classList.add('active')
    } else {
        setting.classList.add('dis-active')
        setting.classList.remove('active')
    }
}

let plus = document.getElementById("plus");
plus.onclick = plus_click;

function plus_click() {
    let myDetails = document.getElementById("popup");
    if (myDetails.classList.value === 'popup dis-active'){
        myDetails.classList.remove('dis-active')
        myDetails.classList.add('active')
    } else {
        myDetails.classList.add('dis-active')
        myDetails.classList.remove('active')
    }
}


//canvas

const colors = [
    {
        color: '#C4C4C4',
    },
    {
        color: '#FF0000',
    },
    {
        color: '#000000',
    },
    {
        color: '#FFFFFF',
    },
    {
        color: '#7000FF',
    },
    {
        color: '#FF007A',
    },
    {
        color: '#74186B',
    },
    {
        color: '#954242',
    },
    {
        color: '#311C1C',
    },
    {
        color: '#8C1E1E',
    },
    {
        color: '#460F0F',
    },
    {
        color: '#A92E2E',
    },
]
const colorContainer = document.getElementById('colors');

 

var lineSize = 4;

function outputUpdate(vol) {
    var output = document.querySelector('#volume');
    output.value = vol;
    lineSize = vol;
}

var color = 'black';

document.getElementById('color').oninput = function() {
     color = this.value;
}

colors.forEach(function (element) {
    const button = document.createElement('button');
    button.style = 'background:' + element.color;
    button.classList.add('color');
    button.onclick = function () {
      color = element.color
    }
    colorContainer.append(button)
});

var canvas = document.getElementById('cl');
var ctx = canvas.getContext('2d');
const indicator = document.getElementById('accept');

const stop = document.getElementById('close');
const sketch = document.getElementById('sketch');



var isRec = false,
    newDraw = false,
    posX = [],
    posY = [],
    dyu = [],
    dxu = [],
    colorses=[],
    lineSizes=[]

stop.onclick = function close() {
    const elements = document.querySelector('.drawing ');
    let myDetails = document.getElementById("draw");
    myDetails.classList.remove('dis-active')
    myDetails.classList.add('active')
    elements.classList.add('dis-active')
    const canvas = document.getElementById('cl');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    posX = [],
    posY = [],
    dyu = [],
    dxu = [],
    colorses=[],
    lineSizes=[]
}
var currentColor = 'black';
var currentLineSize = 4;

canvas.onmousemove = function drawIfPressed(e) {

    var x = e.offsetX;
    var y = e.offsetY;
    var dx = e.movementX;
    var dy = e.movementY;


    if (e.buttons > 0) {
        if (isRec) return;
        clearCanvas();
        recordMousePos(e, lineSize, color);
        ctx.lineWidth = lineSize;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.moveTo(x, y);
        ctx.lineTo(x - dx, y - dy);
        ctx.stroke();
        ctx.closePath();
    }

    indicator.addEventListener("click", (e) => {
        if (!isRec) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            isRec = true;
            switchIndicator(false);
            autoDraw();
        }
    })

    canvas.onmouseup = function stopDeawing() {
        posX.push(undefined);
        posY.push(undefined);
        dxu.push(undefined);
        lineSizes.push(undefined);
        colorses.push(undefined);
    }
    function recordMousePos(pos, line, color) {
        posX.push(pos.offsetX);
        posY.push(pos.offsetY);
        dyu.push(pos.movementY);
        dxu.push(pos.movementX);
        lineSizes.push(line);
        colorses.push(color);
      }
      function drawLine(x, y, dx, dy, lineSize, color) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.lineWidth = lineSize;
        ctx.strokeStyle = color;
        ctx.stroke();
      }

    function clearCanvas(){
        if(newDraw){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            newDraw = false;
            if (sketch != null) {
                sketch.style.visibility = 'visible';
            }
        }
        ctx.beginPath();
    }

   function switchIndicator(enable){
       if(enable){
           indicator.classList.add('isWrite');
       }else{
           indicator.classList.remove('isWrite');
       }
   }
   function autoDraw() {
    var xu = posX;
    var yu = posY;
    var lineSizesCopy = [...lineSizes]; // Создайте копию массива lineSizes
    var colorsCopy = [...colorses]; // Создайте копию массива colorses
  
    var drawing = setInterval(() => {
      var currentX = xu.shift();
      var currentY = yu.shift();
      var currentDX = dxu.shift();
      var currentDY = dyu.shift();
      var currentLine = lineSizesCopy.shift(); // Используйте текущую толщину линии из копии массива
      var currentColor = colorsCopy.shift(); // Используйте текущий цвет из копии массива
      lineSizes = [];
      colorses = [];
      if (xu.length <= 0 && yu.length <= 0) {
        clearInterval(drawing);
        switchIndicator(true);
        isRec = false;
        newDraw = true;
      } else {
        if (
          currentX == undefined &&
          currentY == undefined &&
          currentDY == undefined &&
          currentDX == undefined &&
          currentLine == undefined &&
          currentColor == undefined &&
          lineSizesCopy == undefined &&
          colorsCopy == undefined
        ) {
          ctx.beginPath();
        } else {
          drawLine(currentX, currentY, currentDX, currentDY, currentLine, currentColor); // Используйте текущие значения толщины линии и цвета
        }
      }
    }, 1);
  }
}  
  



//setting
var slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slideText");

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
    console.log(slides[slideIndex-1].textContent)
    addcss(slides[slideIndex - 1].textContent)
}

//uploads


const albom = document.querySelector('.draw__elements2');
document.querySelector('.formFile').addEventListener('submit', () => {
    setTimeout(() => {
        document.querySelectorAll('iframe').forEach( item =>
            console.log(item.contentWindow.document.body.textContent),
            fetch('../human/human.json')
                .then((response) => {
              return response.json();
               })
            .then((data) => {
                 showImages(data, albom, './human/img/')
              })
        )
    }, 100)


})






