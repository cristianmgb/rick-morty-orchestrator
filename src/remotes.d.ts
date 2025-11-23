// Declaración para el microfrontend de Characters
declare module 'characters/App' {
  import { ComponentType } from 'react';
  interface AppProps {
    search?: string;
  }
  const App: ComponentType<AppProps>;
  export default App;
}

// Declaración para el microfrontend de Locations
declare module 'locations/App' {
  import { ComponentType } from 'react';
  const App: ComponentType;
  export default App;
}
