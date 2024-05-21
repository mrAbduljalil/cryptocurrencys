 
import { Box, Modal, Typography, Card, CardContent, Button } from "@mui/material";
import { CryptoState } from "../context/store";
import Image from "next/image";


const style = {
  position: 'fixed',
  top: '50%',
  right: '0',
  transform: 'translateY(-50%)',
  width: 500,
  height:750,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  background:'#515151',
  
};

const WatchlistModal = ({ open, handleClose }) => {
  const { watchlist, setWatchlist } = CryptoState();

  const handleRemove = (coin) => {
    setWatchlist(watchlist.filter((item) => item.id !== coin.id));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Watch List
          <br />
        </Typography>
       
          {watchlist.map((coin) => (
            <Card key={coin.id} sx={{ margin: '10px 0',  borderRadius: '10px', width:200,height:250, textAlign:'center' }}>
              <CardContent>
              <Image src={coin.img} alt={coin.name} height="100" width="100" style={{ marginBottom: 10 }} />
                <Typography variant="h6">{coin.name}</Typography>
                <Typography variant="body1">$ {coin.price}</Typography>
                <Button className="removeBtn" onClick={() => handleRemove(coin)}>Remove</Button>
              </CardContent>
            </Card>
          ))         
        }
      </Box>
    </Modal>
  );
};

export default WatchlistModal;
