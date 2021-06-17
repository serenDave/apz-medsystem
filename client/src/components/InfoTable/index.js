import React from 'react';
import { Box, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  boldText: {
    fontWeight: 'bold',
  },
});

const InfoTable = ({ title, titleValue, displayData }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant={'h5'}>
          {title}: {titleValue}
        </Typography>
        <hr />
        {displayData.map((cell) => (
          <Box display={'flex'} alignItems={'center'} mb={'10px'}>
            {cell.map((item) => (
              <Box flex={1}>
                <Typography variant={'body1'} className={classes.boldText}>
                  {item.description}:
                </Typography>
                <Typography variant={'body1'}>{item.value}</Typography>
              </Box>
            ))}
          </Box>
        ))}
    </>
  )
}

export default InfoTable
