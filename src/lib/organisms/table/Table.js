import React, { Component } from 'react';
import './table.css';

export default class Table extends Component {
  render() {
    return (
      <table>
        <thead>
            <tr>
                {this.props.head.map((data, index) => (
                    <th key={index}>{data.name}</th>
                ))}
            </tr>
        </thead>

        <tbody>
            {
              this.props.body.map((ele) => (
                <tr key={ele.id}>
                  {this.props.head.map((data, index) => (
                    <td key={index}>
                      {data.renderer(ele[data.dataKey])}
                    </td>
                  ))}
                </tr>
              ))
            }
            {/* {this.props.body.map((data) => (
              <tr key={data.id}>
                {this.props.head.map((ele)=>(
                  <td key={ele.name}>
                    <div>
                      {data[ele.name] === null ? '-' : data[ele.name]}
                    </div>
                  </td>
                ))}
              </tr>
            ))} */}
        </tbody>
      </table>
    )
  }
}
