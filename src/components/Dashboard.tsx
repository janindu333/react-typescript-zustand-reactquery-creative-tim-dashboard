import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, Divider, Button, TextField, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { onSnapshot, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Make sure to export your db instance from firebaseConfig
import Sidebar from './Sidebar'; // Import the Sidebar component
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidenav from "../examples/Sidenav";
import Configurator from "../examples/Configurator";
import theme from "../assets/theme";
import themeDark from "../assets/theme-dark";
import routes from "../routes";
import { useMaterialUIController, setMiniSidenav } from "../context/index";
import brandWhite from "../assets/images/logo-ct.png";
import brandDark from "../assets/images/logo-ct-dark.png";

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const Content = styled('div')<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? '240px' : '0',
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Section = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(4),
}));

interface Notification {
  id: string;
  message: string;
  timestamp: any; // Use an appropriate type for timestamp
}

interface HistoryLog {
  id: string;
  message: string;
  timestamp: any; // Use an appropriate type for timestamp
}

interface Patient {
  id: string;
  name: string;
  details: string;
}

const Dashboard: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [history, setHistory] = useState<HistoryLog[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientDetails, setNewPatientDetails] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { state: controller, dispatch } = useMaterialUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;

  const [onMouseEnter, setOnMouseEnter] = useState(false);

  useEffect(() => {
    const unsubNotifications = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification)));
    });

    const unsubHistory = onSnapshot(collection(db, 'history'), (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HistoryLog)));
    });

    const unsubPatients = onSnapshot(collection(db, 'patients'), (snapshot) => {
      setPatients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Patient)));
    });

    return () => {
      unsubNotifications();
      unsubHistory();
      unsubPatients();
    };
  }, []);

  const handleAddPatient = async () => {
    if (!newPatientName || !newPatientDetails) {
      setError('Please enter both name and details.');
      setOpen(true);
      return;
    }

    try {
      await addDoc(collection(db, 'patients'), {
        name: newPatientName,
        details: newPatientDetails,
      });
      setNewPatientName('');
      setNewPatientDetails('');
    } catch (error: any) {
      setError(error.message);
      setOpen(true);
    }
  };

  const handleDeletePatient = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'patients', id));
    } catch (error: any) {
      setError(error.message);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <>
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="Care giver"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <Configurator />
      </>
      {/* <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes> */}
    </ThemeProvider>
  );
};

export default Dashboard;
