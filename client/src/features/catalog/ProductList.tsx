import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton"

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props) {
    const {productsLoaded} = useAppSelector(state => state.catalog);
    return(
        <Grid
            container
            spacing={4}
            marginBottom='20px'
        >
            {products.map((product, key) => (
                <Grid item xs={12} sm={4} md={3} lg={3} key={key}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton/>
                    ) : (
                        <ProductCard product={product} />
                    )}
                </Grid>
            ))}
        </Grid>
    )
}