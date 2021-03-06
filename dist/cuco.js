(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cuco", [], factory);
	else if(typeof exports === 'object')
		exports["cuco"] = factory();
	else
		root["cuco"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var curry = function curry(fn) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return args.length >= fn.length ? fn.apply(null, args) : function internal() {
	      for (var _len2 = arguments.length, args1 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args1[_key2] = arguments[_key2];
	      }
	
	      args = args.concat(args1);
	      return args.length >= fn.length ? fn.apply(null, args) : internal;
	    };
	  };
	};
	
	var compose = function compose() {
	  for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    fns[_key3] = arguments[_key3];
	  }
	
	  return function () {
	    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	      args[_key4] = arguments[_key4];
	    }
	
	    return fns.reduceRight(function (previous, fn) {
	      return fn.apply(null, [].concat(previous));
	    }, args);
	  };
	};
	
	var composeP = function composeP() {
	  for (var _len5 = arguments.length, fns = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    fns[_key5] = arguments[_key5];
	  }
	
	  return function () {
	    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }
	
	    return fns.reduceRight(function (previous, fn, idx) {
	      return idx === fns.length - 1 ? fn.apply(null, previous) : previous.then(fn);
	    }, args);
	  };
	};
	
	var debounce = function debounce(fn, wait) {
	  var lastRequest = void 0;
	  var timer = void 0;
	
	  return function () {
	    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      args[_key7] = arguments[_key7];
	    }
	
	    lastRequest = Date.now();
	
	    var onTimeout = function onTimeout() {
	      var elapsed = Date.now() - lastRequest;
	
	      if (elapsed < wait) {
	        timer = setTimeout(onTimeout, wait - elapsed);
	      } else {
	        timer = null;
	        fn.apply(null, args);
	      }
	    };
	
	    if (!timer) {
	      timer = setTimeout(onTimeout, wait);
	    }
	  };
	};
	
	var throttle = function throttle(fn, wait) {
	  var initial = void 0;
	  var timer = void 0;
	
	  return function () {
	    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	      args[_key8] = arguments[_key8];
	    }
	
	    if (!initial) {
	      fn.apply(null, args);
	      initial = true;
	    } else if (!timer) {
	      timer = setTimeout(function () {
	        fn.apply(null, args);
	        timer = null;
	      }, wait);
	    }
	  };
	};
	
	exports.default = {
	  curry: curry,
	  compose: compose,
	  composeP: composeP,
	  debounce: debounce,
	  throttle: throttle
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cuco.js.map