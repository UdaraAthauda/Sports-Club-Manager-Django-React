import React, { useEffect, useState } from "react";
import AxiosInstance from "./Axios";
import { Box, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextForm from "../forms/TextForm";
import SelectForm from "../forms/SelectForm";
import MultiSelectForm from "../forms/MultiSelectForm";
import DescriptionForm from "../forms/DescriptionForm";
import Button from "@mui/material/Button";
import { useFormik } from "formik";

const Create = () => {
  const [country, setCountry] = useState([]);
  const [league, setLeague] = useState([]);
  const [characteristic, setCharacteristic] = useState([]);

  const GetData = () => {
    AxiosInstance.get(`country/`)
      .then((res) => setCountry(res.data))
      .catch((error) => alert(error));

    AxiosInstance.get(`league/`)
      .then((res) => setLeague(res.data))
      .catch((error) => alert(error));

    AxiosInstance.get(`characteristic/`)
      .then((res) => setCharacteristic(res.data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    GetData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      attendence: "",
      city: "",
      country: "",
      league: "",
      characteristic: [],
    },
    
    onSubmit: (values) => {
      AxiosInstance.post(`footballclub/`, values).then(()=>{alert("Successfull data submission")}).catch((error)=>{alert(error)});
    }

  });

  
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
      <Box className="TopBar">
        <AddBoxIcon />
        <Typography
          sx={{ marginLeft: "15px", fontWeight: "bold" }}
          variant="subtitle2"
        >
          Create a new club
        </Typography>
      </Box>

      <Box className="FormBox">
        <Box className="FormArea">
          <TextForm
            label={"Club name"}
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Box sx={{ marginTop: "30px" }}>
            <TextForm
              label={"City"}
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>

          <Box sx={{ marginTop: "30px" }}>
            <SelectForm
              label={"League"}
              options={league}
              name="league"
              value={formik.values.league}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>

          <Box sx={{ marginTop: "30px" }}>
            <Button type="submit" variant="contained" fullWidth>
              Submit the data
            </Button>
          </Box>
        </Box>

        <Box className="FormArea">
          <SelectForm
            label={"Country"}
            options={country}
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Box sx={{ marginTop: "30px" }}>
            <TextForm
              label={"Attendence"}
              name="attendence"
              value={formik.values.attendence}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>

          <Box sx={{ marginTop: "30px" }}>
            <MultiSelectForm
              label={"Characteristic"}
              options={characteristic}
              name="characteristic"
              value={formik.values.characteristic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Box>
        </Box>

        <Box className="FormArea">
          <DescriptionForm
            label={"Description"}
            rows={9}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>
      </Box>
      </form>
    </>
  );
};

export default Create;
