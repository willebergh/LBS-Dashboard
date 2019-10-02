import { Component } from 'react';
import { withRouter } from "react-router-dom";

class HeaderTitle extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        }
    }

    componentDidMount() {
        this.updateState();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            return this.updateState();
        }
    }

    updateState() {
        const { location, deployments } = this.props;
        var path = location.pathname.split("/");
        path.splice(0, 1);

        const setState = (title, noFormat) => {
            this.setState({ title: noFormat ? title : title.charAt(0).toUpperCase() + title.slice(1) });
        }

        if (path.length === 1) {
            return setState(path[0])
        } else if (path.length === 2) {
            return setState(path[1])
        } else if (path.length === 3) {
            return setState(deployments.find(d => d.name === path[1]).displayName, true);
        }

    }

    render() {
        return this.state.title;
    }
}

export default withRouter(HeaderTitle);