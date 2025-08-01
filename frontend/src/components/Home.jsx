import { useState, useEffect, useMemo } from "react";
import {Link} from 'react-router-dom'
import { Box, Typography, Chip, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { MaterialReactTable } from "material-react-table";
import AxiosInstance from "./Axios";

const Home = () => {
  const [data, setData] = useState([]);

  const GetData = () => {
    AxiosInstance.get(`footballclub/`).then((res) => setData(res.data));
  };

  useEffect(() => {
    GetData();
  }, []);

  // table columns creation with 'material-react-table' package
  const columns = useMemo(() => [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "country_details.name", header: "Country" },
    { accessorKey: "league_details.name", header: "League" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "attendence", header: "Attendence" },
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
  ]);

  return (
    <>
      <Box className="TopBar">
        <CalendarViewMonthIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          View all clubs
        </Typography>
      </Box>

      <MaterialReactTable
       columns={columns} 
       data={data}
       enableRowActions
       renderRowActions={({row}) => (
        <Box sx={{display:'flex', flexWrap:'nowrap', gap:'8px'}}>
          <IconButton color="primary" component={Link} to={`edit/${row.original.id}`}>
            <EditIcon />
          </IconButton>

          <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
            <DeleteForeverIcon />
          </IconButton>
        </Box>
       )
       }
      />
    </>
  );
};

export default Home;
