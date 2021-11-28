import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography, Grid } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error))

    }
    return (
        <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            marginBottom='20px'
        >
            <Typography gutterBottom variant='h2'>
                Errors for testing purposes
            </Typography>

            <ButtonGroup style={{flexWrap: 'wrap', textAlign: 'center', display: 'inline-block'}}>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}> Test Validation Error</Button>
            </ButtonGroup>

            {validationErrors.length > 0 && 
                <Alert severity='error'>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Grid>
    )
}