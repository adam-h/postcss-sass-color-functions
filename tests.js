var test = require("tape")
var postcss = require("postcss")
var plugin = require("./index.js")

function runPostCSS(css) {
  return postcss()
    .use(plugin({}))
    .process(css, {}).css
}

test("mix(color, color)", function(t) {
  t.equal(
    runPostCSS("body{background-color: mix(rgb(255,0,0), #00FF00), mix(rgba(255,0,255, 0.5), #00FF00);}"),
    "body{background-color: rgb(128, 128, 0), rgba(64, 191, 64, 0.75);}",
    "mix() works with default amount");
  t.end()
});

test("mix(color, color, amount)", function(t) {
  t.equal(
    runPostCSS("body{border: 1px solid mix(#255073, #3c749e, 25%);}"),
    "body{border: 1px solid rgb(54, 107, 147);}",
    "mix() works with defined amount");
  t.end()
});

test("rgba()", function(t) {
  t.equal(
    runPostCSS("body{color: rgba(255, 0, 255, 0.5); background-color: rgba(red, 0.5)}"),
    "body{color: rgba(255, 0, 255, 0.5); background-color: rgba(255, 0, 0, 0.5)}",
    "rgba() handles css and sass syntax");
  t.end()
});

test("darken()", function(t) {
  t.equal(
    runPostCSS("body{background-color: darken(#e9eff4, 5%);}"),
    "body{background-color: rgb(218, 228, 236);}",
    "darken() works");
  t.end()
});

test("lighten()", function(t) {
  t.equal(
    runPostCSS("body{background-color: lighten(rgb(100,100,100), 10%);}"),
    "body{background-color: rgb(110, 110, 110);}",
    "lighten() works");
  t.end()
});

test("tint()", function(t) {
  t.equal(
    runPostCSS("body{background-color: tint(#255073, 15%);}"),
    "body{background-color: rgb(70, 106, 136);}",
    "tint() works");
  t.end()
});

test("shade()", function(t) {
  t.equal(
    runPostCSS("body{background-color: shade(#255073, 15%);}"),
    "body{background-color: rgb(31, 68, 98);}",
    "shade() works");
  t.end()
});

test("transparentize()", function(t) {
  t.equal(
    runPostCSS("body{background-color: transparentize(#255073, 0.8);}"),
    "body{background-color: rgba(37, 80, 115, 0.2);}",
    "transparentize() works");
  t.end()
});

test("opacify()", function(t) {
  t.equal(
    runPostCSS("body{background-color: opacify(rgba(255, 0, 0, 0.4), 0.2);}"),
    "body{background-color: rgba(255, 0, 0, 0.6);}",
    "opacify() works");
  t.end()
});
