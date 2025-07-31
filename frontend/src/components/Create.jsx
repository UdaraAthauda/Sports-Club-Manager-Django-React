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
import * as yup from "yup";
import Message from "../forms/Message";
import {useNavigate} from 'react-router-dom';

const Create = () => {
  const [country, setCountry] = useState([]);
  const [league, setLeague] = useState([]);
  const [characteristic, setCharacteristic] = useState([]);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate()

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

  //--------------------form validation using yup---------------------//
  const validationSchema = yup.object({
    name: yup.string("The name must be text").required("Name is requred"),
    description: yup.string("Enter the club description").required("Requred"),
    attendence: yup.number("Must be a number").required("Requred"),
    characteristic: yup.array().min(1, "Select at least one option"),
  });

  //--------------------form handling using formik---------------------//
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

    // add created validations with yup 
    validationSchema: validationSchema,

    // form submision process
    onSubmit: (values) => {
      AxiosInstance.post(`footballclub/`, values)
        .then(() => {
          setMessage(
            <Message
              messageText={"Succesfully submitted!"}
              messageColor={"green"}
            />
          );

          setTimeout(() => {
            navigate('/')
          },1500)
        })
        .catch((error) => {
          alert(error);
        });
    },
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

        {message}

        <Box className="FormBox">
          <Box className="FormArea">
            <TextForm
              label={"Club name"}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <Box sx={{ marginTop: "30px" }}>
              <TextForm
                label={"City"}
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
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
                error={formik.touched.league && Boolean(formik.errors.league)}
                helperText={formik.touched.league && formik.errors.league}
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
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />

            <Box sx={{ marginTop: "30px" }}>
              <TextForm
                label={"Attendence"}
                name="attendence"
                value={formik.values.attendence}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.attendence && Boolean(formik.errors.attendence)
                }
                helperText={
                  formik.touched.attendence && formik.errors.attendence
                }
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
                error={
                  formik.touched.characteristic &&
                  Boolean(formik.errors.characteristic)
                }
                helperText={
                  formik.touched.characteristic && formik.errors.characteristic
                }
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
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Create;
