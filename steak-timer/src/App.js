import React, { Component } from 'react';
import './App.css';
import FireState from './FireState.js'

class App extends Component {
  constructor(props){
    super(props);

    this.timer = this.timer.bind(this);

    this.state = {
        currentState: "stop",
        remain:5,
        isPaused:false,
    }
  }

  timer = (time, nextState) => {
    this.setState( {remain: time} )
    this.interval = setInterval( () => {
      if(!this.state.isPaused)
        this.setState({ remain: this.state.remain - 1})
      console.log("NOW:", this.state.remain, nextState);
      if(this.state.remain <= 0 ) {
        clearInterval(this.interval);
        this.setState({currentState: nextState});
      }
      if(this.state.currentState === "stop")
        clearInterval(this.interval);
    }, 1000);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <p style={ {fontSize:20}}>ステーキの焼き方</p>
        { this.state.currentState === "step1" ?
          <FireState
            fireState={"強火"}
            timer={this.timer}
            startTime={3}
            nextState={"step2"}
            remain={this.state.remain}
          />
          :
           <div>強火{this.state.currentState!== "step1"? 3:this.state.remain }秒</div>
        }
        ↓
        { this.state.currentState === "step2" ?
          <FireState
            fireState={"強火"}
            timer={this.timer}
            startTime={3}
            nextState={"step-re"}
            remain={this.state.remain}
          />
          :
           <div>強火{this.state.currentState!=="step2"? 3:this.state.remain }秒</div>
        }
        ↓
        { this.state.currentState === "step-re" ?
          <FireState
            fireState={"裏返し"}
            timer={this.timer}
            startTime={2}
            nextState={"step3"}
            remain={this.state.remain}
          />
          :
        <div>裏返し2秒</div>
      }
        ↓
        { this.state.currentState === "step3" ?
          <FireState
            fireState={"弱火"}
            timer={this.timer}
            startTime={3}
            nextState={"step4"}
            remain={this.state.remain}
          />
          :
           <div>弱火{this.state.currentState!== "step3"? 3:this.state.remain }秒</div>
        }
        ↓
        { this.state.currentState === "step4" ?
          <FireState
            fireState={"弱火"}
            timer={this.timer}
            startTime={3}
            nextState={"fin"}
            remain={this.state.remain}
          />
          :
           <div>弱火{this.state.currentState!=="step4"? 3:this.state.remain }秒</div>
        }
        {
          this.state.currentState === "fin" ?
            <p style={ {fontSize:30, color:'red'}}>Finish!!</p>
          : <></>
        }
          <table>
            <tbody>
              <tr>
                <td>
                  <button onClick={()=>{this.setState({ currentState : "step1", isPaused:false})}}>START</button>
                </td>
                <td>
                  {this.state.isPaused && this.state.currentState!= "stop" ?
                    <button onClick={()=>{this.setState({ isPaused: false });console.log("RESUME!!!");}}>RESUME</button>
                    : <button onClick={()=>{this.setState({ isPaused: true });console.log("!!!PAUSE!!!");}}>PAUSE</button>
                  }
                </td>
                <td>
                  <button onClick={()=>{this.setState({ currentState : "stop", isPaused:false})}}>STOP</button>
                </td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
