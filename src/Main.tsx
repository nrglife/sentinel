import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import PolygonImage from "assets/images/polygon2.png";
import ImageCard from "ImageCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import api from "api/api.service";
import LoadingPage from "LoadingPage";
import TextField from "@mui/material/TextField";

const base_image_url = "https://scihub.copernicus.eu/dhus/odata/v1/Products";
const create_url = (uuid: string) => `${base_image_url}('${uuid}')/Products('Quicklook')/$value`;
const polygon =
  "35.10572307786728 33.08775549147995,35.77946026454216 33.29312047737919,34.94509699362691 29.636866933992394,34.19550860050519 31.48094819618605,35.10572307786728 33.08775549147995,35.10572307786728 33.08775549147995";

const cloudness = "[0 TO 30]";
const platformname = "Sentinel-2";

const create_serach_url = (limit: number, offset: number) =>
  `https://scihub.copernicus.eu/dhus/api/stub/products?filter=\
( footprint:"Intersects(POLYGON((${polygon})))") AND \
(  (platformname:${platformname} AND \
cloudcoverpercentage:${cloudness}))\
&offset=${offset}\
&limit=${limit}\
&sortedby=ingestiondate&order=desc`;

const Main = () => {
  const [shouldRefresh, setShouldRefresh] = React.useState(true);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(4);
  const [data, setData] = React.useState<IData[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleAreaOpen = () => setOpen(true);
  const handleAreaClose = () => setOpen(false);
  const handleRefresh = () => setShouldRefresh(true);
  const handleLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value);
  };

  useEffect(() => {
    if (shouldRefresh) {
      setShouldRefresh(false);
      getSearchData();
    }
  }, [shouldRefresh]);

  const getSearchData = async () => {
    setLoading(true);
    var url = create_serach_url(limit, offset);
    const response = await api.get(url);
    const products = response.data.products;
    const new_data = products.map((product: any, idx: number) => {
      const id = product.id;
      const uuid = product.uuid;

      return {
        url: create_url(uuid),
        id: id,
        name: `image_${offset + idx + 1}`,
      };
    });

    setData(new_data);
    setOffset(offset + limit);
    setLoading(false);
  };

  return (
    <main>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", paddingTop: "40px" }}>
          <div style={{ maxWidth: "30%", display: "flex", gap: "15px", alignItems: "center" }}>
            <img src={PolygonImage} alt="polygon" style={{ maxHeight: "100px" }} onClick={handleAreaOpen} />
            <span>
              <strong>initial polygon (Israel):</strong> {polygon}
            </span>
          </div>

          <div>
            <TextField id="limit" label="number of images" value={limit} onChange={handleLimit} />
          </div>
          <div>
            <strong>cloud cover percentage:</strong> {cloudness}
          </div>
        </Box>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            Replace
          </Button>
        </Box>
        <hr />
        <Container>
          {loading && <LoadingPage />}
          {!loading && (
            <Grid container spacing={4}>
              {data.map((item, index) => (
                <ImageCard item={item} key={index} />
              ))}
            </Grid>
          )}
        </Container>
      </Box>
      <Modal open={open} onClose={handleAreaClose}>
        <Box className="modal-style">
          <img src={PolygonImage} alt="polygon" style={{ width: "100%" }} />
        </Box>
      </Modal>
    </main>
  );
};

export default Main;
