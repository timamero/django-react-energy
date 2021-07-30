import axios from 'axios'
// const baseUrl = 'http://127.0.0.1:8000/energydata/'
const baseUrl = 'https://fc-energy.herokuapp.com/energydata/'

let config = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'get'
}

const getByRegion = (region) => {
  const request =  axios.get(`${baseUrl}${region}`, config)
  return request.then(response => response.data)
}

export default getByRegion