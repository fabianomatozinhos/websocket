import { documentosColecao } from "./dbConnect.js";

function obterDocumentos() {
    const documentos = documentosColecao.find().toArray();
    return documentos;
}

function salvarDocumento(nomeDoc){
    const resultado = documentosColecao.insertOne({
        nome: nomeDoc,
        texto: ""
    })

    return resultado;
}

function encontarDocuemnto(nome) {
    const documento = documentosColecao.findOne({
        nome: nome
    });
    return documento;
}

function atualizaDocumento(nome, textoDocumento) {
    const atualizacao = documentosColecao.updateOne({
        nome:nome
    }, {
        $set: {
            texto: textoDocumento
        }
    });

    return atualizacao;
}

function excluirDocumento(nomeDocumento) {
    const docExcluido = documentosColecao.deleteOne({
        nome:nomeDocumento
    });
    return docExcluido;
}



export {encontarDocuemnto, atualizaDocumento, obterDocumentos, salvarDocumento, excluirDocumento}