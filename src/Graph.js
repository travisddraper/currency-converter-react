import React from 'react';

export default function Graph(props) {


    return (
        <div id="graph" className="functionContainer"> 
            <h1 className="title graphTitle">USD to EUR Graph</h1>
            <div className="graph">
                <div className="warning">Add some cash above, and let's check out that rate!</div>
            </div>
        </div>
    )
}