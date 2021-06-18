import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

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
        {displayData.map((cell, i) => (
          <Box display={'flex'} alignItems={'center'} mb={'10px'} key={i}>
            {cell.map((item, i) => (
              <Box flex={1} key={`${i}-${item.description}`}>
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
