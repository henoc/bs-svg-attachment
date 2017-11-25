// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List         = require("bs-platform/lib/js/list.js");
var Vec2         = require("./vec2.bs.js");
var Block        = require("bs-platform/lib/js/block.js");
var Curry        = require("bs-platform/lib/js/curry.js");
var Option       = require("bs-batteries/lib/js/src/option.js");
var Natives      = require("./natives.bs.js");
var Parsers      = require("./parsers.bs.js");
var Pervasives   = require("bs-platform/lib/js/pervasives.js");
var Caml_format  = require("bs-platform/lib/js/caml_format.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function getAttr(name, t) {
  return Js_primitive.null_to_opt(t[/* elem */1].getAttribute(name));
}

function setAttr(name, value, t) {
  t[/* elem */1].setAttribute(name, value);
  return /* () */0;
}

function changeAttr(name, valueTranslator, t) {
  var prev = getAttr(name, t);
  var match = Option.map(valueTranslator, prev);
  if (match) {
    t[/* elem */1].setAttribute(name, match[0]);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function deleteAttr(name, t) {
  t[/* elem */1].setAttribute(name, ( null ));
  return /* () */0;
}

function move(delta, t) {
  var tx = function (prev) {
    return Pervasives.string_of_float(Caml_format.caml_float_of_string(prev) + delta[/* x */0]);
  };
  var ty = function (prev) {
    return Pervasives.string_of_float(Caml_format.caml_float_of_string(prev) + delta[/* y */1]);
  };
  var match = t[/* elem */1].tagName;
  var exit = 0;
  switch (match) {
    case "circle" : 
    case "ellipse" : 
        exit = 1;
        break;
    case "line" : 
        changeAttr("x1", tx, t);
        changeAttr("y1", ty, t);
        changeAttr("x2", tx, t);
        return changeAttr("y2", ty, t);
    case "path" : 
        var d = List.map((function (op) {
                return /* record */[
                        /* operator */op[/* operator */0],
                        /* points */List.map((function (p) {
                                return Vec2.$plus$caret(p, delta);
                              }), op[/* points */1])
                      ];
              }), Option.$$default(/* [] */0, Option.map(Parsers.parseD, getAttr("d", t))));
        return setAttr("d", Parsers.genD(d), t);
    case "polygon" : 
    case "polyline" : 
        exit = 3;
        break;
    case "image" : 
    case "rect" : 
    case "text" : 
    case "use" : 
        exit = 2;
        break;
    default:
      return /* () */0;
  }
  switch (exit) {
    case 1 : 
        changeAttr("cx", tx, t);
        return changeAttr("cy", ty, t);
    case 2 : 
        changeAttr("x", tx, t);
        return changeAttr("y", ty, t);
    case 3 : 
        var points = List.map((function (p) {
                return Vec2.$plus$caret(p, delta);
              }), Option.$$default(/* [] */0, Option.map(Parsers.parsePoints, getAttr("points", t))));
        return setAttr("points", Parsers.genPoints(points), t);
    
  }
}

function getBBox(t) {
  return Curry._1(Natives.getBoundingClientRect, t[/* elem */1]);
}

function getRootLeftTop(t) {
  var rootBox = Curry._1(Natives.getBoundingClientRect, t[/* rootElem */0]);
  return /* float array */[
          rootBox.left,
          rootBox.top
        ];
}

function getRootRightBottom(t) {
  var rootBox = Curry._1(Natives.getBoundingClientRect, t[/* rootElem */0]);
  return /* float array */[
          rootBox.right,
          rootBox.bottom
        ];
}

function getRootCenter(t) {
  var rootBox = Curry._1(Natives.getBoundingClientRect, t[/* rootElem */0]);
  return /* float array */[
          (rootBox.left + rootBox.right) / 2.0,
          (rootBox.top + rootBox.bottom) / 2.0
        ];
}

function getLeftTop(t) {
  var box = Curry._1(Natives.getBoundingClientRect, t[/* elem */1]);
  var ground = getRootLeftTop(t);
  return Vec2.$neg$caret(/* float array */[
              box.left,
              box.top
            ], ground);
}

function setLeftTop(vec2, t) {
  var prev = getLeftTop(t);
  var delta = Vec2.$neg$caret(vec2, prev);
  return move(delta, t);
}

function getRightBottom(t) {
  var box = Curry._1(Natives.getBoundingClientRect, t[/* elem */1]);
  var ground = getRootLeftTop(t);
  return Vec2.$neg$caret(/* float array */[
              box.right,
              box.bottom
            ], ground);
}

function getCenter(t) {
  var box = Curry._1(Natives.getBoundingClientRect, t[/* elem */1]);
  var ground = getRootLeftTop(t);
  return Vec2.$neg$caret(/* float array */[
              (box.left + box.right) / 2.0,
              (box.top + box.bottom) / 2.0
            ], ground);
}

function setCenter(vec2, t) {
  var delta = Vec2.$neg$caret(vec2, getCenter(t));
  return move(delta, t);
}

function zoom(ratio, t) {
  var center = getCenter(t);
  var mulK = function (name, k) {
    return changeAttr(name, (function (prevStr) {
                  var prev = Caml_format.caml_float_of_string(prevStr);
                  return Pervasives.string_of_float(prev * k);
                }), t);
  };
  var match = t[/* elem */1].tagName;
  var exit = 0;
  switch (match) {
    case "circle" : 
        return mulK("r", ratio[/* x */0]);
    case "ellipse" : 
        mulK("rx", ratio[/* x */0]);
        return mulK("ry", ratio[/* y */1]);
    case "line" : 
        mulK("x2", ratio[/* x */0]);
        return mulK("y2", ratio[/* y */1]);
    case "path" : 
        var d = List.map((function (op) {
                return /* record */[
                        /* operator */op[/* operator */0],
                        /* points */List.map((function (p) {
                                return Vec2.$star$caret(p, ratio);
                              }), op[/* points */1])
                      ];
              }), Option.$$default(/* [] */0, Option.map(Parsers.parseD, getAttr("d", t))));
        return setAttr("d", Parsers.genD(d), t);
    case "polygon" : 
    case "polyline" : 
        exit = 2;
        break;
    case "text" : 
        return mulK("font-size", ratio[/* x */0]);
    case "rect" : 
    case "use" : 
        exit = 1;
        break;
    default:
      return setCenter(center, t);
  }
  switch (exit) {
    case 1 : 
        mulK("width", ratio[/* x */0]);
        return mulK("height", ratio[/* y */1]);
    case 2 : 
        var points = List.map((function (p) {
                return Vec2.$star$caret(p, ratio);
              }), Option.$$default(/* [] */0, Option.map(Parsers.parsePoints, getAttr("points", t))));
        return setAttr("points", Parsers.genPoints(points), t);
    
  }
}

function getSize(t) {
  var box = Curry._1(Natives.getBoundingClientRect, t[/* elem */1]);
  return /* float array */[
          box.width,
          box.height
        ];
}

function setSize(vec2, t) {
  return zoom(Vec2.$slash$caret(vec2, getSize(t)), t);
}

function getFillColor(t) {
  var style = window.getComputedStyle(t[/* elem */1]);
  if (style.fill === "") {
    return /* None */0;
  } else {
    var match = Parsers.parseRgb(style.fill);
    if (typeof match === "number") {
      return /* None */0;
    } else if (match.tag) {
      var rgb = match[0];
      return /* Rgba */Block.__(0, [/* record */[
                  /* r */rgb[/* r */0],
                  /* g */rgb[/* g */1],
                  /* b */rgb[/* b */2],
                  /* a */Caml_format.caml_float_of_string(style.fillOpacity)
                ]]);
    } else {
      return /* None */0;
    }
  }
}

function setFillColor(color, t) {
  var style = t[/* elem */1].style;
  if (typeof color === "number") {
    style.fill = (null);
    return style.fillOpacity = (null);
  } else if (color.tag) {
    return style.fill = Parsers.genColor(color);
  } else {
    style.fill = Parsers.genColor(color);
    return style.fillOpacity = Pervasives.string_of_float(color[0][/* a */3]);
  }
}

function getStrokeColor(t) {
  var style = window.getComputedStyle(t[/* elem */1]);
  if (style.stroke === "") {
    return /* None */0;
  } else {
    var match = Parsers.parseRgb(style.stroke);
    if (typeof match === "number") {
      return /* None */0;
    } else if (match.tag) {
      var rgb = match[0];
      return /* Rgba */Block.__(0, [/* record */[
                  /* r */rgb[/* r */0],
                  /* g */rgb[/* g */1],
                  /* b */rgb[/* b */2],
                  /* a */Caml_format.caml_float_of_string(style.strokeOpacity)
                ]]);
    } else {
      return /* None */0;
    }
  }
}

function setStrokeColor(color, t) {
  var style = t[/* elem */1].style;
  if (typeof color === "number") {
    style.stroke = (null);
    return style.strokeOpacity = (null);
  } else if (color.tag) {
    return style.stroke = Parsers.genColor(color);
  } else {
    return style.strokeOpacity = Pervasives.string_of_float(color[0][/* a */3]);
  }
}

function getStyle(prim) {
  return prim.style;
}

exports.getAttr            = getAttr;
exports.setAttr            = setAttr;
exports.changeAttr         = changeAttr;
exports.deleteAttr         = deleteAttr;
exports.move               = move;
exports.getBBox            = getBBox;
exports.getRootLeftTop     = getRootLeftTop;
exports.getRootRightBottom = getRootRightBottom;
exports.getRootCenter      = getRootCenter;
exports.getLeftTop         = getLeftTop;
exports.setLeftTop         = setLeftTop;
exports.getRightBottom     = getRightBottom;
exports.getCenter          = getCenter;
exports.setCenter          = setCenter;
exports.zoom               = zoom;
exports.getSize            = getSize;
exports.setSize            = setSize;
exports.getFillColor       = getFillColor;
exports.setFillColor       = setFillColor;
exports.getStrokeColor     = getStrokeColor;
exports.setStrokeColor     = setStrokeColor;
exports.getStyle           = getStyle;
/* Natives Not a pure module */