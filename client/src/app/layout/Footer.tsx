import { Box, Container, CssBaseline, Link, Typography } from "@mui/material";

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://jstore-reactapp.herokuapp.com/">
          JStore
        </Link>{' '}
        {new Date().getFullYear() - 1} {' - '} 
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default function Footer() {
    return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '70vh',
        }}
    >
        <CssBaseline />
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </Box>
    </Box>
  );
}