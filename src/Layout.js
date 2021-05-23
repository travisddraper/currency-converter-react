import React from 'react';


export default function Layout(props) {

    return (
        <div className="container">
            <div className="layoutRow row">
                <div className="layoutBox converterBox col-10 col-xl-10">
                    {props.converter}
                </div> 
                <div className="layoutBox chartBox mt-5 mb-5 mt-xl-0 mb-xl-0 col-10 col-xl-3">
                    {props.chart}
                </div>
                <div className="layoutBox graphBox mt-5 mb-5 mt-xl-0 mb-xl-0  col-10 col-xl-3">
                    {props.graph}
                </div>
                <div className="layoutBox destinationBox mt-5 mb-5 mt-xl-0 mb-xl-0  col-10 col-xl-3">
                    {props.destination}
                </div>
            </div>
        </div>
        
    )
}