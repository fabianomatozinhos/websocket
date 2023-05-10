import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb://127.0.0.1:27017/websocket");

let documentosColecao;

try {
    await cliente.connect();

    const db = cliente.db('websocket');
    documentosColecao = db.collection("documentos");

    console.log('conectado ao banco com sucesso');
} catch (error) {
    console.log(error)
}

export {documentosColecao}