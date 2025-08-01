import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Typography, Button } from "@mui/material";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../forms/Message";

const Delete = () => {
  const param = useParams();
  const id = param.id;

  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  const GetData = () => {
    AxiosInstance.get(`footballclub/${id}/`)
      .then((res) => setData(res.data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    GetData();
  }, []);

  const DeleteRecord = (e) => {
    e.preventDefault();
    AxiosInstance.delete(`footballclub/${id}/`)
      .then(() => {
        setMessage(
          <Message messageText={"successfully deleted!"} messageColor={"red"} />
        );

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <form onSubmit={DeleteRecord}>
        {message}

        <Box className="TopBar">
          <HighlightOffIcon />
          <Typography
            sx={{ marginLeft: "15px", fontWeight: "bold" }}
            variant="subtitle2"
          >
            Are you sure you want to Delete this club details
          </Typography>
        </Box>

        <Box className="TexBox">
          <Typography>
            You will be deleting the club: <strong>{data.name}</strong> from{" "}
            <strong>{data.city}</strong>
          </Typography>
        </Box>

        <Box sx={{ marginTop: "30px" }}>
          <Button type="submit" variant="contained" fullWidth>
            Delete
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Delete;
