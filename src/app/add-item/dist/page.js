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
var navigation_1 = require("next/navigation");
var AuthContext_1 = require("@/context/AuthContext");
var mockApi_1 = require("@/services/mockApi");
var lucide_react_1 = require("lucide-react");
function AddItemPage() {
    var _this = this;
    var user = AuthContext_1.useAuth().user;
    var router = navigation_1.useRouter();
    var _a = react_1.useState({
        title: '',
        location: '',
        country: '',
        category: 'Nature',
        shortDescription: '',
        fullDescription: '',
        priceLevel: 'Moderate',
        averageCost: 1000,
        bestSeason: '',
        duration: 5,
        imageUrl: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState({}), errors = _b[0], setErrors = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var validate = function () {
        var newErrors = {};
        if (!formData.title.trim())
            newErrors.title = 'Title is required';
        if (!formData.location.trim())
            newErrors.location = 'City/Location is required';
        if (!formData.country.trim())
            newErrors.country = 'Country is required';
        if (!formData.shortDescription.trim()) {
            newErrors.shortDescription = 'Short description is required';
        }
        else if (formData.shortDescription.length > 150) {
            newErrors.shortDescription = 'Must be under 150 characters';
        }
        if (!formData.fullDescription.trim())
            newErrors.fullDescription = 'Full description is required';
        if (!formData.bestSeason.trim())
            newErrors.bestSeason = 'Best season description is required';
        if (!formData.averageCost || formData.averageCost <= 0) {
            newErrors.averageCost = 'Cost must be greater than 0';
        }
        if (!formData.duration || formData.duration <= 0) {
            newErrors.duration = 'Duration must be greater than 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var finalImageUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!validate())
                        return [2 /*return*/];
                    setLoading(true);
                    // Simulate brief API request delay
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 800); })];
                case 1:
                    // Simulate brief API request delay
                    _a.sent();
                    finalImageUrl = formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop';
                    mockApi_1.mockApi.addDestination(__assign(__assign({}, formData), { imageUrl: finalImageUrl, createdBy: (user === null || user === void 0 ? void 0 : user.id) || 'usr-demo' }));
                    setLoading(false);
                    router.push('/items/manage');
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" },
        react_1["default"].createElement("div", { className: "space-y-2" },
            react_1["default"].createElement("h1", { className: "text-3xl font-extrabold text-white flex items-center gap-2" },
                react_1["default"].createElement(lucide_react_1.PlusCircle, { className: "w-8 h-8 text-teal-400" }),
                "Add Custom Destination"),
            react_1["default"].createElement("p", { className: "text-slate-400 text-sm" }, "Expand our catalog by adding unique locations. They will become instantly queryable in the planning form.")),
        react_1["default"].createElement("div", { className: "glass-panel rounded-2xl p-6 sm:p-8 shadow-xl" },
            react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "space-y-6 text-sm" },
                react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6" },
                    react_1["default"].createElement("div", { className: "sm:col-span-2" },
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Destination Title"),
                        react_1["default"].createElement("input", { type: "text", value: formData.title, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { title: e.target.value })); }, placeholder: "e.g. Kyoto Cherry Blossom Retreat", className: "w-full glass-input " + (errors.title ? 'border-rose-500/50' : '') }),
                        errors.title && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.title))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Category"),
                        react_1["default"].createElement("select", { value: formData.category, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { category: e.target.value })); }, className: "w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500" },
                            react_1["default"].createElement("option", { value: "Nature" }, "Nature"),
                            react_1["default"].createElement("option", { value: "Beach" }, "Beach"),
                            react_1["default"].createElement("option", { value: "Adventure" }, "Adventure"),
                            react_1["default"].createElement("option", { value: "Culture" }, "Culture"),
                            react_1["default"].createElement("option", { value: "City" }, "City")))),
                react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "City / Region"),
                        react_1["default"].createElement("input", { type: "text", value: formData.location, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { location: e.target.value })); }, placeholder: "e.g. Kyoto", className: "w-full glass-input " + (errors.location ? 'border-rose-500/50' : '') }),
                        errors.location && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.location))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Country"),
                        react_1["default"].createElement("input", { type: "text", value: formData.country, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { country: e.target.value })); }, placeholder: "e.g. Japan", className: "w-full glass-input " + (errors.country ? 'border-rose-500/50' : '') }),
                        errors.country && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.country)))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Short Summary Description"),
                    react_1["default"].createElement("input", { type: "text", value: formData.shortDescription, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { shortDescription: e.target.value })); }, placeholder: "e.g. A gorgeous zen retreat set in traditional Kyoto temples. (Max 150 chars)", className: "w-full glass-input " + (errors.shortDescription ? 'border-rose-500/50' : '') }),
                    errors.shortDescription && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                        react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3.5 h-3.5" }),
                        errors.shortDescription))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Full Destination Overview Description"),
                    react_1["default"].createElement("textarea", { rows: 4, value: formData.fullDescription, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { fullDescription: e.target.value })); }, placeholder: "Detailed specifications about landmarks, history, local activities...", className: "w-full glass-input resize-none " + (errors.fullDescription ? 'border-rose-500/50' : '') }),
                    errors.fullDescription && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                        react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3.5 h-3.5" }),
                        errors.fullDescription))),
                react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-6" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Price Level"),
                        react_1["default"].createElement("select", { value: formData.priceLevel, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { priceLevel: e.target.value })); }, className: "w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-teal-500" },
                            react_1["default"].createElement("option", { value: "Budget" }, "Budget"),
                            react_1["default"].createElement("option", { value: "Moderate" }, "Moderate"),
                            react_1["default"].createElement("option", { value: "Luxury" }, "Luxury"))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Avg Cost (USD)"),
                        react_1["default"].createElement("input", { type: "number", value: formData.averageCost, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { averageCost: parseInt(e.target.value) || 0 })); }, className: "w-full glass-input " + (errors.averageCost ? 'border-rose-500/50' : '') }),
                        errors.averageCost && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.averageCost))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Best Season"),
                        react_1["default"].createElement("input", { type: "text", value: formData.bestSeason, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { bestSeason: e.target.value })); }, placeholder: "e.g. Spring / Oct-Nov", className: "w-full glass-input " + (errors.bestSeason ? 'border-rose-500/50' : '') }),
                        errors.bestSeason && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.bestSeason))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Ideal Days"),
                        react_1["default"].createElement("input", { type: "number", value: formData.duration, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { duration: parseInt(e.target.value) || 0 })); }, className: "w-full glass-input " + (errors.duration ? 'border-rose-500/50' : '') }),
                        errors.duration && (react_1["default"].createElement("p", { className: "text-rose-400 text-[10px] mt-1 flex items-center gap-1" },
                            react_1["default"].createElement(lucide_react_1.AlertCircle, { className: "w-3 h-3" }),
                            errors.duration)))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" }, "Image URL (Optional)"),
                    react_1["default"].createElement("div", { className: "relative" },
                        react_1["default"].createElement(lucide_react_1.Image, { className: "absolute left-3 top-3 w-4 h-4 text-slate-500" }),
                        react_1["default"].createElement("input", { type: "url", value: formData.imageUrl, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { imageUrl: e.target.value })); }, placeholder: "https://images.unsplash.com/photo-...", className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-650 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono" })),
                    react_1["default"].createElement("p", { className: "text-[10px] text-slate-500 mt-1" }, "If left empty, a scenic default placeholder will be assigned.")),
                react_1["default"].createElement("div", { className: "flex justify-end gap-3 pt-4 border-t border-slate-800/60" },
                    react_1["default"].createElement("button", { type: "button", onClick: function () { return router.push('/items/manage'); }, className: "px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors" }, "Cancel"),
                    react_1["default"].createElement("button", { type: "submit", disabled: loading, className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-teal-500/10" }, loading ? (react_1["default"].createElement("div", { className: "w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(lucide_react_1.Sparkles, { className: "w-4 h-4" }),
                        "Add Destination"))))))));
}
exports["default"] = AddItemPage;
