import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, gql, HttpLink, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/'
  })
})

// const query = gql`
//   query {
//     allPersons {
//       id
//       name
//       phone
//       address {
//         street
//         city
//       }
//     }
//   }
// `

// client.query({ query: query})
//   .then(res=>{
//     console.log(res.data)
//   })

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
