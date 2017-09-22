import React from 'react';
import './App.css';
import CssAnimation from './components/cssAnimation'
import WithReactMotion from './components/reactMotion'

class App extends React.Component {

  render() {  
    return (
      <div>
        { false ? <CssAnimation /> : <WithReactMotion />}
      </div>
    );
  }
}

export default App;
