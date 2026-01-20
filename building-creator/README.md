# Building Creator

Una aplicación web moderna para crear y editar edificios 3D utilizando Vue 3, TypeScript y CSS 3D transforms.

## 🚀 Características

- **Editor visual 3D**: Crea y visualiza edificios en tiempo real
- **Gestión de bloques**: Añade, duplica y elimina bloques de construcción
- **Sistema de grids**: Configura ventanas y patrones en las caras de los bloques
- **Persistencia local**: Guarda y carga tus edificios en el navegador
- **Interfaz moderna**: UI responsive con controles intuitivos

## 🛠️ Stack Tecnológico

- **Vue 3** - Framework JavaScript progresivo
- **TypeScript** - Tipado estático para mayor robustez
- **Pinia** - Gestión de estado
- **Vite** - Build tool y dev server
- **Vitest** - Testing framework
- **Zod** - Validación de esquemas en tiempo de ejecución

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🏃 Instalación y Uso

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
npm run build
```

### Preview del Build

```bash
npm run preview
```

### Testing

```bash
# Ejecutar tests
npm run test

# Tests con UI
npm run test:ui

# Tests con cobertura
npm run test:coverage
```

### Linting y Formateo

```bash
# Linting
npm run lint

# Formateo
npm run format

# Type checking
npm run type-check
```

## 📁 Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos (CSS, datos)
├── components/      # Componentes Vue
│   ├── editor/     # Componentes del editor
│   ├── scene/      # Componentes de visualización 3D
│   └── UI/         # Componentes de interfaz reutilizables
├── constants/       # Constantes de la aplicación
├── services/        # Servicios de negocio y almacenamiento
├── store/           # Stores de Pinia
├── test/            # Tests unitarios
├── types/           # Definiciones de tipos TypeScript
└── utils/           # Utilidades
```

## 🏗️ Arquitectura

### Separación de Responsabilidades

- **Stores (Pinia)**: Gestión del estado reactivo
- **Services**: Lógica de negocio y operaciones de almacenamiento
- **Components**: Presentación y lógica de UI
- **Types**: Definiciones TypeScript para type-safety

### Manejo de Errores

El proyecto utiliza un sistema de `Result<T, E>` para manejo de errores funcional:

```typescript
type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E }
```

### Validación de Datos

Validación en tiempo de ejecución con **Zod** para asegurar la integridad de los datos, especialmente al cargar desde localStorage.

## 🧪 Testing

Los tests cubren:

- **Servicios críticos**: `StorageService`, `BuildingService`
- **Stores**: `useBuildingStore`
- **Validación**: Schemas de Zod

Ejecuta los tests con:
```bash
npm run test
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_GOOGLE_ANALYTICS_ID=tu-id-de-google-analytics
```

## 📝 Licencia

Este proyecto es privado.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📚 Recursos

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zod Documentation](https://zod.dev/)