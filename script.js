/**
 * GRAND OPENING LAUNCH CEREMONY 2026 - JAVASCRIPT
 * Features:
 * - Live Countdown to October 23, 2026
 * - Ambient Particle & Constellation Background Canvas
 * - Real-time VIP Pass Generator & Dynamic RSVP
 * - Full Canvas Confetti Blast Physics
 * - Web Audio API Celebratory Sound Synthesis (No external audio file needed)
 * - Google Calendar & .ics Calendar Integration
 * - Interactive Guestbook with dynamic user wish additions
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. TARGET DATE & LIVE COUNTDOWN (October 23, 2026 10:00:00 IST)
  // -------------------------------------------------------------
  const launchDate = new Date('2026-10-23T10:00:00+05:30').getTime();

  const elDays = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMinutes = document.getElementById('cdMinutes');
  const elSeconds = document.getElementById('cdSeconds');

  const loaderCdDays = document.getElementById('loaderCdDays');
  const loaderCdHours = document.getElementById('loaderCdHours');
  const loaderCdMinutes = document.getElementById('loaderCdMinutes');
  const loaderCdSeconds = document.getElementById('loaderCdSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance <= 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';

      if (loaderCdDays) loaderCdDays.textContent = '00';
      if (loaderCdHours) loaderCdHours.textContent = '00';
      if (loaderCdMinutes) loaderCdMinutes.textContent = '00';
      if (loaderCdSeconds) loaderCdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const padDays = String(days).padStart(2, '0');
    const padHours = String(hours).padStart(2, '0');
    const padMinutes = String(minutes).padStart(2, '0');
    const padSeconds = String(seconds).padStart(2, '0');

    if (elDays) elDays.textContent = padDays;
    if (elHours) elHours.textContent = padHours;
    if (elMinutes) elMinutes.textContent = padMinutes;
    if (elSeconds) elSeconds.textContent = padSeconds;

    if (loaderCdDays) loaderCdDays.textContent = padDays;
    if (loaderCdHours) loaderCdHours.textContent = padHours;
    if (loaderCdMinutes) loaderCdMinutes.textContent = padMinutes;
    if (loaderCdSeconds) loaderCdSeconds.textContent = padSeconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // -------------------------------------------------------------
  // 2. WEB AUDIO API SYNTH CHIMES (FX)
  // -------------------------------------------------------------
  let audioContext = null;
  let audioEnabled = true;

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioLabel = document.querySelector('.audio-label');

  function initAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
  }

  function playCelebrationFanfare() {
    if (!audioEnabled) return;
    try {
      initAudioContext();
      if (!audioContext) return;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Celebratory chord progression (C-maj / G / high sparkle)
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = audioContext.currentTime;

      notes.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, now + index * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.65);
      });
    } catch (e) {
      console.warn('Audio not allowed or supported', e);
    }
  }

  function playSoftChime() {
    if (!audioEnabled) return;
    try {
      initAudioContext();
      if (!audioContext) return;
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const now = audioContext.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      // Ignore
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        audioBtnState(true);
        playSoftChime();
        showToast('🔊 Celebration Sound Effects Enabled');
      } else {
        audioBtnState(false);
        showToast('🔇 Audio FX Muted');
      }
    });
  }

  function audioBtnState(enabled) {
    if (!audioToggleBtn) return;
    if (enabled) {
      audioToggleBtn.classList.remove('muted');
      if (audioIcon) audioIcon.className = 'fa-solid fa-volume-high';
      if (audioLabel) audioLabel.textContent = 'FX: ON';
    } else {
      audioToggleBtn.classList.add('muted');
      if (audioIcon) audioIcon.className = 'fa-solid fa-volume-xmark';
      if (audioLabel) audioLabel.textContent = 'FX: OFF';
    }
  }

  // -------------------------------------------------------------
  // 3. CANVAS PARTICLES & AMBIENT GLOW
  // -------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 70);

    const colors = [
      'rgba(245, 158, 11, ', // gold
      'rgba(251, 191, 36, ', // amber
      'rgba(6, 182, 212, ',  // cyan
      'rgba(139, 92, 246, '  // purple
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45,
        pulsing: Math.random() * 0.02 + 0.01
      });
    }

    function renderAmbient() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(Date.now() * p.pulsing) * 0.005;
        const clampedAlpha = Math.max(0.1, Math.min(0.8, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.colorBase + clampedAlpha + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.colorBase + '0.7)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(renderAmbient);
    }
    renderAmbient();
  }

  // -------------------------------------------------------------
  // 4. CONFETTI BURST ENGINE (Pure Canvas)
  // -------------------------------------------------------------
  function launchConfetti(xOrigin = 0.5, yOrigin = 0.5) {
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '9999';
    document.body.appendChild(confettiCanvas);

    const cCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettiPieces = [];
    const count = 120;
    const colors = ['#f59e0b', '#fbbf24', '#fef08a', '#06b6d4', '#8b5cf6', '#38bdf8', '#ffffff'];

    const originPixelX = window.innerWidth * xOrigin;
    const originPixelY = window.innerHeight * yOrigin;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      confettiPieces.push({
        x: originPixelX,
        y: originPixelY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        gravity: 0.28,
        drag: 0.96,
        alpha: 1
      });
    }

    let frames = 0;
    function animateConfetti() {
      cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      frames++;

      let alive = false;
      confettiPieces.forEach(p => {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.007;

        if (p.alpha > 0) {
          alive = true;
          cCtx.save();
          cCtx.translate(p.x, p.y);
          cCtx.rotate((p.rotation * Math.PI) / 180);
          cCtx.fillStyle = p.color;
          cCtx.globalAlpha = Math.max(0, p.alpha);
          cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          cCtx.restore();
        }
      });

      if (alive && frames < 240) {
        requestAnimationFrame(animateConfetti);
      } else {
        confettiCanvas.remove();
      }
    }

    animateConfetti();
  }

  // -------------------------------------------------------------
  // 5. TOAST NOTIFICATION SYSTEM
  // -------------------------------------------------------------
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, icon = 'fa-solid fa-sparkles') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="${icon} toast-icon"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // -------------------------------------------------------------
  // 6. VIP PASS GENERATOR & REAL-TIME BINDING
  // -------------------------------------------------------------
  const attendeeNameInput = document.getElementById('attendeeName');
  const attendeeRoleSelect = document.getElementById('attendeeRole');
  const attendanceTypeSelect = document.getElementById('attendanceType');
  const attendeeWishInput = document.getElementById('attendeeWish');
  const rsvpForm = document.getElementById('rsvpForm');

  const previewGuestName = document.getElementById('previewGuestName');
  const previewGuestRole = document.getElementById('previewGuestRole');
  const previewAccessType = document.getElementById('previewAccessType');
  const previewPassId = document.getElementById('previewPassId');
  const passStatusText = document.getElementById('passStatusText');

  // Generate unique pass ID
  function generateRandomPassId() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `PASS-ID: #L26-${num}-VIP`;
  }

  if (attendeeNameInput) {
    attendeeNameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (previewGuestName) {
        previewGuestName.textContent = val.length > 0 ? val.toUpperCase() : 'YOUR NAME HERE';
      }
    });
  }

  if (attendeeRoleSelect) {
    attendeeRoleSelect.addEventListener('change', (e) => {
      if (previewGuestRole) {
        previewGuestRole.textContent = e.target.value;
      }
    });
  }

  if (attendanceTypeSelect) {
    attendanceTypeSelect.addEventListener('change', (e) => {
      if (previewAccessType) {
        previewAccessType.textContent = e.target.value.includes('In-Person') ? 'Ceremony & Lunch' : 'Digital Livestream';
      }
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = attendeeNameInput.value.trim();
      const role = attendeeRoleSelect.value;
      const type = attendanceTypeSelect.value;
      const wish = attendeeWishInput.value.trim();

      const newPassId = generateRandomPassId();
      if (previewPassId) previewPassId.textContent = newPassId;
      if (passStatusText) passStatusText.textContent = 'CONFIRMED VIP TICKET';

      // Confetti & Audio Fanfare
      launchConfetti(0.5, 0.4);
      playCelebrationFanfare();

      showToast(`🎉 Congratulations, ${name}! Your VIP Pass is confirmed for Oct 23, 2026.`, 'fa-solid fa-circle-check');

      // Add to Guestbook if a message was included
      if (wish.length > 0) {
        addGuestbookEntry(name, role, wish);
      }

      // Smooth scroll preview into view
      const vipTicket = document.getElementById('vipTicket');
      if (vipTicket) {
        vipTicket.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // -------------------------------------------------------------
  // 7. GUESTBOOK DYNAMIC ENTRY INJECTION
  // -------------------------------------------------------------
  const wishesGrid = document.getElementById('wishesGrid');
  function addGuestbookEntry(name, role, message) {
    if (!wishesGrid) return;
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card highlight-wish animate-fade-up';
    wishCard.innerHTML = `
      <div class="wish-card-top">
        <div class="avatar-circle gold-circle">${initials || 'VIP'}</div>
        <div class="author-meta">
          <h5 class="author-name">${escapeHTML(name)}</h5>
          <span class="author-title">${escapeHTML(role)}</span>
        </div>
        <div class="wish-quote-icon">“</div>
      </div>
      <p class="wish-text">"${escapeHTML(message)}"</p>
      <div class="wish-date">Just Now • Official RSVP Guest</div>
    `;

    wishesGrid.prepend(wishCard);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // -------------------------------------------------------------
  // 8. TICKET ACTIONS: PRINT/SAVE & SHARE
  // -------------------------------------------------------------
  const downloadPassBtn = document.getElementById('downloadPassBtn');
  if (downloadPassBtn) {
    downloadPassBtn.addEventListener('click', () => {
      playSoftChime();
      showToast('🖨️ Opening print/save dialogue for your VIP Launch Pass...');
      setTimeout(() => {
        window.print();
      }, 500);
    });
  }

  const copyShareBtn = document.getElementById('copyShareBtn');
  if (copyShareBtn) {
    copyShareBtn.addEventListener('click', () => {
      const shareText = `🚜 Join me at the official GG Creation (@GGCreative-x9o) Grand Launch Ceremony & Tractor Mud Pull Test on October 23, 2026! Grassroots engineering at scale. #tamiltoymaker`;
      navigator.clipboard.writeText(shareText).then(() => {
        launchConfetti(0.5, 0.6);
        playSoftChime();
        showToast('📋 GG Creation invitation copied! Share with fellow makers & friends.', 'fa-solid fa-copy');
      }).catch(() => {
        showToast('Shared: GG Creation Official Launch 2026!', 'fa-solid fa-share');
      });
    });
  }

  // -------------------------------------------------------------
  // 9. CELEBRATION BUTTONS & TOAST TRIGGERS
  // -------------------------------------------------------------
  const celebrateBtn = document.getElementById('celebrateBtn');
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', (e) => {
      const rect = celebrateBtn.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      launchConfetti(x, y);
      playCelebrationFanfare();
      showToast('🚜 Sparks Flying! Celebrating GG Creation & Grassroots Engineering from Tamil Nadu!');
    });
  }

  const bannerCelebrateBtn = document.getElementById('bannerCelebrateBtn');
  if (bannerCelebrateBtn) {
    bannerCelebrateBtn.addEventListener('click', () => {
      launchConfetti(0.5, 0.5);
      playCelebrationFanfare();
      showToast('🥂 Raising a toast to GG Creation (@GGCreative-x9o) and the #tamiltoymaker movement!');
    });
  }

  const footerCelebrate = document.getElementById('footerCelebrate');
  if (footerCelebrate) {
    footerCelebrate.addEventListener('click', (e) => {
      e.preventDefault();
      launchConfetti(0.5, 0.8);
      playCelebrationFanfare();
      showToast('✨ Celebration Sparks Everywhere! #tamiltoymaker');
    });
  }

  // -------------------------------------------------------------
  // 10. CALENDAR INTEGRATION (Google & .ics file)
  // -------------------------------------------------------------
  const calendarDropdownBtn = document.getElementById('calendarDropdownBtn');
  const calendarMenu = document.getElementById('calendarMenu');

  if (calendarDropdownBtn && calendarMenu) {
    calendarDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      calendarMenu.classList.toggle('show');
      playSoftChime();
    });

    document.addEventListener('click', () => {
      calendarMenu.classList.remove('show');
    });
  }

  const addToGoogleCal = document.getElementById('addToGoogleCal');
  if (addToGoogleCal) {
    addToGoogleCal.addEventListener('click', (e) => {
      e.preventDefault();
      playSoftChime();
      const title = encodeURIComponent('GG Creation Official Website Premiere & Tractor Mud Stress Test');
      const details = encodeURIComponent('Grand Launch Celebration for GG Creation (@GGCreative-x9o) #tamiltoymaker. Official web portal debut, live Mahindra & John Deere mud stress tests, and celebratory lunch reception.');
      const location = encodeURIComponent('GG Creation Workshop & Global Live Stream');
      // ISO strings for 2026-10-23 from 10:00 to 14:30 IST (+05:30 -> UTC 04:30 to 09:00)
      const dates = '20261023T043000Z/20261023T090000Z';
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(googleCalUrl, '_blank');
      showToast('📅 Redirecting to Google Calendar...');
    });
  }

  const downloadIcsCal = document.getElementById('downloadIcsCal');
  const footerAddCal = document.getElementById('footerAddCal');

  function triggerIcsDownload(e) {
    if (e) e.preventDefault();
    playSoftChime();

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//GGCreation//Grand Opening Ceremony//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:GG Creation Official Launch & Tractor Mud Stress Test 2026',
      'DESCRIPTION:Grand Launch Celebration for GG Creation (@GGCreative-x9o) #tamiltoymaker. Official web portal debut, live tractor mud pull test, and celebratory luncheon.',
      'DTSTART:20261023T043000Z',
      'DTEND:20261023T090000Z',
      'LOCATION:GG Creation Workshop & Live Premiere',
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Grand-Opening-Launch-2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📥 Calendar invitation (.ics) downloaded!');
  }

  if (downloadIcsCal) downloadIcsCal.addEventListener('click', triggerIcsDownload);
  if (footerAddCal) footerAddCal.addEventListener('click', triggerIcsDownload);

  // -------------------------------------------------------------
  // 11. NAVBAR SCROLL EFFECT
  // -------------------------------------------------------------
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  window.addEventListener('scroll', () => {
    if (!navbarWrapper) return;
    if (window.scrollY > 50) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
  });

  // -------------------------------------------------------------
  // 12. MULTI-STAGE PRELOADER / INTRO SCREEN CONTROLLER (Pages 1, 2, 3)
  // Faithful to user's sketch:
  // Page 1: "Today"
  // Page 2: "23 October"
  // Page 3: "Grander Launch" + "time" [Day] [hours] [mintes] [Sec]
  // -------------------------------------------------------------
  const loadingScreen = document.getElementById('launchLoadingScreen');
  const loaderSlides = [
    document.getElementById('loaderSlide1'),
    document.getElementById('loaderSlide2'),
    document.getElementById('loaderSlide3')
  ];
  const loaderStepIndicators = document.querySelectorAll('.loader-step-indicator');
  const loaderDots = document.querySelectorAll('#loaderDots .dot');
  const loaderPrevBtn = document.getElementById('loaderPrevBtn');
  const loaderNextBtn = document.getElementById('loaderNextBtn');
  const loaderSkipBtn = document.getElementById('loaderSkipBtn');
  const loaderEnterSiteBtn = document.getElementById('loaderEnterSiteBtn');
  const loaderAutoToggle = document.getElementById('loaderAutoToggle');
  const loaderAutoIcon = document.getElementById('loaderAutoIcon');
  const loaderAutoLabel = document.getElementById('loaderAutoLabel');
  const loaderProgressBar = document.getElementById('loaderProgressBar');
  const reopenLoaderBtn = document.getElementById('reopenLoaderBtn');

  let currentStep = 1;
  const totalSteps = 3;
  let autoAdvance = true;
  let progressAnimFrame = null;
  let stepStartTime = Date.now();
  const stepDurations = [4000, 4200, 9000]; // Time for each page in ms

  function updateLoaderUI() {
    // 1. Update active slide
    loaderSlides.forEach((slide, idx) => {
      if (slide) {
        if (idx + 1 === currentStep) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      }
    });

    // 2. Update header step indicator
    loaderStepIndicators.forEach((btn) => {
      const stepVal = parseInt(btn.getAttribute('data-target-step'), 10);
      if (stepVal === currentStep) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 3. Update pagination dots
    loaderDots.forEach((dot) => {
      const stepVal = parseInt(dot.getAttribute('data-step'), 10);
      if (stepVal === currentStep) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // 4. Update Prev / Next buttons
    if (loaderPrevBtn) {
      loaderPrevBtn.disabled = (currentStep === 1);
    }

    if (loaderNextBtn) {
      if (currentStep === totalSteps) {
        loaderNextBtn.innerHTML = '<span>Enter Site</span> <i class="fa-solid fa-rocket"></i>';
      } else {
        loaderNextBtn.innerHTML = '<span>Next</span> <i class="fa-solid fa-chevron-right"></i>';
      }
    }
  }

  function startStepProgress() {
    cancelAnimationFrame(progressAnimFrame);
    if (!autoAdvance) {
      if (loaderProgressBar) loaderProgressBar.style.width = '0%';
      return;
    }

    stepStartTime = Date.now();
    const duration = stepDurations[currentStep - 1] || 4000;

    function step() {
      if (!autoAdvance) return;
      const elapsed = Date.now() - stepStartTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);

      if (loaderProgressBar) {
        loaderProgressBar.style.width = progressPercent + '%';
      }

      if (elapsed < duration) {
        progressAnimFrame = requestAnimationFrame(step);
      } else {
        // Step complete! Auto advance
        if (currentStep < totalSteps) {
          goToStep(currentStep + 1);
        } else {
          // On slide 3, smooth auto-close after time preview
          closeLoader();
        }
      }
    }

    progressAnimFrame = requestAnimationFrame(step);
  }

  function goToStep(stepNum, userAction = false) {
    if (stepNum < 1 || stepNum > totalSteps) return;
    currentStep = stepNum;
    updateLoaderUI();
    if (userAction) {
      playSoftChime();
    }
    startStepProgress();
  }

  function closeLoader() {
    if (!loadingScreen) return;
    cancelAnimationFrame(progressAnimFrame);
    loadingScreen.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Celebratory feedback
    playCelebrationFanfare();
    launchConfetti(0.5, 0.4);
    showToast('✨ Welcome to GG Creation Grand Launch 2026!');
  }

  function openLoader() {
    if (!loadingScreen) return;
    loadingScreen.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    goToStep(1, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Prev / Next button clicks
  if (loaderPrevBtn) {
    loaderPrevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1, true);
      }
    });
  }

  if (loaderNextBtn) {
    loaderNextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1, true);
      } else {
        closeLoader();
      }
    });
  }

  // Header step buttons
  loaderStepIndicators.forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepVal = parseInt(btn.getAttribute('data-target-step'), 10);
      if (stepVal) goToStep(stepVal, true);
    });
  });

  // Dots
  loaderDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const stepVal = parseInt(dot.getAttribute('data-step'), 10);
      if (stepVal) goToStep(stepVal, true);
    });
  });

  // Direct CTA Enter button on Slide 3
  if (loaderEnterSiteBtn) {
    loaderEnterSiteBtn.addEventListener('click', () => {
      closeLoader();
    });
  }

  // Skip button
  if (loaderSkipBtn) {
    loaderSkipBtn.addEventListener('click', () => {
      closeLoader();
    });
  }

  // Reopen button in navbar
  if (reopenLoaderBtn) {
    reopenLoaderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLoader();
    });
  }

  // Toggle Auto Advance
  if (loaderAutoToggle) {
    loaderAutoToggle.addEventListener('click', () => {
      autoAdvance = !autoAdvance;
      playSoftChime();
      if (autoAdvance) {
        if (loaderAutoIcon) loaderAutoIcon.className = 'fa-solid fa-pause';
        if (loaderAutoLabel) loaderAutoLabel.textContent = 'Auto';
        startStepProgress();
        showToast('▶️ Intro auto-play resumed');
      } else {
        cancelAnimationFrame(progressAnimFrame);
        if (loaderProgressBar) loaderProgressBar.style.width = '0%';
        if (loaderAutoIcon) loaderAutoIcon.className = 'fa-solid fa-play';
        if (loaderAutoLabel) loaderAutoLabel.textContent = 'Paused';
        showToast('⏸️ Intro auto-play paused');
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!loadingScreen || loadingScreen.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1, true);
      } else {
        closeLoader();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentStep > 1) {
        goToStep(currentStep - 1, true);
      }
    } else if (e.key === 'Escape') {
      closeLoader();
    }
  });

  // Initialize loading screen on start
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
    document.body.style.overflow = 'hidden';
    updateLoaderUI();
    startStepProgress();
  }
});
