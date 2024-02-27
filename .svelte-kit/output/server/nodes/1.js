

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.77a0587a.js","_app/immutable/chunks/scheduler.7fbc3286.js","_app/immutable/chunks/index.afb51b63.js","_app/immutable/chunks/singletons.2f6a4195.js","_app/immutable/chunks/index.cac7de8a.js"];
export const stylesheets = [];
export const fonts = [];
