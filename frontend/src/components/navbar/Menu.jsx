import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import AxiosInstance from "../Axios";

export default function Menu() {
  const [open, setOpen] = React.useState(true);
  const [clubs, setClubs] = React.useState([]);

  const GetData = () => {
    AxiosInstance.get(`country/`)
      .then((res) => setClubs(res.data));
  };

  React.useEffect(() => {
    GetData();
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Football clubs
          </ListSubheader>
        }
      >
        <ListItemButton
          onClick={handleClick}
          component={Link}
          to="/"
          selected={path === "/"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="All clubs" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>

          {clubs.map((club, index) => {
            return (
            <List component="div" disablePadding key={club.id}>
              <ListItemButton sx={{ pl: 4 }} component={Link} to={`details/${club.id}`}>
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
                <ListItemText primary={club.name} />
              </ListItemButton>
            </List>
            )
          })}

        </Collapse>
      </List>

      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Creating Records
          </ListSubheader>
        }
      >
        <ListItemButton
          component={Link}
          to="/create"
          selected={path === "/create"}
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Create Clubs" />
        </ListItemButton>
      </List>
    </>
  );
}
