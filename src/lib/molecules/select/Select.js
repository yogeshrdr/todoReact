import React, { Component } from 'react';
import './select.css';

export default class Select extends Component {
  onChangeSelect = (event) => {
    const {onChange} = this.props;
    onChange(event);
  }

  render() {
    return (
      <div className='selectcontainer'>
        <label>{this.props.label}</label>
        <select 
        name={this.props.name}
        onChange={this.onChangeSelect} 
        value={this.props.value}>
            {this.props.options.map((option) => (
                <option key={option.value} value={option.value}>{option.title}</option>
            ))}
        </select>
      </div>
    )
  }
}
