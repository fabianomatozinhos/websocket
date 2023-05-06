import io from "./servidor.js";

io.on("connection", (socket) => {
    console.log('um cliente se conectou! ID: ', socket.id);
   
    // socket.on('texto_editor', (texto) => {
    //     console.log(texto)
    //     //manda para todos até para quem esta mandando
    //     //io.emit("texto_editor_clientes", texto)

    //     // manda para todos os destinatarios conectados nesse socket
    //     socket.broadcast.emit("texto_editor_clientes", texto)
    // });

    socket.on('texto_editor', ({texto, nomeDocumento}) => {
        //manda para todos até para quem esta mandando
        //io.emit("texto_editor_clientes", texto)

        // manda para todos os destinatarios conectados nesse socket
        socket.to(nomeDocumento).emit('texto_editor_clientes', texto)
    });

    socket.on("selecionar_documento", (nomeDocumento) => {
        //console.log(nomeDocumento)
        socket.join(nomeDocumento);
    });

    socket.on("disconnect", (motivo) => {
        console.log(`Cliente "${socket.id}" desconectado!
        Motivo: ${motivo}`);
    });
})