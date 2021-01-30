import { useEffect, useState, useContext } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from  '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import QRCode from 'qrcode.react';

import { SocketContext } from '../providers/SocketProvider';

const DialogConfigDevice = ( { isOpen, handler } ) => {
  const [ open, setOpen ] = useState(isOpen);
  const [includeAdminKey, setIncludeAdminKey] = useState(false);
  const { serverIpAddress, adminKey } = useContext(SocketContext)
  const handleClose = () => {
    handler();
    setOpen(false)
  }
  const handleIncludeAdminKey = (event) => {
    setIncludeAdminKey(event.target.checked);
  }

  useEffect(()=>{
    setOpen(isOpen)
  });

  const getConfig = () => {
    const config = {
      IPAddress: serverIpAddress
    }

    if(includeAdminKey) {
      config.adminKey = adminKey
    }
    return JSON.stringify(config);
  }

  return(
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='lg'>
    <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <FormControlLabel
            control={<Switch value={includeAdminKey} onChange={ handleIncludeAdminKey } />}
            label="Admin key"
          />
          <div>
            <QRCode
              id="123456"
              value={getConfig()}
              renderAs='svg'
              size={400}
              level={"H"}
              includeMargin={true}

            />
          </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>          
        </DialogActions>
  </Dialog>
  );
}

export default DialogConfigDevice;