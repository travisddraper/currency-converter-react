import React from 'react';
import { MDBIcon } from "mdbreact";
import {Link} from "react-router-dom";

export default class Layout extends React.Component {
    
    expanderFunction(event) {
        const boxExp = event.target.parentNode
        const overlay = document.getElementById('blackOverlay');
        
        if(boxExp.getAttribute('expanded') === 'false') {
            boxExp.setAttribute('expanded', 'true')
            overlay.style.display = "block"
        } else {
            boxExp.setAttribute('expanded', 'false')
            overlay.style.display = "none" 
        }
    }

    render() {
        const {baseValue} = this.props
        const soloCheck = baseValue? 'soloCheckInactive' : 'soloCheckActive';
        return (
            <div className="container">
                <div className="specialLinks">
                    <Link to="/portfolio">Portfolio</Link>
                </div>
                <a id="topTag"></a>
                <div id="blackOverlay"></div>
                <div className="layoutRow row">
                    <div className={`layoutBox converterBox col-10 col-xl-10 ${soloCheck}`}>
                        {this.props.converter}
                    </div>
                    {baseValue
                    ? <>                
                        <div className="layoutBox chartBox  col-10 col-xl-3" expanded="false">
                            <a id="chartTag"></a>
                            <MDBIcon icon="expand" type="button" className="expander" onClick={this.expanderFunction} />
                            {this.props.chart}
                        </div>
                        <div className="layoutBox graphBox col-10 col-xl-3" expanded="false">
                            <a id="graphTag"></a>
                            <MDBIcon icon="expand" type="button" className="expander" onClick={this.expanderFunction} />
                            {this.props.graph}
                        </div>
                        <div className="layoutBox destinationBox col-10 col-xl-3" expanded="false">
                            <a id="destinationsTag"></a>
                            <MDBIcon icon="expand" type="button" className="expander" onClick={this.expanderFunction} />
                            {this.props.destination}
                        </div>
                        </>
                    : null
                    } 

                </div>
            </div>
            
        )
    }
}