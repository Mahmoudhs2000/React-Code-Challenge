import { useState } from 'react'
import './App.css'
import Queue from './components/Queue'

function App() {
  const [item, setItem] = useState(null)
  const [count, setCount] = useState(0)

  const reset = () => {setItem(null); setCount(0);}

  return (
    <div className="App">
        <form onSubmit={(e) => { e.preventDefault(); setItem(count) }} >
            <input 
              type="number" 
              value={count} 
              onChange={({target})=> setCount(target.value)} 
              min={0} 
              name="count" 
              required />
            <button type="submit">Checkout</button>
        </form>
      <section>
        <Queue newItem={item} reset={reset} />
      </section>
    </div>
  )
}

export default App
