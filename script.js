const tela = document.getElementById("jogoTela")
const ctx = tela.getContext("2d")

tela.width = 1200
tela.height = 500

//informações relacionadas à bola:

const velocidade = [4]//velocidade da bola.
const bolaTamanho = [10]//tamalho da bola.
const x = [(tela.width / 2)]//posição da bola no eixo x.
const y = [(tela.height - 30)]//posição da bola no eixo y.
const dx = [(velocidade[0])]//representa a velocidade no eixo X, ou seja, velocidade na horizontal.
const dy = [-(velocidade[0])]//representa a velocidade no eixo y, ou seja, velocidade na vertical.

//informações que o jogador precisa saber:

const vidas = [3] //quantidade de vidas que o jogador tem.
const fase = [1] //fase em que o jogador está.
const pontos = [0] //quantidade de pontos que o jogador possui.
const recorde = [Number(localStorage.getItem("recorde") ) || 0] //procura se já tinha algo salvo na página com o nome recorde, se não tiver, retorna 0.

//partes que estão relacionadas com a barra controlada pelo jogador:

const barraAltura = [15] //diz a altura da barra controlada pelo jogador.
const barraLargura = [120] //diz a largura da barra controlada pelo jogador.
const barraX = [(tela.width - barraLargura[0]) / 2] //valor que está relacionado com a posição do jogador.

//setas que o jogador usará para controlar a barra:

const setaDireita = [false]//diz se a seta para a direita do teclado ou tecla 'D' está pressionada.
const setaEsquerda = [false]//diz se a seta para a esquerda do teclado ou tecla 'A' está pressionada.

//informações relacionadas aos blocos:

const blocoLinhas = [5]//quantidade de linhas.
const blocoColunas = [10]//quantidade de colunas.
const blocoLargura = [87]//largura dos blocos. 
const blocoAltura = [25]//altura dos blocos.
const blocoPadding = [30]//espaçamento entre blocos.
const topoMargem = [10]//distância do conjunto de blocos até o topo da tela.
const esquerdaMargem = [30]//margem esquerda do conjunto de blocos.


const teclaPressionadaHandler = (e) => {//função que será ativada quando alguma tecla for pressionada e irá alterar o valor da tecla
    if (e.key === "ArrowRight" || e.key === "d") {
        setaDireita[0] = true
    } else if (e.key === "ArrowLeft" || e.key === "a") {
        setaEsquerda[0] = true
    }
}

const teclaSoltaHandler = (e) => {//função que será ativada quando alguma tecla for solta e irá alterar o valor da tecla
    if (e.key === "ArrowRight" || e.key === "d") {
        setaDireita[0] = false
    } else if (e.key === "ArrowLeft"|| e.key === "a") {
        setaEsquerda[0] = false
    }
}


document.addEventListener("keydown", teclaPressionadaHandler)//"função" que entra em ação quando alguma tecla é pressionada, acionando a função "teclaPressionadaHandler"
document.addEventListener("keyup", teclaSoltaHandler)//"função" que entra em ação quando alguma tecla é solta, acionando a função "teclaSoltaHandler"

//função que está relacionada ao som quando se destrói um bloco:

const tocaraudio = () =>{
    const audio = new Audio ("itens/impactoreal.mp3")
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

//todos os blocos do jogo com suas respectivas cores:

const blocos50 = [
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#FF0000' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#00FF00' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#0000FF' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FFFF00' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' },
  { x: 0, y: 0, status: 1, cor: '#FF00EAFF' }
]

//função recursiva para "reviver" os blocos:

const reviver_blocos = (n) =>{
    if (n<0){}
    else{
        blocos50[n].status=1//aqui ele está alterando o status de todos os blocos para 1, o que fará os blocos serem desenhados novamente na tela.
        reviver_blocos(n-1)//recursividade para "reviver" os blocos.
    }
}

document.getElementById("recordeValor").innerText = recorde[0]//troca o recorde do HTML pelo record[0], que é o recorde salvo na máquina do jogador.

//função para testar a colisão da bola com os blocos:

const colisaoBlocosRec = (n) => {
    if (n < 0){return}//se n for menos que 0, ele irá parar a recursividade.
    const bloco = blocos50[n]//aqui, bloco assume os mesmos valores de blocos50[n].
    if (bloco.status === 1) {//se o bloco estiver "vivo"...
        if (x[0] > bloco.x -7 && x[0] < bloco.x + 7 + blocoLargura[0] &&//toda essa linha de comando irá verificar se a bolinha está entre a esquerda e a direita do bloco na posição n.
            y[0] > bloco.y -10 && y[0] < bloco.y + 10 + blocoAltura[0]) {//toda essa linha de comando irá verificar se a bolinha está entre o topo e a parte de baixo do bloco na posição n.
            dy[0] = -dy[0]//inverte a velocidade vertical.
            bloco.status = 0//caso a condição seja satisfeita.
            pontos[0]++//adiciona um ponto.
            tocaraudio()// toca o áudio toda vez que um bloco é destruido.
            checarProximaFase()//checa se todos os blocos já foram destruidos todas as vezes que algum bloco for destruido.
            document.getElementById("pontosValor").innerText = pontos[0]//altera o valor de pontos no arquivo HTML.
            if (pontos[0] > recorde[0]) {//se os pontos forem maior que o recorde.
                recorde[0] = pontos[0]//recorde receberá o valor de pontos.
                localStorage.setItem("recorde", recorde[0])//irá alterar o valor "recorde" que antes estava salvo na página.
                document.getElementById("recordeValor").innerText = recorde[0]//irá alterar o valor do item com id="recordeValor" na página HTML para o valor de recorde[0].
            }
        }
    }
    colisaoBlocosRec(n - 1)
}

//função para verificar se há algum recorde salvo na máquina:

const verificarRecorde = () => {
    const recordeSalvo = [Number(localStorage.getItem("recorde"))]
    if (!recordeSalvo[0]) {//verifica se há um recorde salvo no dispositivo.
        recordeSalvo[0] = 0//caso não haja, o recorde salvo será igual a 0.
        localStorage.setItem("recorde", recordeSalvo[0])//irá salvar o valor o termo "recorde" com o valor de recordesalvo[0].
    }
    if (pontos[0] > recordeSalvo[0]) {//se a quantidade de pontos for maior que o recorde salvo...
        localStorage.setItem("recorde", pontos[0])//salvará o novo recorde, que assumirá o valor de pontos[0].
        recordeSalvo[0] = pontos[0]//recorde salvo passará a ser igual a pontos[0].
        document.getElementById("recordeValor").innerText = recordeSalvo[0]//irá alterar o valor do span com o id="recordevalor" para recordeSalvo[0].
    }
}


window.onload = function() {
    const recordeSalvo = [Number(localStorage.getItem("recorde")) || 0]
    if (recordeSalvo[0]) {
        document.getElementById("recordeValor").innerText = recordeSalvo[0]
    }
}


//função para calcular a velocidade da bola na fase atual:

const velocidadenova = () =>{
    velocidade[0] =  3+fase[0]
    requestAnimationFrame(velocidadenova)
}

//função para checar se todos os blocos foram destruídos:

const checarProximaFase = () => {
    const blocosVivos = blocos50.reduce((acc,item)=>acc+item.status,0)//irá retornar a soma de todos os status.
    if (blocosVivos===0){//se todos os status forem igual a 0:
        alert("Parabéns! Próxima fase! Você ganhou uma vida!")
        alert(`Agora a velocidade da bola é: ${3+fase[0]}!`)
        fase[0]++//adicionará um no número da fase.
        vidas[0]++//adicionará uma vida para o jogador por passar de fase.
        document.getElementById("vidasValor").innerText = vidas[0]//No HTML, irá alterar o valor do span com o id="vidasValor" para vidas[0].
        document.getElementById("faseValor").innerText = fase[0]//No HTML, irá alterar o valor do span com o id="faseValor" para fase[0].
        reviver_blocos(49) // renasce todos os blocos.
        reposicionarBola() // reposiciona a bola e a barra.
        document.getElementById("pontosValor").innerText = pontos[0]//No HTML, irá alterar o valor do span com o id="pontosValor" para pontos[0].
    }
}

//função que é responsável por desenhar a bola na tela:

const drawBola = () => {
    ctx.beginPath()
    ctx.arc(x[0], y[0], bolaTamanho[0], 0, Math.PI * 2)//É atualizado, pois x e y mudam, e na função draw, eles variam.
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

// função que é responsável por desenhar a barra que o jogador controla:

const drawBarra = () => {
    ctx.beginPath();
    ctx.roundRect(barraX[0], tela.height - barraAltura[0], barraLargura[0], barraAltura[0], 5) //É atualizado barraX varia conforme você joga o game, usado para se mover, o que faz o jogador mover a barra.
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

//função responsável por desenhar os blocos que o jogador irá destruir:

const drawBlocos = (n) => {
    if (n < 0) return // termina a recursão se n for menos que 0.
    const bloco = blocos50[n]
    if (bloco.status === 1) {//verifica o status do bloco para desenhar ele na tela.
        const coluna = n % blocoColunas[0] // calcula a coluna.
        const linha = Math.floor(n / blocoColunas[0]) // calcula a linha.
        bloco.x = coluna * (blocoLargura[0] + blocoPadding[0]) + esquerdaMargem[0]//calcula a posição x do bloco na posição n.
        bloco.y = linha * (blocoAltura[0] + blocoPadding[0]) + topoMargem[0]//calcula a posição y do bloco na posição n.
        ctx.beginPath()
        ctx.roundRect(bloco.x, bloco.y, blocoLargura[0], blocoAltura[0], 5)//vai desenhar na tela com base em bloco.x e bloco.y como posição.
        ctx.fillStyle = bloco.cor
        ctx.fill()
        ctx.closePath()
    }
    drawBlocos(n - 1) // chama recursivamente para o bloco anterior, sou "jênio" demais, tá maluco.
}

//função que de fato faz o jogo acontecer:

function draw() {
    ctx.clearRect(0, 0, tela.width, tela.height)//limpa todos os elementos da tela.
    drawBlocos(blocos50.length - 1)//função que desenha todos os blocos(chama a função que serve para desenhar blocos).
    drawBola()//desenha a bola.
    drawBarra()//desenha a barra.
    colisaoBlocosRec(blocos50.length - 1)//testa a colisão com os blocos.
    x[0] += dx[0]//essa parte aqui altera a posição no eixo x da bola.
    y[0] += dy[0]//essa parte aqui altera a posição no eixo y da bola.
    if (x[0] + dx[0] > tela.width - bolaTamanho[0] || x[0] + dx[0] < bolaTamanho[0]) {//parte que inverte a direção da bola no eixo x quando ela bate na parede.
        dx[0] = -dx[0]
    }
    if (y[0] + dy[0] < bolaTamanho[0]) {//parte que inverte a direção da bola no eixo y quando ela bate na parede.
        dy[0] = -dy[0]
    }
    else if (y[0] + dy[0] > tela.height - bolaTamanho[0] + 2) {//verifica se a bola está na parte do jogo que ocorre/ocorreria a colisão com a parte inferior.
        if (vidas[0] == 0){//se a vida for igual a 0, o jogo se acaba.
            alert("Fim do jogo! Suas vidas acabaram.")
            alert("Pressione qualquer tecla para jogar novamente.")
            document.location.reload()//Aqui ele carrega a página novamente. 
        }
        if (x[0] > barraX[0] + 2 && x[0] < barraX[0] + barraLargura[0] + 2) {//verifica se a barra está encostada no parte inferior que a bola iria bater.
            dy[0] = -dy[0]//abaixo, é possível alterar o caminho da bola.
            if(setaDireita[0] === true){// se a seta para direita estiver sendo pressionada quando a bola bater na barra, a bola seguira indo para a direita.
                dx[0] = Math.abs(dx[0])
            }
            if(setaEsquerda[0] === true){// se a seta para esquerda estiver sendo pressionada quando a bola bater na barra, a bola seguira indo para a esquerda.
                dx[0] = -Math.abs(dx[0])
            }
        }else {//se houver colisão com a parte de baixo da tela do jogo, porém, apenas se a vida for diferente de 0 e a barra não estiver abaixo da bola...
            vidas[0]--//perderá uma vida.
            document.getElementById("vidasValor").innerText = vidas[0]
            if (vidas[0] > 0) {
                alert("Você perdeu uma vida! Vidas restantes: " + vidas[0])
                reposicionarBola()
            }
        }
    }
    if (setaDireita[0] && barraX[0] < tela.width - barraLargura[0]) {//se a seta para a direita estiver pressionada, a posição da barra irá se mover 10 px para a direita.
        barraX[0] += 10
    } else if (setaEsquerda[0] && barraX[0] > 0) {//se a seta para a esquerda estiver pressionada, a posição da barra irá se mover 10 px para a esquerda.
        barraX[0] -= 10
    }
    requestAnimationFrame(draw)//cria um loop, o que faz com o que o jogo de fato ocorra.
}

velocidadenova()
draw()