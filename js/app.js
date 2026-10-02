/**
 * ============================================================================
 * HIGHROLERS — STARMEDIA INSPIRA ENGINE (JS)
 * Ultra-Modern Cyber Interactive & Audio-Visual Engine
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 01. STATE & CONFIG
  // --------------------------------------------------------------------------
  const state = {
    audioEnabled: false,
    currentLang: 'en', // Defaulting to original template language (Spanish) with instant EN toggle
    isMuted: true
  };

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // 02. AUDIO SYSTEM REMOVED PER USER SPECIFICATION
  // --------------------------------------------------------------------------
  function playCyberBlip() { /* Audio disabled */ }
  function playCyberSuccess() { /* Audio disabled */ }

  // --------------------------------------------------------------------------
  // 03. SYSTEM TOAST
  // --------------------------------------------------------------------------
  const toastEl = document.getElementById('systemToast');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(text, duration = 3500) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 04. HIGH-PRECISION RETRO PIXEL ARROW CURSOR SYSTEM & ANIMATIONS
  // --------------------------------------------------------------------------
  const cursorSystem = document.getElementById('customCursorSystem');
  const cursor = document.getElementById('customCursor');
  const reticle = document.getElementById('cursorReticle');
  const shockwaveContainer = document.getElementById('cursorShockwaveContainer');

  if (cursor && cursorSystem) {
    let mouseX = -100;
    let mouseY = -100;
    let reticleX = -100;
    let reticleY = -100;
    let isVisible = false;

    // Instant, zero-lag 1:1 hardware-accelerated tracking for the arrow pointer
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursorSystem.classList.add('visible');
        cursor.classList.add('visible');
        reticleX = mouseX;
        reticleY = mouseY;
      }

      // Arrow tip hotspot is at exact top-left tip (0, 0)
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    // Companion Reticle smooth physics loop (fluid Apple-inspired trailing bracket)
    function renderReticle() {
      if (isVisible) {
        reticleX += (mouseX - reticleX) * 0.28;
        reticleY += (mouseY - reticleY) * 0.28;
        if (reticle) {
          reticle.style.transform = `translate3d(${reticleX}px, ${reticleY}px, 0)`;
        }
      }
      requestAnimationFrame(renderReticle);
    }
    requestAnimationFrame(renderReticle);

    // Mousedown / Click Tactile Feedback & Pixel Burst
    window.addEventListener('mousedown', (e) => {
      cursorSystem.classList.add('active');
      createPixelBurst(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      cursorSystem.classList.remove('active');
    });

    // Window & Document boundary handling
    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursorSystem.classList.remove('visible');
      cursor.classList.remove('visible');
    });

    document.addEventListener('mouseenter', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
      cursorSystem.classList.add('visible');
      cursor.classList.add('visible');
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Comprehensive Interactive Hover Detection using Event Delegation
    const interactiveSelector = [
      'a',
      'button',
      'input',
      'select',
      'textarea',
      '[role="button"]',
      '.clickable',
      '.bracket-box',
      '.nav-pill-btn',
      '.service-row-header',
      '.service-arrow-wrap',
      '.pill-tag',
      '.brand-logo-group',
      '.hero-hashtag',
      '.hero-audience-frame',
      '.pixel-smiley-container',
      '.social-link',
      '[data-interactive]'
    ].join(', ');

    const darkElementsSelector = [
      '.hero-hashtag',
      '.main-footer',
      '.audience-overlay-badge',
      '.service-row-item.active .service-arrow-wrap',
      '.pill-tag:hover',
      '.pill-tag.selected',
      '.hero-audience-frame'
    ].join(', ');

    document.addEventListener('mouseover', (e) => {
      const hit = e.target.closest(interactiveSelector);
      if (hit) {
        cursorSystem.classList.add('hovering');
      } else {
        cursorSystem.classList.remove('hovering');
      }

      const darkHit = e.target.closest(darkElementsSelector);
      if (darkHit) {
        cursorSystem.classList.add('on-dark');
      } else {
        cursorSystem.classList.remove('on-dark');
      }
    }, { passive: true });

    // Click Shockwave Burst Spawner (Retro 8-bit Pixel Sparks)
    function createPixelBurst(x, y) {
      if (!shockwaveContainer) return;
      const particleCount = 6;
      const angleStep = (Math.PI * 2) / particleCount;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'pixel-burst-particle';

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = i * angleStep + (Math.random() * 0.4 - 0.2);
        const distance = 16 + Math.random() * 16;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);

        shockwaveContainer.appendChild(particle);

        setTimeout(() => {
          if (particle.parentElement) {
            particle.remove();
          }
        }, 360);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 05. ANIMATED PIXEL MATRIX CANVAS GENERATOR
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('pixelMatrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 1400);
    let height = (canvas.height = 120);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.clientWidth || 1400;
      height = canvas.height = 120;
    });

    const pixelSize = 8;
    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);

    // Pixel matrix generation with dither wave
    let tick = 0;

    function drawPixelMatrix() {
      ctx.clearRect(0, 0, width, height);

      tick += 0.03;

      for (let r = 0; r < rows; r++) {
        const rowFactor = r / rows; // 0 at top, 1 at bottom
        for (let c = 0; c < cols; c++) {
          // Noise formula
          const n = Math.sin(c * 0.15 + tick) * Math.cos(r * 0.3 - tick * 0.5) + Math.sin((c + r) * 0.08);
          const threshold = rowFactor * 1.8 - 0.4;

          if (n > threshold) {
            const alpha = Math.min(1, Math.max(0.1, (n - threshold) * 1.2));
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.85})`;
            ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize - 1.5, pixelSize - 1.5);
          }
        }
      }

      requestAnimationFrame(drawPixelMatrix);
    }
    requestAnimationFrame(drawPixelMatrix);
  }

  // --------------------------------------------------------------------------
  // 06. 3D PIXEL SMILEY INTERACTIVITY
  // --------------------------------------------------------------------------
  const smileyBox = document.getElementById('pixelSmileyBox');
  const smileyImg = document.getElementById('pixelSmileyImg');
  if (smileyBox && smileyImg) {
    let chargeCount = 0;
    smileyBox.addEventListener('click', () => {
      chargeCount++;
      playCyberSuccess();
      smileyImg.style.transform = `scale(${1 + chargeCount * 0.15}) rotate(${chargeCount * 25}deg)`;
      showToast(`⚡ HIGHROLERS ENERGY LEVEL: ${chargeCount * 100}% // MAXIMUM PERFORMANCE`);
      
      if (chargeCount >= 4) {
        chargeCount = 0;
        setTimeout(() => {
          smileyImg.style.transform = 'scale(1) rotate(0deg)';
        }, 1200);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 07. SERVICES ACCORDION & BUTTON INTERACTIVITY (FIXED PROPAGATION & TACTILE)
  // --------------------------------------------------------------------------
  const serviceRows = document.querySelectorAll('.service-row-item');
  serviceRows.forEach((row) => {
    const rowHeader = row.querySelector('.service-row-header');
    const arrowBtn = row.querySelector('.service-arrow-wrap');
    const expandContent = row.querySelector('.service-expand-content');

    function toggleAccordion(e) {
      if (e) e.stopPropagation();
      const isActive = row.classList.contains('active');
      serviceRows.forEach((r) => {
        r.classList.remove('active');
        const rBtn = r.querySelector('.service-arrow-wrap');
        if (rBtn) {
          const sName = r.querySelector('.service-name')?.textContent || 'Service';
          rBtn.setAttribute('aria-label', `Expand ${sName}`);
        }
      });
      if (!isActive) {
        row.classList.add('active');
        if (arrowBtn) {
          const sName = row.querySelector('.service-name')?.textContent || 'Service';
          arrowBtn.setAttribute('aria-label', `Collapse ${sName}`);
        }
        playCyberBlip(750, 'triangle', 0.08, 0.08);
      }
    }

    if (rowHeader) {
      rowHeader.addEventListener('click', toggleAccordion);
    }

    // Stop click events inside the expanded drawer from closing the accordion
    if (expandContent) {
      expandContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });

  // Interactive Tactile Pill Filter Buttons
  const pillTags = document.querySelectorAll('.pill-tag');
  pillTags.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      pill.classList.toggle('selected');
      const tagText = pill.textContent.trim().toUpperCase();
      showToast(`CAPABILITY // ${tagText}`);
    });
  });

  // --------------------------------------------------------------------------
  // 08. LANGUAGE SWITCHER (ES / EN)
  // --------------------------------------------------------------------------
  const i18n = {
    es: {
      nav_home: 'INICIO',
      nav_about: 'FILOSOFÍA',
      nav_services: 'SERVICIOS',
      hero_title: 'CREATE WITHOUT LIMITS',
      meth_head_1: 'ASI INCREMENTAMOS',
      meth_head_2: 'LAS VENTAS DE',
      meth_subhead_1: 'NUESTROS CLIENTES &',
      meth_subhead_2: 'SOCIOS',
      meth_desc_left: 'COMBINAMOS CREATIVIDAD Y PERFORMANCE PARA UN SOLO OBJETIVO: QUE TU MARCA VENDA MÁS.',
      meth_desc_right: 'EJECUTAMOS CON PRECISIÓN PARA LOGRAR CONEXIÓN, CONVERSIÓN, RESULTADOS REALES.',
      card1_title: 'MARKETING ENFOCADO EN RESULTADOS',
      card1_desc: 'UNA MARCA SÓLIDA NACE DE UNA BUENA PLANIFICACIÓN ESTRATÉGICA, ATRIBUCIÓN CLARA Y VELOCIDAD DE PRUEBA.',
      card2_title: 'CONSTRUCCION DE MARCAS CON PROPOSITO',
      card2_desc: 'CREAMOS MARCAS QUE GENERAN CONEXIÓN Y VENDEN, TRASPASANDO FRONTERAS CON MENSAJES DE ALTO IMPACTO.',
      card3_title: 'ESCALABILIDAD & PERFORMANCE MEDIA',
      card3_desc: 'INGENIERÍA DE ADQUISICIÓN MULTICANAL (META, GOOGLE, TIKTOK) CON EMBUDOS Y OPTIMIZACIÓN CIENTÍFICA.',
      serv_title: 'CAPACIDADES QUE<br>IMPULSAN',
      serv_title_2: 'CRECIMIENTO MEDIBLE',
      serv_subtitle: 'COMBINAMOS INGENIERÍA, AGILIDAD CREATIVA Y PERFORMANCE MEDIA PARA ESCALAR TUS INGRESOS.',
      footer_title_2: 'DIRECCIÓN',
      footer_copy: '© COPYRIGHT 2026 HIGHROLERS • ALL RIGHTS RESERVED'
    },
    en: {
      nav_home: 'HOME',
      nav_about: 'PHILOSOPHY',
      nav_services: 'CAPABILITIES',
      hero_title: 'CREATE WITHOUT LIMITS',
      meth_head_1: 'HOW WE SCALE',
      meth_head_2: 'THE REVENUE OF',
      meth_subhead_1: 'OUR CLIENTS &',
      meth_subhead_2: 'PARTNERS',
      meth_desc_left: 'WE COMBINE CREATIVITY AND PERFORMANCE FOR A SINGLE GOAL: SCALING YOUR BRAND REVENUE.',
      meth_desc_right: 'EXECUTED WITH SURGICAL PRECISION TO ACHIEVE RESONANCE, CONVERSION, REAL RESULTS.',
      card1_title: 'RESULT-DRIVEN MARKETING',
      card1_desc: 'A DOMINANT BRAND IS BORN FROM RIGOROUS STRATEGIC ROADMAPPING, CLEAR ATTRIBUTION & RAPID TESTING.',
      card2_title: 'PURPOSEFUL BRAND BUILDING',
      card2_desc: 'WE BUILD ICONIC BRANDS THAT TRANSCEND BORDERS, ENGENDER DEEP LOYALTY AND COMMAND PREMIUM PRICING.',
      card3_title: 'SCALABLE PERFORMANCE MEDIA',
      card3_desc: 'MULTI-CHANNEL PAID ACQUISITION (META, GOOGLE, TIKTOK) POWERED BY SCIENTIFIC CRO TESTING.',
      serv_title: 'CAPABILITIES THAT<br>DRIVE',
      serv_title_2: 'MEASURABLE GROWTH',
      serv_subtitle: 'COMBINING ENGINEERING, CREATIVE AGILITY, AND PERFORMANCE MEDIA TO SCALE YOUR ENTERPRISE REVENUE.',
      footer_title_2: 'ADDRESS',
      footer_copy: '© COPYRIGHT 2026 HIGHROLERS • ALL RIGHTS RESERVED'
    }
  };

  // --------------------------------------------------------------------------
  // 09. FLOATING NAVIGATION PILL DOCK & GLIDING SPRING PHYSICS
  // --------------------------------------------------------------------------
  const pillDock = document.getElementById('navPillDock');
  const glider = document.getElementById('navGlidingPill');
  const pillBtns = document.querySelectorAll('.nav-pill-btn');

  if (pillDock && glider && pillBtns.length > 0) {
    pillDock.classList.add('has-glider');

    function moveGliderTo(targetEl) {
      if (!targetEl) return;
      const dockRect = pillDock.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const leftOffset = targetRect.left - dockRect.left;
      const width = targetRect.width;

      glider.style.width = `${width}px`;
      glider.style.transform = `translate3d(${leftOffset}px, 0, 0)`;
      glider.style.opacity = '1';
    }

    function getActiveBtn() {
      return pillDock.querySelector('.nav-pill-btn.active') || pillBtns[0];
    }

    // Initialize glider position
    setTimeout(() => {
      moveGliderTo(getActiveBtn());
    }, 60);

    // Hover effect: glide to hovered button
    pillBtns.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        moveGliderTo(btn);
      });

      // Smooth scroll on click & lock active
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        pillBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        moveGliderTo(btn);

        if (targetSection) {
          const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;
          const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }

        playCyberBlip(800, 'sine', 0.05, 0.04);
      });
    });

    // Return to active button when cursor leaves dock
    pillDock.addEventListener('mouseleave', () => {
      moveGliderTo(getActiveBtn());
    });

    // Window resize adjustment
    window.addEventListener('resize', () => {
      moveGliderTo(getActiveBtn());
    });

    // Scrollspy: update active pill button dynamically as user scrolls
    const sections = [
      { id: 'hero', btn: document.querySelector('.nav-pill-btn[data-nav="hero"]') },
      { id: 'methodology', btn: document.querySelector('.nav-pill-btn[data-nav="methodology"]') },
      { id: 'services', btn: document.querySelector('.nav-pill-btn[data-nav="services"]') }
    ];

    let scrollTimeout = null;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        const scrollY = window.pageYOffset;
        const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 70;

        let currentSection = sections[0];
        sections.forEach((sec) => {
          const el = document.getElementById(sec.id);
          if (el) {
            const top = el.offsetTop - headerHeight - 100;
            if (scrollY >= top) {
              currentSection = sec;
            }
          }
        });

        if (currentSection && currentSection.btn && !currentSection.btn.classList.contains('active')) {
          pillBtns.forEach((b) => b.classList.remove('active'));
          currentSection.btn.classList.add('active');
          if (!pillDock.matches(':hover')) {
            moveGliderTo(currentSection.btn);
          }
        }
      }, 50);
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 10. STICKY HEADER SCROLL STATE
  // --------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  if (mainHeader) {
    window.addEventListener('scroll', () => {
      mainHeader.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 11. HIGH-PERFORMANCE 60FPS VIDEO PLAYBACK OPTIMIZER
  // --------------------------------------------------------------------------
  const studioVideo = document.querySelector('.studio-video');
  if (studioVideo) {
    studioVideo.muted = true;
    studioVideo.defaultMuted = true;
    studioVideo.playsInline = true;

    // Direct hardware play request
    const initiatePlayback = () => {
      studioVideo.muted = true;
      const p = studioVideo.play();
      if (p !== undefined) {
        p.catch(() => {
          const startOnInteraction = () => {
            studioVideo.play().catch(() => {});
            ['click', 'touchstart', 'scroll', 'keydown'].forEach((ev) => {
              window.removeEventListener(ev, startOnInteraction);
            });
          };
          ['click', 'touchstart', 'scroll', 'keydown'].forEach((ev) => {
            window.addEventListener(ev, startOnInteraction, { once: true, passive: true });
          });
        });
      }
    };

    initiatePlayback();

    // Micro-loop optimization: seamless looping with zero freeze
    studioVideo.addEventListener('timeupdate', () => {
      if (studioVideo.duration && studioVideo.currentTime >= studioVideo.duration - 0.08) {
        studioVideo.currentTime = 0;
        studioVideo.play().catch(() => {});
      }
    });

    // Viewport Visibility Observer: Pause decoding when out-of-view, resume 60fps when in view
    if ('IntersectionObserver' in window) {
      const vidObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initiatePlayback();
          } else {
            studioVideo.pause();
          }
        });
      }, { threshold: 0.1 });
      vidObserver.observe(studioVideo);
    }
  }

  console.log('⚡ HIGHROLERS Digital Performance Engine v4.2 Initialized successfully.');
});
