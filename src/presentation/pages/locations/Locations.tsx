import { lazy, Suspense } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import { Layout } from '@/presentation/layout/Layout';

const LocationsApp = lazy(() =>
  import('locations/App')
    .then((module) => ({ default: module.default }))
    .catch((error) => {
      console.error('Error loading Locations:', error);
      return {
        default: () => (
          <Alert
            severity="error"
            sx={{ mt: 4 }}
          >
            ❌ Error loading Locations MFE. Make sure it's running on port 5002.
            <br />
            <code style={{ fontSize: '12px' }}>{error.message}</code>
          </Alert>
        ),
      };
    })
);

export const Locations = () => {
  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          flexGrow: 1,
          paddingBottom: '64px',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress sx={{ color: '#045d11ff' }} />
            </Box>
          }
        >
          <LocationsApp />
        </Suspense>
      </Box>
    </Layout>
  );
};
