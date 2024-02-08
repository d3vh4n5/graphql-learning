import { gql, ApolloServer } from "apollo-server";

const persons = [
    {
        id: 1,
        name: 'Juan',
        phone: '123-456-7890',
        street: 'Main Street 123',
        city: 'City A',
        age: 33
    },
    {
        id: 2,
        name: 'María García',
        street: 'Central Avenue 456',
        city: 'City B'
    },
    {
        id: 3,
        name: 'Carlos López',
        phone: '555-555-5555',
        street: 'Guernica 777',
        city: 'City C'
    },
    {
        id: 4,
        name: 'Ana Martínez',
        phone: '111-222-3333',
        street: 'North Avenue 987',
        city: 'City D'
    },
    {
        id: 5,
        name: 'Laura Rodríguez',
        phone: '999-888-7777',
        street: 'South Street 654',
        city: 'City E'
    }
]


const typeDefinitions = gql`
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
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: ()=> persons.length,
        allPersons: ()=> persons,
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