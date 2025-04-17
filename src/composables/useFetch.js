// import { useQuery } from '@vue/apollo-composable'
// import { WebSocketLink } from '@apollo/client/link/ws'
// import gql from 'graphql-tag'
// import { watchEffect } from 'vue'
// export function useGraphQL() {
//   const ALL_DEVICES = gql`
//     query {
//       Devices {
//         name
//       }
//     }
//   `

//   const { result } = useQuery(ALL_DEVICES)

// watchEffect(async () => {
//   data.value = {}
//   error.value = ''

//   const urlValue = toValue(url)

//   try {
//     const res = await fetch(urlValue)
//     data.value = await res.json()
//   } catch (err) {
//     error.value = err
//   }
// })
// return {  }
// }
