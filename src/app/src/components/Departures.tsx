import React from "react";
import styled from "styled-components";
import { Reveal } from "./Animate";

const Station = styled.div`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
`;

const Header = {
    Root: styled.div`
        padding: 16px;
        text-align: center;
        font-weight: 500;
    `,
    Text: styled.span`
        padding: 4px;
        border-bottom: solid 1px;
        border-color: inherit;
    `
}

const Departure = {
    Root: styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        &:first-child {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    `,
    LineNumber: styled.span`
        display: block;
        background-color: red;
        border-radius: 8px;
        padding: 4px 8px;
        color: #fff;
        font-weight: 500;
    `,
    Destination: styled.span`
        display: block;
        margin-left: 8px;
    `,
    DisplayTime: styled.span`
        display: block;
        flex-grow: 1;
        text-align: right;
    `
};

const Next = {
    Header: styled.div`
        padding-bottom: 0;
    `,
    Display: styled.div`
        text-align: center;
    `,
    Int: styled.span`
        font-size: 8em;
        font-weight: 300;
        letter-spacing: -8px;
    `,
    Unit: styled.span`
        margin-left: 8px
    `
}

interface IProps {
    data: Array<IDeparture>
}

export interface IDeparture {
    Destination: string,
    DisplayTime: string,
    LineNumber: string,
    StopAreaName: string,
}

const Departures: React.FC<IProps> = props => {

    const nextDisplayTime = props.data[0] ? props.data[0].DisplayTime : ""

    return (
        <div>
            <Station>
                <div>
                    <Reveal direction="down">
                        <Header.Root>
                            <Header.Text>
                                Buses @ {props.data.filter((_, i) => i === 0).map(({ StopAreaName }) => StopAreaName)}
                            </Header.Text>
                        </Header.Root>
                    </Reveal>
                    <Reveal direction="up">
                        {props.data.map(({ Destination, DisplayTime, LineNumber }, i) => (
                            <Departure.Root key={i}>
                                <Departure.LineNumber>
                                    {LineNumber}
                                </Departure.LineNumber>
                                <Departure.Destination>
                                    {Destination}
                                </Departure.Destination>
                                <Departure.DisplayTime>
                                    {DisplayTime}
                                </Departure.DisplayTime>
                            </Departure.Root>
                        ))}
                    </Reveal>
                </div>

                <div>
                    <Reveal direction="down">
                        <Header.Root>
                            <Header.Text>
                                Next departure in...
                            </Header.Text>
                        </Header.Root>
                    </Reveal>
                    <Reveal direction="up">
                        <Next.Display>
                            {nextDisplayTime.charAt(2) === ":" || nextDisplayTime.toLowerCase() === "nu" ? (
                                <Next.Int style={nextDisplayTime.charAt(2) === ":" ? { fontSize: "4em" } : {}}>
                                    {nextDisplayTime}
                                </Next.Int>
                            ) : (
                                    <React.Fragment>
                                        <Next.Int>
                                            {nextDisplayTime.split(" ")[0]}
                                        </Next.Int>
                                        <Next.Unit>
                                            {nextDisplayTime.split(" ")[1]}
                                        </Next.Unit>
                                    </React.Fragment>
                                )}
                        </Next.Display>
                    </Reveal>
                </div>
            </Station>
        </div>
    )
}

export default Departures;