import React from 'react'
import ReactDOM from "react-dom";
import anime, { AnimeInstance } from "animejs";
import { StyleSheet, css } from "aphrodite/no-important";


/**
 * Reveal animation components
 */
interface IRevealControllerProps {
    children: React.ReactNode
}

interface IRevealControllerState {
    up: Array<object>;
    down: Array<object>;
    isHiding: boolean;
    isRevealing: boolean;
}

interface IContext {
    addRefs: CallableFunction;
    reveal: CallableFunction;
    hide: CallableFunction;
}

const func = () => { };
export const RevealContext = React.createContext<IContext>({ addRefs: func, reveal: func, hide: func });

export class RevealController extends React.Component<IRevealControllerProps, IRevealControllerState> {
    constructor(props: IRevealControllerProps) {
        super(props);
        this.state = {
            up: [],
            down: [],
            isHiding: false,
            isRevealing: false
        }
    }

    addRefs = (direction: "up" | "down", newRefs: any) => {
        const newState = (state: IRevealControllerState) => {
            const _ = { up: state.up, down: state.down };
            _[direction] = [...state[direction], ...newRefs];
            return _;
        };

        this.setState(newState);
    }

    animate = () => {
        if (this.state.isHiding) return;
        anime({
            targets: this.state.up,
            translateY: -100,
            direction: 'reverse',
            opacity: [1, 0],
            easing: "easeInExpo",
            delay: (el, i) => i * 100,
        })
        anime({
            targets: this.state.down,
            translateY: -100,
            direction: 'reverse',
            opacity: [1, 0],
            easing: "easeInExpo",
            delay: (el, i) => i * 100,
        })
    }

    hide = () => {
        anime.timeline({
            targets: this.state.up,
            easing: "easeInExpo",
            delay: (el, i) => i * 100,
        })
            .add({
                translateY: -100,
                opacity: [1, 0],
            })
            .add({
                translateY: 0
            });

        anime.timeline({
            targets: this.state.down,
            easing: "easeInExpo",
            delay: (el, i) => i * 100,
        })
            .add({
                translateY: -100,
                opacity: [1, 0],
            })
            .add({
                translateY: 0
            });
    }

    render() {
        return (
            <RevealContext.Provider value={{
                addRefs: this.addRefs,
                reveal: this.animate,
                hide: this.hide
            }}>
                {this.props.children}
            </RevealContext.Provider>
        )
    }
}


interface IReveal {
    children: React.ReactNode;
    direction: "up" | "down";
}

const styles = StyleSheet.create({
    hidden: {
        opacity: 0
    }
})

export class Reveal extends React.Component<IReveal> {

    static contextType = RevealContext;

    componentDidUpdate(prevProps: IReveal) {
        if (prevProps.children !== this.props.children) {
            this.context.addRefs(this.props.direction, Object.values(this.refs));
        }
    }

    render() {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children, (element, idx) => (
                    React.cloneElement(
                        element as React.ReactElement<any>,
                        { ref: idx, className: css(styles.hidden) }
                    )
                ))}
            </React.Fragment>
        )
    }
}

/**
 * Loading animation components
 */

interface ILoadingProps {
    children: React.ReactNode;
    loading: boolean;
}

interface ILoadingState {
    nodes: Array<SVGPathElement>;
    close: boolean;
    completed: boolean;
}

export class Loading extends React.Component<ILoadingProps, ILoadingState> {
    constructor(props: ILoadingProps) {
        super(props);
        this.state = {
            nodes: [],
            close: false,
            completed: false,
        }

        this.anim = null;
    }

    static contextType = RevealContext;
    anim: AnimeInstance | null;

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps: ILoadingProps, prevState: ILoadingState) {
        if (prevProps.loading !== this.props.loading) {
            if (this.props.loading) {
                this.play();
            } else {
                if (this.state.completed) {
                    this.reverse();
                }
            }
        }

        if (prevState.completed !== this.state.completed) {
            if (this.state.completed) {
                if (!this.props.loading) {
                    this.reverse();
                }
            }
        }
    }

    play = () => {
        this.anim?.play();
    }

    reverse = () => {
        this.anim?.play();
        this.anim?.reverse();
    }

    init = async () => {
        const nodes: Array<SVGPathElement> = [];
        await Object.values(this.refs).forEach(ref => {
            const node = ReactDOM.findDOMNode(ref);
            if (node && node instanceof Element) {
                const path = node.querySelector("path");
                if (path instanceof SVGPathElement) {
                    nodes.push(path);
                }
            }
        });

        this.anim = anime({
            targets: nodes,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1000,
            loop: true,
            autoplay: false,
            loopComplete: anim => {
                anim.pause();
                if (this.state.completed) {
                    this.context.reveal();
                }
                if (!this.state.completed) {
                    this.setState({ completed: true });
                }
            }
        })

    }

    render() {
        return React.Children.map(this.props.children, (el, ref) => (
            React.cloneElement(el as React.ReactElement<any>, { ref })
        ))
    }

}

