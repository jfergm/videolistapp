import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, createMuiTheme} from '@material-ui/core/';
import Container from '@material-ui/core/Container';

import Menu from './components/Menu';

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
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
