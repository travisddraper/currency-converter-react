import React from "react";
import FakeProfile from './images/profile.jpeg';



class Portfolio extends React.Component {

    render() {

        return (
            <div className="portfolio row">
                <div className="bioPicture col-8 col-md-5">
                    <img className="img-fluid" src={FakeProfile} />
                </div>
                <div className="col-11 col-md-7 bio">
                    <p>
                        Thanks for checking out my Currency Converter web app <b>Travel Money</b>! If you enjoyed this app, its functionality, and/or its stylings, please be sure to check out my <a href="#" target="_blank">Portfolio</a> or my social media links found below!
                    </p>
                </div>
            </div>
          )
    }

}

export default Portfolio