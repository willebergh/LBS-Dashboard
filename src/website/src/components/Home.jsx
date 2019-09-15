import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super();
        this.state = {

        }

    }
    render() {
        return (
            <div className="min-vh-100 d-flex align-items-center pt-5 pb-5" style={{ marginTop: "-88px" }}>
                <div class="container pt-5">
                    <div class="row align-items-center">
                        <div class="col-12 col-md-6 order-md-2">

                            <div class="img-skewed img-skewed-left mb-8 mb-md-0">
                                <img src="https://landkit.goodthemes.co/assets/img/screenshots/desktop/dashkit.jpg" alt="..." class="screenshot img-fluid mw-md-130 aos-init aos-animate" data-aos="img-skewed-item-left" data-aos-delay="100" />
                            </div>

                        </div>
                        <div class="col-12 col-md-6 order-md-1 pt-md-0 pt-5">

                            <h1 className="font-weight-light">
                                LBS-Dashboard, <br />
                                <span className="text-primary">simply look & go.</span>
                            </h1>

                            <p class="lead text-muted mb-6 mb-md-8">
                                A perfectly engineered piece of software on your wall.
                                <br />
                                <span className="text-primary"> - What's time is it? </span> Check the wall! <br />
                                <span className="text-primary"> - What's todays food? </span> Check the wall!  <br />
                                <span className="text-primary"> - When does the next bus departure? </span> <br />
                                Well... you know what to do.
                            </p>

                            <a href="#!" class="btn btn-primary mr-1">
                                Checkout the demo
                            </a>
                            <a href="#!" class="btn btn-primary-soft">
                                Learn more
                            </a>

                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

export default Home;