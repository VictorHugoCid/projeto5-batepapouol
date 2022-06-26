

//    "https://mock-api.driven.com.br/api/v6/uol/messages"

//let namePrompt = prompt("diga seu lindo nome")
let namePrompt = {
    name: "gabi"
}

let msgServidor = [];
let participantes = [];

logar();
buscarParticipantes();
//setInterval(manterLog, 5000)
//setInterval(buscarMensagens, 3000)

function logar() {



    /* primeiro post pro API */
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants`, namePrompt)

    promise
        .catch(alertaErro)
        .then(buscarMensagens)

    //frufruDoLogin();

}

function frufruDoLogin() {
    const button = document.querySelector(".entrada .button")
    const input = document.querySelector(".entrada input")
    const loader = document.querySelector(".entrada .loader")
    const entrada = document.querySelector(".entrada")

    button.classList.add("none")
    button.classList.remove("button")
    input.classList.add("none")
    loader.classList.remove("none")

    setTimeout(() => {
        entrada.classList.add("none")
        entrada.classList.remove("entrada")
    }, 3000);

    namePrompt = {
        name: input.value
    }
}


function manterLog() {
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/status`, namePrompt)
}

// etapa 1 - buscar msgs no servidor (API)
function buscarMensagens() {
    console.log(`ordem de execução 1 - buscarMensagens`)
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v6/uol/messages`);

    promessa
        .catch(alertaErro)
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

    /* {
        from: "João",
        to: "Todos",
        text: "entra na sala...",
        type: "status",
        time: "08:01:17"
    } */

    ul.innerHTML = ``;
    for (let i = 0; i <  msgServidor.length; i++) {

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
    // RELOAD DAS MENSAGENS
    // scroll da msg
    scroll();
}

// etapa 4 - cadastra msg para enviar AINDA NAO VOU FOCAR AQUI
let msg;

function enviar() {
    //pegar infos do input
    const msgInput = document.querySelector(".msg");
    msg = msgInput.value

    const novaMsg = {
        from: namePrompt.name,
        to: "Todos",
        text: msg,
        type: "message"
    }
    // etapa 5 - Mandar o post pro servidor
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, novaMsg);
    // etapa 6 - tratar erros/acertos
    promise
        .catch(alertaErro)
        .then(buscarMensagens)

    buscarMensagens();
    msgInput.value = ``;
}

function buscarParticipantes() {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/uol/participants`)
    promise
        .catch(alertaErro)
        .then(popularParticipantes)
}

function popularParticipantes(resposta) {
    participantes = resposta.data
    plotarParticipantes();
}

function plotarParticipantes() {

    divzin = document.querySelector(".participantes div")

    divzin.innerHTML = ``;

    for (let i = 0; i < participantes.length; i++) {
        divzin.innerHTML += ` 
                <li class="menu-li" onclick="selecionarContato(this)">
                    <ion-icon name="person-circle"></ion-icon>
                    <span>${participantes[i].name}</span>
                    <img src="/imagens/check.png" class="hidden">
                </li>
            `;
    }
}

function selecionarContato(element) {

    const contato = document.querySelector(".participantes img.check")
    const check = element.querySelector("img")

    if (contato !== null) {
        contato.classList.remove("check");
        check.classList.add("check");
    }
    check.classList.add("check")
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

function alertaErro(error) {

    console.log(error.response.status);
    if (error.response.status === 400) {
        alert("o usuário já está logado!");
    }

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

function atualizarBoard() {
    setTimeout(buscarMensagens, 3000);
    setInterval(buscarParticipantes, 10000);
    setTimeout(manterLog, 5000);


}
function analisarCheck() {
    /* ESSA FUNÇÃO É PRO BONUS
    QUANDO TIVER COM CHECK NO MENU
    VAI AVISAR NO INPUT PRA QUEM ESTÁ ENVIANDO
    E O TIPO DA MSG */
}

function enterMessage(evento) {
    const Tecla = evento.which;
    if (Tecla == 13) {
        document.querySelector(".footer ion-icon").click();
    }
   /*  if (Tecla == 13) {
        document.querySelector(".entrada .button").click();
    } */
} 
