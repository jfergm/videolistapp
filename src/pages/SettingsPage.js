import { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Lock from '@material-ui/icons/Lock';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../providers/SocketProvider';
import SnackbarContent  from '@material-ui/core/SnackbarContent';

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

const SettingsPage = () => {
  const classes = useStyles();

  const { serverIpAddress, adminKey, setAdminKey } = useContext(SocketContext);
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    lockChangePassword: true,
    key: adminKey
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickLockChangePassword = () => {
    const nk = adminKey || '';
    setValues({ ...values, lockChangePassword: !values.lockChangePassword, key: nk});

  };

  const handleClickSave = () => {
    if(values.key && values.key !== adminKey) {
      setAdminKey(values.key)
      setValues({...values, lockChangePassword: true})
    }
  }


  return(
      <Grid container className={classes.container} justify="space-around">
        <Grid item>
        {!adminKey && <div className={classes.margin} style={{
          width: '100%'
        }}>
          <SnackbarContent message="No admin key. If no admin key everyone have admin permissions on mobile app" style={{
            backgroundColor: "orange"
          }}/>  
        </div>}    
        <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel color="secondary">Socket Server IP</InputLabel>
            <FilledInput disabled color="secondary" value={serverIpAddress}/>
          </FormControl>
          <FormControl fullWidth className={classes.margin} variant="filled">
            <InputLabel color="secondary">Admin key</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              color="secondary"
              disabled={values.lockChangePassword}
              value={values.key}
              onChange={ (event) => { setValues({...values, key: event.target.value})}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickLockChangePassword}
                    edge="end"
                  >
                    {values.lockChangePassword ? <Lock /> : <Edit />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button 
            color="secondary" 
            variant="outlined" 
            className={classes.margin} 
            fullWidth 
            disabled={values.lockChangePassword}
            onClick={handleClickSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
  );
};

export default SettingsPage;