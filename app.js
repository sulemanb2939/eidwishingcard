// =============================================
//  EID CARD GENERATOR — MAIN APPLICATION
// =============================================

'use strict';

// ===== STATE =====
let state = {
  currentTemplate: TEMPLATES[0],
  userName: '',
  userMessage: '',
  smsIndex: 0,
  darkMode: true,
  activeFilter: 'all'
};

// ===== DOM REFS =====
const $id = id => document.getElementById(id);
const homepage    = $id('homepage');
const builderPage = $id('builderPage');
const nameInput   = $id('nameInput');
const cardPreview = $id('cardPreview');
const templateGrid = $id('templateGrid');
const smsCounter  = $id('smsCounter');
const toast       = $id('toast');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initStarCanvas();
  initBokeh();
  initNav();
  initBuilder();
  initMessageStudio();
  renderCard();
  renderTemplates();
});

// ===== STAR CANVAS =====
function initStarCanvas() {
  const canvas = $id('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 4000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
        dir: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,215,0,${s.alpha * 0.8})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

// ===== BOKEH PARTICLES =====
function initBokeh() {
  const layer = $id('bokehLayer');
  if (!layer) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'bokeh-particle';
    const size = Math.random() * 120 + 30;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*12+8}s;
      animation-delay:${Math.random()*8}s;
      opacity:${Math.random()*0.4+0.1};
    `;
    layer.appendChild(p);
  }
}

// ===== NAVIGATION =====
function initNav() {
  const goBuilder = filter => {
    if (filter) state.activeFilter = filter;
    switchPage('builder');
  };

  $id('navCreateBtn').addEventListener('click', () => goBuilder('all'));
  $id('heroCreateBtn').addEventListener('click', () => goBuilder('all'));
  $id('heroExploreBtn').addEventListener('click', () => {
    document.querySelector('.showcase').scrollIntoView({ behavior: 'smooth' });
  });
  $id('backBtn').addEventListener('click', () => switchPage('home'));
  $id('darkToggle').addEventListener('click', toggleDarkMode);

  // Category cards on homepage
  document.querySelectorAll('.cat-card').forEach(el => {
    el.addEventListener('click', () => {
      const cat = el.dataset.cat;
      goBuilder(cat);
    });
  });
}

function switchPage(page) {
  if (page === 'builder') {
    homepage.classList.remove('active');
    builderPage.classList.add('active');
    applyFilter(state.activeFilter);
  } else {
    builderPage.classList.remove('active');
    homepage.classList.add('active');
    state.activeFilter = 'all';
  }
  window.scrollTo(0, 0);
}

function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  document.body.classList.toggle('light-mode', !state.darkMode);
  $id('darkToggle').textContent = state.darkMode ? '🌙' : '☀️';
}

// ===== TEMPLATE SYSTEM =====
function renderTemplates() {
  templateGrid.innerHTML = '';
  const filtered = state.activeFilter === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === state.activeFilter);

  filtered.forEach(t => {
    const el = document.createElement('div');
    el.className = 'template-thumb tpl-' + t.id;
    el.setAttribute('data-id', t.id);
    if (t.id === state.currentTemplate.id) el.classList.add('selected');

    el.innerHTML = `
      <div class="t-emoji">${t.emoji}</div>
      <div class="t-name">${t.name}</div>
      <div class="t-cat">${t.category}</div>
      ${t.id === state.currentTemplate.id ? '<div class="selected-badge">✓</div>' : ''}
    `;
    el.addEventListener('click', () => selectTemplate(t));
    templateGrid.appendChild(el);
  });
}

function selectTemplate(template) {
  state.currentTemplate = template;
  document.querySelectorAll('.template-thumb').forEach(el => {
    const isSelected = parseInt(el.dataset.id) === template.id;
    el.classList.toggle('selected', isSelected);
    const badge = el.querySelector('.selected-badge');
    if (isSelected && !badge) {
      const b = document.createElement('div');
      b.className = 'selected-badge';
      b.textContent = '✓';
      el.appendChild(b);
    } else if (!isSelected && badge) {
      badge.remove();
    }
  });
  renderCard();
}

function applyFilter(filter) {
  state.activeFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.filter === filter);
  });
  renderTemplates();
}

// Filter tabs
function initBuilder() {
  document.querySelectorAll('.filter-tab').forEach(el => {
    el.addEventListener('click', () => applyFilter(el.dataset.filter));
  });

  nameInput.addEventListener('input', () => {
    state.userName = nameInput.value.trim();
    renderCard();
  });

  $id('downloadBtn').addEventListener('click', downloadCard);
  $id('shareBtn').addEventListener('click', shareWithImage);
}

// ===== CARD RENDERER =====
function renderCard() {
  const t = state.currentTemplate;
  const name = state.userName || 'عزیزم';
  const dua = 'تَقَبَّلَ اللهُ مِنَّا وَمِنكُم';
  const msg = state.userMessage;

  // Build floating stars for each template
  const starsHTML = buildCardStars(t);
  const elementsHTML = buildCardElements(t);

  // Message block — only shown if user has typed something
  const messageHTML = msg
    ? `<div class="card-message-wrap">
        <div class="card-msg-line"></div>
        <div class="card-message">${escapeHTML(msg)}</div>
        <div class="card-msg-line"></div>
       </div>`
    : '';

  const cardHTML = `
    <div class="card-inner tpl-${t.id}" id="cardInner">
      ${starsHTML}
      ${elementsHTML}
      <div class="card-dua" style="font-size:clamp(13px,2.2vw,18px);margin-bottom:2px;">${dua}</div>
      <div class="card-divider"></div>
      <div class="card-eid-text">عید مبارک</div>
      <div class="card-en-text" style="letter-spacing:4px;">Eid Mubarak</div>
      <div class="card-divider"></div>
      <div class="card-emoji-row">${getEmojiRow(t)}</div>
      ${messageHTML}
      <div class="card-name" style="direction:rtl;">${name}</div>
      <div class="card-from" style="direction:ltr;">— With Prayers & Love 💛</div>
    </div>
  `;

  cardPreview.innerHTML = cardHTML;

  // Trigger entrance animation
  const inner = cardPreview.querySelector('.card-inner');
  if (inner) {
    inner.style.opacity = '0';
    inner.style.transform = 'scale(0.96)';
    setTimeout(() => {
      inner.style.transition = 'all 0.5s cubic-bezier(0.16,1,0.3,1)';
      inner.style.opacity = '1';
      inner.style.transform = 'scale(1)';
    }, 20);
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/\n/g,'<br>');
}

function buildCardStars(t) {
  const darkCategories = ['islamic', 'dark'];
  if (!darkCategories.includes(t.category)) return '';

  const positions = [
    { top: '8%', left: '10%', size: '16px', delay: '0s' },
    { top: '12%', right: '12%', size: '12px', delay: '0.5s' },
    { top: '20%', left: '50%', size: '10px', delay: '1s' },
    { bottom: '15%', left: '8%', size: '14px', delay: '1.5s' },
    { bottom: '20%', right: '10%', size: '18px', delay: '0.8s' },
    { top: '40%', left: '5%', size: '8px', delay: '0.3s' },
    { top: '35%', right: '6%', size: '10px', delay: '1.2s' },
  ];

  return positions.map(p => {
    const style = Object.entries(p)
      .filter(([k]) => k !== 'delay')
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    return `<div class="card-star" style="${style};animation-duration:${2 + Math.random()*2}s;animation-delay:${p.delay};color:${t.accent};">✦</div>`;
  }).join('');
}

function buildCardElements(t) {
  const map = {
    minimal: { 1: '🌙', 2: '🌕', 3: '🏮', 4: '⭐', 5: '✨' },
    islamic: { 6: '🕌', 7: '🪔', 8: '🌟', 9: '✨', 10: '🏮', 11: '🌙', 12: '💫', 13: '🕌' },
    dark:    { 14: '👑', 15: '💜', 16: '🌌', 17: '✨', 18: '🔮' },
    floral:  { 19: '🌸🌺🌸', 20: '🌹🌷🌹', 21: '🌿🌿🌿' },
    kids:    { 22: '🎈🎀🎈', 23: '⭐🌟⭐', 24: '🌤️🌈🌤️', 25: '🎉🎊🎉' }
  };
  const emoji = (map[t.category] || {})[t.id] || t.emoji;
  return `<div style="font-size:clamp(32px,7vw,60px);line-height:1;margin-bottom:4px;filter:drop-shadow(0 0 12px rgba(255,215,0,0.4));">${emoji}</div>`;
}

function getEmojiRow(t) {
  const rows = {
    minimal: '🌙 ⭐ 🌙',
    islamic: '🕌 🌙 ✨',
    dark: '✨ 👑 ✨',
    floral: '🌸 🌺 🌸',
    kids: '🎉 🎈 🎉'
  };
  return rows[t.category] || '🌙 ✨ 🌙';
}

// ===== DOWNLOAD CARD =====
function downloadCard() {
  const inner = document.getElementById('cardInner');
  if (!inner) return;

  showToast('📸 Preparing download...');

  html2canvas(inner, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    width: inner.offsetWidth,
    height: inner.offsetHeight,
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    const name = (state.userName || 'eid').replace(/\s+/g, '_').toLowerCase();
    link.download = `eid_card_${name}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    showToast('✅ Card downloaded!');
  }).catch(() => {
    showToast('Download failed. Try screenshot.');
  });
}

// ===== SHARE CARD (Image + Text Together) =====
async function shareWithImage() {
  const inner = document.getElementById('cardInner');
  if (!inner) return;

  const smsMsg = state.userMessage || SMS_MESSAGES[state.smsIndex];
  const shareText = `عید مبارک! 🌙✨\n\n${smsMsg}\n\nتَقَبَّلَ اللهُ مِنَّا وَمِنكُم\n\n— ${state.userName || 'آپ کا دوست'}`;

  showToast('📸 Preparing share...');

  try {
    const canvas = await html2canvas(inner, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: inner.offsetWidth,
      height: inner.offsetHeight,
      logging: false
    });

    // Convert canvas to Blob
    canvas.toBlob(async (blob) => {
      if (!blob) { showToast('❌ Could not prepare image.'); return; }

      const fileName = `eid_card_${(state.userName || 'eid').replace(/\s+/g,'_').toLowerCase()}.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // Check if Web Share API supports files
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'عید مبارک 🌙',
            text: shareText,
            files: [file]
          });
          showToast('✅ Shared successfully!');
        } catch (err) {
          if (err.name !== 'AbortError') {
            // Fallback: download image + open WhatsApp
            fallbackShare(canvas, shareText);
          }
        }
      } else if (navigator.share) {
        // Share text only (no file support)
        try {
          await navigator.share({ title: 'عید مبارک 🌙', text: shareText });
          showToast('✅ Shared! (tip: download image too)');
        } catch (err) {
          if (err.name !== 'AbortError') fallbackShare(canvas, shareText);
        }
      } else {
        // No Web Share API — fallback
        fallbackShare(canvas, shareText);
      }
    }, 'image/png', 1.0);

  } catch (e) {
    showToast('❌ Failed to prepare card.');
  }
}

function fallbackShare(canvas, text) {
  // Auto-download the image
  const link = document.createElement('a');
  link.download = `eid_card_${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
  // Open WhatsApp with the message
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  setTimeout(() => window.open(url, '_blank'), 800);
  showToast('📥 Image downloaded + WhatsApp opened!');
}


// ===== MESSAGE STUDIO =====
function initMessageStudio() {
  const msgInput = $id('messageInput');
  const charCount = $id('charCount');

  // Load first preset into textarea
  loadPreset(0);

  // Live update card as user types
  msgInput.addEventListener('input', () => {
    state.userMessage = msgInput.value;
    charCount.textContent = `${msgInput.value.length} / 300`;
    renderCard();
  });

  // Prev preset
  $id('prevSmsBtn').addEventListener('click', () => {
    state.smsIndex = (state.smsIndex - 1 + SMS_MESSAGES.length) % SMS_MESSAGES.length;
    loadPreset(state.smsIndex);
  });

  // Next preset
  $id('nextSmsBtn').addEventListener('click', () => {
    state.smsIndex = (state.smsIndex + 1) % SMS_MESSAGES.length;
    loadPreset(state.smsIndex);
  });

  // Random preset
  $id('randomSmsBtn').addEventListener('click', () => {
    let newIdx;
    do { newIdx = Math.floor(Math.random() * SMS_MESSAGES.length); }
    while (newIdx === state.smsIndex && SMS_MESSAGES.length > 1);
    state.smsIndex = newIdx;
    loadPreset(state.smsIndex);
  });

  // Clear message
  $id('clearMsgBtn').addEventListener('click', () => {
    msgInput.value = '';
    state.userMessage = '';
    state.smsIndex = 0;
    charCount.textContent = '0 / 300';
    smsCounter.textContent = `- / ${SMS_MESSAGES.length}`;
    renderCard();
    // Animate clear
    msgInput.style.opacity = '0.4';
    setTimeout(() => { msgInput.style.opacity = '1'; }, 300);
  });

  // Copy message
  $id('copySmsBtn').addEventListener('click', () => {
    const text = msgInput.value || SMS_MESSAGES[state.smsIndex];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast('📋 Message copied!'));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('📋 Message copied!');
    }
  });

  // WhatsApp text share
  $id('whatsappSmsBtn').addEventListener('click', () => {
    const msg = msgInput.value || SMS_MESSAGES[state.smsIndex];
    const fullMsg = `عید مبارک! 🌙✨\n\n${msg}\n\nتَقَبَّلَ اللهُ مِنَّا وَمِنكُم\n\n— ${state.userName || 'آپ کا دوست'}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(fullMsg)}`, '_blank');
  });
}

function loadPreset(index) {
  const msgInput = $id('messageInput');
  const charCount = $id('charCount');
  const msg = SMS_MESSAGES[index];

  // Animate fade
  msgInput.style.transition = 'opacity 0.2s ease';
  msgInput.style.opacity = '0';
  setTimeout(() => {
    msgInput.value = msg;
    state.userMessage = msg;
    charCount.textContent = `${msg.length} / 300`;
    smsCounter.textContent = `${index + 1} / ${SMS_MESSAGES.length}`;
    msgInput.style.opacity = '1';
    renderCard();
  }, 200);
}




let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
