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
    <p>
      material ui <br></br>
    https://www.youtube.com/watch?v=8-sn405JX1Q&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=41
    </p>
    <p>testing:
    <br />
    https://www.youtube.com/watch?v=_DzBez4qMi0&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=10
    </p>
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
