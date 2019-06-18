import React, { Component } from 'react' ;

class CountdownTimer extends Component{
  constructor(props){
    super(props);

    this.state={
      remain: this.props.duration,
    }
  }

 intervalID = 0;

  componentDidMount(){
      this.intervalID = setInterval( () => {
        console.log("Interval ID: "+this.intervalID, this.props.fireState,this.state.remain);

        this.setState({ remain: this.state.remain - 1})
        this.props.handlePause(this.state.remain,this.props.fireState);
        if(this.state.remain <= 0) {
          clearInterval(this.intervalID);
          this.props.onStop();
        }
      }, 1000);
  }

  componentWillUmount(){
    console.log("====================Umount");
    clearInterval(this.intervalID);
  }

  render(){
    const bgColors = {"Cyan" : "#37BC9B",};

    return (
      <div style={{backgroundColor:bgColors.Cyan}}>
        <>{this.props.fireState}{this.props.duration}秒</>
      </div>
    );
  }
}

export default CountdownTimer;
