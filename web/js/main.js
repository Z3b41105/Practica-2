let ws;

document.addEventListener('DOMContentLoaded', StartEvents());

// Funcion que se ejecuta cuando la pagina carga
function StartEvents() {
    WsPrep();

    // Cuando el usuario presiona enter se manda lo que esté escrito
    const textInput = document.getElementById('message');
    textInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            SendMessage();
        }
    });
}

// Toda la conexion al websocket
function WsPrep() {
    ws = new WebSocket('ws://localhost:8082');

    // Cuando el cliente se conecta al websocket
    ws.addEventListener('open', () => {
        console.log("We are connected!");
    });

    // Cuando el cliente recibe un mensaje
    ws.addEventListener('message', e => {
        AddVisualMessage(e.data);
    });

    // Cuando el cliente se desconecta del websocket
    ws.addEventListener('close', () => {
        console.log("We are disconnected!");
    });

    // Cuando se presiona el boton "Send" se manda un mensaje
    document.getElementById('send-message').onclick = () => SendMessage();
}

function SendMessage() {
    const textInput = document.getElementById('message');
    const text = textInput.value;
    // Revisa si el texto sin espacios es nada
    if (text.trim() === '') return;

    ws.send(text);

    AddVisualMessage(text, "your");

    document.getElementById('message').value = '';
}

function AddVisualMessage(message, owner = "others") {
    const chat = document.getElementById('chat');

    chat.innerHTML += `
        <div class="${owner}-message">
            <span>${message}</span>
        </div>
    `;

    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: 'smooth'
    });
}