export interface IWeatherData {
    time: number;
    summary: string;
    icon: string;
    precipIntensity: number;
    precipProbability: number;
    precipType: string;
    temperature: number;
    apparentTemperature: number;
    dewPoint: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windGust: number;
    windBearing: number;
    cloudCover: number;
    uvIndex: number;
    visibility: number;
    ozone: number;
}

export interface IWeatherHourly {
    data: IWeatherData[];
    icon: string;
    summary: string;
}

export interface IWeather {
    alerts: any[];
    city: string;
    currently: IWeatherData;
    daily: object;
    flags: object;
    hourly: IWeatherHourly;
    latitude: number;
    longitude: number;
    offset: number;
}

export interface IRestaurantDay {
    day: string;
    menu: string[];
}

export interface IRestaurantWeek {
    title: string;
    nr: number;
    days: IRestaurantDay[];
}

export interface IRestaurant {
    name: string;
    displayName: string;
    today: IRestaurantDay;
    thisWeek: IRestaurantWeek;
}

export interface ISLRealtimeBus {
    GroupOfLine: null;
    TransportMode: string;
    LineNumber: string;
    Destination: string;
    JourneyDirection: number;
    StopAreaName: string;
    StopAreaNumber: number;
    StopPointNumber: number;
    StopPointDesignation: null
    TimeTabledDateTime: string;
    ExpectedDateTime: string;
    DisplayTime: string;
    JourneyNumber: number;
    Deviations: null;
}

export interface ISLRealtime {
    Metros: any[];
    Buses: ISLRealtimeBus[];
    Trains: any[];
    Trams: any[];
    Ships: any[];
    StopPointDeviations: any[];
    siteId: string;
    LatestUpdate: string;
    DataAge: number;
}

export interface ISocketError {
    message: string;
    type: string;
}

export interface IDashboardConfig {
    key: string;
    dashboardName: string;
    deploymentName: string;
    restaurant: string;
    station: string;
    weather: string;
    token: string;
    refreshToken: string;
}