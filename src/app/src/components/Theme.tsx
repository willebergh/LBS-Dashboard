import React from "react";

const style = {
    dark: {
        backgroundColor: "#000",
        color: "#fff"
    },
    light: {
        backgroundColor: "#fff",
        color: "#000"
    }
}

interface IThemeContext {
    theme: "light" | "dark";
    identify: CallableFunction;
    updateTheme: CallableFunction;
}

export const ThemeContext = React.createContext<IThemeContext>({
    theme: "light",
    identify: () => console.log("onDashboardIdentified"),
    updateTheme: () => console.log("updateTheme")
});

interface IProps {

}

interface IState {
    dark: boolean;
    isIdentifying: boolean;
    theme: "light" | "dark";
}

export class ThemeController extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            dark: false,
            isIdentifying: false,
            theme: "light"
        }
    }

    handleIdentification = () => {
        console.log("onDashboardIdentified");
        if (this.state.isIdentifying) {
            return;
        } else {
            this.setState({ isIdentifying: true });
            var i = 0;
            const interval: number = setInterval(() => {
                i++;
                if (i > 6) {
                    this.setState({ isIdentifying: false });
                    return clearInterval(interval);
                } else {
                    this.setState(state => ({ theme: state.theme === "light" ? "dark" : "light" }));
                }
            }, 500)
        }
    }

    updateTheme = (theme: "light" | "dark") => {
        this.setState({ theme });
    }

    render() {
        return (
            <ThemeContext.Provider value={{
                theme: this.state.theme,
                identify: this.handleIdentification,
                updateTheme: this.updateTheme
            }}>
                <div style={style[this.state.theme]}>
                    {this.props.children}
                </div>
            </ThemeContext.Provider>
        )
    }
}

