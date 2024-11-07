// Defini a variavel listaDeNumerosSorteados como uma lista vazia.
let listaDeNumerosSorteados = []
// Defini a variavel numeroLimite em 100, para utilizar na geração do número aleatório.
let numeroLimite = 100
// Defini a variavel numeroSecreto em uma função criada para gerar o número aleatório.
let numeroSecreto = gerarNumeroAleatorio()
// Defini o valor inicial da variavel tentativas.
let tentativas = 1

// ????
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag)
  campo.innerHTML = texto
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.0 })
}

// Criando a função exibirMensagemInicial e definindo como ação a inserção do texto no HTML.
function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto')
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 100')
}

// Chamando a funação exibirMensagemInicial.
exibirMensagemInicial()

// Função para verificar o chute.
function verificarChute() {
  // Defini a variavel chute o valor que for digitado no campo input.
  let chute = document.querySelector('input').value

  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!')
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
    exibirTextoNaTela('p', mensagemTentativas)
    document.getElementById('reiniciar').removeAttribute('disabled')
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor')
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior')
    }
    tentativas++
    limparCampo()
  }
}

// Função que gera o número aleatório.
function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length
  if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = []
  }
  // Verifica se na lista contem o número escolhido.
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio()
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido)
    console.log(listaDeNumerosSorteados)
    return numeroEscolhido
  }
}

function limparCampo() {
  chute = document.querySelector('input')
  chute.value = ''
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio()
  limparCampo()
  tentativas = 1
  exibirMensagemInicial()
  document.getElementById('reiniciar').setAttribute('disabled', true)
}
