const tela = document.getElementById("jogoTela")
const ctx = tela.getContext("2d")

tela.width = 1200
tela.height = 500

//informações relacionadas à bola:

const velocidade = [4]//velocidade da bola.
const bolaTamanho = [10]//tamalho da bola.
const x = [(tela.width / 2)]//posição da bola no eixo x.
const y = [(tela.height - 30)]//posição da bola no eixo x.
const dx = [(velocidade[0])]//representa a velocidade no eixo X, ou seja, velocidade na horizontal.
const dy = [-(velocidade[0])]//representa a velocidade no eixo X, ou seja, velocidade na vertical.

//informações que o jogador precisa saber:

const vidas = [3] //quantidade de vidas que o jogador tem.
const fase = [1] //fase em que o jogador está.
const pontos = [0] //quantidade de pontos que o jogador possui.
const recorde = [Number(localStorage.getItem("recorde") ) || 0] //procura se já tinha algo salvo na página com o nome recorde, se não tiver, retorna 0.

//partes que estão relacionadas com a barra controlada palo jogador:

const barraAltura = [15]//diz a altura da barra controlada pelo jogador.
const barraLargura = [110]//diz a largura da barra controlada pelo jogador.
const barraX = [(tela.width - barraLargura[0]) / 2]//valor que está relacionado com a posição do jogador.

//setas que o jogador usará para controlar a barra:

const setaDireita = [false]//dirá se a seta para movar a direita etá pressionada ou não
const setaEsquerda = [false]//dirá se a seta para movar a esquerda etá pressionada ou não

//informações relacionadas aos blocos:

const blocoLinhas = [5]//quantidades de linhas.
const blocoColunas = [10]//quantidade de colunas.
const blocoLargura = [80]//largura dos blocos. 
const blocoAltura = [25]//açtura dos blocos.
const blocoPadding = [30]//espaçamento interno dos blocos.
const topoMargem = [10]//distancia vertival dos blocos.
const esquerdaMargem = [30]//distancia lateral entre os blocos.


const teclaPressionadaHandler = (e) => {//função que será ativada quando alguma tecla for pressionada e irá alterar o valor da tecla
    if (e.key === "ArrowRight") {
        setaDireita[0] = true
    } else if (e.key === "ArrowLeft") {
        setaEsquerda[0] = true
    }
}

const teclaSoltaHandler = (e) => {//função que será ativada quando alguma tecla for solta e irá alterar o valor da tecla
    if (e.key === "ArrowRight") {
        setaDireita[0] = false
    } else if (e.key === "ArrowLeft") {
        setaEsquerda[0] = false
    }
}


document.addEventListener("keydown", teclaPressionadaHandler)//"função" que entra em ação quando alguma tecla é pressionada, acionando a função "teclaPressionadaHandler"
document.addEventListener("keyup", teclaSoltaHandler)//"função" que entra em ação quando alguma tecla é solta, acionando a função "teclaSoltaHandler"

//função que está relacionada ao som quando se destroi um bloco:

const tocaraudio = () =>{
    const audio = new Audio ("itens/metalfalling.mp4")
    audio.play()
}

//função que irá reposicionar a bola quando o jogador perder uma vida ou passar de fase:

const reposicionarBola = () => {
    x[0] = tela.width / 2
    y[0] = tela.height - 30
    dx[0] = velocidade[0]
    dy[0] = -(velocidade[0])
    setaDireita[0] = false
    setaEsquerda[0] = false
    barraX[0] = (tela.width - barraLargura[0]) / 2
}

// Para armazenar as cores de cada linha:

const coresLinhas = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A1FF33'];
const totalDeBlocos = 50;
const blocosPorLinha = 10;

// Cria o array de 50 blocos de uma só vez com cores por linha:

const blocos50 = Array.from({ length: totalDeBlocos }, (_, indice) => {
    const indiceLinha = Math.floor(indice / blocosPorLinha);// Calcula a linha do bloco com base no seu índice.
    const cor = coresLinhas[indiceLinha];// Pega a cor correta para a linha
    return {// Retorna o objeto do bloco com a cor e status definidos
        x: 0,
        y: 0,
        status: 1,
        cor: cor
    };
});


//função recursiva para "reviver" os blocos
const reviver_blocos = (n) =>{
    if (n<0){}
    else{
        blocos50[n].status=1//aqui ele está alterando o status de todos os blocos para 1, o que fará os blocos serem desenhados novamente na tela.
        reviver_blocos(n-1)//recursividade para "reviver" os blocos.
    }
}

document.getElementById("recordeValor").innerText = recorde[0]//busca a=

const colisaoBlocosRec = (n) => {
    if (n < 0){return}
    const bloco = blocos50[n]
    if (bloco.status === 1) {
        if (x[0] > bloco.x && x[0] < bloco.x + blocoLargura[0] &&//toda essa linha de comando irá verificar se a bolinha está entre a esquerda e a direira do bloco na posição n.
            y[0] > bloco.y && y[0] < bloco.y + blocoAltura[0]) {//toda essa linha de comando irá verificar se a bolinha está entre o topo e a parte de baixo do bloco na posição n.
            dy[0] = -dy[0]
            bloco.status = 0//caso a condição seja satisfeita, 
            pontos[0]++
            tocaraudio()
            checarProximaFase()
            document.getElementById("pontosValor").innerText = pontos[0]
            if (pontos[0] > recorde[0]) {
                recorde[0] = pontos[0]
                localStorage.setItem("recorde", recorde[0])
                document.getElementById("recordeValor").innerText = recorde[0]
            }
        }
    }
    colisaoBlocosRec(n - 1)
}

//verifica se há algum recorde salvo na máquina:

const verificarRecorde = () => {
    const recordeSalvo = [Number(localStorage.getItem("recorde"))]//A função não tentará criar uma nova constante chamada Recordesalvo quando for chamada,
    //Pois a "Variável" é uma variável local, e só é criada quando a função é chamada.
    if (!recordeSalvo[0]) {
        recordeSalvo[0] = 0
        localStorage.setItem("recorde", recordeSalvo[0])
    }
    if (pontos[0] > recordeSalvo[0]) {
        localStorage.setItem("recorde", pontos[0])
        recordeSalvo[0] = pontos[0]
        document.getElementById("recordeValor").innerText = recordeSalvo[0]
        console.log("Novo recorde! Record: " + recordeSalvo[0])
    }
}


window.onload = function() {
    const recordeSalvo = [Number(localStorage.getItem("recorde")) || 0]
    if (recordeSalvo) {
        document.getElementById("recordeValor").innerText = recordeSalvo[0]
    }
}


//função para calcular a velocidade da bola na fase atual:

const velocidadenova = () =>{
    velocidade[0] =  3+fase[0]
    requestAnimationFrame(velocidadenova)
}

//função para checar se todos os blocos foram destrudis:

const checarProximaFase = () => {
    const blocosVivos = blocos50.reduce((acc,item)=>acc+item.status,0)
    if (blocosVivos===0){
        alert("Parabéns! Próxima fase!")
        fase[0]++
        document.getElementById("faseValor").innerText = fase[0]
        reviver_blocos(49) // renasce todos os blocos
        reposicionarBola() // reposiciona a bola e a barra
        document.getElementById("pontosValor").innerText = pontos[0]
    }
}


//função que é responsável por desenhar a bola na tela:

const drawBola = () => {
    ctx.beginPath()
    ctx.arc(x[0], y[0], bolaTamanho[0], 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

//função que é responsável por desenhar a barra que o jogador controla:

const drawBarra = () => {
    ctx.beginPath()
    ctx.roundRect(barraX[0], tela.height - barraAltura[0], barraLargura[0], barraAltura[0], 5)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

//função respinsável por desenhar os blocos que o jogador irá destruir:

const drawBlocos = (n) => {
    if (n < 0) return // termina a recursão
    const bloco = blocos50[n]
    if (bloco.status === 1) {
        const coluna = n % blocoColunas[0] // calcula a coluna
        const linha = Math.floor(n / blocoColunas[0]) // calcula a linha
        bloco.x = coluna * (blocoLargura[0] + blocoPadding[0]) + esquerdaMargem[0]
        bloco.y = linha * (blocoAltura[0] + blocoPadding[0]) + topoMargem[0]
        ctx.beginPath()
        ctx.roundRect(bloco.x, bloco.y, blocoLargura[0], blocoAltura[0], 5)
        ctx.fillStyle = bloco.cor
        ctx.fill()
        ctx.closePath()
    }
    drawBlocos(n - 1) // chama recursivamente para o bloco anterior, sou "jênio" demais, tá maluco.
}

//função que de fato faz o jogo acontecer:

function draw() {
    ctx.clearRect(0, 0, tela.width, tela.height)
    drawBlocos(blocos50.length - 1)//função que desenha todos os blocos(chama a função que seve para desenhar blocos).
    drawBola()//desenha a bola.
    drawBarra()//desenha a bara.
    colisaoBlocosRec(blocos50.length - 1)//testa a colisão com os blocos.
    x[0] += dx[0]//essa parte aqui altera a posição no eixo x da bola.
    y[0] += dy[0]//essa parte aqui altera a posição no eixo y da bola.
    if (x[0] + dx[0] > tela.width - bolaTamanho[0] || x[0] + dx[0] < bolaTamanho[0]) {//parte que inverte a direção da bola no eixo x quando ela bate na parede.
        dx[0] = -dx[0]
    }
    if (y[0] + dy[0] < bolaTamanho[0]) {//parte que inverte a direção da bola no eixo y quando ela bate na parede.
        dy[0] = -dy[0]
    }
    else if (y[0] + dy[0] > tela.height - bolaTamanho[0] + 2) {
        if (vidas[0] == 0){
            alert("Fim do jogo! Suas vidas acabaram.")
            alert("Pressione qualquer tecla para jogar novamente.")
            document.location.reload()
        }
        if (x[0] > barraX[0] + 2 && x[0] < barraX[0] + barraLargura[0] + 2) {
            dy[0] = -dy[0]
            if(setaDireita[0] === true){
                dx[0] = Math.abs(dx[0])+1
            }
            if(setaEsquerda[0] === true){
                dx[0] = -Math.abs(dx[0])-1
            }
        }else {
            vidas[0]--
            document.getElementById("vidasValor").innerText = vidas[0];
            if (vidas[0] > 0) {
                alert("Você perdeu uma vida! Vidas restantes: " + vidas[0]);
                reposicionarBola()
            }
        }
    }
    if (setaDireita[0] && barraX[0] < tela.width - barraLargura[0]) {//se a seta para a direita estiver pressionada a posição da barra irá se mover 10 px para a direita.
        barraX[0] += 10
    } else if (setaEsquerda[0] && barraX[0] > 0) {//se a seta para a esquerda estiver pressionada a posição da barra irá se mover 10 px para a esquerda.
        barraX[0] -= 10
    }
    requestAnimationFrame(draw)//recomeça a função, fazendo um loop para o jogo de fato começar.
}

draw()
