import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io();

function  emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto)
})

function selecionarDocumento(nomeDocumento) {
    socket.emit("selecionar_documento", nomeDocumento, (texto) => {
        atualizaTextoEditor(texto)
    });
}

function emitirExcluirDocumento(nomeDoc) {
    socket.emit('excluir_documento', nomeDoc);
}

socket.on("atualizar_interface_documento_excluido", (docNome) => {
    alertarERedirecionar(docNome);
})

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});

// socket.on("texto_documento", (texto) => {
//     atualizaTextoEditor(texto)
// })

export {emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };