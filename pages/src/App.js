import React, { Component } from "react";
import { observer } from "mobx-react";
import TodoList from "./TodoList";
import logo from "./logo.svg";
import "./App.css";

const App = observer(
  class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <TodoList />
          <TodoList />
        </div>
      );
    }
  }
);

export default App;
