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

        return (
            <div className="container">
                <a id="topTag"></a>
                <div id="blackOverlay"></div>
                <div className="layoutRow row">
                    <div className="layoutBox converterBox col-10 col-xl-10">
                        {this.props.converter}
                    </div> 
                    <div className="layoutBox chartBox mt-5 mb-5 mt-xl-0 mb-xl-0 col-10 col-xl-3" expanded="false">
                        <a id="chartTag"></a>
                        <MDBIcon icon="expand" type="button" className="expander" />
                        {this.props.chart}
                    </div>
                    <div className="layoutBox graphBox mt-5 mb-5 mt-xl-0 mb-xl-0  col-10 col-xl-3" expanded="false">
                        <a id="graphTag"></a>
                        <MDBIcon icon="expand" type="button" className="expander" />
                        {this.props.graph}
                    </div>
                    <div className="layoutBox destinationBox mt-5 mb-5 mt-xl-0 mb-xl-0  col-10 col-xl-3" expanded="false">
                        <a id="destinationsTag"></a>
                        <MDBIcon icon="expand" type="button" className="expander" />
                        {this.props.destination}
                    </div>
                </div>
            </div>
            
        )
    }
}

/*

    componentDidUpdate() {
        let expanders = document.getElementsByClassName('expander');
        Array.from(expanders).forEach((element) => {
            if(this.props.expanders) {
                element.addEventListener('click', this.expanderFunction)
            } else {
                element.removeEventListener('click', this.expanderFunction);
            }
        })
    }
    */