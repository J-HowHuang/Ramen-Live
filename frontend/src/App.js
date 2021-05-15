import React, { Component } from "react";
import "./App.css";
import { connect, sendMsg } from "./api";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receive: []
        }
        connect();
    }

    componentDidMount() {
        connect((msg) => {
            console.log("New Message")
            console.log(msg)
            this.setState(prevState => ({
                receive: [...this.state.receive, msg.data + "\n"]
            }))
            console.log(this.state);
        });
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

    getHomePage() {
        var task = "getHomePage"
        var message = { homepageshoplist : ["ggg", "pongstar", "ggb"] }
        sendMsg(JSON.stringify({ task, message }));
    }

    getRamenShopDetail() {
        var task = "getRamenShopDetail"
        var message = { shopid : "ggg" }
        sendMsg(JSON.stringify({ task, message }));
    }

    render() {
        return ( 
            <div className = "App">
                <button onClick = { this.send  }>               Hit                 </button> 
                <button onClick = { this.login }>               Login               </button> 
                <button onClick = { this.getHomePage }>         GetHomePage         </button> 
                <button onClick = { this.getRamenShopDetail }>  GetRamenShopDetail  </button> 

                <p> { this.state.receive } </p>
            </div>
        );
    }
}

export default App;