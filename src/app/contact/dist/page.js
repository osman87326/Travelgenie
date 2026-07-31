"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var lucide_react_1 = require("lucide-react");
var mockApi_1 = require("@/services/mockApi");
function ContactPage() {
    var _this = this;
    var _a = react_1.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = react_1.useState(false), isSubmitted = _c[0], setIsSubmitted = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var validate = function () {
        var newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.subject.trim())
            newErrors.subject = 'Subject is required';
        if (formData.message.trim().length < 10)
            newErrors.message = 'Message must be at least 10 characters long';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validate())
                        return [2 /*return*/];
                    setLoading(true);
                    // Simulate API delay
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 800); })];
                case 1:
                    // Simulate API delay
                    _a.sent();
                    mockApi_1.mockApi.saveContactMessage(formData);
                    setLoading(false);
                    setIsSubmitted(true);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12" },
        react_1["default"].createElement("section", { className: "text-center max-w-2xl mx-auto space-y-4" },
            react_1["default"].createElement("h1", { className: "text-4xl font-extrabold text-white tracking-tight" },
                "Contact ",
                react_1["default"].createElement("span", { className: "bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent" }, "Support")),
            react_1["default"].createElement("p", { className: "text-slate-400 text-sm" }, "Have questions about the AI planner, API configuration, or custom items? We are here to help.")),
        react_1["default"].createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8" },
            react_1["default"].createElement("div", { className: "space-y-6 lg:col-span-1" },
                react_1["default"].createElement("div", { className: "glass-card p-6 space-y-6" },
                    react_1["default"].createElement("h3", { className: "text-lg font-bold text-white" }, "Contact Information"),
                    react_1["default"].createElement("div", { className: "space-y-4 text-sm text-slate-400" },
                        react_1["default"].createElement("div", { className: "flex items-start gap-3" },
                            react_1["default"].createElement(lucide_react_1.MapPin, { className: "w-5 h-5 text-teal-400 shrink-0 mt-0.5" }),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("p", { className: "font-semibold text-white" }, "Our Office"),
                                react_1["default"].createElement("p", { className: "text-xs mt-0.5" }, "123 Innovation Boulevard, Suite 500, Tech City, TC 94016"))),
                        react_1["default"].createElement("div", { className: "flex items-start gap-3" },
                            react_1["default"].createElement(lucide_react_1.Mail, { className: "w-5 h-5 text-teal-400 shrink-0 mt-0.5" }),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("p", { className: "font-semibold text-white" }, "Email Address"),
                                react_1["default"].createElement("p", { className: "text-xs mt-0.5" }, "support@travelgenie.ai"))),
                        react_1["default"].createElement("div", { className: "flex items-start gap-3" },
                            react_1["default"].createElement(lucide_react_1.Phone, { className: "w-5 h-5 text-teal-400 shrink-0 mt-0.5" }),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("p", { className: "font-semibold text-white" }, "Phone Support"),
                                react_1["default"].createElement("p", { className: "text-xs mt-0.5" }, "+1 (555) 893-2741"))))),
                react_1["default"].createElement("div", { className: "glass-card p-6 bg-gradient-to-br from-teal-950/20 to-slate-900/40" },
                    react_1["default"].createElement("h4", { className: "font-bold text-white text-sm mb-2" }, "Technical Note"),
                    react_1["default"].createElement("p", { className: "text-xs text-slate-400 leading-relaxed" }, "Form submissions are saved to the local database in browser storage immediately and can be loaded dynamically."))),
            react_1["default"].createElement("div", { className: "lg:col-span-2" },
                react_1["default"].createElement("div", { className: "glass-panel rounded-2xl p-6 sm:p-8 shadow-xl" }, isSubmitted ? (react_1["default"].createElement("div", { className: "text-center py-10 space-y-4 animate-in fade-in duration-300" },
                    react_1["default"].createElement("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
                        react_1["default"].createElement(lucide_react_1.CheckCircle2, { className: "w-7 h-7" })),
                    react_1["default"].createElement("h3", { className: "text-xl font-bold text-white" }, "Message Transmitted Successfully"),
                    react_1["default"].createElement("p", { className: "text-slate-400 text-sm max-w-sm mx-auto leading-relaxed" }, "Your message has been stored in our system logs. Our support team will respond to your inquiry shortly."),
                    react_1["default"].createElement("button", { onClick: function () { return setIsSubmitted(false); }, className: "px-6 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-semibold" }, "Send another message"))) : (react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Full Name"),
                            react_1["default"].createElement("input", { type: "text", value: formData.name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }, placeholder: "Jane Doe", className: "w-full glass-input " + (errors.name ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : '') }),
                            errors.name && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                                react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                                errors.name))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Email Address"),
                            react_1["default"].createElement("input", { type: "email", value: formData.email, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { email: e.target.value })); }, placeholder: "jane@example.com", className: "w-full glass-input " + (errors.email ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : '') }),
                            errors.email && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                                react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                                errors.email)))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Subject"),
                        react_1["default"].createElement("input", { type: "text", value: formData.subject, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { subject: e.target.value })); }, placeholder: "Itinerary customisation inquiry", className: "w-full glass-input " + (errors.subject ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : '') }),
                        errors.subject && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.subject))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Message Body"),
                        react_1["default"].createElement("textarea", { rows: 5, value: formData.message, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { message: e.target.value })); }, placeholder: "Describe your inquiry in detail...", className: "w-full glass-input resize-none " + (errors.message ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500' : '') }),
                        errors.message && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.message))),
                    react_1["default"].createElement("div", { className: "pt-2" },
                        react_1["default"].createElement("button", { type: "submit", disabled: loading, className: "w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-teal-500/10" }, loading ? (react_1["default"].createElement("div", { className: "w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(lucide_react_1.Send, { className: "w-4 h-4" }),
                            "Send Message")))))))))));
}
exports["default"] = ContactPage;
