  "use client";

  import { numberWithCommas } from "@/components/Carousel";
  import CoinInfo from "@/components/CoinInfo";
  import { SingleCoin } from "@/config/api";
  import { CryptoState } from "@/context/store";
  import { LinearProgress, Typography } from "@mui/material";
  import axios from "axios";
  import { useParams } from "next/navigation";
  import { useEffect, useState } from "react";
  import parse from "html-react-parser";
import Image from "next/image";  
  
  const Page = () => {
    const [coin, setCoin] = useState(null);

    const { currency, symbol } = CryptoState();
    const { id } = useParams();

    useEffect(() => {
      const fetchCoins = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      };
    
      if (id) {
        fetchCoins();
      }
    }, [id]);

    if (!coin) return <LinearProgress style={{ background: "gold" }} />;

    return (
      <div className="container">
        <div className="sidebar">
        <Image
          src={coin?.image.large}
           alt={coin?.name}
           width={200} 
           height={200}
           style={{ marginBottom: 20 }}
            />

          <Typography className="heading" variant="h4">
            {coin?.name}
          </Typography>
          <div className="market-data" style={{ marginBottom: 10 }}>
            <Typography variant="subtitle1">
              {parse(coin?.description.en.split(". ")[0])}
            </Typography>
          </div>

          <div className="market-data">
            <span>
              <Typography variant="h6">
                <span className="heading">Rank: &nbsp;</span>
                {coin?.market_cap_rank}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h6">
                <span className="heading">Current Price:</span> {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h6">
                <span className="heading">Market Cap:</span> {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()].toString()
                )}
              </Typography>
            </span>
          </div>
        </div>

        <CoinInfo coin={coin} />
      </div>
    );
  };

  export default Page;
