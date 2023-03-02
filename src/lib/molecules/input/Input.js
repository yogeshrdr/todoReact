import React, { Component } from 'react';
import './input.css';

export default class input extends Component {
  onChangeInput = (event) => {
      const {onChange} = this.props;
      onChange(event);
  }

  render() {
    return (
      <div className='inputcontainer'>
        <label>{this.props.label}</label>
        <input 
        name={this.props.name}
        type={this.props.type} 
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.onChangeInput}
        required={this.props.required}
        />
      </div>
    )
  }
}
