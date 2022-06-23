

//    "https://mock-api.driven.com.br/api/v6/uol/messages"

let msgServidor = [];
buscarMensagens();

// etapa 1 - buscar msgs no servidor (API)
function buscarMensagens() {
    console.log(`ordem de execução 1 - buscarMensagens`)
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    promessa.then(popularMsgServidor);

}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// etapa 2 - Jogar as mensagens do API na variável msgServidor

function popularMsgServidor(resposta){
    console.log(`ordem de execução 2 - popularMsgServidor`)
    //console.log(resposta)

    msgServidor = resposta.data

    plotarDoServidor();

}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

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
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// etapa 4 - cadastra msg para enviar AINDA NAO VOU FOCAR AQUI

//let namePrompt = prompt("diga seu lindo nome")
let namePrompt = "Victor"
let msg;

function enviar() {
    //pegar infos do input
    const msgInput = document.querySelector(".msg");
    msg = msgInput.value

    // colocar a msg no Objeto, nao consegui de outra forma
    const novaMsg = {
        //type: [{tipo: "status"}, {tipo: "message"}, {tipo: "private_message"}, {tipo: "reservada"}],
        from: namePrompt,
        to: "Todos",
        text: msg,
        type: "default"       
    }
    hora();

    //msgServidor.push(msgObj)
    //plotarDoServidor();

    // etapa 5 - Mandar o post pro servidor
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`,novaMsg);

    // etapa 6 - tratar erros/acertos

    promise
        .catch(alertaErro)
        .then(buscarMensagens)

}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
function alertaErro(error){
    alert("aconteceu algo")

    console.log(error.response.status);
    if (error.response.status === 404) {
      alert("Não foi encontrado!");
    }
    //Quando falta algum campo na receita
    if (error.response.status === 422) {
      alert("Verique todos os campos da receita!");
    }
    //Quando o título já existe
    if (error.response.status === 409) {
      alert("Já existe uma receita com esse título!");
    }
}

function hora() {

    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    //console.log(hour, minutes, seconds)
    let time = `${hour}:${minutes}:${seconds}`
    //console.log(time)
    return time
}

function chamarMenu() {

    const overlay = document.querySelector(".overlay")
    const menu = document.querySelector(".menu")

    console.log(overlay)
    console.log(menu)

    overlay.classList.add("show-menu")
    menu.classList.add("show-menu")
}

function analisarCheck() {
    /* ESSA FUNÇÃO É PRO BONUS
    QUANDO TIVER COM CHECK NO MENU
    VAI AVISAR NO INPUT PRA QUEM ESTÁ ENVIANDO
    E O TIPO DA MSG */
}

