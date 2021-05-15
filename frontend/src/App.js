import React, { Component } from "react";
import "./App.css";
import { connect, sendMsg } from "./api";

class App extends Component {
    constructor(props) {
        super(props);
        connect();
    }

    send() {
        console.log("hello");
        sendMsg("hello");
    }

    login() {
        var task = "login"
        var message = { userid : "2a17f4qe9ob3nd2mc8105m" }
        sendMsg(JSON.stringify({ task, message }));
    }

    render() {
        return ( 
            <div className = "App">
                <button onClick = { this.send  }> Hit   </button> 
                <button onClick = { this.login }> Login </button> 
            </div>
        );
    }
}

export default App;