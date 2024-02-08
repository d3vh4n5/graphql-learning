import { gql, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'


const FIND_PERSON = gql`
query findPersonByName ($nameToSearch: String!){
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`




const Persons = ({ persons 
}) => {

    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)

    console.log({person})

    const showPerson = name => {
        getPerson({variables: {nameToSearch: name}})
        console.log("Funcion showPerson ejecutada")
    }

    useEffect(()=>{
        if (result.data){
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person){
        return(

            <div>
                <h2>{person.name}</h2>
                <div>{person.address.street}</div>
                <div>{person.phone}</div>
                <button onClick={()=> setPerson(null)}>close</button>
            </div>
        )
    }

    if (persons ===null) return null

    return (
        <div>
            <h2>Persons</h2>
            <p>min 46</p>
            https://www.youtube.com/watch?v=sVFocedf-iU&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=48
            {
                persons.map(p=><div key={p.id} onClick={()=>{showPerson(p.name)}}>
                    {p.name}{p.phone}
                </div>)
            }
        </div>
    )
}

export default Persons