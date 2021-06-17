import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function Snackbar({ message, open, handleClose }) {
  return (
    <div>
      <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          {message}
        </Alert>
      </MuiSnackbar>
    </div>
  );
}
