# Instrucciones para Usar la Aplicación

## 🎮 De Qué Se Trata

**Generador de Top 8/16** es una aplicación web para visualizar resultados de torneos de TCG (Trading Card Games) o juegos competitivos en forma de gráfico interactivo.

## 🚀 Usar la Aplicación

### Opción 1: En Línea (Más Fácil)
1. Abre el link en tu navegador
2. ¡Listo para usar!

### Opción 2: Localmente
1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo!

## 📝 Cómo Crear un Evento

### Paso 1: Nombre del Evento
- Escribe el nombre de tu torneo en el campo "Nombre del Evento" (ej: "Skirmish Mazinger Top16 07/03")

### Paso 2: Editar Datos
1. Haz clic en el botón **⚙️ Editar** (derecha)
2. Se abrirá un panel donde puedes:
   - Cambiar el nombre del campeón (usa el desplegable para seleccionar personajes predefinidos)
   - Cambiar el valor (cantidad de victorias/puntos)
   - Si seleccionas "Personalizado", puedes ingresar nombre personalizado y URL de imagen
   - Ajustar la posición de la imagen con los sliders X e Y
   - Marcar "Mostrar nombre y cantidad" para que aparezca en el gráfico

### Paso 3: Agregar o Eliminar Campeones
- **➕ Botón +**: Agregá un nuevo campeón a la lista
- **−**: Elimina un campeón

### Paso 4: Ver Cambios
- Los cambios se aplican en tiempo real al gráfico
- El título aparece arriba del gráfico

## 📥 Descargar la Imagen

1. Haz clic en **⬇️ Descargar**
2. Se descargará un PNG con:
   - El título de tu evento
   - El gráfico completo
   - Todas las imágenes de los campeones
3. La imagen está lista para compartir en redes, presentaciones, etc.

## 🔗 Compartir un Evento

### Generar Link de Compartición
1. Haz clic en **🔗 Compartir**
2. Se copiará un URL único a tu portapapeles
3. Comparte el link con otros
4. Cuando alguien abra el link, verá exactamente tu evento con todos los datos

### Asi Funciona
- Intenta guardar el evento en Supabase y generar URL `?event=...`
- Si Supabase no responde, usa fallback local `?shared=...`
- Los cambios tambien se guardan automaticamente en localStorage

## 💾 Persistencia de Datos

- **Automática**: Cada cambio que hagas se guarda automáticamente
- **Local**: Los datos se guardan en tu navegador (localStorage)
- **Exportable**: Puedes compartir tus eventos vía link
- **Sin Límite**: Puedes crear tantos eventos como necesites

## 🎨 Personajes Disponibles

La aplicación incluye estos personajes predefinidos (como ejemplo para Legends of Runeterra):
- Draven
- Irelia
- Ezreal
- Viktor
- Lucian
- Kai'sa
- Sivir
- Rek'sai
- Miss Fortune

**+ Personalizado**: Si quieres usar un personaje que no está en la lista, selecciona "Personalizado" e ingresa la URL de la imagen.

## 📱 Compatible Con

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android Tablets)
- ✅ Mobile (Smartphone, aunque responsivo), aunque recomendado desktop para mejor experiencia)

## ⌨️ Controles del Editor

| Elemento | Función |
|----------|---------|
| Desplegable | Selecciona el personaje / categoría |
| Número | Cantidad de victorias/puntos |
| URL | Imagen personalizada (solo si seleccionas "Personalizado") |
| Slider X | Ajusta posición horizontal de la imagen |
| Slider Y | Ajusta posición vertical de la imagen |
| Checkbox | Muestra el nombre y cantidad en el gráfico |
| − | Elimina ese campeón |

## 🐛 Solución de Problemas

### Las imágenes se ven cortadas
- Usa los sliders X e Y para reposicionar la imagen
- El rango es de -350 a 350 píxeles

### El nombre que ingresé no aparece en el gráfico
- Asegúrate de marcar el checkbox "Mostrar nombre y cantidad"

### Perdí mis datos
- Si cierras el navegador, se mantienen en localStorage de esa computadora
- Para compartir con otros, usa el botón "Compartir"

### La imagen no se descarga bien
- Intenta esperar un segundo después de hacer cambios
- Asegúrate de tener buena conexión a internet

## 💡 Tips y Trucos

1. **Porcentajes**: Los valores se calculan automáticamente como porcentaje del total
2. **Colores**: Los colores de los segmentos se asignan automáticamente
3. **Múltiples Eventos**: Puedes tener varios tabs abiertos con diferentes eventos
4. **Compartir**: El link es único y se puede guardar para referencia

## 📚 Más Información

Para agregar más personajes o modificar la lista, ve a las instrucciones de desarrollo en el README.md

---

¡Diviértete creando visualizaciones de tus torneos! 🎮