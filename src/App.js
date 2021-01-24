import { useContext } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme} from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { Switch, Route } from 'react-router-dom';

import Menu from './components/Menu';

import PlayerPage from './pages/PlayerPage';
import PlaylistsPage from './pages/PlaylistsPage';
import SettingsPage from './pages/SettingsPage';

import { QueueProvider } from './providers/QueueProvider';
import { CurrentVideoProvider } from './providers/CurrentVideoProvider';
import { SocketContext } from './providers/SocketProvider';


const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles((theme) => ({
  appContainer: {
    overflow: 'hidden'
  },
  content: {
  },
  container: {
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
  },
  menuContainer: {
    width: '7.5%',
    height: '100vh',
  },
  contentContainer: {
    width:'92.5%',
    height: '100vh',
  }
}));

function App() {
  const classes = useStyles();
  const [socket] = useContext(SocketContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container className={classes.appContainer}>
        <Grid item className={classes.menuContainer}>
          <Menu/>
        </Grid>
        <Grid item className={classes.contentContainer}>
              <QueueProvider>
                <CurrentVideoProvider socket={socket}>
                  <Container className={classes.container}>
                    <Switch>
                      <Route path="/player" component={PlayerPage} />
                      <Route path="/playlists" component={PlaylistsPage} />
                      <Route path="/settings" component={SettingsPage} />
                    </Switch>
                  </Container>
                </CurrentVideoProvider >
              </QueueProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
