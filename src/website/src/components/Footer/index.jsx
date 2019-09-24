import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#EEEEEE" }}>

                <div className="container">

                    <div className="row justify-content-around">


                        <div className="pr-3 pl-3 pt-5">
                            <div className="d-flex align-items-center flex-column">

                                <h6 className="font-weight-bold text-uppercase text-grey-700 text-center">
                                    lbs-dashboard
                                </h6>

                                <p className="text-center">
                                    A perfectly engineered <br />piece of software on your wall.
                                </p>

                            </div>
                        </div>

                        <div className="pr-3 pl-3 pt-5">
                            <div className="d-flex align-items-center flex-column">

                                <h6 className="font-weight-bold text-uppercase text-grey-700">
                                    have you?
                                </h6>

                                <p className="text-center">
                                    Checked out the <Link to="/demo">dashboard demo</Link>?
                                    <br />
                                    Played around with the <Link to="/dashboard">desktop version</Link>?
                                    <br />
                                    If you haven't, you should.


                                </p>

                            </div>
                        </div>

                        <div className="pr-3 pl-3 pt-5">
                            <div className="d-flex align-items-center flex-column">

                                <h6 className="font-weight-bold text-uppercase text-grey-700">
                                    contact
                                </h6>

                                <p className="text-center">
                                    You can contact us by email:
                                    <br />
                                    <a href="mailto:willebergh@outlook.com">
                                        willebergh@outlook.com
                                    </a>
                                    <br />
                                    <a href="mailto:henry.dickenson@lbs.se">
                                        henry.dickenson@lbs.se
                                    </a>
                                </p>

                            </div>
                        </div>

                    </div>

                    <div className="p-3">
                        <div className="d-flex align-items-center flex-column">

                            <div className="d-flex flex-wrap justify-content-center text-muted">
                                <div className="text-center pr-1">
                                    This site was published by
                                </div>
                                <div className="text-center d-inline">
                                    <a href="https://willebergh.io" target="_blank" rel="noopener noreferrer">William Bergh</a>
                                    {" & "}
                                    <a href="https://www.lbs.se/stockholmnorra/" target="_blank" rel="noopener noreferrer">
                                        LBS Stockholm Norra
                                    </a>.
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div >
        );
    }
}

export default Footer;