export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/pause.svg","images/play.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.ceeaa618.js","app":"_app/immutable/entry/app.65c9b376.js","imports":["_app/immutable/entry/start.ceeaa618.js","_app/immutable/chunks/scheduler.7fbc3286.js","_app/immutable/chunks/singletons.2f6a4195.js","_app/immutable/chunks/index.cac7de8a.js","_app/immutable/entry/app.65c9b376.js","_app/immutable/chunks/scheduler.7fbc3286.js","_app/immutable/chunks/index.afb51b63.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
