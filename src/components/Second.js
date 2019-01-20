import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class First extends Component<Props> {
  render() {
    return (
      <div>
        <h1> SECOND PAGE </h1>
        <Link to="/">
            Go First Page
        </Link>
      </div>
    );
  }
}

export default First;
