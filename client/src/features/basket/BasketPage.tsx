import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary"

export default function BasketPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    
    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
    <Grid
        container 
        spacing={6}
        alignItems="center"
        justifyContent="center"
        marginBottom='20px'
    >
        <Grid item xs={10} sm={8} md={9} lg={10}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Quantity</TableCell>
                        <TableCell align="left">Subtotal</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {basket.items.map(item => (
                        <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="left">{currencyFormat(item.price)}</TableCell>
                        <TableCell align="left">
                            <LoadingButton 
                                loading={status === 'pendingAddItem' + item.productId} 
                                onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} 
                                color='success'
                            >
                                <Add />
                            </LoadingButton>
                                {item.quantity}
                            <LoadingButton 
                                loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                                onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))} 
                                color='error'
                            >
                                <Remove />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="left">{currencyFormat(item.price * item.quantity)}</TableCell>
                        <TableCell align="left">
                            <LoadingButton 
                                loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                                onClick={() => dispatch(removeBasketItemAsync({
                                    productId: item.productId, quantity: item.quantity, name: 'del'
                                }))} 
                                color='error'
                            >
                                <Delete/>
                            </LoadingButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item xs={10} sm={9} md={7} lg={7}>
                <BasketSummary />
                <Button
                    component={Link}
                    to='/checkout'
                    variant='contained'
                    size='large'
                    fullWidth
                >
                    Checkout
                </Button>
            </Grid>
        </Grid>
    </Grid>
    )
}