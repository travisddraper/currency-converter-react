import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map'

const DataRow = (props) => {
  const{baseValue, currency, rate} = props
 
  const price = (baseValue, rate) => ( (baseValue * rate).toLocaleString() )

  return (
    <div className="row tableRow dataRow py-2">
      <div className="data dataCurrency col-4">{currency}</div>
      <div className="data dataRate col-4">{rate}</div>
      <div className="data dataAmount col-4"><span className="currencySymbol pr-1"> {getSymbolFromCurrency(currency)}</span>{price(baseValue, rate)}</div>
    </div>
    )
}

const HeadRow = () => {
  return (
    <div className="row tableRow headRow">
      <div className="data col-4">Currency</div>
      <div className="data col-4">Exchange Rate</div>
      <div className="data col-4">Amount</div>
    </div>
  )
}


function Chart(props) {

  const { rates, selections, conversion } = props.stateProps
  const { currencyRates } = rates
  const { base } = selections
  const { baseValue } = conversion

  return (
    <div id="chart" className="functionContainer">
      <h1 className="title chartTitle">Convert <span className="fontColorChoice">{base}</span> to ...</h1>
      <div className="currencyChart">  
        {baseValue == '' 
        ? <div className="warning">Add some cash above, and let's check out those conversions!</div> 
        :
        <>
        <HeadRow /> 
        <div className="table-responsive">
          <div id="chartValues" className="pt-2">
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
        </>
        }

    </div>

    </div>

  )
}

export default Chart