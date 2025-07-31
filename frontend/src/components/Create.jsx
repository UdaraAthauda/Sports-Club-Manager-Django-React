import React, { useEffect, useState } from 'react'
import AxiosInstance from './Axios'
import {Box , Typography} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from '../forms/TextForm';
import SelectForm from '../forms/SelectForm';
import MultiSelectForm from '../forms/MultiSelectForm';
import DescriptionForm from '../forms/DescriptionForm';
import Button from '@mui/material/Button';

const Create = () => {

  const [country, setCountry] = useState([]);
  const [league, setLeague] = useState([]);
  const [characteristic, setCharacteristic] = useState([]);


  const GetData = () => {
    AxiosInstance.get(`country/`).then((res) => setCountry(res.data)).catch((error) => alert(error));
    
    AxiosInstance.get(`league/`).then((res) => setLeague(res.data)).catch((error) => alert(error));
    
    AxiosInstance.get(`characteristic/`).then((res) => setCharacteristic(res.data)).catch((error) => alert(error));
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <>
      <Box className='TopBar'>
        <AddBoxIcon />
        <Typography sx={{marginLeft: '15px', fontWeight: 'bold'}} variant='subtitle2'>Create a new club</Typography>
      </Box>

      <Box className='FormBox'>
        <Box className='FormArea'>
        
          <TextForm label={'Club name'} />
   
          <Box sx={{marginTop: '30px'}}>
            <TextForm label={'City'} />
          </Box>
          
          <Box sx={{marginTop: '30px'}}>
            <SelectForm label={'League'} options={league} />
          </Box>

          <Box sx={{marginTop: '30px'}}>
            <Button variant="contained" fullWidth>Submit the data</Button>
          </Box>
        </Box>


        <Box className='FormArea'>
          <SelectForm label={'Country'} options={country} />

          <Box sx={{marginTop: '30px'}}>
            <TextForm label={'Attendence'} />
          </Box>
          
          <Box sx={{marginTop: '30px'}}>
            <MultiSelectForm label={'Characteristic'} options={characteristic} />
          </Box>
        </Box>


        <Box className='FormArea'>
          <DescriptionForm label={'Description'} rows={9} />
        </Box>
      </Box>
    </>
  )
}

export default Create