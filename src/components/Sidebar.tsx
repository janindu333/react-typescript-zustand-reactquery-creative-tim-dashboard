import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Drawer } from '@mui/material';
import { Home, People, Assignment, MoreHoriz, Menu, ChevronLeft } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const DrawerContainer = styled('div')(({ theme }) => ({
  width: '240px',
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  boxShadow: theme.shadows[3],
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        {open ? <ChevronLeft /> : <Menu />}
      </IconButton>
      <Drawer variant="persistent" anchor="left" open={open}>
        <DrawerContainer>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Assignment />
              </ListItemIcon>
              <ListItemText primary="Care team" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <MoreHoriz />
              </ListItemIcon>
              <ListItemText primary="More" />
            </ListItem>
          </List>
        </DrawerContainer>
      </Drawer>
    </>
  );
};

export default Sidebar;
