(function () {
  function getTimeRemaining(targetDate) {
    const total = Date.parse(targetDate) - Date.now();
    const seconds = Math.max(0, Math.floor((total / 1000) % 60));
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
    return { total, days, hours, minutes, seconds };
  }

  function updateClock(id, targetDate) {
    const el = document.getElementById(id);
    if (!el) return;
    const t = getTimeRemaining(targetDate);
    const daysEl = el.querySelector('[id$="-days"]');
    const hoursEl = el.querySelector('[id$="-hours"]');
    const minsEl = el.querySelector('[id$="-mins"]');
    const secsEl = el.querySelector('[id$="-secs"]');
    if (daysEl) daysEl.textContent = String(t.days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(t.hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(t.minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(t.seconds).padStart(2, '0');
  }

  function init() {
    const ai200Date = '2026-08-27T00:00:00';
    const ibmDate = '2026-09-07T00:00:00';
    function tick() {
      updateClock('countdown-ai200', ai200Date);
      updateClock('countdown-ibm', ibmDate);
    }
    tick();
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
