import React, { Component } from 'react';
import Button from '../../atoms/button/Button';
import './dropdown.css'


export default class Dropdown extends Component {
  render() {
    return (
        <div class="dropdown">
        <Button btnType={this.props.type} class="dropbtn" disabled={this.props.disabled}>{this.props.title}</Button>
        {this.props.disabled === false &&
          <div class="dropdown-content">
          {this.props.children}
        </div>
        } 
        </div>
    )
  }
};


