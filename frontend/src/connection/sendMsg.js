var sendMsg = (socket, task, message) => {
    let msg = JSON.stringify({ task, message })
    console.log("sending msg:", msg);
    socket.send(msg)
}

export default sendMsg