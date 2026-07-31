'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var AppContext_1 = require("@/context/AppContext");
var lucide_react_1 = require("lucide-react");
var Toast_1 = require("@/components/Toast");
var auth_client_1 = require("@/lib/auth-client");
function Register() {
    var _this = this;
    var _a = AppContext_1.useApp(), register = _a.register, isAuthenticated = _a.isAuthenticated, loadingUser = _a.loadingUser, dbMode = _a.dbMode;
    var _b = react_1.useState(''), name = _b[0], setName = _b[1];
    var _c = react_1.useState(''), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(''), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    var _f = react_1.useState(false), googleLoading = _f[0], setGoogleLoading = _f[1];
    var _g = react_1.useState(''), errorMsg = _g[0], setErrorMsg = _g[1];
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        if (!loadingUser && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, loadingUser, router]);
    var handleGoogleSignIn = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setErrorMsg('');
                    setGoogleLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_client_1.signInWithGoogle()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Google sign-in error:', error_1);
                    setErrorMsg('Google sign-in could not be started. Please check your OAuth configuration.');
                    return [3 /*break*/, 5];
                case 4:
                    setGoogleLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!name || !email || !password) {
                        setErrorMsg('Please populate all inputs.');
                        return [2 /*return*/];
                    }
                    if (password.length < 6) {
                        setErrorMsg('Password should be at least 6 characters.');
                        return [2 /*return*/];
                    }
                    setErrorMsg('');
                    setLoading(true);
                    return [4 /*yield*/, register(name, email, password)];
                case 1:
                    success = _a.sent();
                    setLoading(false);
                    if (!success) {
                        setErrorMsg('Registration failed. Email might already be registered.');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" },
        react_1["default"].createElement("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.15),transparent_60%)]" }),
        react_1["default"].createElement("div", { className: "absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" }),
        react_1["default"].createElement("div", { className: "absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" }),
        react_1["default"].createElement("div", { className: "max-w-md w-full space-y-8 z-10" },
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(link_1["default"], { href: "/", className: "inline-flex items-center gap-2 mb-3" },
                    react_1["default"].createElement("div", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20" },
                        react_1["default"].createElement(lucide_react_1.Kanban, { className: "h-6 w-6 text-white" })),
                    react_1["default"].createElement("span", { className: "text-2xl font-bold tracking-tight text-white" },
                        "Zen",
                        react_1["default"].createElement("span", { className: "text-indigo-400" }, "Board"))),
                react_1["default"].createElement("h2", { className: "text-2xl font-black text-slate-100" }, "Create your workspace profile"),
                react_1["default"].createElement("p", { className: "mt-2 text-xs text-slate-400" },
                    "Already have a profile?",
                    ' ',
                    react_1["default"].createElement(link_1["default"], { href: "/login", className: "font-semibold text-indigo-400 hover:text-indigo-300 transition-colors" }, "sign in here"))),
            react_1["default"].createElement("div", { className: "bg-slate-950/40 border border-slate-800 rounded-2xl p-6 shadow-2xl glass" },
                react_1["default"].createElement("form", { className: "space-y-4", onSubmit: handleSubmit },
                    errorMsg && (react_1["default"].createElement("div", { className: "rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs font-medium text-rose-300 text-center" }, errorMsg)),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 mb-1.5" }, "Full Name"),
                        react_1["default"].createElement("div", { className: "relative" },
                            react_1["default"].createElement("span", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500" },
                                react_1["default"].createElement(lucide_react_1.User, { className: "w-4 h-4" })),
                            react_1["default"].createElement("input", { type: "text", required: true, value: name, onChange: function (e) { return setName(e.target.value); }, placeholder: "John Doe", className: "w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none" }))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 mb-1.5" }, "Email Address"),
                        react_1["default"].createElement("div", { className: "relative" },
                            react_1["default"].createElement("span", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500" },
                                react_1["default"].createElement(lucide_react_1.Mail, { className: "w-4 h-4" })),
                            react_1["default"].createElement("input", { type: "email", required: true, value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: "john@example.com", className: "w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none" }))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 mb-1.5" }, "Password"),
                        react_1["default"].createElement("div", { className: "relative" },
                            react_1["default"].createElement("span", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500" },
                                react_1["default"].createElement(lucide_react_1.Lock, { className: "w-4 h-4" })),
                            react_1["default"].createElement("input", { type: "password", required: true, value: password, onChange: function (e) { return setPassword(e.target.value); }, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022 (min 6 chars)", className: "w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none" }))),
                    react_1["default"].createElement("button", { type: "submit", disabled: loading, className: "w-full flex justify-center items-center gap-1.5 h-11 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition-colors disabled:opacity-50" },
                        react_1["default"].createElement(lucide_react_1.PlusCircle, { className: "w-4 h-4" }),
                        loading ? 'Registering...' : 'Register Profile')),
                react_1["default"].createElement("div", { className: "mt-4" },
                    react_1["default"].createElement("div", { className: "relative mb-3" },
                        react_1["default"].createElement("div", { className: "absolute inset-0 flex items-center" },
                            react_1["default"].createElement("div", { className: "w-full border-t border-slate-800" })),
                        react_1["default"].createElement("div", { className: "relative flex justify-center text-[10px] uppercase tracking-[0.25em] text-slate-500" },
                            react_1["default"].createElement("span", { className: "bg-slate-950/40 px-2" }, "or continue with"))),
                    react_1["default"].createElement("button", { type: "button", onClick: handleGoogleSignIn, disabled: googleLoading, className: "w-full flex justify-center items-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-900/60 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-colors disabled:opacity-50" },
                        react_1["default"].createElement("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", "aria-hidden": "true" },
                            react_1["default"].createElement("path", { fill: "#4285F4", d: "M21.6 12.23c0-.78-.07-1.53-.2-2.25H12v4.26h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.33 2.98-7.53Z" }),
                            react_1["default"].createElement("path", { fill: "#34A853", d: "M12 22c2.7 0 4.96-.89 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z" }),
                            react_1["default"].createElement("path", { fill: "#FBBC05", d: "M6.41 13.92A6.01 6.01 0 0 1 6.41 10.08V7.5H3.07a10 10 0 0 0 0 12.84l3.34-2.42Z" }),
                            react_1["default"].createElement("path", { fill: "#EA4335", d: "M12 6.04c1.47 0 2.8.5 3.84 1.49l2.88-2.88A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.93 5.5l3.34 2.58C7.2 7.8 9.4 6.04 12 6.04Z" })),
                        googleLoading ? 'Connecting...' : 'Continue with Google')))),
        react_1["default"].createElement(Toast_1["default"], null)));
}
exports["default"] = Register;
