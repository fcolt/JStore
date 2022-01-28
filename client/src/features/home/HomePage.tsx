import { Grid, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    const slickDivStyle = {
        display: 'grid',
        placeItems: 'center',
        width: '80%',
        marginTop: '50px',
        margin: 'auto',
        height: '500px',
        padding: '0px',
        background: 'red',
    };
    const imgStyle = {
        margin: 'auto',
        height: '100%',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '400px'
    }
      return (
        <>
            <Slider {...settings}>
                <div style={slickDivStyle}>
                    <img src="https://freepikpsd.com/file/2019/10/dot-net-logo-png-2-Transparent-Images.png" alt="product" style={imgStyle}/>
                </div>
                <div style={slickDivStyle}>
                    <img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png" alt="product" style={imgStyle}/>
                </div>
                <div style={slickDivStyle}>
                    <img src="https://www.docker.com/sites/default/files/d8/2019-07/horizontal-logo-monochromatic-white.png" alt="product" style={imgStyle}/>
                </div>
                <div style={slickDivStyle}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Heroku_logo.svg/2560px-Heroku_logo.svg.png" alt="product" style={imgStyle}/>
                </div>
                <div style={slickDivStyle}>
                    <img src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png" alt="product" style={imgStyle}/>
                </div>
            </Slider>
            <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            marginBottom='20px'
            marginTop='30px'
            >
                <Typography variant='h3'>
                    Welcome to JStore!
                </Typography>
                <Typography variant='h5'>
                    Made with .Net and React.
                </Typography>
            </Grid>
        </>
      );
}