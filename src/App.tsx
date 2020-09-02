import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Cmps/Header/Header";
import Content from "./Cmps/Content/Content";

const App: React.FC<{}> = ({}) => {
    document.title = 'Todo list App'
  return (
    <div className="App">
      <Header/>
      <Content/>
    </div>
  );
}

export default App;
