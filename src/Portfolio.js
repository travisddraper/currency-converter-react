import React from "react";
import FakeProfile from './images/profile.jpeg';
import { Footer } from './Nav.js'



function Portfolio() {


    return (
        <div className="container">
            <div className="portfolio row">
                <div className="bioPicture col-8 col-md-5">
                    <img className="img-fluid" src={FakeProfile} alt="Profile of designer" />
                </div>
                <div className="col-11 col-md-7 bio">
                    <p>
                        Thanks for checking out my currency converting web app <b>Travel Money</b>! If you enjoyed this app, please be sure to check out my <a href="#portfolio">Portfolio</a> or my social media links found below!
                    </p>
                </div>
            </div>
            <Footer location="portfolioFooter" />
        </div>
    )

}

export default Portfolio