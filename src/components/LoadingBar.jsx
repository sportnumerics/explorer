import React from 'react';

class LoadingBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxProgress: props.maxProgress || 90,
      increase: props.increase || 5,
      percentage: 0
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState(state => {
        return {
          ...state,
          percentage:
            state.percentage < state.maxProgress
              ? state.percentage + state.increase
              : state.percentage
        };
      });
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="loading-bar-container">
        <span className="bar" style={{ width: this.state.percentage + '%' }} />
      </div>
    );
  }
}

export default LoadingBar;
