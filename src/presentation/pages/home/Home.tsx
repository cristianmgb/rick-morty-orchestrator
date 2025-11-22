import { Alert, Box, CircularProgress } from '@mui/material';
import { Layout } from '@/presentation/layout/Layout';
import { lazy, Suspense } from 'react';

const CharactersApp = lazy(() =>
  import('characters/App')
    .then((module) => ({ default: module.default }))
    .catch((error) => {
      console.error('Error loading Characters:', error);
      return {
        default: () => (
          <Alert
            severity="error"
            sx={{ mt: 4 }}
          >
            ❌ Error loading Characters MFE. Make sure it's running on port
            5001.
            <br />
            <code style={{ fontSize: '12px' }}>{error.message}</code>
          </Alert>
        ),
      };
    })
);

export const Home = () => {
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
        {' '}
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress sx={{ color: '#64B5F6' }} />
            </Box>
          }
        >
          <CharactersApp />
        </Suspense>
      </Box>
    </Layout>
  );
};
