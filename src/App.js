import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme} from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Switch, Route } from 'react-router-dom';

import Menu from './components/Menu';

import PlayerPage from './pages/PlayerPage';
import PlaylistsPage from './pages/PlaylistsPage';
import SettingsPage from './pages/SettingsPage';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
    height: '100vh'
  },
  menuContainer: {
    width: theme.spacing(12) + 1
  },
  contentContainer: {
    flex: 1,
  }
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container >
        <Grid item className={classes.menuContainer}>
          <Menu />
        </Grid>
        <Grid item className={classes.contentContainer}>
          <div className={classes.root}>
            <main className={classes.content}>
              <Container className={classes.container}>
                <Switch>
                  <Route path="/player" component={PlayerPage} />
                  <Route path="/playlists" component={PlaylistsPage} />
                  <Route path="/settings" component={SettingsPage} />
                </Switch>
              </Container>
            </main>
         </div>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}

export default App;
