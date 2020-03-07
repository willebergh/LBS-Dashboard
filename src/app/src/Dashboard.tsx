import React from "react";
import styled from "styled-components";
import CurrentTimeAndDate from "./components/CurrentTimeAndDate";
import CurrentWeather, { ICurrentWeather } from "./components/CurrentWeather";
import FutureWeather, { IColumn } from "./components/FutureWeather";
import Departures, { IDeparture } from "./components/Departures";
import FoodMenu, { IFoodMenu } from "./components/FoodMenu";
import Loading from "./components/Loading";
import { RevealController } from "./components/Animate";
import axios from "axios";
import { IWeather, IWeatherData, IRestaurant, ISLRealtime, ISocketError, IDashboardConfig } from "./types";
import io from "socket.io-client";
import { ThemeContext } from "./components/Theme";
import { RevealContext } from "./components/Animate";

const Root = styled.div`
    display: flex;
    flex-flow: column;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
    overflow: hidden;

`;

interface IHideProps {
    hide: boolean;
}

const Hide: React.FC<IHideProps> = props => {

    const Root = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.8);
        position: fixed;
        top: 0;
        left: 0;
    `;

    const Text = styled.div`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
    `;

    const { hide, reveal } = React.useContext(RevealContext);

    React.useEffect(() => {
        if (props.hide) {
            hide();
        } else {
            reveal();
        }
    }, [props.hide])

    return (
        <React.Fragment>
            {props.children}
            {props.hide && (
                <Root>
                    <Text>
                        <h1>Dashboard</h1>
                        <p>The system is shutting down</p>
                        {"See you soon"}
                    </Text>
                </Root>
            )}

        </React.Fragment>
    );
}

const Dashboard: React.FC = props => {
    const [hide, setHide] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState(false);
    const [currentWeatherData, setCurrentWeatherData] = React.useState<ICurrentWeather>({
        temperature: 0, summary: ""
    });
    const [futureWeatherData, setFutureWeatherData] = React.useState<Array<IColumn>>([]);
    const [departures, setDepartures] = React.useState<Array<IDeparture>>([]);
    const [foodMenu, setFoodMenu] = React.useState<IFoodMenu>({
        restaurant: "", menuItems: []
    });

    const { identify: onDashboardIdentified } = React.useContext(ThemeContext);

    React.useEffect(() => {
        setLoading(true);
        initSocket();
        updateAll();
    }, []);

    const initSocket = () => {
        const config: IDashboardConfig = JSON.parse(localStorage.getItem("dashboard-config") || "");
        const socket = io("/dashboards", { query: { token: config.token } });

        socket.on("error", (err: ISocketError) => {
            console.log(err)
            if (err.message === "jwt expired") {
                return refreshToken(config);
            }
        });

        const refreshToken = (config: IDashboardConfig) => {
            axios({ method: "post", url: "/api/auth/refresh-token", data: { config } })
                .then(res => {
                    if (res.data.msg === "success" && res.data.config) {
                        localStorage.setItem("dashboard-config", JSON.stringify(res.data.config));
                        return initSocket();
                    }
                })
        }

        socket.on("connect", () => {
            console.log("Successfully connected to socket!");
            socket.emit("dashboard-connect", config);

            socket.on("update-connected-dashboards", console.log);
            socket.on("update-station", updateDepartures);
            socket.on("update-weather", updateWeather);
            socket.on("update-restaurant", updateFoodMenu);

            socket.on("dashboard-identified", onDashboardIdentified);
            socket.on("dashboard-refresh", onDashboardRefresh);
            socket.on("dashboard-delete", onDashboardDelete);
        });
    }

    const updateAll = async () => {
        try {
            updateDepartures((await axios.get("/api/sl/realtime/3404")).data);
            updateWeather((await axios.get("/api/weather/stockholm")).data);
            updateFoodMenu((await axios.get("/api/restaurant/jonsjacob")).data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    const updateDepartures = (sl: ISLRealtime) => {
        console.log("updateDepartures");
        const newData: Array<IDeparture> = sl.Buses.filter(({ Destination, DisplayTime, LineNumber, StopAreaName }, i) => {
            const newData = { Destination, DisplayTime, LineNumber, StopAreaName };
            return i < 3 ? newData : false;
        })
        setDepartures(newData);
    }

    const updateWeather = (weather: IWeather) => {
        console.log("updateWeather");
        const newData = weather.hourly.data.filter((_: IWeatherData, i: number) => {
            const newData = { time: _.time, icon: _.icon, temperature: _.temperature };
            return i < 6 ? newData : false;
        })
        setFutureWeatherData(newData);
        setCurrentWeatherData(weather.currently);
    }

    const updateFoodMenu = (restaurant: IRestaurant) => {
        console.log("updateFoodMenu");
        const newData = {
            restaurant: restaurant.displayName,
            menuItems: restaurant.today.menu
        };
        setFoodMenu(newData);
    }

    const onDashboardRefresh = () => {
        console.log("onDashboardRefresh");
        setHide(true)
        setTimeout(() => {
            window.location.reload()
        }, 3000)
    }

    const onDashboardDelete = () => {
        console.log("onDashboardDelete");
        setHide(true)
        setTimeout(() => {
            localStorage.removeItem("dashboard-config");
            window.location.reload();
        }, 3000)
    }

    return (
        <RevealController>
            <Hide hide={hide}>
                <Loading loading={loading}>
                    <Root>
                        <CurrentTimeAndDate />
                        <CurrentWeather data={currentWeatherData} />
                        <FutureWeather data={futureWeatherData} />
                        <Departures data={departures} />
                        <FoodMenu data={foodMenu} />
                    </Root>
                </Loading>
            </Hide>
        </RevealController>
    )
}

export default Dashboard;