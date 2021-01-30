import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: '1%',
    marginRight: '1%',
    padding: 0,
    height: '100%',
    width: '100%',
  },
  margin: {
    margin: '2%'
  }
}));

const PlayerPage = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };


  return(
      <Grid container className={classes.container} justify="space-around">
        <Grid item>
          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel >Socket Server IP</InputLabel>
            <FilledInput disabled color="secondary"/>
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount" color="secondary">Admin key</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button color="secondary" variant="outlined" className={classes.margin}>Save</Button>
        </Grid>
      </Grid>
  );
};

export default PlayerPage;