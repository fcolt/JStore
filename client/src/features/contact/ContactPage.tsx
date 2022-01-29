import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";
import { SocialIcon } from 'react-social-icons';
import "./socialStyle.css";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter);
    return (
        <>
            <Typography variant='h2'>
                {title}
            </Typography>
            <Typography variant='h5'>
                Data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
                <Button onClick={() => dispatch(increment(1))} variant='contained' color='error'>Increment</Button>
            </ButtonGroup>
            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <SocialIcon className="social" url="https://github.com/fcolt" />
                <SocialIcon className="social" url="https://www.linkedin.com/in/fabian-olteanu/" />
            </Container>
        </>
    )
}