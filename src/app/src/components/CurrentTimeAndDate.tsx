import React from 'react'
import styled from "styled-components";
import moment from "moment";
import { Reveal } from "./Animate";

const Root = styled.div`
    font-weight: 300;
    text-align: center;
`;

const Day = styled.div`
    font-size: 4em;
`;

const Date = styled.div`
    font-size: 3em;
`;

const Time = styled.div`
    font-size: 6em;
`;

interface IProps {

}

const CurrentTimeAndDate: React.FC<IProps> = props => {
    const [day, setDay] = React.useState<string>("");
    const [date, setDate] = React.useState<string>("");
    const [time, setTime] = React.useState<string>("");

    React.useEffect(() => {
        clock();
        updateState();
    }, []);

    const clock = () => {
        setInterval(updateState, 1000);
    }

    const updateState = () => {
        const _ = moment();
        setDay(_.format("dddd"));
        setDate(_.format("D MMMM"));
        setTime(_.format("HH:mm"));
    }

    return (
        <Root>
            <Reveal direction="up">
                <Day>{day}</Day>
                <Date>{date}</Date>
                <Time>{time}</Time>
            </Reveal>
        </Root>
    )
};

export default CurrentTimeAndDate;