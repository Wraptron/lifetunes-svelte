

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.01093773.js","_app/immutable/chunks/scheduler.7fbc3286.js","_app/immutable/chunks/index.afb51b63.js","_app/immutable/chunks/index.cac7de8a.js"];
export const stylesheets = ["_app/immutable/assets/2.ff3c0a9f.css"];
export const fonts = [];
