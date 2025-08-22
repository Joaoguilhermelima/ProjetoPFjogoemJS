const tela = document.getElementById("jogoTela")
const ctx = tela.getContext("2d")

tela.width = 1200
tela.height = 500

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

const blocoLinhas = [5]
const blocoColunas = [10]
const blocoLargura = [80]
const blocoAltura = [25]
const blocoPadding = [30]
const topoMargem = [10]
const esquerdaMargem = [30]


const teclaPressionadaHandler = (e) => {
    if (e.key === "ArrowRight") {
        setaDireita[0] = true
    } else if (e.key === "ArrowLeft") {
        setaEsquerda[0] = true
    }
}

const teclaSoltaHandler = (e) => {
    if (e.key === "ArrowRight") {
        setaDireita[0] = false
    } else if (e.key === "ArrowLeft") {
        setaEsquerda[0] = false
    }
}
//tive que mudar a ordem, antes o comando doxument vinha primeiro que as funções de alta ordem que estão ligadas as setas
//isso causava um problema gigante, pois as constantes ainda não existiam.
document.addEventListener("keydown", teclaPressionadaHandler)
document.addEventListener("keyup", teclaSoltaHandler)

//inivação que nós fizemos ao código, antes não tinha nenhum som.
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
    x[0] = tela.width / 2
    y[0] = tela.height - 30
    dx[0] = velocidade[0]
    dy[0] = -(velocidade[0])
    setaDireita[0] = false
    setaEsquerda[0] = false
    barraX[0] = (tela.width - barraLargura[0]) / 2
}

// Para armazenar as cores de cada linha (5 linhas)
const coresLinhas = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A1FF33'];
const totalDeBlocos = 50;
const blocosPorLinha = 10;

// Cria o array de 50 blocos de uma só vez com cores por linha
const blocos50 = Array.from({ length: totalDeBlocos }, (_, indice) => {
    // Calcula a linha do bloco com base no seu índice.
    const indiceLinha = Math.floor(indice / blocosPorLinha);

    // Pega a cor correta para a linha
    const cor = coresLinhas[indiceLinha];

    // Retorna o objeto do bloco com a cor e status definidos
    return {
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
        blocos50[n].status=1
        reviver_blocos(n-1)//recursividade para "reviver" os blocos.
    }
}

document.getElementById("recordeValor").innerText = recorde[0]

const colisaoBlocosRec = (n) => {
    if (n < 0) return
    const bloco = blocos50[n]
    if (bloco.status === 1) {
        if (x[0] > bloco.x && x[0] < bloco.x + blocoLargura[0] &&
            y[0] > bloco.y && y[0] < bloco.y + blocoAltura[0]) {
            dy[0] = -dy[0]
            bloco.status = 0
            pontos[0]++
            tocaraudio()
            checarProximaFase()
            velocidade[0]= novaVelocidadeBola
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



//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//função para verificar se havia algum recorde anterior registrado nessa máquina.
//não mexe mais
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

//feito e funcionando
//não mexe mais
window.onload = function() {
    const recordeSalvo = [Number(localStorage.getItem("recorde")) || 0]
    if (recordeSalvo) {
        document.getElementById("recordeValor").innerText = recordeSalvo[0]
    }
}

//função para calcular a velocidade da bola na fase atual
const calcularVelocidadeBola = (faseAtual) => {
    return 3 + faseAtual
} 

const novaVelocidadeBola = calcularVelocidadeBola(fase[0]) //função para aumentar a velocidade da bola a cada fase

const checarProximaFase = () => {
    const blocosVivos = blocos50.reduce((acc,item)=>acc+item.status,0)
    if (blocosVivos===0){
        alert("Parabéns! Próxima fase!")
        fase[0]++
        velocidade[0] = novaVelocidadeBola
        document.getElementById("faseValor").innerText = fase[0]
        reviver_blocos(blocos50.length - 1) // renasce todos os blocos
        reposicionarBola() // reposiciona a bola e a barra
        document.getElementById("pontosValor").innerText = pontos[0]
    }
}


//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//não mexe mais
const drawBola = () => {
    ctx.beginPath()
    ctx.arc(x[0], y[0], bolaTamanho[0], 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

//escrevi a antiga função com notação arrow e está funcionando perfeitamente
//não mexe mais
const drawBarra = () => {
    ctx.beginPath()
    ctx.roundRect(barraX[0], tela.height - barraAltura[0], barraLargura[0], barraAltura[0], 5)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

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

function draw() {
    ctx.clearRect(0, 0, tela.width, tela.height)
    drawBlocos(blocos50.length - 1)
    drawBola()
    drawBarra()
    colisaoBlocosRec(blocos50.length - 1)
    x[0] += dx[0]
    y[0] += dy[0]
    if (x[0] + dx[0] > tela.width - bolaTamanho[0] || x[0] + dx[0] < bolaTamanho[0]) {
        velocidade[0] = novaVelocidadeBola
        dx[0] = -dx[0]
    }
    if (y[0] + dy[0] < bolaTamanho[0]) {
        velocidade[0] = novaVelocidadeBola
        dy[0] = -dy[0]
    }
    else if (y[0] + dy[0] > tela.height - bolaTamanho[0] + 2) {
        if (vidas[0] == 0){//parte modificada e está funcionando. Se está funcionando, não se mexe.
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
        } else {//parte modificada e está funcionando.
            vidas[0]--
            document.getElementById("vidasValor").innerText = vidas[0];
            if (vidas[0] > 0) {
                alert("Você perdeu uma vida! Vidas restantes: " + vidas[0]);
                reposicionarBola()
            }
        }
    }
    if (setaDireita[0] && barraX[0] < tela.width - barraLargura[0]) {
        barraX[0] += 10
    } else if (setaEsquerda[0] && barraX[0] > 0) {
        barraX[0] -= 10
    }
    requestAnimationFrame(draw)
}

draw()
