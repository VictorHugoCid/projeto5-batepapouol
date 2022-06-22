
let msgServidor = [
    { time: "09:21:45", tipo: "entrou", nome: "João", texto: "entrou", destino: "" },
    { time: "09:21:45", tipo: "entrou", nome: "Maria", texto: "entrou", destino: "" },
    { time: "09:21:45", tipo: "default", nome: "Pedro", texto: "bora marcar o churrasco da T7", destino: "Todos" },
    { time: "09:21:45", tipo: "reservada", nome: "João", texto: "se alguém falar bem do piratinha vai ter agressão", destino: "Maria" },
    { time: "09:21:45", tipo: "default", nome: "Evelyn", texto: "PIRATINHA>>>>>>>>>narutinho", destino: "Todos" },
    { time: "09:21:45", tipo: "default", nome: "Maria", texto: "errou feio, errou rude", destino: "Todos" },
    { time: "09:21:45", tipo: "default", nome: "João", texto: "deu ruim", destino: "Todos" },
    { time: "09:21:45", tipo: "default", nome: "Rod", texto: "guerra de anime no churras!", destino: "Todos" }
]

// Plotar no DOM mensagens do servidor, o botão enviar vai somar apenar +1
plotarDoServidor();

function plotarDoServidor() {

    let ul = document.querySelector("ul.board");

    ul.innerHTML = ``
    for (let i = 0; i < msgServidor.length; i++) {

        if (msgServidor[i].reservada !== "") {
            ul.innerHTML += ` 
            <li class="${msgServidor[i].tipo}">
                <span class="tempo">(${msgServidor[i].time})</span>
                ${msgServidor[i].nome} 
                <span> para </span> 
                ${msgServidor[i].destino}
                <span>${msgServidor[i].texto}</span>
            </li>
            `;
        } else {
            ul.innerHTML += ` 
            <li class="${msgServidor[i].tipo}">
                <span class="tempo">(${msgServidor[i].time})</span>
                ${msgServidor[i].nome} 
                <span>${msgServidor[i].texto}</span>
            </li>
            `;
        }
    }
}

//let namePrompt = prompt("diga seu lindo nome")
let namePrompt = "Victor"
let msg;

function enviar() {
    //pegar infos do input
    const msgInput = document.querySelector(".msg");
    msg = msgInput.value

    // colocar a msg no Objeto, nao consegui de outra forma
    const msgObj = {
        time: hora(),
        //tipo: [{tipo: "entrou"}, {tipo: "saiu"}, {tipo: "default"}, {tipo: "reservada"}],
        tipo: "default",
        nome: namePrompt,
        texto: msg,
        destino: "Todos"
    }
    hora();

    msgServidor.push(msgObj)
    plotarDoServidor();
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