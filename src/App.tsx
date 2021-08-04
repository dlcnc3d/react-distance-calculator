import { MuiThemeProvider } from "@material-ui/core";
import { defaultTheme } from "./themes/default";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavMenu from "./components/NavMenu/NavMenu";
import { Footer } from "./components/Footer/Footer";
import { MainComponent } from "./components/MainComponent/MainComponent";
import { MapProvider } from "./context/map.context";
import { AuthProvider } from "./context/auth.context";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MapProvider>
          <MuiThemeProvider theme={defaultTheme}>
            <NavMenu />
            <CssBaseline />
            <main>
              <MainComponent />
            </main>
            <Footer year={new Date().getFullYear()}> </Footer>
          </MuiThemeProvider>
        </MapProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
