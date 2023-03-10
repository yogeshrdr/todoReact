import React, { Component } from 'react';
import './sidemodal.css';

export default class SideModal extends Component {
  render() {
    return (
        <div className={`sidemodal__container ${this.props.isOpen === true ? 'fadein' : 'fadeout'}` }>
            <div className={`sidemodal ${this.props.isOpen === true ? 'slidein' : 'slideout'}`}>
                {this.props.children}
            </div>
        </div>
    )
  }
}
