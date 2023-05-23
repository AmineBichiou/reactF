import { Grid } from "@mui/material";
import MainPage from "../components/dashboard/MainPage";
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
const MainTable = () => {
  return (<div>
    
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <MainPage/>
      </Grid>
    </Grid>
    </FullLayout>
      </ThemeProvider>
    
    </div>
  );
};

export default MainTable;
