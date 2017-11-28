// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

var List                    = require("bs-platform/lib/js/list.js");
var Box$BsSvgAttachment     = require("./box.bs.js");
var Svg$BsSvgAttachment     = require("./svg.bs.js");
var Vec2$BsSvgAttachment    = require("./vec2.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function makeBox(elems) {
  if (elems) {
    var _elems = elems[1];
    var _acc = Box$BsSvgAttachment.getBBox(elems[0]);
    while(true) {
      var acc = _acc;
      var elems$1 = _elems;
      if (elems$1) {
        _acc = Box$BsSvgAttachment.merge(acc, Box$BsSvgAttachment.getBBox(elems$1[0]));
        _elems = elems$1[1];
        continue ;
        
      } else {
        return acc;
      }
    };
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function getLeftTop(elems) {
  return makeBox(elems)[/* leftTop */0];
}

function setLeftTop(vec2, elems) {
  var delta = Vec2$BsSvgAttachment.$neg$caret(vec2, makeBox(elems)[/* leftTop */0]);
  List.map((function (e) {
          return Svg$BsSvgAttachment.move(delta, e);
        }), elems);
  return /* () */0;
}

function getRightBottom(elems) {
  return makeBox(elems)[/* rightBottom */1];
}

function setRightBottom(vec2, elems) {
  var delta = Vec2$BsSvgAttachment.$neg$caret(vec2, makeBox(elems)[/* rightBottom */1]);
  List.map((function (e) {
          return Svg$BsSvgAttachment.move(delta, e);
        }), elems);
  return /* () */0;
}

function getCenter(elems) {
  var box = makeBox(elems);
  return Vec2$BsSvgAttachment.$slash$caret(Vec2$BsSvgAttachment.$plus$caret(box[/* leftTop */0], box[/* rightBottom */1]), /* float array */[
              2.0,
              2.0
            ]);
}

function setCenter(vec2, elems) {
  var delta = Vec2$BsSvgAttachment.$neg$caret(vec2, getCenter(elems));
  List.map((function (e) {
          return Svg$BsSvgAttachment.move(delta, e);
        }), elems);
  return /* () */0;
}

function zoom(ratio, elems) {
  var center = getCenter(elems);
  return List.map((function (e) {
                Svg$BsSvgAttachment.zoom(ratio, e);
                var v = Svg$BsSvgAttachment.getCenter(e);
                Svg$BsSvgAttachment.setCenter(Vec2$BsSvgAttachment.$plus$caret(Vec2$BsSvgAttachment.$star$caret(v, ratio), Vec2$BsSvgAttachment.$star$caret(Vec2$BsSvgAttachment.$neg$caret(/* float array */[
                                  1.0,
                                  1.0
                                ], ratio), center)), e);
                return /* () */0;
              }), elems);
}

function getSize(elems) {
  var box = makeBox(elems);
  return Vec2$BsSvgAttachment.$neg$caret(box[/* rightBottom */1], box[/* leftTop */0]);
}

function setSize(vec2, elems) {
  var ratio = Vec2$BsSvgAttachment.$slash$caret(vec2, getSize(elems));
  return zoom(ratio, elems);
}

exports.makeBox        = makeBox;
exports.getLeftTop     = getLeftTop;
exports.setLeftTop     = setLeftTop;
exports.getRightBottom = getRightBottom;
exports.setRightBottom = setRightBottom;
exports.getCenter      = getCenter;
exports.setCenter      = setCenter;
exports.zoom           = zoom;
exports.getSize        = getSize;
exports.setSize        = setSize;
/* Box-BsSvgAttachment Not a pure module */