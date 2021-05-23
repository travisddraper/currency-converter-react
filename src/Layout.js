import React from 'react';


export default function Layout(props) {

    return (
        <div className="container">
            <div className="layoutRow row">
                <div className="layoutBox converterBox col-10">
                    {props.converter}
                </div> 
                <div className="layoutBox chartBox col-3">
                    {props.chart}
                </div>
                <div className="layoutBox graphBox col-3">
                    {props.graph}
                </div>
                <div className="layoutBox destinationBox col-3">
                    {props.destination}
                </div>
            </div>
        </div>
        
    )
}