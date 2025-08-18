const tela = document.getElementById("jogoTela");
const ctx = tela.getContext("2d");

tela.width = 1200;
tela.height = 500;

let velocidade = 4;
let bolaTamanho = 10;
let x = tela.width / 2;
let y = tela.height - 30;
let dx = velocidade;
let dy = -velocidade;

const vidas = [3]
const fase = [1]
const pontos = [0]
const recorde = [Number(localStorage.getItem("recorde") ) || 0]

let barraAltura = 15;
let barraLargura = 110;
let barraX = (tela.width - barraLargura) / 2;

let setaDireita = false;
let setaEsquerda = false;

let blocoLinhas = 5;
let blocoColunas = 10;
let blocoLargura = 80;
let blocoAltura = 25;
let blocoPadding = 30;
let topoMargem = 10;
let esquerdaMargem = 30;

document.addEventListener("keydown", teclaPressionadaHandler);
document.addEventListener("keyup", teclaSoltaHandler);

function teclaPressionadaHandler(e) {
    if (e.key === "ArrowRight") {
        setaDireita = true;
    } else if (e.key === "ArrowLeft") {
        setaEsquerda = true;
    }
}

function teclaSoltaHandler(e) {
    if (e.key === "ArrowRight") {
        setaDireita = false;
    } else if (e.key === "ArrowLeft") {
        setaEsquerda = false;
    }
}

function reposicionarBola() {
    x = tela.width / 2;
    y = tela.height - 30;
    dx = velocidade;
    dy = -velocidade;
    setaDireita = false;
    setaEsquerda = false;
    barraX = (tela.width - barraLargura) / 2;
}

function gerarCorAleatoria() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

let blocos = [];
for (let i = 0; i < blocoColunas; i++) {
    blocos[i] = [];
    for (let j = 0; j < blocoLinhas; j++) {
        blocos[i][j] = {
            x: 0,
            y: 0,
            status: 1,
            cor: gerarCorAleatoria()
        };
    }
}

document.getElementById("recordeValor").innerText = recorde[0];

function colisaoBlocos() {
    checarProximaFase();
    for (let i = 0; i < blocoColunas; i++) {
        for (let j = 0; j < blocoLinhas; j++) {
            let bloco = blocos[i][j];
            if (bloco.status === 1) {
                if (x > bloco.x && x < bloco.x + blocoLargura && y > bloco.y && y < bloco.y + blocoAltura) {
                    dy = -dy;
                    bloco.status = 0;
                    pontos[0]++;
                    document.getElementById("pontosValor").innerText = pontos[0];
                    if (pontos[0] > recorde[0]) {
                        recorde[0] = pontos[0];
                        localStorage.setItem("recorde", recorde[0]);
                        document.getElementById("recordeValor").innerText = recorde[0];
                    }
                }
            }
        }
    }
}

function verificarRecorde() {
    const recordeSalvo = [Number(localStorage.getItem("recorde"))]//A função não tentará criar uma nova constante chamada Recordesalvo quando for chamada,
    //Pois a "Variável" é uma variável local, e só é criada quando a função é chamada.
    if (!recordeSalvo[0]) {
        recordeSalvo[0] = 0;
        localStorage.setItem("recorde", recordeSalvo[0]);
    }
    if (pontos[0] > recordeSalvo[0]) {
        localStorage.setItem("recorde", pontos[0]);
        recordeSalvo[0] = pontos[0];
        document.getElementById("recordeValor").innerText = recordeSalvo[0];
        console.log("Novo recorde! Record: " + recordeSalvo[0]);
    }
}

window.onload = function() {
    const recordeSalvo = [Number(localStorage.getItem("recorde")) || 0];
    if (recordeSalvo) {
        document.getElementById("recordeValor").innerText = recordeSalvo[0];
    }
};

function checarProximaFase() {
    let todosBlocosDestruidos = true;
    for (let i = 0; i < blocoColunas; i++) {
        for (let j = 0; j < blocoLinhas; j++) {
            if (blocos[i][j].status === 1) {
                todosBlocosDestruidos = false;
                break;
            }
        }
    }
    if (todosBlocosDestruidos) {
        alert("Parabéns! Próxima fase!");
        fase[0]++;
        document.getElementById("faseValor").innerText = fase[0];
        blocos = [];
        reposicionarBola()
        draw();
    }
}

function drawBola() {
    ctx.beginPath();
    ctx.arc(x, y, bolaTamanho, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBarra() {
    ctx.beginPath();
    ctx.roundRect(barraX, tela.height - barraAltura, barraLargura, barraAltura, 5);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBlocos() {
    for (let i = 0; i < blocoColunas; i++) {
        for (let j = 0; j < blocoLinhas; j++) {
            if (blocos[i][j].status === 1) {
                let blocoX = i * (blocoLargura + blocoPadding) + esquerdaMargem;
                let blocoY = j * (blocoAltura + blocoPadding) + topoMargem;
                blocos[i][j].x = blocoX;
                blocos[i][j].y = blocoY;
                ctx.beginPath();
                ctx.roundRect(blocoX, blocoY, blocoLargura, blocoAltura, 5);
                ctx.fillStyle = blocos[i][j].cor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, tela.width, tela.height);
    drawBlocos();
    drawBola();
    drawBarra();
    colisaoBlocos();
    x += dx;
    y += dy;
    if (x + dx > tela.width - bolaTamanho || x + dx < bolaTamanho) {
        velocidade = 4;
        dx = -dx;
    }
    if (y + dy < bolaTamanho) {
        velocidade = 4;
        dy = -dy;
    }
    else if (y + dy > tela.height - bolaTamanho + 2) {
        if (vidas[0] == 0){
            alert("Fim do jogo! Suas vidas acabaram.");
            alert("Pressione qualquer tecla para jogar novamente.");
            document.location.reload();
        }
        if (x > barraX + 2 && x < barraX + barraLargura + 2) {
            dy = -dy;
            if(setaDireita === true){
                dx = Math.abs(dx)+1; 
            }
            if(setaEsquerda === true){
                dx = -Math.abs(dx)-1;
            }
        } else {
            vidas[0]--;
            document.getElementById("vidasValor").innerText = vidas[0];
            if (vidas[0] > 0) {
                alert("Você perdeu uma vida! Vidas restantes: " + vidas[0]);
                reposicionarBola();
            }
        }
    }
    if (setaDireita && barraX < tela.width - barraLargura) {
        barraX += 10;
    } else if (setaEsquerda && barraX > 0) {
        barraX -= 10;
    }
    requestAnimationFrame(draw);
}

draw();
