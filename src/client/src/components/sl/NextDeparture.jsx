import React, { Component } from 'react';
import axios from "axios";

class NextDeparture extends Component {
    constructor() {
        super();

        this.state = {
            ki: {},
            st_eriks: {},
            odenplan: {},

            journeys: []
        }
    }

    componentDidMount() {
        this.getDepartures();
    }

    async getDepartures() {
        await axios.get("http://localhost:5000/api/sl/realtime/3404")
            .then(res => {
                this.setState({ ki: res.data.ResponseData.Buses.filter(bus => bus.LineNumber === "53" && bus.JourneyDirection === 1) })
            })
            .catch(err => console.log(err));
        await axios.get("http://localhost:5000/api/sl/realtime/1059")
            .then(res => {
                this.setState({ st_eriks: res.data.ResponseData.Buses.filter(bus => bus.LineNumber === "53" && bus.JourneyDirection === 1) })
            })
            .catch(err => console.log(err));
        await axios.get("http://localhost:5000/api/sl/realtime/9117")
            .then(res => {
                this.setState({ odenplan: res.data.ResponseData.Buses.filter(bus => bus.LineNumber === "53" && bus.JourneyDirection === 1) })
            })
            .catch(err => console.log(err));

        this.sortJourneys()
    }

    async sortJourneys() {
        const { ki, st_eriks, odenplan, journeys } = this.state;

        await ki.forEach(departure => {
            if (!journeys.find(j => j.JourneyNumber === departure.JourneyNumber)) {
                journeys.push({ JourneyNumber: departure.JourneyNumber, stops: [departure] })
            }
        })

        function match(arr) {
            arr.forEach(d => {
                const target = journeys.find(journey => journey.JourneyNumber === d.JourneyNumber);
                if (target) {

                    target.stops.push(d)

                }
            })
        }

        match(st_eriks)
        match(odenplan)

        console.log(journeys)
    }

    render() {
        const { ki, st_eriks, odenplan } = this.state;
        return (
            <div>

            </div>
        );
    }
}

export default NextDeparture;