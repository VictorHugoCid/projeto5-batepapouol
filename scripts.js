

//    "https://mock-api.driven.com.br/api/v6/uol/messages"

//let namePrompt = prompt("diga seu lindo nome")
let namePrompt = {
    name: "e"
}

let msgServidor = [];
let participantes = [];

logar();
buscarParticipantes();
//setInterval(manterLog, 5000)

function logar() {

    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/participants`, namePrompt)

    promise
        .catch(alertaErro)
        .then(buscarMensagens)
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
    //console.log(resposta)
    msgServidor = resposta.data

    plotarDoServidor();

}
// etapa 3 - itera o array msgServidor

function plotarDoServidor() {


    console.log("orden de execução 3 - plotarDoServidor")
    //console.log(msgServidor)

    let ul = document.querySelector("ul.board");

    /* {
        from: "João",
        to: "Todos",
        text: "entra na sala...",
        type: "status",
        time: "08:01:17"
    } */

    ul.innerHTML = ``;
    for (let i = 0; i < msgServidor.length; i++) {

        if (msgServidor[i].type !== "status") {
            ul.innerHTML += ` 
            <li class="${msgServidor[i].type}">
                <span class="tempo">(${msgServidor[i].time})</span>
                    ${msgServidor[i].from} 
                <span> 
                    para 
                </span> 
                    ${msgServidor[i].to}
                <span>${msgServidor[i].text}</span>
            </li>
            `;
        } else {
            ul.innerHTML += ` 
            <li class="${msgServidor[i].type}">
                <span class="tempo">(${msgServidor[i].time})</span>
                ${msgServidor[i].from} 
                <span>${msgServidor[i].text}</span>
            </li>
            `;
        }
    }
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
    hora();
    // etapa 5 - Mandar o post pro servidor
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, novaMsg);
    // etapa 6 - tratar erros/acertos
    promise
        .catch(alertaErro)
        .then(buscarMensagens)
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
    //console.log(divzin)

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
    
    if (contato !==null){
        contato.classList.remove("check");
        check.classList.add("check");
    } 
    check.classList.add("check")
}

function selecionarStatus(element){
    const messageStatus = document.querySelector(".messageStatus img.check");
    const check = element.querySelector("img");
    
    if(messageStatus !== null){
        messageStatus.classList.remove("check");
        check.classList.add("check");
    }
    check.classList.add("check");
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

    overlay.classList.add("show-menu")
    menu.classList.add("show-menu")
}

function analisarCheck() {
    /* ESSA FUNÇÃO É PRO BONUS
    QUANDO TIVER COM CHECK NO MENU
    VAI AVISAR NO INPUT PRA QUEM ESTÁ ENVIANDO
    E O TIPO DA MSG */
}

