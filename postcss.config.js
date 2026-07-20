const postcssNesting = require("postcss-nesting");

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-nesting": postcssNesting(),
  },
}
