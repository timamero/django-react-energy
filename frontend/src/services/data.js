import axios from 'axios'
// const baseUrl = 'http://127.0.0.1:8000/energydata/'
const baseUrl = 'https://fc-energy.herokuapp.com/energydata/'

const getByRegion = (region) => {
  console.log('in get')
  const request =  axios.get(`${baseUrl}${region}`)
  return request.then(response => response.data)
}

export default getByRegion