import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
// import CalculatorModal from "./CalculatorModal";

const Banner = () => {
  return (
    <div className="banner">
      <Container>
        <div className="tagline">
          <div style={{ marginBottom: 10 }}>
            {/* <CalculatorModal /> */}
          </div>

          <Typography
            className="tagline-1"
            variant="h2"
            style={{ fontWeight: "bold", marginBottom: 15 }}
          >
            CRYPTOFOLIO WATCH LIST
          </Typography>
          <Typography
          className="tagline-2"
            variant="subtitle-2"
            style={{ color: "darkgray", marginBottom: 10 }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
