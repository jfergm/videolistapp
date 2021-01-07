import { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from  '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import QRCode from 'qrcode.react';

const DialogConfigDevice = ( { isOpen, handler } ) => {
  const [ open, setOpen ] = useState(isOpen);

  const handleClose = () => {
    handler();
    setOpen(false)
  }

  useEffect(()=>{
    setOpen(isOpen)
  })
  return(
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth='lg'>
    <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div>
            <QRCode
              id="123456"
              value={JSON.stringify({
                IPAddres: '1.1.1.1:1111',
                adminKey: '111111111111'
              })}
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