import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props) {
    return(
        <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
            marginBottom='20px'
        >
            {products.map((product, key) => (
                <Grid item xs={12} sm={4} md={3} lg={3} key={key}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    )
}