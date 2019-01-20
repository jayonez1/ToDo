import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class First extends Component<Props> {
  render() {
    return (
      <div>
        <h1> FIRST PAGE </h1>
        <div>
          <button onClick={ () => this.props.getSt() }> Get ST </button>
        </div>
        <div>
          {
            this.props.testReducers.map((st, index) =>
              <p key={index}>{st}</p>
            )
          }
        </div>
        <Link to="/second">
            Go Second Page
        </Link>
      </div>
    );
  }
}

export default First;
