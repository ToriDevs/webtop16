const svg = document.getElementById('pie-svg');
const editBtn = document.getElementById('edit-btn');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const editorPanel = document.getElementById('editor-panel');
const editorOverlay = document.getElementById('editor-overlay');
const dataList = document.getElementById('data-list');

const centerX = 350;
const centerY = 350;
const radius = 280;

// Base de datos de categorías con imágenes
const categories = {
  'Draven': 'https://tcgplayer-cdn.tcgplayer.com/product/663442_in_1000x1000.jpg',
  'Irelia': 'https://tcgplayer-cdn.tcgplayer.com/product/663441_in_1000x1000.jpg',
  'Ezreal': 'https://tcgplayer-cdn.tcgplayer.com/product/664927_in_1000x1000.jpg',
  'Viktor': 'https://cardbot.com.au/cdn/shop/files/653063_400w_2271a16f-2327-4211-a650-e97adcef0cee.jpg?v=1762749158',
  'Lucian': 'https://riftdecks.com/img/cards/riftbound/SFD/sfd-183-221_full.png',
  'Kai\'sa': 'https://static.dotgg.gg/riftbound/cards/OGN-247.webp',
  'Sivir': 'https://tcgplayer-cdn.tcgplayer.com/product/663438_in_1000x1000.jpg',
  'Rek\'sai': 'https://tcgplayer-cdn.tcgplayer.com/product/664922_in_1000x1000.jpg',
  'Miss Fortune': 'https://cdn.piltoverarchive.com/cards/OGN-267.webp',
  'Personalizado': ''
};

let data = [
  { name: 'Draven', value: 7, color: '#FF6B6B', image: 'https://tcgplayer-cdn.tcgplayer.com/product/663442_in_1000x1000.jpg', showLabel: false },
  { name: 'Irelia', value: 2, color: '#4ECDC4', image: '', showLabel: false },
  { name: 'Ezreal', value: 2, color: '#45B7D1', image: '', showLabel: false },
  { name: 'Viktor', value: 1, color: '#FFA07A', image: '', showLabel: false },
  { name: 'Lucian', value: 1, color: '#98D8C8', image: '', showLabel: false },
  { name: 'Kaisa', value: 1, color: '#F7DC6F', image: '', showLabel: false },
  { name: 'Sivir', value: 1, color: '#BB8FCE', image: '', showLabel: false },
  { name: 'Reksai', value: 1, color: '#85C1E2', image: '', showLabel: false }
];

let offsets = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 }
];

function drawPie() {
  svg.innerHTML = '';
  
  let total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) total = 1;

  let cumulativeAngle = -Math.PI / 2;
  
  // Create defs for patterns
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  svg.appendChild(defs);

  data.forEach((item, index) => {
    const angle = (item.value / total) * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArc = angle > Math.PI ? 1 : 0;
    const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Create pattern for image
    const patternId = `pattern-${index}`;
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', patternId);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', '700');
    pattern.setAttribute('height', '700');
    pattern.setAttribute('x', offsets[index].x);
    pattern.setAttribute('y', offsets[index].y);

    // Create image element for pattern
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    
    if (item.image) {
      image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', item.image);
      image.setAttribute('width', '700');
      image.setAttribute('height', '700');
      image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      image.setAttribute('x', '0');
      image.setAttribute('y', '0');
    }
    
    pattern.appendChild(image);
    defs.appendChild(pattern);

    // Create the slice path
    const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    slice.setAttribute('d', pathData);
    
    // Use pattern fill if image exists, otherwise use color
    if (item.image) {
      slice.setAttribute('fill', `url(#${patternId})`);
    } else {
      slice.setAttribute('fill', item.color);
    }
    
    slice.setAttribute('stroke', '#333');
    slice.setAttribute('stroke-width', '2');
    slice.setAttribute('class', 'pie-slice');
    slice.setAttribute('data-index', index);
    
    slice.addEventListener('mouseenter', function() {
      slice.style.filter = 'brightness(0.85)';
      
      const midAngle = (startAngle + endAngle) / 2;
      const tooltipX = centerX + (radius * 0.65) * Math.cos(midAngle);
      const tooltipY = centerY + (radius * 0.65) * Math.sin(midAngle);
      
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', tooltipX);
      text.setAttribute('y', tooltipY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#fff');
      text.setAttribute('font-size', '16');
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('pointer-events', 'none');
      text.setAttribute('class', 'pie-tooltip');
      text.setAttribute('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))');
      text.textContent = `${item.name}: ${item.value}`;
      
      svg.appendChild(text);
    });
    
    slice.addEventListener('mouseleave', function() {
      slice.style.filter = '';
      const tooltips = svg.querySelectorAll('.pie-tooltip');
      tooltips.forEach(t => t.remove());
    });
    
    svg.appendChild(slice);

    // Agregar etiqueta de nombre y valor si showLabel está activado
    if (item.showLabel) {
      const midAngle = (startAngle + endAngle) / 2;
      const labelRadius = radius * 0.5;
      const labelX = centerX + labelRadius * Math.cos(midAngle);
      const labelY = centerY + labelRadius * Math.sin(midAngle);
      
      const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      labelText.setAttribute('x', labelX);
      labelText.setAttribute('y', labelY);
      labelText.setAttribute('text-anchor', 'middle');
      labelText.setAttribute('dominant-baseline', 'middle');
      labelText.setAttribute('fill', '#fff');
      labelText.setAttribute('font-size', '14');
      labelText.setAttribute('font-weight', 'bold');
      labelText.setAttribute('pointer-events', 'none');
      labelText.setAttribute('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))');
      labelText.textContent = `${item.name}\n${item.value}`;
      
      svg.appendChild(labelText);
    }

    cumulativeAngle = endAngle;
  });
}

function updateData() {
  const listItems = dataList.querySelectorAll('li');
  
  // Actualizar data array
  listItems.forEach((li, index) => {
    const nameInput = li.querySelector('.name-input');
    const valueInput = li.querySelector('.value-input');
    const imageInput = li.querySelector('.image-input');
    const showLabelInput = li.querySelector('.show-label-input');
    const offsetXInput = li.querySelector('.offset-x-input');
    const offsetYInput = li.querySelector('.offset-y-input');
    
    if (data[index]) {
      data[index].name = nameInput ? (nameInput.value.trim() || `Item ${index + 1}`) : data[index].name;
      data[index].value = valueInput ? (Math.max(1, parseInt(valueInput.value) || 1)) : data[index].value;
      data[index].image = imageInput ? (imageInput.value.trim()) : '';
      data[index].showLabel = showLabelInput ? showLabelInput.checked : false;
    }
    
    if (offsets[index]) {
      offsets[index].x = offsetXInput ? (parseFloat(offsetXInput.value) || 0) : 0;
      offsets[index].y = offsetYInput ? (parseFloat(offsetYInput.value) || 0) : 0;
    }
  });
  
  saveToLocalStorage();
  drawPie();
}

function downloadChart() {
  const eventTitle = document.getElementById('event-title').value || 'Top 8';
  const svgElement = svg.cloneNode(true);
  
  // Función para convertir imagen a base64
  function imageToBase64(url) {
    return new Promise((resolve) => {
      if (!url) {
        resolve(null);
        return;
      }
      
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      };
      
      img.onerror = () => {
        resolve(null);
      };
      
      img.src = url;
    });
  }
  
  // Precargar todas las imágenes
  Promise.all(data.map(item => imageToBase64(item.image))).then(base64Images => {
    // Crear un nuevo SVG que incluya el título y el gráfico
    const downloadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    downloadSvg.setAttribute('width', '800');
    downloadSvg.setAttribute('height', '900');
    downloadSvg.setAttribute('viewBox', '0 0 800 900');
    downloadSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    downloadSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    
    // Fondo negro
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '800');
    bg.setAttribute('height', '900');
    bg.setAttribute('fill', '#000');
    downloadSvg.appendChild(bg);
    
    // Título
    const titleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    titleText.setAttribute('x', '400');
    titleText.setAttribute('y', '60');
    titleText.setAttribute('text-anchor', 'middle');
    titleText.setAttribute('font-size', '48');
    titleText.setAttribute('font-weight', '300');
    titleText.setAttribute('fill', '#fff');
    titleText.setAttribute('letter-spacing', '3');
    titleText.textContent = eventTitle;
    downloadSvg.appendChild(titleText);
    
    // Copiar contenido del SVG del gráfico
    const pieGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pieGroup.setAttribute('transform', 'translate(50, 120)');
    
    // Copiar elementos y reemplazar referencias de imágenes
    const svgClone = svgElement.cloneNode(true);
    
    // Reemplazar URLs de imágenes con base64
    const imageElements = svgClone.querySelectorAll('image');
    imageElements.forEach((imgEl, idx) => {
      if (base64Images[idx]) {
        imgEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', base64Images[idx]);
      }
    });
    
    Array.from(svgClone.childNodes).forEach(node => {
      pieGroup.appendChild(node.cloneNode(true));
    });
    downloadSvg.appendChild(pieGroup);
    
    const svgData = new XMLSerializer().serializeToString(downloadSvg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 900;
    
    const img = new Image();
    
    img.onload = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 800, 900);
      ctx.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${eventTitle.replace(/\s+/g, '-')}-${new Date().getTime()}.png`;
      link.click();
    };
    
    img.onerror = () => {
      // Si hay error, descargar como SVG
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${eventTitle.replace(/\s+/g, '-')}-${new Date().getTime()}.svg`;
      link.click();
      URL.revokeObjectURL(url);
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  });
}

function saveToLocalStorage() {
  const eventTitle = document.getElementById('event-title').value;
  const saveData = {
    title: eventTitle,
    data: data,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('tournament_data', JSON.stringify(saveData));
  return saveData;
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('tournament_data');
  if (saved) {
    try {
      const saveData = JSON.parse(saved);
      return saveData;
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      return null;
    }
  }
  return null;
}

function generateShareLink() {
  const eventTitle = document.getElementById('event-title').value || 'Top 8';
  const encoded = btoa(JSON.stringify({ title: eventTitle, data: data }));
  const shortId = 'evt_' + Date.now();
  localStorage.setItem(shortId, encoded);
  
  const shareUrl = `${window.location.origin}${window.location.pathname}?event=${shortId}`;
  return shareUrl;
}

function loadFromShareLink() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('event');
  
  if (eventId) {
    const encoded = localStorage.getItem(eventId);
    if (encoded) {
      try {
        const eventData = JSON.parse(atob(encoded));
        document.getElementById('event-title').value = eventData.title;
        data = eventData.data;
        // Actualizar offsets array si es necesario
        while (offsets.length < data.length) {
          offsets.push({ x: 0, y: 0 });
        }
        drawPie();
        populateEditor();
        return true;
      } catch (e) {
        console.error('Error loading event:', e);
        return false;
      }
    }
  }
  return false;
}

function shareEvent() {
  saveToLocalStorage();
  const shareUrl = generateShareLink();
  
  // Copiar al portapapeles
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('¡Link copiado al portapapeles!\n\n' + shareUrl);
    }).catch(() => {
      // Fallback si clipboard falla
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('¡Link copiado al portapapeles!\n\n' + shareUrl);
    });
  } else {
    // Fallback para navegadores antiguos
    alert('URL del evento:\n\n' + shareUrl);
  }
}

function populateEditor() {
  dataList.innerHTML = '';
  data.forEach((item, index) => {
    const itemElement = createItemElement(index, item);
    dataList.appendChild(itemElement);
  });
}

function createItemElement(index, itemData) {
  const li = document.createElement('li');
  li.className = 'editor-item';
  li.dataset.index = index;
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#FF7F50', '#98FB98'];
  const color = colors[index % colors.length];
  
  // Crear opciones del select
  const categoryOptions = Object.keys(categories).map(cat => 
    `<option value="${cat}" ${itemData.name === cat ? 'selected' : ''}>${cat}</option>`
  ).join('');
  
  li.innerHTML = `
    <div class="item-row">
      <select class="name-input">
        ${categoryOptions}
      </select>
      <input type="number" class="value-input" value="${itemData.value}" min="1" max="100">
      <button class="remove-btn">−</button>
    </div>
    <div class="item-row image-row" style="display: ${itemData.name === 'Personalizado' ? 'flex' : 'none'};">
      <input type="text" class="image-input" placeholder="URL Imagen (Personalizado)" value="${itemData.image || ''}">
    </div>
    <div class="item-row">
      <label class="label-checkbox">
        <input type="checkbox" class="show-label-input" ${itemData.showLabel ? 'checked' : ''}>
        <span>Mostrar nombre y cantidad</span>
      </label>
    </div>
    <div class="item-sliders">
      <label>X: <input type="range" class="offset-x-input" value="${itemData.offsetX || 0}" min="-350" max="350" step="5"></label>
      <label>Y: <input type="range" class="offset-y-input" value="${itemData.offsetY || 0}" min="-350" max="350" step="5"></label>
    </div>
  `;
  
  // Event listeners para los inputs
  const nameInput = li.querySelector('.name-input');
  const valueInput = li.querySelector('.value-input');
  const imageInput = li.querySelector('.image-input');
  const imageRow = li.querySelector('.image-row');
  const showLabelInput = li.querySelector('.show-label-input');
  const offsetXInput = li.querySelector('.offset-x-input');
  const offsetYInput = li.querySelector('.offset-y-input');
  const removeBtn = li.querySelector('.remove-btn');
  
  // Listener especial para el select de categoría
  nameInput.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    
    // Mostrar/ocultar input de URL según si es Personalizado
    imageRow.style.display = selectedCategory === 'Personalizado' ? 'flex' : 'none';
    
    if (selectedCategory !== 'Personalizado' && categories[selectedCategory]) {
      imageInput.value = categories[selectedCategory];
    } else {
      imageInput.value = '';
    }
    updateData();
  });
  
  nameInput.addEventListener('change', updateData);
  
  // Listener para el checkbox de mostrar etiqueta
  showLabelInput.addEventListener('change', updateData);
  
  [valueInput, imageInput].forEach(input => {
    input.addEventListener('change', updateData);
    input.addEventListener('input', () => {
      clearTimeout(input.updateTimeout);
      input.updateTimeout = setTimeout(updateData, 300);
    });
  });
  
  [offsetXInput, offsetYInput].forEach(slider => {
    slider.addEventListener('input', updateData);
    slider.addEventListener('change', updateData);
  });
  
  removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const idx = parseInt(li.dataset.index);
    data.splice(idx, 1);
    offsets.splice(idx, 1);
    li.remove();
    updateData();
  });
  
  // Guardar color en el item data
  itemData.color = color;
  
  return li;
}

function addNewItem() {
  // Seleccionar una categoría aleatoria (excepto Personalizado)
  const categoryList = Object.keys(categories).filter(cat => cat !== 'Personalizado');
  const randomCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
  
  const newItem = {
    name: randomCategory,
    value: 1,
    color: '#' + Math.floor(Math.random()*16777215).toString(16),
    image: categories[randomCategory] || ''
  };
  
  data.push(newItem);
  offsets.push({ x: 0, y: 0 });
  
  const itemElement = createItemElement(data.length - 1, newItem);
  dataList.appendChild(itemElement);
  
  updateData();
}

function attachListeners() {
  editBtn.addEventListener('click', () => {
    editorPanel.classList.remove('hidden');
    editorOverlay.classList.remove('hidden');
  });
  
  downloadBtn.addEventListener('click', downloadChart);
  shareBtn.addEventListener('click', shareEvent);
  
  addBtn.addEventListener('click', addNewItem);
  
  closeBtn.addEventListener('click', () => {
    editorPanel.classList.add('hidden');
    editorOverlay.classList.add('hidden');
    updateData();
  });
  
  editorOverlay.addEventListener('click', () => {
    editorPanel.classList.add('hidden');
    editorOverlay.classList.add('hidden');
    updateData();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Intentar cargar desde un link compartido
    if (!loadFromShareLink()) {
      // Si no hay link compartido, cargar datos por defecto
      populateEditor();
    }
    
    attachListeners();
    drawPie();
  });
} else {
  // Intentar cargar desde un link compartido
  if (!loadFromShareLink()) {
    // Si no hay link compartido, cargar datos por defecto
    populateEditor();
  }
  
  attachListeners();
  drawPie();
}
