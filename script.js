let currentColor = 'back';
let canDrow = false;
let mouseX = 0;
let mouseY = 0;
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');


document.querySelectorAll('.colorArea .color').forEach(item =>{
    item.addEventListener('click', colorClickEvent)
});

screen.addEventListener('mousedown', mouseDownEvent);//A propriedade screen em JavaScript é usada para obter informações sobre a tela do dispositivo em que o código está sendo executado, como a largura, altura e densidade de pixels.
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

/*PASSO A PASSO PARA DESENHAR NO CANVAS

-QUANDO O CLICK DO MOLSE ABAXIAR, ACTIVE O MODO DESENHO.
-QUANDO O MOLSE SE MOVER, SE O MODO DESENHO ESTIVER ATIVADO DESENHE.
-QUANDO O CLICK DO MOUSE LEVANTAR, DESATIVE O MODO DESENHO.


*/

// TROCANDO A CLASSE ACTIVE DE ELEMENTO.
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');//RETIRANDO A CLASSE ACTIVE DE UMA DIV PARA COLOCAR EM UMA QUE EU CLICK
    e.target.classList.add('active');/*AQUI EU ESTOU ADICIONANDO A CLASSE active.
    O target pode ser usado para obter o elemento que gerou o evento, bem como suas propriedades e atributos.*/
}

function mouseDownEvent (e){
    canDrow = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offSetTop;
}

function mouseMoveEvent(e) {//e.pageX = POSIÇÃO HORIZONTAL DO MOLSE, e.pageY = POSIÇÃO VERTICAL DO MOLSE.
    if(canDrow) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
   canDrow = false;
}


function draw (x, y) {
    let pointX = x- screen.offsetLeft;
    let ponintY = y - screen.offsetTop;


    //DESENHAR

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, ponintY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();


    mouseX = pointX;
    mouseY = ponintY;
}


function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
}