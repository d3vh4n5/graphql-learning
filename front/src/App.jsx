import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(()=>{
    fetch('http://localhost:4000',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: `
        query{
          allPersons{
            name
            phone
          }
        }
      `})
    })
    .then(res => res.json())
    .then(res=>{
      console.log(res.data)
    })


  }, [])

  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
