import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Reveal } from "./Animate";
import WeatherIcon from "./WeatherIcon";

const Root = styled.div`
    display: flex;
    flex-flow: row;
    margin-top: 16px;
    font-size: 1em;
    justify-content: center;
`;

const Column = styled.div`
    min-width: 56px;
    padding: 8px;
    text-align: center;
`;

const Row = styled.div`
    padding: 4px 0;
`;

interface IProps {
    data: Array<IColumn>
}

export interface IColumn {
    time: number,
    icon: string,
    temperature: number,
}

const FutureWeather: React.FC<IProps> = props => {

    return (
        <Root>
            <Reveal direction="up">
                {props.data.map(({ time, icon, temperature }, i) => (
                    <Column key={i}>
                        <Row>
                            {i === 0 ? "Now" : moment.unix(time).format("HH:mm")}
                        </Row>
                        <Row>
                            <WeatherIcon icon={icon} />
                        </Row>
                        <Row>
                            {Math.round(temperature)}&deg;
                        </Row>
                    </Column>
                ))}
            </Reveal>
        </Root>
    )
}

export default FutureWeather;