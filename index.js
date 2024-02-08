
/**
 * Puedo usar los modulos de EMC6 porque tengo en el pakacge.json el 
 * "type": "module", entonces no import con el "require"
 */

import { gql, UserInputError, ApolloServer } from "apollo-server";
import { v1 as uuid } from 'uuid'
import axios from 'axios'

const persons = [
    {
        "id": 1,
        "name": "Midudev",
        "phone": "123-456-7890",
        "street": "Main Street 123",
        "city": "City A",
        "age": 33
    },
    {
        "id": 2,
        "name": "Dapelu",
        "street": "Central Avenue 456",
        "city": "City B"
    },
    {
        "id": 3,
        "name": "asdolo94",
        "phone": "555-555-5555",
        "street": "Guernica 777",
        "city": "City C"
    },
    {
        "id": 4,
        "name": "Ana Martínez",
        "phone": "111-222-3333",
        "street": "North Avenue 987",
        "city": "City D"
    },
    {
        "id": 5,
        "name": "Laura Rodríguez",
        "phone": "999-888-7777",
        "street": "South Street 654",
        "city": "City E"
    }
]   

const typeDefinitions = gql`
    enum YesNo{
        YES
        NO
    }

    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        id: ID!
        address: Address!
        check: String!
        canDrink: Boolean
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person]!
        findPerson(name: String!): Person
    }

    type Mutation{
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
        editNumber(
            name: String!
            phone: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personCount: ()=> persons.length,
        // allPersons: ()=> persons,
        allPersons: async (root, args)=> {
            const {data: personsFromRestApi} = await axios.get('http://localhost:3000/persons')
            if (!args.phone) return personsFromRestApi

            return persons.filter(person=>{
                return args.phone === "YES" ? person.phone : !person.phone
            })

            // const byPhone = person => 
            //     args.phone === "YES" ? person.phone : !person.phone
            // return persons.filter(byPhone)
        },
        // allPersons: ()=> {
        //     return persons.map(person => ({
        //         id: person.id,
        //         name: person.name,
        //         phone: person.phone ?? '', // Si phone es null, se establece como una cadena vacía
        //         street: person.street ?? null, // Si street es null, se establece como una cadena vacía
        //         city: person.city, // No es necesario el manejo especial aquí, ya que city no es nullable en el esquema GraphQL
        //     }));
        // }
        findPerson: (root, args)=>{
            const {name} = args
            return persons.find(person=> person.name === name)
        },
        
    },
    Mutation: {
        addPerson: (root, args)=>{
            if (persons.find(p=> p.name === args.name)){
                throw new UserInputError("Name must be unique", {
                    invalidArgs: args.name
                })
            }
            // const { name, phone, street, city } = args
            const person = {...args, id: uuid()}
            persons.push(person) // update database with new person
            return person
        },
        editNumber: (root, args) => {
            const personIndex = persons.findIndex(p => p.name === args.name)
            if (!personIndex === -1) return null

            const person = persons[personIndex]

            const updatedPerson = {...person, phone: args.phone}
            persons[personIndex] = updatedPerson
            return updatedPerson
        }
    },
    Person: {
        address: (root)=>{
            return {
                street: root.street,
                city: root.city
            }
        }
    }
    // Person: {
    //     address: (root)=> `${root.street}, ${root.city}`,
    //     check: ()=> "Jan",
    //     canDrink: (root) => root.age > 18
    // }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})

// https://www.youtube.com/watch?v=QG-qbmW-wes
// https://www.youtube.com/watch?v=3vldzoNRz-8
// 
// 
// https://www.youtube.com/watch?v=ndQ6nWeQ7A0&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=47