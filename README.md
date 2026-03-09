# WebTop 16 - Visualizador de Torneos

Aplicacion web interactiva para crear y compartir visualizaciones de resultados de torneos en forma de pie chart. Pensada para TCG y eventos competitivos.

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
- **Diseño Pro**: Interfaz mas limpia, moderna y consistente
- **Personalizado con Nombre**: La opcion `Personalizado` permite definir nombre + imagen
- **Compartir con Supabase**: El link puede persistirse en base remota (`?event=...`)
- **Fallback Local**: Si Supabase falla, mantiene link local en `?shared=...`
- **Diseño Responsivo**: Funciona en desktop y movil

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

## Supabase (Database)

La app usa `supabase-js` en frontend con una **publishable key**.

### 1) Crear tabla

Ejecuta esto en SQL Editor de Supabase:

```sql
create table if not exists public.shared_events (
  id bigint generated always as identity primary key,
  event_id text not null unique,
  title text,
  payload jsonb not null,
  created_at timestamptz not null default now()
);
```

### 2) Activar RLS y policies publicas

```sql
alter table public.shared_events enable row level security;

create policy "public_insert_shared_events"
on public.shared_events
for insert
to anon
with check (true);

create policy "public_select_shared_events"
on public.shared_events
for select
to anon
using (true);
```

### 3) Configuracion actual

- `SUPABASE_URL`: `https://ddsjuhygkfamlsqnkafr.supabase.co`
- `SUPABASE_PUBLISHABLE_KEY`: cargada en `script.js`

Importante: la `secret key` nunca debe ir en frontend. Si se expuso, rotala en Supabase.

## Comparticion

1. Al hacer clic en `Compartir`, intenta guardar en Supabase.
2. Si guarda ok, genera URL como `?event=evt_xxx`.
3. Si no guarda, usa fallback local con `?shared=...`.
4. Al abrir el link, intenta cargar primero de Supabase.

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