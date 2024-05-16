import { Stack, Box } from "@mui/material";
import React from "react";
import Conversation from "../../components/Conversation";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Contact from "../../components/modal/Contact";
import { useSelector } from "../../redux/store";

const GeneralApp = () => {
  const theme = useTheme();
  const {sidebar} = useSelector((state) => state.app);

  
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {/* {tabs} */}

      
      <Box
        sx={{
          height: "100%",
          width:  "100%",
          backgroundColor: "#F0F4FA",
        }}
      >
        {/* {conversation(cuoc hoi thoai)} */}
        <Conversation />

      </Box>
      {/* Contact */}
      {sidebar.open && <Contact />}
        

    </Stack>
  );
};

export default GeneralApp;
