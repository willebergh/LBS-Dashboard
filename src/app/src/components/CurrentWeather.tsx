import React from "react";
import styled from "styled-components";
import { Reveal } from "./Animate";

const Root = styled.div`
    margin: 0 auto 32px;
    font-size: 2em;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Temperature = styled.div`
    font-size: 4em;
    font-weight: 300;
    margin-right: 16px;
`;

const DegUnit = styled.div`
    margin-bottom: 32px;
`;

const Deg = styled.span`
    font-size: 2em;
`;

const Unit = styled.span`
    font-size: 1.5em;
`;

const Summary = styled.div`
    text-align: center;
`;

interface IProps {
    data: ICurrentWeather;
}

export interface ICurrentWeather {
    temperature: number;
    summary: string;
}

const CurrentWeather: React.FC<IProps> = ({ data: { temperature, summary } }) => {

    return (
        <Root>
            <Reveal direction="up">
                <Container>
                    <Temperature>
                        {Math.round(temperature)}
                    </Temperature>
                    <DegUnit>
                        <Deg>&deg;</Deg>
                        <Unit>C</Unit>
                    </DegUnit>
                </Container>
                <Summary>
                    {summary}
                </Summary>
            </Reveal>
        </Root>
    )
}

export default CurrentWeather;