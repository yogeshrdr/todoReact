import React, { Component } from 'react';
import '../css/card.css'

export class Card extends Component {

    onClickCard = () => {
        const {onFilterChange, data} = this.props;
        onFilterChange(data.name)
    }
  render() {
    return (
      <button className={`todo__card ${this.props.isActive && 'todo_cardSelected'}`} onClick={this.onClickCard}>
            <div>{this.props.title}</div>
            <div className='todo_cardData'>{this.props.data.length}</div>
      </button>
    )
  }
}

export default Card