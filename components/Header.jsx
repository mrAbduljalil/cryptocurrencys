
"use client";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../context/store";
import Link from "next/link";
import { useState } from "react";
import WatchlistModal from "./WatchListModal";

const Header = () => {
  const { currency, setCurrency} = CryptoState();
  const [modalOpen, setModalOpen] = useState(false);


  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Link href={"/"} className="title-link">
              <Typography className="title">CRYPTOFOLIO</Typography>
            </Link>

            <Select
            className="select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ width: 100, height: 40, marginLeft: 10 }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
             <button className="wtchlist" onClick={handleOpen}>WATCH LIST</button>
          </Toolbar>
        </Container>
      </AppBar>

      <WatchlistModal open={modalOpen} handleClose={handleClose} />
    </ThemeProvider>
  );
};

export default Header;
