import React, { Component } from 'react';
import '../css/card.css'

export class Card extends Component {
  render() {
    return (
      <div className='todo__card'>
            <div>{this.props.title}</div>
            <div>{this.props.data}</div>
      </div>
    )
  }
}

export default Card