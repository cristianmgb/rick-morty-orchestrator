# Rick and Morty Orchestrator

## 🎭 ¿Qué es el Orchestrator?

El **Orchestrator** (también llamado **Shell** o **Container**) es la aplicación principal que:

- 🎯 **Punto de entrada único** - URL principal donde los usuarios acceden (`localhost:5000`)
- 🧩 **Orquesta Microfrontends** - Integra y gestiona múltiples MFEs
- 🗺️ **Navegación global** - Proporciona tabs/rutas para cambiar entre MFEs
- 🎨 **Tema compartido** - Aplica el mismo design system a toda la app
- 📦 **Gestión de dependencias** - Comparte React, Material-UI y otras librerías
- 🔌 **Module Federation** - Usa Vite Plugin Federation para cargar MFEs dinámicamente

### Analogía

Imagina el **Orchestrator** como:

- 🏠 **Casa principal** - Punto de entrada
- 🚪 **Puertas** - Tabs/rutas a diferentes MFEs
- 🎭 **Teatro** - El escenario donde actúan los MFEs
- 🎼 **Director de orquesta** - Coordina todos los MFEs

---

## 🏗️ Arquitectura

```-
                ┌─────────────────────────────────────────────────┐
                │         ORCHESTRATOR/SHELL (Puerto 5000)        │
                │  ┌──────────────────────────────────────────┐   │
                │  │  Header/Navegación                       │   │
                │  │  [ 👥 Personajes | 📍 Ubicaciones ]      │   │
                │  └──────────────────────────────────────────┘   │
                │                                                 │
                │  ┌──────────────────────────────────────────┐   │
                │  │  MFE Container (Lazy Loaded)             │   │
                │  │  ┌────────────────────────────────────┐  │   │
                │  │  │ MFE Characters / MFE Locations     │  │   │
                │  │  │ (Cargado dinámicamente)            │  │   │
                │  │  └────────────────────────────────────┘  │   │
                │  └──────────────────────────────────────────┘   │
                │                                                 │
                │  Dependencias Compartidas:                      │
                │  • React 19 • React-DOM 19 • Material-UI 7      │
                │  • Emotion • rick-morty-components-lib          │
                └─────────────────────────────────────────────────┘
                        ↓                          ↓
                    ┌────────────┐          ┌────────────┐
                    │ MFE 1      │          │ MFE 2      │
                    │ Characters │          │ Locations  │
                    │ (5001)     │          │ (5002)     │
                    └────────────┘          └────────────┘
```

---

## 🚀 Instalación y Setup

### Requisitos Previos

- Node.js 20+ (se recomienda usar nvm)
- pnpm (gestor de paquetes)
- MFEs corriendo en paralelo (Characters en 5001, Locations en 5002)

### 1. Clonar el repositorio

```bash
git clone https://github.com/cristianmgb/rick-morty-orchestrator.git
cd rick-morty-orchestrator
```

### 2. Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto:

```bash
# .env
VITE_REMOTE_CHARACTERS_URL=http://localhost:5001/assets/remoteEntry.js
VITE_REMOTE_LOCATIONS_URL=http://localhost:5002/assets/remoteEntry.js
```

**⚠️ Importante:** Estos valores deben coincidir con los puertos donde corren los MFEs.

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

El Orchestrator estará disponible en `http://localhost:5000`

---

## 🔧 Scripts Disponibles

| Script | Descripción | Puerto |
|--------|------------|--------|
| `pnpm dev` | Inicia Vite en desarrollo | 5000 |
| `pnpm build` | Compila TypeScript y bundea | - |
| `pnpm preview` | Visualiza build de producción | 4173 |
| `pnpm lint` | Ejecuta ESLint | - |
| `pnpm test` | Tests en modo watch | - |
| `pnpm test:run` | Tests una sola vez | - |
| `pnpm test:coverage` | Reporte de cobertura | - |

---

## 🎯 Ejecución Completa del Ecosistema

### Desarrollo (3 terminales)

**Terminal 1 - MFE de Characters:**

```bash
git clone https://github.com/cristianmgb/rick-morty-characters-mfe.git

cd rick-morty-characters-mfe

pnpm build:preview
# Esperando en http://localhost:5001
```

**Terminal 2 - MFE de Locations:**

```bash
git clone https://github.com/cristianmgb/rick-morty-locations-mfe.git

cd rick-morty-locations-mfe

pnpm build:preview
# Esperando en http://localhost:5002
```

**Terminal 3 - Orchestrator (ESPERAR a que los MFEs estén listos):**

```bash
cd rick-morty-orchestrator
pnpm dev
# Accesible en http://localhost:5000
```

**Flujo correcto:**

1. ✅ Characters en 5001
2. ✅ Locations en 5002  
3. ✅ Orchestrator en 5000

**Abre en navegador:** `http://localhost:5000`

---

## 🔌 Module Federation Configuration

### ¿Cómo funciona?

1. **Orchestrator define remotes** - URLs de los MFEs
2. **Lazy loading dinámico** - Carga MFEs cuando se necesitan
3. **Dependencias compartidas** - React, Material-UI, etc. se cargan una sola vez
4. **Error handling** - Si un MFE falla, muestra mensaje de error

### Configuración (vite.config.ts)

```typescript
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      federation({
        name: 'orchestrator',
        filename: 'remoteEntry.js',
        remotes: {
          characters: env.VITE_REMOTE_CHARACTERS_URL,
          locations: env.VITE_REMOTE_LOCATIONS_URL,
        },
        shared: [
          'react',
          'react-dom',
          '@mui/material',
          '@emotion/react',
          '@emotion/styled',
          'rick-morty-components-lib',
          'react-router-dom',
          '@tanstack/react-query',
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5000,
    },
  };
});
```

## 🧪 Testing

### Ejecutar tests

```bash
# Modo watch
pnpm test

# Una sola ejecución
pnpm test:run

# Interfaz visual
pnpm test:ui

# Reporte de cobertura
pnpm test:coverage
```

---

## 📊 Flujo de Comunicación

```Usuario accede a localhost:5000
            ↓
    Orchestrator carga
            ↓
    ThemeProvider aplica tema
            ↓
    Tabs de navegación listos
            ↓
    Usuario hace click en "Personajes"
            ↓
    Lazy load de 'characters/App'
            ↓
    Carga remoteEntry.js desde localhost:5001
            ↓
    Comparte dependencias (React, MUI, etc)
            ↓
    Characters MFE se renderiza
            ↓
    ✅ Aplicación funcionando
```

---

## 📚 Recursos

- [Vite Documentation](https://vite.dev/)
- [Module Federation](https://module-federation.io/guide/start/index.html)
- [Material-UI Docs](https://mui.com/)
- [React Documentation](https://react.dev/)
- [Vitest](https://vitest.dev/)

### Repositorios relacionados

- [rick-morty-components-lib](https://github.com/cristianmgb/rick-morty-components-lib)
- [rick-morty-characters-mfe](https://github.com/cristianmgb/rick-morty-characters-mfe)
- [rick-morty-locations-mfe](https://github.com/cristianmgb/rick-morty-locations-mfe)

---

## 👤 Autor

Cristian González - [@cristianmgb](https://github.com/cristianmgb)

## 📄 Licencia

MIT

---

## 🤝 Contribuir

1. Fork del proyecto
2. Crea rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

---

**¡El Orchestrator es el maestro de tu aplicación de Microfrontends! 🎭✨**
