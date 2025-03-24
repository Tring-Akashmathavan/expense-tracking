import React from "react";
import { Typography, Box } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import Money from "../assets/CoverMoney.jpg";


const Home = () => {
  return (
    <Box
      sx={{
        height: "91vh",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage : `url(${Money})`,
        backgroundSize: "cover",  
        backgroundRepeat: "no-repeat" ,
        backgroundColor : "#333"
      }}
    >

      <Box
        sx={{
          backgroundColor: "#fff",
          color: "#333",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "4px 4px 13px rgba(0, 0, 0, 0.3)",
          display: "inline-block",
          // transform: "rotate(0deg)",
          position: "relative",
          marginBottom: "20px",
          width: "50%",
          textAlign: "center",
        }}
      >
        <PushPinIcon
          sx={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            fontSize: "3rem",
            color: "#000",
          }}
        />
        <Typography variant="h4" gutterBottom>
          Save Money And Money Will Save You.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
