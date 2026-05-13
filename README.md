# mf-template — Plantilla Base Microfrontend React (Keralty)

## Template Engineering

**Nicolas Arbey Rojas Arias**  

> Antes de usar esta plantilla cambiar:
> - `VITE_MF_NAME` en `.env` e `index.html` por el nombre del MF
> - `VITE_API_BASE_URL` en `.env` por la URL del BFF correspondiente
> - Los props del Web Component en `main.tsx` según lo que necesite pasar
> - En los comandos Docker reemplazar `mf-template` por el nombre del MF

---

## 1. Arquitectura de Carpetas

```
src/
├── api/                           Configuración HTTP — instancia de axios
├── pages/                         Orquestación de componentes por pantalla
├── components/
│   ├── hello/
│   │   └── HelloTemplate/         Pantalla de bienvenida
│   ├── token/
│   │   └── TokenForm/             Formulario de validación de token
│   ├── appointment/
│   │   └── AppointmentDetail/     Vista de citas médicas
│   └── ui/                        Componentes atómicos reutilizables
│       ├── Button/
│       ├── Input/
│       ├── StatusMessage/
│       ├── ColombiaClock/
│       └── index.ts               Barrel export — importar siempre desde aquí
├── hooks/                         Custom hooks — estado loading/data/error por feature
├── services/                      Capa HTTP — una función por endpoint del BFF
├── types/                         Interfaces TypeScript por dominio
├── constants/
│   └── events.ts                  MF_EVENTS, API_ROUTES, STORAGE_KEYS
├── i18n/                          Configuración i18next con LanguageDetector
│   └── locales/
│       ├── es.json
│       └── en.json
├── utils/                         Funciones genéricas reutilizables
└── styles/                        Layout global aplicado en App.tsx
```

Regla: los componentes nunca llaman a `apiClient` directamente. Todo pasa por `service → hook → component`.

## 2. Flujo de una Llamada

```
main.tsx → App.tsx → Page → Component
→ Hook → Service → apiClient → BFF
← Hook (loading/data/error) ← Component
```

## 3. Cómo Agregar un Nuevo Feature

| # | Archivo | Qué crear |
|---|---------|-----------|
| 1 | `src/types/nombre.types.ts` | Interfaces: `NombreResponse`, `UseNombreState` |
| 2 | `src/services/nombreService.ts` | Función usando `apiClient` y `API_ROUTES` |
| 3 | `src/hooks/useNombre.ts` | Hook con estado `loading/data/error` |
| 4 | `src/components/nombre/` | Componente + CSS Module que consume el hook |
| 5 | `src/pages/NombrePage.tsx` | Page que orquesta el componente |
| 6 | `src/constants/events.ts` | Agregar ruta en `API_ROUTES` y evento en `MF_EVENTS` |
| 7 | `src/i18n/locales/es.json` | Claves i18n para todos los textos del feature |
| 8 | Tests | Service (mock `apiClient`) + Hook (mock service) + Component |

## 4. Variables de Entorno

| Variable | Ejemplo | Descripción |
|----------|---------|-------------|
| `VITE_MF_NAME` | `mf-pagos` | Nombre del Web Component. Debe ser único por MF. |
| `VITE_API_BASE_URL` | `http://localhost:8081` | URL propia del microfront - proxy reverse, para local usar URL back. |

## 5. Docker

**Red compartida (una sola vez)**
```bash
docker network create keralty-net
```

**Build**
```bash
docker build --no-cache \
  --build-arg VITE_MF_NAME=mf-template \
  --build-arg VITE_API_BASE_URL=http://localhost:8081 \
  -t keralty/mf-template .
```

**Run**
```bash
docker run -d \
  --name mf-template \
  --network keralty-net \
  -p 8081:8081 \
  keralty/mf-template
```

**Aplicar cambios**
```bash
docker stop mf-template 
docker rm mf-template
docker build --no-cache \
  --build-arg VITE_MF_NAME=mf-template \
  --build-arg VITE_API_BASE_URL=http://localhost:8081 \
  -t keralty/mf-template .
docker run -d --name mf-template --network keralty-net -p 8081:8081 keralty/mf-template
```

## 6. Desarrollo Local (sin Docker)

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo con HMR
pnpm run dev
# Disponible en http://localhost:5173

# Verificar tipos
pnpm run typecheck

# Lint y formato
pnpm run lint
pnpm run format

# Build de producción
pnpm run build
# Genera mf-template.js y mf-template.css en /dist
```

## 7. Tests

```bash
# Todos los tests
pnpm run test

# Con cobertura (reporte en /coverage/index.html)
pnpm run test:coverage

# Con UI interactiva
pnpm run test:ui
```

Umbrales mínimos configurados en `vitest.config.ts`:

| Métrica | Umbral |
|---------|--------|
| Líneas / Statements / Funciones | 80% |
| Branches | 75% |
| Excluidos | `src/api/`, `src/i18n/`, `src/styles/`, `src/main.tsx` |

## 8. Tecnologías y Versiones

| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 18.3.1 | Framework UI — v18 requerida por r2wc |
| TypeScript | ~5.9.3 | Lenguaje tipado — configuración estricta |
| Vite | ^7.3.3 | Bundler |
| Node.js | 22 Alpine | Runtime de build |
| nginx | 1.29 Alpine | Servidor de archivos estáticos en producción |
| pnpm | 9.11.0 | Gestor de paquetes |

## 9. Librerías

| Librería | Versión | Uso |
|----------|---------|-----|
| @r2wc/react-to-web-component | 2.1.1 | Convierte App React en Web Component |
| axios | 1.16.0 | Cliente HTTP |
| i18next | 26.0.10 | Internacionalización con detección automática de idioma |
| react-i18next | 17.0.7 | Hook `useTranslation()` para componentes React |
| i18next-browser-languagedetector | 8.2.1 | Detecta idioma del navegador automáticamente |
| vitest | 4.1.5 | Framework de testing — API compatible con Jest |
| @testing-library/react | 16.3.0 | Tests de componentes por comportamiento visible |
| @testing-library/jest-dom | 6.6.3 | Matchers DOM: `toBeInTheDocument()`, `toBeDisabled()` |
| jsdom | 27.4.0 | Simula el DOM del navegador en Node.js para CI/CD |
