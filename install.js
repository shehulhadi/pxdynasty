// PXDynasty — install prompt + reminder
// Captures beforeinstallprompt (Android/Chrome/Edge), falls back to
// iOS Safari instructions, and respects dismissals with a 3-day cooldown.

(function () {
  'use strict';

  var STORAGE_KEY = 'px_a2hs_dismissed_at';
  var COOLDOWN_DAYS = 3;
  var deferredPrompt = null;
  var bannerEl = null;

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
  }

  function isIOS() {
    var ua = window.navigator.userAgent || '';
    var iOSDevice = /iPad|iPhone|iPod/.test(ua);
    var iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return (iOSDevice || iPadOS) && !window.MSStream;
  }

  function isInAppBrowser() {
    var ua = window.navigator.userAgent || '';
    return /FBAN|FBAV|Instagram|Twitter|Line|WhatsApp|Snapchat/.test(ua);
  }

  function recentlyDismissed() {
    try {
      var t = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      if (!t) return false;
      var days = (Date.now() - t) / 86400000;
      return days < COOLDOWN_DAYS;
    } catch (e) { return false; }
  }

  function markDismissed() {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch (e) {}
  }

  function hideBanner() {
    if (!bannerEl) return;
    bannerEl.classList.remove('px-a2hs-show');
    setTimeout(function () { if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl); bannerEl = null; }, 300);
  }

  function showBanner(mode) {
    if (bannerEl || isStandalone() || recentlyDismissed() || isInAppBrowser()) return;
    bannerEl = document.createElement('div');
    bannerEl.className = 'px-a2hs';
    var title = mode === 'ios' ? 'Add PXDynasty to Home Screen' : 'Install PXDynasty';
    var sub = mode === 'ios'
      ? 'Tap Share, then "Add to Home Screen" for the full app experience.'
      : 'Faster, full-screen, works offline. One tap to install.';
    var actionHtml = mode === 'ios'
      ? '<button class="px-a2hs-cta" data-px-a2hs="ios-ok">Got it</button>'
      : '<button class="px-a2hs-cta" data-px-a2hs="install">Install</button>';
    bannerEl.innerHTML =
      '<img class="px-a2hs-icon" src="icon-192.png" alt="" />' +
      '<div class="px-a2hs-body">' +
        '<div class="px-a2hs-title">' + title + '</div>' +
        '<div class="px-a2hs-sub">' + sub + '</div>' +
      '</div>' +
      '<div class="px-a2hs-actions">' + actionHtml +
        '<button class="px-a2hs-skip" data-px-a2hs="dismiss" aria-label="Dismiss">Later</button>' +
      '</div>';
    document.body.appendChild(bannerEl);
    requestAnimationFrame(function () { bannerEl.classList.add('px-a2hs-show'); });

    bannerEl.addEventListener('click', function (e) {
      var t = e.target && e.target.getAttribute && e.target.getAttribute('data-px-a2hs');
      if (!t) return;
      if (t === 'install' && deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choice) {
          if (choice && choice.outcome === 'accepted') {
            markDismissed();
          } else {
            markDismissed();
          }
          deferredPrompt = null;
          hideBanner();
        });
      } else if (t === 'ios-ok' || t === 'dismiss') {
        markDismissed();
        hideBanner();
      }
    });
  }

  // Android/Chrome/Edge
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    // Small delay so we don't slam the user on first paint
    setTimeout(function () { showBanner('android'); }, 4000);
  });

  // Installed mid-session
  window.addEventListener('appinstalled', function () {
    markDismissed();
    hideBanner();
    try { localStorage.setItem('px_a2hs_installed', '1'); } catch (e) {}
  });

  // iOS: no beforeinstallprompt. Show instructions after a longer delay,
  // but only once we're fairly sure they're a returning visitor (30s).
  if (isIOS() && !isStandalone() && !isInAppBrowser()) {
    setTimeout(function () { showBanner('ios'); }, 30000);
  }

  // Expose for programmatic use (e.g. a "Get the app" button in More tab)
  window.pxInstall = {
    prompt: function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        return deferredPrompt.userChoice;
      }
      if (isIOS()) { showBanner('ios'); return Promise.resolve({ outcome: 'manual' }); }
      return Promise.resolve({ outcome: 'unavailable' });
    },
    canPrompt: function () { return !!deferredPrompt || isIOS(); },
    isInstalled: isStandalone,
    resetDismissal: function () { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} }
  };
})();
