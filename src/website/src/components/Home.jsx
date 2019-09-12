import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className="container d-flex justify-content-center">
                <div class="col-12 col-md-6 order-md-1" >

                    <h1 class="display-3">
                        LBS-Dashboard, <br />
                        <span class="text-primary">simply look & go</span>.
                    </h1>

                    <p class="lead text-muted mb-6 mb-md-8">
                        It's a perfectly engineered pice of software that's deployed to your wall.
                    </p>

                    <p class="lead text-muted mb-6 mb-md-8">
                        <span className="text-primary"> - What's time is it? </span> Check the wall! <br />
                        <span className="text-primary"> - What's the weather? </span> Check the wall! <br />
                        <span className="text-primary"> - What's todays food? </span> Check the wall!  <br />
                        <span className="text-primary"> - When does the next bus departure? </span> <br />
                        <br />
                        Well... you know what to do.
                    </p>

                </div >
            </div >
        )
    }
}

export default Home;