const tela = document.getElementById("jogoTela");
const ctx = tela.getContext("2d");

tela.width = 1200;
tela.height = 500;

const velocidade = [4]
const bolaTamanho = [10]
const x = [(tela.width / 2)]
const y = [(tela.height - 30)]
let dx = (velocidade[0]);
let dy = -(velocidade[0]);

//partes visíveis do jogo
const vidas = [3]
const fase = [1]
const pontos = [0]
const recorde = [Number(localStorage.getItem("recorde") ) || 0]

//partes que estão relacionadas com a barra controlada palo jogador
const barraAltura = [15]
const barraLargura = [110]
const barraX = [(tela.width - barraLargura[0]) / 2]//valor que está relacionado com a posição do jogador

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

//inivação que nós fizemos ao código, antes não tinha nenhum som.
//está funcionando perfeitamente, em time que está ganhando não se mexe.
function tocaraudio(){
    const audio = new Audio ("itens/impactsound.mp3")
    audio.play()
}

function reposicionarBola() {
    x[0] = tela.width / 2;
    y[0] = tela.height - 30;
    dx = velocidade[0];
    dy = -(velocidade[0]);
    setaDireita = false;
    setaEsquerda = false;
    barraX[0] = (tela.width - barraLargura[0]) / 2;
}
//função que gera uma cor aleatória (é usada para criar uma cor para os retângulos que devem ser destruidos).
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
                if (x[0] > bloco.x && x[0] < bloco.x + blocoLargura && y[0] > bloco.y && y[0] < bloco.y + blocoAltura) {
                    dy = -dy;
                    bloco.status = 0;
                    pontos[0]++;
                    tocaraudio()
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

//feito e funcionando
//função para verificar se havia algum recorde anterior registrado nessa máquina.
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

//feito e funcionando
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
    ctx.arc(x[0], y[0], bolaTamanho[0], 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBarra() {
    ctx.beginPath();
    ctx.roundRect(barraX[0], tela.height - barraAltura[0], barraLargura[0], barraAltura[0], 5);
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
    x[0] += dx;
    y[0] += dy;
    if (x[0] + dx > tela.width - bolaTamanho[0] || x[0] + dx < bolaTamanho[0]) {
        velocidade[0] = 4;
        dx = -dx;
    }
    if (y[0] + dy < bolaTamanho[0]) {
        velocidade[0] = 4;
        dy = -dy;
    }
    else if (y[0] + dy > tela.height - bolaTamanho[0] + 2) {
        if (vidas[0] == 0){//parte modificada e está funcionando. Se está funcionando, não se mexe.
            alert("Fim do jogo! Suas vidas acabaram.");
            alert("Pressione qualquer tecla para jogar novamente.");
            document.location.reload();
        }
        if (x[0] > barraX[0] + 2 && x[0] < barraX[0] + barraLargura[0] + 2) {
            dy = -dy;
            if(setaDireita === true){
                dx = Math.abs(dx)+1; 
            }
            if(setaEsquerda === true){
                dx = -Math.abs(dx)-1;
            }
        } else {//parte modificada e está funcionando.
            vidas[0]--;
            document.getElementById("vidasValor").innerText = vidas[0];
            if (vidas[0] > 0) {
                alert("Você perdeu uma vida! Vidas restantes: " + vidas[0]);
                reposicionarBola();
            }
        }
    }
    if (setaDireita && barraX[0] < tela.width - barraLargura[0]) {
        barraX[0] += 10;
    } else if (setaEsquerda && barraX[0] > 0) {
        barraX[0] -= 10;
    }
    requestAnimationFrame(draw);
}

draw();
