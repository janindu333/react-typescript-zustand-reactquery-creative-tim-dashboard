import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { TextField, Button, Typography, Link, Container, Box, Snackbar, Alert, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import useStore from '../store';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#FFFFFF',
}));

const Image = styled('img')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: '400px',
  marginBottom: theme.spacing(4),
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

const LinkBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const TextFieldStyled = styled(TextField)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Login: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const setUser = useStore((state) => state.setUser);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'User account is disabled.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };

  const handleLogin = async () => {
    setLoading(true); // Show loading indicator
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(null);
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } catch (error: any) {
      setError(getErrorMessage(error.code)); // Use custom error message
      setOpen(true);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main">
      <Root>
        {/* <Image
          src="/loginbg.webp" // Replace with the actual image path
          alt="Welcome"
        /> */}
        <Form>
          <Typography variant="h5" component="h1">
            Welcome to Talk With Me
          </Typography>
        
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Your Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye-off"
                      >
                        <path d="M17.94 17.94A10.32 10.32 0 0 1 12 20C7.58 20 3.73 17.61 1 12.5a17.77 17.77 0 0 1 3.45-5.49"></path>
                        <path d="M1 1l22 22"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-eye"
                      >
                        <path d="M1 12.5C3.73 7.39 7.58 5 12 5s8.27 2.39 11 7.5c-2.73 5.11-6.58 7.5-11 7.5s-8.27-2.39-11-7.5z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LinkBox>
            <Link href="#" variant="body2">
              Forgot your password?
            </Link>
          </LinkBox>
          <SubmitButton
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? <CircularProgress size={24} /> : 'Log In'} {/* Show loading spinner */}
          </SubmitButton>
          <LinkBox>
            <Typography variant="body2" color="textSecondary">
              New to Talk With Me?
            </Typography>
            <Link href="/signup" variant="body2">
              Sign Up
            </Link>
          </LinkBox>
        </Form>
        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position Snackbar in top-right corner
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Root>
    </Container>
  );
};

export default Login;

export {};
