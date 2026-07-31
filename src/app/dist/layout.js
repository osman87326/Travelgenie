"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
var AuthContext_1 = require("@/context/AuthContext");
var Navbar_1 = require("@/components/Navbar");
var Footer_1 = require("@/components/Footer");
exports.metadata = {
    title: "TravelGenie",
    description: "Plan your trips smarter"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", suppressHydrationWarning: true },
        React.createElement("body", null,
            React.createElement(AuthContext_1.AuthProvider, null,
                React.createElement(Navbar_1["default"], null),
                children,
                React.createElement(Footer_1["default"], null)))));
}
exports["default"] = RootLayout;
