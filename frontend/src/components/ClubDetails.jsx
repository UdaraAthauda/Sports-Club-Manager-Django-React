import {useState, useEffect, useMemo} from 'react'
import {useParams} from 'react-router-dom'
import AxiosInstance from './Axios'
import {Box, Typography, Chip} from '@mui/material'
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { MaterialReactTable } from "material-react-table";

const ClubDetails = () => {
  const param = useParams()
  const id = param.id 

  const [data, setData] = useState([])
  const [country, setCountry] = useState("")

  const GetData = () => {
    AxiosInstance.get(`footballclub/?country=${id}`).then((res) => setData(res.data)).catch((error) => alert(error));
    AxiosInstance.get(`country/${id}`).then((res) => setCountry(res.data.name)).catch((error) => alert(error));
  }

  useEffect(() => {
    if (id) {
      GetData()
    }
  }, [id])

  const columns = useMemo(() => [
    {accessorKey: 'name', header: 'Name'},
    {accessorKey: 'league_details.name', header: 'League'},
    {accessorKey: 'city', header: 'City'},
    {accessorKey: 'attendence', header: 'Attendence'},
    {
      accessorKey: "characteristics_names",
      header: "Characteristics",
      Cell: ({ cell }) => (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {cell.getValue()?.map((char, index) => (
            <Chip key={index} label={char} />
          ))}
        </div>
      ),
    },
    {accessorKey: 'description', header: 'Description'},
  ])

  console.log(data)

  return (
    <>
      <Box className="TopBar">
        <CalendarViewMonthIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          Sport clubs in: {country}
        </Typography>
      </Box>

      <MaterialReactTable columns={columns} data={data} />
    </>
  )
}

export default ClubDetails