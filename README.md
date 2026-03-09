# Generador de Top 8/16 - Visualizador de Torneos

Una aplicación web interactiva para crear y compartir visualizaciones de resultados de torneos en forma de gráfico de pastel (pie chart). Perfecta para torneo de TCG, juegos competitivos y eventos similares.

## ✨ Características

- **Gráfico Dinámico**: Visualiza los resultados del torneo como un pie chart interactivo
- **Edición en Tiempo Real**: Modifica nombres, valores e imágenes sin recargar la página
- **Base de Datos de Personajes**: Acceso rápido a personajes predefinidos con imágenes automáticas
- **Personalización Completa**: Soporta personajes personalizados con URLs de imágenes propias
- **Etiquetas Dinámicas**: Muestra/oculta nombres y cantidades directamente en el gráfico
- **Control de Imágenes**: Ajusta la posición de las imágenes dentro de cada segmento con sliders
- **Descarga de Imagen**: Exporta el gráfico como PNG con el título y todas las imágenes incluidas
- **Compartir Eventos**: Genera links únicos para compartir tus eventos - los datos se guardan automáticamente
- **Persistencia de Datos**: Los datos se guardan automáticamente en localStorage
- **Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil

## 🚀 Inicio Rápido

1. Abre `index.html` en tu navegador
2. Edita el nombre del evento en el campo "Nombre del Evento"
3. Haz clic en "Editar" para abrir el panel del editor
4. Modifica nombres, valores e imágenes de los campeones
5. Usa los sliders para ajustar la posición de las imágenes
6. Marca "Mostrar nombre y cantidad" para que aparezcan en el gráfico
7. Haz clic en "Descargar" para exportar como PNG
8. Usa "Compartir" para generar un link que puedas compartir con otros

## 🎨 Personalización

### Base de Datos de Personajes

Los personajes disponibles están en el objeto `categories` en `script.js`. Agregar un nuevo personaje es fácil:

```javascript
const categories = {
  'Draven': 'https://...',
  'Tu Personaje': 'https://url-de-imagen.jpg',
  // Agrega más aquí
};
```

### Datos Iniciales

Modifica el array `data` en `script.js` para cambiar los valores por defecto:

```javascript
let data = [
  { name: 'Draven', value: 7, color: '#FF6B6B', image: '...', showLabel: false },
  // Agrega más campeones aquí
];
```

## 🔧 Tecnologías

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones (responsive)
- **JavaScript Vanilla** - Lógica y interactividad
- **SVG** - Renderizado del pie chart
- **LocalStorage** - Persistencia de datos

## 📁 Estructura del Proyecto

```
.
├── index.html       # Estructura HTML
├── style.css        # Estilos y diseño responsivo
├── script.js        # Lógica de la aplicación
├── README.md        # Este archivo
└── .gitignore       # Archivos ignorados por Git
```

## 💾 Cómo Funciona la Compartición

1. Al hacer clic en "Compartir", la aplicación genera un ID único
2. Los datos se codifican en base64 y se guardan en localStorage
3. Se genera un URL con el ID (ej: `?event=evt_1234567890`)
4. Compartí el link con otros usuarios
5. Cuando abren el link, los datos se cargan automáticamente

## 🌐 Preparación para GitHub Pages

Para usar esta aplicación en GitHub Pages:

1. Sube el repositorio a GitHub
2. Ve a Settings → Pages
3. Selecciona "Deploy from a branch"
4. Elige la rama `main` y carpeta `/root`
5. ¡Listo! Tu aplicación estará en `https://tu-usuario.github.io/nombre-repo`

## 📱 Navegadores Soportados

- Chrome/Edge (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Opera (últimas versiones)

## 📝 Licencia

Libre para usar y modificar.

## 🎯 Próximas Mejoras

- [ ] Integración con base de datos remota
- [ ] Más opciones de personalización de colores
- [ ] Exportación en diferentes formatos
- [ ] Historial de eventos
- [ ] Animaciones mejoradas

---

¡Diviértete creando visualizaciones de tus torneos! 🎮