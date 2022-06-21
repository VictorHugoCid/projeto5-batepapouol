
    

function enviar() {

        //pegar infos do input
    const msgInput = document.querySelector(".msg");
    let msg = msgInput.value

        //criar obj
    const msgObj = {
        time: hora(),
        //tipo: [{tipo: "entrou"}, {tipo: "saiu"}, {tipo: "default"}, {tipo: "reservada"}],
        tipo: "default",
        nome: "Pedrão",
        msg: msg
    }

        //plotar no DOM
    let ul = document.querySelector("ul");
    ul.innerHTML += ` 
    <li class="${msgObj.tipo}">
        <span>(${msgObj.time})</span>
        ${msgObj.nome} ${msgObj.msg}
    </li>
    `
    hora();
}

function hora() {

    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    console.log(hour, minutes, seconds)
    let time = `${hour}:${minutes}:${seconds}` 
    console.log(time)
    return time
}