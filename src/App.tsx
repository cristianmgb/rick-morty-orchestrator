import { Suspense, useState, lazy } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  CircularProgress,
  ThemeProvider,
  Alert,
} from '@mui/material';
import { theme } from 'rick-morty-components-lib';

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

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          maxWidth: '1280px',
          margin: '0 auto',
          backgroundColor: '#09170eff',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ py: 4 }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <h1 style={{ color: '#64B5F6', marginBottom: '8px' }}>
              Rick & Morty Explorer
            </h1>
            <p style={{ color: '#B0BEC5', marginBottom: '16px' }}>
              Explora personajes y ubicaciones del multiverso
            </p>
            <p style={{ color: '#90CAF9', fontSize: '14px' }}>
              Asegúrate de que los MFEs estén corriendo:
              <br />
              Port 5001 (Characters) • Port 5002 (Locations)
            </p>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              sx={{
                '& .MuiTab-root': {
                  color: '#90CAF9',
                  fontSize: '16px',
                  fontWeight: 600,
                  '&.Mui-selected': {
                    color: '#64B5F6',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#64B5F6',
                },
              }}
            >
              <Tab label="👥 Personajes" />
              <Tab label="📍 Ubicaciones" />
            </Tabs>
          </Box>

          <Suspense
            fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress sx={{ color: '#64B5F6' }} />
              </Box>
            }
          >
            {activeTab === 0 && <CharactersApp />}
            {activeTab === 1 && <LocationsApp />}
          </Suspense>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
