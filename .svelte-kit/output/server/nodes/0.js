

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.ca0bb8a1.js","_app/immutable/chunks/scheduler.7fbc3286.js","_app/immutable/chunks/index.afb51b63.js"];
export const stylesheets = ["_app/immutable/assets/0.9d70bfc0.css"];
export const fonts = [];
