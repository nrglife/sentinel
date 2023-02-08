import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

function App() {
  return (
    <Box className="layout">
      <Header />
      <Main />
      <Footer />
    </Box>
  );
}

export default App;
