import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import RoutePath from "./routes/RoutePath";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {


  const theme = createTheme({
    palette: {
      primary: {
        main: "#8bc34a",
      },
      secondary: {
        main: "#a2cf6e",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RoutePath></RoutePath>
      </Router>
    </ThemeProvider>
  );
}

export default App;
