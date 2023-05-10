import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";

const socket = io();

socket.emit('obter_documentos', (callbackDevolverDocumentos) => {
    callbackDevolverDocumentos.forEach((doc) => {
        inserirLinkDocumento(doc.nome);
    });
});

function emitirAdicionarDocumento(nome)
{
    socket.emit("adicionar_documento", nome);
}

socket.on("atualizar_interface", (nomeNovoDocSalvo) => {
    inserirLinkDocumento(nomeNovoDocSalvo);
})

socket.on("documento_existente", (docExiste) => {
   alert(`O documento ${docExiste} já existe`);
})

socket.on("atualizar_interface_documento_excluido", (nomeDocumento) => {
    removerLinkDocumento(nomeDocumento);
})

export {emitirAdicionarDocumento};