# JSON Stock Manager

JSON Stock Manager es una aplicación web construida con React que permite a los usuarios cargar datos de inventario desde un archivo JSON, ajustar las cantidades de los artículos y generar un informe de diferencias en formato PDF.

## Características

- **Carga de archivos JSON**: Los usuarios pueden cargar sus datos de inventario a través de un archivo JSON.
- **Ajustes de inventario**: Los usuarios pueden incrementar o disminuir la cantidad de los artículos de inventario.
- **Visualización de diferencias**: La aplicación puede mostrar las diferencias entre los valores de inventario ajustados y los originales.
- **Exportación a PDF**: Los usuarios pueden exportar un resumen de las diferencias de inventario a un archivo PDF.

## Formato de Archivo JSON Aceptado

El sistema acepta archivos JSON con una estructura específica para representar los datos de inventario. Ejemplo del formato esperado:

```json
{
  "Categoría1": {
    "Subcategoría1": {
      "Artículo1": 100,
      "Artículo2": 150
    },
    "Subcategoría2": {
      "Artículo3": 200,
      "Artículo4": 50
    }
  },
  "Categoría2": {
    "Subcategoría3": {
      "Artículo5": 75
    }
  }
}
```

## Tecnologías Utilizadas

- [React](https://es.reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [@react-pdf/renderer](https://react-pdf.org/)

## Instalación

Para instalar y ejecutar este proyecto localmente, necesitarás [Node.js](https://nodejs.org/es/) instalado en tu máquina.

1. Clona el repositorio:
```bash
git clone https://github.com/mzapf/json-stock.git
```

2. Instala las dependencias:
```bash
cd json-stock
npm install
```

3. Ejecuta la aplicación en modo de desarrollo:
```bash
npm run dev
```

Abre http://localhost:3000 para verla en el navegador.

## Uso

1. **Cargar archivo JSON**: Haz clic en el botón de carga y selecciona tu archivo de inventario en formato JSON.
2. **Ajusta las cantidades**: Utiliza los botones "+" y "-" para ajustar las cantidades de los artículos.
3. **Ver diferencias**: Haz clic en 'Ver Diferencias' para mostrar las diferencias entre el inventario cargado y los ajustes realizados.
4. **Exportar a PDF**: Haz clic en 'Descargar Resumen' para exportar las diferencias a un archivo PDF.

## Contribuir

Si tienes sugerencias para mejorar este proyecto, por favor, abre un issue o envía un pull request con tus cambios.
