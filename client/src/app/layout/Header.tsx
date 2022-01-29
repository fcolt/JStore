import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { MaterialUISwitch } from "./DarkModeSwitch";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
  {title: 'Catalog', path: '/catalog'},
  {title: 'About', path: '/about'},
  {title: 'Contact', path: '/contact'}
]

const rightLinks = [
  {title: 'Login', path: '/login'},
  {title: 'Register', path: '/register'}
]

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h5',
  '&:hover': {
      color:'grey.500'
  },
  '&.active':{
      color: 'text.secondary'
  }
}

export default function Header({darkMode, handleThemeChange}: Props) {
  const { user } = useAppSelector(state => state.account);
  const {basket} = useAppSelector(state => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              {isMobile ? (//---------------------------------------------MOBILE--------------------------------------------------------
              <>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <List sx={{display: 'block'}}>
                      {midLinks.map(({title, path}) => (
                        <ListItem
                          component={NavLink}
                          to={path}
                          key={path}
                          sx={navStyles}                      
                        >
                          {title}
                        </ListItem>
                      ))}
                      {user &&
                      <ListItem
                          component={NavLink}
                          to={'/inventory'}
                          sx={navStyles}                      
                        >
                          Inventory
                      </ListItem>}
                  </List>
                </Menu>
                <Typography 
                    variant='h6' 
                    component={NavLink} 
                    to='/' 
                    sx={navStyles}
                  >
                      JStore
                  </Typography>
                <MaterialUISwitch 
                  checked={darkMode} 
                  onChange={handleThemeChange}
                />
              </Box>

              <Box display='flex' alignItems='center'>
                
              </Box>

              <Box display='flex' alignItems='center'>
                  <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
                    <Badge badgeContent={itemCount} color='secondary'>
                      <ShoppingCart />                  
                    </Badge>
                  </IconButton>
                  <Tooltip title="Connect">
                  <IconButton onClick={handleOpenUserMenu} sx={{color: 'inherit'}}>
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <List sx={{display: 'block'}}>
                      {rightLinks.map(({title, path}) => (
                        <ListItem
                          component={NavLink}
                          to={path}
                          key={path}
                          sx={navStyles}                      
                        >
                          {title}
                        </ListItem>
                      ))}
                    </List>
                  </MenuItem>
                </Menu>
              </Box>
              </>
              ) : ( //---------------------------------------------------DESKTOP-----------------------------------
              <>
              <Box display='flex' alignItems='center'>
                <Typography 
                    variant='h6' 
                    component={NavLink} 
                    to='/' 
                    sx={navStyles}
                  >
                      JStore
                  </Typography>
                  <MaterialUISwitch 
                    checked={darkMode} 
                    onChange={handleThemeChange}
                  />
              </Box>

              <List sx={{display: 'flex'}}>
                  {midLinks.map(({title, path}) => (
                    <ListItem
                      component={NavLink}
                      to={path}
                      key={path}
                      sx={navStyles}                      
                    >
                      {title}
                    </ListItem>
                  ))}
                  {user &&
                  <ListItem
                      component={NavLink}
                      to={'/inventory'}
                      sx={navStyles}                      
                    >
                      Inventory
                  </ListItem>}
              </List>  
                
              <Box display='flex' alignItems='center'>
                  <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
                    <Badge badgeContent={itemCount} color='secondary'>
                      <ShoppingCart />                  
                    </Badge>
                  </IconButton>
                  <Tooltip title="Connect">
                    <IconButton onClick={handleOpenUserMenu} sx={{color: 'inherit'}}>
                      <LoginIcon />
                    </IconButton>
                  </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <List sx={{display: 'block'}}>
                      {rightLinks.map(({title, path}) => (
                        <ListItem
                          component={NavLink}
                          to={path}
                          key={path}
                          sx={navStyles}                      
                        >
                          {title}
                        </ListItem>
                      ))}
                    </List>
                  </MenuItem>
                </Menu>
              </Box>
              </>
              )}
            </Toolbar>
        </AppBar>
      </Box>
    )
}