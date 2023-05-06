import { emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametrosUrl = new URLSearchParams(window.location.search);
const nomeDocumento = parametrosUrl.get("nome");

const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documentos sem Título";

const textoEditor = document.getElementById('editor-texto');

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumento: nomeDocumento})
})

function  atualizaTextoEditor(texto) {
    textoEditor.value = texto;
}

export {atualizaTextoEditor};