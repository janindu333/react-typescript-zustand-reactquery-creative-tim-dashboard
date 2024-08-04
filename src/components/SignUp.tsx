import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import useStore from '../store';
import LinkButton from './LinkButton'; // Import the custom LinkButton

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
}));

const Form = styled('div')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: '400px',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const SubmitButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const TextFieldStyled = styled(TextField)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LoginButton = styled(LinkButton)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  color: '#000',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
}));

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const setUser = useStore(state => state.setUser);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setOpen(true);
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setOpen(true);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main">
      <Root>
        <Box display="flex" justifyContent="space-between" width="100%" maxWidth="400px" mb={2}>
          <Typography variant="h6">Companion</Typography>
          <LoginButton to="/login" variant="outlined">
            Login
          </LoginButton>
        </Box>
        <Form>
          <Typography variant="h5" component="h1">
            Create an account
          </Typography>
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full name"
            name="fullname"
            autoComplete="name"
            autoFocus
          />
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Create password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
          <SubmitButton
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up'} {/* Show loading spinner */}
          </SubmitButton>
          <Typography variant="body2" color="textSecondary" align="center">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Root>
    </Container>
  );
};

export default SignUp;

export {};
