import React, { Component } from 'react';
import './tag.css'

export default class Tags extends Component {
    onClickTag = () => {
        const {onClick, name} = this.props;
        onClick(name)
    }
    
  render() {
    return (
      <button className={`tag ${this.props.isActive && 'tag__selected'}`} onClick={this.onClickTag}>
            <div>{this.props.title}</div>
            <div className='tag__data'>{this.props.length}</div>
      </button>
    )
  }
}
