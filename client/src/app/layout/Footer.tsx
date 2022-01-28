import { Box, Container, CssBaseline, Link, Paper, Typography } from "@mui/material";

function Copyright() {
    return (
    <Paper>
        <Typography variant="body2" color='text.disabled'>
            {'Copyright © '}
            <Link color="inherit" href="https://jstore-reactapp.herokuapp.com/">
            JStore
            </Link>{' '}
            {new Date().getFullYear() - 1} {' - '} 
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    </Paper>
      
    );
}

export default function Footer() {
    return (
    <Box
        sx={{
            fontSize: "20px",
            textAlign: "center",
            padding: "0px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "20px",
            width: "100%"
        }}
    >
        <CssBaseline />
        <Box component="footer">
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </Box>
    </Box>
  );
}