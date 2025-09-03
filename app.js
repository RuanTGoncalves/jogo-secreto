let listaDeNumeroSorteados = []; 
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAletorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto){ 
   let campo = document.querySelector(tag);
   campo.innerHTML = texto;
   if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMesagemInicial(){ 
  exibirTextoNaTela ('h1', 'Jogo do número Secreto');
  exibirTextoNaTela('p', 'Escolha um número de 1 a 100');

}
exibirMesagemInicial()
function verificarChute() { 
   let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) { 
      let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
      let mensagemTentativas = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}`
      exibirTextoNaTela("h1", "acertou!");
      exibirTextoNaTela("p", mensagemTentativas);
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else if (chute > numeroSecreto ) { 
      exibirTextoNaTela ("h1", " o número é menor");
      exibirTextoNaTela ("p", "continue tentando"); 
    } else if (chute < numeroSecreto) { 
      exibirTextoNaTela ("h1", " o número é maior");
      exibirTextoNaTela ("p", "continue tentando");
    }
    tentativas++;
    limparCampo()
 }

 function gerarNumeroAletorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
   let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;
  if (quantidadeDeElementosNaLista == numeroLimite){ 
    listaDeNumeroSorteados = [];
  }

  if (listaDeNumeroSorteados.includes(numeroEscolhido)) {   
    return gerarNumeroAletorio();

 } else { 
    listaDeNumeroSorteados.push(numeroEscolhido);
    return numeroEscolhido; 
    }

 }
 function limparCampo (){ 
    chute = document.querySelector("input"); 
    chute.value = "";
 }

 function reiniciarjogo(){ 
   numeroSecreto = gerarNumeroAletorio(); 
   limparCampo();
   tentativas = 1 ; 
   exibirMesagemInicial();
   document.getElementById('reiniciar').setAttribute('disabled', true);
   }