import { Box, Typography } from '@mui/material';
import { theme } from 'rick-morty-components-lib';

export const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100px',
        backgroundColor: theme.palette.secondary['800'],
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: 0,
          textAlign: 'center',
          color: theme.palette.secondary.main,
          fontFamily: 'Montserrat',
          maxWidth: '422px',
          width: '100%',
          height: '20px',
          mt: '24px',
        }}
      >
        TM & © 2024 The Cartoon Network, Inc. All Rights Reserved.
      </Typography>
    </Box>
  );
};
