import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#9747FF",
    },
    background: {
      default: "#050802",
      paper: "#232323",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color:
              "linear-gradient(85.11deg, #313FFE -30.87%, #AC1EF2 118.16%)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          minWidth: "500px", // Изменение минимальной ширины
          backgroundColor: "#232323", // Изменение цвета фона
          backgroundImage: "none", // Удаление фона
          // boxShadow: "0px 19px 67px -31px #A153E970", // Изменение тени;
          // top: '-20vh', // Изменение отступа сверху
          borderRadius: "24px", // Изменение скругления рамки
          padding: "16px", // Изменение паддингов
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "24px", // Изменение размера текста
          fontWeight: "bold", // Изменение жирности текста
          lineHeight: "29px", // Изменение высоты строки
          // padding: '0 0 24px 0', // Изменение паддингов
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          width: "100%", // Ensure table takes 100% width of its container
          tableLayout: "auto", // You can experiment with 'fixed' if needed
          // backgroundColor: "transparent", // Изменение цвета фона
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          maxWidth: "100%", // Ensure table container doesn't overflow its parent
          overflowX: "auto", // Allow horizontal scrolling if table overflows
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          transition: "all 1s ease",
        },
      },
    },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: "clamp(10px, 2vw, 16px)",
    //       whiteSpace: "nowrap",
    //       overflow: "hidden",
    //       textOverflow: "ellipsis",
    //       maxWidth: 150,
    //     },
    //   },
    // },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "clamp(10px, 2vw, 14px)",
          whiteSpace: "normal", // Разрешить перенос текста на новую строку
          wordBreak: "break-all", // Разрешить перенос по словам, если не влазит
          overflowWrap: "break-word", // Обеспечить правильное разбиение текста
          maxWidth: 150,
        },
      },
    },
  },
});
