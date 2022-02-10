import { Component } from 'react';
import { ThemeContext } from './App';

export default class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: props.initialCount
        }
    }
    render() {
        return (
            <ThemeContext.Consumer>
                {style => (
                    <div>
                        <h1>{this.state.count}</h1>
                        <button style={style} onClick={() => this.changeCount(1)}>Increase</button>
                        <button style={style} onClick={() => this.reset()}>Reset</button>
                        <button style={style} onClick={() => this.changeCount(-1)}>Decrease</button>
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
    changeCount(amount) {
        this.setState(prevState => {
            return { count: prevState.count + amount }
        })
    }
    reset() {
        this.setState( () => {
            return { count: 0 }
        })
    }
}