const paths = {
  play: '<polygon points="8 5 19 12 8 19 8 5"></polygon>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle>',
  check: '<path d="M20 6 9 17l-5-5"></path>',
  rotate: '<path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path>',
  target: '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle>',
  sparkle: '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"></path><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"></path><path d="M5 15l.7 1.8L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-1.2L5 15z"></path>'
};

export function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || ""}</svg>`;
}

export function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.getAttribute("data-icon"));
  });
}
