import LogoImage from "assets/images/LogoImage.png";
import Paper from "@mui/material/Paper";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <Paper
        elevation={2}
        sx={{
          background: "#ccd5f199",
          color: "#444",
          position: "static",
          display: "flex",
        }}
      >
        <img src={LogoImage} alt="Planet Watchers" style={{ maxHeight: "40px", paddingInlineStart: "20px", paddingTop: "5px" }} />

        <div style={{ flex: "auto", textAlign: "center", lineHeight: "50px", fontWeight: "bold", fontSize: "25px" }}>
          Sentinel
        </div>
      </Paper>
    </header>
  );
};

export default Header;
