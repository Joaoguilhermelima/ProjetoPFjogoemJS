const tela = document.getElementById("jogoTela");
const ctx = tela.getContext("2d");

tela.width = 1200;
tela.height = 500;

//constantes relacionadas à bola
const velocidade = [4]
const bolaTamanho = [10]
const x = [(tela.width / 2)]
const y = [(tela.height - 30)]
const dx = [(velocidade[0])]//representa a velocidade no eixo X, ou seja, velocidade na horizontal.
const dy = [-(velocidade[0])]//representa a velocidade no eixo X, ou seja, velocidade na vertical.

//informações que o jogador precisa saber:
const vidas = [3] //quantidade de vidas que o jogador tem.
const fase = [1] //fase em que o jogador está.
const pontos = [0] //quantidade de pontos que o jogador possui.
const recorde = [Number(localStorage.getItem("recorde") ) || 0] //procura se já tinha algo salvo na página com o nome recorde.

//partes que estão relacionadas com a barra controlada palo jogador
const barraAltura = [15]
const barraLargura = [110]
const barraX = [(tela.width - barraLargura[0]) / 2]//valor que está relacionado com a posição do jogador

//setas que o jogador usará para controlar a barra
const setaDireita = [false]
const setaEsquerda = [false]

//é aqui que o diabo se mostra
let blocoLinhas = 5;
let blocoColunas = 10;
let blocoLargura = 80;
let blocoAltura = 25;
let blocoPadding = 30;
let topoMargem = 10;
let esquerdaMargem = 30;


const teclaPressionadaHandler = (e) => {
    if (e.key === "ArrowRight") {
        setaDireita[0] = true;
    } else if (e.key === "ArrowLeft") {
        setaEsquerda[0] = true;
    }
}

const teclaSoltaHandler = (e) => {
    if (e.key === "ArrowRight") {
        setaDireita[0] = false;
    } else if (e.key === "ArrowLeft") {
        setaEsquerda[0] = false;
    }
}
//tive que mudar a ordem, antes o comando doxument vinha primeiro que as funções de alta ordem que estão ligadas as setas
//isso causava um problema gigante, pois as constantes ainda não existiam.
document.addEventListener("keydown", teclaPressionadaHandler);
document.addEventListener("keyup", teclaSoltaHandler);

//inovação que nós fizemos ao código, antes não tinha nenhum som.
//está funcionando perfeitamente, em time que está ganhando não se mexe.
//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//não mexe mais
const tocaraudio = () =>{
    const audio = new Audio ("itens/win.mp3")
    audio.play()
}

//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//não mexe mais
const reposicionarBola = () => {
    x[0] = tela.width / 2;
    y[0] = tela.height - 30;
    dx[0] = velocidade[0];
    dy[0] = -(velocidade[0]);
    setaDireita[0] = false;
    setaEsquerda[0] = false;
    barraX[0] = (tela.width - barraLargura[0]) / 2;
}
//função que gera uma cor aleatória (é usada para criar uma cor para os retângulos que devem ser destruidos).
//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//não mexe mais
const gerarCorAleatoria = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

//é aqui que a porca torce o rabo
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

//é aqui que a porca torce o rabo
function colisaoBlocos() {
    checarProximaFase(blocos);
    for (let i = 0; i < blocoColunas; i++) {
        for (let j = 0; j < blocoLinhas; j++) {
            let bloco = blocos[i][j];
            if (bloco.status === 1) {
                if (x[0] > bloco.x && x[0] < bloco.x + blocoLargura && y[0] > bloco.y && y[0] < bloco.y + blocoAltura) {
                    dy[0] = -dy[0];
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

//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//função para verificar se havia algum recorde anterior registrado nessa máquina.
//não mexe mais
const verificarRecorde = () => {
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
//não mexe mais
window.onload = function() {
    const recordeSalvo = [Number(localStorage.getItem("recorde")) || 0];
    if (recordeSalvo) {
        document.getElementById("recordeValor").innerText = recordeSalvo[0];
    }
};

//função para verificar se todos os blocos foram construídos, se sim, a próxima fase se inicia, se não, não inicia
//ela foi refeita do código anterior, porém, seguindo o paradigma funcional e usando notação arrow
const checarProximaFase = (blocos) => {
    const todosBlocosDestruidos = blocos.flat().every(bloco => bloco.status !== 1)
    return todosBlocosDestruidos
}

//função feita para criar blocos e garantir que o loop do jogo seja feito de forma certa, criando blocos
const criarBlocos = (colunas, linhas) => 
    Array.from({ length: colunas }, () => 
        Array.from({ length: linhas }, () => ({
            x: 0,
            y: 0,
            status: 1,
            cor: gerarCorAleatoria()
        }))
    );

    const avancarFase = (faseAtual, blocosAtuais) => ({//função para avançar de fase
    novaFase: faseAtual + 1,
    novosBlocos: criarBlocos(blocoColunas, blocoLinhas)
});

//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//não mexe mais
const drawBola = () => {
    ctx.beginPath();
    ctx.arc(x[0], y[0], bolaTamanho[0], 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//não mexe mais
const drawBarra = () => {
    ctx.beginPath();
    ctx.roundRect(barraX[0], tela.height - barraAltura[0], barraLargura[0], barraAltura[0], 5);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//é aqui que a porca torce o rabo
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

//é aqui que a porca torce o rabo
function draw() {
    ctx.clearRect(0, 0, tela.width, tela.height);
    drawBlocos();
    drawBola();
    drawBarra();
    colisaoBlocos();
    x[0] += dx[0];
    y[0] += dy[0];
    if (x[0] + dx[0] > tela.width - bolaTamanho[0] || x[0] + dx[0] < bolaTamanho[0]) {
        velocidade[0] = 4;
        dx[0] = -dx[0];
    }
    if (y[0] + dy[0] < bolaTamanho[0]) {
        velocidade[0] = 4;
        dy[0] = -dy[0];
    }
    else if (y[0] + dy[0] > tela.height - bolaTamanho[0] + 2) {
        if (vidas[0] == 0){//parte modificada e está funcionando. Se está funcionando, não se mexe.
            alert("Fim do jogo! Suas vidas acabaram.");
            alert("Pressione qualquer tecla para jogar novamente.");
            document.location.reload();
        }
        if (x[0] > barraX[0] + 2 && x[0] < barraX[0] + barraLargura[0] + 2) {
            dy[0] = -dy[0];
            if(setaDireita[0] === true){
                dx[0] = Math.abs(dx[0])+1; 
            }
            if(setaEsquerda[0] === true){
                dx[0] = -Math.abs(dx[0])-1;
            }
        } else {//parte modificada e está funcionando.
            vidas[0]--;
            document.getElementById("vidasValor").innerText = vidas[0];
            if (vidas[0] > 0) {
                alert("Você perdeu uma vida! Vidas restantes: " + vidas[0]);
                reposicionarBola();
            }
        }
    if (checarProximaFase(blocos)) {//parte modificada do código anterior refeita de forma funcional e usando notação arrow
        //com essa função, o loop do jogo segue de forma correta
        fase[0]++;
        document.getElementById("faseValor").innerText = fase[0]
        blocos = criarBlocos(blocoColunas, blocoLinhas)
        reposicionarBola()
    }
    }
    if (setaDireita[0] && barraX[0] < tela.width - barraLargura[0]) {
        barraX[0] += 10;
    } else if (setaEsquerda[0] && barraX[0] > 0) {
        barraX[0] -= 10;
    }
    requestAnimationFrame(draw);
}

draw();