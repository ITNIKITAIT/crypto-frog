import styled from "@emotion/styled";
import { Switch } from "@mui/material";

export const CustomSwitch = styled(Switch)(() => ({
  width: 50,
  height: 28,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 0,
    transform: "translateX(2px)",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#24C89C",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    transform: "translateY(1px)",
    backgroundColor: "#fff",
    width: 26,
    height: 26,
  },
  "& .MuiSwitch-track": {
    borderRadius: 14,
    opacity: 0.3,
  },
}));
