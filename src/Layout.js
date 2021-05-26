import React from 'react';
import { MDBIcon } from "mdbreact";


export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    
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

    componentDidMount() {
        document.getElementById('base').value=this.props.baseValue;
        document.getElementById('convertTo').value=this.props.convertToValue;

        let expanders = document.getElementsByClassName('expander');
        Array.from(expanders).forEach((element) => {
            element.addEventListener('click', this.expanderFunction)
        })
    }

    componentDidUpdate() {
        let expanders = document.getElementsByClassName('expander');
        Array.from(expanders).forEach((element) => {
            element.addEventListener('click', this.expanderFunction)
        })

    }

    componentWillUnmount() {
        let expanders = document.getElementsByClassName('expander');
        Array.from(expanders).forEach((element) => {
            element.removeEventListener('click', this.expanderFunction);
        })
    }

    render() {
        const {baseValue} = this.props
        const soloCheck = baseValue? 'soloCheckInactive' : 'soloCheckActive';
        return (
            <div className="container">
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
                            <MDBIcon icon="expand" type="button" className="expander" />
                            {this.props.chart}
                        </div>
                        <div className="layoutBox graphBox col-10 col-xl-3" expanded="false">
                            <a id="graphTag"></a>
                            <MDBIcon icon="expand" type="button" className="expander" />
                            {this.props.graph}
                        </div>
                        <div className="layoutBox destinationBox col-10 col-xl-3" expanded="false">
                            <a id="destinationsTag"></a>
                            <MDBIcon icon="expand" type="button" className="expander" />
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