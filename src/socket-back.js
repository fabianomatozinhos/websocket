
import { atualizaDocumento, encontarDocuemnto, excluirDocumento, obterDocumentos, salvarDocumento } from "./documentosDb.js";
import io from "./servidor.js";


io.on("connection", (socket) => {

    socket.on("obter_documentos", async (callbackDevolverDocumentos) => {
        const documentos = await obterDocumentos();
        callbackDevolverDocumentos(documentos)
    })

    socket.on("adicionar_documento", async(nomeDoc) => {

        const documentoExiste = (await encontarDocuemnto(nomeDoc)) !== null;

        if (documentoExiste) {
            socket.emit('documento_existente', nomeDoc);
        }else{
            const resultado = await salvarDocumento(nomeDoc);  

            if (resultado.acknowledged) {
                io.emit("atualizar_interface", nomeDoc)
            }
        }
    })

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento);

        const documento = await encontarDocuemnto(nomeDocumento) ;

        if (documento) {
            //socket.emit("texto_documento", documento.texto);
            devolverTexto(documento.texto)
        }
    });

    socket.on('texto_editor', async ({texto, nomeDocumento}) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit('texto_editor_clientes', texto)
        }
    });

    socket.on('excluir_documento', async (nomeDocumentos) => {
        const retorno =  await excluirDocumento(nomeDocumentos);

        if (retorno.deletedCount) {
            io.emit("atualizar_interface_documento_excluido", nomeDocumentos)
        }
        //return docuemntoExcluido;
    })

    // socket.on("disconnect", (motivo) => {
    //     console.log(`Cliente "${socket.id}" desconectado!
    //     Motivo: ${motivo}`);
    // });

    // socket.on('texto_editor', (texto) => {
    //     console.log(texto)
    //     //manda para todos até para quem esta mandando
    //     //io.emit("texto_editor_clientes", texto)

    //     // manda para todos os destinatarios conectados nesse socket
    //     socket.broadcast.emit("texto_editor_clientes", texto)
    // });
});

