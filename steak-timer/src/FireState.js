import React, { Component } from 'react';

class FireState extends Component {
  constructor(props){
    super(props);

  }

    componentDidMount(){
      this.props.timer(this.props.startTime, this.props.nextState);
    }

  render() {
      const bgColors = {"Cyan" : "#37BC9B",};

      return (
        <div style={{backgroundColor:bgColors.Cyan}}>
          <>{this.props.fireState}{this.props.remain}秒</>
        </div>
      );
  }
}

export default FireState;
