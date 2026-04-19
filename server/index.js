import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/routes/video-runway.mp4
var video_runway_default = "/assets/video-runway-DlEJbt2x.mp4";
//#endregion
//#region app/routes/login.tsx
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => login_default,
	meta: () => meta
});
function meta({}) {
	return [{ title: "Login" }, {
		name: "description",
		content: "Página de Login"
	}];
}
var login_default = UNSAFE_withComponentProps(function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === "eduardo.lino@pucpr.br" && password === "123456") setMessage("Acessado com sucesso!");
		else setMessage("Usuário ou senha incorretos!");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "hidden lg:block lg:w-1/2 relative overflow-hidden",
			children: [/* @__PURE__ */ jsx("video", {
				src: video_runway_default,
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				className: "absolute inset-0 w-full h-full object-cover"
			}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" })]
		}), /* @__PURE__ */ jsx("div", {
			className: "w-full lg:w-1/2 bg-[#f6f6f6] flex flex-col justify-center px-8 sm:px-12 xl:px-16 shadow-2xl z-10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-sm mx-auto",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold text-center text-gray-900 mb-8 tracking-tight",
						children: "Login"
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "email",
								className: "block text-sm font-medium text-gray-700 mb-1.5 cursor-pointer",
								children: "E-mail"
							}), /* @__PURE__ */ jsx("input", {
								type: "text",
								id: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm",
								placeholder: "Digite seu e-mail"
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "password",
								className: "block text-sm font-medium text-gray-700 mb-1.5 cursor-pointer",
								children: "Senha"
							}), /* @__PURE__ */ jsx("input", {
								type: "password",
								id: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm",
								placeholder: "Digite sua senha"
							})] }),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "w-full flex justify-center py-3.5 px-4 mt-2 rounded-xl shadow-lg shadow-black/20 text-sm font-bold text-white bg-black hover:bg-gray-800 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#f6f6f6] focus:ring-black transition-all duration-200 active:scale-95 cursor-pointer",
								children: "Acessar"
							})
						]
					}),
					message && /* @__PURE__ */ jsx("div", {
						className: "mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-300",
						children: /* @__PURE__ */ jsx("label", {
							className: `inline-block text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm border ${message === "Acessado com sucesso!" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`,
							children: message
						})
					})
				]
			})
		})]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-F0fCYjsS.js",
		"imports": ["/assets/jsx-runtime-CERU_FkM.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-CJitvlQ_.js",
			"imports": ["/assets/jsx-runtime-CERU_FkM.js"],
			"css": ["/assets/root-B9vYjg1H.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/login": {
			"id": "routes/login",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/login-DIepyf4w.js",
			"imports": ["/assets/jsx-runtime-CERU_FkM.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-67457190.js",
	"version": "67457190",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"unstable_passThroughRequests": false,
	"unstable_subResourceIntegrity": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/login": {
		id: "routes/login",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: login_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
