import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function  emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto)
})

function selecionarDocumento(nomeDocumento) {
    socket.emit("selecionar_documento", nomeDocumento);
}

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});

export {emitirTextoEditor, selecionarDocumento };