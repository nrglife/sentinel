import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import api from "api/api.service";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  item: IData;
};

const ImageCard = (props: Props) => {
  const { item } = props;
  const [brightness, setBrightness] = React.useState(100);
  const [image, setImage] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const increaseBrightness = () => setBrightness(brightness + 10);
  const decreaseBrightness = () => setBrightness(brightness - 10);
  const resetBrightness = () => setBrightness(100);

  useEffect(() => {
    if (item.url) getImage();
  }, [item.url]);

  const getImage = async () => {
    setLoading(true);
    const response = await api.get(item.url, {
      responseType: "blob",
    });
    const objectUrl = URL.createObjectURL(response.data);
    setImage(objectUrl);
    setLoading(false);
  };

  return (
    <Grid item key={item.id} xs={12} sm={6}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {!loading && (
          <CardMedia
            component="img"
            sx={{
              filter: `brightness(${brightness}%)`,
            }}
            image={image}
            alt={item.name}
          />
        )}
        {loading && <CircularProgress />}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography>id: {item.id}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={increaseBrightness}>
            Brighter
          </Button>
          <Button size="small" onClick={decreaseBrightness}>
            Darker
          </Button>
          <Button size="small" onClick={resetBrightness}>
            reset
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ImageCard;
