import React from 'react';
import Converter from './Converter.js'


export default function Page(props) {
    const { handleCurrencyChange, currencyChangeBase, currencyChangeConvertTo, stateProps } = props
    const array = [...stateProps];
    return (
        <div>
            <Converter
                stateProps={stateProps}
                handleCurrencyChange={handleCurrencyChange} 
                currencyChangeConvertTo={currencyChangeConvertTo} 
                currencyChangeBase={currencyChangeBase}
            />
            {props.children}
        </div>
    )
}
