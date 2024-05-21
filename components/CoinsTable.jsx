
"use client";
import { CryptoState } from "@/context/store";
import { IoMdEye } from "react-icons/io";

import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { numberWithCommas } from "./Carousel";
import { useRouter } from "next/navigation";
import Image from "next/image";


const CoinsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { currency, symbol, coins, loading, fetchCoins, watchlist, setWatchlist } = CryptoState();
  

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };


  const handleWatch = (coin, event) => {
    event.stopPropagation(); 
    event.preventDefault(); 

    const { image, current_price } = coin; 
    if (!watchlist.some((item) => item.id === coin.id)) { 
     setWatchlist([...watchlist, { ...coin, img: image, price: current_price }]);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          className="coininfo-title"
          variant="h4"
          style={{ margin: 18 }}
        >
          Cryptocurrency Prices By Market Cap
        </Typography>
        <TextField
          label="Search For A Crypto Currency"
          variant="outlined"
          style={{ marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ background: "#87CEEB" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      style={{ color: "black", fontWeight: "bold" }}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    let profit = row.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        onClick={() => router.push(`/coins/${row.id}`)}
                        key={row.name}
                        className="row"
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                         <Image
                            src={row?.image}
                            alt={row.name}
                            height={50}
                            width={50}
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                       
                            
                          }}
                        > 
                          <button className="eyes" onClick={(event) => handleWatch(row, event)}><IoMdEye /></button>                
                          {profit && "+"}{" "}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
