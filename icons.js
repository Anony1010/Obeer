/* ============================================================
   BEER'O — Shared Icon System
   A single source of truth for every SVG icon used across
   index.html, admin.html and daily.html. Replaces all emoji
   glyphs with a consistent, professional stroke-icon set.
   ============================================================ */
(function (global) {
  var ICONS = {
    beer: '<path d="M18 8h1a3 3 0 0 1 0 6h-1"/><path d="M4 8h13v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8Z"/><path d="M6 4h9l-1 4H7z"/><path d="M8 12v4M11.5 12v4"/>',
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4-4"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M14.5 4.5 19 9 8 20H4v-4Z"/><path d="m13 6 5 5"/>',
    trash: '<path d="M4.5 6.5h15"/><path d="M9 6.5V4.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3V6.5"/><path d="M6.5 6.5 7.3 19a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8l.8-12.5"/><path d="M10.3 10.5v6M13.7 10.5v6"/>',
    drag: '<circle cx="9" cy="6" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="18" r="1.3"/>',
    cloud: '<path d="M7.5 18a4.5 4.5 0 0 1-.7-8.94A5.5 5.5 0 0 1 17.2 8.1 4 4 0 0 1 16.5 18h-9Z"/><path d="M12 11v6.5M9.3 14.8 12 17.5l2.7-2.7"/>',
    link: '<path d="M9.5 14.5 14.5 9.5"/><path d="M11 7.5 12.6 6a3.4 3.4 0 0 1 4.8 4.8L15.9 12.3"/><path d="M13 16.5 11.4 18a3.4 3.4 0 0 1-4.8-4.8L8.1 11.7"/>',
    save: '<path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H15l4 4v10.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5Z"/><path d="M8.5 4v5h7V4"/><path d="M8.5 20v-6h7v6"/>',
    refresh: '<path d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5M19.5 12a7.5 7.5 0 0 1-12.6 5.5"/><path d="M17 3.5v3.5h-3.5M7 20.5V17h3.5"/>',
    card: '<rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M3.5 10.5h17"/><path d="M7 14.5h3"/>',
    cash: '<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="12" cy="12" r="2.4"/><path d="M6.5 9v0M17.5 15v0"/>',
    wallet: '<path d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10a2.5 2.5 0 0 1 2.5 2.5v9A1.5 1.5 0 0 1 18 18H6a1.5 1.5 0 0 1-1.5-1.5Z"/><path d="M15.5 12.8a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z"/><path d="M4.5 9.5h13"/>',
    folder: '<path d="M4 7.2A1.7 1.7 0 0 1 5.7 5.5h3.9l1.8 2h7A1.7 1.7 0 0 1 20 9.2v8.1A1.7 1.7 0 0 1 18.3 19H5.7A1.7 1.7 0 0 1 4 17.3Z"/>',
    'check-circle': '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.3 2.4 2.4 4.8-5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    archive: '<rect x="3.5" y="5" width="17" height="4" rx="1"/><path d="M5 9v8.5A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5V9"/><path d="M10 13h4"/>',
    pdf: '<path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path d="M14 3.5V8h4.5"/><path d="M9 14.2h1.4c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2H9v4.6M13.4 16.4v-4.6h1.1c1 0 1.7.8 1.7 2.3s-.7 2.3-1.7 2.3h-1.1ZM18 11.8h-1.8v4.6M16.2 14h1.5"/>',
    box: '<path d="M3.5 8 12 4l8.5 4-8.5 4Z"/><path d="M3.5 8v8L12 20l8.5-4V8"/><path d="M12 12v8"/>',
    'clipboard-list': '<rect x="6" y="4.5" width="12" height="16" rx="2"/><path d="M9.5 3.5h5a.7.7 0 0 1 .7.7V6H8.8V4.2a.7.7 0 0 1 .7-.7Z"/><path d="M9.5 11h5M9.5 14.5h5M9.5 8h1.2"/>',
    alert: '<path d="M12 4 21 19.5H3Z"/><path d="M12 10v4"/><circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none"/>',
    'x-circle': '<circle cx="12" cy="12" r="8.5"/><path d="m9.2 9.2 5.6 5.6M14.8 9.2l-5.6 5.6"/>',
    inbox: '<path d="M4 12.5h4.2l1.4 2.5h4.8l1.4-2.5H20"/><path d="M6.2 6h11.6L20 12.5v6A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-6Z"/>',
    tag: '<path d="M11.5 4H6.5A1.5 1.5 0 0 0 5 5.5v5l9.3 9.3a1.5 1.5 0 0 0 2.12 0l4.38-4.38a1.5 1.5 0 0 0 0-2.12Z"/><circle cx="8.8" cy="8.8" r="1.1"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.2"/><rect x="13" y="4" width="7" height="7" rx="1.2"/><rect x="4" y="13" width="7" height="7" rx="1.2"/><rect x="13" y="13" width="7" height="7" rx="1.2"/>',
    'wifi-off': '<path d="M3 8.5c1.6-1.4 3.4-2.4 5.3-3M20.9 8.5a15 15 0 0 0-3.6-2.4M6.8 12.3a9 9 0 0 1 3.2-1.7M17 12.2a9 9 0 0 0-2-1.2M9.5 15.8a4.6 4.6 0 0 1 5 0M12 19.2v.1M3 3l18 18"/>',
    wifi: '<path d="M4.9 9.9a11 11 0 0 1 14.2 0M7.8 13a7 7 0 0 1 8.4 0M10.8 16.1a3 3 0 0 1 2.4 0M12 19.2v.1"/>'
  };

  function svg(name, size) {
    var s = size || 18;
    var body = ICONS[name] || '';
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  }

  function paint(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      var name = el.getAttribute('data-icon');
      var size = el.getAttribute('data-icon-size') || 18;
      el.innerHTML = svg(name, size);
    });
  }

  global.BeeroIcons = { raw: ICONS, svg: svg, paint: paint };

  document.addEventListener('DOMContentLoaded', function () { paint(document); });
})(window);
