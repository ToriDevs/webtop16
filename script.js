const svg = document.getElementById('pie-svg');
const editBtn = document.getElementById('edit-btn');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');
const closeBtn = document.getElementById('close-btn');
const editorPanel = document.getElementById('editor-panel');
const editorOverlay = document.getElementById('editor-overlay');
const dataList = document.getElementById('data-list');
const eventTitleInput = document.getElementById('event-title');
const langEsBtn = document.getElementById('lang-es');
const langEnBtn = document.getElementById('lang-en');
const langFrBtn = document.getElementById('lang-fr');

const CHART_SIZE = 700;
const centerX = CHART_SIZE / 2;
const centerY = CHART_SIZE / 2;
const radius = CHART_SIZE / 2 - 40;
const LOCAL_STORAGE_KEY = 'tournament_data';
const SHARED_EVENT_PREFIX = 'shared_event_';
const LANGUAGE_STORAGE_KEY = 'ui_language';

const SUPABASE_URL = 'https://ddsjuhygkfamlsqnkafr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_fQG7Ih4_TyJQnSGws1x7lw_FNMyl_Hg';

const supabaseClient =
  window.supabase && SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
    : null;

const categories = {
  Draven: 'https://tcgplayer-cdn.tcgplayer.com/product/663442_in_1000x1000.jpg',
  Irelia: 'https://tcgplayer-cdn.tcgplayer.com/product/663441_in_1000x1000.jpg',
  Ezreal: 'https://tcgplayer-cdn.tcgplayer.com/product/664927_in_1000x1000.jpg',
  Viktor: 'https://tcgplayer-cdn.tcgplayer.com/product/653063_in_1000x1000.jpg',
  Lucian: 'https://riftdecks.com/img/cards/riftbound/SFD/sfd-183-221_full.png',
  "Kai'sa": 'https://tcgplayer-cdn.tcgplayer.com/product/653045_in_1000x1000.jpg',
  Sivir: 'https://tcgplayer-cdn.tcgplayer.com/product/663438_in_1000x1000.jpg',
  "Rek'sai": 'https://tcgplayer-cdn.tcgplayer.com/product/664922_in_1000x1000.jpg',
  'Miss Fortune': 'https://tcgplayer-cdn.tcgplayer.com/product/653065_in_1000x1000.jpg',
  Ornn: 'https://tcgplayer-cdn.tcgplayer.com/product/664924_in_1000x1000.jpg',
  Annie: 'https://tcgplayer-cdn.tcgplayer.com/product/653152_in_1000x1000.jpg',
  Lux: 'https://tcgplayer-cdn.tcgplayer.com/product/653156_in_1000x1000.jpg',
  Yi: 'https://tcgplayer-cdn.tcgplayer.com/product/653154_in_1000x1000.jpg',
  Fiora: 'https://tcgplayer-cdn.tcgplayer.com/product/664928_in_1000x1000.jpg',
  Azir: 'https://tcgplayer-cdn.tcgplayer.com/product/663440_in_1000x1000.jpg',
  Jax: 'https://tcgplayer-cdn.tcgplayer.com/product/664925_in_1000x1000.jpg',
  Personalizado: ''
};

const palette = ['#EE6C4D', '#3D5A80', '#2A9D8F', '#E9C46A', '#F4A261', '#4D908E', '#577590', '#BC6C25', '#6D597A', '#4361EE'];

const I18N = {
  es: {
    eyebrow: 'Visualizador de Torneos',
    title: 'Generador de Participacion',
    subtitle: 'Crea, personaliza y comparte distribuciones de decks con un look limpio y listo para publicar.',
    edit: 'Editar',
    download: 'Descargar',
    share: 'Compartir',
    editData: 'Editar Datos',
    reset: 'Reset',
    defaultEventTitle: 'Nombre del evento',
    eventPlaceholder: 'Nombre del evento',
    chartLabel: 'Grafico de distribucion',
    customNamePlaceholder: 'Nombre personalizado',
    customImagePlaceholder: 'URL de imagen personalizada',
    showLabel: 'Mostrar nombre y cantidad',
    sharePreviewTitle: 'Previsualizacion del enlace',
    sharePreviewAlt: 'Previsualizacion del evento',
    copyLink: 'Copiar link',
    linkCopied: 'Link copiado',
    close: 'Cerrar',
    resetConfirm: 'Se reseteara todo el evento actual. Quieres continuar?',
    downloadError: 'No se pudo generar la imagen para descargar.',
    previewError: 'No se pudo renderizar la previsualizacion',
    shareSaved: 'Guardado en Supabase y copiado al portapapeles.',
    shareFallback: 'Copiado con fallback local. En otros dispositivos requiere Supabase activo.',
    shareReady: 'Link listo.',
    copyPrompt: 'Copia y comparte este link:'
  },
  en: {
    eyebrow: 'Tournament Visualizer',
    title: 'Participation Generator',
    subtitle: 'Create, customize and share deck distribution visuals with a clean look ready to publish.',
    edit: 'Edit',
    download: 'Download',
    share: 'Share',
    editData: 'Edit Data',
    reset: 'Reset',
    defaultEventTitle: 'Event name',
    eventPlaceholder: 'Event name',
    chartLabel: 'Distribution chart',
    customNamePlaceholder: 'Custom name',
    customImagePlaceholder: 'Custom image URL',
    showLabel: 'Show name and amount',
    sharePreviewTitle: 'Link preview',
    sharePreviewAlt: 'Event preview',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    close: 'Close',
    resetConfirm: 'This will reset the current event. Continue?',
    downloadError: 'Could not generate the image for download.',
    previewError: 'Could not render preview image',
    shareSaved: 'Saved in Supabase and copied to clipboard.',
    shareFallback: 'Copied with local fallback. Other devices require Supabase.',
    shareReady: 'Link ready.',
    copyPrompt: 'Copy and share this link:'
  },
  fr: {
    eyebrow: 'Visualiseur de Tournois',
    title: 'Generateur de Participation',
    subtitle: 'Creez, personnalisez et partagez des repartitions de decks avec un rendu propre et pret a publier.',
    edit: 'Modifier',
    download: 'Telecharger',
    share: 'Partager',
    editData: 'Modifier les donnees',
    reset: 'Reset',
    defaultEventTitle: "Nom de l'evenement",
    eventPlaceholder: "Nom de l'evenement",
    chartLabel: 'Graphique de repartition',
    customNamePlaceholder: 'Nom personnalise',
    customImagePlaceholder: "URL de l'image personnalisee",
    showLabel: 'Afficher nom et quantite',
    sharePreviewTitle: 'Apercu du lien',
    sharePreviewAlt: "Apercu de l'evenement",
    copyLink: 'Copier le lien',
    linkCopied: 'Lien copie',
    close: 'Fermer',
    resetConfirm: "Cela va reinitialiser l'evenement actuel. Continuer ?",
    downloadError: "Impossible de generer l'image a telecharger.",
    previewError: "Impossible de generer l'apercu",
    shareSaved: 'Sauvegarde sur Supabase et copie dans le presse-papiers.',
    shareFallback: 'Copie avec fallback local. Les autres appareils necessitent Supabase.',
    shareReady: 'Lien pret.',
    copyPrompt: 'Copiez et partagez ce lien :'
  }
};

let currentLanguage = 'en';

function t(key) {
  const langPack = I18N[currentLanguage] || I18N.en;
  return langPack[key] || I18N.en[key] || key;
}

function isDefaultTitle(value) {
  const normalized = (value || '').trim();
  return Object.values(I18N).some((pack) => pack.defaultEventTitle === normalized);
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    node.textContent = t(key);
  });

  eventTitleInput.placeholder = t('eventPlaceholder');
  if (!eventTitleInput.value || isDefaultTitle(eventTitleInput.value)) {
    eventTitleInput.value = t('defaultEventTitle');
  }

  svg.setAttribute('aria-label', t('chartLabel'));
  addBtn.title = t('editData');
  resetBtn.title = t('reset');

  [langEsBtn, langEnBtn, langFrBtn].forEach((btn) => btn.classList.remove('is-active'));
  const activeBtn = currentLanguage === 'es' ? langEsBtn : currentLanguage === 'fr' ? langFrBtn : langEnBtn;
  activeBtn.classList.add('is-active');

  populateEditor();
  drawPie();
}

function setLanguage(nextLanguage) {
  currentLanguage = I18N[nextLanguage] ? nextLanguage : 'en';
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  applyTranslations();
}

const INITIAL_DATA = [
  { category: 'Draven', name: 'Draven', customName: '', value: 7, color: '#EE6C4D', image: '', showLabel: false },
  { category: 'Irelia', name: 'Irelia', customName: '', value: 2, color: '#3D5A80', image: '', showLabel: false },
  { category: 'Ezreal', name: 'Ezreal', customName: '', value: 2, color: '#2A9D8F', image: '', showLabel: false },
  { category: 'Viktor', name: 'Viktor', customName: '', value: 1, color: '#E9C46A', image: '', showLabel: false },
  { category: 'Lucian', name: 'Lucian', customName: '', value: 1, color: '#F4A261', image: '', showLabel: false },
  { category: "Kai'sa", name: "Kai'sa", customName: '', value: 1, color: '#4D908E', image: '', showLabel: false },
  { category: 'Sivir', name: 'Sivir', customName: '', value: 1, color: '#577590', image: '', showLabel: false },
  { category: "Rek'sai", name: "Rek'sai", customName: '', value: 1, color: '#BC6C25', image: '', showLabel: false }
];

let data = JSON.parse(JSON.stringify(INITIAL_DATA));

let offsets = Array.from({ length: data.length }, () => ({ x: 0, y: 0 }));

function ensureDefaults(item, index) {
  const category = item.category || (categories[item.name] ? item.name : 'Personalizado');
  const color = item.color || palette[index % palette.length];
  const customName = item.customName || '';
  const normalizedName =
    category === 'Personalizado'
      ? customName || item.name || `Item ${index + 1}`
      : category;
  const image = category === 'Personalizado' ? item.image || '' : categories[category] || item.image || '';

  return {
    category,
    name: normalizedName,
    customName,
    value: Math.max(1, parseInt(item.value, 10) || 1),
    color,
    image,
    showLabel: Boolean(item.showLabel)
  };
}

function normalizeState() {
  data = data.map((item, index) => ensureDefaults(item, index));

  while (offsets.length < data.length) {
    offsets.push({ x: 0, y: 0 });
  }

  offsets = offsets.slice(0, data.length).map((offset) => ({
    x: Number(offset?.x) || 0,
    y: Number(offset?.y) || 0
  }));
}

function drawPie() {
  svg.setAttribute('viewBox', `0 0 ${CHART_SIZE} ${CHART_SIZE}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.innerHTML = '';
  normalizeState();

  let total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) {
    total = 1;
  }

  let cumulativeAngle = -Math.PI / 2;

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

    const patternId = `pattern-${index}`;
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', patternId);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', '700');
    pattern.setAttribute('height', '700');
    pattern.setAttribute('x', offsets[index].x);
    pattern.setAttribute('y', offsets[index].y);

    const fallbackRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    fallbackRect.setAttribute('width', '700');
    fallbackRect.setAttribute('height', '700');
    fallbackRect.setAttribute('fill', item.color);
    pattern.appendChild(fallbackRect);

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

    const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    slice.setAttribute('d', pathData);
    slice.setAttribute('fill', `url(#${patternId})`);
    slice.setAttribute('stroke', '#111822');
    slice.setAttribute('stroke-width', '2');
    slice.setAttribute('class', 'pie-slice');

    slice.addEventListener('mouseenter', () => {
      slice.style.filter = 'brightness(0.84)';
      const midAngle = (startAngle + endAngle) / 2;
      const tooltipX = centerX + radius * 0.65 * Math.cos(midAngle);
      const tooltipY = centerY + radius * 0.65 * Math.sin(midAngle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', tooltipX);
      text.setAttribute('y', tooltipY);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', '#F9FAFB');
      text.setAttribute('font-size', '16');
      text.setAttribute('font-family', 'Space Grotesk');
      text.setAttribute('font-weight', '600');
      text.setAttribute('pointer-events', 'none');
      text.setAttribute('class', 'pie-tooltip');
      text.textContent = `${item.name}: ${item.value}`;
      svg.appendChild(text);
    });

    slice.addEventListener('mouseleave', () => {
      slice.style.filter = '';
      svg.querySelectorAll('.pie-tooltip').forEach((tooltip) => tooltip.remove());
    });

    svg.appendChild(slice);

    if (item.showLabel) {
      const midAngle = (startAngle + endAngle) / 2;
      const labelX = centerX + radius * 0.5 * Math.cos(midAngle);
      const labelY = centerY + radius * 0.5 * Math.sin(midAngle);

      const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      labelText.setAttribute('x', labelX);
      labelText.setAttribute('y', labelY);
      labelText.setAttribute('text-anchor', 'middle');
      labelText.setAttribute('dominant-baseline', 'middle');
      labelText.setAttribute('fill', '#FFFFFF');
      labelText.setAttribute('font-size', '13');
      labelText.setAttribute('font-family', 'Space Grotesk');
      labelText.setAttribute('font-weight', '600');
      labelText.setAttribute('pointer-events', 'none');
      labelText.textContent = `${item.name} (${item.value})`;
      svg.appendChild(labelText);
    }

    cumulativeAngle = endAngle;
  });
}

function buildEventPayload() {
  return {
    title: getCurrentEventTitle(),
    data,
    offsets,
    version: 2,
    createdAt: new Date().toISOString()
  };
}

function getCurrentEventTitle() {
  const value = eventTitleInput.value ? eventTitleInput.value.trim() : '';
  return value || t('defaultEventTitle');
}

function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(buildEventPayload()));
}

function loadFromLocalStorage() {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    return false;
  }

  try {
    const parsed = JSON.parse(raw);
    applyEventState(parsed);
    return true;
  } catch (error) {
    console.error('Error loading local data:', error);
    return false;
  }
}

function applyEventState(eventData) {
  if (!eventData) {
    return;
  }

  if (eventData.title) {
    eventTitleInput.value = eventData.title;
  }

  if (Array.isArray(eventData.data) && eventData.data.length) {
    data = eventData.data;
  }

  if (Array.isArray(eventData.offsets)) {
    offsets = eventData.offsets;
  }

  normalizeState();
}

function updateData() {
  const listItems = dataList.querySelectorAll('li');

  listItems.forEach((li, index) => {
    const categoryInput = li.querySelector('.category-select');
    const customNameInput = li.querySelector('.custom-name-input');
    const valueInput = li.querySelector('.value-input');
    const imageInput = li.querySelector('.image-input');
    const showLabelInput = li.querySelector('.show-label-input');
    const offsetXInput = li.querySelector('.offset-x-input');
    const offsetYInput = li.querySelector('.offset-y-input');

    if (!data[index]) {
      return;
    }

    const category = categoryInput ? categoryInput.value : 'Personalizado';
    const customName = customNameInput ? customNameInput.value.trim() : '';

    data[index].category = category;
    data[index].customName = customName;
    data[index].name = category === 'Personalizado' ? customName || 'Personalizado' : category;
    data[index].value = valueInput ? Math.max(1, parseInt(valueInput.value, 10) || 1) : 1;
    data[index].image =
      category === 'Personalizado'
        ? imageInput
          ? imageInput.value.trim()
          : ''
        : categories[category] || '';
    data[index].showLabel = showLabelInput ? showLabelInput.checked : false;

    if (offsets[index]) {
      offsets[index].x = offsetXInput ? parseFloat(offsetXInput.value) || 0 : 0;
      offsets[index].y = offsetYInput ? parseFloat(offsetYInput.value) || 0 : 0;
    }
  });

  saveToLocalStorage();
  drawPie();
}

async function imageToBase64(url) {
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

    img.onerror = () => resolve(null);
    img.src = url;
  });
}

async function renderChartCanvas() {
  const eventTitle = getCurrentEventTitle();
  const svgElement = svg.cloneNode(true);
  const base64Images = await Promise.all(data.map((item) => imageToBase64(item.image)));

  const downloadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  downloadSvg.setAttribute('width', '800');
  downloadSvg.setAttribute('height', '900');
  downloadSvg.setAttribute('viewBox', '0 0 800 900');
  downloadSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  downloadSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '800');
  bg.setAttribute('height', '900');
  bg.setAttribute('fill', '#0A111C');
  downloadSvg.appendChild(bg);

  const titleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  titleText.setAttribute('x', '400');
  titleText.setAttribute('y', '64');
  titleText.setAttribute('text-anchor', 'middle');
  titleText.setAttribute('font-size', '44');
  titleText.setAttribute('font-family', 'Space Grotesk');
  titleText.setAttribute('font-weight', '700');
  titleText.setAttribute('fill', '#F8FAFC');
  titleText.textContent = eventTitle;
  downloadSvg.appendChild(titleText);

  const pieGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  pieGroup.setAttribute('transform', 'translate(50, 120)');

  const svgClone = svgElement.cloneNode(true);
  svgClone.querySelectorAll('image').forEach((imgEl, idx) => {
    if (base64Images[idx]) {
      imgEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', base64Images[idx]);
    }
  });

  Array.from(svgClone.childNodes).forEach((node) => {
    pieGroup.appendChild(node.cloneNode(true));
  });

  downloadSvg.appendChild(pieGroup);

  const svgData = new XMLSerializer().serializeToString(downloadSvg);
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 900;

  const ctx = canvas.getContext('2d');

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      ctx.fillStyle = '#0A111C';
      ctx.fillRect(0, 0, 800, 900);
      ctx.drawImage(img, 0, 0);
      resolve(canvas);
    };

    img.onerror = () => reject(new Error(t('previewError')));
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  });
}

async function downloadChart() {
  const eventTitle = getCurrentEventTitle();

  try {
    const canvas = await renderChartCanvas();
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${eventTitle.replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.click();
  } catch (error) {
    console.error('Download render error:', error);
    alert(t('downloadError'));
  }
}

function randomShareId() {
  const token = Math.random().toString(36).slice(2, 10);
  return `evt_${Date.now().toString(36)}_${token}`;
}

function createEventSlug(title) {
  const raw = (title || 'evento').toString().trim().toLowerCase();
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'evento';
}

function getSharedRouteParts() {
  const hash = window.location.hash || '';
  const cleanHash = hash.replace(/^#\/?/, '');
  if (!cleanHash) {
    return null;
  }

  const parts = cleanHash.split('/').map((part) => decodeURIComponent(part.trim())).filter(Boolean);
  if (parts.length < 2) {
    return null;
  }

  return {
    slug: parts[0],
    eventId: parts[1]
  };
}

function buildPrettyShareUrl(baseUrl, slug, eventId) {
  return `${baseUrl}#/${encodeURIComponent(slug)}/${encodeURIComponent(eventId)}`;
}

function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const queryEventId = params.get('event');
  if (queryEventId) {
    return queryEventId;
  }

  const routeParts = getSharedRouteParts();
  return routeParts ? routeParts.eventId : '';
}

function getTitleFromUrlParam() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('nombre');
  const routeSlug = getSharedRouteParts()?.slug || '';
  const finalSlug = slug || routeSlug;
  if (!finalSlug) {
    return '';
  }

  return finalSlug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .trim();
}

async function saveEventToSupabase(eventPayload) {
  if (!supabaseClient) {
    return { eventId: null, source: 'none' };
  }

  const eventId = randomShareId();
  const { error } = await supabaseClient.from('shared_events').insert({
    event_id: eventId,
    title: eventPayload.title,
    payload: eventPayload
  });

  if (error) {
    console.error('Supabase save error:', error);
    return { eventId: null, source: 'none' };
  }

  return { eventId, source: 'supabase' };
}

function saveSharedEventToLocal(eventId, eventPayload) {
  try {
    const key = `${SHARED_EVENT_PREFIX}${eventId}`;
    localStorage.setItem(key, JSON.stringify(eventPayload));
    return true;
  } catch (error) {
    console.error('Local shared save error:', error);
    return false;
  }
}

function loadSharedEventFromLocal(eventId) {
  try {
    const key = `${SHARED_EVENT_PREFIX}${eventId}`;
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Local shared load error:', error);
    return null;
  }
}

async function loadFromEventId() {
  const eventId = getEventIdFromUrl();

  if (!eventId) {
    return false;
  }

  if (supabaseClient) {
    const { data: row, error } = await supabaseClient
      .from('shared_events')
      .select('payload')
      .eq('event_id', eventId)
      .single();

    if (!error && row?.payload) {
      applyEventState(row.payload);
      return true;
    }

    if (error) {
      console.error('Supabase load error:', error);
    }
  }

  const localPayload = loadSharedEventFromLocal(eventId);
  if (localPayload) {
    applyEventState(localPayload);
    return true;
  }

  return false;
}

function generateLegacyShareLink() {
  const payload = buildEventPayload();
  const encoded = btoa(JSON.stringify(payload));
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const slug = createEventSlug(payload.title);
  return `${baseUrl}?shared=${encodeURIComponent(encoded)}&nombre=${encodeURIComponent(slug)}`;
}

function loadFromLegacyShareLink() {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get('shared');

  if (!encodedData) {
    return false;
  }

  try {
    const eventData = JSON.parse(atob(decodeURIComponent(encodedData)));
    applyEventState(eventData);
    return true;
  } catch (error) {
    console.error('Error loading shared event:', error);
    return false;
  }
}

function showSharePreviewModal(shareUrl, previewImageDataUrl) {
  const previous = document.getElementById('share-preview-modal');
  if (previous) {
    previous.remove();
  }

  const modal = document.createElement('div');
  modal.id = 'share-preview-modal';
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.zIndex = '2000';
  modal.style.background = 'rgba(3, 8, 15, 0.75)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.padding = '18px';

  const card = document.createElement('div');
  card.style.width = 'min(860px, 96vw)';
  card.style.maxHeight = '92vh';
  card.style.overflow = 'auto';
  card.style.background = '#0B131F';
  card.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  card.style.borderRadius = '14px';
  card.style.padding = '16px';
  card.style.boxShadow = '0 18px 46px rgba(0, 0, 0, 0.5)';

  const title = document.createElement('h3');
  title.textContent = t('sharePreviewTitle');
  title.style.margin = '0 0 12px';
  title.style.color = '#E6EEF8';
  title.style.fontFamily = 'Space Grotesk, sans-serif';

  const image = document.createElement('img');
  image.src = previewImageDataUrl;
  image.alt = t('sharePreviewAlt');
  image.style.width = '100%';
  image.style.borderRadius = '10px';
  image.style.border = '1px solid rgba(148, 163, 184, 0.3)';
  image.style.marginBottom = '12px';

  const linkBox = document.createElement('input');
  linkBox.type = 'text';
  linkBox.value = shareUrl;
  linkBox.readOnly = true;
  linkBox.style.width = '100%';
  linkBox.style.padding = '10px';
  linkBox.style.borderRadius = '8px';
  linkBox.style.border = '1px solid rgba(148, 163, 184, 0.4)';
  linkBox.style.background = 'rgba(7, 14, 24, 0.85)';
  linkBox.style.color = '#D8E6F5';
  linkBox.style.marginBottom = '12px';

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.flexWrap = 'wrap';

  const copyBtn = document.createElement('button');
  copyBtn.textContent = t('copyLink');
  copyBtn.style.flex = '1';
  copyBtn.style.padding = '10px';
  copyBtn.style.border = '1px solid rgba(57, 208, 255, 0.55)';
  copyBtn.style.background = 'rgba(57, 208, 255, 0.18)';
  copyBtn.style.color = '#EAF7FF';
  copyBtn.style.borderRadius = '8px';
  copyBtn.style.cursor = 'pointer';
  copyBtn.style.minWidth = '160px';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = t('close');
  closeBtn.style.flex = '1';
  closeBtn.style.padding = '10px';
  closeBtn.style.border = '1px solid rgba(148, 163, 184, 0.35)';
  closeBtn.style.background = 'rgba(18, 27, 40, 0.9)';
  closeBtn.style.color = '#EAF7FF';
  closeBtn.style.borderRadius = '8px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.minWidth = '120px';

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      copyBtn.textContent = t('linkCopied');
    } catch (error) {
      linkBox.select();
      document.execCommand('copy');
      copyBtn.textContent = t('linkCopied');
    }
  });

  const closeModal = () => modal.remove();
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  row.appendChild(copyBtn);
  row.appendChild(closeBtn);
  card.appendChild(title);
  card.appendChild(image);
  card.appendChild(linkBox);
  card.appendChild(row);
  modal.appendChild(card);
  document.body.appendChild(modal);
}

async function shareEvent() {
  const payload = buildEventPayload();
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const slug = createEventSlug(payload.title);

  let previewImageDataUrl = '';
  try {
    const previewCanvas = await renderChartCanvas();
    previewImageDataUrl = previewCanvas.toDataURL('image/jpeg', 0.88);
    payload.previewImage = previewImageDataUrl;
  } catch (error) {
    console.error('Preview render error:', error);
  }

  const generatedEventId = randomShareId();
  const supabaseResult = await saveEventToSupabase(payload);
  const finalEventId = supabaseResult.eventId || generatedEventId;

  if (!supabaseResult.eventId) {
    saveSharedEventToLocal(finalEventId, payload);
  }

  const shareUrl = buildPrettyShareUrl(baseUrl, slug, finalEventId);

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      if (previewImageDataUrl) {
        showSharePreviewModal(shareUrl, previewImageDataUrl);
      } else {
        const backendMessage = supabaseResult.eventId ? t('shareSaved') : t('shareFallback');
        alert(`${t('shareReady')} ${backendMessage}`);
      }
      return;
    } catch (error) {
      console.error('Clipboard error:', error);
    }
  }

  if (previewImageDataUrl) {
    showSharePreviewModal(shareUrl, previewImageDataUrl);
    return;
  }

  prompt(t('copyPrompt'), shareUrl);
}

function populateEditor() {
  dataList.innerHTML = '';
  normalizeState();

  data.forEach((item, index) => {
    dataList.appendChild(createItemElement(index, item));
  });
}

function createItemElement(index, itemData) {
  const li = document.createElement('li');
  li.className = 'editor-item';
  li.dataset.index = index;

  itemData.color = itemData.color || palette[index % palette.length];

  const optionsHtml = Object.keys(categories)
    .map((cat) => `<option value="${cat}" ${itemData.category === cat ? 'selected' : ''}>${cat}</option>`)
    .join('');

  const isCustom = itemData.category === 'Personalizado';
  const customName = isCustom ? itemData.customName || itemData.name || '' : '';

  li.innerHTML = `
    <div class="item-row top-row">
      <select class="category-select">${optionsHtml}</select>
      <input type="number" class="value-input" value="${itemData.value}" min="1" max="999">
      <button class="remove-btn" type="button">-</button>
    </div>
    <div class="item-row custom-name-row" style="display:${isCustom ? 'block' : 'none'};">
      <input type="text" class="custom-name-input" placeholder="${t('customNamePlaceholder')}" value="${customName}">
    </div>
    <div class="item-row image-row" style="display:${isCustom ? 'block' : 'none'};">
      <input type="text" class="image-input" placeholder="${t('customImagePlaceholder')}" value="${isCustom ? itemData.image || '' : ''}">
    </div>
    <div class="item-row checkbox-row">
      <label class="label-checkbox">
        <input type="checkbox" class="show-label-input" ${itemData.showLabel ? 'checked' : ''}>
        <span>${t('showLabel')}</span>
      </label>
    </div>
    <div class="item-sliders">
      <label>X<input type="range" class="offset-x-input" value="${offsets[index]?.x || 0}" min="-350" max="350" step="5"></label>
      <label>Y<input type="range" class="offset-y-input" value="${offsets[index]?.y || 0}" min="-350" max="350" step="5"></label>
    </div>
  `;

  const categoryInput = li.querySelector('.category-select');
  const customNameInput = li.querySelector('.custom-name-input');
  const valueInput = li.querySelector('.value-input');
  const imageInput = li.querySelector('.image-input');
  const imageRow = li.querySelector('.image-row');
  const customNameRow = li.querySelector('.custom-name-row');
  const showLabelInput = li.querySelector('.show-label-input');
  const offsetXInput = li.querySelector('.offset-x-input');
  const offsetYInput = li.querySelector('.offset-y-input');
  const removeBtn = li.querySelector('.remove-btn');

  categoryInput.addEventListener('change', (event) => {
    const selected = event.target.value;
    const showCustom = selected === 'Personalizado';
    imageRow.style.display = showCustom ? 'block' : 'none';
    customNameRow.style.display = showCustom ? 'block' : 'none';

    if (!showCustom) {
      imageInput.value = categories[selected] || '';
      customNameInput.value = '';
    }

    updateData();
  });

  [customNameInput, valueInput, imageInput].forEach((input) => {
    input.addEventListener('input', () => {
      clearTimeout(input.updateTimeout);
      input.updateTimeout = setTimeout(updateData, 180);
    });
    input.addEventListener('change', updateData);
  });

  showLabelInput.addEventListener('change', updateData);
  offsetXInput.addEventListener('input', updateData);
  offsetYInput.addEventListener('input', updateData);

  removeBtn.addEventListener('click', () => {
    const idx = parseInt(li.dataset.index, 10);
    data.splice(idx, 1);
    offsets.splice(idx, 1);
    populateEditor();
    updateData();
  });

  return li;
}

function addNewItem() {
  const list = Object.keys(categories).filter((cat) => cat !== 'Personalizado');
  const randomCategory = list[Math.floor(Math.random() * list.length)];

  data.push(
    ensureDefaults(
      {
        category: randomCategory,
        name: randomCategory,
        value: 1,
        image: categories[randomCategory],
        color: palette[data.length % palette.length],
        showLabel: false
      },
      data.length
    )
  );

  offsets.push({ x: 0, y: 0 });
  populateEditor();
  updateData();
}

function attachListeners() {
  editBtn.addEventListener('click', () => {
    editorPanel.classList.remove('hidden');
    editorOverlay.classList.remove('hidden');
  });

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

  downloadBtn.addEventListener('click', downloadChart);
  shareBtn.addEventListener('click', shareEvent);
  addBtn.addEventListener('click', addNewItem);
  langEsBtn.addEventListener('click', () => setLanguage('es'));
  langEnBtn.addEventListener('click', () => setLanguage('en'));
  langFrBtn.addEventListener('click', () => setLanguage('fr'));
  resetBtn.addEventListener('click', () => {
    if (!window.confirm(t('resetConfirm'))) {
      return;
    }

    data = JSON.parse(JSON.stringify(INITIAL_DATA));
    offsets = Array.from({ length: data.length }, () => ({ x: 0, y: 0 }));
    eventTitleInput.value = t('defaultEventTitle');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    populateEditor();
    drawPie();
  });

  eventTitleInput.addEventListener('input', saveToLocalStorage);
}

async function initializeApp() {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  currentLanguage = I18N[storedLanguage] ? storedLanguage : 'en';

  const loadedFromEvent = await loadFromEventId();
  const loadedFromLegacy = loadedFromEvent ? false : loadFromLegacyShareLink();

  if (!loadedFromEvent && !loadedFromLegacy) {
    loadFromLocalStorage();
  }

  if (!eventTitleInput.value || isDefaultTitle(eventTitleInput.value)) {
    const titleFromUrl = getTitleFromUrlParam();
    if (titleFromUrl) {
      eventTitleInput.value = titleFromUrl;
    }
  }

  normalizeState();
  applyTranslations();
  attachListeners();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
