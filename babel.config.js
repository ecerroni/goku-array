module.exports = {
  presets: [
    ["latest-node", { "target": "10" }],
    ["minify", {
      "keepFnName": true
    }]
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties"]
  ]
};