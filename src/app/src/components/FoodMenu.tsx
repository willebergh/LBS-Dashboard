import React from "react";
import styled from "styled-components";
import { Reveal } from "./Animate";

const Root = styled.div`
    text-align: center;
    padding: 16px;
`;

const Header = styled.div`
    padding-bottom: 16px;
    font-weight: 500;
`;

const HeaderText = styled.span`
    padding: 4px;
    border-bottom: solid 1px;
    border-color: inherit;  
`;

interface IProps {
    data: IFoodMenu
}

export interface IFoodMenu {
    restaurant: string;
    menuItems: Array<string>
}

const FoodMenu: React.FC<IProps> = props => {

    return (
        <Root>
            <Reveal direction="down">
                <Header>
                    <HeaderText>
                        Today @ {props.data.restaurant}
                    </HeaderText>
                </Header>

            </Reveal>
            <Reveal direction="up">
                {props.data.menuItems.map((_, i) => (
                    <div key={i}>
                        {_}
                    </div>
                ))}
            </Reveal>

        </Root>
    )
}

export default FoodMenu;