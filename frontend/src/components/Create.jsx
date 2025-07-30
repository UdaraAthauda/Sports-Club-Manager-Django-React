import React, { useEffect, useState } from 'react'
import AxiosInstance from './Axios'

const Create = () => {

  const [country, setCountry] = useState([]);
  const [league, setLeague] = useState([]);
  const [characteristic, setCharacteristic] = useState([]);

  console.log(country, league, characteristic)

  const GetData = () => {
    AxiosInstance.get(`country/`).then((res) => setCountry(res.data)).catch((error) => alert(error));
    
    AxiosInstance.get(`league/`).then((res) => setLeague(res.data)).catch((error) => alert(error));
    
    AxiosInstance.get(`characteristic/`).then((res) => setCharacteristic(res.data)).catch((error) => alert(error));
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <div>Create</div>
  )
}

export default Create