import axios from 'axios'

function login() {
  // axios
  //   .post('/api/account/login', {
  //     username: 'rua',
  //     password: '123456'
  //   })
  //   .then((response) => {
  //     console.log(response)
  //   })
  //   .catch((error) => console.error(error))
  fetch('/api', {
    method: 'GET'
  })
    .then((response) => console.log(response))
    .catch((error) => console.error(error))
}

export default login
