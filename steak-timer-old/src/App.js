import React, { Component } from 'react';
import './App.css';
import CountdownTimer from './CountdownTimer.js'

class App extends Component {
  constructor(props){
    super(props);

    this.handlePause = this.handlePause.bind(this);

    this.state = {
      countState: 'stop', // Current state & the state that be in pause(?)
      smallFire30: 3,  // Fix number for fire (Better use const ???)
      strongFire30:3, // The same (as preline)
      curFireSec: { fire:'', time:{}}, // For paused state: to record the rest of seconds
      isPaused: false, //
    }
  }

  handlePause = (time, fire) => {
    //if(!this.state.pause && this.state.countState!='stop'){
    //const curFireSec = this.state.curFireSec || {};
    //curFireSec[fire]=time;
    let curFireSec = Object.assign({}, this.state.curFireSec);
    curFireSec.fire = fire;
    curFireSec.time = time;
    this.setState({ curFireSec });
    //console.log(this.state.curFireSec);
    //}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <p style={ {fontSize:20}}>ステーキの焼き方</p>
          { this.state.countState === 'step1' ?
          <CountdownTimer
            duration={this.state.curFireSec.time || this.state.smallFire30}
            fireState={"AAA"}
            isPaused={this.state.isPaused}
            onStop={()=>{this.setState({ countState : 'step2', curFireSec: this.state.smallFire30})}}
            handlePause={this.handlePause}
          />
          : <div>強火{this.state.isPaused && this.state.countState==='step1' ? this.state.curFireSec : this.state.smallFire30}秒</div>
        }
        ↓
        { !this.state.isPaused && this.state.countState === 'step2' ?
        <CountdownTimer
          duration={this.state.curFireSec}
          fireState={"強火B"}
          isPaused={this.state.isPaused}
          onStop={()=>{this.setState({ countState : 'step3', curFireSec: this.state.smallFire30})}}
          handlePause={this.handlePause}
        />
        : <div>強火{this.state.isPaused && this.state.countState==='step2' ? this.state.curFireSec : this.state.smallFire30}秒</div>
      }
      ↓
      <div>裏返し</div>
      ↓
      { !this.state.isPaused && this.state.countState === 'step3' ?
      <CountdownTimer
        duration={this.state.curFireSec}
        fireState={"弱火C"}
        isPaused={this.state.isPaused}
        onStop={()=>{this.setState({ countState : 'step4', curFireSec: this.state.smallFire30})}}
        handlePause={this.handlePause}
      />
      : <div>弱火{this.state.isPaused && this.state.countState==='step3'?this.state.curFireSec : this.state.smallFire30}秒</div>
      }
      ↓
      { !this.state.isPaused && this.state.countState === 'step4' ?
      <CountdownTimer
      duration={this.state.curFireSec}
      fireState={"弱火D"}
      isPaused={this.state.isPaused}
      onStop={()=>{this.setState({ countState : 'step1', curFireSec: this.state.smallFire30})}}
      handlePause={this.handlePause}
      />
      : <div>弱火{this.state.isPaused && this.state.countState==='step4'?this.state.curFireSec : this.state.smallFire30}秒</div>
      }

      <table>
        <tbody>
          <tr>
            <td>
              <button onClick={()=>{this.setState({ countState : 'step1', curFireSec: this.state.smallFire30, pause:false })}}>START</button>
            </td>
            <td>
              {this.state.isPaused && this.state.countState!='stop' ?
                <button onClick={()=>{this.setState({ isPaused: false });console.log("RESUME!!!");}}>RESUME</button>
                : <button onClick={()=>{this.setState({ isPaused: true });console.log("!!!PAUSE!!!");}}>PAUSE</button>
              }
            </td>
            <td>
              <button onClick={()=>{this.setState({ countState : 'stop', isPaused: false})}}>STOP</button>
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
