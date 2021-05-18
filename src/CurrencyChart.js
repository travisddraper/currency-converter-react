import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map'

const DataRow = (props) => {
  const{baseValue, currency, rate} = props
 
  const price = (baseValue, rate) => ( (baseValue * rate).toLocaleString() )

  return (
    <div className="row tableRow dataRow">
      <div className="data dataCurrency col-4">{currency}</div>
      <div className="data dataRate col-4">{rate}</div>
      <div className="data dataAmount col-4">{price(baseValue, rate)}<span className="currencySymbol"> {getSymbolFromCurrency(currency)}</span></div>
    </div>
    )
}

const HeadRow = (props) => {

  return (
    <div className="row tableRow headRow">
      <div className="data col-4">Currency</div>
      <div className="data col-4">Exchange Rate</div>
      <div className="data col-4">Amount</div>
    </div>
  )
}


class Chart extends React.Component {
  constructor(props) {
    super(props)
  }



    render() {
      const { rates, base, baseValue } = this.props
      const { currencyRates } = rates

      return (
        <div className="currencyChart">

          <div className="table">
            <h1 className="chartTitle">Convert <span className="currencyChartChoice">{base}</span> to ...</h1>
            <HeadRow />
            <div id="chartValues">
            {(() => {
              return currencyRates.map((currency) => {
                let cur, rate;
                for(const key in currency) {
                  cur = key;
                  rate = currency[key];
                }
                return <DataRow key={cur} currency={cur} rate={rate} baseValue={baseValue} />
              })
            })()}
            </div>
          </div>
        </div>
      )
    }
    
}

export default Chart