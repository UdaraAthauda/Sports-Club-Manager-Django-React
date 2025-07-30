import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Menu from './Menu';
import ShortMenu from './ShortMenu';
import logo from '../../assets/football.png'
import IconButton from '@mui/material/IconButton';


const drawerWidth = 240;
const shortDrawerWidth = 80;

export default function Navbar({content}) {

  const [isBigMenu, setIsBidMenu] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

          <IconButton sx={{marginRight:'20px', color:'white'}} onClick={() => setIsBidMenu(!isBigMenu)}>
            {isBigMenu ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <img width="5%" src={logo} alt="logo" />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: isBigMenu ? drawerWidth : shortDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: isBigMenu ? drawerWidth : shortDrawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />

          {isBigMenu ? <Menu /> : <ShortMenu />} {/* load navbar menu items separately */}

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
            
            {content}  {/* load pages beside the navbar */}

      </Box>
    </Box>
  );
}
