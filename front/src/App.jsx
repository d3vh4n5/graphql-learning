import { useEffect } from 'react'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'

const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`


function App() {


  const { data, error, loading } = useQuery(ALL_PERSONS)

  console.log(data)

  if (error) return <span>{error}</span>

  return (
    <>
      {
        loading 
          ? <p>Loading...</p>
          : (
            <>
              <h1>GraphQL+ React</h1>
              <Persons persons={data?.allPersons}/>
              {
                // data && data.allPersons.map(person=>person.name).join(', ')
              }
            </>
          )
      }
    </>
  )
}

export default App
