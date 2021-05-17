import React from 'react';

class DataRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="row tableRow dataRow">
        <div className="data">USD</div>
        <div className="data">1.15</div>
        <div className="data">50.00</div>
      </div>
    )
  }
}


class Chart extends React.Component {
  constructor(props) {
    super(props)
  }

    render() {

      return (
        <div className="currencyChart">
          <div className="table">
            <h1 className="chartTitle">Convert <span className="currencyChartChoice">{this.props.base}</span> to ...</h1>
            <div className="row tableRow headRow">
              <div className="data">Forgein Currency</div>
              <div className="data">Exchange Rate</div>
              <div className="data">Amount</div>
            </div>
            <DataRow />
            <DataRow />
            <DataRow />
            <DataRow />
            <DataRow />
          </div>
        </div>
      )
    }
    
}

export default Chart