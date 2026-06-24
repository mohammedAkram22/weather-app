import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
// Components
import Weather from "./Components/Weather";

const theme = createTheme({
  typography: {
    fontFamily: "IBM",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Weather />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
