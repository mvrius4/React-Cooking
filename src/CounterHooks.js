import { useState, useContext } from 'react'
import { ThemeContext } from './App'

export default function CounterHooks({ initialCount }) {
    const [count, setCount] = useState(initialCount)
    const style = useContext(ThemeContext)
    return (
        <div>
            <h1>{count}</h1>
            <button style={style} onClick={ () => setCount(prevCount => prevCount + 1)}>Increase</button>
            <button style={style} onClick={ () => setCount(prevCount => prevCount = 0)}>Reset</button>
            <button style={style} onClick={ () => setCount(prevCount => prevCount - 1)}>Decrease</button>
        </div>
    )
}