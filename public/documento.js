import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametrosUrl = new URLSearchParams(window.location.search);
const nomeDocumento = parametrosUrl.get("nome");

const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documentos sem Título";

const textoEditor = document.getElementById('editor-texto');

const botaoExcluir = document.getElementById('excluir-documento');

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumento: nomeDocumento})
})

function  atualizaTextoEditor(texto) {
    textoEditor.value = texto;
}

botaoExcluir.addEventListener('click', () => {
    emitirExcluirDocumento(nomeDocumento);
})

function alertarERedirecionar(nomeDoc){
    if(nomeDoc === nomeDocumento){
        alert(`O documento ${nomeDoc} foi excluído com sucesso`);
        window.location.href = "/";
    }
}

export {atualizaTextoEditor, alertarERedirecionar};