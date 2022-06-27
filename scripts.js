
let namePrompt;

/* namePrompt = {
    name: "llele"
} */

let msg;
let nomeDestino;
let msgServidor = [];
let participantes = [];

function obterNome(){
    let nomezin = document.querySelector(".entrada input").value
    namePrompt = {
        name: nomezin
    }
    logar();
}

function logar() {
    /* primeiro post pro API */
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants`, namePrompt)

    promise
        .catch(erroLogin)
        .then(buscarMensagens)

    frufruDoLogin();
    setInterval(manterLog, 5000);
    setInterval(buscarParticipantes, 10000);
    setInterval(buscarMensagens, 3000);
}

function frufruDoLogin() {
    const loader = document.querySelector(".entrada .loader")
    const entrada = document.querySelector(".entrada")
    const loginContainer = document.querySelector(".loginContainer")

    loginContainer.classList.add("none")
    loader.classList.remove("none")

    setTimeout(() => {
        entrada.classList.add("none")
    }, 3000);
}

function erroLogin(error) {
    console.log(error.response.status);
    setTimeout(() => {
        if (error.response.status === 400) {
            alert("Já existe um usuário logado com esse nome.");
            const entrada = document.querySelector(".entrada")
            const loginContainer = document.querySelector(".loginContainer")
            const loader = document.querySelector(".entrada .loader")
            //tirar none de todos
            entrada.classList.remove("none")
            loginContainer.classList.remove("none")
            loader.classList.add("none")
        }
    }, 3000);
}

function manterLog() {
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, namePrompt)

}
// etapa 1 - buscar msgs no servidor (API)
function buscarMensagens() {
    console.log(`ordem de execução 1 - buscarMensagens`)
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`);

    promessa
        .then(popularMsgServidor);
}

// etapa 2 - Jogar as mensagens do API na variável msgServidor
function popularMsgServidor(resposta) {
    console.log(`ordem de execução 2 - popularMsgServidor`)
    msgServidor = resposta.data

    plotarDoServidor();

}
// etapa 3 - itera o array msgServidor
function plotarDoServidor() {
    console.log("orden de execução 3 - plotarDoServidor")
    let ul = document.querySelector("ul.board");
    ul.innerHTML = ``;
    for (let i = 0; i < msgServidor.length; i++) {
        // COLOCAR CONDICIONAL DE RESERVADA
        const tipo = msgServidor[i].type
        const destino = msgServidor[i].to
        const origem = msgServidor[i].from

        if ((tipo === "private_message") && (destino === namePrompt.name || origem === namePrompt.name)) {
            //plotar rosa
            console.log("plotar rosa")
            ul.innerHTML += ` 
                <li class="${tipo} message">
                    <span class="tempo">(${msgServidor[i].time})</span>
                        ${origem} 
                    <span> 
                        para 
                    </span> 
                        ${destino}
                    <span>${msgServidor[i].text}</span>
                </li>
                `;
        }
        if ((tipo === "message")) {
            ul.innerHTML += ` 
                <li class="${tipo} message">
                    <span class="tempo">(${msgServidor[i].time})</span>
                        ${origem} 
                    <span> 
                        para 
                    </span> 
                        ${destino}
                    <span>${msgServidor[i].text}</span>
                </li>
                `;
        } else if (tipo === "status") {
            ul.innerHTML += ` 
                <li class="${tipo} message">
                    <span class="tempo">(${msgServidor[i].time})</span>
                    ${origem} 
                    <span>${msgServidor[i].text}</span>
                </li>
                `;
        }

    }
    console.log(msgServidor)
    scroll();
}
// etapa 4 - cadastra msg para enviar AINDA NAO VOU FOCAR AQUI
function enviar() {
    //pegar infos do menu
    const aux = document.querySelector(".participantes .check")
    const aux2 = document.querySelector(".messageStatus .check")
    
    if(aux === null || aux2 === null){
        alert("seleciona um contato e um tipo de mensagem")
        return;
    }

    const destino = aux.previousElementSibling.innerHTML
    const innerzin = aux2.previousElementSibling.innerHTML
    let tipo;

    if (innerzin === "Todos") {
        tipo = "message"
    } else {
        tipo = "private_message"
    }
    //pegar infos do input
    const msgInput = document.querySelector(".msg");
    msg = msgInput.value

    const novaMsg = {
        from: namePrompt.name,
        to: destino,
        text: msg,
        type: tipo
    }
    // etapa 5 - Mandar o post pro servidor
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, novaMsg);
    // etapa 6 - tratar erros/acertos
    promise
        .catch(erroMessage)
        .then(buscarMensagens)

    buscarMensagens();
    msgInput.value = ``;
}

function erroMessage(error) {
    if (error.response.status === 400) {
        console.log("erro de mensagem")
        window.location.reload();
    }
}


function buscarParticipantes() {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/uol/participants`)
    promise
        .then(popularParticipantes)
}

function popularParticipantes(resposta) {
    participantes = resposta.data
    plotarParticipantes();
}

function plotarParticipantes() {
    console.log(participantes)
    divzin = document.querySelector(".participantes div")
    divzin.innerHTML = ``;

    for (let i = 0; i < participantes.length; i++) {
        divzin.innerHTML += ` 
                <li class="menu-li" onclick="selecionarContato(this)" data-identifier="participant">
                    <ion-icon name="person-circle"></ion-icon>
                    <span>${participantes[i].name}</span>
                    <img src="/imagens/check.png" class="hidden">
                </li>
            `;
    }
}

function atribuirNome(texto) {
    nomeDestino = texto
    //console.log(nomeDestino)
}

function selecionarContato(element) {
    //const participante = document.querySelector(".participantes .check")
    const contato = document.querySelector(".participantes img.check")
    const texto = element.querySelector(".participantes span").innerHTML
    const check = element.querySelector("img")
    if (contato !== null) {
        contato.classList.remove("check");
        check.classList.add("check");
    }
    check.classList.add("check")
    atribuirNome(texto);
}

function selecionarStatus(element) {
    const messageStatus = document.querySelector(".messageStatus img.check");
    const check = element.querySelector("img");

    if (messageStatus !== null) {
        messageStatus.classList.remove("check");
        check.classList.add("check");
    }
    check.classList.add("check");
}

function scroll() {
    const chat = document.querySelector(".board")
    const msgUltima = chat.lastElementChild
    msgUltima.scrollIntoView();
}

function hora() {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    let time = `${hour}:${minutes}:${seconds}`
    return time
}

function chamarMenu() {
    const overlay = document.querySelector(".overlay")
    const menu = document.querySelector(".menu")

    overlay.classList.add("show-overlay")
    menu.classList.add("show-menu")
}

function fecharMenu() {
    const overlay = document.querySelector(".overlay")
    const menu = document.querySelector(".menu")

    overlay.classList.remove("show-overlay")
    menu.classList.remove("show-menu")
}

function atualizarBoard() {
    setTimeout(buscarMensagens, 3000);
    setInterval(buscarParticipantes, 10000);
    setTimeout(manterLog, 5000);


}

function enterMessage(evento) {
    const Tecla = evento.which;
    if (Tecla == 13) {
        document.querySelector(".footer ion-icon").click();
    }
}

function enterLogin(evento) {
    const Tecla = evento.which;

    if (Tecla == 13) {
        document.querySelector(".entrada .button").click();
    }
}