import React, { Component } from 'react';
import './button.css'

export default class Button extends Component {
    onClickBtn = (event) => {
        const {onClick} = this.props;
        onClick(event);
    }

  render() {
    return (
      <button 
      type={this.props.type}
      onClick={this.onClickBtn}
      className={this.props.btnType}
      disabled={this.props.disabled}
      name={this.props.name}
      >
        {this.props.children}
       </button>
    )
  }
}
