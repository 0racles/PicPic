/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var functionReflections = __webpack_require__(117);
var getSet = __webpack_require__(43);
var observe = __webpack_require__(118);
var shape = __webpack_require__(44);
var type = __webpack_require__(29);
var getName = __webpack_require__(119);
var namespace = __webpack_require__(2);

var reflect = {};
[
	functionReflections,
	getSet,
	observe,
	shape,
	type,
	getName
].forEach(function(reflections){
	for(var prop in reflections) {
		reflect[prop] = reflections[prop];
		//!steal-remove-start
		if(typeof reflections[prop] === "function") {
			var propDescriptor = Object.getOwnPropertyDescriptor(reflections[prop], 'name');
			if (!propDescriptor || propDescriptor.writable && propDescriptor.configurable) {
				Object.defineProperty(reflections[prop],"name",{
					value: "canReflect."+prop
				});
			}
		}
		//!steal-remove-end
	}
});

__webpack_require__(120);
__webpack_require__(121);

module.exports = namespace.Reflect = reflect;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var namespace = __webpack_require__(2);

var CanSymbol;
if(typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
	CanSymbol = Symbol;
} else {

	var symbolNum = 0;
	CanSymbol = function CanSymbolPolyfill(description){
		var symbolValue = "@@symbol"+(symbolNum++)+(description);

		var symbol = {}; // make it object type

		Object.defineProperties(symbol, {
			toString: {
				value: function(){
					return symbolValue;
				}
			}
		});

		return symbol;
	};

	var descriptionToSymbol = {};
	var symbolToDescription = {};

	/**
	 * @function can-symbol.for for
	 * @parent  can-symbol/methods
	 * @description  Get a symbol based on a known string identifier, or create it if it doesn't exist.
	 *
	 * @signature `canSymbol.for(String)`
	 *
	 * @param { String } description  The string value of the symbol
	 * @return { CanSymbol } The globally unique and consistent symbol with the given string value.
	 */
	CanSymbol.for = function(description){
		var symbol = descriptionToSymbol[description];
		if(!symbol) {
			symbol = descriptionToSymbol[description] = CanSymbol(description);
			symbolToDescription[symbol] = description;
		}
		return symbol;
	};
	/**
	 * @function can-symbol.keyFor keyFor
	 * @parent  can-symbol
	 * @description  Get the description for a symbol.
	 *
	 * @signature `canSymbol.keyFor(CanSymbol)`
	 *
	 * @param { String } description  The string value of the symbol
	 * @return { CanSymbol } The globally unique and consistent symbol with the given string value.
	 */
	CanSymbol.keyFor = function(symbol) {
		return symbolToDescription[symbol];
	};
	["hasInstance","isConcatSpreadable",
		"iterator","match","prototype","replace","search","species","split",
	"toPrimitive","toStringTag","unscopables"].forEach(function(name){
		CanSymbol[name] = CanSymbol("Symbol."+name);
	});
}

// Generate can. symbols.
[
	// ======= Type detection ==========
	"isMapLike",
	"isListLike",
	"isValueLike",
	"isFunctionLike",
	// ======= Shape detection =========
	"getOwnKeys",
	"getOwnKeyDescriptor",
	"proto",
	// optional
	"getOwnEnumerableKeys",
	"hasOwnKey",
	"size",
	"getName",
	"getIdentity",

	// shape manipulation
	"assignDeep",
	"updateDeep",

	// ======= GET / SET
	"getValue",
	"setValue",
	"getKeyValue",
	"setKeyValue",
	"updateValues",
	"addValue",
	"removeValues",
	// ======= Call =========
	"apply",
	"new",
	// ======= Observe =========
	"onValue",
	"offValue",
	"onKeyValue",
	"offKeyValue",
	"getKeyDependencies",
	"getValueDependencies",
	"keyHasDependencies",
	"valueHasDependencies",
	"onKeys",
	"onKeysAdded",
	"onKeysRemoved",
	"onPatches"
	].forEach(function(name){
	CanSymbol.for("can."+name);
});

module.exports = namespace.Symbol = CanSymbol;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/assign/assign assign
 * @parent deprecated
 * @description Deprecated. Use [can-assign] instead.
 */

 //!steal-remove-start
//  canDev.warn('js/assign/assign is deprecated; please use can-assign instead: https://github.com/canjs/can-assign');
 //!steal-remove-end

module.exports = __webpack_require__(58);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* global setTimeout, require */
// # can-observation - nice
//
// This module:
//
// Exports a function that calls an arbitrary function and binds to any observables that
// function reads. When any of those observables change, a callback function is called.
//
// And ...
//
// Adds two main methods to can:
//
// - can.__observe - All other observes call this method to be visible to computed functions.
// - can.__notObserve - Returns a function that can not be observed.
__webpack_require__(11);

var canEvent = __webpack_require__(11);
var canBatch = __webpack_require__(12);
var assign = __webpack_require__(3);
var isEmptyObject = __webpack_require__(16);
var namespace = __webpack_require__(2);
var canLog = __webpack_require__(46);
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);
var CID = __webpack_require__(7);
var CIDMap = __webpack_require__(34);
var CIDSet = __webpack_require__(48);

/**
 * @module {constructor} can-observation
 * @parent can-observables
 * @collection can-infrastructure
 * @group can-observation.prototype prototype
 * @group can-observation.static static
 * @group can-observation.types types
 * @package ./package.json
 *
 * Provides a mechanism to notify when an observable has been read and a
 * way to observe those reads called within a given function.
 *
 * @signature `new Observation(func, context, compute)`
 *
 * Creates an observation of a given function called with `this` as
 * a given context. Calls back `compute` when the return value of `func` changes.
 *
 * @param {function} func The function whose value is being observed.
 * @param {*} context What `this` should be when `func` is called.
 * @param {function(*,*,Number)|can-compute} updated(newValue, oldValue, batchNum) A function to call when `func`'s return value changes.
 *
 * @body
 *
 * ## Use
 *
 * Instances of `Observation` are rarely created directly.  Instead, use [can-compute]'s more friendly API to
 * observe when a function's value changes. [can-compute] uses `can-observation` internally.
 *
 * `Observation`'s static methods like: [can-observation.add], [can-observation.ignore], and [can-observation.trap]
 * are used more commonly to control which observable events a compute will listen to.
 *
 * To use `can-observation` directly, create something observable (supports `addEventListener`) and
 * calls [can-observation.add] like:
 *
 * ```js
 * var Observation = require("can-observation");
 * var assign = require("can-util/js/assign/assign");
 * var canEvent = require("can-event");
 *
 * var me = assign({}, canEvent);
 *
 * var name = "Justin";
 * Object.defineProperty(me,"name",{
 *   get: function(){
 *     Observation.add(this,"name");
 *     return name;
 *   },
 *   set: function(newVal) {
 *     var oldVal = name;
 *     name = newVal;
 *     this.dispatch("name", newVal, oldVal);
 *   }
 * })
 * ```
 *
 * Next, create an observation instance with a function that reads the observable value:
 *
 * ```js
 * var observation = new Observation(function(){
 *   return "Hello "+me.name;
 * }, null, function(newVal, oldVal, batchNum){
 *   console.log(newVal);
 * })
 * ```
 *
 * Finally, call `observation.start()` to start listening and be notified of changes:
 *
 * ```js
 * observation.start();
 * observation.value   //-> "Hello Justin";
 * me.name = "Ramiya"; // console.logs -> "Hello Ramiya"
 * ```
 */



function Observation(func, context, compute){
	this.newObserved = {};
	this.oldObserved = null;
	this.func = func;
	this.context = context;
	this.compute = compute && (compute.updater || ("isObservable" in compute)) ? compute : {updater: compute};
	this.isObservable = typeof compute === "object" ? compute.isObservable : true;
	var observation = this;
	this.onDependencyChange = function(value, legacyValue){
		observation.dependencyChange(this, value, legacyValue);
	};
	this.ignore = 0;
	this.needsUpdate = false;
	this.handlers = null;
	CID(this);
}

// ### observationStack
//
// This is the stack of all `observation` objects that are the result of
// recursive `getValueAndBind` calls.
// `getValueAndBind` can indirectly call itself anytime a compute reads another
// compute.
//
// An `observation` entry looks like:
//
//     {
//       observed: {
//         "map1|first": {obj: map, event: "first"},
//         "map1|last" : {obj: map, event: "last"}
//       },
//       names: "map1|firstmap1|last"
//     }
//
// Where:
// - `observed` is a map of `"cid|event"` to the observable and event.
//   We use keys like `"cid|event"` to quickly identify if we have already observed this observable.
// - `names` is all the keys so we can quickly tell if two observation objects are the same.
var observationStack = [];
// expose the obseravation stack
Observation.observationStack = observationStack;

var remaining = {updates: 0, notifications: 0};
// expose the remaining state
Observation.remaining = remaining;

assign(Observation.prototype,{
	// something is reading the value of this compute
	get: function(){

		// If an external observation is tracking observables and
		// this compute can be listened to by "function" based computes ....
		// This doesn't happen with observations within computes
		if( this.isObservable && Observation.isRecording() ) {


			// ... tell the tracking compute to listen to change on this observation.
			Observation.add(this);
			// ... if we are not bound, we should bind so that
			// we don't have to re-read to get the value of this compute.
			if (!this.bound) {
				Observation.temporarilyBind(this);
			}

		}


		if(this.bound === true) {
			// Flush events so this compute should have been notified.
			// But we want not only update
			canEvent.flush();
			// we've already got a value.  However, it might be possible that
			// something else is going to read this that has a lower "depth".
			// We might be updating, so we want to make sure that before we give
			// the outer compute a value, we've had a change to update.;
			if(remaining.updates > 0) {
				Observation.updateChildrenAndSelf(this);
			}


			return this.value;
		} else {
			return this.func.call(this.context);
		}
	},
	getPrimaryDepth: function() {
		return this.compute._primaryDepth || 0;
	},
	addEdge: function(objEv){
		if(objEv.event === "undefined") {
			canReflect.onValue(objEv.obj, this.onDependencyChange);
		} else {
			canReflect.onKeyValue(objEv.obj, objEv.event, this.onDependencyChange);
		}
	},
	removeEdge: function(objEv){
		if(objEv.event === "undefined") {
			canReflect.offValue(objEv.obj, this.onDependencyChange);
		} else {
			canReflect.offKeyValue(objEv.obj, objEv.event, this.onDependencyChange);
		}
	},
	dependencyChange: function(){
		if(this.bound === true) {
			// Only need to register once per batchNum
			if(canBatch.batchNum === undefined || canBatch.batchNum !== this.batchNum) {
				Observation.registerUpdate(this, canBatch.batchNum);
				this.batchNum = canBatch.batchNum;
			}
		}
	},
	onDependencyChange: function(value){
		this.dependencyChange(value);
	},
	update: function(batchNum){
		if(this.needsUpdate === true) {
			remaining.updates--;
		}
		this.needsUpdate = false;
		if(this.bound === true) {
			// Keep the old value.
			var oldValue = this.value;
			this.oldValue = null;
			// Get the new value and register this event handler to any new observables.
			this.start();
			if(oldValue !== this.value) {
				this.compute.updater(this.value, oldValue, batchNum);
				return true;
			}
		}
	},
	getValueAndBind: function() {
		canLog.warn("can-observation: call start instead of getValueAndBind");
		return this.start();
	},
	// ## getValueAndBind
	// Calls `func` with "this" as `context` and binds to any observables that
	// `func` reads. When any of those observables change, `onchanged` is called.
	// `oldObservation` is A map of observable / event pairs this function used to be listening to.
	// Returns the `newInfo` set of listeners and the value `func` returned.
	/**
	 * @function can-observation.prototype.start start
	 * @parent can-observation.prototype prototype
	 *
	 * @signature `observation.start()`
	 *
	 * Starts observing changes and adds event listeners. [can-observation.prototype.value] will
	 * be available.
	 *
	 */
	start: function(){
		this.bound = true;
		this.oldObserved = this.newObserved || {};
		this.ignore = 0;
		this.newObserved = {};

		// Add this function call's observation to the stack,
		// runs the function, pops off the observation, and returns it.

		observationStack.push(this);
		this.value = this.func.call(this.context);
		observationStack.pop();
		this.updateBindings();
	},
	// ### updateBindings
	// Unbinds everything in `oldObserved`.
	updateBindings: function(){
		var newObserved = this.newObserved,
			oldObserved = this.oldObserved,
			name,
			obEv;

		for (name in newObserved) {
			obEv = newObserved[name];
			if(!oldObserved[name]) {
				this.addEdge(obEv);
			} else {
				oldObserved[name] = undefined;
			}
		}
		for (name in oldObserved) {
			obEv = oldObserved[name];
			if(obEv !== undefined) {
				this.removeEdge(obEv);
			}
		}
	},
	teardown: function(){
		canLog.warn("can-observation: call stop instead of teardown");
		return this.stop();
	},
	/**
	 * @function can-observation.prototype.stop stop
	 * @parent can-observation.prototype prototype
	 *
	 * @signature `observation.stop()`
	 *
	 * Stops observing changes and removes all event listeners.
	 *
	 */
	stop: function(){
		// track this because events can be in the queue.
		this.bound = false;
		for (var name in this.newObserved) {
			var ob = this.newObserved[name];
			this.removeEdge(ob);
		}
		this.newObserved = {};
	}
	/**
	 * @property {*} can-observation.prototype.value
	 * @hide
	 *
	 * The return value of the function once [can-observation.prototype.start] is called.
	 *
	 */
});

/**
 * @typedef {{}} can-observation.observed Observed
 * @parent can-observation.types
 *
 * @description
 *
 * An object representing an observation.
 *
 * ```js
 * { "obj": map, "event": "prop1" }
 * ```
 *
 * @option {Object} obj The observable object
 * @option {String} event The event, or more likely property, that is being observed.
 */


var updateOrder = [],
	// the min registered primary depth, this is also the next to be executed.
	curPrimaryDepth = Infinity,
	// the max registered primary depth
	maxPrimaryDepth = 0,
	currentBatchNum,
	isUpdating = false;


var updateUpdateOrder = function(observation){
	var primaryDepth = observation.getPrimaryDepth();

	if(primaryDepth < curPrimaryDepth) {
		curPrimaryDepth = primaryDepth;
	}
	if(primaryDepth > maxPrimaryDepth) {
		maxPrimaryDepth = primaryDepth;
	}

	var primary = updateOrder[primaryDepth] ||
		(updateOrder[primaryDepth] = []);


	return primary;
};

Observation.registerUpdate = function(observation, batchNum){
	// mark as needing an update
	if( observation.needsUpdate === true ) {
		return;
	}
	remaining.updates++;
	observation.needsUpdate = true;

	var objs = updateUpdateOrder(observation);

	objs.push(observation);
};



// This picks the observation with the smallest "depth" and
// calls update on it (`currentObservation`).
// If the `currentObservation` reads another observation with a higher depth (`deeperObservation`),
// the `deeperObservation` will be updated (via `updateUntil`).
// If the `currentObservation` reads another observation with a higher primary depth (`deeperPrimaryObservation`),
// the `deeperPrimaryObservation` will be updated, but not have its callback called
var afterCallbacks = [];
/* jshint maxdepth:7*/
Observation.updateAndNotify = function(ev, batchNum){
	currentBatchNum = batchNum;
	if(isUpdating === true){
		// only allow access at one time to this method.
		// This is because when calling .update ... that compute should be only able
		// to cause updates to other computes it directly reads.  It's possible that
		// reading other computes could call `updateAndNotify` again.
		// If we didn't return, it's possible that other computes could update unrelated to the
		// execution flow of the current compute being updated.  This would be very unexpected.
		return;
	}
	isUpdating = true;
	while(true) {
		if( curPrimaryDepth <= maxPrimaryDepth ) {
			var primary = updateOrder[curPrimaryDepth];
			var lastUpdate = primary && primary.pop();
			if(lastUpdate !== undefined) {
				lastUpdate.update(currentBatchNum);
			} else {
				curPrimaryDepth++;
			}
		} else {
			updateOrder = [];
			curPrimaryDepth = Infinity;
			maxPrimaryDepth = 0;
			isUpdating = false;
			var afterCB = afterCallbacks;
			afterCallbacks = [];
			afterCB.forEach(function(cb){
				cb();
			});
			return;
		}
	}
};
canEvent.addEventListener.call(canBatch,"batchEnd", Observation.updateAndNotify);

Observation.afterUpdateAndNotify = function(callback){
	canBatch.after(function(){
		// here we know that the events have been fired, everything should
		// be notified. Now we have to wait until all computes have
		// finished firing.
		if(isUpdating === true) {
			afterCallbacks.push(callback);
		} else {
			callback();
		}
	});
};


// This is going to recursively check if there's any child compute
// that .needsUpdate.
// If there is, we'll update every parent on the way to ourselves.
Observation.updateChildrenAndSelf = function(observation){
	// check if there's children that .needsUpdate
	if(observation.needsUpdate === true) {
		return Observation.unregisterAndUpdate(observation);
	}
	var childHasChanged = false;
	for(var prop in observation.newObserved) {
		if(observation.newObserved[prop].obj.observation) {
			if( Observation.updateChildrenAndSelf(observation.newObserved[prop].obj.observation) ) {
				childHasChanged = true;
			}
		}
	}
	if(childHasChanged === true) {
		return observation.update(currentBatchNum);
	}
};
// the problem with updateTo(observation)
// is that that the read might never change
// but the reader might be changing, and wont update itself, but something
// else will
Observation.unregisterAndUpdate = function(observation){
	var primaryDepth = observation.getPrimaryDepth();
	var primary = updateOrder[primaryDepth];
	if(primary !== undefined) {

		var index = primary.indexOf(observation);
		if(index !== -1) {
			primary.splice(index,1);
		}

	}
	return observation.update(currentBatchNum);
};



/**
 * @function can-observation.add add
 * @parent can-observation.static
 *
 * Signals that an object's property is being observed, so that any functions
 * that are recording observations will see that this object is a dependency.
 *
 * @signature `Observation.add(obj, event)`
 *
 * Signals that an event should be observed. Adds the observable being read to
 * the top of the stack.
 *
 * ```js
 * Observation.add(obj, "prop1");
 * ```
 *
 * @param {Object} obj An observable object which is being observed.
 * @param {String} event The name of the event (or property) that is being observed.
 *
 */
Observation.add = function (obj, event) {
	var top = observationStack[observationStack.length-1];
	if (top !== undefined && !top.ignore) {
		var evStr = event + "",
			name = obj._cid + '|' + evStr;

		if(top.traps !== undefined) {
			top.traps.push({obj: obj, event: evStr, name: name});
		}
		else {
			top.newObserved[name] = {
				obj: obj,
				event: evStr
			};
		}
	}
};

/**
 * @function can-observation.addAll addAll
 * @parent can-observation.static
 * @signature `Observation.addAll(observes)`
 *
 * The same as `Observation.add` but takes an array of [can-observation.observed] objects.
 * This will most often by used in coordination with [can-observation.trap]:
 *
 * ```js
 * var untrap = Observation.trap();
 *
 * Observation.add(obj, "prop3");
 *
 * var traps = untrap();
 * Oservation.addAll(traps);
 * ```
 *
 * @param {Array<can-observation.observed>} observes An array of [can-observation.observed]s.
 */
Observation.addAll = function(observes){
	// a bit more optimized so we don't have to repeat everything in
	// Observation.add
	var top = observationStack[observationStack.length-1];
	if (top !== undefined) {
		if(top.traps !== undefined) {
			top.traps.push.apply(top.traps, observes);
		} else {
			for(var i =0, len = observes.length; i < len; i++) {
				var trap = observes[i],
					name = trap.name;

				if(top.newObserved[name] === undefined) {
					top.newObserved[name] = trap;
				}
			}
		}

	}
};

/**
 * @function can-observation.ignore ignore
 * @parent can-observation.static
 * @signature `Observation.ignore(fn)`
 *
 * Creates a function that, when called, will prevent observations from
 * being applied.
 *
 * ```js
 * var fn = Observation.ignore(function(){
 *   // This will be ignored
 *   Observation.add(obj, "prop1");
 * });
 *
 * fn();
 * Observation.trapCount(); // -> 0
 * ```
 *
 * @param {Function} fn Any function that contains potential calls to
 * [Observation.add].
 *
 * @return {Function} A function that is free of observation side-effects.
 */
Observation.ignore = function(fn){
	return function(){
		if (observationStack.length > 0) {
			var top = observationStack[observationStack.length-1];
			top.ignore++;
			var res = fn.apply(this, arguments);
			top.ignore--;
			return res;
		} else {
			return fn.apply(this, arguments);
		}
	};
};


/**
 * @function can-observation.trap trap
 * @parent can-observation.static
 * @signature `Observation.trap()`
 *
 * Trap all observations until the `untrap` function is called. The state of
 * traps prior to `Observation.trap()` will be restored when `untrap()` is called.
 *
 * ```js
 * var untrap = Observation.trap();
 *
 * Observation.add(obj, "prop1");
 *
 * var traps = untrap();
 * console.log(traps[0].obj === obj); // -> true
 * ```
 *
 * @return {can-observation.getTrapped} A function to get the trapped observations.
 */
Observation.trap = function(){
	if (observationStack.length > 0) {
		var top = observationStack[observationStack.length-1];
		var oldTraps = top.traps;
		var traps = top.traps = [];
		return function(){
			top.traps = oldTraps;
			return traps;
		};
	} else {
		return function(){return [];};
	}
};
/**
 * @typedef {function} can-observation.getTrapped getTrapped
 * @parent can-observation.types
 *
 * @signature `getTrapped()`
 *
 *   Returns the trapped observables captured by [can-observation.trap].
 *
 *   @return {Array<can-observation.observed>}
 */

Observation.trapsCount = function(){
	if (observationStack.length > 0) {
		var top = observationStack[observationStack.length-1];
		return top.traps.length;
	} else {
		return 0;
	}
};
// sets an array of observable notifications on the current top of the observe stack.

/**
 * @function can-observation.isRecording isRecording
 * @parent can-observation.static
 * @signature `Observation.isRecording()`
 *
 * Returns if some function is in the process of recording observes.
 *
 * @return {Boolean} True if a function is in the process of recording observes.
 */
Observation.isRecording = function(){
	var len = observationStack.length;
	var last = len > 0 && observationStack[len-1];
	return last && (last.ignore === 0);
};


// temporarily bind

var noop = function(){};
// A list of temporarily bound computes
var observables;
// Unbinds all temporarily bound computes.
var unbindComputes = function () {
	for (var i = 0, len = observables.length; i < len; i++) {
		canReflect.offValue(observables[i], noop);
	}
	observables = null;
};

// ### temporarilyBind
// Binds computes for a moment to cache their value and prevent re-calculating it.
Observation.temporarilyBind = function (compute) {
	var computeInstance = compute.computeInstance || compute;
	canReflect.onValue(computeInstance, noop);
	if (!observables) {
		observables = [];
		setTimeout(unbindComputes, 10);
	}
	observables.push(computeInstance);
};


// can-reflect bindings ===========

var callHandlers = function(newValue){
	this.handlers.forEach(function(handler){
		handler.call(this.compute, newValue);
	}, this);
};

canReflect.set(Observation.prototype, canSymbol.for("can.onValue"), function(handler){
	if(!this.handlers) {
		this.handlers = [];
		//!steal-remove-start
		if(this.compute.updater) {
			canLog.warn("can-observation bound to with an existing handler");
		}
		//!steal-remove-end
		this.compute.updater = callHandlers.bind(this);
	}

	if(!this.handlers.length) {
		this.start();
	}

	this.handlers.push(handler);
});

canReflect.set(Observation.prototype, canSymbol.for("can.offValue"), function(handler){
	if (this.handlers) {
		var index = this.handlers.indexOf(handler);
		this.handlers.splice(index, 1);
		if(this.handlers.length === 0) {
			this.stop();
		}
	}
});

canReflect.set(Observation.prototype, canSymbol.for("can.getValue"), Observation.prototype.get);

Observation.prototype.hasDependencies = function(){
	return this.bound ? !isEmptyObject(this.newObserved) : undefined;
};
canReflect.set(Observation.prototype, canSymbol.for("can.isValueLike"), true);
canReflect.set(Observation.prototype, canSymbol.for("can.isMapLike"), false);
canReflect.set(Observation.prototype, canSymbol.for("can.isListLike"), false);

canReflect.set(Observation.prototype, canSymbol.for("can.valueHasDependencies"), Observation.prototype.hasDependencies);

canReflect.set(Observation.prototype, canSymbol.for("can.getValueDependencies"), function() {
	var rets;
	if(this.bound === true) {
		rets = {};
		canReflect.eachKey(this.newObserved || {}, function(dep) {
			if(canReflect.isValueLike(dep.obj)) {
				rets.valueDependencies = rets.valueDependencies || new CIDSet();
				rets.valueDependencies.add(dep.obj);
			} else {
				rets.keyDependencies = rets.keyDependencies || new CIDMap();
				if(rets.keyDependencies.get(dep.obj)) {
					rets.keyDependencies.get(dep.obj).push(dep.event);
				} else {
					rets.keyDependencies.set(dep.obj, [dep.event]);
				}
			}
		});
	}
	return rets;
});

if (namespace.Observation) {
	throw new Error("You can't have two versions of can-observation, check your dependencies");
} else {
	module.exports = namespace.Observation = Observation;
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canLog = __webpack_require__(113);

/**
 * @module {{}} can-log/dev dev
 * @parent can-log
 * @hide
 * 
 * Utilities for logging development-mode messages. Use this module for
 * anything that should be shown to the user during development but isn't
 * needed in production. In production these functions become noops.
 */
module.exports = {
	warnTimeout: 5000,
	logLevel: 0,
	/**
	 * @function can-log/dev.stringify stringify
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * JSON stringifies a value, but unlike JSON, will output properties with
	 * a value of `undefined` (e.g. `{ "prop": undefined }`, not `{}`).
	 *
	 * ```
	 * var dev = require('can-log/dev');
	 * var query = { where: undefined };
	 * 
	 * dev.warn('No records found: ' + dev.stringify(query));
	 * ```
	 *
	 * @signature `dev.stringify(value)`
	 * @param {Any} value A value to stringify.
	 * @return {String} A stringified representation of the passed in value.
	 */
	stringify: function(value) {
		var flagUndefined = function flagUndefined(key, value) {
			return value === undefined ?
				 "/* void(undefined) */" : value;
		};
		
		return JSON.stringify(value, flagUndefined, "  ").replace(
			/"\/\* void\(undefined\) \*\/"/g, "undefined");
	},
	/**
	 * @function can-log/dev.warn warn
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * Adds a warning message to the console.
	 *
	 * ```
	 * var dev = require('can-log/dev');
	 * 
	 * dev.warn("something evil");
	 * ```
	 *
	 * @signature `dev.warn(msg)`
	 * @param {String} msg The warning message.
	 */
	warn: function() {
		//!steal-remove-start
		canLog.warn.apply(this, arguments);
		//!steal-remove-end
	},
	/**
	 * @function can-log/dev.log log
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * Adds a message to the console.
	 *
	 * ```
	 * var dev = require('can-log/dev');
	 * 
	 * dev.log("hi");
	 * ```
	 *
	 * @signature `dev.log(msg)`
	 * @param {String} msg The message.
	 */
	log: function() {
		//!steal-remove-start
		canLog.log.apply(this, arguments);
		//!steal-remove-end
	},
	/**
	 * @function can-log/dev.error error
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * Adds an error message to the console.
	 *
	 * ```
	 * var dev = require("can-log/dev");
	 * 
	 * dev.error(new Error("Oh no!"));
	 * ```
	 *
	 * @signature `dev.error(err)`
	 * @param {String|Error} err The error to be logged.
	 */
	error: function() {
		//!steal-remove-start
		canLog.error.apply(this, arguments);
		//!steal-remove-end
	},
	_logger: canLog._logger
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* jshint maxdepth:7*/
var isArrayLike = __webpack_require__(40);
var has = Object.prototype.hasOwnProperty;
var isIterable = __webpack_require__(59);
var canSymbol = __webpack_require__(1);

function each(elements, callback, context) {
	var i = 0,
		key,
		len,
		item;
	if (elements) {
		if ( isArrayLike(elements) ) {

			for (len = elements.length; i < len; i++) {
				item = elements[i];
				if (callback.call(context || item, item, i, elements) === false) {
					break;
				}
			}
		}
		// Works in anything that implements Symbol.iterator
		else if(isIterable(elements)) {
			var iter = elements[canSymbol.iterator || canSymbol.for("iterator")]();
			var res, value;

			while(!(res = iter.next()).done) {
				value = res.value;
				callback.call(context || elements, Array.isArray(value) ?
											value[1] : value, value[0]);
			}
		}
		 else if (typeof elements === "object") {
			for (key in elements) {
				if (has.call(elements, key) &&
						callback.call(context || elements[key],
													elements[key], key, elements) === false) {
					break;
				}
			}
		}
	}
	return elements;
}

module.exports = each;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var namespace = __webpack_require__(2);
/**
 * @module {function} can-cid
 * @parent can-typed-data
 * @collection can-infrastructure
 * @package ./package.json
 * @description Utility for getting a unique identifier for an object.
 * @signature `cid(object, optionalObjectType)`
 *
 * Get a unique identifier for the object, optionally prefixed by a type name.
 *
 * Once set, the unique identifier does not change, even if the type name
 * changes on subsequent calls.
 *
 * ```js
 * var cid = require("can-cid");
 * var x = {};
 * var y = {};
 *
 * console.log(cid(x, "demo")); // -> "demo1"
 * console.log(cid(x, "prod")); // -> "demo1"
 * console.log(cid(y));         // -> "2"
 * ```
 *
 * @param {Object} object The object to uniquely identify.
 * @param {String} name   An optional type name with which to prefix the identifier
 *
 * @return {String} Returns the unique identifier
 */
var _cid = 0;
// DOM nodes shouldn't all use the same property
var domExpando = "can" + new Date();
var cid = function (object, name) {
	var propertyName = object.nodeName ? domExpando : "_cid";

	if (!object[propertyName]) {
		_cid++;
		object[propertyName] = (name || '') + _cid;
	}
	return object[propertyName];
};
cid.domExpando = domExpando;
cid.get = function(object){
	var type = typeof object;
	var isObject = type !== null && (type === "object" || type === "function");
	return isObject ? cid(object) : (type + ":" + object);
};

if (namespace.cid) {
	throw new Error("You can't have two versions of can-cid, check your dependencies");
} else {
	module.exports = namespace.cid = cid;
}


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);
var globals = __webpack_require__(28);

/**
 * @module {function} can-globals/document/document document
 * @parent can-globals/modules
 * 
 * Get the global [`document`](https://developer.mozilla.org/en-US/docs/Web/API/document) object for the current context.
 * 
 * @signature `DOCUMENT([newDocument])`
 * 
 * Optionally sets, and returns, the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/document) object for the context.
 * 
 * ```js
 * var documentShim = { getElementById() {...} };
 * var DOCUMENT = require('can-globals/document/document');
 * DOCUMENT(documentShim); //-> document
 * DOCUMENT().getElementById('foo');
 * ```
 *
 * @param {Object} [newDocument] An optional document-like object to set as the context's document 
 * 
 * @return {Object} The window object for this JavaScript environment.
 */
globals.define('document', function(){
	return globals.getKeyValue('global').document;
});

module.exports = globals.makeExport('document');


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint maxdepth:7*/

// # can.compute
//
// `can.compute` allows the creation of observable values in different forms.
// This module is now just a facade around [proto_compute.js](proto_compute.html).
// `proto_compute.js` provides `can.Compute` as a constructor function where this file,
// `compute.js` wraps an instance of a `can.Compute` with a function.
//
// Other files:
// - [get_value_and_bind.js](get_value_and_bind.js) provides the low-level utility for observing functions.
// - [read.js](read.html) provides a helper that read properties and values in an observable way.


__webpack_require__(11);
__webpack_require__(12);

var Compute = __webpack_require__(68);
var CID = __webpack_require__(7);
var namespace = __webpack_require__(2);
var singleReference = __webpack_require__(24);

var canReflect = __webpack_require__(43);
var canSymbol = __webpack_require__(1);
var canOnValueSymbol = canSymbol.for("can.onValue"),
	canOffValueSymbol = canSymbol.for("can.offValue"),
	canGetValue = canSymbol.for("can.getValue"),
	canSetValue = canSymbol.for("can.setValue"),
	isValueLike = canSymbol.for("can.isValueLike"),
	isMapLike = canSymbol.for("can.isMapLike"),
	isListLike = canSymbol.for("can.isListLike"),
	isFunctionLike = canSymbol.for("can.isFunctionLike"),
	canValueHasDependencies = canSymbol.for("can.valueHasDependencies"),
	canGetValueDependencies = canSymbol.for("can.getValueDependencies");

// The `can.compute` generator function.
var addEventListener = function(ev, handler){
	var compute = this;
	var translationHandler;
	if(handler){
		translationHandler = function() {
		   handler.apply(compute, arguments);
	   };
	   singleReference.set(handler, this, translationHandler);
	}
	return compute.computeInstance.addEventListener(ev, translationHandler);
};

var removeEventListener = function(ev, handler){
		var args = [];
		if (typeof ev !== 'undefined') {
			args.push(ev);
			if (typeof handler !== 'undefined') {
				args.push(singleReference.getAndDelete(handler, this));
			}
		}
		return this.computeInstance.removeEventListener.apply(this.computeInstance, args);
};
var onValue = function(handler){
		return this.computeInstance[canOnValueSymbol](handler);
	},
	offValue = function(handler){
		return this.computeInstance[canOffValueSymbol](handler);
	},
	getValue = function(){
		return this.computeInstance.get();
	},
	setValue = function(value){
		return this.computeInstance.set(value);
	},
	hasDependencies = function(){
		return this.computeInstance.hasDependencies;
	},
	getDependencies = function() {
		return this.computeInstance[canGetValueDependencies]();
	};


var COMPUTE = function (getterSetter, context, eventName, bindOnce) {

	function compute(val) {
		if(arguments.length) {
			return compute.computeInstance.set(val);
		}

		return compute.computeInstance.get();
	}
	var cid = CID(compute, 'compute');

	// Create an internal `can.Compute`.
	compute.computeInstance = new Compute(getterSetter, context, eventName, bindOnce);

	compute.handlerKey = '__handler' + cid;
	compute.on = compute.bind = compute.addEventListener = addEventListener;
	compute.off = compute.unbind = compute.removeEventListener = removeEventListener;

	compute.isComputed = compute.computeInstance.isComputed;

	compute.clone = function(ctx) {
		if(typeof getterSetter === 'function') {
			context = ctx;
		}
		return COMPUTE(getterSetter, context, ctx, bindOnce);
	};

	// forward on and off to the computeInstance as this doesn't matter
	canReflect.set(compute, canOnValueSymbol, onValue);
	canReflect.set(compute, canOffValueSymbol, offValue);
	canReflect.set(compute, canGetValue, getValue);
	canReflect.set(compute, canSetValue, setValue);
	canReflect.set(compute, isValueLike, true);
	canReflect.set(compute, isMapLike, false);
	canReflect.set(compute, isListLike, false);
	canReflect.set(compute, isFunctionLike, false);
	canReflect.set(compute, canValueHasDependencies, hasDependencies);
	canReflect.set(compute, canGetValueDependencies, getDependencies);
	return compute;
};

// ## Helpers

// ### truthy
// Wraps a compute with another compute that only changes when
// the wrapped compute's `truthiness` changes.
COMPUTE.truthy = function (compute) {
	return COMPUTE(function () {
		var res = compute();
		return !!res;
	});
};

// ### async
// A simple helper that makes an async compute a bit easier.
COMPUTE.async = function(initialValue, asyncComputer, context){
	return COMPUTE(initialValue, {
		fn: asyncComputer,
		context: context
	});
};

// ### compatability
// Setting methods that should not be around in 3.0.
COMPUTE.temporarilyBind = Compute.temporarilyBind;

module.exports = namespace.compute = COMPUTE;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// # can-event
//
// Implements a basic event system that can be used with any type of object.
// In addition to adding basic event functionality, it also provides the `can.event` object
// that can be mixed into objects and prototypes.
//
// Most of the time when this is used, it will be used with the mixin:
//
// ```
// var SomeClass = Construct("SomeClass");
// assign(SomeClass.prototype, canEvent);
// ```
var domEvents = __webpack_require__(13);
var CID = __webpack_require__(7);
var isEmptyObject = __webpack_require__(16);
var domDispatch = __webpack_require__(30);
var namespace = __webpack_require__(2);
__webpack_require__(124);
__webpack_require__(126);

function makeHandlerArgs(event, args) {
	if (typeof event === 'string') {
		event = {
			type: event
		};
	}
	var handlerArgs = [event];

	// Execute handlers listening for this event.
	if(args) {
		handlerArgs.push.apply(handlerArgs, args);
	}
	return handlerArgs;
}

function getHandlers(eventName){
	var events = this.__bindEvents;
	if (!events) {
		return;
	}
	return events[eventName];
}

// ## can.event
// Create and export the `can.event` mixin
var canEvent = {
	// First define core object-based methods

	// ## can-event.addEventListener
	//
	// Adds a basic event listener to an object.
	// This consists of storing a cache of event listeners on each object,
	// that are iterated through later when events are dispatched.
	/**
	 * @function can-event.addEventListener addEventListener
	 * @parent can-event.static
	 * @signature `obj.addEventListener(event, handler)`
	 *
	 * Add a basic event listener to an object.
	 *
	 * ```js
	 * var canEvent = require("can-event");
	 *
	 * var obj = {};
	 * Object.assign(obj, canEvent);
	 *
	 * obj.addEventListener("foo", function(){ ... });
	 * ```
	 *
	 * @param {String} event The name of the event to listen for.
	 * @param {Function} handler The handler that will be executed to handle the event.
	 * @return {Object} this
	 *
	 * @signature `canEvent.addEventListener.call(obj, event, handler)`
	 *
	 * This syntax can be used for objects that don't include the `canEvent` mixin.
	 */
	addEventListener: function (event, handler) {
		// Initialize event cache.
		var allEvents = this.__bindEvents || (this.__bindEvents = {}),
			eventList = allEvents[event] || (allEvents[event] = []);

		// Add the event
		eventList.push(handler);
		return this;
	},

	// ## can-event.removeEventListener
	//
	// Removes a basic event listener from an object.
	// This removes event handlers from the cache of listened events.
	/**
	 * @function can-event.removeEventListener removeEventListener
	 * @parent can-event.static
	 * @signature `obj.removeEventListener(event, handler)`
	 *
	 * Removes a basic event listener from an object. Don't pass arguments to remove all event listeners.
	 *
	 * @param {String} event The name of the event to remove. If not specified, all events are removed.
	 * @param {Function} handler The handler that will be removed from the event. If not specified, all handlers for the event are removed.
	 * @return {Object} this
	 *
	 * @signature `canEvent.removeEventListener.call(obj, event, handler)`
	 *
	 * This syntax can be used for objects that don't include the [can-event] mixin.
	 */
	removeEventListener: function (event, fn) {
		if (!this.__bindEvents) {
			return this;
		}

		// Remove all eventListeners if no arguments are passed
		if (!arguments.length) {
			for (var bindEvent in this.__bindEvents) {
				if (bindEvent === '_lifecycleBindings') {
					// Reset lifecycleBindings count for lifecycle events
					this.__bindEvents._lifecycleBindings = null;
				} else if (this.__bindEvents.hasOwnProperty(bindEvent)) {
					canEvent.removeEventListener.call(this, bindEvent);
				}
			}
			return this;
		}

		var handlers = this.__bindEvents[event] || [],
			i = 0,
			handler, isFunction = typeof fn === 'function';
		while (i < handlers.length) {
			handler = handlers[i];
			// Determine whether this event handler is "equivalent" to the one requested
			// Generally this requires the same event/function, but a validation function
			// can be included for extra conditions. This is used in some plugins like `can/event/namespace`.
			if ( isFunction && handler === fn || !isFunction && (handler.cid === fn || !fn)) {
				handlers.splice(i, 1); // likely not using delete for perf reasons
			} else {
				i++;
			}
		}
		return this;
	},
	// ## can-event.dispatch
	//
	// Dispatches/triggers a basic event on an object.
	/**
	 * @function can-event.dispatch dispatch
	 * @parent can-event.static
	 * @signature `obj.dispatch(event, [args])`
	 *
	 * Dispatches/triggers a basic event on an object.
	 *
	 * ```js
	 * var canEvent = require("can-event");
	 *
	 * var obj = {};
	 * Object.assign(obj, canEvent);
	 *
	 * obj.addEventListener("foo", function(){
	 *   console.log("FOO BAR!");
	 * });
	 *
	 * obj.dispatch("foo"); // Causes it to log FOO BAR
	 * ```
	 *
	 * @param {String|Object} event The event to dispatch
	 * @param {Array} [args] Additional arguments to pass to event handlers
	 * @return {Object} event The resulting event object
	 *
	 * @signature `canEvent.dispatch.call(obj, event, args)`
	 *
	 * This syntax can be used for objects that don't include the `can.event` mixin.
	 */
	dispatchSync: function (event, args) {
		var handlerArgs = makeHandlerArgs(event, args);
		var handlers = getHandlers.call(this, handlerArgs[0].type);

		if(!handlers) {
			return;
		}
		handlers = handlers.slice(0);
		for (var i = 0, len = handlers.length; i < len; i++) {
			handlers[i].apply(this, handlerArgs);
		}

		return handlerArgs[0];
	},
	// Define abstract helpers

	/**
	 * @function can-event.on on
	 * @parent can-event.static
	 * @signature `obj.on(event, handler)`
	 *
	 * Add a basic event listener to an object.
	 *
	 * This is an alias of [can-event.addEventListener addEventListener].
	 *
	 * @signature `can-event.on.call(obj, event, handler)`
	 *
	 * This syntax can be used for objects that don't include the [can-event] mixin.
	 */
	on: function(eventName, selector, handler) {
		var method = typeof selector === "string" ? "addDelegateListener" : "addEventListener";

		var listenWithDOM = domEvents.canAddEventListener.call(this);
		var eventBinder = listenWithDOM ? domEvents[method] : this[method] || canEvent[method];

		return eventBinder.apply(this, arguments);
	},

	/**
	 * @function can-event.off off
	 * @parent can-event.static
	 * @signature `obj.off(event, handler)`
	 *
	 * Removes a basic event listener from an object.
	 *
	 * This is an alias of [can-event.removeEventListener removeEventListener].
	 *
	 * @signature `canEvent.off.call(obj, event, handler)`
	 *
	 * This syntax can be used for objects that don't include the [can-event] mixin.
	 */
	off: function(eventName, selector, handler) {
		var method = typeof selector === "string" ? "removeDelegateListener" : "removeEventListener";

		var listenWithDOM = domEvents.canAddEventListener.call(this);
		var eventBinder = listenWithDOM ? domEvents[method] : this[method] || canEvent[method];

		return eventBinder.apply(this, arguments);
	},
	/**
	 * @function can-event.trigger trigger
	 * @parent can-event.static
	 * @signature `obj.trigger(event, args)`
	 *
	 * Dispatches/triggers a basic event on an object.
	 * This is an alias of [can-event.dispatch dispatch].
	 *
	 * @signature `canEvent.trigger.call(obj, event, args)`
	 *
	 * This syntax can be used for objects that don't include the [can-event] mixin.
	 */
	trigger: function(){
		var listenWithDOM = domEvents.canAddEventListener.call(this);
		var dispatch = listenWithDOM ? domDispatch : canEvent.dispatch;

		return dispatch.apply(this, arguments);
	},

	// ## can-event.one
	//
	// Adds a basic event listener that listens to an event once and only once.
	/**
	 * @function can-event.one one
	 * @parent can-event.static
	 * @signature `obj.one(event, handler)`
	 *
	 * Adds a basic event listener that listens to an event once and only once.
	 *
	 * @param {String} event The name of the event to listen for.
	 * @param {Function} handler The handler that will be executed to handle the event.
	 * @return {Object} this
	 */
	one: function(event, handler) {
		// Unbind the listener after it has been executed
		var one = function() {
			canEvent.off.call(this, event, one);
			return handler.apply(this, arguments);
		};

		// Bind the altered listener
		canEvent.on.call(this, event, one);
		return this;
	},

	// self listener methods
	// ## can-event.listenTo
	//
	// Listens to an event without know how bind is implemented.
	// The primary use for this is to listen to another's objects event while
	// tracking events on the local object (similar to namespacing).
	//
	// The API was heavily influenced by BackboneJS: http://backbonejs.org/
	/**
	 * @function can-event.listenTo listenTo
	 * @parent can-event.static
	 * @signature `obj.listenTo(other, event, handler)`
	 *
	 * Listens for an event on another object.
	 * This is similar to concepts like event namespacing, except that the namespace
	 * is the scope of the calling object.
	 *
	 * @param {Object} other The object to listen for events on.
	 * @param {String} event The name of the event to listen for.
	 * @param {Function} handler The handler that will be executed to handle the event.
	 * @return {Object} this
	 *
	 * @signature `canEvent.listenTo.call(obj, other, event, handler)`
	 *
	 * This syntax can be used for objects that don't include the [can-event] mixin.
	 */
	listenTo: function (other, event, handler) {
		// Initialize event cache
		var idedEvents = this.__listenToEvents;
		if (!idedEvents) {
			idedEvents = this.__listenToEvents = {};
		}

		// Identify the other object
		var otherId = CID(other);
		var othersEvents = idedEvents[otherId];

		// Create a local event cache
		if (!othersEvents) {
			othersEvents = idedEvents[otherId] = {
				obj: other,
				events: {}
			};
		}
		var eventsEvents = othersEvents.events[event];
		if (!eventsEvents) {
			eventsEvents = othersEvents.events[event] = [];
		}

		// Add the event, both locally and to the other object
		eventsEvents.push(handler);
		canEvent.on.call(other, event, handler);
	},
	// ## can-event.stopListening
	//
	// Stops listening for events on other objects
	/**
	 * @function can-event.stopListening stopListening
	 * @parent can-event.static
	 * @signature `obj.stopListening(other, event, handler)`
	 *
	 * Stops listening for an event on another object.
	 *
	 * @param {Object} other The object to listen for events on.
	 * @param {String} event The name of the event to listen for.
	 * @param {Function} handler The handler that will be executed to handle the event.
	 * @return {Object} this
	 *
	 * @signature `canEvent.stopListening.call(obj, other, event, handler)`
	 *
	 * This syntax can be used for objects that don't include the [can-event] mixin.
	 */
	stopListening: function (other, event, handler) {
		var idedEvents = this.__listenToEvents,
			iterIdedEvents = idedEvents,
			i = 0;
		if (!idedEvents) {
			return this;
		}
		if (other) {
			var othercid = CID(other);
			(iterIdedEvents = {})[othercid] = idedEvents[othercid];
			// you might be trying to listen to something that is not there
			if (!idedEvents[othercid]) {
				return this;
			}
		}

		// Clean up events on the other object
		for (var cid in iterIdedEvents) {
			var othersEvents = iterIdedEvents[cid],
				eventsEvents;
			other = idedEvents[cid].obj;

			// Find the cache of events
			if (!event) {
				eventsEvents = othersEvents.events;
			} else {
				(eventsEvents = {})[event] = othersEvents.events[event];
			}

			// Unbind event handlers, both locally and on the other object
			for (var eventName in eventsEvents) {
				var handlers = eventsEvents[eventName] || [];
				i = 0;
				while (i < handlers.length) {
					if (handler && handler === handlers[i] || !handler) {
						canEvent.off.call(other, eventName, handlers[i]);
						handlers.splice(i, 1);
					} else {
						i++;
					}
				}
				// no more handlers?
				if (!handlers.length) {
					delete othersEvents.events[eventName];
				}
			}
			if (isEmptyObject(othersEvents.events)) {
				delete idedEvents[cid];
			}
		}
		return this;
	}

};

// add aliases
/**
 * @function can-event.bind bind
 * @parent can-event.static
 * @signature `obj.bind(event, handler)`
 *
 * Add a basic event listener to an object.
 *
 * This is an alias of [can-event.addEventListener addEventListener].
 *
 * @signature `canEvent.bind.call(obj, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can-event] mixin.
 */
canEvent.addEvent = canEvent.bind = function(){
	// Use a wrapping function so `addEventListener`'s behavior can change.
	return canEvent.addEventListener.apply(this, arguments);
};
/**
 * @function can-event.unbind unbind
 * @parent can-event.static
 * @signature `obj.unbind(event, handler)`
 *
 * Removes a basic event listener from an object.
 *
 * This is an alias of [can-event.removeEventListener removeEventListener].
 *
 * @signature `canEvent.unbind.call(obj, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can-event] mixin.
 */
canEvent.unbind =  canEvent.removeEvent = function(){
	return canEvent.removeEventListener.apply(this, arguments);
};
/**
 * @function can-event.delegate delegate
 * @parent can-event.static
 * @signature `obj.delegate(selector, event, handler)`
 *
 * Provides a compatibility layer for adding delegate event listeners.
 * This doesn't actually implement delegates, but rather allows
 * logic that assumes a delegate to still function.
 *
 * Therefore, this is essentially an alias of [can-event.addEventListener addEventListener] with the selector ignored.
 *
 * @param {String} selector The **ignored** selector to use for the delegate.
 * @param {String} event The name of the event to listen for.
 * @param {Function} handler The handler that will be executed to handle the event.
 * @return {Object} this
 *
 * @signature `canEvent.delegate.call(obj, selector, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can.event] mixin.
 */
canEvent.delegate = canEvent.on;

/**
 * @function can-event.undelegate undelegate
 * @parent can-event.static
 * @signature `obj.undelegate(selector, event, handler)`
 *
 * Provides a compatibility layer for removing delegate event listeners.
 * This doesn't actually implement delegates, but rather allows
 * logic that assumes a delegate to still function.
 *
 * Therefore, this is essentially an alias of [can-event.removeEventListener removeEventListener] with the selector ignored.
 *
 * @param {String} selector The **ignored** selector to use for the delegate.
 * @param {String} event The name of the event to listen for.
 * @param {Function} handler The handler that will be executed to handle the event.
 * @return {Object} this
 *
 * @signature `canEvent.undelegate.call(obj, selector, event, handler)`
 *
 * This syntax can be used for objects that don't include the [can-event] mixin.
 */
canEvent.undelegate = canEvent.off;

canEvent.dispatch = canEvent.dispatchSync;



Object.defineProperty(canEvent, "makeHandlerArgs",{
	enumerable: false,
	value: makeHandlerArgs
});

Object.defineProperty(canEvent,"handlers", {
	enumerable: false,
	value: getHandlers
});
Object.defineProperty(canEvent,"flush", {
	enumerable: false,
	writable: true,
	value: function(){}
});

module.exports = namespace.event = canEvent;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// # can-event/batch/
// Adds task batching abilities to event dispatching.
// Provides a `queue` method to add batched work.
// Overwrites `event.dispatch` to use the task queue when dispatching events.
// Provides a `start` and `stop` method used to a queue.
// Provides `collecting` which returns the queue collecting tasks.
// Provides `dispatching` which returns the queue dispatching tasks.
// Dispatches `batchEnd` when a queue's tasks have been completed.

var canEvent = __webpack_require__(11);
var last = __webpack_require__(33);
var namespace = __webpack_require__(2);
var canTypes = __webpack_require__(25);
var canDev = __webpack_require__(21);
var canLog = __webpack_require__(46);

//!steal-remove-start
var consoleDefined = typeof console !== 'undefined';
var group = consoleDefined && console.group && console.group.bind(console) || function() {};
var groupEnd = consoleDefined && console.groupEnd && console.groupEnd.bind(console) || function() {};
//!steal-remove-end

// Which batch of events this is for -- might not want to send multiple
// messages on the same batch.  This is mostly for event delegation.
var batchNum = 1,
	collectionQueue = null,
	queues = [],
	dispatchingQueues = false,
	makeHandlerArgs = canEvent.makeHandlerArgs,
	getHandlers = canEvent.handlers;

function addToCollectionQueue(item, event, args, handlers){
	var handlerArgs = makeHandlerArgs(event, args);
	var tasks = [];
	for(var i = 0, len = handlers.length; i < len; i++) {
		tasks[i] = [handlers[i], item, handlerArgs];
	}

	[].push.apply(collectionQueue.tasks,tasks);
}


var canBatch = {
	//!steal-remove-start
	missingStopWarningTimeout: 5000,
	//!steal-remove-end
	// how many times has start been called without a stop
	transactions: 0,
	/**
	 * @function can-event/batch/batch.start start
	 * @parent can-event/batch/batch
	 * @description Begin an event batch.
	 *
	 * @signature `canBatch.start([batchStopHandler])`
	 *
	 * @param {Function} [batchStopHandler] a callback that gets called after all batched events have been called.
	 *
	 * @body
	 * `canBatch.start` begins an event batch. Until `[can-event/batch/batch.stop]` is called, any
	 * events that would result from calls to [can-event/batch/batch.trigger] to are held back from firing. If you have
	 * lots of changes to make to observables, batching them together can help performance - especially if
	 * those observables are live-bound to the DOM.
	 *
	 * In this example, you can see how the _first_ event is not fired (and their handlers
	 * are not called) until `canBatch.stop` is called.
	 *
	 * ```
	 * var person = new DefineMap({
	 *     first: 'Alexis',
	 *     last: 'Abril'
	 * });
	 *
	 * person.on('first', function() {
	 *     console.log("First name changed.");
	 * }).on('last', function() {
	 *     console.log("Last name changed.");
	 * });
	 *
	 * canBatch.start();
	 * person.first = 'Alex';
	 * console.log('Still in the batch.');
	 * canBatch.stop();
	 *
	 * // the log has:
	 * // Still in the batch.
	 * // First name changed.
	 * ```
	 *
	 * You can also pass a callback to `canBatch.start` which will be called after all the events have
	 * been fired:
	 *
	 * ```
	 * canBatch.start(function() {
	 *     console.log('The batch is over.');
	 * });
	 * person.first = "Izzy"
	 * console.log('Still in the batch.');
	 * canBatch.stop();
	 *
	 * // The console has:
	 * // Still in the batch.
	 * // First name changed.
	 * // The batch is over.
	 * ```
	 *
	 * ## Calling `canBatch.start` multiple times
	 *
	 * If you call `canBatch.start` more than once, `canBatch.stop` needs to be called
	 * the same number of times before any batched events will fire. For ways
	 * to circumvent this process, see [can-event/batch/batch.stop].
	 *
	 * Here is an example that demonstrates how events are affected by calling
	 * `canBatch.start` multiple times.
	 *
	 * ```
	 * var Todo = DefineMap.extend({
	 *   completed: "boolean",
	 *   name: "string"
	 *   updatedAt: "date",
	 *   complete: function(){
	 *     canBatch.start();
	 *     this.completed = true;
	 *     this.updatedAt = new Date();
	 *     canBatch.end();
	 *   }
	 * });
	 *
	 * Todo.List = DefineList.extend({
	 *   "#": Todo,
	 *   completeAll: function(){
	 *     this.forEach(function(todo){
	 *       todo.complete();
	 *     });
	 *   }
	 * });
	 *
	 * var todos = new Todo.List([
	 *   {name: "dishes", completed: false},
	 *   {name: "lawn", completed: false}
	 * ]);
	 *
	 * todos[0].on("completed", function(ev){
	 *   console.log("todos[0] "+ev.batchNum);
	 * })
	 * todos[1].on("completed", function(ev){
	 *   console.log("todos[1] "+ev.batchNum);
	 * });
	 *
	 * todos.completeAll();
	 * // console.logs ->
	 * //        todos[0] 1
	 * //        todos[1] 1
	 * ```
	 */
	start: function (batchStopHandler) {
		canBatch.transactions++;
		if(canBatch.transactions === 1) {
			var queue = {
				// the batch number
				number: batchNum++,

				// where are we in the task queue
				index: 0,
				tasks: [],

				// the batch end event has fired
				batchEnded: false,

				// where are we in the post-batch queue
				callbacksIndex: 0,
				callbacks: [],

				// if everything this batch can do has been done
				complete: false
			};
			//!steal-remove-start
			var setupWarning = function(){
				setTimeout(function(){
					if (queue.complete === false) {
						canDev.warn("can-even/batch/batch: start called without corresponding stop");
					}
				}, canBatch.missingStopWarningTimeout);
			};
			if(typeof CanZone !== "undefined") {
				CanZone.ignore(setupWarning)();
			} else {
				setupWarning();
			}
			//!steal-remove-end
			if (batchStopHandler) {
				queue.callbacks.push(batchStopHandler);
			}
			collectionQueue = queue;
		}

	},
	/**
	 * @function can-event/batch/batch.collecting collecting
	 * @parent can-event/batch/batch
	 *
	 * @signature `batch.collecting()`
	 *
	 * Returns the Queue that is currently collecting tasks.
	 *
	 * ```
	 * batch.start();
	 * batch.collecting() //-> Queue
	 *
	 * batch.stop();
	 * batch.collecting() //-> null
	 * ```
	 *
	 * @return {can-event/batch/Queue} The queue currently collecting tasks.
	 */
	collecting: function(){
		return collectionQueue;
	},
	/**
	 * @function can-event/batch/batch.dispatching dispatching
	 * @parent can-event/batch/batch
	 *
	 * @signature `batch.dispatching()`
	 *
	 * Returns the Queue that is executing tasks.
	 *
	 * ```
	 * var canEvent = require("can-event");
	 * var batch = require("can-event/batch/batch");
	 *
	 *
	 * var obj = Object.assign({}, canEvent);
	 *
	 *
	 *
	 * batch.start();
	 * obj.dispatch("first");
	 * batch.stop();
	 * ```
	 *
	 * @return {can-event/batch/Queue} The queue currently executing tasks.
	 */
	dispatching: function(){
		return queues[0];
	},
	/**
	 * @function can-event/batch/batch.stop stop
	 * @parent can-event/batch/batch
	 * @description End an event batch.
	 *
	 * @signature `canBatch.stop([force[, callStart]])`
	 *
	 * If this call to `stop` matches the number of calls to `start`, all of this batch's [can-event/batch/batch.trigger triggered]
	 * events will be dispatched.  If the firing of those events creates new events, those new events will be dispatched
	 * after the current batch in their own batch.
	 *
	 * @param {bool} [force=false] Whether to stop batching events immediately.
	 * @param {bool} [callStart=false] Whether to call [can-event/batch/batch.start] after firing batched events.
	 *
	 * @body
	 *
	 * `canBatch.stop` matches an earlier `[can-event/batch/batch.start]` call. If `canBatch.stop` has been
	 * called as many times as `canBatch.start` (or if _force_ is true), all batched events will be
	 * fired and any callbacks passed to `canBatch.start` since the beginning of the batch will be
	 * called. If _force_ and _callStart_ are both true, a new batch will be started when all
	 * the events and callbacks have been fired.
	 *
	 * See `[can-event/batch/batch.start]` for examples of `canBatch.start` and `canBatch.stop` in normal use.
	 *
	 */
	stop: function (force, callStart) {
		if (force) {
			canBatch.transactions = 0;
		} else {
			canBatch.transactions--;
		}
		if (canBatch.transactions === 0) {
			queues.push(collectionQueue);
			collectionQueue = null;
			if(!dispatchingQueues) {
				canEvent.flush();
			}
		}
	},
	// Flushes the current
	flush: function() {
		//!steal-remove-start
		var debug = canDev.logLevel >= 1;
		//!steal-remove-end

		dispatchingQueues = true;
		while(queues.length) {
			var queue = queues[0];
			var tasks = queue.tasks,
				callbacks = queue.callbacks;

			canBatch.batchNum = queue.number;

			var len = tasks.length;

			//!steal-remove-start
			if(debug && queue.index === 0 && queue.index < len) {
				group("batch running "+queue.number);
			}
			//!steal-remove-end

			while(queue.index < len) {
				var task = tasks[queue.index++];
				//!steal-remove-start
				if(debug) {
					var context = task[1];
					var args = task[2];
					if(args && args[0]) {
						canLog.log("dispatching", args[0].type, "on", context);
					}
				}
				//!steal-remove-end
				task[0].apply(task[1], task[2]);
			}

			if(!queue.batchEnded) {
				//!steal-remove-start
				if(debug) {
					canLog.log("tasks ended");
				}
				//!steal-remove-end
				queue.batchEnded = true;
				canEvent.dispatchSync.call(canBatch,"batchEnd",[queue.number]);
			}

			//!steal-remove-start
			if(debug && queue.callbacksIndex < callbacks.length) {
				canLog.log("calling callbacks");
			}
			//!steal-remove-end

			while(queue.callbacksIndex < callbacks.length) {
				callbacks[queue.callbacksIndex++]();
			}


			if(!queue.complete) {
				queue.complete = true;
				canBatch.batchNum = undefined;
				queues.shift();

				//!steal-remove-start
				if(debug) {
					groupEnd();
				}
				//!steal-remove-end
			}

		}
		dispatchingQueues = false;
	},
	/**
	 * @function can-event/batch/batch.dispatch dispatch
	 * @parent can-event/batch/batch
	 * @description Dispatchs an event within the event batching system.
	 * @signature `canBatch.trigger(item, event [, args])`
	 *
	 * Makes sure an event is fired at the appropriate time within the appropriate batch.
	 * How and when the event fires depends on the batching state.
	 *
	 * There are three states of batching:
	 *
	 * - no queues - `trigger` is called outside of any `start` or `stop` call -> The event is dispatched immediately.
	 * - collecting batch - `trigger` is called between a `start` or `stop` call -> The event is dispatched when `stop` is called.
	 * - firing queues -  `trigger` is called due to another `trigger` called within a batch -> The event is dispatched after the current batch has completed in a new batch.
	 *
	 * Finally, if the event has a `batchNum` it is fired immediately.
	 *
	 * @param {Object} item the target of the event.
	 * @param {String|{type: String}} event the type of event, or an event object with a type given like `{type: 'name'}`
	 * @param {Array} [args] the parameters to trigger the event with.
	 *
	 * @body
	 *
	 */
	dispatch: function (event, args) {
		//!steal-remove-start
		if (arguments.length > 2) {
			canDev.warn('Arguments to dispatch should be an array, not multiple arguments.');
			args = Array.prototype.slice.call(arguments, 1);
		}

		if (args && !Array.isArray(args)) {
			canDev.warn('Arguments to dispatch should be an array.');
			args = [ args ];
		}
		//!steal-remove-end

		var item = this,
			handlers;
		// Don't send events if initalizing.
		if (!item.__inSetup) {
			event = typeof event === 'string' ? {
				type: event
			} : event;

			// If this is trying to belong to another batch, let it fire
			if(event.batchNum) {
				// It's a possibility we want to add this to the
				// end of the tasks if they haven't completed yet.
				canBatch.batchNum = event.batchNum;
				canEvent.dispatchSync.call( item, event, args );
			}
			// if there's a batch, add it to this queues events
			else if(collectionQueue) {

				handlers = getHandlers.call(this, event.type);
				if(handlers) {
					event.batchNum = collectionQueue.number;
					addToCollectionQueue(item, event, args, handlers);
				}
			}
			// if there are queues, but this doesn't belong to a batch
			// add it to its own batch fired at the end
			else if(queues.length) {
				// start a batch so it can be colllected.
				// this should never hit in async
				handlers = getHandlers.call(this, event.type);
				if(handlers) {
					canBatch.start();
					event.batchNum = collectionQueue.number;
					addToCollectionQueue(item, event, args, handlers);
					last(queues).callbacks.push(canBatch.stop);
				}


			}
			// there are no queues, so just fire the event.
			else {
				handlers = getHandlers.call(this, event.type);
				if(handlers) {
					canBatch.start();
					event.batchNum = collectionQueue.number;
					addToCollectionQueue(item, event, args, handlers);
					canBatch.stop();
				}
			}
		}
	},
	/**
	 * @function can-event/batch/batch.queue queue
	 * @parent can-event/batch/batch
	 * @description Queues a method to be called.
	 *
	 * @signature `batch.queue(task)`
	 *
	 * Queues a method to be called in the current [can-event/batch/batch.collecting]
	 * queue if there is one.  If there is a [can-event/batch/batch.dispatching] queue,
	 * it will create a batch and add the task to that batch.
	 * Finally, if there is no batch, the task will be executed immediately.
	 *
	 * ```
	 * var me = {
	 *   say: function(message){
	 *     console.log(this.name,"says", message);
	 *   }
	 * }
	 * batch.queue([me.say, me, ["hi"]]);
	 * ```
	 *
	 * @param  {Array<function,*,Array>} task An array that details a
	 * function to be called, the context the function should be called with, and
	 * the arguments to the function like: `[function,context, [arg1, arg2]]`
	 */
	queue: function(task, inCurrentBatch){
		if(collectionQueue) {
			collectionQueue.tasks.push(task);
		}
		// if there are queues, but this doesn't belong to a batch
		// add it to its own batch
		else if(queues.length) {
			if(inCurrentBatch && queues[0].index < queues.tasks.length) {
				queues[0].tasks.push(task);
			} else {
				canBatch.start();
				collectionQueue.tasks.push(task);
				last(queues).callbacks.push(canBatch.stop);
			}
		}
		// there are no queues, so create one and run it.
		else {
			canBatch.start();
			collectionQueue.tasks.push(task);
			canBatch.stop();
		}
	},
	queues: function(){
		return queues;
	},
	/**
	 * @function can-event/batch/batch.afterPreviousEvents afterPreviousEvents
	 * @parent can-event/batch/batch
	 * @description Run code when all previuos state has settled.
	 *
	 * @signature `canBatch.afterPreviousEvents(handler)`
	 *
	 * Calls `handler` when all previously [can-event/batch/batch.trigger triggered] events have
	 * been fired.  This is useful to know when all fired events match the current state.
	 *
	 * @param {function} handler A function to call back when all previous events have fired.
	 *
	 * @body
	 *
	 *
	 * ## Use
	 *
	 * With batching, it's possible for a piece of code to read some observable, and listen to
	 * changes in that observable, but have events fired that it should ignore.
	 *
	 * For example, consider a list widget that creates `<li>`'s for each item in the list and listens to
	 * updates in that list and adds or removes `<li>`s:
	 *
	 * ```js
	 * var makeLi = function(){
	 *   return document.createElement("li")
	 * };
	 *
	 * var listWidget = function(list){
	 *   var lis = list.map(makeLi);
	 *   list.on("add", function(ev, added, index){
	 *     var newLis = added.map(makeLi);
	 *     lis.splice.apply(lis, [index, 0].concat(newLis) );
	 *   }).on("remove", function(ev, removed, index){
	 *     lis.splice(index, removed.length);
	 *   });
	 *
	 *   return lis;
	 * }
	 * ```
	 *
	 * The problem with this is if someone calls `listWidget` within a batch:
	 *
	 * ```js
	 * var list = new DefineList([]);
	 *
	 * canBatch.start();
	 * list.push("can-event","can-event/batch/");
	 * listWidget(list);
	 * canBatch.stop();
	 * ```
	 *
	 * The problem is that list will immediately create an `li` for both `can-event` and `can-event/batch/`, and then,
	 * when `canBatch.stop()` is called, the `add` event listener will create duplicate `li`s.
	 *
	 * The solution, is to use `afterPreviousEvents`:
	 *
	 * ```js
	 * var makeLi = function(){
	 *   return document.createElement("li")
	 * };
	 *
	 * var listWidget = function(list){
	 *   var lis = list.map(makeLi);
	 *   canBatch.afterPreviousEvents(function(){
	 *     list.on("add", function(ev, added, index){
	 *       var newLis = added.map(makeLi);
	 *       lis.splice.apply(lis, [index, 0].concat(newLis) );
	 *     }).on("remove", function(ev, removed, index){
	 *       lis.splice(index, removed.length);
	 *     });
	 *   });
	 *
	 *   return lis;
	 * }
	 * ```
	 *
	 */
	// call handler after any events from currently settled stated have fired
	// but before any future change events fire.
	afterPreviousEvents: function(handler){
		this.queue([handler]);
	},
	after: function(handler){
		var queue = collectionQueue || queues[0];

		if(queue) {
			queue.callbacks.push(handler);
		} else {
			handler({});
		}
	}
};

/**
 * @function can-event/batch/batch.debounce debounce
 * @parent can-event/batch/batch
 * @description Provides a debounced event listener
 * @signature `canBatch.debounce(handler)`
 *
 * Makes sure an event handler function is only run once per batch.
 *
 * @param {Function} handler The handler that will be executed to handle the event.
 * @return {Function} The debounced function
 */
Object.defineProperty(canBatch, 'debounce', {
	enumerable: false,
	value: function(handler) {
		var that = null;
		var args = null;

		return function() {
			if (!that) {
				canEvent.addEventListener.call(canBatch, "batchEnd", function listener() {
					canEvent.removeEventListener.call(canBatch, "batchEnd", listener);

					handler.apply(that, args);
					that = null;
					args = null;
				});
			}

			that = this;
			args = arguments;
		};
	}
});


canEvent.flush = canBatch.flush;
canEvent.dispatch = canBatch.dispatch;

canBatch.trigger = function(){
	canLog.warn("use canEvent.dispatch instead");
	return canEvent.dispatch.apply(this, arguments);
};

canTypes.queueTask = canBatch.queue;

if (namespace.batch) {
	throw new Error("You can't have two versions of can-event/batch/batch, check your dependencies");
} else {
	module.exports = namespace.batch = canBatch;
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(9);
var isBrowserWindow = __webpack_require__(122);
var isPlainObject = __webpack_require__(39);
var fixSyntheticEventsOnDisabled = false;
var dev = __webpack_require__(5);

function isDispatchingOnDisabled(element, ev) {
	var isInsertedOrRemoved = isPlainObject(ev) ? (ev.type === 'inserted' || ev.type === 'removed') : (ev === 'inserted' || ev === 'removed');
	var isDisabled = !!element.disabled;
	return isInsertedOrRemoved && isDisabled;
}

/**
 * @module {{}} can-util/dom/events/events events
 * @parent can-util/dom
 * @description Allows you to listen to a domEvent and special domEvents as well as dispatch domEvents.
 *
 * ```js
 * var domEvents = require("can-util/dom/events/events");
 * ```
 */
module.exports = {
	addEventListener: function(){
		this.addEventListener.apply(this, arguments);
	},
	removeEventListener: function(){
		this.removeEventListener.apply(this, arguments);
	},
	canAddEventListener: function(){
		return (this.nodeName && (this.nodeType === 1 || this.nodeType === 9)) || this === window;
	},
	dispatch: function(event, args, bubbles){
		var ret;
		var dispatchingOnDisabled = fixSyntheticEventsOnDisabled && isDispatchingOnDisabled(this, event);

		var doc = this.ownerDocument || getDocument();
		var ev = doc.createEvent('HTMLEvents');
		var isString = typeof event === "string";

		// removed / inserted events should not bubble
		ev.initEvent(isString ? event : event.type, bubbles === undefined ? true : bubbles, false);

		if(!isString) {
			for (var prop in event) {
				if (ev[prop] === undefined) {
					ev[prop] = event[prop];
				}
			}
		}

		// ignore events from feature detection below
		if(this.disabled === true && ev.type !== 'fix_synthetic_events_on_disabled_test') {
			//!steal-remove-start
			dev.warn(
				"can-util/dom/events::dispatch: Dispatching a synthetic event on a disabled is " +
				"problematic in FireFox and Internet Explorer. We recommend avoiding this if at " +
				"all possible. see https://github.com/canjs/can-util/issues/294"
			);
			//!steal-remove-end
		}

		ev.args = args;
		if(dispatchingOnDisabled) {
			this.disabled = false;
		}
		ret = this.dispatchEvent(ev);
		if(dispatchingOnDisabled) {
			this.disabled = true;
		}
		return ret;
	}
};

// In FireFox, dispatching a synthetic event on a disabled element throws an error.
// Other browsers, like IE 10 do not dispatch synthetic events on disabled elements at all.
// This determines if we have to work around that when dispatching events.
// https://bugzilla.mozilla.org/show_bug.cgi?id=329509
(function() {
	if(!isBrowserWindow()) {
		return;
	}

	var testEventName = 'fix_synthetic_events_on_disabled_test';
	var input = document.createElement("input");
	input.disabled = true;
	var timer = setTimeout(function() {
		fixSyntheticEventsOnDisabled = true;
	}, 50);
	var onTest = function onTest (){
		clearTimeout(timer);
		module.exports.removeEventListener.call(input, testEventName, onTest);
	};
	module.exports.addEventListener.call(input, testEventName, onTest);
	try {
		module.exports.dispatch.call(input, testEventName, [], false);
	} catch(e) {
		onTest();
		fixSyntheticEventsOnDisabled = true;
	}
})();


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Arg = __webpack_require__(79);
var Literal = __webpack_require__(54);

var canReflect = __webpack_require__(0);
var compute = __webpack_require__(10);
var observeReader = __webpack_require__(31);
var canSymbol = __webpack_require__(1);
var dev = __webpack_require__(21);

//!steal-remove-start
// warn on keys like {{foo}} if foo is not in the current scope
// don't warn on things like {{./foo}} or {{../foo}} or {{foo.bar}} or {{%index}} or {{this}}
function displayScopeWalkingWarning(key, computeData) {
	if (key.indexOf(".") < 0 && key !== "this") {
		// if scope that value was found in (`scope`) is not the starting scope,
		// we must have walked up the scope to find the value
		var scopeWasWalked = computeData.scope && (computeData.scope !== computeData.startingScope);

		// values read from non-contexts, such as aliases created for #each and #with
		// should not warn
		var readFromNonContext = computeData && computeData.scope &&
			computeData.scope._meta && computeData.scope._meta.notContext;

		var readFromSpecialContext = computeData && computeData.scope &&
			computeData.scope._meta && computeData.scope._meta.special;

		// if scope was walked and value isn't an alias, display dev warning
		if (scopeWasWalked && !readFromNonContext && !readFromSpecialContext) {
			var filename = computeData.scope.peek('scope.filename');
			var lineNumber = computeData.scope.peek('scope.lineNumber');

			dev.warn(
				(filename ? filename + ':' : '') +
				(lineNumber ? lineNumber + ': ' : '') +
				'"' + key + '" ' +
				'is not in the current scope, so it is being read from the parent scope.\n' +
				'This will not happen automatically in an upcoming release. See https://canjs.com/doc/can-stache.scopeAndContext.html#PreventingScopeWalking.\n\n'
			);
		}
	}
}
//!steal-remove-end

// ## Helpers
// Helper for getting a bound compute in the scope.
var getObservableValue_fromKey = function (key, scope, readOptions) {
	var data = scope.computeData(key, readOptions);
	compute.temporarilyBind(data);

	// display warnings after `temporarilyBind`
	// so that we know where the value was found and the initialValue

	//!steal-remove-start
	displayScopeWalkingWarning(key, data);
	//!steal-remove-end

	return data;
};
function computeHasDependencies(compute){
    return compute[canSymbol.for("can.valueHasDependencies")] ?
        canReflect.valueHasDependencies(compute) : compute.computeInstance.hasDependencies;
}
function getObservableValue_fromDynamicKey_fromObservable(key, root, helperOptions, readOptions) {
    var computeValue = compute(function(newVal) {
        var keyValue = canReflect.getValue(key);
        var rootValue = canReflect.getValue(root);
        // Convert possibly numeric key to string, because observeReader.get will do a charAt test on it.
        // also escape `.` so that things like ["bar.baz"] will work correctly
        keyValue = ("" + keyValue).replace(".", "\\.");

        if (arguments.length) {
            observeReader.write(rootValue, observeReader.reads(keyValue), newVal);
        } else {
            return observeReader.get(rootValue, keyValue);
        }
    });
    compute.temporarilyBind(computeValue);
    return computeValue;
}
// If not a Literal or an Arg, convert to an arg for caching.
function convertToArgExpression(expr){
    if(!(expr instanceof Arg) && !(expr instanceof Literal)) {
        return new Arg(expr);
    } else {
        return expr;
    }

}
function toComputeOrValue(value) {
    // convert to non observable value
    if(canReflect.isObservableLike(value)) {
        // we only want to do this for things that `should` have dependencies, but dont.

        if(canReflect.valueHasDependencies(value) === false) {
            return canReflect.getValue(value);
        }
        // if compute data
        if(value.compute) {
            return value.compute;
        }
    }
    return value;
}
// try to make it a compute no matter what.  This is useful for
// ~ operator.
function toCompute(value) {
    if(value) {

        if(value.isComputed) {
            return value;
        }
        if(value.compute) {
            return value.compute;
        }
    }
    return value;
}

module.exports = {
    getObservableValue_fromKey: getObservableValue_fromKey,
    computeHasDependencies: computeHasDependencies,
    getObservableValue_fromDynamicKey_fromObservable: getObservableValue_fromDynamicKey_fromObservable,
    convertToArgExpression: convertToArgExpression,
    toComputeOrValue: toComputeOrValue,
    toCompute: toCompute
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(6);
var isArrayLike = __webpack_require__(40);

/**
 * @module {function} can-util/js/make-array/make-array make-array
 * @parent can-util/js
 * @signature `makeArray(element)`
 * @param  {ArrayLike|Object} element any array-like or object data structure
 * @return {Array}     a JavaScript array object with the same elements as the passed-in ArrayLike
 *
 * makeArray takes any array-like object (can-list, NodeList, etc.) and converts it to a JavaScript array
 * 
 * ```
 * var makeArray = require("can-util/js/make-array/make-array");
 * 
 * makeArray({0: "a", length: 1}); //-> ["a"]
 * 
 * ```
 */
function makeArray(element) {
	var ret = [];
	if (isArrayLike(element)) {
		each(element, function (a, i) {
			ret[i] = a;
		});
	} else if(element === 0 || element) {
		ret.push(element);
	}
	return ret;
}

module.exports = makeArray;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* jshint unused: false */

/**
 * @module {function} can-util/js/is-empty-object/is-empty-object is-empty-object
 * @parent can-util/js
 * @signature `isEmptyObject(obj)`
 *
 * Used to determine if an object is an empty object (an object with no enumerable properties) such as `{}`.
 *
 * ```js
 * var isEmptyObject = require("can-util/js/is-empty-object/is-empty-object");
 *
 * console.log(isEmptyObject({})); // -> true
 *
 * console.log(isEmptyObject({ a: 1 })); // -> false
 *
 * var obj = {};
 * Object.defineProperty(obj, "foo", {
 *     enumerable: false,
 *     value: "bar"
 * });
 * console.log(isEmptyObject(obj)); // -> true
 * ```
 *
 * @param {Object} obj Any object.
 * @return {Boolean} True if the object is an object with no enumerable properties.
 */
module.exports = function(obj){
	for(var prop in obj) {
		return false;
	}
	return true;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {

/* global self */
/* global WorkerGlobalScope */

var globals = __webpack_require__(28);

/**
 * @module {function} can-globals/global/global global
 * @parent can-globals/modules
 * 
 * Get the global object for the current context.
 * 
 * @signature `GLOBAL([newGlobal])`
 *
 * Optionally sets, and returns the global that this environment provides. It will be one of:
 * 
 * ```js
 * var GLOBAL = require('can-globals/global/global');
 * var g = GLOBAL();
 * // In a browser
 * console.log(g === window); // -> true
 * ```
 *
 * - **Browser**: [`window`](https://developer.mozilla.org/en-US/docs/Web/API/window)
 * - **Web Worker**: [`self`](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)
 * - **Node.js**: [`global`](https://nodejs.org/api/globals.html#globals_global)
 * 
 * @param {Object} [newGlobal] An optional global-like object to set as the context's global 
 *
 * @return {Object} The global object for this JavaScript environment.
 */
globals.define('global', function(){
	// Web Worker
	return (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self :

		// Node.js
		typeof process === 'object' &&
		{}.toString.call(process) === '[object process]' ? global :

		// Browser window
		window;
});

module.exports = globals.makeExport('global');

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42), __webpack_require__(115)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module {function} can-util/dom/child-nodes/child-nodes child-nodes
 * @parent can-util/dom
 * @signature `childNodes(node)`
 *
 * Get all of the childNodes of a given node.
 *
 * ```js
 * var stache = require("can-stache");
 * var childNodes = require("can-util/child-nodes/child-nodes");
 *
 * var html = "<div><h1><span></span></h1></div>";
 * var frag = stache(html)();
 *
 * console.log(childNodes(frag)[0].nodeName); // -> DIV
 * ```
 *
 * @param {Object} node The Node that you want child nodes for.
 */

function childNodes(node) {
	var childNodes = node.childNodes;
	if ("length" in childNodes) {
		return childNodes;
	} else {
		var cur = node.firstChild;
		var nodes = [];
		while (cur) {
			nodes.push(cur);
			cur = cur.nextSibling;
		}
		return nodes;
	}
}

module.exports = childNodes;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var Scope = __webpack_require__(51);
var Observation = __webpack_require__(4);
var observationReader = __webpack_require__(31);
var compute = __webpack_require__(10);
var canReflect = __webpack_require__(0);
var dev = __webpack_require__(5);
var isEmptyObject = __webpack_require__(16);
var each = __webpack_require__(6);

var isArrayLike = __webpack_require__(40);
	// ## can.view.Options
	//
	// This contains the local helpers, partials, and tags available to a template.

var Options = Scope.Options; // jshint ignore:line
var noop = function () {};

module.exports = {
	// Returns if something looks like an array.  This works for can.List
	isArrayLike: isArrayLike,
	// A generic empty function
	emptyHandler: function(){},
	// Converts a string like "1" into 1. "null" into null, etc.
	// This doesn't have to do full JSON, so removing eval would be good.
	jsonParse: function(str){
		// if it starts with a quote, assume a string.
		if(str[0] === "'") {
			return str.substr(1, str.length -2);
		} else if(str === "undefined") {
			return undefined;
		} else {
			return JSON.parse(str);
		}
	},
	mixins: {
		last: function(){
			return this.stack[this.stack.length - 1];
		},
		add: function(chars){
			this.last().add(chars);
		},
		subSectionDepth: function(){
			return this.stack.length - 1;
		}
	},
	// Sets .fn and .inverse on a helperOptions object and makes sure
	// they can reference the current scope and options.
	convertToScopes: function(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer, isStringOnly){
		helperOptions.fn = truthyRenderer ? this.makeRendererConvertScopes(truthyRenderer, scope, options, nodeList, isStringOnly) : noop;
		helperOptions.inverse = falseyRenderer ? this.makeRendererConvertScopes(falseyRenderer, scope, options, nodeList, isStringOnly) : noop;
		helperOptions.isSection = !!(truthyRenderer || falseyRenderer);
	},
	// Returns a new renderer function that makes sure any data or helpers passed
	// to it are converted to a can.view.Scope and a can.view.Options.
	makeRendererConvertScopes: function (renderer, parentScope, parentOptions, nodeList, observeObservables) {
		var rendererWithScope = function(ctx, opts, parentNodeList){
			return renderer(ctx || parentScope, opts, parentNodeList);
		};
		var convertedRenderer = function (newScope, newOptions, parentNodeList) {
			// prevent binding on fn.
			// If a non-scope value is passed, add that to the parent scope.
			if (newScope !== undefined && !(newScope instanceof Scope)) {
				if (parentScope) {
					newScope = parentScope.add(newScope);
				}
				else {
					newScope = Scope.refsScope().add(newScope || {});
				}
			}
			if (newOptions !== undefined && !(newOptions instanceof Options)) {
				newOptions = parentOptions.add(newOptions);
			}
			var result = rendererWithScope(newScope, newOptions || parentOptions, parentNodeList || nodeList );
			return result;
		};
		return observeObservables ? convertedRenderer : Observation.ignore(convertedRenderer);
	},
	// Calls the truthy subsection for each item in a list and returning them in a string.
	getItemsStringContent: function(items, isObserveList, helperOptions, options){
		var txt = "",
			len = observationReader.get(items, 'length'),
			isObservable = canReflect.isObservableLike(items);

		for (var i = 0; i < len; i++) {
			var item = isObservable ? compute(items, '' + i) :items[i];
			txt += helperOptions.fn(item, options);
		}
		return txt;
	},
	// Calls the truthy subsection for each item in a list and returns them in a document Fragment.
	getItemsFragContent: function(items, helperOptions, scope, asVariable) {
		var result = [],
			len = observationReader.get(items, 'length'),
			isObservable = canReflect.isObservableLike(items),
			hashExprs = helperOptions.exprData && helperOptions.exprData.hashExprs,
			hashOptions;

		// Check if using hash
		if (!isEmptyObject(hashExprs)) {
			hashOptions = {};
			each(hashExprs, function (exprs, key) {
				hashOptions[exprs.key] = key;
			})
		}

		for (var i = 0; i < len; i++) {
			var aliases = {
				"%index": i,
				"@index": i
			};

			//!steal-remove-start
			Object.defineProperty(aliases, '%index', {
				get: function() {
					var filename = scope.peek('scope.filename');
					var lineNumber = scope.peek('scope.lineNumber');
					dev.warn(
						(filename ? filename + ':' : '') +
						(lineNumber ? lineNumber + ': ' : '') +
						'%index is deprecated. Use scope.index instead.'
					);
					return i;
				}
			});

			Object.defineProperty(aliases, '@index', {
				get: function() {
					var filename = scope.peek('scope.filename');
					var lineNumber = scope.peek('scope.lineNumber');
					dev.warn(
						(filename ? filename + ':' : '') +
						(lineNumber ? lineNumber + ': ' : '') +
						'@index is deprecated. Use scope.index instead.'
					);
					return i;
				}
			});
			//!steal-remove-end

			var item = isObservable ? compute(items, '' + i) : items[i];

			if (asVariable) {
				aliases[asVariable] = item;
			}

			if (!isEmptyObject(hashOptions)) {
				if (hashOptions.value) {
					aliases[hashOptions.value] = item;
				}
				if (hashOptions.index) {
					aliases[hashOptions.index] = i;
				}
			}

			result.push(helperOptions.fn(
				scope
				.add(aliases, { notContext: true })
				.add({ index: i }, { special: true })
				.add(item))
			);
		}
		return result;
	},
	Options: Options
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var makeArray = __webpack_require__(15);
var each = __webpack_require__(6);
var namespace = __webpack_require__(2);
var domMutate = __webpack_require__(35);

var CIDMap = __webpack_require__(34);
// # can/view/node_lists/node_list.js
//

// ### What's a nodeList?
// 
// A nodelist is an array of DOM nodes (elements text nodes and DOM elements) and/or other
// nodeLists, along with non-array-indexed properties that manage relationships between lists.  
// These properties are:
// 
// * deepChildren   children that couldn't be found by iterating over the nodeList when nesting
// * nesting          nested level of a nodelist (parent's nesting plus 1)
// * newDeepChildren  same as deepChildren but stored before registering with update()
// * parentList   the direct parent nodeList of this nodeList
// * replacements   an array of nodeLists meant to replace virtual nodes
// * unregistered   a callback to call when unregistering a nodeList

// ## Helpers
// A mapping of element ids to nodeList id allowing us to quickly find an element
// that needs to be replaced when updated.
var nodeMap = new CIDMap(),
	splice = [].splice,
	push = [].push,

	// ## nodeLists.itemsInChildListTree
	// Given a nodeList return the number of child items in the provided
	// list and any child lists.
	itemsInChildListTree = function(list){
		var count = 0;
		for(var i = 0, len = list.length ; i < len; i++){
			var item = list[i];
			// If the item is an HTMLElement then increment the count by 1.
			if(item.nodeType) {
				count++;
			} else {
				// If the item is not an HTMLElement it is a list, so
				// increment the count by the number of items in the child
				// list.
				count += itemsInChildListTree(item);
			}
		}
		return count;
	},
	// replacements is an array of nodeLists
	// makes a map of the first node in the replacement to the nodeList
	replacementMap = function(replacements){
		var map = new CIDMap();
		for(var i = 0, len = replacements.length; i < len; i++){
			var node = nodeLists.first(replacements[i]);
			map.set(node, replacements[i]);
		}
		return map;
	},
	addUnfoundAsDeepChildren = function(list, rMap){
		rMap.forEach(function(replacement){
			list.newDeepChildren.push(replacement);
		});
	};

// ## Registering & Updating
//
// To keep all live-bound sections knowing which elements they are managing,
// all live-bound elments are registered and updated when they change.
//
// For example, here's a template:
//     
//     <div>
//     	{{#if items.length}}
//     		Items:
//     		{{#each items}}
//     			<label>{{.}}</label>
//     		{{/each}}
//     	{{/if}}
//     </div>
// 
// 
// the above template, when rendered with data like:
//
//     data = new can.Map({
//         items: ["first","second"]
//     })
//
// This will first render the following content:
//
//     <div>
//         <#text "">
//     </div>
//
// The empty text node has a callback which, when called, will register it like:
//
//     var ifsNodes = [<#text "">]
//     nodeLists.register(ifsNodes);
//
// And then render `{{if}}`'s contents and update `ifsNodes` with it:
//
//     nodeLists.update( ifsNodes, [<#text "\nItems:\n">, <#text "">] );
//
// Next, that final text node's callback is called which will regsiter it like:
//
//     var eachsNodes = [<#text "">];
//     nodeLists.register(eachsNodes);
//
// And then it will render `{{#each}}`'s content and update `eachsNodes` with it:
//
//     nodeLists.update(eachsNodes, [<label>,<label>]);
//
// As `nodeLists` knows that `eachsNodes` is inside `ifsNodes`, it also updates
// `ifsNodes`'s nodes to look like:
//
//     [<#text "\nItems:\n">,<label>,<label>]
//
// Now, if all items were removed, `{{#if}}` would be able to remove
// all the `<label>` elements.
//
// When you regsiter a nodeList, you can also provide a callback to know when
// that nodeList has been replaced by a parent nodeList.  This is
// useful for tearing down live-binding.
var nodeLists = {

   /**
	* @function can-view-nodelist.update update
	* @parent can-view-nodelist/methods
	*
	* @signature `nodeLists.update(nodeList, newNodes)`
	*
	* Updates a nodeList with new items, i.e. when values for the template have changed.
	*
	*   @param {can-view-nodelist/types/NodeList} nodeList The list to update with the new nodes.
	*   @param {can-view-nodelist/types/NodeList} newNodes The new nodes to update with.
	*
	*   @return {Array<Node>} The nodes that were removed from `nodeList`.
	*/
	update: function (nodeList, newNodes) {
		// Unregister all childNodeLists.
		var oldNodes = nodeLists.unregisterChildren(nodeList);

		newNodes = makeArray(newNodes);

		var oldListLength = nodeList.length;

		// Replace oldNodeLists's contents.
		splice.apply(nodeList, [
			0,
			oldListLength
		].concat(newNodes));

		// Replacements are nodes that have replaced the original element this is on.
		// We can't simply insert elements because stache does children before parents.
		if(nodeList.replacements){
			nodeLists.nestReplacements(nodeList);
			nodeList.deepChildren = nodeList.newDeepChildren;
			nodeList.newDeepChildren = [];
		} else {
			nodeLists.nestList(nodeList);
		}

		return oldNodes;
	},
   /**
	* @function can-view-nodelist.nestReplacements nestReplacements
	* @parent can-view-nodelist/methods
	* @signature `nodeLists.nestReplacements(list)`
	*
	* Goes through each node in the list. `[el1, el2, el3, ...]`
	* Finds the nodeList for that node in replacements.  el1's nodeList might look like `[el1, [el2]]`.
	* Replaces that element and any other elements in the node list with the
	* nodelist itself. resulting in `[ [el1, [el2]], el3, ...]`
	* If a replacement is not found, it was improperly added, so we add it as a deepChild.
	*
	* @param {can-view-nodelist/types/NodeList} list  The nodeList of nodes to go over
	*
	*/
	nestReplacements: function(list){
		var index = 0,
			// replacements are in reverse order in the DOM
			rMap = replacementMap(list.replacements),
			rCount = list.replacements.length;

		while(index < list.length && rCount) {
			var node = list[index],
				replacement = rMap.get(node);
			if( replacement ) {
				rMap["delete"](node);
				list.splice( index, itemsInChildListTree(replacement), replacement );
				rCount--;
			}
			index++;
		}
		// Only do this if
		if(rCount) {
			addUnfoundAsDeepChildren(list, rMap );
		}

		list.replacements = [];
	},
	/**
	 * @function can-view-nodelist.nestList nestList
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.nestList(list)`
	 *
	 * If a given list does not exist in the nodeMap then create an lookup
	 * id for it in the nodeMap and assign the list to it.
	 * If the the provided does happen to exist in the nodeMap update the
	 * elements in the list.
	 *
	 * @param {can-view-nodelist/types/NodeList} list The nodeList being nested.
	 *
	 */
	nestList: function(list){
		var index = 0;
		while(index < list.length) {
			var node = list[index],
				childNodeList = nodeMap.get(node);


			if(childNodeList) {
				// if this node is in another nodelist
				if(childNodeList !== list) {
					// update this nodeList to point to the childNodeList
					list.splice( index, itemsInChildListTree(childNodeList), childNodeList );
				}
			} else {
				// Indicate the new nodes belong to this list.
				nodeMap.set(node, list);
			}
			index++;
		}
	},

	/**
	 * @function can-view-nodelist.last last
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.last(nodeList)`
	 *
	 * Return the last HTMLElement in a nodeList; if the last
	 * element is a nodeList, returns the last HTMLElement of
	 * the child list, etc.
	 *
	 * @param {can-view-nodelist/types/NodeList} nodeList A nodeList.
	 * @return {HTMLElement} The last element of the last list nested in this list.
	 *
	 */
	last: function(nodeList){
		var last = nodeList[nodeList.length - 1];
		// If the last node in the list is not an HTMLElement
		// it is a nodeList so call `last` again.
		if(last.nodeType) {
			return last;
		} else {
			return nodeLists.last(last);
		}
	},

	/**
	 * @function can-view-nodelist.first first
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.first(nodeList)`
	 *
	 * Return the first HTMLElement in a nodeList; if the first
	 * element is a nodeList, returns the first HTMLElement of
	 * the child list, etc.
	 *
	 * @param {can-view-nodelist/types/NodeList} nodeList A nodeList.
	 * @return {HTMLElement} The first element of the first list nested in this list.
	 *
	 *
	 */
	first: function(nodeList) {
		var first = nodeList[0];
		// If the first node in the list is not an HTMLElement
		// it is a nodeList so call `first` again.
		if(first.nodeType) {
			return first;
		} else {
			return nodeLists.first(first);
		}
	},
	flatten: function(nodeList){
		var items = [];
		for(var i = 0 ; i < nodeList.length; i++) {
			var item = nodeList[i];
			if(item.nodeType) {
				items.push(item);
			} else {
				items.push.apply(items, nodeLists.flatten(item));
			}
		}
		return items;
	},
	/**
	 * @function can-view-nodelist.register register
	 * @parent can-view-nodelist/methods
	 *
	 * @signature `nodeLists.register(nodeList, unregistered, parent, directlyNested)`
	 *
	 * Registers a nodeList and returns the nodeList passed to register.
	 *
	 *   @param {can-view-nodelist/types/NodeList} nodeList A nodeList.
	 *   @param {function()} unregistered A callback to call when the nodeList is unregistered.
	 *   @param {can-view-nodelist/types/NodeList} parent The parent nodeList of this nodeList.
	 *   @param {Boolean} directlyNested `true` if nodes in the nodeList are direct children of the parent.
	 *   @return {can-view-nodelist/types/NodeList} The passed in nodeList.
	 *
	 */
	register: function (nodeList, unregistered, parent, directlyNested) {
		// If a unregistered callback has been provided assign it to the nodeList
		// as a property to be called when the nodeList is unregistred.
		nodeList.unregistered = unregistered;
		nodeList.parentList = parent;
		nodeList.nesting = parent && typeof parent.nesting !== 'undefined' ? parent.nesting + 1 : 0;

		if(parent) {
			nodeList.deepChildren = [];
			nodeList.newDeepChildren = [];
			nodeList.replacements = [];
			if(parent !== true) {
				if(directlyNested) {
					parent.replacements.push(nodeList);
				}
				else {
					parent.newDeepChildren.push(nodeList);
				}
			}
		}
		else {
			nodeLists.nestList(nodeList);
		}


		return nodeList;
	},

	/**
	 * @function can-view-nodelist.unregisterChildren unregisterChildren
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.unregisterChildren(nodeList)`
	 *
	 * Unregister all childen within the provided list and return the
	 * unregistred nodes.
	 *
	 * @param {can-view-nodelist/types/NodeList} nodeList The nodeList of child nodes to unregister.
	 * @return {Array} The list of all nodes that were unregistered.
	 */
	unregisterChildren: function(nodeList){
		var nodes = [];
		// For each node in the nodeList we want to compute it's id
		// and delete it from the nodeList's internal map.
		each(nodeList, function (node) {
			// If the node does not have a nodeType it is an array of
			// nodes.
			if(node.nodeType) {
				if(!nodeList.replacements) {
					nodeMap["delete"](node);
				}

				nodes.push(node);
			} else {
				// Recursively unregister each of the child lists in
				// the nodeList.
				push.apply(nodes, nodeLists.unregister(node, true));
			}
		});

		each(nodeList.deepChildren, function(nodeList){
			nodeLists.unregister(nodeList, true);
		});

		return nodes;
	},

	/**
		@function can-view-nodelist.unregister unregister
		@parent can-view-nodelist/methods
		@signature `nodeLists.unregister(nodeList, isChild)`
		@param {ArrayLike} nodeList a nodeList to unregister from its parent
		@param {isChild}  true if the nodeList is a direct child, false if a deep child
		@return {Array}   a list of all nodes that were unregistered

		Unregister's a nodeList and returns the unregistered nodes.
		Call if the nodeList is no longer being updated. This will
		also unregister all child nodeLists.
	*/
	unregister: function (nodeList, isChild) {
		var nodes = nodeLists.unregisterChildren(nodeList, true);

		// If an 'unregisted' function was provided during registration, remove
		// it from the list, and call the function provided.
		if (nodeList.unregistered) {
			var unregisteredCallback = nodeList.unregistered;
			nodeList.replacements = nodeList.unregistered = null;
			if(!isChild) {
				var deepChildren = nodeList.parentList && nodeList.parentList.deepChildren;
				if(deepChildren) {
					var index = deepChildren.indexOf(nodeList);
					if(index !== -1) {
						deepChildren.splice(index,1);
					}
				}
			}
			unregisteredCallback();
		}
		return nodes;
	},
	/**
	 * @function can-view-nodelist.after after
	 * @parent can-view-nodelist/methods
	 * @hide
	 * @signature `nodeLists.after(oldElements, newFrag)`
	 *
	 *   Inserts `newFrag` after `oldElements`.
	 *
	 *   @param {ArrayLike<Node>} oldElements The elements to use as reference.
	 *   @param {DocumentFragment} newFrag The fragment to insert.
	 *
	 */
	after: function (oldElements, newFrag) {
		var last = oldElements[oldElements.length - 1];
		// Insert it in the `document` or `documentFragment`
		if (last.nextSibling) {
			domMutate.insertBefore.call(last.parentNode, newFrag, last.nextSibling);
		} else {
			domMutate.appendChild.call(last.parentNode, newFrag );
		}
	},
	/**
	 * @function can-view-nodelist.replace replace
	 * @hide
	 * @parent can-view-nodelist/methods
	 * @signature `nodeLists.replace(oldElements, newFrag)`
	 *
	 * Replaces `oldElements` with `newFrag`.
	 *
	 * @param {Array<Node>} oldElements the list elements to remove
	 * @param {DocumentFragment} newFrag the fragment to replace the old elements
	 *
	 */
	replace: function (oldElements, newFrag) {
		// The following helps make sure that a selected <option> remains
		// the same by removing `selected` from the currently selected option
		// and adding selected to an option that has the same value.
		var selectedValue,
			parentNode = oldElements[0].parentNode;

		if(parentNode.nodeName.toUpperCase() === "SELECT" && parentNode.selectedIndex >= 0) {
			selectedValue = parentNode.value;
		}
		if(oldElements.length === 1) {
			domMutate.replaceChild.call(parentNode, newFrag, oldElements[0]);
		} else {
			nodeLists.after(oldElements, newFrag);
			nodeLists.remove(oldElements);
		}

		if(selectedValue !== undefined) {
			parentNode.value = selectedValue;
		}
	},
	/**
	 * @function can-view-nodelist.remove remove
	 * @parent can-view-nodelist/methods
	 * @hide
	 * @signature `nodeLists.remove(elementsToBeRemoved)`
	 *
	 * Remove all Nodes in `oldElements` from the DOM.
	 *
	 * @param {ArrayLike<Node>} oldElements the list of Elements to remove (must have a common parent)
	 *
	 */
	remove: function(elementsToBeRemoved){
		var parent = elementsToBeRemoved[0] && elementsToBeRemoved[0].parentNode;
		each(elementsToBeRemoved, function(child){
			domMutate.removeChild.call(parent, child);
		});
	},
	nodeMap: nodeMap
};
module.exports = namespace.nodeLists = nodeLists;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/dev/dev dev
 * @parent deprecated
 * @description Deprecated. Use [can-dev] instead.
 */

 //!steal-remove-start
//  canDev.warn('js/dev/dev is deprecated; please use can-log/dev/dev instead: https://github.com/canjs/can-log');
 //!steal-remove-end

module.exports = __webpack_require__(5);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domDataState = __webpack_require__(45);
var mutationDocument = __webpack_require__(65);

// count of distinct elements that have domData set
var elementSetCount = 0;

var deleteNode = function() {
	// decrement count when node is deleted
	elementSetCount -= 1;
	return domDataState.delete.call(this);
};

var cleanupDomData = function(node) {
	
	if(domDataState.get.call(node) !== undefined){
		deleteNode.call(node);
	}

	// remove handler once all domData has been cleaned up
	if (elementSetCount === 0) {
		mutationDocument.offAfterRemovedNodes(cleanupDomData);
	}
};

/**
 * @module {{}} can-util/dom/data/data data
 * @parent can-util/dom
 * @description Allows associating data as a key/value pair for a particular
 * DOM Node.
 *
 * ```js
 * var domData = require("can-util/dom/data/data");
 * ```
 */
module.exports = {
	/**
	 * @function can-util/dom/data/data.getCid domData.getCid
	 * @signature `domData.getCid.call(el)`
	 * @return {Number} The value of the element's unique CID
	 *
	 * Return the previously set unique identifier for the dom node.
	 */
	getCid: domDataState.getCid,
	/**
	 * @function can-util/dom/data/data.cid domData.cid
	 * @signature `domData.cid.call(el)`
	 * @return {Number} The value of the element's unique CID
	 *
	 * Set a unique identifier for the dom node, using the
	 * [can-util/dom/data/data.expando expando] property.
	 *
	 * @body
	 *
	 * If a unique cid value has not yet been set for this element, set it
	 * using the [can-util/dom/data/data.expando expando] property.  Return the
	 * unique cid whether or not it is newly set
	 */
	cid: domDataState.cid,
	/**
	 * @property can-util/dom/data/data.expando domData.expando
	 * @type {String}
	 *
	 * The key in which elements' cids are stored
	 */
	expando: domDataState.expando,
	/**
	 * @function can-util/dom/data/data.clean domData.clean
	 * @param  {String} prop the property to remove from the element's data
	 * @signature `domData.clean.call(el, key)`
	 *
	 * Remove data from an element previously added by [can-util/dom/data/data.set set]
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * domData.clean.call(el, "metadata");
	 * ```
	 */
	clean: domDataState.clean,
	/**
	 * @function can-util/dom/data/data.get domData.get
	 * @signature `domData.get.call(el, key)`
	 *
	 * Get data that was stored in a DOM Node using the specified `key`.
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * var metadata = domData.get.call(el, "metadata");
	 * ```
	 *
	 * @param {String} key A string used as a unique key for storing data associated with this DOM Node.
	 */
	get: domDataState.get,
	/**
	 * @function can-util/dom/data/data.set domData.set
	 * @signature `domData.set.call(el, name, value)`
	 *
	 * @param {String} name the key to store the value under
	 * @param {*} value     the value to store under the key
	 *
	 * Set data to be associated with a DOM Node using the specified `key`. If data already exists for this key, it will be overwritten.
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * domData.set.call(el, "metadata", {
	 *   foo: "bar"
	 * });
	 * ```
	 */
	set: function(name, value) {
		// set up handler to clean up domData when elements are removed
		// handler only needs to be set up the first time set is called
		if (elementSetCount === 0) {
			mutationDocument.onAfterRemovedNodes(cleanupDomData);
		}

		// increment elementSetCount if this element was not already set
		elementSetCount += domDataState.get.call(this) ? 0 : 1;

		domDataState.set.call(this, name, value);
	},
	/**
	 * @function can-util/dom/data/data.delete domData.delete
	 * @signature `domData.delete.call(el)`
	 *
	 * Remove all data for an element previously added by [can-util/dom/data/data.set set]
	 *
	 * ```js
	 * var domData = require("can-util/dom/data/data");
	 * 
	 * domData.delete.call(el);
	 * ```
	 */
	delete: deleteNode,
	
	_getElementSetCount: function(){
		return elementSetCount;
	}
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);
var globals = __webpack_require__(28);

/**
 * @module {function} can-globals/mutation-observer/mutation-observer mutation-observer
 * @parent can-globals/modules
 * 
 * Get the global [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) object for the current context.
 * 
 * @signature `MUTATIONOBSERVER([newMutationObserver])`
 * 
 * Optionally sets, and returns, the [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) object for the context.
 * 
 * ```js
 * var mutationObserverShim = require('can-globals/mutation-observer/mutation-observer');
 * MUTATIONOBSERVER(mutationObserverShim);
 * MUTATIONOBSERVER() //-> MutationObserver
 * ```
 *
 * @param {Object} MutationObserver An optional MutationObserver-like object to set as the context's MutationObserver
 *
 * @return {Object} The MutationObserver object for this JavaScript environment.
 */

globals.define('MutationObserver', function(){
	var GLOBAL = globals.getKeyValue('global');
	return GLOBAL.MutationObserver || GLOBAL.WebKitMutationObserver || GLOBAL.MozMutationObserver;
});

module.exports = globals.makeExport('MutationObserver');


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var CID = __webpack_require__(7);

var singleReference;

function getKeyName(key, extraKey) {
	var keyName = extraKey ? CID(key) + ":" + extraKey : CID(key);
	return keyName || key;
}

// weak maps are slow
/* if(typeof WeakMap !== "undefined") {
	var globalMap = new WeakMap();
	singleReference = {
		set: function(obj, key, value){
			var localMap = globalMap.get(obj);
			if( !localMap ) {
				globalMap.set(obj, localMap = new WeakMap());
			}
			localMap.set(key, value);
		},
		getAndDelete: function(obj, key){
			return globalMap.get(obj).get(key);
		},
		references: globalMap
	};
} else {*/
	singleReference = {
		// obj is a function ... we need to place `value` on it so we can retreive it
		// we can't use a global map
		set: function(obj, key, value, extraKey){
			// check if it has a single reference map
			obj[getKeyName(key, extraKey)] = value;
		},

		getAndDelete: function(obj, key, extraKey){
			var keyName = getKeyName(key, extraKey);
			var value = obj[keyName];
			delete obj[keyName];
			return value;
		}
	};
/*}*/

module.exports = singleReference;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var namespace = __webpack_require__(2);
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);
var dev = __webpack_require__(5);

/**
 * @module {Object} can-types
 * @parent can-typed-data
 * @collection can-infrastructure
 * @package ./package.json
 * @description A stateful container for CanJS type information.
 *
 * @body
 *
 * ## Use
 *
 * `can-types` exports an object with placeholder functions that
 * can be used to provide default types or test if something is of a certain type.
 *
 * For example, `can-define/map/map` might overwrite `DefeaultMap` to return DefineMap
 *
 * ```js
 * types.DefaultMap = DefineMap;
 * ```
 */

var types = {
	isMapLike: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isMapLike(obj) is deprecated, please use `canReflect.isObservableLike(obj) && canReflect.isMapLike(obj)` instead.');
		//!steal-remove-end
		return canReflect.isObservableLike(obj) && canReflect.isMapLike(obj);
	},

	isListLike: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isListLike(obj) is deprecated, please use `canReflect.isObservableLike(obj) && canReflect.isListLike(obj)` instead.');
		//!steal-remove-end
		return canReflect.isObservableLike(obj) && canReflect.isListLike(obj);
	},

	isPromise: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isPromise is deprecated, please use canReflect.isPromise instead.');
		//!steal-remove-end
		return canReflect.isPromise(obj);
	},

	isConstructor: function(func){
		//!steal-remove-start
		dev.warn('can-types.isConstructor is deprecated, please use canReflect.isConstructorLike instead.');
		//!steal-remove-end
		return canReflect.isConstructorLike(func);
	},

	isCallableForValue: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isCallableForValue(obj) is deprecated, please use `canReflect.isFunctionLike(obj) && !canReflect.isConstructorLike(obj)` instead.');
		//!steal-remove-end
		return obj && canReflect.isFunctionLike(obj) && !canReflect.isConstructorLike(obj);
	},

	isCompute: function(obj){
		//!steal-remove-start
		dev.warn('can-types.isCompute is deprecated.');
		//!steal-remove-end
		return obj && obj.isComputed;
	},

	get iterator() {
		//!steal-remove-start
		dev.warn('can-types.iterator is deprecated, use `canSymbol.iterator || canSymbol.for("iterator")` instead.');
		//!steal-remove-end
		return canSymbol.iterator || canSymbol.for("iterator");
	},
	/**
	 * @property {Map} can-types.DefaultMap DefaultMap
	 *
	 * @option {Map}
	 *
	 *   The default map type to create if a map is needed.  If both [can-map] and [can-define/map/map]
	 *   are imported, the default type will be [can-define/map/map].
	 */
	DefaultMap: null,
	/**
	 * @property {can-connect.List} can-types.DefaultList DefaultList
	 *
	 * @option {can-connect.List}
	 *
	 *   The default list type to create if a list is needed. If both [can-list] and [can-define/list/list]
	 *   are imported, the default type will be [can-define/list/list].
	 */
	DefaultList: null,
	/**
	 * @function can-types.queueTask queueTask
	 * @signature `types.queueTask(task)`
	 *   Run code that will be queued at the end of the current batch.
	 *   @param {Array} task
	 */
	queueTask: function(task){
		var args = task[2] || [];
		task[0].apply(task[1], args);
	},
	/**
	 * @function can-types.wrapElement wrapElement
	 * @signature `types.wrapElement(element)`
	 *   Wraps an element into an object useful by DOM libraries ala jQuery.
	 *
	 *   @param {Node} element Any object inheriting from the [Node interface](https://developer.mozilla.org/en-US/docs/Web/API/Node).
	 *   @return {{}} A wrapped object.
	 */
	wrapElement: function(element){
		return element;
	},
	/**
	 * @function can-types.unwrapElement unwrapElement
	 * @signature `types.unwrapElement(object)`
	 *   Unwraps an object that contains an element within.
	 *
	 *   @param {{}} object Any object that can be unwrapped into a Node.
	 *   @return {Node} A Node.
	 */
	unwrapElement: function(element){
		return element;
	}
};

if (namespace.types) {
	throw new Error("You can't have two versions of can-types, check your dependencies");
} else {
	module.exports = namespace.types = types;
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var parser = __webpack_require__(49);
var domEvents = __webpack_require__(13);
var nodeLists = __webpack_require__(20);
var makeFrag = __webpack_require__(36);
var childNodes = __webpack_require__(18);
var canReflect = __webpack_require__(0);

__webpack_require__(143);

var childMutationCallbacks = {};


/**
 * @module {{}} can-view-live can-view-live
 * @parent can-views
 * @collection can-infrastructure
 * @package ../package.json
 *
 * Setup live-binding between the DOM and a compute manually.
 *
 * @option {Object} An object with the live-binding methods:
 * [can-view-live.html], [can-view-live.list], [can-view-live.text], and
 * [can-view-live.attr].
 *
 * @release 2.0.4
 *
 * @body
 *
 * ## Use
 *
 *  [can-view-live] is an object with utility methods for setting up
 *  live-binding in relation to different parts of the DOM and DOM elements.  For
 *  example, to make an `<h2>`'s text stay live with
 *  a compute:
 *
 *  ```js
 *  var live = require("can-view-live");
 *  var text = canCompute("Hello World");
 *  var textNode = $("h2").text(" ")[0].childNodes[0];
 *  live.text(textNode, text);
 *  ```
 *
 */
var live = {
	setup: function (el, bind, unbind) {
		// #### setup
		// Setup a live listener on an element that binds now,
		//  but unbinds when an element is no longer in the DOM 
		var tornDown = false,
			teardown = function () {
				// Removing an element can call teardown which
				// unregister the nodeList which calls teardown
				if (!tornDown) {
					tornDown = true;
					unbind(data);
					domEvents.removeEventListener.call(el, 'removed', teardown);
				}
				return true;
			}, data = {
				teardownCheck: function (parent) {
					return parent ? false : teardown();
				}
			};
		domEvents.addEventListener.call(el, 'removed', teardown);
		bind(data);
		return data;
	},
	// #### listen
	// Calls setup, but presets bind and unbind to
	// operate on a compute
	listen: function (el, compute, change) {
		return live.setup(el, function () {
			canReflect.onValue(compute, change);
			//compute.computeInstance.addEventListener('change', change);
		}, function (data) {
			canReflect.offValue(compute, change);
			//compute.computeInstance.removeEventListener('change', change);
			if (data.nodeList) {
				nodeLists.unregister(data.nodeList);
			}
		});
	},
	// #### getAttributeParts
	// Breaks up a string like foo='bar' into an object of {"foo": "bar"} pairs
	// See can-view-parser for more about attrStart/attrEnd/attrValue
	getAttributeParts: function (newVal) {
		var attrs = {},
			attr;
		parser.parseAttrs(newVal,{
			attrStart: function(name){
				attrs[name] = "";
				attr = name;
			},
			attrValue: function(value){
				attrs[attr] += value;
			},
			attrEnd: function(){}
		});
		return attrs;
	},
	// #### isNode
	// Checks a possible node object for the nodeType property
	isNode: function(obj){
		return obj && obj.nodeType;
	},
	// #### addTextNodeIfNoChildren
	// Append an empty text node to a parent with no children;
	//  do nothing if the parent already has children.
	addTextNodeIfNoChildren: function(frag){
		if(!frag.firstChild) {
			frag.appendChild(frag.ownerDocument.createTextNode(""));
		}
	},
	// #### registerChildMutationCallback
	// Getter/setter for mutation callbacks
	registerChildMutationCallback: function(tag, callback){
		if(callback) {
			childMutationCallbacks[tag] = callback;
		} else {
			return childMutationCallbacks[tag];
		}
	},
	callChildMutationCallback: function(el) {
		var callback = el && childMutationCallbacks[el.nodeName.toLowerCase()];
		if(callback) {
			callback(el);
		}
	},


	/**
	 * @function can.view.live.replace
	 * @parent can.view.live
	 * @release 2.0.4
	 * @hide
	 *
	 * Replaces one element with some content while keeping [can.view.live.nodeLists nodeLists] data
	 * correct.
	 *
	 * @param {Array.<HTMLElement>} nodes An array of elements.  There should typically be one element.
	 * @param {String|HTMLElement|DocumentFragment} val The content that should replace
	 * `nodes`.  If a string is passed, it will be [can.view.hookup hookedup].
	 *
	 * @param {function} [teardown] A callback if these elements are torn down.
	 */
	replace: function (nodes, val, teardown) {
		// #### replace
		// Replaces one element with some content while keeping nodeLists data
		// correct.
		// 
		// Take a copy of old nodeList
		var oldNodes = nodes.slice(0),
			frag = makeFrag(val);
		// Register a teardown callback
		nodeLists.register(nodes, teardown);
		// Mark each node as belonging to the node list.
		nodeLists.update(nodes, childNodes(frag));
		// Replace old nodes with new on the DOM
		nodeLists.replace(oldNodes, frag);
		return nodes;
	},
	// #### getParentNode
	// Return default parent if el is a fragment, el's parent otherwise
	getParentNode: function (el, defaultParentNode) {
		return defaultParentNode && el.parentNode.nodeType === 11 ? defaultParentNode : el.parentNode;
	},
	// #### makeString
	// any -> string converter (including nullish)
	makeString: function(txt){
		return txt == null ? "" : ""+txt;
	}
};

module.exports = live;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module {function} can-util/js/is-function/is-function is-function
 * @parent can-util/js
 *
 * @signature `isFunction(value)`
 *
 * @param {*} value the item to test for being a function
 * @return {Boolean} True if the provided argument is a function.
 *
 * ```js
 * var isFunction = require("can-util/js/is-function/is-function");
 *
 * console.log(isFunction(function(){})); // -> true
 *
 * console.log(isFunction({})); // -> false
 * ```
 *
 */
var isFunction = (function() {
	if (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') {
		return function(value) {
			return Object.prototype.toString.call(value) === '[object Function]';
		};
	}
	return function(value) {
		return typeof value === 'function';
	};
}());

module.exports = isFunction;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var namespace = __webpack_require__(2);
var Globals = __webpack_require__(116);
var globals = new Globals();

if (namespace.globals) {
	throw new Error("You can't have two versions of can-globals, check your dependencies");
} else {
	module.exports = namespace.globals = globals;
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var canSymbol = __webpack_require__(1);
var helpers = __webpack_require__(64);

var plainFunctionPrototypePropertyNames = Object.getOwnPropertyNames((function(){}).prototype);
var plainFunctionPrototypeProto = Object.getPrototypeOf( (function(){}).prototype );
/**
 * @function can-reflect.isConstructorLike isConstructorLike
 * @parent can-reflect/type
 *
 * @description Test if a value looks like a constructor function.
 *
 * @signature `isConstructorLike(func)`
 *
 * Return `true` if `func` is a function and has a non-empty prototype, or implements
 *  [can-symbol/symbols/new `@@@@can.new`]; `false` otherwise.
 *
 * ```
 * canReflect.isConstructorLike(function() {}); // -> false
 *
 * function Construct() {}
 * Construct.prototype = { foo: "bar" };
 * canReflect.isConstructorLike(Construct); // -> true
 *
 * canReflect.isConstructorLike({}); // -> false
 * !!canReflect.isConstructorLike({ [canSymbol.for("can.new")]: function() {} }); // -> true
 * ```
 *
 * @param  {*}  func maybe a function
 * @return {Boolean} `true` if a constructor; `false` if otherwise.
 */
function isConstructorLike(func){
	/* jshint unused: false */
	// if you can new it ... it's a constructor
	var value = func[canSymbol.for("can.new")];
	if(value !== undefined) {
		return value;
	}

	if(typeof func !== "function") {
		return false;
	}
	// If there are any properties on the prototype that don't match
	// what is normally there, assume it's a constructor
	var prototype = func.prototype;
	if(!prototype) {
		return false;
	}
	// Check if the prototype's proto doesn't point to what it normally would.
	// If it does, it means someone is messing with proto chains
	if( plainFunctionPrototypeProto !== Object.getPrototypeOf( prototype ) ) {
		return true;
	}

	var propertyNames = Object.getOwnPropertyNames(prototype);
	if(propertyNames.length === plainFunctionPrototypePropertyNames.length) {
		for(var i = 0, len = propertyNames.length; i < len; i++) {
			if(propertyNames[i] !== plainFunctionPrototypePropertyNames[i]) {
				return true;
			}
		}
		return false;
	} else {
		return true;
	}
}

/**
 * @function can-reflect.isFunctionLike isFunctionLike
 * @parent can-reflect/type
 * @description Test if a value looks like a function.
 * @signature `isFunctionLike(obj)`
 *
 *  Return `true` if `func` is a function, or implements
 *  [can-symbol/symbols/new `@@@@can.new`] or [can-symbol/symbols/apply `@@@@can.apply`]; `false` otherwise.
 *
 * ```
 * canReflect.isFunctionLike(function() {}); // -> true
 * canReflect.isFunctionLike({}); // -> false
 * canReflect.isFunctionLike({ [canSymbol.for("can.apply")]: function() {} }); // -> true
 * ```
 *
 * @param  {*}  obj maybe a function
 * @return {Boolean}
 */
var getNewOrApply = helpers.makeGetFirstSymbolValue(["can.new","can.apply"]);
function isFunctionLike(obj){
	var result,
		symbolValue = obj[canSymbol.for("can.isFunctionLike")];

	if (symbolValue !== undefined) {
		return symbolValue;
	}

	result = getNewOrApply(obj);
	if(result !== undefined) {
		return !!result;
	}

	return typeof obj === "function";
}

/**
 * @function can-reflect.isPrimitive isPrimitive
 * @parent can-reflect/type
 * @description Test if a value is a JavaScript primitive.
 * @signature `isPrimitive(obj)`
 *
 * Return `true` if `obj` is not a function nor an object via `typeof`, or is null; `false` otherwise.
 *
 * ```
 * canReflect.isPrimitive(null); // -> true
 * canReflect.isPrimitive({}); // -> false
 * canReflect.isPrimitive(undefined); // -> true
 * canReflect.isPrimitive(1); // -> true
 * canReflect.isPrimitive([]); // -> false
 * canReflect.isPrimitive(function() {}); // -> false
 * canReflect.isPrimitive("foo"); // -> true
 *
 * ```
 *
 * @param  {*}  obj maybe a primitive value
 * @return {Boolean}
 */
function isPrimitive(obj){
	var type = typeof obj;
	if(obj == null || (type !== "function" && type !== "object") ) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * @function can-reflect.isBuiltIn isBuiltIn
 * @parent can-reflect/type
 * @description Test if a value is a JavaScript built-in type.
 * @signature `isBuiltIn(obj)`
 *
 * Return `true` if `obj` is some type of JavaScript native built-in; `false` otherwise.
 *
 * ```
 * canReflect.isBuiltIn(null); // -> true
 * canReflect.isBuiltIn({}); // -> true
 * canReflect.isBuiltIn(1); // -> true
 * canReflect.isBuiltIn([]); // -> true
 * canReflect.isBuiltIn(function() {}); // -> true
 * canReflect.isBuiltIn("foo"); // -> true
 * canReflect.isBuiltIn(new Date()); // -> true
 * canReflect.isBuiltIn(/[foo].[bar]/); // -> true
 * canReflect.isBuiltIn(new DefineMap); // -> false
 *
 * ```
 *
 * Not supported in browsers that have implementations of Map/Set where
 * `toString` is not properly implemented to return `[object Map]`/`[object Set]`.
 *
 * @param  {*}  obj maybe a built-in value
 * @return {Boolean}
 */
function isBuiltIn(obj) {

	// If primitive, array, or POJO return true. Also check if
	// it is not a POJO but is some type like [object Date] or
	// [object Regex] and return true.
	if (isPrimitive(obj) ||
		Array.isArray(obj) ||
		isPlainObject(obj) ||
		(Object.prototype.toString.call(obj) !== '[object Object]' &&
			Object.prototype.toString.call(obj).indexOf('[object ') !== -1)) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * @function can-reflect.isValueLike isValueLike
 * @parent can-reflect/type
 * @description Test if a value represents a single value (as opposed to several values).
 *
 * @signature `isValueLike(obj)`
 *
 * Return `true` if `obj` is a primitive or implements [can-symbol/symbols/getValue `@@can.getValue`],
 * `false` otherwise.
 *
 * ```
 * canReflect.isValueLike(null); // -> true
 * canReflect.isValueLike({}); // -> false
 * canReflect.isValueLike(function() {}); // -> false
 * canReflect.isValueLike({ [canSymbol.for("can.isValueLike")]: true}); // -> true
 * canReflect.isValueLike({ [canSymbol.for("can.getValue")]: function() {} }); // -> true
 * canReflect.isValueLike(canCompute()); // -> true
 * canReflect.isValueLike(new DefineMap()); // -> false
 *
 * ```
 *
 * @param  {*}  obj maybe a primitive or an object that yields a value
 * @return {Boolean}
 */
function isValueLike(obj) {
	var symbolValue;
	if(isPrimitive(obj)) {
		return true;
	}
	symbolValue = obj[canSymbol.for("can.isValueLike")];
	if( typeof symbolValue !== "undefined") {
		return symbolValue;
	}
	var value = obj[canSymbol.for("can.getValue")];
	if(value !== undefined) {
		return !!value;
	}
}

/**
 * @function can-reflect.isMapLike isMapLike
 * @parent can-reflect/type
 *
 * @description Test if a value represents multiple values.
 *
 * @signature `isMapLike(obj)`
 *
 * Return `true` if `obj` is _not_ a primitive, does _not_ have a falsy value for
 * [can-symbol/symbols/isMapLike `@@@@can.isMapLike`], or alternately implements
 * [can-symbol/symbols/getKeyValue `@@@@can.getKeyValue`]; `false` otherwise.
 *
 * ```
 * canReflect.isMapLike(null); // -> false
 * canReflect.isMapLike(1); // -> false
 * canReflect.isMapLike("foo"); // -> false
 * canReflect.isMapLike({}); // -> true
 * canReflect.isMapLike(function() {}); // -> true
 * canReflect.isMapLike([]); // -> false
 * canReflect.isMapLike({ [canSymbol.for("can.isMapLike")]: false }); // -> false
 * canReflect.isMapLike({ [canSymbol.for("can.getKeyValue")]: null }); // -> false
 * canReflect.isMapLike(canCompute()); // -> false
 * canReflect.isMapLike(new DefineMap()); // -> true
 *
 * ```
 *
 * @param  {*}  obj maybe a Map-like
 * @return {Boolean}
 */
function isMapLike(obj) {
	if(isPrimitive(obj)) {
		return false;
	}
	var isMapLike = obj[canSymbol.for("can.isMapLike")];
	if(typeof isMapLike !== "undefined") {
		return !!isMapLike;
	}
	var value = obj[canSymbol.for("can.getKeyValue")];
	if(value !== undefined) {
		return !!value;
	}
	// everything else in JS is MapLike
	return true;
}

/**
 * @function can-reflect.isObservableLike isObservableLike
 * @parent can-reflect/type
 * @description Test if a value (or its keys) can be observed for changes.
 *
 * @signature `isObservableLike(obj)`
 *
 * Return  `true` if `obj` is _not_ a primitive and implements any of
 * [can-symbol/symbols/onValue `@@@@can.onValue`], [can-symbol/symbols/onKeyValue `@@@@can.onKeyValue`], or
 * [can-symbol/symbols/onPatches `@@@@can.onKeys`]; `false` otherwise.
 *
 * ```
 * canReflect.isObservableLike(null); // -> false
 * canReflect.isObservableLike({}); // -> false
 * canReflect.isObservableLike([]); // -> false
 * canReflect.isObservableLike(function() {}); // -> false
 * canReflect.isObservableLike({ [canSymbol.for("can.onValue")]: function() {} }); // -> true
 * canReflect.isObservableLike({ [canSymbol.for("can.onKeyValue")]: function() {} }); // -> true
 * canReflect.isObservableLike(canCompute())); // -> true
 * canReflect.isObservableLike(new DefineMap())); // -> true
 * ```
 *
 * @param  {*}  obj maybe an observable
 * @return {Boolean}
 */

// Specially optimized
var onValueSymbol = canSymbol.for("can.onValue"),
	onKeyValueSymbol = canSymbol.for("can.onKeyValue"),
	onPatchesSymbol = canSymbol.for("can.onPatches");
function isObservableLike( obj ) {
	if(isPrimitive(obj)) {
		return false;
	}
	return Boolean(obj[onValueSymbol] || obj[onKeyValueSymbol] || obj[onPatchesSymbol]);
}

/**
 * @function can-reflect.isListLike isListLike
 * @parent can-reflect/type
 *
 * @description Test if a value looks like a constructor function.
 *
 * @signature `isListLike(list)`
 *
 * Return `true` if `list` is a `String`, <br>OR `list` is _not_ a primitive and implements `@@@@iterator`,
 * <br>OR `list` is _not_ a primitive and returns `true` for `Array.isArray()`, <br>OR `list` is _not_ a primitive and has a
 * numerical length and is either empty (`length === 0`) or has a last element at index `length - 1`; <br>`false` otherwise
 *
 * ```
 * canReflect.isListLike(null); // -> false
 * canReflect.isListLike({}); // -> false
 * canReflect.isListLike([]); // -> true
 * canReflect.isListLike("foo"); // -> true
 * canReflect.isListLike(1); // -> false
 * canReflect.isListLike({ [canSymbol.for("can.isListLike")]: true }); // -> true
 * canReflect.isListLike({ [canSymbol.iterator]: function() {} }); // -> true
 * canReflect.isListLike({ length: 0 }); // -> true
 * canReflect.isListLike({ length: 3 }); // -> false
 * canReflect.isListLike({ length: 3, "2": true }); // -> true
 * canReflect.isListLike(new DefineMap()); // -> false
 * canReflect.isListLike(new DefineList()); // -> true
 * ```
 *
 * @param  {*}  list maybe a List-like
 * @return {Boolean}
 */
function isListLike( list ) {
	var symbolValue,
		type = typeof list;
	if(type === "string") {
		return true;
	}
	if( isPrimitive(list) ) {
		return false;
	}
	symbolValue = list[canSymbol.for("can.isListLike")];
	if( typeof symbolValue !== "undefined") {
		return symbolValue;
	}
	var value = list[canSymbol.iterator];
	if(value !== undefined) {
		return !!value;
	}
	if(Array.isArray(list)) {
		return true;
	}
	return helpers.hasLength(list);
}

/**
 * @function can-reflect.isSymbolLike isSymbolLike
 * @parent can-reflect/type
 *
 * @description Test if a value is a symbol or a [can-symbol].
 *
 * @signature `isSymbolLike(symbol)`
 *
 * Return `true` if `symbol` is a native Symbol, or evaluates to a String with a prefix
 * equal to that of CanJS's symbol polyfill; `false` otherwise.
 *
 * ```
 * /* ES6 *\/ canReflect.isSymbolLike(Symbol.iterator); // -> true
 * canReflect.isSymbolLike(canSymbol.for("foo")); // -> true
 * canReflect.isSymbolLike("@@symbol.can.isSymbol"); // -> true (due to polyfill for non-ES6)
 * canReflect.isSymbolLike("foo"); // -> false
 * canReflect.isSymbolLike(null); // -> false
 * canReflect.isSymbolLike(1); // -> false
 * canReflect.isSymbolLike({}); // -> false
 * canReflect.isSymbolLike({ toString: function() { return "@@symbol.can.isSymbol"; } }); // -> true
 * ```
 *
 * @param  {*}  symbol maybe a symbol
 * @return {Boolean}
 */

var supportsSymbols = typeof Symbol !== "undefined" && typeof Symbol.for === "function";
var isSymbolLike;
if(supportsSymbols) {
	isSymbolLike = function(symbol) {
		return typeof symbol === "symbol";
	};
} else {
	var symbolStart = "@@symbol";
	isSymbolLike = function(symbol) {
		if(typeof symbol === "object" && !Array.isArray(symbol)){
			return symbol.toString().substr(0, symbolStart.length) === symbolStart;
		} else {
			return false;
		}
	};
}

var coreHasOwn = Object.prototype.hasOwnProperty;
var funcToString = Function.prototype.toString;
var objectCtorString = funcToString.call(Object);

function isPlainObject(obj) {
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if (!obj || typeof obj !== 'object' ) {
		return false;
	}
	var proto = Object.getPrototypeOf(obj);
	if(proto === Object.prototype || proto === null) {
		return true;
	}
	// partially inspired by lodash: https://github.com/lodash/lodash
	var Constructor = coreHasOwn.call(proto, 'constructor') && proto.constructor;
	return typeof Constructor === 'function' && Constructor instanceof Constructor &&
    	funcToString.call(Constructor) === objectCtorString;
}

module.exports = {
	isConstructorLike: isConstructorLike,
	isFunctionLike: isFunctionLike,
	isListLike: isListLike,
	isMapLike: isMapLike,
	isObservableLike: isObservableLike,
	isPrimitive: isPrimitive,
	isBuiltIn: isBuiltIn,
	isValueLike: isValueLike,
	isSymbolLike: isSymbolLike,
	/**
	 * @function can-reflect.isMoreListLikeThanMapLike isMoreListLikeThanMapLike
	 * @parent can-reflect/type
	 *
	 * @description Test if a value should be treated as a list instead of a map.
	 *
	 * @signature `isMoreListLikeThanMapLike(obj)`
	 *
	 * Return  `true` if `obj` is an Array, declares itself to be more ListLike with
	 * `@@@@can.isMoreListLikeThanMapLike`, or self-reports as ListLike but not as MapLike; `false` otherwise.
	 *
	 * ```
	 * canReflect.isMoreListLikeThanMapLike([]); // -> true
	 * canReflect.isMoreListLikeThanMapLike(null); // -> undefined
	 * canReflect.isMoreListLikeThanMapLike({}); // -> false
	 * canReflect.isMoreListLikeThanMapLike(new DefineList()); // -> true
	 * canReflect.isMoreListLikeThanMapLike(new DefineMap()); // -> false
	 * canReflect.isMoreListLikeThanMapLike(function() {}); // -> false
	 * ```
	 *
	 * @param  {Object}  obj the object to test for ListLike against MapLike traits.
	 * @return {Boolean}
	 */
	isMoreListLikeThanMapLike: function(obj){
		if(Array.isArray(obj)) {
			return true;
		}
		if(obj instanceof Array) {
			return true;
		}
		var value = obj[canSymbol.for("can.isMoreListLikeThanMapLike")];
		if(value !== undefined) {
			return value;
		}
		var isListLike = this.isListLike(obj),
			isMapLike = this.isMapLike(obj);
		if(isListLike && !isMapLike) {
			return true;
		} else if(!isListLike && isMapLike) {
			return false;
		}
	},
	/**
	 * @function can-reflect.isIteratorLike isIteratorLike
	 * @parent can-reflect/type
	 * @description Test if a value looks like an iterator.
	 * @signature `isIteratorLike(obj)`
	 *
	 * Return `true` if `obj` has a key `"next"` pointing to a zero-argument function; `false` otherwise
	 *
	 * ```
	 * canReflect.isIteratorLike([][Symbol.iterator]()); // -> true
	 * canReflect.isIteratorLike(new DefineList()[canSymbol.iterator]()); // -> true
	 * canReflect.isIteratorLike(new DefineMap()[canSymbol.iterator]()); // -> true
	 * canReflect.isIteratorLike(null); // -> false
	 * canReflect.isIteratorLike({ next: function() {} }); // -> true
	 * canReflect.isIteratorLike({ next: function(foo) {} }); // -> false (iterator nexts do not take arguments)
	 * ```
	 *
	 * @param  {Object}  obj the object to test for Iterator traits
	 * @return {Boolean}
	 */
	isIteratorLike: function(obj){
		return obj &&
			typeof obj === "object" &&
			typeof obj.next === "function" &&
			obj.next.length === 0;
	},
	/**
	 * @function can-reflect.isPromise isPromise
	 * @parent can-reflect/type
	 * @description Test if a value is a promise.
	 *
	 * @signature `isPromise(obj)`
	 *
	 * Return `true` if `obj` is an instance of promise or `.toString` returns `"[object Promise]"`.
	 *
	 * ```
	 * canReflect.isPromise(Promise.resolve()); // -> true
	 * ```
	 *
	 * @param  {*}  obj the object to test for Promise traits.
	 * @return {Boolean}
	 */
	isPromise: function(obj){
		return (obj instanceof Promise || (Object.prototype.toString.call(obj) === '[object Promise]'));
	},
	/**
	 * @function can-reflect.isPlainObject isPlainObject
	 * @parent can-reflect/type
	 * @description Test if a value is an object created with `{}` or `new Object()`.
	 *
	 * @signature `isPlainObject(obj)`
	 *
	 * Attempts to determine if an object is a plain object like those you would create using the curly braces syntax: `{}`. The following are not plain objects:
	 *
	 * 1. Objects with prototypes (created using the `new` keyword).
	 * 2. Booleans.
	 * 3. Numbers.
	 * 4. NaN.
	 *
	 * ```js
	 * var isPlainObject = require("can-reflect").isPlainObject;
	 *
	 * // Created with {}
	 * console.log(isPlainObject({})); // -> true
	 *
	 * // new Object
	 * console.log(isPlainObject(new Object())); // -> true
	 *
	 * // Custom object
	 * var Ctr = function(){};
	 * var obj = new Ctr();
	 *
	 * console.log(isPlainObject(obj)); // -> false
	 * ```
	 *
	 * @param  {Object}  obj the object to test.
	 * @return {Boolean}
	 */
	isPlainObject: isPlainObject
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domEvents = __webpack_require__(13);

/**
 * @module {function} can-util/dom/dispatch/dispatch dispatch
 * @parent can-util/dom
 * @signature `dispatch.call(el, event, args, bubbles)`
 *
 * Dispatch an event on an element.
 *
 * @param {Object|String} event An object specifies options applied to this event.
 * @param {Array} [args] Arguments passed into this event.
 * @param {Boolean} [bubbles=true] Specifies whether this event should bubble (by default it will).
 */

module.exports = function(){
	return domEvents.dispatch.apply(this, arguments);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/*can-stache-key@0.1.2#can-stache-key*/
var Observation = __webpack_require__(4);
var dev = __webpack_require__(5);
var each = __webpack_require__(6);
var canSymbol = __webpack_require__(1);
var canReflect = __webpack_require__(0);
var isPromiseLike = __webpack_require__(128);
var canReflectPromise = __webpack_require__(129);
var getValueSymbol = canSymbol.for('can.getValue');
var setValueSymbol = canSymbol.for('can.setValue');
var isValueLikeSymbol = canSymbol.for('can.isValueLike');
var observeReader;
var isAt = function (index, reads) {
    var prevRead = reads[index - 1];
    return prevRead && prevRead.at;
};
var readValue = function (value, index, reads, options, state, prev) {
    var usedValueReader;
    do {
        usedValueReader = false;
        for (var i = 0, len = observeReader.valueReaders.length; i < len; i++) {
            if (observeReader.valueReaders[i].test(value, index, reads, options)) {
                value = observeReader.valueReaders[i].read(value, index, reads, options, state, prev);
            }
        }
    } while (usedValueReader);
    return value;
};
var specialRead = {
    index: true,
    key: true,
    event: true,
    element: true,
    viewModel: true
};
var checkForObservableAndNotify = function (options, state, getObserves, value, index) {
    if (options.foundObservable && !state.foundObservable) {
        if (Observation.trapsCount()) {
            Observation.addAll(getObserves());
            options.foundObservable(value, index);
            state.foundObservable = true;
        }
    }
};
observeReader = {
    read: function (parent, reads, options) {
        options = options || {};
        var state = { foundObservable: false };
        var getObserves;
        if (options.foundObservable) {
            getObserves = Observation.trap();
        }
        var cur = readValue(parent, 0, reads, options, state), type, prev, readLength = reads.length, i = 0, last;
        checkForObservableAndNotify(options, state, getObserves, parent, 0);
        while (i < readLength) {
            prev = cur;
            for (var r = 0, readersLength = observeReader.propertyReaders.length; r < readersLength; r++) {
                var reader = observeReader.propertyReaders[r];
                if (reader.test(cur)) {
                    cur = reader.read(cur, reads[i], i, options, state);
                    break;
                }
            }
            checkForObservableAndNotify(options, state, getObserves, prev, i);
            last = cur;
            i = i + 1;
            cur = readValue(cur, i, reads, options, state, prev);
            checkForObservableAndNotify(options, state, getObserves, prev, i - 1);
            type = typeof cur;
            if (i < reads.length && (cur === null || cur === undefined)) {
                if (options.earlyExit) {
                    options.earlyExit(prev, i - 1, cur);
                }
                return {
                    value: undefined,
                    parent: prev
                };
            }
        }
        if (cur === undefined) {
            if (options.earlyExit) {
                options.earlyExit(prev, i - 1);
            }
        }
        return {
            value: cur,
            parent: prev
        };
    },
    get: function (parent, reads, options) {
        return observeReader.read(parent, observeReader.reads(reads), options || {}).value;
    },
    valueReadersMap: {},
    valueReaders: [
        {
            name: 'function',
            test: function (value) {
                return value && canReflect.isFunctionLike(value) && !canReflect.isConstructorLike(value);
            },
            read: function (value, i, reads, options, state, prev) {
                if (isAt(i, reads)) {
                    return i === reads.length ? value.bind(prev) : value;
                }
                if (options.callMethodsOnObservables && canReflect.isObservableLike(prev) && canReflect.isMapLike(prev)) {
                    return value.apply(prev, options.args || []);
                } else if (options.isArgument && i === reads.length) {
                    if (options.proxyMethods === false) {
                        return value;
                    }
                    return value.bind(prev);
                }
                return value.apply(prev, options.args || []);
            }
        },
        {
            name: 'isValueLike',
            test: function (value, i, reads, options) {
                return value && value[getValueSymbol] && value[isValueLikeSymbol] !== false && (options.foundAt || !isAt(i, reads));
            },
            read: function (value, i, reads, options) {
                if (options.readCompute === false && i === reads.length) {
                    return value;
                }
                return canReflect.getValue(value);
            },
            write: function (base, newVal) {
                if (base[setValueSymbol]) {
                    base[setValueSymbol](newVal);
                } else if (base.set) {
                    base.set(newVal);
                } else {
                    base(newVal);
                }
            }
        }
    ],
    propertyReadersMap: {},
    propertyReaders: [
        {
            name: 'map',
            test: function (value) {
                if (isPromiseLike(value) || typeof value === 'object' && value && typeof value.then === 'function') {
                    canReflectPromise(value);
                }
                return canReflect.isObservableLike(value) && canReflect.isMapLike(value);
            },
            read: function (value, prop) {
                var res = canReflect.getKeyValue(value, prop.key);
                if (res !== undefined) {
                    return res;
                } else {
                    return value[prop.key];
                }
            },
            write: canReflect.setKeyValue
        },
        {
            name: 'object',
            test: function () {
                return true;
            },
            read: function (value, prop, i, options) {
                if (value == null) {
                    return undefined;
                } else {
                    if (typeof value === 'object') {
                        if (prop.key in value) {
                            return value[prop.key];
                        } else if (prop.at && specialRead[prop.key] && '@' + prop.key in value) {
                            options.foundAt = true;
                            return value['@' + prop.key];
                        }
                    } else {
                        return value[prop.key];
                    }
                }
            },
            write: function (base, prop, newVal) {
                base[prop] = newVal;
            }
        }
    ],
    reads: function (keyArg) {
        var key = '' + keyArg;
        var keys = [];
        var last = 0;
        var at = false;
        if (key.charAt(0) === '@') {
            last = 1;
            at = true;
        }
        var keyToAdd = '';
        for (var i = last; i < key.length; i++) {
            var character = key.charAt(i);
            if (character === '.' || character === '@') {
                if (key.charAt(i - 1) !== '\\') {
                    keys.push({
                        key: keyToAdd,
                        at: at
                    });
                    at = character === '@';
                    keyToAdd = '';
                } else {
                    keyToAdd = keyToAdd.substr(0, keyToAdd.length - 1) + '.';
                }
            } else {
                keyToAdd += character;
            }
        }
        keys.push({
            key: keyToAdd,
            at: at
        });
        return keys;
    },
    write: function (parent, key, value, options) {
        var keys = typeof key === 'string' ? observeReader.reads(key) : key;
        var last;
        options = options || {};
        if (keys.length > 1) {
            last = keys.pop();
            parent = observeReader.read(parent, keys, options).value;
            keys.push(last);
        } else {
            last = keys[0];
        }
        if (observeReader.valueReadersMap.isValueLike.test(parent[last.key], keys.length - 1, keys, options)) {
            observeReader.valueReadersMap.isValueLike.write(parent[last.key], value, options);
        } else {
            if (observeReader.valueReadersMap.isValueLike.test(parent, keys.length - 1, keys, options)) {
                parent = parent[getValueSymbol]();
            }
            if (observeReader.propertyReadersMap.map.test(parent)) {
                observeReader.propertyReadersMap.map.write(parent, last.key, value, options);
            } else if (observeReader.propertyReadersMap.object.test(parent)) {
                observeReader.propertyReadersMap.object.write(parent, last.key, value, options);
                if (options.observation) {
                    options.observation.update();
                }
            }
        }
    }
};
each(observeReader.propertyReaders, function (reader) {
    observeReader.propertyReadersMap[reader.name] = reader;
});
each(observeReader.valueReaders, function (reader) {
    observeReader.valueReadersMap[reader.name] = reader;
});
observeReader.set = observeReader.write;
module.exports = observeReader;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// # can/util/attr.js
// Central location for attribute changing to occur, used to trigger an
// `attributes` event on elements. This enables the user to do (jQuery example): `$(el).bind("attributes", function(ev) { ... })` where `ev` contains `attributeName` and `oldValue`.
var setImmediate = __webpack_require__(73);
var getDocument = __webpack_require__(9);
var global = __webpack_require__(17)();
var isOfGlobalDocument = __webpack_require__(50);
var setData = __webpack_require__(22);
var domContains = __webpack_require__(74);
var domEvents = __webpack_require__(13);
var domDispatch = __webpack_require__(30);
var getMutationObserver = __webpack_require__(23);
var each = __webpack_require__(6);
var types = __webpack_require__(25);
var diff = __webpack_require__(76);

__webpack_require__(137);
__webpack_require__(138);

var namespaces = {
	'xlink': 'http://www.w3.org/1999/xlink'
};

var formElements = {"INPUT": true, "TEXTAREA": true, "SELECT": true},
	// Used to convert values to strings.
	toString = function(value){
		if(value == null) {
			return "";
		} else {
			return ""+value;
		}
	},
	isSVG = function(el){
		return el.namespaceURI === "http://www.w3.org/2000/svg";
	},
	truthy = function() { return true; },
	getSpecialTest = function(special){
		return (special && special.test) || truthy;
	},
	propProp = function(prop, obj){
		obj = obj || {};
		obj.get = function(){
			return this[prop];
		};
		obj.set = function(value){
			if(this[prop] !== value) {
				this[prop] = value;
			}
			return value;
		};
		return obj;
	},
	booleanProp = function(prop){
		return {
			isBoolean: true,
			set: function(value){
				if(prop in this) {
					this[prop] = value !== false;
				} else {
					this.setAttribute(prop, "");
				}
			},
			remove: function(){
				this[prop] = false;
			}
		};
	},
	setupMO = function(el, callback){
		var attrMO = setData.get.call(el, "attrMO");
		if(!attrMO) {
			var onMutation = function(){
				callback.call(el);
			};
			var MO = getMutationObserver();
			if(MO) {
				var observer = new MO(onMutation);
				observer.observe(el, {
					childList: true,
					subtree: true
				});
				setData.set.call(el, "attrMO", observer);
			} else {
				setData.set.call(el, "attrMO", true);
				setData.set.call(el, "canBindingCallback", {onMutation: onMutation});
			}
		}
	},
	_findOptionToSelect = function (parent, value) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === 'OPTION' && value === child.value) {
				return child;
			}
			if (child.nodeName === 'OPTGROUP') {
				var groupChild = _findOptionToSelect(child, value);
				if (groupChild) {
					return groupChild;
				}
			}
			child = child.nextSibling;
		}
	},
	setChildOptions = function(el, value){
		var option;
		if (value != null) {
			option = _findOptionToSelect(el, value);
		}
		if (option) {
			option.selected = true;
		} else {
			el.selectedIndex = -1;
		}
	},
	forEachOption = function (parent, fn) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === 'OPTION') {
				fn(child);
			}
			if (child.nodeName === 'OPTGROUP') {
				forEachOption(child, fn);
			}
			child = child.nextSibling;
		}
	},
	collectSelectedOptions = function (parent) {
		var selectedValues = [];
		forEachOption(parent, function (option) {
			if (option.selected) {
				selectedValues.push(option.value);
			}
		});
		return selectedValues;
	},
	markSelectedOptions = function (parent, values) {
		forEachOption(parent, function (option) {
			option.selected = values.indexOf(option.value) !== -1;
		});
	},
	// Create a handler, only once, that will set the child options any time
	// the select's value changes.
	setChildOptionsOnChange = function(select, aEL){
		var handler = setData.get.call(select, "attrSetChildOptions");
		if(handler) {
			return Function.prototype;
		}
		handler = function(){
			setChildOptions(select, select.value);
		};
		setData.set.call(select, "attrSetChildOptions", handler);
		aEL.call(select, "change", handler);
		return function(rEL){
			setData.clean.call(select, "attrSetChildOptions");
			rEL.call(select, "change", handler);
		};
	},
	attr = {
		special: {
			checked: {
				get: function(){
					return this.checked;
				},
				set: function(val){
					// - `set( truthy )` => TRUE
					// - `set( "" )`     => TRUE
					// - `set()`         => TRUE
					// - `set(undefined)` => false.
					var notFalse = !!val || val === "" || arguments.length === 0;
					this.checked = notFalse;
					if(notFalse && this.type === "radio") {
						this.defaultChecked = true;
					}

					return val;
				},
				remove: function(){
					this.checked = false;
				},
				test: function(){
					return this.nodeName === "INPUT";
				}
			},
			"class": {
				get: function(){
					if(isSVG(this)) {
						return this.getAttribute("class");
					}
					return this.className;
				},
				set: function(val){
					val = val || "";

					if(isSVG(this)) {
						this.setAttribute("class", "" + val);
					} else {
						this.className = val;
					}
					return val;
				}
			},
			disabled: booleanProp("disabled"),
			focused: {
				get: function(){
					return this === document.activeElement;
				},
				set: function(val){
					var cur = attr.get(this, 'focused');
					var docEl = this.ownerDocument.documentElement;
					var element = this;
					function focusTask() {
						if (val) {
							element.focus();
						} else {
							element.blur();
						}
					}
					if (cur !== val) {
						if (!domContains.call(docEl, element)) {
							var initialSetHandler = function () {
								domEvents.removeEventListener.call(element, 'inserted', initialSetHandler);
								focusTask();
							};
							domEvents.addEventListener.call(element, 'inserted', initialSetHandler);
						} else {
							types.queueTask([
								focusTask,
								this,
								[]
							]);
						}
					}
					return !!val;
				},
				addEventListener: function(eventName, handler, aEL){
					aEL.call(this, "focus", handler);
					aEL.call(this, "blur", handler);
					return function(rEL){
						rEL.call(this, "focus", handler);
						rEL.call(this, "blur", handler);
					};
				},
				test: function(){
					return this.nodeName === "INPUT";
				}
			},
			"for": propProp("htmlFor"),
			innertext: propProp("innerText"),
			innerhtml: propProp("innerHTML"),
			innerHTML: propProp("innerHTML", {
				addEventListener: function(eventName, handler, aEL){
					var handlers = [];
					var el = this;
					each(["change", "blur"], function(eventName){
						var localHandler = function(){
							handler.apply(this, arguments);
						};
						domEvents.addEventListener.call(el, eventName, localHandler);
						handlers.push([eventName, localHandler]);
					});

					return function(rEL){
						each(handlers, function(info){
							rEL.call(el, info[0], info[1]);
						});
					};
				}
			}),
			required: booleanProp("required"),
			readonly: booleanProp("readOnly"),
			selected: {
				get: function(){
					return this.selected;
				},
				set: function(val){
					val = !!val;
					setData.set.call(this, "lastSetValue", val);
					return this.selected = val;
				},
				addEventListener: function(eventName, handler, aEL){
					var option = this;
					var select = this.parentNode;
					var lastVal = option.selected;
					var localHandler = function(changeEvent){
						var curVal = option.selected;
						lastVal = setData.get.call(option, "lastSetValue") || lastVal;
						if(curVal !== lastVal) {
							lastVal = curVal;

							domDispatch.call(option, eventName);
						}
					};

					var removeChangeHandler = setChildOptionsOnChange(select, aEL);
					domEvents.addEventListener.call(select, "change", localHandler);
					aEL.call(option, eventName, handler);

					return function(rEL){
						removeChangeHandler(rEL);
						domEvents.removeEventListener.call(select, "change", localHandler);
						rEL.call(option, eventName, handler);
					};
				},
				test: function(){
					return this.nodeName === "OPTION" && this.parentNode &&
						this.parentNode.nodeName === "SELECT";
				}
			},
			src: {
				set: function (val) {
					if (val == null || val === "") {
						this.removeAttribute("src");
						return null;
					} else {
						this.setAttribute("src", val);
						return val;
					}
				}
			},
			style: {
				set: (function () {
					var el = global.document && getDocument().createElement('div');
					if ( el && el.style && ("cssText" in el.style) ) {
						return function (val) {
							return this.style.cssText = (val || "");
						};
					} else {
						return function (val) {
							return this.setAttribute("style", val);
						};
					}
				})()
			},
			textcontent: propProp("textContent"),
			value: {
				get: function(){
					var value = this.value;
					if(this.nodeName === "SELECT") {
						if(("selectedIndex" in this) && this.selectedIndex === -1) {
							value = undefined;
						}
					}
					return value;
				},
				set: function(value){
					var nodeName = this.nodeName.toLowerCase();
					if(nodeName === "input") {
						// Do some input types support non string values?
						value = toString(value);
					}
					if(this.value !== value || nodeName === "option") {
						this.value = value;
					}
					if(attr.defaultValue[nodeName]) {
						this.defaultValue = value;
					}
					if(nodeName === "select") {
						setData.set.call(this, "attrValueLastVal", value);
						//If it's null then special case
						setChildOptions(this, value === null ? value : this.value);

						// If not in the document reset the value when inserted.
						var docEl = this.ownerDocument.documentElement;
						if(!domContains.call(docEl, this)) {
							var select = this;
							var initialSetHandler = function(){
								domEvents.removeEventListener.call(select, "inserted", initialSetHandler);
								setChildOptions(select, value === null ? value : select.value);
							};
							domEvents.addEventListener.call(this, "inserted", initialSetHandler);
						}

						// MO handler is only set up **ONCE**
						setupMO(this, function(){
							var value = setData.get.call(this, "attrValueLastVal");
							attr.set(this, "value", value);
							domDispatch.call(this, "change");
						});
					}
					return value;
				},
				test: function(){
					return formElements[this.nodeName];
				}
			},
			values: {
				get: function(){
					return collectSelectedOptions(this);
				},
				set: function(values){
					values = values || [];

					// set new DOM state
					markSelectedOptions(this, values);

					// store new DOM state
					setData.set.call(this, "stickyValues", attr.get(this,"values") );

					// MO handler is only set up **ONCE**
					// TODO: should this be moved into addEventListener?
					setupMO(this, function(){

						// Get the previous sticky state
						var previousValues = setData.get.call(this,
							"stickyValues");

						// Set DOM to previous sticky state
						attr.set(this, "values", previousValues);

						// Get the new result after trying to maintain the sticky state
						var currentValues = setData.get.call(this,
							"stickyValues");

						// If there are changes, trigger a `values` event.
						var changes = diff(previousValues.slice().sort(),
							currentValues.slice().sort());

						if (changes.length) {
							domDispatch.call(this, "values");
						}
					});

					return values;
				},
				addEventListener: function(eventName, handler, aEL){
					var localHandler = function(){
						domDispatch.call(this, "values");
					};

					domEvents.addEventListener.call(this, "change", localHandler);
					aEL.call(this, eventName, handler);

					return function(rEL){
						domEvents.removeEventListener.call(this, "change", localHandler);
						rEL.call(this, eventName, handler);
					};
				}
			}
		},
		// These are elements whos default value we should set.
		defaultValue: {input: true, textarea: true},
		setAttrOrProp: function(el, attrName, val){
			attrName = attrName.toLowerCase();
			var special = attr.special[attrName];
			if(special && special.isBoolean && !val) {
				this.remove(el, attrName);
			} else {
				this.set(el, attrName, val);
			}
		},
		// ## attr.set
		// Set the value an attribute on an element.
		set: function (el, attrName, val) {
			var usingMutationObserver = isOfGlobalDocument(el) && getMutationObserver();
			attrName = attrName.toLowerCase();
			var oldValue;
			// In order to later trigger an event we need to compare the new value to the old value,
			// so here we go ahead and retrieve the old value for browsers that don't have native MutationObservers.
			if (!usingMutationObserver) {
				oldValue = attr.get(el, attrName);
			}

			var newValue;
			var special = attr.special[attrName];
			var setter = special && special.set;
			var test = getSpecialTest(special);

			// First check if this is a special attribute with a setter.
			// Then run the special's test function to make sure we should
			// call its setter, and if so use the setter.
			// Otherwise fallback to setAttribute.
			if(typeof setter === "function" && test.call(el)) {
				// To distinguish calls with explicit undefined, e.g.:
				// - `attr.set(el, "checked")`
				// - `attr.set(el, "checked", undefined)`
				if (arguments.length === 2){
					newValue = setter.call(el);
				} else {
					newValue = setter.call(el, val);
				}
			} else {
				attr.setAttribute(el, attrName, val);
			}

			if (!usingMutationObserver && newValue !== oldValue) {
				attr.trigger(el, attrName, oldValue);
			}
		},
		setSelectValue: function(el, value){
			attr.set(el, "value", value);
		},
		setAttribute: (function(){
			var doc = getDocument();
			if(doc && document.createAttribute) {
				try {
					doc.createAttribute("{}");
				} catch(e) {
					var invalidNodes = {},
						attributeDummy = document.createElement('div');

					return function(el, attrName, val){
						var first = attrName.charAt(0),
							cachedNode,
							node,
							attr;
						if((first === "{" || first === "(" || first === "*") && el.setAttributeNode) {
							cachedNode = invalidNodes[attrName];
							if(!cachedNode) {
								attributeDummy.innerHTML = '<div ' + attrName + '=""></div>';
								cachedNode = invalidNodes[attrName] = attributeDummy.childNodes[0].attributes[0];
							}
							node = cachedNode.cloneNode();
							node.value = val;
							el.setAttributeNode(node);
						} else {
							attr = attrName.split(':');

							if(attr.length !== 1 && namespaces[attr[0]]) {
								el.setAttributeNS(namespaces[attr[0]], attrName, val);
							}
							else {
								el.setAttribute(attrName, val);
							}
						}
					};
				}
			}
			return function(el, attrName, val){
				el.setAttribute(attrName, val);
			};

		})(),
		// ## attr.trigger
		// Used to trigger an "attributes" event on an element. Checks to make sure that someone is listening for the event and then queues a function to be called asynchronously using `setImmediate.
		trigger: function (el, attrName, oldValue) {
			if (setData.get.call(el, "canHasAttributesBindings")) {
				attrName = attrName.toLowerCase();
				return setImmediate(function () {
					domDispatch.call(el, {
						type: "attributes",
						attributeName: attrName,
						target: el,
						oldValue: oldValue,
						bubbles: false
					}, []);
				});
			}
		},
		// ## attr.get
		// Gets the value of an attribute. First checks if the property is an `attr.special` and if so calls the special getter. Otherwise uses `getAttribute` to retrieve the value.
		get: function (el, attrName) {
			attrName = attrName.toLowerCase();

			var special = attr.special[attrName];
			var getter = special && special.get;
			var test = getSpecialTest(special);

			if(typeof getter === "function" && test.call(el)) {
				return getter.call(el);
			} else {
				return el.getAttribute(attrName);
			}
		},
		// ## attr.remove
		// Removes an attribute from an element. First checks attr.special to see if the attribute is special and has a setter. If so calls the setter with `undefined`. Otherwise `removeAttribute` is used.
		// If the attribute previously had a value and the browser doesn't support MutationObservers we then trigger an "attributes" event.
		remove: function (el, attrName) {
			attrName = attrName.toLowerCase();
			var oldValue;
			if (!getMutationObserver()) {
				oldValue = attr.get(el, attrName);
			}

			var special = attr.special[attrName];
			var setter = special && special.set;
			var remover = special && special.remove;
			var test = getSpecialTest(special);

			if(typeof remover === "function" && test.call(el)) {
				remover.call(el);
			} else if(typeof setter === "function" && test.call(el)) {
				setter.call(el, undefined);
			} else {
				el.removeAttribute(attrName);
			}

			if (!getMutationObserver() && oldValue != null) {
				attr.trigger(el, attrName, oldValue);
			}
		},
		// ## attr.has
		// Checks if an element contains an attribute.
		// For browsers that support `hasAttribute`, creates a function that calls hasAttribute, otherwise creates a function that uses `getAttribute` to check that the attribute is not null.
		has: (function () {
			var el = getDocument() && document.createElement('div');
			if (el && el.hasAttribute) {
				return function (el, name) {
					return el.hasAttribute(name);
				};
			} else {
				return function (el, name) {
					return el.getAttribute(name) !== null;
				};
			}
		})()
	};

var oldAddEventListener = domEvents.addEventListener;
domEvents.addEventListener = function(eventName, handler){
	var special = attr.special[eventName];

	if(special && special.addEventListener) {
		var teardown = special.addEventListener.call(this, eventName, handler,
																								oldAddEventListener);
		var teardowns = setData.get.call(this, "attrTeardowns");
		if(!teardowns) {
			setData.set.call(this, "attrTeardowns", teardowns = {});
		}

		if(!teardowns[eventName]) {
			teardowns[eventName] = [];
		}

		teardowns[eventName].push({
			teardown: teardown,
			handler: handler
		});
		return;
	}

	return oldAddEventListener.apply(this, arguments);
};

var oldRemoveEventListener = domEvents.removeEventListener;
domEvents.removeEventListener = function(eventName, handler){
	var special = attr.special[eventName];
	if(special && special.addEventListener) {
		var teardowns = setData.get.call(this, "attrTeardowns");
		if(teardowns && teardowns[eventName]) {
			var eventTeardowns = teardowns[eventName];
			for(var i = 0, len = eventTeardowns.length; i < len; i++) {
				if(eventTeardowns[i].handler === handler) {
					eventTeardowns[i].teardown.call(this, oldRemoveEventListener);
					eventTeardowns.splice(i, 1);
					break;
				}
			}
			if(eventTeardowns.length === 0) {
				delete teardowns[eventName];
			}
		}
		return;
	}
	return oldRemoveEventListener.apply(this, arguments);
};

module.exports = exports = attr;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(arr){
	return arr && arr[arr.length - 1];
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/cid-map/cid-map cid-map
 * @parent deprecated
 * @description Deprecated. Use [can-cid/map/map] instead.
 */

//!steal-remove-start
// canDev.warn('js/cid-map/cid-map is deprecated; please use can-globals instead: https://github.com/canjs/can-cid');
//!steal-remove-end

module.exports = __webpack_require__(69);


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// # can/util/inserted
// Used to alert interested parties of when an element is inserted into the DOM.
// Given a list of elements, check if the first is in the DOM, and if so triggers the `inserted` event on all elements and their descendants.

var makeArray = __webpack_require__(15);
var setImmediate = __webpack_require__(73);
var CID = __webpack_require__(7);

var getMutationObserver = __webpack_require__(23);
var childNodes = __webpack_require__(18);
var domContains = __webpack_require__(74);
var domDispatch = __webpack_require__(30);
var getDocument = __webpack_require__(9);
var domData = __webpack_require__(22);

var mutatedElements;
var checks = {
	inserted: function(root, elem){
		return domContains.call(root, elem);
	},
	removed: function(root, elem){
		return !domContains.call(root, elem);
	}
};

var fireOn = function(elems, root, check, event, dispatched) {
	if (!elems.length) {
		return;
	}
	var children, cid;

	// Go through `elems` and trigger the `inserted` event.
	// If the first element is not in the document (a Document Fragment) it will exit the function.
	// If it is in the document it sets the `inDocument` flag to true. This means that we only check
	// for the first element and either exit the function or start triggering "inserted" for child elements.
	for (var i = 0, elem; (elem = elems[i]) !== undefined; i++) {
		cid = CID(elem);
		// If we've found an element in the document then we can now trigger **"inserted"** for `elem` and all of its children. We are using `getElementsByTagName("*")` so that we grab all of the descendant nodes.
		if (elem.getElementsByTagName && check(root, elem) && !dispatched[cid]) {
			// mark as being dispatched
			dispatched[cid] = true;
			children = makeArray(elem.getElementsByTagName("*"));
			domDispatch.call(elem, event, [], false);
			if (event === "removed") {
				domData.delete.call(elem);
			}

			for (var j = 0, child;
				(child = children[j]) !== undefined; j++) {
				// fire the event only if this hasn't already been fired on.
				cid = CID(child);
				if(!dispatched[cid]) {
					domDispatch.call(child, event, [], false);
					// jshint maxdepth:5
					if (event === "removed") {
						domData.delete.call(child);
					}
					dispatched[cid] = true;
				}
			}
		}
	}
};
//
var fireMutations = function(){
	var mutations = mutatedElements;
	mutatedElements = null;

	var firstElement = mutations[0][1][0];
	var doc = getDocument() || firstElement.ownerDocument || firstElement;
	var root = doc.contains ? doc : doc.documentElement;
	var dispatched = {inserted: {}, removed: {}};
	mutations.forEach(function(mutation){
		fireOn(mutation[1], root, checks[mutation[0]], mutation[0], dispatched[mutation[0]]);
	});
};
var mutated = function(elements, type) {
	if(!getMutationObserver() && elements.length) {
		// make sure this element is in the page (mutated called before something is removed)
		var firstElement = elements[0];
		var doc = getDocument() || firstElement.ownerDocument || firstElement;
		var root = doc.contains ? doc : doc.documentElement;
		if( checks.inserted(root, firstElement) ) {

			// if it is, schedule a mutation fire
			if(!mutatedElements) {
				mutatedElements = [];
				setImmediate(fireMutations);
			}
			mutatedElements.push([type, elements]);
		}
	}
};

/**
 * @module {{}} can-util/dom/mutate/mutate mutate
 * @parent can-util/dom
 * @description Mutate an element by appending, inserting, and removing DOM nodes. Use this so that on the server "inserted" will be fired.
 *
 * ```js
 * var mutate = require("can-util/dom/mutate/mutate");
 *
 * var el = document.createElement("div");
 *
 * el.addEventListener("inserted", function(){
 *   console.log("Inserted was fired!");
 * });
 *
 * mutate.appendChild.call(document.body, el);
 * ```
 */
module.exports = {
	/**
	 * @function can-util/dom/mutate/mutate.appendChild appendChild
	 * @signature `mutate.appendChild.call(el, child)`
	 * Used to append a node to an element and trigger the "inserted" event on all of the newly inserted children. Since `mutated` takes an array we convert the child to an array, or in the case of a DocumentFragment we first convert the childNodes to an array and call inserted on those.
	 */
	appendChild: function(child) {
		if(getMutationObserver()) {
			this.appendChild(child);
		} else {
			var children;
			if (child.nodeType === 11) {
				children = makeArray(childNodes(child));
			} else {
				children = [child];
			}
			this.appendChild(child);
			mutated(children,"inserted");
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.insertBefore insertBefore
	 * @signature `mutate.insertBefore.call(el, ref, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "inserted" event.
	 */
	insertBefore: function(child, ref, document) {
		if(getMutationObserver()) {
			this.insertBefore(child, ref);
		} else {
			var children;
			if (child.nodeType === 11) {
				children = makeArray(childNodes(child));
			} else {
				children = [child];
			}
			this.insertBefore(child, ref);
			mutated(children,"inserted");
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.removeChild removeChild
	 * @signature `mutate.removeChild.call(el, child)`
	 * Like mutate.appendChild, used to insert a node to an element before a reference node and then trigger the "removed" event.
	 */
	removeChild: function(child){
		if(getMutationObserver()) {
			this.removeChild(child);
		} else {
			mutated([child],"removed");
			this.removeChild(child);
		}
	},
	/**
	 * @function can-util/dom/mutate/mutate.replaceChild replaceChild
	 * @signature `mutate.replaceChild.call(el, child)`
	 * Like mutate.appendChild and mutate.removeChild, used to replace a node with another node and trigger "removed" on the removed element and "inserted" on the inserted elements.
	 */
	replaceChild: function(newChild, oldChild){
		if(getMutationObserver()) {
			this.replaceChild(newChild, oldChild);
		} else {
			var children;
			if (newChild.nodeType === 11) {
				children = makeArray(childNodes(newChild));
			} else {
				children = [newChild];
			}
			mutated([oldChild],"removed");
			this.replaceChild(newChild, oldChild);
			mutated(children,"inserted");
		}
	},
	// called with elements that might have been inserted
	inserted: function(elements){
		mutated(elements,"inserted");
	},
	// called with elements that have been removed
	removed: function(elements){
		mutated(elements,"removed");
	}
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(9);
var fragment = __webpack_require__(142);
var each = __webpack_require__(6);
var childNodes = __webpack_require__(18);

/**
@module {function} can-util/dom/frag/frag frag
@parent can-util/dom

Convert a String, HTMLElement, documentFragment, or contentArray into a documentFragment.

@signature `frag: function(item, doc)`

@param {String|HTMLElement|documentFragment|contentArray} item
@param {Document} doc   an optional DOM document in which to build the fragment

@return {documentFragment}

@body

## Use

ContentArrays can be used to combine multiple HTMLElements into a single document fragment.  For example:

    var frag = require("can-util/dom/frag/frag");

    var p = document.createElement("p");
    p.innerHTML = "Welcome to <b>CanJS</b>";
    var contentArray = ["<h1>Hi There</h1>", p];
    var fragment = frag( contentArray )

`fragment` will be a documentFragment with the following elements:

    <h1>Hi There</h1>
    <p>Welcome to <b>CanJS</b></p>

 */

var makeFrag = function(item, doc){
	var document = doc || getDocument();
	var frag;
	if(!item || typeof item === "string"){
		frag = fragment(item == null ? "" : ""+item, document);
		// If we have an empty frag...
		if (!frag.childNodes.length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	} else if(item.nodeType === 11) {
		return item;
	} else if(typeof item.nodeType === "number") {
		frag = document.createDocumentFragment();
		frag.appendChild(item);
		return frag;
	} else if(typeof item.length === "number") {
		frag = document.createDocumentFragment();
		each(item, function(item){
			frag.appendChild( makeFrag(item) );
		});
		if (!childNodes(frag).length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	} else {
		frag = fragment( ""+item, document);
		// If we have an empty frag...
		if (!childNodes(frag).length) {
			frag.appendChild(document.createTextNode(''));
		}
		return frag;
	}
};

module.exports = makeFrag;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var expressionHelpers = __webpack_require__(14);
var lookupValueOrHelper = __webpack_require__(81);
var assign = __webpack_require__(3);
// ### Lookup
// `new Lookup(String, [Expression])`
// Finds a value in the scope or a helper.
var Lookup = function(key, root) {
	this.key = key;
	this.rootExpr = root;
};
Lookup.prototype.value = function(scope, helperOptions){

	if (this.rootExpr) {
		return expressionHelpers.getObservableValue_fromDynamicKey_fromObservable(this.key, this.rootExpr.value(scope, helperOptions), scope, {}, {});
	} else {
		var result = lookupValueOrHelper(this.key, scope, helperOptions);
		// TODO: remove this hack
		assign(this, result.metadata);
		return result.helper || result.value;
	}
};

module.exports = Lookup;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(System) {var live = __webpack_require__(53);
var nodeLists = __webpack_require__(20);
var compute = __webpack_require__(10);
var utils = __webpack_require__(19);
var isFunction = __webpack_require__(27);
var getBaseURL = __webpack_require__(154);
var joinURIs = __webpack_require__(155);
var each = __webpack_require__(6);
var assign = __webpack_require__(3);
var isIterable = __webpack_require__(59);
var dev = __webpack_require__(5);
var canSymbol = __webpack_require__(1);
var canReflect = __webpack_require__(0);
var isEmptyObject = __webpack_require__(16);
var Hashes = __webpack_require__(55);
var debuggerHelper = __webpack_require__(157).helper;
var Observation = __webpack_require__(4);

var domData = __webpack_require__(22);

var looksLikeOptions = function(options){
	return options && typeof options.fn === "function" && typeof options.inverse === "function";
};

var resolve = function (value) {
	if (value && canReflect.isValueLike(value)) {
		return canReflect.getValue(value);
	} else {
		return value;
	}
};
var resolveHash = function(hash){
	var params = {};
	for(var prop in hash) {
		params[prop] = resolve(hash[prop]);
	}
	return params;
};

var peek = Observation.ignore(resolve);

var helpers = {
	"each": {
		metadata: {
			isLiveBound: true
		},
		fn: function(items) {
			var args = [].slice.call(arguments),
				options = args.pop(),
				argsLen = args.length,
				argExprs = options.exprData.argExprs,
				hashExprs = options.exprData.hashExprs,
				resolved = peek(items),
				asVariable,
				hashOptions,
				aliases,
				key;

			if ((argsLen === 2 && !(argExprs[1].expr instanceof Hashes)) || (argsLen === 3 && argExprs[1].key === 'as')) {
				asVariable = args[argsLen - 1];

				if (typeof asVariable !== 'string') {
					asVariable = argExprs[argsLen - 1].key;
				}
				//!steal-remove-start
				var filename = options.scope.peek('scope.filename');
				var lineNumber = options.scope.peek('scope.lineNumber');
				dev.warn(
					(filename ? filename + ':' : '') +
						(lineNumber ? lineNumber + ': ' : '') +
						'the `as` keyword is deprecated. Use ' +
						'{{#' + options.nodeList.expression.split(' ')[0] + ' ' +
						options.nodeList.expression.split(' ')[1] + ' ' + asVariable + '=value}} ' +
						'instead of {{#' + options.nodeList.expression + '}}.'
				);
				//!steal-remove-end
			}

			// Check if using hash
			if (!isEmptyObject(hashExprs)) {
				hashOptions = {};
				each(hashExprs, function (exprs, key) {
					hashOptions[exprs.key] = key;
				})
			}

			if ((
				canReflect.isObservableLike(resolved) && canReflect.isListLike(resolved) ||
					( utils.isArrayLike(resolved) && canReflect.isValueLike(items) )
			) && !options.stringOnly) {
				return function(el){
					// make a child nodeList inside the can.view.live.html nodeList
					// so that if the html is re
					var nodeList = [el];
					nodeList.expression = "live.list";
					nodeLists.register(nodeList, null, options.nodeList, true);
					// runs nest replacements
					nodeLists.update(options.nodeList, [el]);

					var cb = function (item, index, parentNodeList) {
						var aliases = {
							"%index": index,
							"@index": index
						};

						//!steal-remove-start
						Object.defineProperty(aliases, '%index', {
							get: function() {
								var filename = options.scope.peek('scope.filename');
								var lineNumber = options.scope.peek('scope.lineNumber');
								dev.warn(
									(filename ? filename + ':' : '') +
										(lineNumber ? lineNumber + ': ' : '') +
										'%index is deprecated. Use scope.index instead.'
								);
								return index;
							}
						});

						Object.defineProperty(aliases, '@index', {
							get: function() {
								var filename = options.scope.peek('scope.filename');
								var lineNumber = options.scope.peek('scope.lineNumber');
								dev.warn(
									(filename ? filename + ':' : '') +
										(lineNumber ? lineNumber + ': ' : '') +
										'@index is deprecated. Use scope.index instead.'
								);
								return index;
							}
						});
						//!steal-remove-end

						if (asVariable) {
							aliases[asVariable] = item;
						}

						if (!isEmptyObject(hashOptions)) {
							if (hashOptions.value) {
								aliases[hashOptions.value] = item;
							}
							if (hashOptions.index) {
								aliases[hashOptions.index] = index;
							}
						}

						return options.fn(
							options.scope
							.add(aliases, { notContext: true })
							.add({ index: index }, { special: true })
							.add(item),
							options.options, parentNodeList
						);
					};

					live.list(el, items, cb, options.context, el.parentNode, nodeList, function(list, parentNodeList){
						return options.inverse(options.scope.add(list), options.options, parentNodeList);
					});
				};
			}

			var expr = resolve(items),
				result;
			if (!!expr && utils.isArrayLike(expr)) {
				result = utils.getItemsFragContent(expr, options, options.scope, asVariable);
				return options.stringOnly ? result.join('') : result;
			} else if (canReflect.isObservableLike(expr) && canReflect.isMapLike(expr) || expr instanceof Object) {
				result = [];
				canReflect.each(expr, function(val, key){
					var value = compute(expr, key);

					aliases = {
						"%key": key,
						"@key": key
					};

					//!steal-remove-start
					Object.defineProperty(aliases, '%key', {
						get: function() {
							var filename = options.scope.peek('scope.filename');
							var lineNumber = options.scope.peek('scope.lineNumber');
							dev.warn(
								(filename ? filename + ':' : '') +
									(lineNumber ? lineNumber + ': ' : '') +
									'%key is deprecated. Use scope.key instead.'
							);
							return key;
						}
					});

					Object.defineProperty(aliases, '@key', {
						get: function() {
							var filename = options.scope.peek('scope.filename');
							var lineNumber = options.scope.peek('scope.lineNumber');
							dev.warn(
								(filename ? filename + ':' : '') +
									(lineNumber ? lineNumber + ': ' : '') +
									'@key is deprecated. Use scope.key instead.'
							);
							return key;
						}
					});
					//!steal-remove-end

					if (asVariable) {
						aliases[asVariable] = value;
					}
					if (!isEmptyObject(hashOptions)) {
						if (hashOptions.value) {
							aliases[hashOptions.value] = value;
						}
						if (hashOptions.key) {
							aliases[hashOptions.key] = key;
						}
					}
					result.push(options.fn(
						options.scope
						.add(aliases, { notContext: true })
						.add({ key: key }, { special: true })
						.add(value))
					);
				});

				return options.stringOnly ? result.join('') : result;
			}
		}
	},
	"@index": {
		fn: function(offset, options) {
			if (!options) {
				options = offset;
				offset = 0;
			}
			var index = options.scope.peek("@index");
			return ""+((isFunction(index) ? index() : index) + offset);
		}
	},
	'if': {
		fn: function (expr, options) {
			var value;
			// if it's a function, wrap its value in a compute
			// that will only change values from true to false
			if (expr && expr.isComputed) {
				value = compute.truthy(expr)();
			} else {
				value = !! resolve(expr);
			}

			if (value) {
				return options.fn(options.scope || this);
			} else {
				return options.inverse(options.scope || this);
			}
		}
	},
	'is': {
		fn: function() {
			var lastValue, curValue,
			options = arguments[arguments.length - 1];

			if (arguments.length - 2 <= 0) {
				return options.inverse();
			}

			var args = arguments;
			var callFn = compute(function(){
				for (var i = 0; i < args.length - 1; i++) {
					curValue = resolve(args[i]);
					curValue = isFunction(curValue) ? curValue() : curValue;

					if (i > 0) {
						if (curValue !== lastValue) {
							return false;
						}
					}
					lastValue = curValue;
				}
				return true;
			});

			return callFn() ? options.fn() : options.inverse();
		}
	},
	'eq': {
		fn: function() {
			return helpers.is.fn.apply(this, arguments);
		}
	},
	'unless': {
		fn: function (expr, options) {
			return helpers['if'].fn.apply(this, [expr, assign(assign({}, options), {
				fn: options.inverse,
				inverse: options.fn
			})]);
		}
	},
	'with': {
		fn: function (expr, options) {
			var ctx = expr;
			if(!options) {
				// hash-only case if no current context expression
				options = expr;
				expr = true;
				ctx = options.hash;
			} else {
				expr = resolve(expr);
				if(options.hash && !isEmptyObject(options.hash)) {
					// presumably rare case of both a context object AND hash keys
					// Leaving it undocumented for now, but no reason not to support it.
					ctx = options.scope.add(options.hash).add(ctx);
				}
			}
			return options.fn(ctx || {});
		}
	},
	'log': {
		fn: function (options) {
			// go through the arguments
			var logs = [];
			each(arguments, function(val){
				if(!looksLikeOptions(val)) {
					logs.push(val);
				}
			});


			if (typeof console !== "undefined" && console.log) {
				if (!logs.length) {
					console.log(options.context);
				} else {
					console.log.apply(console, logs);
				}
			}
		}
	},
	'data': {
		fn: function(attr){
			// options will either be the second or third argument.
			// Get the argument before that.
			var data = arguments.length === 2 ? this : arguments[1];
			return function(el){
				domData.set.call( el, attr, data || this.context );
			};
		}
	},
	'switch': {
		fn: function(expression, options){
			resolve(expression);
			var found = false;
			var newOptions = options.helpers.add({
				"case": function(value, options){
					if(!found && resolve(expression) === resolve(value)) {
						found = true;
						return options.fn(options.scope || this);
					}
				},
				"default": function(options){
					if(!found) {
						return options.fn(options.scope || this);
					}
				}
			});
			return options.fn(options.scope, newOptions);
		}
	},
	'joinBase': {
		fn: function(firstExpr/* , expr... */){
			var args = [].slice.call(arguments);
			var options = args.pop();

			var moduleReference = args.map( function(expr){
				var value = resolve(expr);
				return isFunction(value) ? value() : value;
			}).join("");

			var templateModule = options.helpers.peek("helpers.module");
			var parentAddress = templateModule ? templateModule.uri: undefined;

			var isRelative = moduleReference[0] === ".";

			if(isRelative && parentAddress) {
				return joinURIs(parentAddress, moduleReference);
			} else {
				var baseURL = ("object" !== "undefined" &&
					(System.renderingBaseURL || System.baseURL)) ||	getBaseURL();

				// Make sure one of them has a needed /
				if(moduleReference[0] !== "/" && baseURL[baseURL.length - 1] !== "/") {
					baseURL += "/";
				}

				return joinURIs(baseURL, moduleReference);
			}
		}
	}
};

helpers.eachOf = helpers.each;
helpers.debugger = { fn: debuggerHelper };

var registerHelper = function(name, callback, metadata){
	//!steal-remove-start
	if (helpers[name]) {
		dev.warn('The helper ' + name + ' has already been registered.');
	}
	//!steal-remove-end

	helpers[name] = {
		metadata: assign({ isHelper: true }, metadata),
		fn: callback
	};
};

var makeSimpleHelper = function(fn) {
	return function() {
		var realArgs = [];
		each(arguments, function(val) {
			while (val && val.isComputed) {
				val = val();
			}
			realArgs.push(val);
		});
		return fn.apply(this, realArgs);
	};
};

var registerSimpleHelper = function(name, callback) {
	registerHelper(name, makeSimpleHelper(callback));
};

module.exports = {
	registerHelper: registerHelper,

	registerSimpleHelper: function() {
		//!steal-remove-start
		dev.warn("stache.registerSimpleHelper is deprecated. Use stache.addHelper instead.");
		//!steal-remove-end

		registerSimpleHelper.apply(this, arguments);
	},

	addHelper: registerSimpleHelper,

	// add helpers that set up their own internal live-binding
	// these helpers will not be wrapped in computes and will
	// receive observable arguments when called with Call Expressions
	addLiveHelper: function(name, callback) {
		return registerHelper(name, callback, {
			isLiveBound: true
		});
	},

	getHelper: function(name, options) {
		var helper = options && options.get && options.get("helpers." + name,{proxyMethods: false});
		if (helper) {
			helper = { fn: helper };
		} else {
			helper = helpers[name];
		}
		if(helper) {
			helper.metadata = assign((helper.metadata || {}), { isHelper: true });
			return helper;
		}
	},

	resolve: resolve,
	resolveHash: resolveHash,
	looksLikeOptions: looksLikeOptions,
	helpers: assign({}, helpers)
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core_hasOwn = Object.prototype.hasOwnProperty;

function isWindow(obj) {
	// In IE8 window.window !== window.window, so we allow == here.
	/*jshint eqeqeq:false*/
	return obj !== null && obj == obj.window;
}

function isPlainObject(obj) {
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj) || obj.constructor && obj.constructor.shortName) {
		return false;
	}
	try {
		// Not own constructor property must be Object
		if (obj.constructor && !core_hasOwn.call(obj, 'constructor') && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
			return false;
		}
	} catch (e) {
		// IE8,9 Will throw exceptions on certain host objects #9897
		return false;
	}
	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}
	return key === undefined || core_hasOwn.call(obj, key);
}

module.exports = isPlainObject;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// The following is from jQuery
function isArrayLike(obj){
	var type = typeof obj;
	if(type === "string") {
		return true;
	}
	else if(type === "number") {
		return false;
	}
	// The `in` check is from jQuery’s fix for an iOS 8 64-bit JIT object length bug:
	// https://github.com/jquery/jquery/pull/2185
	var length = obj && type !== 'boolean' &&
		typeof obj !== 'number' &&
		"length" in obj && obj.length;

	// var length = "length" in obj && obj.length;
	return typeof obj !== "function" &&
		( length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

module.exports = isArrayLike;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var get = __webpack_require__(60);
var isContainer = __webpack_require__(61);
var canDev = __webpack_require__(5);
var isArray = __webpack_require__(114);

// ##string.js
// _Miscellaneous string utility functions._
// Several of the methods in this plugin use code adapated from Prototype
// Prototype JavaScript framework, version 1.6.0.1.
// © 2005-2007 Sam Stephenson
/**
 * @module {{}} can-util/js/string/string string
 * @parent can-util/js
 *
 * @description  String utilities used by CanJS libraries
 */
var strUndHash = /_|-/,
	strColons = /\=\=/,
	strWords = /([A-Z]+)([A-Z][a-z])/g,
	strLowUp = /([a-z\d])([A-Z])/g,
	strDash = /([a-z\d])([A-Z])/g,
	strReplacer = /\{([^\}]+)\}/g,
	strQuote = /"/g,
	strSingleQuote = /'/g,
	strHyphenMatch = /-+(.)?/g,
	strCamelMatch = /[a-z][A-Z]/g,
	convertBadValues = function (content) {
		// Convert bad values into empty strings
		var isInvalid = content === null || content === undefined || isNaN(content) && '' + content === 'NaN';
		return '' + (isInvalid ? '' : content);
	},
	deleteAtPath = function(data, path) {
		var parts = path ? path.replace(/\[/g,'.')
			.replace(/]/g,'').split('.') : [];
		var current = data;

		for(var i = 0; i < parts.length - 1; i++) {
			if(current) {
				current = current[parts[i]];
			}
		}

		if(current) {
			delete current[parts[parts.length - 1 ]];
		}
	};

var string = {
	/**
	 * @function can-util/js/string/string.esc string.esc
	 * @signature `string.esc(content)`
	 * @param  {String} content a string
	 * @return {String}         the string safely HTML-escaped
	 * 
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * string.esc("<div>&nbsp;</div>"); //-> "&lt;div&gt;&amp;nbsp;&lt;/div&gt;"
	 * ```
	 */
	esc: function (content) {
		return convertBadValues(content)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(strQuote, '&#34;')
			.replace(strSingleQuote, '&#39;');
	},
	/**
	 * @function can-util/js/string/string.getObject string.getObject
	 * @signature `string.getObject(name, roots)`
	 * @param  {String} name  a String of dot-separated keys, representing a path of properties
	 * @param  {Object|Array} roots the object to use as the root for property based navigation
	 * @return {*}       the value at the property path descending from `roots`
	 *
	 * Return the result of descending the path `name` through the properties of the object or objects
	 * `roots`
	 *
	 * If `roots` is an Array, each element of the array is evaluated, in order, until
	 * the path is found in an element's properties (and properties-of-properties, etc.).  Otherwise
	 * `roots` is evaluated as the root object, returning either the object at the property path
	 * descended from `roots` or `undefined` if any subpath is not found.
	 *
	 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
	 * 'bar' of the object at the property 'foo' of the root."  An empty path returns the first object in `roots`
	 * if it's an array, `roots` itself otherwise.
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 * 
	 * console.log(string.getObject("a.b.c", {a: {b: {c: "foo"}}})); // -> "foo"
	 * console.log(string.getObject("a.b.c", {a: {}})); // -> undefined
	 * console.log(string.getObject("a.b", [{a: {}}, {a: {b: "bar"}}])); // -> "bar"
	 * ```
	 */
	getObject: function (name, roots) {
		//!steal-remove-start
		canDev.warn('string.getObject is deprecated, please use can-util/js/get/get instead.');
		//!steal-remove-end

		roots = isArray(roots) ? roots : [roots || window];

		var result, l = roots.length;

		for(var i = 0; i < l; i++) {
			result = get(roots[i], name);

			if(result) {
				return result;
			}
		}
	},
	/**
	 * @function can-util/js/string/string.capitalize string.capitalize
	 * @signature `string.capitalize(s)`
	 * @param  {String} s     the string to capitalize
	 * @return {String}       the supplied string with the first character uppercased if it is a letter
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.capitalize("foo")); // -> "Foo"
	 * console.log(string.capitalize("123")); // -> "123"
	 * ```
	 */
	capitalize: function (s, cache) {
		// Used to make newId.
		return s.charAt(0)
			.toUpperCase() + s.slice(1);
	},
	/**
	 * @function can-util/js/string/string.camelize string.camelize
	 * @signature `string.camelize(s)`
	 * @param  {String} str   the string to camelCase
	 * @return {String}       the supplied string with hyphens removed and following letters capitalized.
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.camelize("foo-bar")); // -> "fooBar"
	 * console.log(string.camelize("-webkit-flex-flow")); // -> "WebkitFlexFlow"
	 * ```
	 */
	camelize: function (str) {
		return convertBadValues(str)
			.replace(strHyphenMatch, function (match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
	},
	/**
	 * @function can-util/js/string/string.hyphenate string.hyphenate
	 * @signature `string.hyphenate(s)`
	 * @param  {String} str   a string in camelCase
	 * @return {String}       the supplied string with camelCase converted to hyphen-lowercase digraphs
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.hyphenate("fooBar")); // -> "foo-bar"
	 * console.log(string.hyphenate("WebkitFlexFlow")); // -> "Webkit-flex-flow"
	 * ```
	 */
	hyphenate: function (str) {
		return convertBadValues(str)
			.replace(strCamelMatch, function (str, offset) {
				return str.charAt(0) + '-' + str.charAt(1)
					.toLowerCase();
			});
	},
	/**
	 * @function can-util/js/string/string.underscore string.underscore
	 * @signature `string.underscore(s)`
	 * @param  {String} str   a string in camelCase
	 * @return {String}       the supplied string with camelCase converted to underscore-lowercase digraphs
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.underscore("fooBar")); // -> "foo_bar"
	 * console.log(string.underscore("HTMLElement")); // -> "html_element"
	 * ```
	 */
	underscore: function (s) {
		return s.replace(strColons, '/')
			.replace(strWords, '$1_$2')
			.replace(strLowUp, '$1_$2')
			.replace(strDash, '_')
			.toLowerCase();
	},
	/**
	 * @function can-util/js/string/string.sub string.sub
	 * @signature `string.sub(str, data, remove)`
	 * @param {String} str   a string with {curly brace} delimited property names
	 * @param {Object} data  an object from which to read properties
	 * @return {String|null} the supplied string with delimited properties replaced with their values
	 *                       if all properties exist on the object, null otherwise
	 *
	 * If `remove` is true, the properties found in delimiters in `str` are removed from `data`.
	 *
	 * ```js
	 * var string = require("can-util/js/string/string");
	 *
	 * console.log(string.sub("foo_{bar}", {bar: "baz"}})); // -> "foo_baz"
	 * console.log(string.sub("foo_{bar}", {})); // -> null
	 * ```
	 */
	sub: function (str, data, remove) {
		var obs = [];
		str = str || '';
		obs.push(str.replace(strReplacer, function (whole, inside) {
			// Convert inside to type.
			var ob = get(data, inside);

			if(remove === true) {
				deleteAtPath(data, inside);
			}

			if (ob === undefined || ob === null) {
				obs = null;
				return '';
			}
			// If a container, push into objs (which will return objects found).
			if (isContainer(ob) && obs) {
				obs.push(ob);
				return '';
			}
			return '' + ob;
		}));
		return obs === null ? obs : obs.length <= 1 ? obs[0] : obs;
	},
	/**
	 * @property {RegExp} can-util/js/string/string.strReplacer string.strReplacer
	 *
	 * The regex used to find replacement sections in [can-util/js/string/string.sub string.sub]
	 */
	replacer: strReplacer,
	/**
	 * @property {RegExp} can-util/js/string/string.strUndHash string.strUndHash
	 *
	 * A regex which matches an underscore or hyphen character
	 */
	undHash: strUndHash
};
module.exports = string;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var canSymbol = __webpack_require__(1);
var typeReflections = __webpack_require__(29);

var setKeyValueSymbol = canSymbol.for("can.setKeyValue"),
	getKeyValueSymbol = canSymbol.for("can.getKeyValue"),
	getValueSymbol = canSymbol.for("can.getValue"),
	setValueSymbol = canSymbol.for("can.setValue");

var reflections = {
	/**
	 * @function {Object, String, *} can-reflect.setKeyValue setKeyValue
	 * @parent can-reflect/get-set
	 * @description Set the value of a named property on a MapLike object.
	 *
	 * @signature `setKeyValue(obj, key, value)`
	 *
	 * Set the property on Map-like `obj`, identified by the String, Symbol or Object value `key`, to the value `value`.
	 * The default behavior can be overridden on `obj` by implementing [can-symbol/symbols/setKeyValue @@@@can.setKeyValue],
	 * otherwise native named property access is used for string keys, and `Object.defineProperty` is used to set symbols.
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * canReflect.setKeyValue(foo, "bar", "quux");
	 * foo[bar]; // -> "quux"
	 * ```
	 * @param  {Object} obj   the object to set on
	 * @param  {String} key   the key for the property to set
	 * @param  {*} value      the value to set on the object
	 */
	setKeyValue: function(obj, key, value){
		if( typeReflections.isSymbolLike(key) ) {
			if(typeof key === "symbol") {
				obj[key] = value;
			} else {
				Object.defineProperty(obj, key, {
					enumerable: false,
					configurable: true,
					value: value,
					writable: true
				});
			}
			return;
		}
		var setKeyValue = obj[setKeyValueSymbol];
		if(setKeyValue !== undefined) {
			return setKeyValue.call(obj, key, value);
		} else {
			obj[key] = value;
		}
	},
	/**
	 * @function {Object, String} can-reflect.getKeyValue getKeyValue
	 * @parent can-reflect/get-set
	 * @description Get the value of a named property on a MapLike object.
	 *
	 * @signature `getKeyValue(obj, key)`
	 *
	 * Retrieve the property on Map-like `obj` identified by the String or Symbol value `key`.  The default behavior
	 * can be overridden on `obj` by implementing [can-symbol/symbols/getKeyValue @@@@can.getKeyValue],
	 * otherwise native named property access is used.
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * canReflect.getKeyValue(foo, "bar"); // -> "baz"
	 * ```
	 *
	 * @param  {Object} obj   the object to get from
	 * @param  {String} key   the key of the property to get
	 */
	getKeyValue: function(obj, key) {
		var getKeyValue = obj[getKeyValueSymbol];
		if(getKeyValue) {
			return getKeyValue.call(obj, key);
		}
		return obj[key];
	},
	/**
	 * @function {Object, String} can-reflect.deleteKeyValue deleteKeyValue
	 * @parent can-reflect/get-set
	 * @description Delete a named property from a MapLike object.
	 *
	 * @signature `deleteKeyValue(obj, key)`
	 *
	 * Remove the property identified by the String or Symbol `key` from the Map-like object `obj`, if possible.
	 * Property definitions may interfere with deleting key values; the behavior on `obj` if `obj[key]` cannot
	 * be deleted is undefined.  The default use of the native `delete` keyword can be overridden by `obj` if it
	 * implements [can-symbol/symbols/deleteKeyValue @@@@can.deleteKeyValue].
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz" });
	 * var quux = new CanMap({ thud: "jeek" });
	 *
	 * canReflect.deleteKeyValue(foo, "bar");
	 * canReflect.deleteKeyValue(quux, "thud");
	 *
	 * "bar" in foo; // ->  true  -- DefineMaps use property defs which cannot be un-defined
	 * foo.bar // -> undefined    --  but set values to undefined when deleting
	 *
	 * "thud" in quux; // -> false
	 * quux.thud; // -> undefined
	 * ```
	 *
	 * @param  {Object} obj   the object to delete on
	 * @param  {String} key   the key for the property to delete
	 */
	deleteKeyValue: function(obj, key) {
		var deleteKeyValue = obj[canSymbol.for("can.deleteKeyValue")];
		if(deleteKeyValue) {
			return deleteKeyValue.call(obj, key);
		}
		delete obj[key];
	},
	/**
	 * @function {Object} can-reflect.getValue getValue
	 * @parent can-reflect/get-set
	 * @description Get the value of an object with a gettable value
	 *
	 * @signature `getValue(obj)`
	 *
	 * Return the value of the Value-like object `obj`.  Unless `obj` implements
	 * [can-symbol/symbols/getValue @@@@can.getValue], the result of `getValue` on
	 * `obj` will always be `obj`.  Observable Map-like objects may want to implement
	 * `@@@@can.getValue` to return non-observable or plain representations of themselves.
	 *
	 * ```
	 * var compute = canCompute("foo");
	 * var primitive = "bar";
	 *
	 * canReflect.getValue(compute); // -> "foo"
	 * canReflect.getValue(primitive); // -> "bar"
	 * ```
	 *
	 * @param  {Object} obj   the object to get from
	 * @return {*} the value of the object via `@@can.getValue`, or the value itself.
	 */
	getValue: function(value){
		if(typeReflections.isPrimitive(value)) {
			return value;
		}
		var getValue = value[getValueSymbol];
		if(getValue) {
			return getValue.call(value);
		}
		return value;
	},
	/**
	 * @function {Object, *} can-reflect.setValue setValue
	 * @parent can-reflect/get-set
	 * @description Set the value of a mutable object.
	 *
	 * @signature `setValue(obj, value)`
	 *
	 * Set the value of a Value-like object `obj` to the value `value`.  `obj` *must* implement
	 * [can-symbol/symbols/setValue @@@@can.setValue] to be used with `canReflect.setValue`.
	 * Map-like objects may want to implement `@@@@can.setValue` to merge objects of properties
	 * into themselves.
	 *
	 * ```
	 * var compute = canCompute("foo");
	 * var plain = {};
	 *
	 * canReflect.setValue(compute, "bar");
	 * compute(); // -> bar
	 *
	 * canReflect.setValue(plain, { quux: "thud" }); // throws "can-reflect.setValue - Can not set value."
	 * ```
	 *
	 * @param  {Object} obj   the object to set on
	 * @param  {*} value      the value to set for the object
	 */
	setValue: function(item, value){
		var setValue = item && item[setValueSymbol];
		if(setValue) {
			return setValue.call(item, value);
		} else {
			throw new Error("can-reflect.setValue - Can not set value.");
		}
	},

	splice: function(obj, index, removing, adding){
		var howMany;
		if(typeof removing !== "number") {
			var updateValues = obj[canSymbol.for("can.updateValues")];
			if(updateValues) {
				return updateValues.call(obj, index, removing, adding);
			}
			howMany = removing.length;
		} else {
			howMany = removing;
		}

		var splice = obj[canSymbol.for("can.splice")];
		if(splice) {
			return splice.call(obj, index, howMany, adding);
		}
		return [].splice.apply(obj, [index, howMany].concat(adding) );
	},
	addValues: function(obj, adding, index) {
		var add = obj[canSymbol.for("can.addValues")];
		if(add) {
			return add.call(obj, adding, index);
		}
		if(Array.isArray(obj) && index === undefined) {
			return obj.push.apply(obj, adding);
		}
		return reflections.splice(obj, index, [], adding);
	},
	removeValues: function(obj, removing, index) {
		var removeValues = obj[canSymbol.for("can.removeValues")];
		if(removeValues) {
			return removeValues.call(obj, removing, index);
		}
		if(Array.isArray(obj) && index === undefined) {
			removing.forEach(function(item){
				var index = obj.indexOf(item);
				if(index >=0) {
					obj.splice(index, 1);
				}
			});
			return;
		}
		return reflections.splice(obj, index, removing, []);
	}
};
/**
 * @function {Object, String} can-reflect.get get
 * @hide
 * @description an alias for [can-reflect.getKeyValue getKeyValue]
 */
reflections.get = reflections.getKeyValue;
/**
 * @function {Object, String} can-reflect.set set
 * @hide
 * @description an alias for [can-reflect.setKeyValue setKeyValue]
 */
reflections.set = reflections.setKeyValue;
/**
 * @function {Object, String} can-reflect.delete delete
 * @hide
 * @description an alias for [can-reflect.deleteKeyValue deleteKeyValue]
 */
reflections["delete"] = reflections.deleteKeyValue;

module.exports = reflections;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var canSymbol = __webpack_require__(1);
var getSetReflections = __webpack_require__(43);
var typeReflections = __webpack_require__(29);
var helpers = __webpack_require__(64);

var shapeReflections;

var shiftFirstArgumentToThis = function(func){
	return function(){
		var args = [this];
		args.push.apply(args, arguments);
		return func.apply(null,args);
	};
};

var getKeyValueSymbol = canSymbol.for("can.getKeyValue");
var shiftedGetKeyValue = shiftFirstArgumentToThis(getSetReflections.getKeyValue);
var setKeyValueSymbol = canSymbol.for("can.setKeyValue");
var shiftedSetKeyValue = shiftFirstArgumentToThis(getSetReflections.setKeyValue);

var sizeSymbol = canSymbol.for("can.size");

var serializeMap = null;

var hasUpdateSymbol = helpers.makeGetFirstSymbolValue(["can.updateDeep","can.assignDeep","can.setKeyValue"]);
var shouldUpdateOrAssign = function(obj){
	return typeReflections.isPlainObject(obj) || Array.isArray(obj) || !!hasUpdateSymbol(obj);
};

function isSerializable(obj){
	if (typeReflections.isPrimitive(obj)) {
		return true;
	}
	if(hasUpdateSymbol(obj)) {
		return false;
	}
	return typeReflections.isBuiltIn(obj) && !typeReflections.isPlainObject(obj);
}

// IE11 doesn't support primitives
var Object_Keys;
try{
	Object.keys(1);
	Object_Keys = Object.keys;
} catch(e) {
	Object_Keys = function(obj){
		if(typeReflections.isPrimitive(obj)) {
			return [];
		} else {
			return Object.keys(obj);
		}
	};
}

function makeSerializer(methodName, symbolsToCheck){

	return function serializer(value, MapType ){
		if (isSerializable(value)) {
			return value;
		}

		var firstSerialize;
		if(MapType && !serializeMap) {
			serializeMap = {
				unwrap: new MapType(),
				serialize: new MapType()
			};
			firstSerialize = true;
		}
		var serialized;
		if(typeReflections.isValueLike(value)) {
			serialized = this[methodName]( getSetReflections.getValue(value) );

		} else {
			// Date, RegEx and other Built-ins are handled above
			// only want to do something if it's intended to be serialized
			// or do nothing for a POJO

			var isListLike = typeReflections.isIteratorLike(value) || typeReflections.isMoreListLikeThanMapLike(value);
			serialized = isListLike ? [] : {};

			// handle maping to what is serialized
			if(serializeMap) {

				if( serializeMap[methodName].has(value) ) {
					return serializeMap[methodName].get(value);
				} else {
					serializeMap[methodName].set(value, serialized);
				}
			}

			for(var i = 0, len = symbolsToCheck.length ; i< len;i++) {
				var serializer = value[symbolsToCheck[i]];
				if(serializer) {
					var result =  serializer.call(value, serialized);
					if(firstSerialize) {
						serializeMap = null;
					}
					return result;
				}
			}

			if (typeof obj ==='function') {
				if(serializeMap) {
					serializeMap[methodName].set(value, value);
				}

				serialized = value;
			} else if( isListLike ) {
				this.eachIndex(value,function(childValue, index){
					serialized[index] = this[methodName](childValue);
				},this);
			} else {
				this.eachKey(value,function(childValue, prop){
					serialized[prop] = this[methodName](childValue);
				},this);
			}
		}

		if(firstSerialize) {
			serializeMap = null;
		}

		return serialized;
	};
}

// returns a Map type of the keys mapped to true
var makeMap;
if(typeof Map !== "undefined") {
	makeMap = function(keys) {
		var map = new Map();
		shapeReflections.eachIndex(keys, function(key){
			map.set(key, true);
		});
		return map;
	};
} else {
	makeMap = function(keys) {
		var map = {};
		keys.forEach(function(key){
			map[key] = true;
		});

		return {
			get: function(key){
				return map[key];
			},
			set: function(key, value) {
				map[key] = value;
			},
			keys: function(){
				return keys;
			}
		};
	};
}

// creates an optimized hasOwnKey lookup.
// If the object has hasOwnKey, then we just use that.
// Otherwise, try to put all keys in a map.
var fastHasOwnKey = function(obj){
	var hasOwnKey = obj[canSymbol.for("can.hasOwnKey")];
	if(hasOwnKey) {
		return hasOwnKey.bind(obj);
	} else {
		var map = makeMap( shapeReflections.getOwnEnumerableKeys(obj) );
		return function(key) {
			return map.get(key);
		};
	}
};


// combines patches if it makes sense
function addPatch(patches, patch) {
	var lastPatch = patches[patches.length -1];
	if(lastPatch) {
		// same number of deletes and counts as the index is back
		if(lastPatch.deleteCount === lastPatch.insert.length && (patch.index - lastPatch.index === lastPatch.deleteCount) ) {
			lastPatch.insert.push.apply(lastPatch.insert, patch.insert);
			lastPatch.deleteCount += patch.deleteCount;
			return;
		}
	}
	patches.push(patch);
}

function updateDeepList(target, source, isAssign) {
	var sourceArray = this.toArray(source);

	var patches = [],
		lastIndex = -1;
	this.eachIndex(target, function(curVal, index){
		lastIndex = index;
		if(index >= sourceArray.length) {
			if(!isAssign) {
				addPatch(patches, {index: index, deleteCount: sourceArray.length - index + 1, insert: []});
			}
			return false;
		}
		var newVal = sourceArray[index];
		if( typeReflections.isPrimitive(curVal) || typeReflections.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false ) {
			addPatch(patches, {index: index, deleteCount: 1, insert: [newVal]});
		} else {
			this.updateDeep(curVal, newVal);
		}
	}, this);
	// add items at the end
	if(sourceArray.length > lastIndex) {
		addPatch(patches, {index: lastIndex+1, deleteCount: 0, insert: sourceArray.slice(lastIndex+1)});
	}
	for(var i = 0, patchLen = patches.length; i < patchLen; i++) {
		var patch = patches[i];
		getSetReflections.splice(target, patch.index, patch.deleteCount, patch.insert);
	}
	return target;
}

shapeReflections = {
	/**
	 * @function {Object, function(*), [Object]} can-reflect/shape.each each
	 * @parent can-reflect/shape
	 * @description  Iterate a List-like or Map-like, calling `callback` on each keyed or indexed property
	 *
	 * @signature `each(obj, callback, context)`
	 *
	 * If `obj` is a List-like or an Iterator-like, `each` functions as [can-reflect/shape.eachIndex eachIndex],
	 * iterating over numeric indexes from 0 to `obj.length - 1` and calling `callback` with each property and
	 * index, optionally with `context` as `this` (defaulting to `obj`).  If not, `each` functions as
	 * [can-reflect/shape.eachKey eachKey],
	 * iterating over every key on `obj` and calling `callback` on each one.
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz" });
	 * var quux = new DefineList([ "thud", "jeek" ]);
	 *
	 * canReflect.each(foo, console.log, console); // -> logs 'baz bar {foo}'
	 * canReflect.each(quux, console.log, console); // -> logs 'thud 0 {quux}'; logs 'jeek 1 {quux}'
	 * ```
	 *
	 * @param  {Object}   obj     The object to iterate over
	 * @param  {Function(*, ValueLike)} callback a function that receives each item in the ListLike or MapLike
	 * @param  {[Object]}   context  an optional `this` context for calling the callback
	 * @return {Array} the result of calling [can-reflect/shape.eachIndex `eachIndex`] if `obj` is a ListLike,
	 * or [can-reflect/shape.eachKey `eachKey`] if a MapLike.
	 */
	each: function(obj, callback, context){

		// if something is more "list like" .. use eachIndex
		if(typeReflections.isIteratorLike(obj) || typeReflections.isMoreListLikeThanMapLike(obj) ) {
			return this.eachIndex(obj,callback,context);
		} else {
			return this.eachKey(obj,callback,context);
		}
	},

	/**
	 * @function {ListLike, function(*), [Object]} can-reflect/shape.eachIndex eachIndex
	 * @parent can-reflect/shape
	 * @description  Iterate a ListLike calling `callback` on each numerically indexed element
	 *
	 * @signature `eachIndex(list, callback, context)`
	 *
	 * For each numeric index from 0 to `list.length - 1`, call `callback`, passing the current
	 * property value, the current index, and `list`, and optionally setting `this` as `context`
	 * if specified (otherwise use the current property value).
	 *
	 * ```
	 * var foo = new DefineList([ "bar", "baz" ]);
	 *
	 * canReflect.eachIndex(foo, console.log, console); // -> logs 'bar 0 {foo}'; logs 'baz 1 {foo}'
	 * ```
	 *
	 * @param  {ListLike}   list     The list to iterate over
	 * @param  {Function(*, Number)} callback a function that receives each item
	 * @param  {[Object]}   context  an optional `this` context for calling the callback
	 * @return {ListLike}   the original list
	 */
	eachIndex: function(list, callback, context){
		// each index in something list-like. Uses iterator if it has it.
		if(Array.isArray(list)) {
			return this.eachListLike(list, callback, context);
		} else {
			var iter, iterator = list[canSymbol.iterator];
			if(typeReflections.isIteratorLike(list)) {
				// we are looping through an iterator
				iter = list;
			} else if(iterator) {
				iter = iterator.call(list);
			}
			// fast-path arrays
			if(iter) {
				var res, index = 0;

				while(!(res = iter.next()).done) {
					if( callback.call(context || list, res.value, index++, list) === false ){
						break;
					}
				}
			} else {
				this.eachListLike(list, callback, context);
			}
		}
		return list;
	},
	eachListLike: function(list, callback, context){
		var index = -1;
		var length = list.length;
		if( length === undefined ) {
			var size = list[sizeSymbol];
			if(size) {
				length = size.call(list);
			} else {
				throw new Error("can-reflect: unable to iterate.");
			}
		}

		while (++index < length) {
			var item = list[index];
			if (callback.call(context || item, item, index, list) === false) {
				break;
			}
		}

		return list;
	},
	/**
	 * @function can-reflect/shape.toArray toArray
	 * @parent can-reflect/shape
	 * @description  convert the values of any MapLike or ListLike into an array
	 *
	 * @signature `toArray(obj)`
	 *
	 * Convert the values of any Map-like or List-like into a JavaScript Array.  If a Map-like,
	 * key data is discarded and only value data is preserved.
	 *
	 * ```
	 * var foo = new DefineList(["bar", "baz"]);
	 * var quux = new DefineMap({ thud: "jeek" });
	 * ```
	 *
	 * canReflect.toArray(foo); // -> ["bar", "baz"]
	 * canReflect.toArray(quux): // -> ["jeek"]
	 *
	 * @param  {Object} obj Any object, whether MapLike or ListLike
	 * @return {Array}  an array of the values of `obj`
	 */
	toArray: function(obj){
		var arr = [];
		this.each(obj, function(value){
			arr.push(value);
		});
		return arr;
	},
	/**
	 * @function can-reflect/shape.eachKey eachKey
	 * @parent can-reflect/shape
	 * @description Iterate over a MapLike, calling `callback` on each enumerable property
	 *
	 * @signature `eachKey(obj, callback, context)`
	 *
	 * Iterate all own enumerable properties on Map-like `obj`
	 * (using [can-reflect/shape/getOwnEnumerableKeys canReflect.getOwnEnumerableKeys]), and call
	 * `callback` with the property value, the property key, and `obj`, and optionally setting
	 * `this` on the callback as `context` if provided, `obj` otherwise.
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * canReflect.eachKey(foo, console.log, console); // logs 'baz bar {foo}'
	 * ```
	 *
	 * @param  {Object}   obj   The object to iterate over
	 * @param  {Function(*, String)} callback The callback to call on each enumerable property value
	 * @param  {[Object]}   context  an optional `this` context for calling `callback`
	 * @return {Array}    the enumerable keys of `obj` as an Array
	 */
	eachKey: function(obj, callback, context){
		// each key in something map like
		// eachOwnEnumerableKey
		if(obj) {
			var enumerableKeys = this.getOwnEnumerableKeys(obj);

			// cache getKeyValue method if we can
			var getKeyValue = obj[getKeyValueSymbol] || shiftedGetKeyValue;

			return this.eachIndex(enumerableKeys, function(key){
				var value = getKeyValue.call(obj, key);
				return callback.call(context || obj, value, key, obj);
			});
		}
		return obj;
	},
	/**
	 * @function can-reflect/shape.hasOwnKey hasOwnKey
	 * @parent can-reflect/shape
	 * @description  Determine whether an object contains a key on itself, not only on its prototype chain
	 *
	 * @signature `hasOwnKey(obj, key)`
	 *
	 * Return `true` if an object's own properties include the property key `key`, `false` otherwise.
	 * An object may implement [can-symbol/symbols/hasOwnKey @@@@can.hasOWnKey] to override default behavior.
	 * By default, `canReflect.hasOwnKey` will first look for
	 * [can-symbol/symbols/getOwnKey @@@@can.getOwnKey] on `obj`. If present, it will call `@@@@can.getOwnKey` and
	 * test `key` against the returned Array of keys.  If absent, `Object.prototype.hasOwnKey()` is used.
	 *
	 * ```
	 * var foo = new DefineMap({ "bar": "baz" });
	 *
	 * canReflect.hasOwnKey(foo, "bar"); // -> true
	 * canReflect.hasOwnKey(foo, "each"); // -> false
	 * foo.each // -> function each() {...}
	 * ```
	 *
	 * @param  {Object} obj Any MapLike object
	 * @param  {String} key The key to look up on `obj`
	 * @return {Boolean} `true` if `obj`'s key set contains `key`, `false` otherwise
	 */
	"hasOwnKey": function(obj, key){
		// if a key or index
		// like has own property
		var hasOwnKey = obj[canSymbol.for("can.hasOwnKey")];
		if(hasOwnKey) {
			return hasOwnKey.call(obj, key);
		}
		var getOwnKeys = obj[canSymbol.for("can.getOwnKeys")];
		if( getOwnKeys ) {
			var found = false;
			this.eachIndex(getOwnKeys.call(obj), function(objKey){
				if(objKey === key) {
					found = true;
					return false;
				}
			});
			return found;
		}
		return obj.hasOwnProperty(key);
	},
	/**
	 * @function can-reflect/shape.getOwnEnumerableKeys getOwnEnumerableKeys
	 * @parent can-reflect/shape
	 * @description Return the list of keys which can be iterated over on an object
	 *
	 * @signature `getOwnEnumerableKeys(obj)`
	 *
	 * Return all keys on `obj` which have been defined as enumerable, either from explicitly setting
	 * `enumerable` on the property descriptor, or by using `=` to set the value of the property without
	 * a key descriptor, but excluding properties that only exist on `obj`'s prototype chaing.  The
	 * default behavior can be overridden by implementing
	 * [can-symbol/symbols/getOwnEnumerableKeys @@@@can.getOwnEnumerableKeys] on `obj`.  By default,
	 * `canReflect.getOwnEnumerableKeys` will use [can-symbol/symbols/getOwnKeys @@@@can.getOwnKeys] to
	 * retrieve the set of keys and [can-symbol/symbols/getOwnKeyDescriptor @@@@can.getOwnKeyDescriptor]
	 * to filter for those which are enumerable.  If either symbol is absent from `obj`, `Object.keys`
	 * is used.
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz", [canSymbol.for("quux")]: "thud" });
	 * Object.defineProperty(foo, "jeek", {
	 *   enumerable: true,
	 *   value: "plonk"
	 * });
	 *
	 * canReflect.getOwnEnumerableKeys(foo); // -> ["bar", "jeek"]
	 * ```
	 *
	 * @param  {Object} obj Any Map-like object
	 * @return {Array} the Array of all enumerable keys from the object, either using
	 * [can-symbol/symbols/getOwnEnumerableKeys `@@@@can.getOwnEnumerableKeys`] from `obj`, or filtering
	 * `obj`'s own keys for those which are enumerable.
	 */
	getOwnEnumerableKeys: function(obj){
		// own enumerable keys (aliased as keys)
		var getOwnEnumerableKeys = obj[canSymbol.for("can.getOwnEnumerableKeys")];
		if(getOwnEnumerableKeys) {
			return getOwnEnumerableKeys.call(obj);
		}
		if( obj[canSymbol.for("can.getOwnKeys")] && obj[canSymbol.for("can.getOwnKeyDescriptor")] ) {
			var keys = [];
			this.eachIndex(this.getOwnKeys(obj), function(key){
				var descriptor =  this.getOwnKeyDescriptor(obj, key);
				if(descriptor.enumerable) {
					keys.push(key);
				}
			}, this);

			return keys;
		} /*else if(obj[canSymbol.iterator]){
			var iter = obj[canSymbol.iterator](obj);
			var index = 0;
			var keys;
			return {
				next: function(){
					var res = iter.next();
					if(index++)
				}
			}
			while(!().done) {

				if( callback.call(context || list, res.value, index++, list) === false ){
					break;
				}
			}
		}*/ else {
			return Object_Keys(obj);
		}
	},
	/**
	 * @function can-reflect/shape.getOwnKeys getOwnKeys
	 * @parent can-reflect/shape
	 * @description Return the list of keys on an object, whether or not they can be iterated over
	 *
	 * @signature `getOwnKeys(obj)`
	 *
	 * Return the Array of all String (not Symbol) keys from `obj`, whether they are enumerable or not.  If
	 * [can-symbol/symbols/getOwnKeys @@@@can.getOwnKeys] exists on `obj`, it is called to return
	 * the keys; otherwise, `Object.getOwnPropertyNames()` is used.
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz", [canSymbol.for("quux")]: "thud" });
	 * Object.defineProperty(foo, "jeek", {
	 *   enumerable: false,
	 *   value: "plonk"
	 * });
	 *
	 * canReflect.getOwnKeys(foo); // -> ["bar", "jeek"]
	 * ```
	 *
	 * @param  {Object} obj Any MapLike object
	 * @return {Array} the Array of all String keys from the object.
	 */
	getOwnKeys: function(obj){
		// own enumerable&non-enumerable keys (Object.getOwnPropertyNames)
		var getOwnKeys = obj[canSymbol.for("can.getOwnKeys")];
		if(getOwnKeys) {
			return getOwnKeys.call(obj);
		} else {
			return Object.getOwnPropertyNames(obj);
		}
	},
	/**
	 * @function can-reflect/shape.getOwnKeyDescriptor getOwnKeyDescriptor
	 * @parent can-reflect/shape
	 * @description Return a property descriptor for a named property on an object.
	 *
	 * @signature `getOwnKeyDescriptor(obj, key)`
	 *
	 *	Return the key descriptor for the property key `key` on the Map-like object `obj`. A key descriptor
	 *	is specified in ECMAScript 5 and contains keys for the property's `configurable` and `enumerable` states,
	 *	as well as either `value` and `writable` for value properties, or `get` and `set` for getter/setter properties.
	 *
	 * The default behavior can be overridden by implementing [can-symbol/symbols/getOwnKeyDescriptor @@@@can.getOwnKeyDescriptor]
	 * on `obj`; otherwise the default is to call `Object.getOwnKeyDescriptor()`.
	 *
	 * ```
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * getOwnKeyDescriptor(foo, "bar"); // -> {configurable: true, writable: true, enumerable: true, value: "baz"}
	 * ```
	 *
	 * @param  {Object} obj Any object with named properties
	 * @param  {String} key The property name to look up on `obj`
	 * @return {Object}   A key descriptor object
	 */
	getOwnKeyDescriptor: function(obj, key){
		var getOwnKeyDescriptor = obj[canSymbol.for("can.getOwnKeyDescriptor")];
		if(getOwnKeyDescriptor) {
			return getOwnKeyDescriptor.call(obj, key);
		} else {
			return Object.getOwnPropertyDescriptor(obj, key);
		}
	},

	unwrap: makeSerializer("unwrap",[canSymbol.for("can.unwrap")]),
	serialize: makeSerializer("serialize",[canSymbol.for("can.serialize"), canSymbol.for("can.unwrap")]),

	assignMap: function(target, source) {
		// read each key and set it on target
		var hasOwnKey = fastHasOwnKey(target);
		var getKeyValue = target[getKeyValueSymbol] || shiftedGetKeyValue;
		var setKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;
		this.eachKey(source,function(value, key){
			// if the target doesn't have this key or the keys are not the same
			if(!hasOwnKey(key) || getKeyValue.call(target, key) !==  value) {
				setKeyValue.call(target, key, value);
			}
		});
		return target;
	},
	assignList: function(target, source) {
		var inserting = this.toArray(source);
		getSetReflections.splice(target, 0, inserting, inserting );
		return target;
	},
	/**
	 * @function can-reflect/shape.assign assign
	 * @parent can-reflect/shape
	 * @description Assign one objects values to another
	 *
	 * @signature `.assign(target, source)`
	 *
	 * Copies the values (and properties if map-like) from `source` onto `target`.
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {};
	 * var source = {key : "value"};
	 * var restult = canReflect.assign(target, source);
	 * result === target //-> true
	 * target //-> {key : "value"}
	 * ```
	 *
	 * For Arrays, enumerated values are copied over, but the length of the array will not be
	 * trunkated.  Use [can-reflect.update] for trunkating.
	 *
	 * ```js
	 * var target = ["a","b","c"];
	 * var source = ["A","B"];
	 * canReflect.assign(target, source);
	 * target //-> ["A","B","c"]
	 * ```
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	assign: function(target, source) {
		if(typeReflections.isIteratorLike(source) || typeReflections.isMoreListLikeThanMapLike(source) ) {
			// copy to array and add these keys in place
			this.assignList(target, source);
		} else {
			this.assignMap(target, source);
		}
		return target;
	},
	assignDeepMap: function(target, source) {

		var hasOwnKey = fastHasOwnKey(target);
		var getKeyValue = target[getKeyValueSymbol] || shiftedGetKeyValue;
		var setKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;

		this.eachKey(source, function(newVal, key){
			if(!hasOwnKey(key)) {
				// set no matter what
				getSetReflections.setKeyValue(target, key, newVal);
			} else {
				var curVal = getKeyValue.call(target, key);

				// if either was primitive, no recursive update possible
				if(newVal === curVal) {
					// do nothing
				} else if(typeReflections.isPrimitive(curVal) || typeReflections.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false ) {
					setKeyValue.call(target, key, newVal);
				} else {
					this.assignDeep(curVal, newVal);
				}
			}
		}, this);
		return target;
	},
	assignDeepList: function(target, source) {
		return updateDeepList.call(this,target, source, true);
	},
	/**
	 * @function can-reflect/shape.assignDeep assignDeep
	 * @parent can-reflect/shape
	 * @description Assign one objects values to another, and performs the same action for all child values.
	 *
	 * @signature `.assignDeep(target, source)`
	 *
	 * Copies the values (and properties if map-like) from `source` onto `target` and repeates for all child
	 * values.
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {name: {first: "Justin"}};
	 * var source = {name: {last: "Meyer"}};
	 * var restult = canReflect.assignDeep(target, source);
	 * target //->  {name: {first: "Justin", last: "Meyer"}}
	 * ```
	 *
	 * An object can control the behavior of `assignDeep` using the [can-symbol/symbols/assignDeep] symbol.
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	assignDeep: function(target, source){
		var assignDeep = target[canSymbol.for("can.assignDeep")];
		if(assignDeep) {
			assignDeep.call(target, source);
		} else if( typeReflections.isMoreListLikeThanMapLike(source) ) {
			// list-like
			this.assignDeepList(target, source);
		} else {
			// map-like
			this.assignDeepMap(target, source);
		}
		return target;
	},
	updateMap: function(target, source) {
		var sourceKeyMap = makeMap( this.getOwnEnumerableKeys(source) );

		var sourceGetKeyValue = source[getKeyValueSymbol] || shiftedGetKeyValue;
		var targetSetKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;

		this.eachKey(target, function(curVal, key){
			if(!sourceKeyMap.get(key)) {
				getSetReflections.deleteKeyValue(target, key);
				return;
			}
			sourceKeyMap.set(key, false);
			var newVal = sourceGetKeyValue.call(source, key);

			// if either was primitive, no recursive update possible
			if(newVal !== curVal) {
				targetSetKeyValue.call(target, key, newVal);
			}
		}, this);

		this.eachIndex(sourceKeyMap.keys(), function(key){
			if(sourceKeyMap.get(key)) {
				targetSetKeyValue.call(target, key, sourceGetKeyValue.call(source, key) );
			}
		})

		return target;
	},
	updateList: function(target, source) {
		var inserting = this.toArray(source);

		getSetReflections.splice(target, 0, target, inserting );
		return target;
	},
	/**
	 * @function can-reflect/shape.update update
	 * @parent can-reflect/shape
	 * @description Updates the values of an object match the values of an other object.
	 *
	 * @signature `.update(target, source)`
	 *
	 * Updates the values (and properties if map-like) of `target` to match the values of `source`. This does
	 * not recursively update.  For that, use [can-reflect/shape.updateDeep].
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {name: {first: "Justin"}, age: 34};
	 * var source = {name: {last: "Meyer"}};
	 * var restult = canReflect.assignDeep(target, source);
	 * target //->  {name: {last: "Meyer"}}
	 * ```
	 *
	 * With Arrays all items of the source will be replaced with the new items.
	 *
	 * ```js
	 * var target = ["a","b","c"];
	 * var source = ["A","B"];
	 * canReflect.assign(target, source);
	 * target //-> ["A","B"]
	 * ```
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	update: function(target, source) {
		if(typeReflections.isIteratorLike(source) || typeReflections.isMoreListLikeThanMapLike(source) ) {
			// copy to array and add these keys in place
			this.updateList(target, source);
		} else {
			this.updateMap(target, source);
		}
		return target;
	},
	updateDeepMap: function(target, source) {
		var sourceKeyMap = makeMap( this.getOwnEnumerableKeys(source) );

		var sourceGetKeyValue = source[getKeyValueSymbol] || shiftedGetKeyValue;
		var targetSetKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;

		this.eachKey(target, function(curVal, key){

			if(!sourceKeyMap.get(key)) {
				getSetReflections.deleteKeyValue(target, key);
				return;
			}
			sourceKeyMap.set(key, false);
			var newVal = sourceGetKeyValue.call(source, key);

			// if either was primitive, no recursive update possible
			if(typeReflections.isPrimitive(curVal) || typeReflections.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false ) {
				targetSetKeyValue.call(target, key, newVal);
			} else {
				this.updateDeep(curVal, newVal);
			}

		}, this);

		this.eachIndex(sourceKeyMap.keys(), function(key){
			if(sourceKeyMap.get(key)) {
				targetSetKeyValue.call(target, key, sourceGetKeyValue.call(source, key) );
			}
		});
		return target;
	},
	updateDeepList: function(target, source) {
		return updateDeepList.call(this,target, source);
	},
	/**
	 * @function can-reflect/shape.updateDeep updateDeep
	 * @parent can-reflect/shape
	 * @description Makes the values of an object match the values of an other object including all children values.
	 *
	 * @signature `.updateDeep(target, source)`
	 *
	 * Updates the values (and properties if map-like) of `target` to match the values of `source`.
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {name: {first: "Justin"}, age: 34};
	 * var source = {name: {last: "Meyer"}};
	 * var restult = canReflect.assignDeep(target, source);
	 * target //->  {name: {last: "Meyer"}}
	 * ```
	 *
	 * An object can control the behavior of `assignDeep` using the [can-symbol/symbols/updateDeep] symbol.
	 *
	 * For list-like objects, a diff and patch strategy is used.  This attempts to limit the number of changes.
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	updateDeep: function(target, source){
		var updateDeep = target[canSymbol.for("can.updateDeep")];
		if(updateDeep) {
			updateDeep.call(target, source);
		} else if( typeReflections.isMoreListLikeThanMapLike(source) ) {
			// list-like
			this.updateDeepList(target, source);
		} else {
			// map-like
			this.updateDeepMap(target, source);
		}
		return target;
	},
	// walks up the whole property chain
	"in": function(){},
	getAllEnumerableKeys: function(){},
	getAllKeys: function(){},
	/**
	 * @function can-reflect/shape.assignSymbols assignSymbols
	 * @parent can-reflect/shape
	 * @description Assign well known symbols and values to an object.
	 *
	 * @signature `.assignSymbols(target, source)`
	 *
	 * Converts each property name on the `source` object to a [can-symbol.for well known symbol]
	 * and uses that symbol to set the corresponding value on target.
	 *
	 * This is used to easily set symbols correctly even when symbol isn't natively supported.
	 *
	 * ```js
	 * canReflect.assignSymbols(Map.prototype, {
	 *   "can.getKeyValue": Map.prototype.get
	 * })
	 * ```
	 *
	 * If a `source` property name matches a symbol on `Symbol` (like `iterator` on `Symbol.iterator`),
	 * that symbol will be used:
	 *
	 * ```js
	 * canReflect.assignSymbols(ArrayLike.prototype, {
	 *   "iterator": function() { ... }
	 * })
	 * ArrayLike.prototype[Symbol.iterator] = function(){ ... }
	 * ```
	 *
	 * @param  {Object} target The value that will be updated with `source`'s symbols and values.
	 * @param  {Object<name,value>} source A source of symbol names and values to copy to `target`.
	 * @return {Object} The target.
	 */
	assignSymbols: function(target, source){
		this.eachKey(source, function(value, key){
			var symbol = typeReflections.isSymbolLike(canSymbol[key]) ? canSymbol[key] : canSymbol.for(key);
			getSetReflections.setKeyValue(target, symbol, value);
		});
		return target;
	},
	isSerializable: isSerializable,
	/**
	 * @function can-reflect/shape.size size
	 * @parent can-reflect/shape
	 * @description Return the number of items in the collection.
	 *
	 * @signature `.size(target)`
	 *
	 * Returns the number of items contained in `target`. Target can
	 * provide the size using the [can-symbol/symbols/size] symbol.
	 *
	 * If the `target` has a numeric `length` property that is greater than or equal to 0, that
	 * `length` will be returned.
	 *
	 * ```js
	 * canReflect.size([1,2,3]) //-> 3
	 * ```
	 *
	 * If the `target` is [can-reflect.isListLike], the values of the list will be counted.
	 *
	 * If the `target` is a plain JS object, the number of enumerable properties will be returned.
	 *
	 * ```js
	 * canReflect.size({foo:"bar"}) //-> 1
	 * ```
	 *
	 * If the `target` is anything else, `undefined` is returned.
	 *
	 * @param  {Object} target The container object.
	 * @return {Number} The number of values in the target.
	 */
	size: function(obj){
		var size = obj[sizeSymbol];
		var count = 0;
		if(size) {
			return size.call(obj);
		}
		else if(helpers.hasLength(obj)){
			return obj.length;
		}
		else if(typeReflections.isListLike(obj)){

			this.each(obj, function(){
				count++;
			});
			return count;
		}
		else if( obj ) {

			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) {
					count++;
				}
			}
			return count;
		}
		else {
			return undefined;
		}
	},
	/**
	 * @function {Function, String|Symbol, Object} can-reflect/shape.defineInstanceKey defineInstanceKey
	 * @parent can-reflect/shape
	 * @description Create a key for all instances of a constructor.
	 *
	 * @signature `defineInstanceKey(cls, key, properties)`
	 *
	 * Define the property `key` on the prototype of the constructor `cls` using the symbolic
	 * property [can-symbol/symbols/defineInstanceKey @@can.defineInstanceKey] if it exists; otherwise
	 * use `Object.defineProperty()` to define the property.  The property definition
	 *
	 * @param  {Function} cls  a Constructor function
	 * @param  {String} key     the String or Symbol key to set.
	 * @param  {Object} properties a JavaScript property descriptor
	 */
	defineInstanceKey: function(cls, key, properties) {
		var defineInstanceKey = cls[canSymbol.for("can.defineInstanceKey")];
		if(defineInstanceKey) {
			return defineInstanceKey.call(cls, key, properties);
		}
		var proto = cls.prototype;
		defineInstanceKey = proto[canSymbol.for("can.defineInstanceKey")];
		if(defineInstanceKey) {
			defineInstanceKey.call(proto, key, properties);
		} else {
			Object.defineProperty(
				proto,
				key,
				shapeReflections.assign({
					configurable: true,
					enumerable: !typeReflections.isSymbolLike(key),
					writable: true
				}, properties)
			);
		}
	}
};
shapeReflections.keys = shapeReflections.getOwnEnumerableKeys;
module.exports = shapeReflections;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*can-dom-data-state@0.1.1#can-dom-data-state*/

var namespace = __webpack_require__(2);
var CID = __webpack_require__(7);
var data = {};
var isEmptyObject = function (obj) {
    for (var prop in obj) {
        return false;
    }
    return true;
};
var setData = function (name, value) {
    var id = CID(this);
    var store = data[id] || (data[id] = {});
    if (name !== undefined) {
        store[name] = value;
    }
    return store;
};
var deleteNode = function () {
    var id = CID.get(this);
    var nodeDeleted = false;
    if (id && data[id]) {
        nodeDeleted = true;
        delete data[id];
    }
    return nodeDeleted;
};
var domDataState = {
    _data: data,
    getCid: function () {
        return CID.get(this);
    },
    cid: function () {
        return CID(this);
    },
    expando: CID.domExpando,
    get: function (key) {
        var id = CID.get(this), store = id && data[id];
        return key === undefined ? store : store && store[key];
    },
    set: setData,
    clean: function (prop) {
        var id = CID.get(this);
        var itemData = data[id];
        if (itemData && itemData[prop]) {
            delete itemData[prop];
        }
        if (isEmptyObject(itemData)) {
            deleteNode.call(this);
        }
    },
    delete: deleteNode
};
if (namespace.domDataState) {
    throw new Error('You can\'t have two versions of can-dom-data-state, check your dependencies');
} else {
    module.exports = namespace.domDataState = domDataState;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/log/log log
 * @parent deprecated
 * @description Deprecated. Use [can-log] instead.
 */

 //!steal-remove-start
//  canDev.warn('js/log/log is deprecated; please use can-log instead: https://github.com/canjs/can-log');
 //!steal-remove-end

module.exports = __webpack_require__(47);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*can-log@0.1.1#can-log*/

exports.warnTimeout = 5000;
exports.logLevel = 0;
exports.warn = function (out) {
    var ll = this.logLevel;
    if (ll < 2) {
        Array.prototype.unshift.call(arguments, 'WARN:');
        if (typeof console !== 'undefined' && console.warn) {
            this._logger('warn', Array.prototype.slice.call(arguments));
        } else if (typeof console !== 'undefined' && console.log) {
            this._logger('log', Array.prototype.slice.call(arguments));
        } else if (window && window.opera && window.opera.postError) {
            window.opera.postError('CanJS WARNING: ' + out);
        }
    }
};
exports.log = function (out) {
    var ll = this.logLevel;
    if (ll < 1) {
        if (typeof console !== 'undefined' && console.log) {
            Array.prototype.unshift.call(arguments, 'INFO:');
            this._logger('log', Array.prototype.slice.call(arguments));
        } else if (window && window.opera && window.opera.postError) {
            window.opera.postError('CanJS INFO: ' + out);
        }
    }
};
exports.error = function (out) {
    var ll = this.logLevel;
    if (ll < 1) {
        if (typeof console !== 'undefined' && console.error) {
            Array.prototype.unshift.call(arguments, 'ERROR:');
            this._logger('error', Array.prototype.slice.call(arguments));
        } else if (window && window.opera && window.opera.postError) {
            window.opera.postError('ERROR: ' + out);
        }
    }
};
exports._logger = function (type, arr) {
    try {
        console[type].apply(console, arr);
    } catch (e) {
        console[type](arr);
    }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/cid-set/cid-set cid-set
 * @parent deprecated
 * @description Deprecated. Use [can-cid/set/set] instead.
 */

//!steal-remove-start
// canDev.warn('js/cid-set/cid-set is deprecated; please use can-globals instead: https://github.com/canjs/can-cid');
//!steal-remove-end

module.exports = __webpack_require__(66);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint maxdepth:7,node:true, latedef:false */
var namespace = __webpack_require__(2),
	dev = __webpack_require__(5),
	encoder = __webpack_require__(71);

function each(items, callback){
	for ( var i = 0; i < items.length; i++ ) {
		callback(items[i], i);
	}
}

function makeMap(str){
	var obj = {}, items = str.split(",");
	each(items, function(name){
		obj[name] = true;
	});
	return obj;
}

function handleIntermediate(intermediate, handler){
	for(var i = 0, len = intermediate.length; i < len; i++) {
		var item = intermediate[i];
		handler[item.tokenType].apply(handler, item.args);
	}
	return intermediate;
}

//!steal-remove-start
function countLines(input) {
	// TODO: optimize?
	return input.split('\n').length - 1;
}
//!steal-remove-end

var alphaNumeric = "A-Za-z0-9",
	alphaNumericHU = "-:_"+alphaNumeric,
	defaultMagicStart = "{{",
	endTag = new RegExp("^<\\/(["+alphaNumericHU+"]+)[^>]*>"),
	defaultMagicMatch = new RegExp("\\{\\{(![\\s\\S]*?!|[\\s\\S]*?)\\}\\}\\}?","g"),
	space = /\s/,
	alphaRegex = new RegExp('['+ alphaNumeric + ']');

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

// Elements for which tag case matters - shouldn't be lowercased.
var caseMattersElements = makeMap("altGlyph,altGlyphDef,altGlyphItem,animateColor,animateMotion,animateTransform,clipPath,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,foreignObject,glyphRef,linearGradient,radialGradient,textPath");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Special Elements (can contain anything)
var special = makeMap("script");

// Callback names on `handler`.
var tokenTypes = "start,end,close,attrStart,attrEnd,attrValue,chars,comment,special,done".split(",");

//maps end characters to start characters
var startOppositesMap = {"{": "}", "(":")"};

var fn = function(){};

var HTMLParser = function (html, handler, returnIntermediate) {
	if(typeof html === "object") {
		return handleIntermediate(html, handler);
	}

	var intermediate = [];
	handler = handler || {};
	if(returnIntermediate) {
		// overwrite handlers so they add to intermediate
		each(tokenTypes, function(name){
			var callback = handler[name] || fn;
			handler[name] = function(){
				if( callback.apply(this, arguments) !== false ) {
					var end = arguments.length;

					// the intermediate is stringified in the compiled stache templates
					// so we want to trim the last item if it is the line number
					if (arguments[end - 1] === undefined) {
						end = arguments.length - 1;
					}

					//!steal-remove-start
					// but restore line number in dev mode
					end = arguments.length;
					//!steal-remove-end

					intermediate.push({
						tokenType: name,
						args: [].slice.call(arguments, 0, end),
					});
				}
			};
		});
	}

	var magicMatch = handler.magicMatch || defaultMagicMatch,
		magicStart = handler.magicStart || defaultMagicStart;

	if (handler.magicMatch) {
		dev.warn("can-view-parser: magicMatch is deprecated.");
	}

	if (handler.magicStart) {
		dev.warn("can-view-parser: magicStart is deprecated.");
	}

	function parseStartTag(tag, tagName, rest, unary) {
		tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();

		if (closeSelf[tagName] && stack.last() === tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;
		handler.start(tagName, unary, lineNo);
		if (!unary) {
			stack.push(tagName);
		}

		// find attribute or special
		HTMLParser.parseAttrs(rest, handler, lineNo);

		//!steal-remove-start
		lineNo += countLines(tag);
		//!steal-remove-end


		handler.end(tagName, unary, lineNo);

	}

	function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		var pos;
		if (!tagName) {
			pos = 0;
		}
		// Find the closest opened tag of the same type
		else {
			tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();
			for (pos = stack.length - 1; pos >= 0; pos--) {
				if (stack[pos] === tagName) {
					break;
				}
			}
		}

		//!steal-remove-start
		if (typeof tag === 'undefined') {
			if (stack.length > 0) {
				if (handler.filename) {
					dev.warn(handler.filename + ": expected closing tag </" + stack[pos] + ">");
				}
				else {
					dev.warn("expected closing tag </" + stack[pos] + ">");
				}
			}
		} else if (pos < 0 || pos !== stack.length - 1) {
			if (stack.length > 0) {
				if (handler.filename) {
					dev.warn(handler.filename + ":" + lineNo + ": unexpected closing tag " + tag + " expected </" + stack[stack.length - 1] + ">");
				}
				else {
					dev.warn(lineNo + ": unexpected closing tag " + tag + " expected </" + stack[stack.length - 1] + ">");
				}
			} else {
				if (handler.filename) {
					dev.warn(handler.filename + ":" + lineNo + ": unexpected closing tag " + tag);
				}
				else {
					dev.warn(lineNo + ": unexpected closing tag " + tag);
				}
			}
		}
		//!steal-remove-end

		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--) {
				if (handler.close) {
					handler.close(stack[i], lineNo);
				}
			}

			// Remove the open elements from the stack
			stack.length = pos;
		}
	}

	function parseMustache(mustache, inside){
		if(handler.special){
			handler.special(inside, lineNo);
		}
	}

	var callChars = function(){
		if(charsText) {
			if(handler.chars) {
				handler.chars(charsText, lineNo);
			}

			//!steal-remove-start
			lineNo += countLines(charsText);
			//!steal-remove-end
		}

		charsText = "";
	};

	var index,
		chars,
		match,
		lineNo,
		stack = [],
		last = html,
		// an accumulating text for the next .chars callback
		charsText = "";

	//!steal-remove-start
	lineNo = 1;
	//!steal-remove-end

	stack.last = function () {
		return this[this.length - 1];
	};

	while (html) {

		chars = true;

		// Make sure we're not in a script or style element
		if (!stack.last() || !special[stack.last()]) {

			// Comment
			if (html.indexOf("<!--") === 0) {
				index = html.indexOf("-->");

				if (index >= 0) {
					callChars();
					if (handler.comment) {
						handler.comment(html.substring(4, index), lineNo);
					}

					//!steal-remove-start
					lineNo += countLines(html.substring(0, index + 3));
					//!steal-remove-end

					html = html.substring(index + 3);
					chars = false;
				}

				// end tag
			} else if (html.indexOf("</") === 0) {
				match = html.match(endTag);

				if (match) {
					callChars();
					match[0].replace(endTag, parseEndTag);

					//!steal-remove-start
					lineNo += countLines(html.substring(0, match[0].length));
					//!steal-remove-end

					html = html.substring(match[0].length);
					chars = false;
				}

				// start tag
			} else if (html.indexOf("<") === 0) {
				var res = HTMLParser.searchStartTag(html);

				if(res) {
					callChars();
					parseStartTag.apply(null, res.match);

					html = res.html;
					chars = false;
				}

				// magic tag
			} else if (html.indexOf(magicStart) === 0 ) {
				match = html.match(magicMatch);

				if (match) {
					callChars();
					match[0].replace(magicMatch, parseMustache);

					//!steal-remove-start
					lineNo += countLines(html.substring(0, match[0].length));
					//!steal-remove-end

					html = html.substring(match[0].length);
				}
			}

			if (chars) {
				index = findBreak(html, magicStart);
				if(index === 0 && html === last) {
					charsText += html.charAt(0);
					html = html.substr(1);
					index = findBreak(html, magicStart);
				}

				var text = index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (text) {
					charsText += text;
				}
			}

		} else {
			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) {
					handler.chars(text, lineNo);
				}

				//!steal-remove-start
				lineNo += countLines(text);
				//!steal-remove-end

				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html === last) {
			throw new Error("Parse Error: " + html);
		}

		last = html;
	}
	callChars();
	// Clean up any remaining tags
	parseEndTag();


	handler.done(lineNo);
	return intermediate;
};

var callAttrStart = function(state, curIndex, handler, rest, lineNo){
	var attrName = rest.substring(typeof state.nameStart === "number" ? state.nameStart : curIndex, curIndex),
		newAttrName = encoder.encode(attrName);

	state.attrStart = newAttrName;
	handler.attrStart(state.attrStart, lineNo);
	state.inName = false;
};

var callAttrEnd = function(state, curIndex, handler, rest, lineNo){
	if(state.valueStart !== undefined && state.valueStart < curIndex) {
		var val = rest.substring(state.valueStart, curIndex);
		//!steal-remove-start
		var quotedVal, closedQuote;
		quotedVal = rest.substring(state.valueStart - 1, curIndex + 1);
		quotedVal = quotedVal.trim();
		closedQuote = quotedVal.charAt(quotedVal.length - 1);
		
		if (state.inQuote !== closedQuote) {
			if (handler.filename) {
				dev.warn(handler.filename + ":" + lineNo + ": End quote is missing for " + val);
			} else {
				dev.warn(lineNo + ": End quote is missing for " + val);
			}
		}
		//!steal-remove-end
		handler.attrValue(val, lineNo);
	}
	// if this never got to be inValue, like `DISABLED` then send a attrValue
	// else if(!state.inValue){
	// 	handler.attrValue(state.attrStart, lineNo);
	// }

	handler.attrEnd(state.attrStart, lineNo);
	state.attrStart = undefined;
	state.valueStart = undefined;
	state.inValue = false;
	state.inName = false;
	state.lookingForEq = false;
	state.inQuote = false;
	state.lookingForName = true;
};

var findBreak = function(str, magicStart) {
	var magicLength = magicStart.length;
	for(var i = 0, len = str.length; i < len; i++) {
		if(str[i] === "<" || str.substr(i, magicLength) === magicStart) {
			return i;
		}
	}
	return -1;
};

HTMLParser.parseAttrs = function(rest, handler, lineNo){
	if(!rest) {
		return;
	}

	var magicMatch = handler.magicMatch || defaultMagicMatch,
		magicStart = handler.magicStart || defaultMagicStart;

	var i = 0;
	var curIndex;
	var state = {
		inName: false,
		nameStart: undefined,
		inValue: false,
		valueStart: undefined,
		inQuote: false,
		attrStart: undefined,
		lookingForName: true,
		lookingForValue: false,
		lookingForEq : false
	};

	while(i < rest.length) {
		curIndex = i;
		var cur = rest.charAt(i);
		i++;

		if(magicStart === rest.substr(curIndex, magicStart.length) ) {
			if(state.inValue && curIndex > state.valueStart) {
				handler.attrValue(rest.substring(state.valueStart, curIndex), lineNo);
			}
			// `{{#foo}}DISABLED{{/foo}}`
			else if(state.inName && state.nameStart < curIndex) {
				callAttrStart(state, curIndex, handler, rest, lineNo);
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}
			// foo={{bar}}
			else if(state.lookingForValue){
				state.inValue = true;
			}
			// a {{bar}}
			else if(state.lookingForEq && state.attrStart) {
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}

			magicMatch.lastIndex = curIndex;
			var match = magicMatch.exec(rest);
			if(match) {
				handler.special(match[1], lineNo);
				// i is already incremented
				i = curIndex + (match[0].length);
				if(state.inValue) {
					state.valueStart = curIndex+match[0].length;
				}
			}
		}
		else if(state.inValue) {
			if(state.inQuote) {
				if(cur === state.inQuote) {
					callAttrEnd(state, curIndex, handler, rest, lineNo);
				}
			}
			else if(space.test(cur)) {
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}
		}
		// if we hit an = outside a value
		else if(cur === "=" && (state.lookingForEq || state.lookingForName || state.inName)) {
			// if we haven't yet started this attribute `{{}}=foo` case:
			if(!state.attrStart) {
				callAttrStart(state, curIndex, handler, rest, lineNo);
			}
			state.lookingForValue = true;
			state.lookingForEq = false;
			state.lookingForName = false;
		}
		// if we are currently in a name:
		//  when the name starts with `{` or `(`
		//  it isn't finished until the matching end character is found
		//  otherwise, a space finishes the name
		else if(state.inName) {
			var started = rest[ state.nameStart ],
					otherStart, otherOpposite;
			if(startOppositesMap[started] === cur) {
				//handle mismatched brackets: `{(})` or `({)}`
				otherStart = started === "{" ? "(" : "{";
				otherOpposite = startOppositesMap[otherStart];

				if(rest[curIndex+1] === otherOpposite){
					callAttrStart(state, curIndex+2, handler, rest, lineNo);
					i++;
				}else{
					callAttrStart(state, curIndex+1, handler, rest, lineNo);
				}

				state.lookingForEq = true;
			}
			else if(space.test(cur) && started !== "{" && started !== "(") {
					callAttrStart(state, curIndex, handler, rest, lineNo);
					state.lookingForEq = true;
			}
		}
		else if(state.lookingForName) {
			if(!space.test(cur)) {
				// might have just started a name, we need to close it
				if(state.attrStart) {
					callAttrEnd(state, curIndex, handler, rest, lineNo);
				}
				state.nameStart = curIndex;
				state.inName = true;
			}
		}
		else if(state.lookingForValue) {
			if(!space.test(cur)) {
				state.lookingForValue = false;
				state.inValue = true;
				if(cur === "'" || cur === '"') {
					state.inQuote = cur;
					state.valueStart = curIndex+1;
				} else {
					state.valueStart = curIndex;
				}
				// if we are looking for a value
				// at the end of the loop we need callAttrEnd
			} else if (i === rest.length){
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}
		}
	}

	if(state.inName) {
		callAttrStart(state, curIndex+1, handler, rest, lineNo);
		callAttrEnd(state, curIndex+1, handler, rest, lineNo);
	} else if(state.lookingForEq || state.lookingForValue || state.inValue) {
		callAttrEnd(state, curIndex+1, handler, rest, lineNo);
	}
	magicMatch.lastIndex = 0;
};

HTMLParser.searchStartTag = function (html) {
	var closingIndex = html.indexOf('>');
	// if there is no closing bracket
	// <input class=
	// or if the tagName does not start with alphaNumer character
	// <_iaois>
	// it is not a startTag
	if(closingIndex === -1 || !(alphaRegex.test(html[1]))){
		return null;
	}

	var tagName, tagContent, match, rest = '', unary = '';
	var startTag = html.substring(0, closingIndex + 1);
	var isUnary = startTag[startTag.length-2] === '/';
	var spaceIndex = startTag.search(space);

	if(isUnary){
		unary = '/';
		tagContent = startTag.substring(1, startTag.length-2).trim();
	} else {
		tagContent = startTag.substring(1, startTag.length-1).trim();
	}

	if(spaceIndex === -1){
		tagName = tagContent;
	} else {
		//spaceIndex needs to shift one to the left
		spaceIndex--;
		tagName = tagContent.substring(0, spaceIndex);
		rest = tagContent.substring(spaceIndex);
	}

	match = [startTag, tagName, rest, unary];

	return {
		match: match,
		html: html.substring(startTag.length),
	};


};

module.exports = namespace.HTMLParser = HTMLParser;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(9);
module.exports = function(el) {
	return (el.ownerDocument || el) === getDocument();
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// # can/view/scope/scope.js
//
// This allows you to define a lookup context and parent contexts that a key's value can be retrieved from.
// If no parent scope is provided, only the scope's context will be explored for values.
var observeReader = __webpack_require__(31);
var Observation = __webpack_require__(4);
var TemplateContext = __webpack_require__(139);
var makeComputeData = __webpack_require__(141);
var assign = __webpack_require__(3);
var each = __webpack_require__(6);
var namespace = __webpack_require__(2);
var canReflect = __webpack_require__(0);
var canLog = __webpack_require__(5);
var defineLazyValue = __webpack_require__(70);

// these keywords will be read using
// Scope.prototype._read(..., { special: true })
var specialKeywords = {
	index: true,
	key: true,
	element: true,
	event: true,
	viewModel: true,
	arguments: true
};

function Scope(context, parent, meta) {
	// The obj that will be looked on for values.
	this._context = context;
	// The next Scope object whose context should be looked on for values.
	this._parent = parent;
	// If this is a special context, it can be labeled here.
	// Options are:
	// - viewModel - This is a viewModel
	// - notContext - This can't be looked within using `./` and `../`. It will be skipped.
	//   This is for virtual contexts like those used by `%index`.
	// - special - This can't be looked within using `./` and `../`. It will be skipped.
	//   This is for reading properties like {{scope.index}}.
	this._meta = meta || {};

	// A cache that can be used to store computes used to look up within this scope.
	// For example if someone creates a compute to lookup `name`, another compute does not
	// need to be created.
	this.__cache = {};
}

assign(Scope, {
	// ## Scope.read
	// Scope.read was moved to can.compute.read
	// can.compute.read reads properties from a parent.  A much more complex version of getObject.
	read: observeReader.read,
	// ## Scope.Refs
	// A Map-like object used for the references scope.
	Refs: TemplateContext,

	// ## Scope.refsScope
	// A scope with a references scope in it and no parent.
	refsScope: function() {
		return new Scope(new TemplateContext());
	},
	keyInfo: function(attr){
		var info = {};
		info.isDotSlash = attr.substr(0, 2) === './';
		info.isThisDot = attr.substr(0,5) === "this.";
		info.isThisAt = attr.substr(0,5) === "this@";
		info.isInCurrentContext = info.isDotSlash || info.isThisDot || info.isThisAt;
		info.isInParentContext = attr.substr(0, 3) === "../";
		info.isCurrentContext = attr === "." || attr === "this";
		info.isParentContext = attr === "..";
		info.isScope = attr === "scope";
		info.isLegacyView = attr === "*self";
		info.isInLegacyRefsScope =
			info.isLegacyView ||
			attr.substr(0, 1) === "*" ||
			attr.substr(0, 2) === "@*";
		info.isInTemplateContextVars =
			info.isInLegacyRefsScope ||
			attr.substr(0, 11) === "scope.vars.";
		info.isInTemplateContext =
			info.isInTemplateContextVars ||
			attr.substr(0, 6) === "scope.";
		info.isContextBased = info.isInCurrentContext ||
			info.isInParentContext ||
			info.isCurrentContext ||
			info.isParentContext;
		return info;
	}
});

assign(Scope.prototype, {

	// ## Scope.prototype.add
	// Creates a new scope and sets the current scope to be the parent.
	// ```
	// var scope = new can.view.Scope([
	//   {name:"Chris"},
	//   {name: "Justin"}
	// ]).add({name: "Brian"});
	// scope.attr("name") //-> "Brian"
	// ```
	add: function(context, meta) {
		if (context !== this._context) {
			return new this.constructor(context, this, meta);
		} else {
			return this;
		}
	},
	// ## Scope.prototype.read
	// Reads from the scope chain and returns the first non-`undefined` value.
	// `read` deals mostly with setting up "context based" keys to start reading
	// from the right scope.  Once the right scope is located, `_read` is called.
	/**
	 * @hide
	 * @param {can.stache.key} attr A dot seperated path.  Use `"\."` if you have a property name that includes a dot.
	 * @param {can.view.Scope.readOptions} options that configure how this gets read.
	 * @return {{}}
	 *   @option {Object} parent the value's immediate parent
	 *   @option {can.Map|can.compute} rootObserve the first observable to read from.
	 *   @option {Array<String>} reads An array of properties that can be used to read from the rootObserve to get the value.
	 *   @option {*} value the found value
	 */
	read: function(attr, options) {
		// If it's the root, jump right to it.
		if (attr === "%root") {
			return {
				value: this.getRoot()
			};
		}

		// return a reference to itself when looking up "%scope"
		if (attr === "%scope") {
			return {
				value: this
			};
		}

		// make `{{./}}` an alias for `{{.}}`
		if (attr === "./") {
			attr = ".";
		}

		// Identify context based keys.  Context based keys try to
		// specify a particular context a key should be within.
		var keyInfo = Scope.keyInfo(attr);

		// `notContext` contexts should be skipped if the key is "context based".
		// For example, the context that holds `%index`.
		if (keyInfo.isContextBased && (this._meta.notContext || this._meta.special)) {
			return this._parent.read(attr, options);
		}

		// If true, lookup stops after the current context.
		var currentScopeOnly;

		if (keyInfo.isInCurrentContext) {
			// Stop lookup from checking parent scopes.
			// Set flag to halt lookup from walking up scope.
			currentScopeOnly = true;
			attr = keyInfo.isDotSlash ? attr.substr(2) : attr.substr(5);
		} else if (keyInfo.isInParentContext || keyInfo.isParentContext) {
			// walk up until we find a parent that can have context.
			// the `isContextBased` check above won't catch it when you go from
			// `../foo` to `foo` because `foo` isn't context based.
			var parent = this._parent;
			while (parent._meta.notContext || parent._meta.special) {
				parent = parent._parent;
			}

			if (keyInfo.isParentContext) {
				return observeReader.read(parent._context, [], options);
			}

			return parent.read(attr.substr(3) || ".", options);
		} else if (keyInfo.isCurrentContext) {
			return observeReader.read(this._context, [], options);
		} else if (keyInfo.isScope) {
			return { value: this };
		}

		var keyReads = observeReader.reads(attr);
		if (keyInfo.isInTemplateContext) {
			if (keyInfo.isInLegacyRefsScope) {
				//!steal-remove-start
				var filename = this.peek("scope.filename");
				var lineNumber = this.peek("scope.lineNumber");

				if (keyInfo.isLegacyView) {
					keyReads[0].key = "view";

					canLog.warn(
						(filename ? filename + ':' : '') +
						(lineNumber ? lineNumber + ': ' : '') +
						"{{>*self}} is deprecated. Use {{>scope.view}} instead."
					);
				} else {
					keyReads[0] = {
						key: keyReads[0].key.substr(1),
						at: true
					};

					canLog.warn(
						(filename ? filename + ':' : '') +
						(lineNumber ? lineNumber + ': ' : '') +
						"{{*" + keyReads[0].key + "}} is deprecated. Use {{scope.vars." + keyReads[0].key + "}} instead."
					);

					keyReads.unshift({ key: 'vars' });
				}
				//!steal-remove-end
			} else {
				keyReads = keyReads.slice(1);
			}

			if (specialKeywords[keyReads[0].key]) {
				return this._read(keyReads, { special: true });
			}

			if (keyReads.length === 1) {
				return { value: this.templateContext[ keyReads[0].key ] };
			}

			return this.getTemplateContext()._read(keyReads);
		}

		return this._read(keyReads, options, currentScopeOnly);
	},
	// ## Scope.prototype._read
	//
	_read: function(keyReads, options, currentScopeOnly) {
		// The current scope and context we are trying to find "keyReads" within.
		var currentScope = this,
			currentContext,

			// If no value can be found, this is a list of of every observed
			// object and property name to observe.
			undefinedObserves = [],

			// Tracks the first found observe.
			currentObserve,
			// Tracks the reads to get the value from `currentObserve`.
			currentReads,

			// Tracks the most likely observable to use as a setter.
			setObserveDepth = -1,
			currentSetReads,
			currentSetObserve,

			ignoreSpecialContexts,
			ignoreNonSpecialContexts,

			readOptions = assign({
				/* Store found observable, incase we want to set it as the rootObserve. */
				foundObservable: function(observe, nameIndex) {
					currentObserve = observe;
					currentReads = keyReads.slice(nameIndex);
				},
				earlyExit: function(parentValue, nameIndex) {
					if (nameIndex > setObserveDepth || (nameIndex === setObserveDepth && (typeof parentValue === "object" && keyReads[nameIndex].key in parentValue))) {
						currentSetObserve = currentObserve;
						currentSetReads = currentReads;
						setObserveDepth = nameIndex;
					}
				}
			}, options);

		// Goes through each scope context provided until it finds the key (attr).  Once the key is found
		// then it's value is returned along with an observe, the current scope and reads.
		// While going through each scope context searching for the key, each observable found is returned and
		// saved so that either the observable the key is found in can be returned, or in the case the key is not
		// found in an observable the closest observable can be returned.

		while (currentScope) {
			currentContext = currentScope._context;

			// ignore contexts that aren't special if we should only read from special contexts
			ignoreNonSpecialContexts =
				options && options.special && !currentScope._meta.special;

			// ignore contexts that are special if we are not trying to read from special context
			ignoreSpecialContexts =
				(!options || options.special !== true) && currentScope._meta.special;

			if (currentContext !== null &&
				// if its a primitive type, keep looking up the scope, since there won't be any properties
				(typeof currentContext === "object" || typeof currentContext === "function") &&
				!ignoreNonSpecialContexts &&
				!ignoreSpecialContexts
			) {

				// Prevent computes from temporarily observing the reading of observables.
				var getObserves = Observation.trap();

				var data = observeReader.read(currentContext, keyReads, readOptions);

				// Retrieve the observes that were read.
				var observes = getObserves();
				// If a **value was was found**, return value and location data.
				if (data.value !== undefined) {
					Observation.addAll(observes);
					return {
						scope: currentScope,
						rootObserve: currentObserve,
						value: data.value,
						reads: currentReads
					};
				}
				// Otherwise, save all observables that were read.  If no value
				// is found, we will observe on all of them.
				else {
					undefinedObserves.push.apply(undefinedObserves, observes);
				}
			}

			//
			if (currentScopeOnly) {
				currentScope = null;
			} else {
				// Move up to the next scope.
				currentScope = currentScope._parent;
			}
		}

		// The **value was not found**, return `undefined` for the value.
		// Make sure we listen to everything we checked for when the value becomes defined.
		// Once it becomes defined, we won't have to listen to so many things.
		Observation.addAll(undefinedObserves);
		return {
			setRoot: currentSetObserve,
			reads: currentSetReads,
			value: undefined
		};
	},

	// ## Scope.prototype.get
	// Gets a value from the scope without being observable.
	get: function(key, options) {

		options = assign({
			isArgument: true
		}, options);

		var res = this.read(key, options);
		return res.value;
	},
	peek: Observation.ignore(function(key, options) {
		return this.get(key, options);
	}),
	peak: Observation.ignore(function(key, options) {
		//!steal-remove-start
		canLog.warn('peak is deprecated, please use peek instead');
		//!steal-remove-end
		return this.peek(key, options);
	}),
	// ## Scope.prototype.getScope
	// Returns the first scope that passes the `tester` function.
	getScope: function(tester) {
		var scope = this;
		while (scope) {
			if (tester(scope)) {
				return scope;
			}
			scope = scope._parent;
		}
	},
	// ## Scope.prototype.getContext
	// Returns the first context whose scope passes the `tester` function.
	getContext: function(tester) {
		var res = this.getScope(tester);
		return res && res._context;
	},
	// ## Scope.prototype.getRefs
	// Returns the first references scope.
	// Used by `.read` when looking up `*key` and by the references
	// view binding.
	getRefs: function() {
		return this.getTemplateContext();
	},
	// ## Scope.prototype.getTemplateContext
	// Returns the template context
	getTemplateContext: function() {
		var lastScope;

		// find the first reference scope
		var templateContext = this.getScope(function(scope) {
			lastScope = scope;
			return scope._context instanceof TemplateContext;
		});

		// if there is no reference scope, add one as the root
		if(!templateContext) {
			templateContext = new Scope(new TemplateContext());

			// add templateContext to root of the scope chain so it
			// can be found using `getScope` next time it is looked up
			lastScope._parent = templateContext;
		}
		return templateContext;
	},
	// ## Scope.prototype.getRoot
	// Returns the top most context that is not a references scope.
	// Used by `.read` to provide `%root`.
	getRoot: function() {
		var cur = this,
			child = this;

		while (cur._parent) {
			child = cur;
			cur = cur._parent;
		}

		if (cur._context instanceof Scope.Refs) {
			cur = child;
		}
		return cur._context;
	},
	set: function(key, value, options) {
		options = options || {};

		var keyInfo = Scope.keyInfo(key),
			parent;

		// Use `.read` to read everything upto, but not including the last property name
		// to find the object we want to set some property on.
		// For example:
		//  - `foo.bar` -> `foo`
		//  - `../foo.bar` -> `../foo`
		//  - `../foo` -> `..`
		//  - `foo` -> `.`
		if ( keyInfo.isCurrentContext ) {
			return canReflect.setValue(this._context, value);
		} else if (keyInfo.isInParentContext || keyInfo.isParentContext) {
			// walk up until we find a parent that can have context.
			// the `isContextBased` check above won't catch it when you go from
			// `../foo` to `foo` because `foo` isn't context based.
			parent = this._parent;
			while (parent._meta.notContext) {
				parent = parent._parent;
			}

			if (keyInfo.isParentContext) {
				return canReflect.setValue(parent._context, value);
			}

			return parent.set(key.substr(3) || ".", value, options);
		} else if (keyInfo.isInTemplateContext) {
			if (keyInfo.isInLegacyRefsScope) {
				return this.vars.set( key.substr(1), value );
			}

			if (keyInfo.isInTemplateContextVars) {
				return this.vars.set( key.substr(11), value );
			}

			key = key.substr(6);

			if (key.indexOf(".") < 0) {
				return this.templateContext[ key ] = value;
			}

			return this.getTemplateContext().set(key, value);
		}

		var dotIndex = key.lastIndexOf('.'),
			slashIndex = key.lastIndexOf('/'),
			contextPath,
			propName;

		if (slashIndex > dotIndex) {
			// ../foo
			contextPath = key.substring(0, slashIndex);
			propName = key.substring(slashIndex + 1, key.length);
		} else {
			if (dotIndex !== -1) {
				// ./foo
				contextPath = key.substring(0, dotIndex);
				propName = key.substring(dotIndex + 1, key.length);
			} else {
				// foo.bar
				contextPath = ".";
				propName = key;
			}
		}

		var context = this.read(contextPath, options).value;
		if (context === undefined) {
			//!steal-remove-start
			canLog.error('Attempting to set a value at ' + key + ' where ' + contextPath + ' is undefined.');
			//!steal-remove-end

			return;
		}

		if(!canReflect.isObservableLike(context) && canReflect.isObservableLike(context[propName])) {
			if(canReflect.isMapLike(context[propName])) {
				canLog.warn("can-view-scope: Merging data into \"" + propName + "\" because its parent is non-observable");
				canReflect.updateDeep(context[propName], value);
			}
			else if(canReflect.isValueLike(context[propName])){
				canReflect.setValue(context[propName], value);
			} else {
				observeReader.write(context, propName, value, options);
			}
		} else {
			observeReader.write(context, propName, value, options);
		}
	},

	// ## Scope.prototype.attr
	// Gets or sets a value in the scope without being observable.
	attr: Observation.ignore(function(key, value, options) {
		canLog.warn("can-view-scope::attr is deprecated, please use peek, get or set");

		options = assign({
			isArgument: true
		}, options);

		// Allow setting a value on the context
		if (arguments.length === 2) {
			return this.set(key, value, options);

		} else {
			return this.get(key, options);
		}
	}),

	// ## Scope.prototype.computeData
	// Finds the first location of the key in the scope and then provides a get-set compute that represents the key's value
	// and other information about where the value was found.
	computeData: function(key, options) {
		return makeComputeData(this, key, options);
	},

	// ## Scope.prototype.compute
	// Provides a get-set compute that represents a key's value.
	compute: function(key, options) {
		return this.computeData(key, options)
			.compute;
	},
	// ## Scope.prototype.cloneFromRef
	//
	// This takes a scope and essentially copies its chain from
	// right before the last Refs.  And it does not include the ref.
	// this is a helper function to provide lexical semantics for refs.
	// This will not be needed for leakScope: false.
	cloneFromRef: function() {
		var contexts = [];
		var scope = this,
			context,
			parent;
		while (scope) {
			context = scope._context;
			if (context instanceof Scope.Refs) {
				parent = scope._parent;
				break;
			}
			contexts.unshift(context);
			scope = scope._parent;
		}
		if (parent) {
			each(contexts, function(context) {
				parent = parent.add(context);
			});
			return parent;
		} else {
			return this;
		}
	}
});

defineLazyValue(Scope.prototype, 'templateContext', function() {
	return this.getTemplateContext()._context;
});

defineLazyValue(Scope.prototype, 'vars', function() {
	return this.templateContext.vars;
});

function Options(data, parent, meta) {
	if (!data.helpers && !data.partials && !data.tags) {
		data = {
			helpers: data
		};
	}
	Scope.call(this, data, parent, meta);
}
Options.prototype = new Scope();
Options.prototype.constructor = Options;

Scope.Options = Options;

namespace.view = namespace.view || {};
module.exports = namespace.view.Scope = Scope;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

//
// This provides helper utilities for Mustache processing. Currently,
// only stache uses these helpers.  Ideally, these utilities could be used
// in other libraries implementing Mustache-like features.
var live = __webpack_require__(53);
var nodeLists = __webpack_require__(20);
var compute = __webpack_require__(10);
var Observation = __webpack_require__(4);
var utils = __webpack_require__(19);
var expression = __webpack_require__(78);
var frag = __webpack_require__(36);
var attr = __webpack_require__(32);
var canSymbol = __webpack_require__(1);
var canReflect = __webpack_require__(0);
var dev = __webpack_require__(5);


// ## Types

// A lookup is an object that is used to identify a lookup in the scope.
/**
 * @hide
 * @typedef {{get: String}} can.stache.Lookup
 * @option {String} get A value in the scope to look up.
 */


// ## Helpers

var mustacheLineBreakRegExp = /(?:(^|\r?\n)(\s*)(\{\{([\s\S]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([\s\S]*)\}\}\}?)/g,
	mustacheWhitespaceRegExp = /(\s*)(\{\{\{?)(-?)([\s\S]*?)(-?)(\}\}\}?)(\s*)/g,
	k = function(){};


var core = {
	expression: expression,
	// ## mustacheCore.makeEvaluator
	// Given a scope and expression, returns a function that evaluates that expression in the scope.
	//
	// This function first reads lookup values in the args and hash.  Then it tries to figure out
	// if a helper is being called or a value is being read.  Finally, depending on
	// if it's a helper, or not, and which mode the expression is in, it returns
	// a function that can quickly evaluate the expression.
	/**
	 * @hide
	 * Given a mode and expresion data, returns a function that evaluates that expression.
	 * @param {can-view-scope} The scope in which the expression is evaluated.
	 * @param {can.view.Options} The option helpers in which the expression is evaluated.
	 * @param {String} mode Either null, #, ^. > is handled elsewhere
	 * @param {Object} exprData Data about what was in the mustache expression
	 * @param {renderer} [truthyRenderer] Used to render a subsection
	 * @param {renderer} [falseyRenderer] Used to render the inverse subsection
	 * @param {String} [stringOnly] A flag to indicate that only strings will be returned by subsections.
	 * @return {Function} An 'evaluator' function that evaluates the expression.
	 */
	makeEvaluator: function (scope, helperOptions, nodeList, mode, exprData, truthyRenderer, falseyRenderer, stringOnly) {

		if(mode === "^") {
			var temp = truthyRenderer;
			truthyRenderer = falseyRenderer;
			falseyRenderer = temp;
		}

		var value,
			helperOptionArg;

		if(exprData instanceof expression.Call) {
			helperOptionArg =  {
				context: scope.peek("."),
				scope: scope,
				nodeList: nodeList,
				exprData: exprData,
				helpersScope: helperOptions
			};
			utils.convertToScopes(helperOptionArg, scope,helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

			value = exprData.value(scope, helperOptions, helperOptionArg);
			if(exprData.isHelper) {
				return value;
			}
		} else if (exprData instanceof expression.Bracket) {
			value = exprData.value(scope);
			if(exprData.isHelper) {
				return value;
			}
		} else if (exprData instanceof expression.Lookup) {
			value = exprData.value(scope);
			if(exprData.isHelper) {
				return value;
			}
		} else if (exprData instanceof expression.Helper && exprData.methodExpr instanceof expression.Bracket) {
			// Brackets get wrapped in Helpers when used in attributes
			// like `<p class="{{ foo[bar] }}" />`
			value = exprData.methodExpr.value(scope);
			if(exprData.isHelper) {
				return value;
			}
		} else {
			var readOptions = {
				// will return a function instead of calling it.
				// allowing it to be turned into a compute if necessary.
				isArgument: true,
				args: [scope.peek('.'), scope],
				asCompute: true
			};
			var helperAndValue = exprData.helperAndValue(scope, helperOptions, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
			var helper = helperAndValue.helper;
			value = helperAndValue.value;

			if(helper) {
				return exprData.evaluator(helper, scope, helperOptions, readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
			}
		}

		// Return evaluators for no mode.
		if(!mode) {
			// If it's computed, return a function that just reads the compute.
			return value;
		} else if( mode === "#" || mode === "^" ) {
			// Setup renderers.
			helperOptionArg = {};
			utils.convertToScopes(helperOptionArg, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);
			return function(){
				// Get the value
				var finalValue = canReflect.getValue(value);

				if(typeof finalValue === "function") {
					return finalValue;
				}
				// If it's an array, render.
				else if ( typeof finalValue !== "string" && utils.isArrayLike(finalValue) ) {
					var isObserveList = canReflect.isObservableLike(finalValue) &&
						canReflect.isListLike(finalValue);

					if(canReflect.getKeyValue(finalValue, "length")) {
						if (stringOnly) {
							return utils.getItemsStringContent(finalValue, isObserveList, helperOptionArg, helperOptions);
						} else {
							return frag(utils.getItemsFragContent(finalValue, helperOptionArg, scope));
						}
					} else {
						return helperOptionArg.inverse(scope, helperOptions);
					}
				}
				// If truthy, render fn, otherwise, inverse.
				else {
					return finalValue ? helperOptionArg.fn(finalValue || scope, helperOptions) : helperOptionArg.inverse(scope, helperOptions);
				}
			};
		} else {
			// not supported!
		}
	},
	// ## mustacheCore.makeLiveBindingPartialRenderer
	// Returns a renderer function that live binds a partial.
	/**
	 * @hide
	 * Returns a renderer function that live binds a partial.
	 * @param {String} expressionString
	 * @param {Object} state The html state of where the expression was found.
	 * @return {function(this:HTMLElement,can-view-scope,can.view.Options)} A renderer function
	 * live binds a partial.
	 */
	makeLiveBindingPartialRenderer: function(expressionString, state, lineNo){
		expressionString = expressionString.trim();
		var exprData,
				partialName = expressionString.split(/\s+/).shift();

		if(partialName !== expressionString) {
			exprData = core.expression.parse(expressionString);
		}

		return function(scope, options, parentSectionNodeList){
			//!steal-remove-start
			scope.set('scope.lineNumber', lineNo);
			//!steal-remove-end
			var nodeList = [this];
			nodeList.expression = ">" + partialName;
			nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);

			var partialFrag = compute(function(){
				var localPartialName = partialName;
				// If the second parameter of a partial is a custom context
				if(exprData && exprData.argExprs.length === 1) {
					var newContext = canReflect.getValue( exprData.argExprs[0].value(scope, options) );
					if(typeof newContext === "undefined") {
						//!steal-remove-start
						dev.warn('The context ('+ exprData.argExprs[0].key +') you passed into the' +
							'partial ('+ partialName +') is not defined in the scope!');
						//!steal-remove-end
					}else{
						scope = scope.add(newContext);
					}
				}
				// Look up partials in options first.
				var partial = options.peek("partials." + localPartialName);
				partial = partial || ( options.inlinePartials && options.inlinePartials[ localPartialName ] );
				var renderer;
				if (partial) {
					renderer = function() {
						return partial.render ? partial.render(scope, options, nodeList)
							: partial(scope, options);
					};
				}
				// Use can.view to get and render the partial.
				else {
					var scopePartialName = scope.read(localPartialName, {
						isArgument: true
					}).value;

					if (scopePartialName === null || !scopePartialName && localPartialName[0] === '*') {
						return frag("");
					}
					if (scopePartialName) {
						localPartialName = scopePartialName;
					}

					renderer = function() {
						if(typeof localPartialName === "function"){
							return localPartialName(scope, options, nodeList);
						} else {
							return core.getTemplateById(localPartialName)(scope, options, nodeList);
						}

					};
				}
				var res = Observation.ignore(renderer)();
				return frag(res);
			});

			partialFrag.computeInstance.setPrimaryDepth(nodeList.nesting);

			live.html(this, partialFrag, this.parentNode, nodeList);
		};
	},
	// ## mustacheCore.makeStringBranchRenderer
	// Return a renderer function that evalutes to a string and caches
	// the evaluator on the scope.
	/**
	 * @hide
	 * Return a renderer function that evaluates to a string.
	 * @param {String} mode
	 * @param {can.stache.Expression} expression
	 * @return {function(can.view.Scope,can.view.Options, can-stache.renderer, can.view.renderer)}
	 */
	makeStringBranchRenderer: function(mode, expressionString, lineNo){
		var exprData = core.expression.parse(expressionString),
			// Use the full mustache expression as the cache key.
			fullExpression = mode+expressionString;

		// convert a lookup like `{{value}}` to still be called as a helper if necessary.
		if(!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call)) {
			exprData = new expression.Helper(exprData,[],{});
		}

		// A branching renderer takes truthy and falsey renderer.
		var branchRenderer = function branchRenderer(scope, options, truthyRenderer, falseyRenderer){
			//!steal-remove-start
			scope.set('scope.lineNumber', lineNo);
			//!steal-remove-end
			// Check the scope's cache if the evaluator already exists for performance.
			var evaluator = scope.__cache[fullExpression];
			if(mode || !evaluator) {
				evaluator = makeEvaluator( scope, options, null, mode, exprData, truthyRenderer, falseyRenderer, true);
				if(!mode) {
					scope.__cache[fullExpression] = evaluator;
				}
			}
			var gotObservableValue = evaluator[canSymbol.for("can.onValue")],
				res;

			// Run the evaluator and return the result.
			if(gotObservableValue) {
				res = canReflect.getValue(evaluator);
			} else {
				res = evaluator();
			}


			return res == null ? "" : ""+res;
		};

		branchRenderer.exprData = exprData;

		return branchRenderer;
	},
	// ## mustacheCore.makeLiveBindingBranchRenderer
	// Return a renderer function that evaluates the mustache expression and
	// sets up live binding if a compute with dependencies is found. Otherwise,
	// the element's value is set.
	//
	// This function works by creating a `can.compute` from the mustache expression.
	// If the compute has dependent observables, it passes the compute to `can.view.live`; otherwise,
	// it updates the element's property based on the compute's value.
	/**
	 * @hide
	 * Returns a renderer function that evaluates the mustache expression.
	 * @param {String} mode
	 * @param {can.stache.Expression} expression
	 * @param {Object} state The html state of where the expression was found.
	 */
	makeLiveBindingBranchRenderer: function(mode, expressionString, state, lineNo){
		// Pre-process the expression.
		var exprData = core.expression.parse(expressionString);
		if(!(exprData instanceof expression.Helper) && !(exprData instanceof expression.Call) && !(exprData instanceof expression.Bracket) && !(exprData instanceof expression.Lookup)) {
			exprData = new expression.Helper(exprData,[],{});
		}
		// A branching renderer takes truthy and falsey renderer.
		var branchRenderer = function branchRenderer(scope, options, parentSectionNodeList, truthyRenderer, falseyRenderer){
			//!steal-remove-start
			scope.set('scope.lineNumber', lineNo);
			//!steal-remove-end
			var nodeList = [this];
			nodeList.expression = expressionString;
			// register this nodeList.
			// Regsiter it with its parent ONLY if this is directly nested.  Otherwise, it's unencessary.
			nodeLists.register(nodeList, null, parentSectionNodeList || true, state.directlyNested);

			// Get the evaluator. This does not need to be cached (probably) because if there
			// an observable value, it will be handled by `can.view.live`.
			var evaluator = makeEvaluator( scope, options, nodeList, mode, exprData, truthyRenderer, falseyRenderer,
				// If this is within a tag, make sure we only get string values.
				state.tag );

			// Create a compute that can not be observed by other
			// comptues. This is important because this renderer is likely called by
			// parent expresions.  If this value changes, the parent expressions should
			// not re-evaluate. We prevent that by making sure this compute is ignored by
			// everyone else.
			//var compute = can.compute(evaluator, null, false);
			var gotObservableValue = evaluator[canSymbol.for("can.onValue")];
			var observable;
			if(gotObservableValue) {
				observable = evaluator;
			} else {
				observable = new Observation(evaluator,null,{isObservable: false});
			}

			if(observable instanceof Observation) {
				observable.compute._primaryDepth = nodeList.nesting;
			} else if(observable.computeInstance) {
				observable.computeInstance.setPrimaryDepth(nodeList.nesting);
			} else if(observable.observation) {
				observable.observation.compute._primaryDepth = nodeList.nesting;
			}

			// Bind on the computeValue to set the cached value. This helps performance
			// so live binding can read a cached value instead of re-calculating.
			canReflect.onValue(observable, k);

			var value = canReflect.getValue(observable);

			// If value is a function, it's a helper that returned a function.
			if(typeof value === "function") {

				// A helper function should do it's own binding.  Similar to how
				// we prevented this function's compute from being noticed by parent expressions,
				// we hide any observables read in the function by saving any observables that
				// have been read and then setting them back which overwrites any `can.__observe` calls
				// performed in value.
				Observation.ignore(value)(this);

			}
			// If the computeValue has observable dependencies, setup live binding.
			else if( canReflect.valueHasDependencies(observable) ) {

				// Depending on where the template is, setup live-binding differently.
				if(state.attr) {
					live.attr(this, state.attr, observable);
				}
				else if( state.tag )  {
					live.attrs( this, observable );
				}
				else if(state.text && typeof value !== "object"){
					live.text(this, observable, this.parentNode, nodeList);
				}
				else {
					live.html(this, observable, this.parentNode, nodeList);
				}
			}
			// If the computeValue has no observable dependencies, just set the value on the element.
			else {

				if(state.attr) {
					attr.set(this, state.attr, value);
				}
				else if(state.tag) {
					live.attrs(this, value);
				}
				else if(state.text && typeof value === "string") {
					this.nodeValue = value;
				}
				else if( value != null ){
					nodeLists.replace([this], frag(value, this.ownerDocument));
				}
			}
			// Unbind the compute.
			canReflect.offValue(observable, k);
		};

		branchRenderer.exprData = exprData;

		return branchRenderer;
	},
	// ## mustacheCore.splitModeFromExpression
	// Returns the mustache mode split from the rest of the expression.
	/**
	 * @hide
	 * Returns the mustache mode split from the rest of the expression.
	 * @param {can.stache.Expression} expression
	 * @param {Object} state The state of HTML where the expression was found.
	 */
	splitModeFromExpression: function(expression, state, lineNo){
		expression = expression.trim();
		var mode = expression.charAt(0);

		if( "#/{&^>!<".indexOf(mode) >= 0 ) {
			expression =  expression.substr(1).trim();
		} else {
			mode = null;
		}
		// Triple braces do nothing within a tag.
		if(mode === "{" && state.node) {
			mode = null;
		}
		return {
			mode: mode,
			expression: expression
		};
	},
	// ## mustacheCore.cleanLineEndings
	// Removes line breaks accoding to the mustache specification.
	/**
	 * @hide
	 * Prunes line breaks accoding to the mustache specification.
	 * @param {String} template
	 * @return {String}
	 */
	cleanLineEndings: function(template){

		// Finds mustache tags with space around them or no space around them.
		return template.replace( mustacheLineBreakRegExp,
			function(whole,
				returnBefore,
				spaceBefore,
				special,
				expression,
				spaceAfter,
				returnAfter,
				// A mustache magic tag that has no space around it.
				spaceLessSpecial,
				spaceLessExpression,
				matchIndex){

			// IE 8 will provide undefined
			spaceAfter = (spaceAfter || "");
			returnBefore = (returnBefore || "");
			spaceBefore = (spaceBefore || "");

			var modeAndExpression = splitModeFromExpression(expression || spaceLessExpression,{});

			// If it's a partial or tripple stache, leave in place.
			if(spaceLessSpecial || ">{".indexOf( modeAndExpression.mode) >= 0) {
				return whole;
			}  else if( "^#!/".indexOf(  modeAndExpression.mode ) >= 0 ) {
				// Return the magic tag and a trailing linebreak if this did not
				// start a new line and there was an end line.
				// Add a normalized leading space, if there was any leading space, in case this abuts a tag name
				spaceBefore = (returnBefore + spaceBefore) && " ";
				return spaceBefore+special+( matchIndex !== 0 && returnAfter.length ? returnBefore+"\n" :"");


			} else {
				// There is no mode, return special with spaces around it.
				return spaceBefore+special+spaceAfter+(spaceBefore.length || matchIndex !== 0 ? returnBefore+"\n" : "");
			}

		});
	},
	// ## mustacheCore.cleanWhitespaceControl
	// Removes whitespace according to the whitespace control.
	/**
	 * @hide
	 * Prunes whitespace according to the whitespace control.
	 * @param {String} template
	 * @return {String}
	 */
	cleanWhitespaceControl: function(template) {
		return template.replace(mustacheWhitespaceRegExp, function(
			whole,
			spaceBefore,
			bracketBefore,
			controlBefore,
			expression,
			controlAfter,
			bracketAfter,
			spaceAfter,
			matchIndex
		) {

			if (controlBefore === '-') {
				spaceBefore = '';
			}

			if (controlAfter === '-') {
				spaceAfter = '';
			}

			return spaceBefore + bracketBefore + expression + bracketAfter + spaceAfter;

		});
	},
	Options: utils.Options,
	getTemplateById: function(){}
};

// ## Local Variable Cache
//
// The following creates slightly more quickly accessible references of the following
// core functions.
var makeEvaluator = core.makeEvaluator,
	splitModeFromExpression = core.splitModeFromExpression;

module.exports = core;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(26);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(149);


module.exports = live;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

// ### Literal
// For inline static values like `{{"Hello World"}}`
var Literal = function(value){
	this._value = value;
};
Literal.prototype.value = function(){
	return this._value;
};

module.exports = Literal;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var canReflect = __webpack_require__(0);
var compute = __webpack_require__(10);
var expressionHelpers = __webpack_require__(14);
// ### Hash

var Hashes = function(hashes){
	this.hashExprs = hashes;
};
Hashes.prototype.value = function(scope, helperOptions){
	var hash = {};
	for(var prop in this.hashExprs) {
		var val = expressionHelpers.convertToArgExpression(this.hashExprs[prop]),
			value = val.value.apply(val, arguments);

		hash[prop] = {
			call: !val.modifiers || !val.modifiers.compute,
			value: value
		};
	}
	// TODO: replace with Compute
	return compute(function(){
		var finalHash = {};
		for(var prop in hash) {
			finalHash[prop] = hash[prop].call ? canReflect.getValue( hash[prop].value ) : expressionHelpers.toComputeOrValue( hash[prop].value );
		}
		return finalHash;
	});
};

module.exports = Hashes;


/***/ }),
/* 56 */,
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var assign = __webpack_require__(3);
var deepAssign = __webpack_require__(112);
var dev = __webpack_require__(21);
var makeArray = __webpack_require__(15);
var namespace = __webpack_require__(2);
//!steal-remove-start
var CanString = __webpack_require__(41);
var reservedWords = {
	"abstract": true,
	"boolean": true,
	"break": true,
	"byte": true,
	"case": true,
	"catch": true,
	"char": true,
	"class": true,
	"const": true,
	"continue": true,
	"debugger": true,
	"default": true,
	"delete": true,
	"do": true,
	"double": true,
	"else": true,
	"enum": true,
	"export": true,
	"extends": true,
	"false": true,
	"final": true,
	"finally": true,
	"float": true,
	"for": true,
	"function": true,
	"goto": true,
	"if": true,
	"implements": true,
	"import": true,
	"in": true,
	"instanceof": true,
	"int": true,
	"interface": true,
	"let": true,
	"long": true,
	"native": true,
	"new": true,
	"null": true,
	"package": true,
	"private": true,
	"protected": true,
	"public": true,
	"return": true,
	"short": true,
	"static": true,
	"super": true,
	"switch": true,
	"synchronized": true,
	"this": true,
	"throw": true,
	"throws": true,
	"transient": true,
	"true": true,
	"try": true,
	"typeof": true,
	"var": true,
	"void": true,
	"volatile": true,
	"while": true,
	"with": true
};
var constructorNameRegex = /[^A-Z0-9_]/gi;
//!steal-remove-end

// ## construct.js
// `Construct`
// _This is a modified version of
// [John Resig's class](http://ejohn.org/blog/simple-javascript-inheritance/).
// It provides class level inheritance and callbacks._
// A private flag used to initialize a new class instance without
// initializing it's bindings.
var initializing = 0;

//!steal-remove-start
var namedCtor = (function(cache){
	return function(name, fn) {
		return ((name in cache) ? cache[name] : cache[name] = new Function(
			"__", "function "+name+"(){return __.apply(this,arguments)};return "+name
		))( fn );
	};
}({}));
//!steal-remove-end

/**
 * @add can-construct
 */
var Construct = function () {
	if (arguments.length) {
		return Construct.extend.apply(Construct, arguments);
	}
};

var canGetDescriptor;
try {
	Object.getOwnPropertyDescriptor({});
	canGetDescriptor = true;
} catch(e) {
	canGetDescriptor = false;
}

var getDescriptor = function(newProps, name) {
		var descriptor = Object.getOwnPropertyDescriptor(newProps, name);
		if(descriptor && (descriptor.get || descriptor.set)) {
			return descriptor;
		}
		return null;
	},
	inheritGetterSetter = function(newProps, oldProps, addTo) {
		addTo = addTo || newProps;
		var descriptor;

		for (var name in newProps) {
			if( (descriptor = getDescriptor(newProps, name)) ) {
				this._defineProperty(addTo, oldProps, name, descriptor);
			} else {
				Construct._overwrite(addTo, oldProps, name, newProps[name]);
			}
		}
	},
	simpleInherit = function (newProps, oldProps, addTo) {
		addTo = addTo || newProps;

		for (var name in newProps) {
			Construct._overwrite(addTo, oldProps, name, newProps[name]);
		}
	};
/**
 * @static
 */
assign(Construct, {
	/**
	 * @property {Boolean} can-construct.constructorExtends constructorExtends
	 * @parent can-construct.static
	 *
	 * @description
	 * Toggles the behavior of a constructor function called
	 * without the `new` keyword to extend the constructor function or
	 * create a new instance.
	 *
	 * ```js
	 * var animal = Animal();
	 * // vs
	 * var animal = new Animal();
	 * ```
	 *
	 * @body
	 *
	 * If `constructorExtends` is:
	 *
	 *  - `true` - the constructor extends
	 *  - `false` - a new instance of the constructor is created
	 *
	 * This property defaults to false.
	 *
	 * Example of constructExtends as `true`:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   constructorExtends: true // the constructor extends
	 * },{
	 *   sayHi: function() {
	 *     console.log("hai!");
	 *   }
	 * });
	 *
	 * var Pony = Animal({
	 *   gallop: function () {
	 *      console.log("Galloping!!");
	 *   }
	 * }); // Pony is now a constructor function extended from Animal
	 *
	 * var frank = new Animal(); // frank is a new instance of Animal
	 *
	 * var gertrude = new Pony(); // gertrude is a new instance of Pony
	 * gertrude.sayHi(); // "hai!" - sayHi is "inherited" from Animal
	 * gertrude.gallop(); // "Galloping!!" - gallop is unique to instances of Pony
	 *```
	 *
	 * The default behavior is shown in the example below:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   constructorExtends: false // the constructor does NOT extend
	 * },{
	 *   sayHi: function() {
	 *     console.log("hai!");
	 *   }
	 * });
	 *
	 * var pony = Animal(); // pony is a new instance of Animal
	 * var frank = new Animal(); // frank is a new instance of Animal
	 *
	 * pony.sayHi() // "hai!"
	 * frank.sayHi() // "hai!"
	 *```
	 * By default to extend a constructor, you must use [can-construct.extend extend].
	 */
	constructorExtends: true,
	/**
	 * @function can-construct.newInstance newInstance
	 * @parent can-construct.static
	 *
	 * @description Returns an instance of `Construct`. This method
	 * can be overridden to return a cached instance.
	 *
	 * @signature `Construct.newInstance([...args])`
	 *
	 * @param {*} [args] arguments that get passed to [can-construct::setup] and [can-construct::init]. Note
	 * that if [can-construct::setup] returns an array, those arguments will be passed to [can-construct::init]
	 * instead.
	 * @return {class} instance of the class
	 *
	 * @body
	 * Creates a new instance of the constructor function. This method is useful for creating new instances
	 * with arbitrary parameters. Typically, however, you will simply want to call the constructor with the
	 * __new__ operator.
	 *
	 * ## Example
	 *
	 * The following creates a `Person` Construct and overrides `newInstance` to cache all
	 * instances of Person to prevent duplication. If the properties of a new Person match an existing one it
	 * will return a reference to the previously created object, otherwise it returns a new object entirely.
	 *
	 * ```js
	 * // define and create the Person constructor
	 * var Person = Construct.extend({
	 *   init : function(first, middle, last) {
	 *     this.first = first;
	 *     this.middle = middle;
	 *     this.last = last;
	 *   }
	 * });
	 *
	 * // store a reference to the original newInstance function
	 * var _newInstance = Person.newInstance;
	 *
	 * // override Person's newInstance function
	 * Person.newInstance = function() {
	 *   // if cache does not exist make it an new object
	 *   this.__cache = this.__cache || {};
	 *   // id is a stingified version of the passed arguments
	 *   var id = JSON.stringify(arguments);
	 *
	 *   // look in the cache to see if the object already exists
	 *   var cachedInst = this.__cache[id];
	 *   if(cachedInst) {
	 *     return cachedInst;
	 *   }
	 *
	 *   //otherwise call the original newInstance function and return a new instance of Person.
	 *   var newInst = _newInstance.apply(this, arguments);
	 *   this.__cache[id] = newInst;
	 *   return newInst;
	 * };
	 *
	 * // create two instances with the same arguments
	 * var justin = new Person('Justin', 'Barry', 'Meyer'),
	 *		brian = new Person('Justin', 'Barry', 'Meyer');
	 *
	 * console.log(justin === brian); // true - both are references to the same instance
	 * ```
	 *
	 */
	newInstance: function () {
		// Get a raw instance object (`init` is not called).
		var inst = this.instance(),
			args;
		// Call `setup` if there is a `setup`
		if (inst.setup) {
			Object.defineProperty(inst,"__inSetup",{
				configurable: true,
				enumerable: false,
				value: true,
				writable: true
			});
			args = inst.setup.apply(inst, arguments);
			if (args instanceof Construct.ReturnValue){
				return args.value;
			}
			inst.__inSetup = false;
		}
		// Call `init` if there is an `init`
		// If `setup` returned `args`, use those as the arguments
		if (inst.init) {
			inst.init.apply(inst, args || arguments);
		}
		return inst;
	},
	// Overwrites an object with methods. Used in the `super` plugin.
	// `newProps` - New properties to add.
	// `oldProps` - Where the old properties might be (used with `super`).
	// `addTo` - What we are adding to.
	_inherit: canGetDescriptor ? inheritGetterSetter : simpleInherit,

	// Adds a `defineProperty` with the given name and descriptor
	// Will only ever be called if ES5 is supported
	_defineProperty: function(what, oldProps, propName, descriptor) {
		Object.defineProperty(what, propName, descriptor);
	},

	// used for overwriting a single property.
	// this should be used for patching other objects
	// the super plugin overwrites this
	_overwrite: function (what, oldProps, propName, val) {
		Object.defineProperty(what, propName, {value: val, configurable: true, enumerable: true, writable: true});
	},
	// Set `defaults` as the merger of the parent `defaults` and this
	// object's `defaults`. If you overwrite this method, make sure to
	// include option merging logic.
	/**
	 * @function can-construct.setup setup
	 * @parent can-construct.static
	 *
	 * @description Perform initialization logic for a constructor function.
	 *
	 * @signature `Construct.setup(base, fullName, staticProps, protoProps)`
	 *
	 * A static `setup` method provides inheritable setup functionality
	 * for a Constructor function. The following example
	 * creates a Group constructor function.  Any constructor
	 * functions that inherit from Group will be added to
	 * `Group.childGroups`.
	 *
	 *
	 *     Group = Construct.extend({
	 *       setup: function(Construct, fullName, staticProps, protoProps){
	 *         this.childGroups = [];
	 *         if(Construct !== Construct){
	 *           this.childGroups.push(Construct)
	 *         }
	 *         Construct.setup.apply(this, arguments)
	 *       }
	 *     },{})
	 *     var Flock = Group.extend(...)
	 *     Group.childGroups[0] //-> Flock
	 *
	 * @param {constructor} base The base constructor that is being inherited from.
	 * @param {String} fullName The name of the new constructor.
	 * @param {Object} staticProps The static properties of the new constructor.
	 * @param {Object} protoProps The prototype properties of the new constructor.
	 *
	 * @body
	 * The static `setup` method is called immediately after a constructor
	 * function is created and
	 * set to inherit from its base constructor. It is useful for setting up
	 * additional inheritance work.
	 * Do not confuse this with the prototype `[can-construct::setup]` method.
	 *
	 * ## Example
	 *
	 * This `Parent` class adds a reference to its base class to itself, and
	 * so do all the classes that inherit from it.
	 *
	 * ```js
	 * Parent = Construct.extend({
	 *   setup : function(base, fullName, staticProps, protoProps){
	 *     this.base = base;
	 *
	 *     // call base functionality
	 *     Construct.setup.apply(this, arguments)
	 *   }
	 * },{});
	 *
	 * Parent.base; // Construct
	 *
	 * Child = Parent({});
	 *
	 * Child.base; // Parent
	 * ```
	 */
	setup: function (base) {
		this.defaults = deepAssign(true, {}, base.defaults, this.defaults);
	},
	// Create's a new `class` instance without initializing by setting the
	// `initializing` flag.
	instance: function () {
		// Prevents running `init`.
		initializing = 1;
		var inst = new this();
		// Allow running `init`.
		initializing = 0;
		return inst;
	},
	// Extends classes.
	/**
	 * @function can-construct.extend extend
	 * @parent can-construct.static
	 *
	 * @signature `Construct.extend([name,] [staticProperties,] instanceProperties)`
	 *
	 * Extends `Construct`, or constructor functions derived from `Construct`,
	 * to create a new constructor function. Example:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   sayHi: function(){
	 *     console.log("hi")
	 *   }
	 * });
	 *
	 * var animal = new Animal()
	 * animal.sayHi();
	 * ```
	 *
	 * @param {String} [name] Adds a name to the constructor function so
	 * it is nicely labeled in the developer tools. The following:
	 *
	 *     Construct.extend("ConstructorName",{})
	 *
	 * returns a constructur function that will show up as `ConstructorName`
	 * in the developer tools.
	 * It also sets "ConstructorName" as [can-construct.shortName shortName].
	 *
	 * @param {Object} [staticProperties] Properties that are added the constructor
	 * function directly. For example:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   findAll: function(){
	 *     return can.ajax({url: "/animals"})
	 *   }
	 * },{}); // need to pass an empty instanceProperties object
	 *
	 * Animal.findAll().then(function(json){ ... })
	 * ```
	 *
	 * The [can-construct.setup static setup] method can be used to
	 * specify inheritable behavior when a Constructor function is created.
	 *
	 * @param {Object} instanceProperties Properties that belong to
	 * instances made with the constructor. These properties are added to the
	 * constructor's `prototype` object. Example:
	 *
	 *     var Animal = Construct.extend({
	 *		  findAll: function() {
	 *			return can.ajax({url: "/animals"});
	 *		  }
	 *     },{
	 *       init: function(name) {
	 *         this.name = name;
	 *       },
	 *       sayHi: function() {
	 *         console.log(this.name," says hai!");
	 *       }
	 *     })
	 *     var pony = new Animal("Gertrude");
	 *     pony.sayHi(); // "Gertrude says hai!"
	 *
	 * The [can-construct::init init] and [can-construct::setup setup] properties
	 * are used for initialization.
	 *
	 * @return {function} The constructor function.
	 *
	 * ```js
	 *	var Animal = Construct.extend(...);
	 *	var pony = new Animal(); // Animal is a constructor function
	 * ```
	 * @body
	 * ## Inheritance
	 * Creating "subclasses" with `Construct` is simple. All you need to do is call the base constructor
	 * with the new function's static and instance properties. For example, we want our `Snake` to
	 * be an `Animal`, but there are some differences:
	 *
	 *
	 *     var Snake = Animal.extend({
	 *         legs: 0
	 *     }, {
	 *         init: function() {
	 *             Animal.prototype.init.call(this, 'ssssss');
	 *         },
	 *         slither: function() {
	 *             console.log('slithering...');
	 *         }
	 *     });
	 *
	 *     var baslisk = new Snake();
	 *     baslisk.speak();   // "ssssss"
	 *     baslisk.slither(); // "slithering..."
	 *     baslisk instanceof Snake;  // true
	 *     baslisk instanceof Animal; // true
	 *
	 *
	 * ## Static properties and inheritance
	 *
	 * If you pass all three arguments to Construct, the second one will be attached directy to the
	 * constructor, allowing you to imitate static properties and functions. You can access these
	 * properties through the `[can-construct::constructor this.constructor]` property.
	 *
	 * Static properties can get overridden through inheritance just like instance properties. In the example below,
	 * we override both the legs static property as well as the the init function for each instance:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *     legs: 4
	 * }, {
	 *     init: function(sound) {
	 *         this.sound = sound;
	 *     },
	 *     speak: function() {
	 *         console.log(this.sound);
	 *     }
	 * });
	 *
	 * var Snake = Animal.extend({
	 *     legs: 0
	 * }, {
	 *     init: function() {
	 *         this.sound = 'ssssss';
	 *     },
	 *     slither: function() {
	 *         console.log('slithering...');
	 *     }
	 * });
	 *
	 * Animal.legs; // 4
	 * Snake.legs; // 0
	 * var dog = new Animal('woof');
	 * var blackMamba = new Snake();
	 * dog.speak(); // 'woof'
	 * blackMamba.speak(); // 'ssssss'
	 * ```
	 * 
	 * ## Alternative value for a new instance
	 * 
	 * Sometimes you may want to return some custom value instead of a new object when creating an instance of your class.
	 * For example, you want your class to act as a singleton, or check whether an item with the given id was already
	 * created and return an existing one from your cache store (e.g. using [can-connect/constructor/store/store]).
	 * 
	 * To achieve this you can return [can-construct.ReturnValue] from `setup` method of your class.
	 * 
	 * Lets say you have `myStore` to cache all newly created instances. And if an item already exists you want to merge
	 * the new data into the existing instance and return the updated instance.
	 * 
	 * ```
	 * var myStore = {};
	 * 
	 * var Item = Construct.extend({
	 *     setup: function(params){
	 *         if (myStore[params.id]){
	 *             var item = myStore[params.id];
	 *             
	 *             // Merge new data to the existing instance:
	 *             Object.assign(item, params);
	 *             
	 *             // Return the updated item:
	 *             return new Construct.ReturnValue( item );
	 *         } else {
	 *             // Save to cache store:
	 *             myStore[this.id] = this;
	 *             
	 *             return [params];
	 *         }
	 *     },
	 *     init: function(params){
	 *         Object.assign(this, params);
	 *     }
	 * });
	 * 
	 * var item_1  = new Item( {id: 1, name: "One"} );
	 * var item_1a = new Item( {id: 1, name: "OnePlus"} )
	 * ```
	 */
	extend: function (name, staticProperties, instanceProperties) {
		var shortName = name,
			klass = staticProperties,
			proto = instanceProperties;

		// Figure out what was passed and normalize it.
		if (typeof shortName !== 'string') {
			proto = klass;
			klass = shortName;
			shortName = null;
		}
		if (!proto) {
			proto = klass;
			klass = null;
		}
		proto = proto || {};
		var _super_class = this,
			_super = this.prototype,
			Constructor, prototype;
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor).
		prototype = this.instance();
		// Copy the properties over onto the new prototype.
		Construct._inherit(proto, _super, prototype);

		if(shortName) {

		} else if(klass && klass.shortName) {
			shortName = klass.shortName;
		} else if(this.shortName) {
			shortName = this.shortName;
		}
		// We want constructor.name to be the same as shortName, within
		// the bounds of what the JS VM will allow (meaning no non-word characters).
		// new Function() is significantly faster than eval() here.

		// Strip semicolons
		//!steal-remove-start
		var constructorName = shortName ? shortName.replace(constructorNameRegex, '_') : 'Constructor';
		if(reservedWords[constructorName]) {
			constructorName = CanString.capitalize(constructorName);
		}
		//!steal-remove-end

		// The dummy class constructor.
		function init() {
			/* jshint validthis: true */
			// All construction is actually done in the init method.
			if (!initializing) {
				//!steal-remove-start
				if(!this || (this.constructor !== Constructor) &&
				// We are being called without `new` or we are extending.
				arguments.length && Constructor.constructorExtends) {
					dev.warn('can/construct/construct.js: extending a Construct without calling extend');
				}
				//!steal-remove-end

				return (!this || this.constructor !== Constructor) &&
				// We are being called without `new` or we are extending.
				arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) :
				// We are being called with `new`.
				Constructor.newInstance.apply(Constructor, arguments);
			}
		}
		Constructor = typeof namedCtor === "function" ?
			namedCtor( constructorName, init ) :
			function() { return init.apply(this, arguments); };

		// Copy old stuff onto class (can probably be merged w/ inherit)
		for (var propName in _super_class) {
			if (_super_class.hasOwnProperty(propName)) {
				Constructor[propName] = _super_class[propName];
			}
		}
		// Copy new static properties on class.
		Construct._inherit(klass, _super_class, Constructor);

		// Set things that shouldn't be overwritten.
		assign(Constructor, {
			constructor: Constructor,
			prototype: prototype
			/**
			 * @property {String} can-construct.shortName shortName
			 * @parent can-construct.static
			 *
			 * If you pass a name when creating a Construct, the `shortName` property will be set to the
			 * name.
			 *
			 * ```js
			 * var MyConstructor = Construct.extend("MyConstructor",{},{});
			 * MyConstructor.shortName // "MyConstructor"
			 * ```
			 */
		});

		if (shortName !== undefined) {
			Constructor.shortName = shortName;
		}
		// Make sure our prototype looks nice.
		Constructor.prototype.constructor = Constructor;
		// Call the class `setup` and `init`
		var t = [_super_class].concat(makeArray(arguments)),
			args = Constructor.setup.apply(Constructor, t);
		if (Constructor.init) {
			Constructor.init.apply(Constructor, args || t);
		}
		/**
		 * @prototype
		 */
		return Constructor; //
		/**
		 * @property {Object} can-construct.prototype.constructor constructor
		 * @parent can-construct.prototype
		 *
		 * A reference to the constructor function that created the instance. This allows you to access
		 * the constructor's static properties from an instance.
		 *
		 * @body
		 * ## Example
		 *
		 * This Construct has a static counter that counts how many instances have been created:
		 *
		 * ```js
		 * var Counter = Construct.extend({
		 *     count: 0
		 * }, {
		 *     init: function() {
		 *         this.constructor.count++;
		 *     }
		 * });
		 *
		 * var childCounter = new Counter();
		 * console.log(childCounter.constructor.count); // 1
		 * console.log(Counter.count); // 1
		 * ```
		 */
	},
	/**
	 * @function can-construct.ReturnValue ReturnValue
	 * @parent can-construct.static
	 * 
	 * Use to overwrite the return value of new Construct(...).
	 * 
	 * @signature `new Construct.ReturnValue( value )`
	 * 
	 *   This constructor function can be used for creating a return value of the `setup` method.
	 *   [can-construct] will check if the return value is an instance of `Construct.ReturnValue`.
	 *   If it is then its `value` will be used as the new instance.
	 * 
	 *   @param {Object} value A value to be used for a new instance instead of a new object.
	 * 
	 *   ```
	 *   var Student = function( name, school ){
	 *       this.name = name;
	 *       this.school = school;
	 *   } 
	 * 
	 *   var Person = Construct.extend({
	 *       setup: function( options ){
	 *           if (options.school){
	 *               return new Constructor.ReturnValue( new Student( options.name, options.school ) );
	 *           } else {
	 *               return [options];
	 *           }
	 *       }
	 *   });
	 * 
	 *   var myPerson = new Person( {name: "Ilya", school: "PetrSU"} );
	 * 
	 *   myPerson instanceof Student // => true
	 *   ```
   */
	ReturnValue: function(value){
		this.value = value;
	}
});
/**
 * @function can-construct.prototype.setup setup
 * @parent can-construct.prototype
 *
 * @signature `construct.setup(...args)`
 *
 * A setup function for the instantiation of a constructor function.
 *
 * @param {*} args The arguments passed to the constructor.
 *
 * @return {Array|undefined|can-construct.ReturnValue} If an array is returned, the array's items are passed as
 * arguments to [can-construct::init init]. If a [can-construct.ReturnValue] instance is returned, the ReturnValue
 * instance's value will be returned as the result of calling new Construct(). The following example always makes
 * sure that init is called with a jQuery wrapped element:
 *
 * ```js
 * 	WidgetFactory = Construct.extend({
 * 			setup: function(element){
 * 					return [$(element)]
 * 			}
 * 	});
 *
 * 	MyWidget = WidgetFactory.extend({
 * 			init: function($el){
 * 					$el.html("My Widget!!")
 * 			}
 * 	});
 *  ```
 *
 * Otherwise, the arguments to the
 * constructor are passed to [can-construct::init] and the return value of `setup` is discarded.
 *
 * @body
 *
 * ## Deciding between `setup` and `init`
 *
 *
 * Usually, you should use [can-construct::init init] to do your constructor function's initialization.
 * You should, instead, use `setup` when:
 *
 *   - there is initialization code that you want to run before the inheriting constructor's
 *     `init` method is called.
 *   - there is initialization code that should run whether or not inheriting constructors
 *     call their base's `init` methods.
 *   - you want to modify the arguments that will get passed to `init`.
 *
 */
Construct.prototype.setup = function () {};
/**
 * @function can-construct.prototype.init init
 * @parent can-construct.prototype
 *
 * @description Called when a new instance of a Construct is created.
 *
 * @signature `construct.init(...args)`
 * @param {*} args the arguments passed to the constructor (or the items of the array returned from [can-construct::setup])
 *
 * @body
 * If a prototype `init` method is provided, `init` is called when a new Construct is created---
 * after [can-construct::setup]. The `init` method is where the bulk of your initialization code
 * should go. A common thing to do in `init` is save the arguments passed into the constructor.
 *
 * ## Examples
 *
 * First, we'll make a Person constructor that has a first and last name:
 *
 * ```js
 * var Person = Construct.extend({
 *     init: function(first, last) {
 *         this.first = first;
 *         this.last  = last;
 *     }
 * });
 *
 * var justin = new Person("Justin", "Meyer");
 * justin.first; // "Justin"
 * justin.last; // "Meyer"
 * ```
 *
 * Then, we'll extend Person into Programmer, and add a favorite language:
 *
 * ```js
 * var Programmer = Person.extend({
 *     init: function(first, last, language) {
 *         // call base's init
 *         Person.prototype.init.apply(this, arguments);
 *
 *         // other initialization code
 *         this.language = language;
 *     },
 *     bio: function() {
 *         return "Hi! I'm " + this.first + " " + this.last +
 *             " and I write " + this.language + ".";
 *     }
 * });
 *
 * var brian = new Programmer("Brian", "Moschel", 'ECMAScript');
 * brian.bio(); // "Hi! I'm Brian Moschel and I write ECMAScript.";
 * ```
 *
 * ## Modified Arguments
 *
 * [can-construct::setup] is able to modify the arguments passed to `init`.
 * If you aren't receiving the arguments you passed to `new Construct(args)`,
 * check that they aren't being changed by `setup` along
 * the inheritance chain.
 */
Construct.prototype.init = function () {};

module.exports = namespace.Construct = Construct;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

/*can-assign@1.1.0#can-assign*/
module.exports = function (d, s) {
    for (var prop in s) {
        d[prop] = s[prop];
    }
    return d;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canSymbol = __webpack_require__(1);

module.exports = function(obj) {
	return obj && !!obj[canSymbol.iterator || canSymbol.for("iterator")];
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isContainer = __webpack_require__(61);

/**
 * @module {function} can-util/js/get/get get
 * @parent can-util/js
 *
 * @signature `get(obj, path)`
 * @param  {Object} obj the object to use as the root for property based navigation
 * @param  {String} path a String of dot-separated keys, representing a path of properties
 * @return {*}       the value at the property path
 *
 * A *path* is a dot-delimited sequence of zero or more property names, such that "foo.bar" means "the property
 * 'bar' of the object at the property 'foo' of the root."  An empty path returns the object passed.
 *
 * ```js
 * var get = require("can-util/js/get/get");
 * console.log(get({a: {b: {c: "foo"}}}, "a.b.c")); // -> "foo"
 * console.log(get({a: {}}, "a.b.c")); // -> undefined
 * console.log(get([{a: {}}, {a: {b: "bar"}}], "a.b")); // -> "bar"
 * ```
 */
function get(obj, name) {
    // The parts of the name we are looking up
    // `['App','Models','Recipe']`
    var parts = typeof name !== 'undefined' ? (name + '').replace(/\[/g,'.')
    		.replace(/]/g,'').split('.') : [],
        length = parts.length,
        current, i, container;

    if (!length) {
        return obj;
    }

    current = obj;

    // Walk current to the 2nd to last object or until there
    // is not a container.
    for (i = 0; i < length && isContainer(current); i++) {
        container = current;
        current = container[parts[i]];
    }

    return current;
}

module.exports = get;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Returns `true` if the object can have properties (no `null`s).
module.exports = function (current) {
    return /^f|^o/.test(typeof current);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

"format cjs";


var eventLifecycle = __webpack_require__(63);
var canBatch = __webpack_require__(12);
var canEvent = __webpack_require__(11);

var compute = __webpack_require__(10);
var Observation = __webpack_require__(4);

var isEmptyObject = __webpack_require__(16);
var assign = __webpack_require__(3);
var canLogDev = __webpack_require__(5);
var CID = __webpack_require__(7);
var isPlainObject = __webpack_require__(39);
var types = __webpack_require__(25);
var each = __webpack_require__(6);
var defaults = __webpack_require__(130);
var stringToAny = __webpack_require__(131);
var ns = __webpack_require__(2);
var canSymbol = __webpack_require__(1);
var canReflect = __webpack_require__(0);
var singleReference = __webpack_require__(24);
var simpleObervable = __webpack_require__(132);
var defineLazyValue = __webpack_require__(70);

var eventsProto, define,
	make, makeDefinition, getDefinitionsAndMethods,
	isDefineType, getDefinitionOrMethod;

var defineConfigurableAndNotEnumerable = function(obj, prop, value) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: value
	});
};

var eachPropertyDescriptor = function(map, cb){
	for(var prop in map) {
		if(map.hasOwnProperty(prop)) {
			cb.call(map, prop, Object.getOwnPropertyDescriptor(map,prop));
		}
	}
};

// #### trapSets
// This private function creates a "value trap" to glue together
// defined getters/setters in can-define with the observable
// patterns in can-reflect that are hooked into elsewhere in
// can-define.  The last set value is placed into an instance of the
// value trap on set, so as to make it available as a source value
// for an async getter.
function trapSets(observableValue) {
	return {
		observable: observableValue,
		lastSetValue: simpleObervable(),
		setValue: function(value) {
			// Hold on to this value for next time.
			canReflect.setValue(this.lastSetValue, value);
			if(this.observable) {
				if(canSymbol.for("can.setValue") in this.observable) {
					canReflect.setValue(this.observable, value);
				} else {
					this.observable.update();
				}
			}
		}
	};
}


module.exports = define = ns.define = function(objPrototype, defines, baseDefine) {
	// default property definitions on _data
	var prop,
		dataInitializers = Object.create(baseDefine ? baseDefine.dataInitializers : null),
		// computed property definitions on _computed
		computedInitializers = Object.create(baseDefine ? baseDefine.computedInitializers : null);

	var result = getDefinitionsAndMethods(defines, baseDefine);
	result.dataInitializers = dataInitializers;
	result.computedInitializers = computedInitializers;


	// Goes through each property definition and creates
	// a `getter` and `setter` function for `Object.defineProperty`.
	each(result.definitions, function(definition, property){
		define.property(objPrototype, property, definition, dataInitializers, computedInitializers);
	});

	// Places a `_data` on the prototype that when first called replaces itself
	// with a `_data` object local to the instance.  It also defines getters
	// for any value that has a default value.
	if(objPrototype.hasOwnProperty("_data")) {
		for (prop in dataInitializers) {
			defineLazyValue(objPrototype._data, prop, dataInitializers[prop].bind(objPrototype), true);
		}
	} else {
		defineLazyValue(objPrototype, "_data", function() {
			var map = this;
			var data = {};
			for (var prop in dataInitializers) {
				defineLazyValue(data, prop, dataInitializers[prop].bind(map), true);
			}
			return data;
		});
	}

	// Places a `_computed` on the prototype that when first called replaces itself
	// with a `_computed` object local to the instance.  It also defines getters
	// that will create the property's compute when read.
	if(objPrototype.hasOwnProperty("_computed")) {
		for (prop in computedInitializers) {
			defineLazyValue(objPrototype._computed, prop, computedInitializers[prop].bind(objPrototype));
		}
	} else {
		defineLazyValue(objPrototype, "_computed", function() {
			var map = this;
			var data = Object.create(null);
			for (var prop in computedInitializers) {
				defineLazyValue(data, prop, computedInitializers[prop].bind(map));
			}
			return data;
		});
	}

	// Places a `_cid` on the prototype that when first called replaces itself
	// with a `_cid` object local to the instance.
	if (!objPrototype.hasOwnProperty("_cid")) {
		defineLazyValue(objPrototype, "_cid", function() {
			return CID({});
		});
	}	

	// Add necessary event methods to this object.
	for (prop in eventsProto) {
		Object.defineProperty(objPrototype, prop, {
			enumerable: false,
			value: eventsProto[prop],
			configurable: true,
			writable: true
		});
	}
	// add so instance defs can be dynamically added
	Object.defineProperty(objPrototype,"_define",{
		enumerable: false,
		value: result,
		configurable: true,
		writable: true
	});

	// Places Symbol.iterator or @@iterator on the prototype
	// so that this can be iterated with for/of and can-util/js/each/each
	var iteratorSymbol = canSymbol.iterator || canSymbol.for("iterator");
	if(!objPrototype[iteratorSymbol]) {
		defineConfigurableAndNotEnumerable(objPrototype, iteratorSymbol, function(){
			return new define.Iterator(this);
		});
	}

	return result;
};

define.extensions = function () {};

var onlyType = function(obj){
	for(var prop in obj) {
		if(prop !== "type") {
			return false;
		}
	}
	return true;
};

define.property = function(objPrototype, prop, definition, dataInitializers, computedInitializers) {
	var propertyDefinition = define.extensions.apply(this, arguments);

	if (propertyDefinition) {
		definition = propertyDefinition;
	}

	var type = definition.type;

	//!steal-remove-start
	if (type && canReflect.isConstructorLike(type)) {
		canLogDev.warn(
			"can-define: the definition for " +
			prop +
			(objPrototype.constructor.shortName ? " on " + objPrototype.constructor.shortName : "") +
			" uses a constructor for \"type\". Did you mean \"Type\"?"
		);
	}
	//!steal-remove-end

	// Special case definitions that have only `type: "*"`.
	if (type && onlyType(definition) && type === define.types["*"]) {
		Object.defineProperty(objPrototype, prop, {
			get: make.get.data(prop),
			set: make.set.events(prop, make.get.data(prop), make.set.data(prop), make.eventType.data(prop)),
			enumerable: true,
			configurable: true
		});
		return;
	}
	definition.type = type;

	// Where the value is stored.  If there is a `get` the source of the value
	// will be a compute in `this._computed[prop]`.  If not, the source of the
	// value will be in `this._data[prop]`.
	var dataProperty = definition.get ? "computed" : "data",

		// simple functions that all read/get/set to the right place.
		// - reader - reads the value but does not observe.
		// - getter - reads the value and notifies observers.
		// - setter - sets the value.
		reader = make.read[dataProperty](prop),
		getter = make.get[dataProperty](prop),
		setter = make.set[dataProperty](prop),
		getInitialValue;


	// Determine the type converter
	var typeConvert = function(val) {
		return val;
	};

	if (definition.Type) {
		typeConvert = make.set.Type(prop, definition.Type, typeConvert);
	}
	if (type) {
		typeConvert = make.set.type(prop, type, typeConvert);
	}

	// make a setter that's going to fire of events
	var eventsSetter = make.set.events(prop, reader, setter, make.eventType[dataProperty](prop));

	// Determine a function that will provide the initial property value.
	if ((definition.value !== undefined || definition.Value !== undefined)) {
		
		//!steal-remove-start
		// If value is an object or array, give a warning
		if (definition.value !== null && typeof definition.value === 'object') {
			canLogDev.warn("can-define: The value for " + prop + " is set to an object. This will be shared by all instances of the DefineMap. Use a function that returns the object instead.");
		}
		// If value is a constructor, give a warning
		if (definition.value && canReflect.isConstructorLike(definition.value)) {
			canLogDev.warn("can-define: The \"value\" for " + prop + " is set to a constructor. Did you mean \"Value\" instead?");
		}
		//!steal-remove-end

		getInitialValue = Observation.ignore(make.get.defaultValue(prop, definition, typeConvert, eventsSetter));
	}

	// If property has a getter, create the compute that stores its data.
	if (definition.get) {
		computedInitializers[prop] = make.compute(prop, definition.get, getInitialValue);
	}
	// If the property isn't a getter, but has an initial value, setup a
	// default value on `this._data[prop]`.
	else if (getInitialValue) {
		dataInitializers[prop] = getInitialValue;
	}


	// Define setter behavior.

	// If there's a `get` and `set`, make the setter get the `lastSetValue` on the
	// `get`'s compute.
	if (definition.get && definition.set) {
		// the compute will set off events, so we can use the basic setter
		setter = make.set.setter(prop, definition.set, make.read.lastSet(prop), setter, true);
	}
	// If there's a `set` and no `get`,
	else if (definition.set) {
		// Add `set` functionality to the eventSetter.
		setter = make.set.setter(prop, definition.set, reader, eventsSetter, false);
	}
	// If there's neither `set` or `get`,
	else if (!definition.get) {
		// make a set that produces events.
		setter = eventsSetter;
	}
	//!steal-remove-start
	// If there's zero-arg `get` but not `set`, warn on all sets in dev mode
	else if (definition.get.length < 1) {
		setter = function() {
			canLogDev.warn("can-define: Set value for property " +
				prop +
				(objPrototype.constructor.shortName ? " on " + objPrototype.constructor.shortName : "") +
				" ignored, as its definition has a zero-argument getter and no setter");
		};
	}
	//!steal-remove-end

	// Add type behavior to the setter.
	if (type) {
		setter = make.set.type(prop, type, setter);
	}
	if (definition.Type) {
		setter = make.set.Type(prop, definition.Type, setter);
	}

	// Define the property.
	Object.defineProperty(objPrototype, prop, {
		get: getter,
		set: setter,
		enumerable: "serialize" in definition ? !!definition.serialize : !definition.get,
		configurable: true
	});
};


// Makes a simple constructor function.
define.Constructor = function(defines) {
	var constructor = function(props) {
		define.setup.call(this, props);
	};
	define(constructor.prototype, defines);
	return constructor;
};

// A bunch of helper functions that are used to create various behaviors.
make = {
	// Returns a function that creates the `_computed` prop.
	compute: function(prop, get, defaultValueFn) {
		return function() {
			var map = this,
				defaultValue = defaultValueFn && defaultValueFn.call(this),
				computeFn, valueTrap, computeObj;

			var boundGet = function() {
				return get.call(map, canReflect.getValue(computeObj.valueTrap.lastSetValue));
			};

			if(get.length < 2) {
				if(defaultValue && defaultValue.isComputed) {
					computeFn = defaultValue;
					valueTrap = trapSets(computeFn);
				} else {
					computeFn = new Observation(boundGet, map);
					valueTrap = trapSets(computeFn);
					canReflect.setValue(valueTrap.lastSetValue, defaultValue);
				}
			} else {
				if (defaultValue) {
					computeFn = defaultValue.isComputed ?
						defaultValue :
						compute.async(defaultValue, get, map);
				} else {
					computeFn = compute.async(defaultValue, get, map);
				}
				valueTrap = trapSets(computeFn);
			}

			computeObj = {
				oldValue: undefined,
				compute: computeFn,
				count: 0,
				handler: function(newVal) {
					var oldValue = computeObj.oldValue;
					computeObj.oldValue = newVal;

					canEvent.dispatch.call(map, {
						type: prop,
						target: map,
						batchNum: canBatch.batchNum
					}, [newVal, oldValue]);
				},
				valueTrap: valueTrap
			};
			return computeObj;
		};
	},
	// Set related helpers.
	set: {
		data: function(prop) {
			return function(newVal) {
				this._data[prop] = newVal;
			};
		},
		computed: function(prop) {
			return function(val) {
				this._computed[prop].valueTrap.setValue(val);
			};
		},
		events: function(prop, getCurrent, setData, eventType) {
			return function(newVal) {
				if (this.__inSetup) {
					setData.call(this, newVal);
				}
				else {
					var current = getCurrent.call(this);
					if (newVal !== current) {
						setData.call(this, newVal);

						canEvent.dispatch.call(this, {
							type: prop,
							target: this
						}, [newVal, current]);
					}
				}
			};
		},
		setter: function(prop, setter, getCurrent, setEvents, hasGetter) {
			return function(value) {
				//!steal-remove-start
				var asyncTimer;
				//!steal-remove-end

				var self = this;

				// call the setter, if returned value is undefined,
				// this means the setter is async so we
				// do not call update property and return right away

				canBatch.start();
				var setterCalled = false,
					current = getCurrent.call(this),
					setValue = setter.call(this, value, function(value) {
						setEvents.call(self, value);

						setterCalled = true;
						//!steal-remove-start
						clearTimeout(asyncTimer);
						//!steal-remove-end
					}, current);

				if (setterCalled) {
					canBatch.stop();
				} else {
					if (hasGetter) {
						// we got a return value
						if (setValue !== undefined) {
							// if the current `set` value is returned, don't set
							// because current might be the `lastSetVal` of the internal compute.
							if (current !== setValue) {
								setEvents.call(this, setValue);
							}
							canBatch.stop();
						}
						// this is a side effect, it didn't take a value
						// so use the original set value
						else if (setter.length === 0) {
							setEvents.call(this, value);
							canBatch.stop();
							return;
						}
						// it took a value
						else if (setter.length === 1) {
							// if we have a getter, and undefined was returned,
							// we should assume this is setting the getters properties
							// and we shouldn't do anything.
							canBatch.stop();
						}
						// we are expecting something
						else {
							//!steal-remove-start
							asyncTimer = setTimeout(function() {
								canLogDev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
							}, canLogDev.warnTimeout);
							//!steal-remove-end
							canBatch.stop();
							return;
						}
					} else {
						// we got a return value
						if (setValue !== undefined) {
							// if the current `set` value is returned, don't set
							// because current might be the `lastSetVal` of the internal compute.
							setEvents.call(this, setValue);
							canBatch.stop();
						}
						// this is a side effect, it didn't take a value
						// so use the original set value
						else if (setter.length === 0) {
							setEvents.call(this, value);
							canBatch.stop();
							return;
						}
						// it took a value
						else if (setter.length === 1) {
							// if we don't have a getter, we should probably be setting the
							// value to undefined
							setEvents.call(this, undefined);
							canBatch.stop();
						}
						// we are expecting something
						else {
							//!steal-remove-start
							asyncTimer = setTimeout(function() {
								canLogDev.warn('can/map/setter.js: Setter "' + prop + '" did not return a value or call the setter callback.');
							}, canLogDev.warnTimeout);
							//!steal-remove-end
							canBatch.stop();
							return;
						}
					}


				}
			};
		},
		type: function(prop, type, set) {

			if (typeof type === "object") {

				return make.set.Type(prop, type, set);

			} else {
				return function(newValue) {
					return set.call(this, type.call(this, newValue, prop));
				};
			}
		},
		Type: function(prop, Type, set) {
			// `type`: {foo: "string"}
			if(Array.isArray(Type) && types.DefineList) {
				Type = types.DefineList.extend({
					"#": Type[0]
				});
			} else if (typeof Type === "object") {
				if(types.DefineMap) {
					Type = types.DefineMap.extend(Type);
				} else {
					Type = define.constructor(Type);
				}
			}
			return function(newValue) {
				if (newValue instanceof Type || newValue == null) {
					return set.call(this, newValue);
				} else {
					return set.call(this, new Type(newValue));
				}
			};
		}
	},
	// Helpes that indicate what the event type should be.  These probably aren't needed.
	eventType: {
		data: function(prop) {
			return function(newVal, oldVal) {
				return oldVal !== undefined || this._data.hasOwnProperty(prop) ? "set" : "add";
			};
		},
		computed: function() {
			return function() {
				return "set";
			};
		}
	},
	// Helpers that read the data in a non-observable way.
	read: {
		data: function(prop) {
			return function() {
				return this._data[prop];
			};
		},
		computed: function(prop) {
			// might want to protect this
			return function() {
				return canReflect.getValue( this._computed[prop].compute );
			};
		},
		lastSet: function(prop) {
			return function() {
				var lastSetValue = this._computed[prop].valueTrap.lastSetValue;
				return canReflect.getValue(lastSetValue);
			};
		}
	},
	// Helpers that read the data in an observable way.
	get: {
		// uses the default value
		defaultValue: function(prop, definition, typeConvert, callSetter) {
			return function() {
				var value = definition.value;
				if (value !== undefined) {
					if (typeof value === "function") {
						value = value.call(this);
					}
					value = typeConvert(value);
				}
				else {
					var Value = definition.Value;
					if (Value) {
						value = typeConvert(new Value());
					}
				}
				if(definition.set) {
					// TODO: there's almost certainly a faster way of making this happen
					// But this is maintainable.

					var VALUE;
					var sync = true;

					var setter = make.set.setter(prop, definition.set, function(){}, function(value){
						if(sync) {
							VALUE = value;
						} else {
							callSetter.call(this, value);
						}
					}, definition.get);

					setter.call(this,value);
					sync= false;

					// VALUE will be undefined if the callback is never called.
					return VALUE;


				}
				return value;
			};
		},
		data: function(prop) {
			return function() {
				if (!this.__inSetup) {
					Observation.add(this, prop);
				}

				return this._data[prop];
			};
		},
		computed: function(prop) {
			return function() {
				return canReflect.getValue(this._computed[prop].compute);
			};
		}
	}
};

define.behaviors = ["get", "set", "value", "Value", "type", "Type", "serialize"];

var addDefinition = function(definition, behavior, value) {
	if(behavior === "type") {
		var behaviorDef = value;
		if(typeof behaviorDef === "string") {
			behaviorDef = define.types[behaviorDef];
			if(typeof behaviorDef === "object") {
				assign(definition, behaviorDef);
				behaviorDef = behaviorDef[behavior];
			}
		}
		if (typeof behaviorDef !== 'undefined') {
			definition[behavior] = behaviorDef;
		}
	}
	else {
		definition[behavior] = value;
	}
};

makeDefinition = function(prop, def, defaultDefinition) {
	var definition = {};

	each(def, function(value, behavior) {
		addDefinition(definition, behavior, value);
	});
	// only add default if it doesn't exist
	each(defaultDefinition, function(value, prop){
		if(definition[prop] === undefined) {
			if(prop !== "type" && prop !== "Type") {
				definition[prop] = value;
			}
		}
	});
	// We only want to add a defaultDefinition if def.type is not a string
	// if def.type is a string it is handled in addDefinition
	if(typeof def.type !== 'string') {
		// if there's no type definition, take it from the defaultDefinition
		if(!definition.type && !definition.Type) {
			defaults(definition, defaultDefinition);
		}

		if( isEmptyObject(definition) ) {
			definition.type = define.types["*"];
		}
	}
	
	return definition;
};

getDefinitionOrMethod = function(prop, value, defaultDefinition){
	var definition;	
	if(typeof value === "string") {
		definition = {type: value};
	}
	else if(typeof value === "function") {
		if(canReflect.isConstructorLike(value)) {
			definition = {Type: value};
		} else if(isDefineType(value)) {
			definition = {type: value};
		}
		// or leaves as a function
	} else if( Array.isArray(value) ) {
		definition = {Type: value};
	} else if( isPlainObject(value) ){
		definition = value;
	}

	if(definition) {
		return makeDefinition(prop, definition, defaultDefinition);
	}
	else {
		return value;
	}
};

getDefinitionsAndMethods = function(defines, baseDefines) {
	// make it so the definitions include base definitions on the proto
	var definitions = Object.create(baseDefines ? baseDefines.definitions : null);
	var methods = {};
	// first lets get a default if it exists
	var defaults = defines["*"],
		defaultDefinition;
	if(defaults) {
		delete defines["*"];
		defaultDefinition = getDefinitionOrMethod("*", defaults, {});
	} else {
		defaultDefinition = Object.create(null);
	}

	eachPropertyDescriptor(defines, function( prop, propertyDescriptor ) {

		var value;
		if(propertyDescriptor.get || propertyDescriptor.set) {
			value = {get: propertyDescriptor.get, set: propertyDescriptor.set};
		} else {
			value = propertyDescriptor.value;
		}

		if(prop === "constructor") {
			methods[prop] = value;
			return;
		} else {
			var result = getDefinitionOrMethod(prop, value, defaultDefinition);
			if(result && typeof result === "object" && !isEmptyObject(result)) {
				definitions[prop] = result;
			} 
			else {
				// Removed adding raw values that are not functions
				if (typeof result === 'function') {
					methods[prop] = result;
				}
				//!steal-remove-start
				else if (typeof result !== 'undefined') {
					canLogDev.error(prop + (this.constructor.shortName ? " on " + this.constructor.shortName : "") + " does not match a supported propDefinition. See: https://canjs.com/doc/can-define.types.propDefinition.html");
				}
				//!steal-remove-end
			}
		}
	});
	if(defaults) {
		defines["*"] = defaults;
	}
	return {definitions: definitions, methods: methods, defaultDefinition: defaultDefinition};
};

eventsProto = assign({}, canEvent);
assign(eventsProto, {
	_eventSetup: function() {},
	_eventTeardown: function() {},
	addEventListener: function(eventName, handler) {

		var computedBinding = this._computed && this._computed[eventName];
		if (computedBinding && computedBinding.compute) {
			if (!computedBinding.count) {
				computedBinding.count = 1;
				canReflect.onValue(computedBinding.compute, computedBinding.handler);
				computedBinding.oldValue = canReflect.getValue(computedBinding.compute);
			} else {
				computedBinding.count++;
			}

		}

		return eventLifecycle.addAndSetup.apply(this, arguments);
	},

	// ### unbind
	// Stops listening to an event.
	// If this is the last listener of a computed property,
	// stop forwarding events of the computed property to this map.
	removeEventListener: function(eventName, handler) {
		var computedBinding = this._computed && this._computed[eventName];
		if (computedBinding) {
			if (computedBinding.count === 1) {
				computedBinding.count = 0;
				canReflect.offValue(computedBinding.compute, computedBinding.handler);
			} else {
				computedBinding.count--;
			}

		}

		return eventLifecycle.removeAndTeardown.apply(this, arguments);

	}
});
eventsProto.on = eventsProto.bind = eventsProto.addEventListener;
eventsProto.off = eventsProto.unbind = eventsProto.removeEventListener;
canReflect.set(eventsProto, canSymbol.for("can.onKeyValue"), function(key, handler){
	var translationHandler = function(ev, newValue, oldValue){
		handler(newValue, oldValue);
	};
	singleReference.set(handler, this, translationHandler, key);

	this.addEventListener(key, translationHandler);
});

canReflect.set(eventsProto, canSymbol.for("can.offKeyValue"), function(key, handler){
	this.removeEventListener(key, singleReference.getAndDelete(handler, this, key) );
});

delete eventsProto.one;

define.setup = function(props, sealed) {
	CID(this);
	Object.defineProperty(this,"_cid", {value: this._cid, enumerable: false, writable: false});
	Object.defineProperty(this,"constructor", {value: this.constructor, enumerable: false, writable: false});
	Object.defineProperty(this,"__bindEvents", {value: Object.create(null), enumerable: false, writable: false});

	/* jshint -W030 */

	var definitions = this._define.definitions;
	var instanceDefinitions = Object.create(null);
	var map = this;
	canReflect.eachKey(props, function(value, prop){
		if(definitions[prop] !== undefined) {
			map[prop] = value;
		} else {
			var def = define.makeSimpleGetterSetter(prop);
			instanceDefinitions[prop] = {};
			Object.defineProperty(map, prop, def);
			// possibly convert value to List or DefineMap
			map[prop] = define.types.observable(value);
		}
	});
	if(!isEmptyObject(instanceDefinitions)) {
		defineConfigurableAndNotEnumerable(this, "_instanceDefinitions", instanceDefinitions);
	}
	// only seal in dev mode for performance reasons.
	//!steal-remove-start
	this._data;
	this._computed;
	if(sealed !== false) {
		Object.seal(this);
	}
	//!steal-remove-end
};
define.replaceWith = defineLazyValue;
define.eventsProto = eventsProto;
define.defineConfigurableAndNotEnumerable = defineConfigurableAndNotEnumerable;
define.make = make;
define.getDefinitionOrMethod = getDefinitionOrMethod;
var simpleGetterSetters = {};
define.makeSimpleGetterSetter = function(prop){
	if(!simpleGetterSetters[prop]) {

		var setter = make.set.events(prop, make.get.data(prop), make.set.data(prop), make.eventType.data(prop) );

		simpleGetterSetters[prop] = {
			get: make.get.data(prop),
			set: function(newVal){
				return setter.call(this, define.types.observable(newVal));
			},
			enumerable: true
		};
	}
	return simpleGetterSetters[prop];
};

define.Iterator = function(obj){
	this.obj = obj;
	this.definitions = Object.keys(obj._define.definitions);
	this.instanceDefinitions = obj._instanceDefinitions ?
		Object.keys(obj._instanceDefinitions) :
		Object.keys(obj);
	this.hasGet = typeof obj.get === "function";
};

define.Iterator.prototype.next = function(){
	var key;
	if(this.definitions.length) {
		key = this.definitions.shift();

		// Getters should not be enumerable
		var def = this.obj._define.definitions[key];
		if(def.get) {
			return this.next();
		}
	} else if(this.instanceDefinitions.length) {
		key = this.instanceDefinitions.shift();
	} else {
		return {
			value: undefined,
			done: true
		};
	}

	return {
		value: [
			key,
			this.hasGet ? this.obj.get(key) : this.obj[key]
		],
		done: false
	};
};

isDefineType = function(func){
	return func && func.canDefineType === true;
};

define.types = {
	'date': function(str) {
		var type = typeof str;
		if (type === 'string') {
			str = Date.parse(str);
			return isNaN(str) ? null : new Date(str);
		} else if (type === 'number') {
			return new Date(str);
		} else {
			return str;
		}
	},
	'number': function(val) {
		if (val == null) {
			return val;
		}
		return +(val);
	},
	'boolean': function(val) {
		if(val == null) {
			return val;
		}
		if (val === 'false' || val === '0' || !val) {
			return false;
		}
		return true;
	},
	'observable': function(newVal) {
				if(Array.isArray(newVal) && types.DefineList) {
						newVal = new types.DefineList(newVal);
				}
				else if(isPlainObject(newVal) &&  types.DefineMap) {
						newVal = new types.DefineMap(newVal);
				}
				return newVal;
		},
	'stringOrObservable': function(newVal) {
		if(Array.isArray(newVal)) {
			return new types.DefaultList(newVal);
		}
		else if(isPlainObject(newVal)) {
			return new types.DefaultMap(newVal);
		}
		else {
			return define.types.string(newVal);
		}
	},
	/**
	 * Implements HTML-style boolean logic for attribute strings, where
	 * any string, including "", is truthy.
	 */
	'htmlbool': function(val) {
		if (val === '') {
			return true;
		}
		return !!stringToAny(val);
	},
	'*': function(val) {
		return val;
	},
	'any': function(val) {
		return val;
	},
	'string': function(val) {
		if (val == null) {
			return val;
		}
		return '' + val;
	},

	'compute': {
		set: function(newValue, setVal, setErr, oldValue) {
			if (newValue && newValue.isComputed) {
				return newValue;
			}
			if (oldValue && oldValue.isComputed) {
				oldValue(newValue);
				return oldValue;
			}
			return newValue;
		},
		get: function(value) {
			return value && value.isComputed ? value() : value;
		}
	}
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var canEvent = __webpack_require__(11);
/**
 * @typedef {{bind:function():*,unbind:function():*}} can.util.bind
 * @hide
 *
 * Provides mixin-able bind and unbind methods. `bind()` calls `this._bindsetup`
 * when the first bind happens and.  `unbind()` calls `this._bindteardown` when there
 * are no more event handlers.
 *
 */
	// ## Bind helpers

var lifecycle = function(prototype) {
	var baseAddEventListener = prototype.addEventListener;
	var baseRemoveEventListener = prototype.removeEventListener;

	prototype.addEventListener = function () {
		// Add the event to this object
		var ret = baseAddEventListener.apply(this, arguments);
		// If not initializing, and the first binding
		// call bindsetup if the function exists.
		if (!this.__inSetup) {
			this.__bindEvents = this.__bindEvents || {};
			if (!this.__bindEvents._lifecycleBindings) {
				this.__bindEvents._lifecycleBindings = 1;
				// setup live-binding
				if (this._eventSetup) {
					this._eventSetup();
				}
			} else {
				this.__bindEvents._lifecycleBindings++;
			}
		}
		return ret;
	};

	prototype.removeEventListener = function (event, handler) {
		if (!this.__bindEvents) {
			return this;
		}

		var handlers = this.__bindEvents[event] || [];
		var handlerCount = handlers.length;

		// Remove the event handler
		var ret = baseRemoveEventListener.apply(this, arguments);
		if (this.__bindEvents._lifecycleBindings === null) {
			this.__bindEvents._lifecycleBindings = 0;
		} else {
			// Subtract the difference in the number of handlers bound to this
			// event before/after removeEvent
			this.__bindEvents._lifecycleBindings -= (handlerCount - handlers.length);
		}
		// If there are no longer any bindings and
		// there is a bindteardown method, call it.
		if (!this.__bindEvents._lifecycleBindings && this._eventTeardown) {
			this._eventTeardown();
		}
		return ret;
	};

	return prototype;
};

var baseEvents = lifecycle({
	addEventListener: canEvent.addEventListener,
	removeEventListener: canEvent.removeEventListener
});

lifecycle.addAndSetup = baseEvents.addEventListener;
lifecycle.removeAndTeardown = baseEvents.removeEventListener;

module.exports = lifecycle;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var canSymbol = __webpack_require__(1);

module.exports = {
	makeGetFirstSymbolValue: function(symbolNames){
		var symbols = symbolNames.map(function(name){
			return canSymbol.for(name);
		});
		var length = symbols.length;

		return function getFirstSymbol(obj){
			var index = -1;

			while (++index < length) {
				if(obj[symbols[index]] !== undefined) {
					return obj[symbols[index]];
				}
			}
		};
	},
	// The `in` check is from jQuery’s fix for an iOS 8 64-bit JIT object length bug:
	// https://github.com/jquery/jquery/pull/2185
	hasLength: function(list){
		var type = typeof list;
		var length = list && type !== 'boolean' &&
			typeof list !== 'number' &&
			"length" in list && list.length;

		// var length = "length" in obj && obj.length;
		return typeof list !== "function" &&
			( length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in list );
	}
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(9);
var domDataState = __webpack_require__(45);
var getMutationObserver = __webpack_require__(23);
var each = __webpack_require__(6);
var CIDStore = __webpack_require__(66);
var makeArray = __webpack_require__(15);
var string = __webpack_require__(41);

var dispatchIfListening = function(mutatedNode, nodes, dispatched){
	if(dispatched.has(mutatedNode)) {
		return true;
	}
	dispatched.add(mutatedNode);

	if(nodes.name === "removedNodes") {
		var documentElement = getDocument().documentElement;
		if(documentElement.contains(mutatedNode)) {
			return;
		}
	}

	nodes.handlers.forEach(function(handler){
		handler(mutatedNode);
	});
	nodes.afterHandlers.forEach(function(handler){
		handler(mutatedNode);
	});
};

var mutationObserverDocument = {
	add: function(handler) {
		var MO = getMutationObserver();
		if (MO) {
			var documentElement = getDocument().documentElement;
			var globalObserverData = domDataState.get.call(documentElement, "globalObserverData");
			if(!globalObserverData) {
				var observer = new MO(function (mutations) {
					globalObserverData.handlers.forEach(function(handler){
						handler(mutations);
					});
				});
				observer.observe(documentElement, {childList: true, subtree: true});

				globalObserverData = {
					observer: observer,
					handlers: []
				};
				domDataState.set.call(documentElement, "globalObserverData", globalObserverData);
			}
			globalObserverData.handlers.push(handler);
		}
	},
	remove: function(handler){
		var documentElement = getDocument().documentElement;
		var globalObserverData = domDataState.get.call(documentElement, "globalObserverData");
		if(globalObserverData) {
			var index = globalObserverData.handlers.indexOf(handler);
			if(index >= 0) {
				globalObserverData.handlers.splice(index, 1);
			}
			if(globalObserverData.handlers.length === 0 ){
				globalObserverData.observer.disconnect();
				domDataState.clean.call(documentElement, "globalObserverData");
			}
		}
	}
};

var makeMutationMethods = function(name) {
	var mutationName = name.toLowerCase() + "Nodes";

	var getMutationData = function() {
		var documentElement = getDocument().documentElement;
		var mutationData = domDataState.get.call(documentElement, mutationName + "MutationData");

		if(!mutationData) {
			mutationData = {
				name: mutationName,
				handlers: [],
				afterHandlers: [],
				hander: null
			};
			if (getMutationObserver()) {
				domDataState.set.call(documentElement, mutationName + "MutationData", mutationData);
			}
		}
		return mutationData;
	};

	var setup = function() {
		var mutationData = getMutationData();

		if( mutationData.handlers.length === 0 || mutationData.afterHandlers.length === 0 ) {
			mutationData.handler = function(mutations){
				var dispatched = new CIDStore();

				mutations.forEach(function(mutation){
					each(mutation[mutationName], function(mutatedNode){
						var children = mutatedNode.getElementsByTagName && makeArray( mutatedNode.getElementsByTagName("*") );

						var alreadyChecked = dispatchIfListening(mutatedNode, mutationData, dispatched);
						if(children && !alreadyChecked) {
							for (var j = 0, child;
								(child = children[j]) !== undefined; j++) {
								dispatchIfListening(child, mutationData, dispatched);
							}
						}
					});
				});
			};
			this.add(mutationData.handler);
		}
		return mutationData;
	};

	var teardown = function() {
		var documentElement = getDocument().documentElement;
		var mutationData = getMutationData();
		if( mutationData.handlers.length === 0 && mutationData.afterHandlers.length === 0 ) {
			this.remove(mutationData.handler);
			domDataState.clean.call(documentElement, mutationName + "MutationData");
		}
	};

	var createOnOffHandlers = function(name, handlerList) {
		mutationObserverDocument["on" + name] = function(handler) {
			var mutationData = setup.call(this);
			mutationData[handlerList].push(handler);
		};

		mutationObserverDocument["off" + name] = function(handler) {
			var mutationData = getMutationData();
			var index = mutationData[handlerList].indexOf(handler);
			if(index >=0 ) {
				mutationData[handlerList].splice(index, 1);
			}
			teardown.call(this);
		};
	};

	var createHandlers = function(name) {
		createOnOffHandlers(name, "handlers");
		createOnOffHandlers("After" + name, "afterHandlers");
	};

	createHandlers(string.capitalize(mutationName));
};

makeMutationMethods("added");
makeMutationMethods("removed");

module.exports = mutationObserverDocument;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getCID = __webpack_require__(7).get;
var helpers = __webpack_require__(67);

var CIDSet;

if(typeof Set !== "undefined") {
	CIDSet = Set;
} else {
	var CIDSet = function(){
		this.values = {};
	};
	CIDSet.prototype.add = function(value){
		this.values[getCID(value)] = value;
	};
	CIDSet.prototype["delete"] = function(key){
		var has = getCID(key) in this.values;
		if(has) {
			delete this.values[getCID(key)];
		}
		return has;
	};
	CIDSet.prototype.forEach = function(cb, thisArg) {
		helpers.each(this.values, cb, thisArg);
	};
	CIDSet.prototype.has = function(value) {
		return getCID(value) in this.values;
	};
	CIDSet.prototype.clear = function() {
		return this.values = {};
	};
	Object.defineProperty(CIDSet.prototype,"size",{
		get: function(){
			var size = 0;
			helpers.each(this.values, function(){
				size++;
			});
			return size;
		}
	});
}

module.exports = CIDSet;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = {
    each: function(obj, cb, context) {
        for(var prop in obj) {
            cb.call(context, obj[prop], prop);
        }
        return obj;
    }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// # can/compute/proto_compute (aka can.Compute)
//
// Allows the creation of observablue values. This
// is a prototype based version of [can.compute](compute.html).
//
// can.Computes come in different flavors:
//
// - [Getter / Setter functional computes](#setup-getter-setter-functional-computes).
// - [Property computes](#setup-property-computes).
// - [Setter computes](#setup-setter-computes).
// - [Async computes](#setup-async-computes).
// - [Settings computes](#setup-settings-computes).
// - [Simple value computes](#setup-simple-value-computes).
//
//
// can.Computes have public `.get`, `.set`, `.on`, and `.off` methods that call
// internal methods that are configured differently depending on what flavor of
// compute is being created.  Those methods are:
//
// - `_on(updater)` - Called the first time the compute is bound. This should bind to
//    any source observables.  When any of the source observables have changed, it should call
//    `updater(newVal, oldVal, batchNum)`.
//
// - `_off(updater)` - Called when the compute has no more event handlers.  This should unbind to any source observables.
// - `_get` - Called to get the current value of the compute.
// - `_set` - Called to set the value of the compute.
//
//
//
// Other internal flags and values:
// - `value` - the cached value
// - `_setUpdates` - if calling `_set` will have updated the cached value itself so `_get` does not need to be called.
// - `_canObserve` - if this compute can be observed.
// - `hasDependencies` - if this compute has source observable values.
var Observation = __webpack_require__(4);
var canEvent = __webpack_require__(11);
var eventLifecycle = __webpack_require__(63);
__webpack_require__(12);
var observeReader = __webpack_require__(31);
var getObject = __webpack_require__(60);

var CID = __webpack_require__(7);
var assign = __webpack_require__(3);
var canLog = __webpack_require__(46);
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);
var CIDSet = __webpack_require__(48);
var singleReference = __webpack_require__(24);

// ## can.Compute
// Checks the arguments and calls different setup methods.
var Compute = function(getterSetter, context, eventName, bindOnce) {
	CID(this, 'compute');

	var args = [];

	for(var i = 0, arglen = arguments.length; i < arglen; i++) {
		args[i] = arguments[i];
	}

	var contextType = typeof args[1];

	if (typeof args[0] === 'function') {
		// Getter/Setter functional computes.
		// `new can.Compute(function(){ ... })`
		this._setupGetterSetterFn(args[0], args[1], args[2], args[3]);
	} else if (args[1] !== undefined) {
		if (contextType === 'string' || contextType === 'number') {
			// Property computes.
			// `new can.Compute(object, propertyName[, eventName])`
			var isListLike = canReflect.isObservableLike(args[0]) && canReflect.isListLike(args[0]);
			var isMapLike = canReflect.isObservableLike(args[0]) && canReflect.isMapLike(args[0]);
			if(isMapLike || isListLike) {
				var map = args[0];
				var propertyName = args[1];
				var mapGetterSetter = function(newValue){
					if(arguments.length) {
						observeReader.set(map,propertyName, newValue);
					} else {
						// forces length to be read
						if(isListLike) {
							observeReader.get(map,"length");
						}
						return observeReader.get(map,""+propertyName);
					}
				};
				this._setupGetterSetterFn(mapGetterSetter, args[1], args[2], args[3]);
			} else {
				this._setupProperty(args[0], args[1], args[2]);
			}

		} else if(contextType === 'function') {
			// Setter computes.
			// `new can.Compute(initialValue, function(newValue){ ... })`
			this._setupSetter(args[0], args[1], args[2]);
		} else {

			if(args[1] && args[1].fn) {
				// Async computes.
				this._setupAsyncCompute(args[0], args[1]);
			} else {
				// Settings computes.
				//`new can.Compute(initialValue, {on, off, get, set})`
				this._setupSettings(args[0], args[1]);
			}

		}
	} else {
		// Simple value computes.
		// `new can.Compute(initialValue)`
		this._setupSimpleValue(args[0]);
	}

	this._args = args;
	this._primaryDepth = 0;

	this.isComputed = true;

};

// ## Helpers

// ## updateOnChange
// A helper to trigger an event when a value changes
var updateOnChange = function(compute, newValue, oldValue, batchNum){

	var valueChanged = newValue !== oldValue && !(newValue !== newValue && oldValue !== oldValue);

	// Only trigger event when value has changed
	if (valueChanged) {
		canEvent.dispatch.call(compute, {type: "change", batchNum: batchNum}, [
			newValue,
			oldValue
		]);
	}
};

// ### setupComputeHandlers
// A helper that creates an `_on` and `_off` function that
// will bind on source observables and update the value of the compute.
var setupComputeHandlers = function(compute, func, context) {

	var observation = new Observation(func, context, compute);
	compute.observation = observation;
	return {
		// Call `onchanged` when any source observables change.
		_on: function() {
			observation.start();
			compute.value = observation.value;
		},
		// Unbind `onchanged` from all source observables.
		_off: function() {
			observation.stop();
		},
		getDepth: function() {
			return observation.getDepth();
		}
	};
};

assign(Compute.prototype, {
	setPrimaryDepth: function(depth) {
		this._primaryDepth = depth;
	},

	// ## Setup getter / setter functional computes
	// Uses the function as both a getter and setter.
	_setupGetterSetterFn: function(getterSetter, context, eventName) {
		this._set = context ? getterSetter.bind(context) : getterSetter;
		this._get = context ? getterSetter.bind(context) : getterSetter;
		this._canObserve = eventName === false ? false : true;
		// The helper provides the on and off methods that use `getValueAndBind`.
		var handlers = setupComputeHandlers(this, getterSetter, context || this);

		assign(this, handlers);
	},
	// ## Setup property computes
	// Listen to a property changing on an object.
	_setupProperty: function(target, propertyName, eventName) {
		var self = this,
			handler;


		// This is objects that can be bound to with can.bind.
		handler = function () {
			self.updater(self._get(), self.value);
		};
		this._get = function() {
			return getObject(target, propertyName);
		};
		this._set = function(value) {
			// allow setting properties n levels deep, if separated with dot syntax
			var properties = propertyName.split("."),
				leafPropertyName = properties.pop();

			if(properties.length) {
				var targetProperty = getObject(target, properties.join('.'));
				targetProperty[leafPropertyName] = value;
			} else {
				target[propertyName] = value;
			}
		};

		this._on = function(update) {
			canEvent.on.call(target, eventName || propertyName, handler);
			// Set the cached value
			this.value = this._get();
		};
		this._off = function() {
			return canEvent.off.call( target, eventName || propertyName, handler);
		};
	},
	// ## Setup Setter Computes
	// Only a setter function is specified.
	_setupSetter: function(initialValue, setter, eventName) {
		this.value = initialValue;
		this._set = setter;
		assign(this, eventName);
	},
	// ## Setup settings computes
	// Use whatever `on`, `off`, `get`, `set` the users provided
	// as the internal methods.
	_setupSettings: function(initialValue, settings) {

		this.value = initialValue;

		this._set = settings.set || this._set;
		this._get = settings.get || this._get;

		// This allows updater to be called without any arguments.
		// selfUpdater flag can be set by things that want to call updater themselves.
		if(!settings.__selfUpdater) {
			var self = this,
				oldUpdater = this.updater;
			this.updater = function() {
				oldUpdater.call(self, self._get(), self.value);
			};
		}


		this._on = settings.on ? settings.on : this._on;
		this._off = settings.off ? settings.off : this._off;
	},
	// ## Setup async computes
	// This is a special, non-documented form of a compute
	// rhat can asynchronously update its value.
	_setupAsyncCompute: function(initialValue, settings){
		var self = this;
		// This is the async getter function.  Depending on how many arguments the function takes,
		// we setup bindings differently.
		var getter = settings.fn;
		var bindings;

		this.value = initialValue;

		// This compute will call update with the new value itself.
		this._setUpdates = true;

		// An "async" compute has a `lastSetValue` that represents
		// the last value `compute.set` was called with.
		// The following creates `lastSetValue` as a can.Compute so when
		//  `lastSetValue` is changed, the `getter` can see that change
		// and automatically update itself.
		this.lastSetValue = new Compute(initialValue);

		// Wires up setting this compute to set `lastSetValue`.
		// If the new value matches the last setValue, do nothing.
		this._set = function(newVal){
			if(newVal === self.lastSetValue.get()) {
				return this.value;
			}

			return self.lastSetValue.set(newVal);
		};

		// Wire up the get to pass the lastNewValue
		this._get = function() {
			return getter.call(settings.context, self.lastSetValue.get() );
		};

		if(getter.length === 0) {
			// If it takes no arguments, it should behave just like a Getter compute.
			bindings = setupComputeHandlers(this, getter, settings.context);
		} else if(getter.length === 1) {
			// If it has a single argument, pass it the last setValue.
			bindings = setupComputeHandlers(this, function() {
				return getter.call(settings.context, self.lastSetValue.get() );
			}, settings);

		} else {
			// If the function takes 2 arguments, the second argument is a function
			// that should update the value of the compute (`setValue`). To make this we need
			// the "normal" updater function because we are about to overwrite it.
			var oldUpdater = this.updater,
				resolve = Observation.ignore(function(newVal) {
					oldUpdater.call(self, newVal, self.value);
				});

			// Because `setupComputeHandlers` calls `updater` internally with its
			// observation.value as `oldValue` and that might not be up to date,
			// we overwrite updater to always use self.value.
			this.updater = function(newVal) {
				oldUpdater.call(self, newVal, self.value);
			};


			bindings = setupComputeHandlers(this, function() {
				// Call getter, and get new value
				var res = getter.call(settings.context, self.lastSetValue.get(), resolve);
				// If undefined is returned, don't update the value.
				return res !== undefined ? res : this.value;
			}, this);
		}

		assign(this, bindings);
	},
	// ## Setup simple value computes
	// Uses the default `_get`, `_set` behaviors.
	_setupSimpleValue: function(initialValue) {
		this.value = initialValue;
	},
	// ## _bindsetup
	// When a compute is first bound, call the internal `this._on` method.
	// `can.__notObserve` makes sure if `_on` is listening to any observables,
	// they will not be observed by any outer compute.
	_eventSetup: Observation.ignore(function () {
		this.bound = true;
		this._on(this.updater);
	}),
	// ## _bindteardown
	// When a compute has no other bindings, call the internal `this._off` method.
	_eventTeardown: function () {
		this._off(this.updater);
		this.bound = false;
	},
	// ## bind and unbind
	// A bind and unbind that calls `_bindsetup` and `_bindteardown`.
	addEventListener: eventLifecycle.addAndSetup,
	removeEventListener: eventLifecycle.removeAndTeardown,

	// ## clone
	// Copies this compute, but for a different context.
	// This is mostly used for computes on a map's prototype.
	clone: function(context) {
		if(context && typeof this._args[0] === 'function') {
			this._args[1] = context;
		} else if(context) {
			this._args[2] = context;
		}

		return new Compute(this._args[0], this._args[1], this._args[2], this._args[3]);
	},
	// ## _on and _off
	// Default _on and _off do nothing.
	_on: function(){},
	_off: function(){},
	// ## get
	// Returns the cached value if `bound`, otherwise, returns
	// the _get value.
	get: function() {
		// If an external compute is tracking observables and
		// this compute can be listened to by "function" based computes ....
		var recordingObservation = Observation.isRecording();
		if(recordingObservation && this._canObserve !== false) {

			// ... tell the tracking compute to listen to change on this computed.
			Observation.add(this, 'change');
			// ... if we are not bound, we should bind so that
			// we don't have to re-read to get the value of this compute.
			if (!this.bound) {
				Compute.temporarilyBind(this);
			}
		}
		// If computed is bound, use the cached value.
		if (this.bound) {
			// if it has dependencies ... it should do some stuff ...
			if(this.observation) {
				return this.observation.get();
			} else {
				return this.value;
			}
		} else {
			return this._get();
		}
	},
	// ## _get
	// Returns the cached value.
	_get: function() {
		return this.value;
	},
	// ## set
	// Sets the value of the compute.
	// Depending on the type of the compute and what `_set` returns, it might need to call `_get` after
	// `_set` to get the final value.
	set: function(newVal) {

		var old = this.value;

		// Setter may return the value if setter
		// is for a value maintained exclusively by this compute.
		var setVal = this._set(newVal, old);

		// If the setter updated this.value, just return that.
		if(this._setUpdates) {
			return this.value;
		}

		// If the computed function has dependencies,
		// we should call the getter.
		if (this.hasDependencies) {
			return this._get();
		}

		// Setting may not fire a change event, in which case
		// the value must be read
		this.updater(setVal === undefined ? this._get() : setVal, old);

		return this.value;
	},
	// ## _set
	// Updates the cached value.
	_set: function(newVal) {
		return this.value = newVal;
	},
	// ## updater
	// Updates the cached value and fires an event if the value has changed.
	updater: function(newVal, oldVal, batchNum) {
		this.value = newVal;
		if(this.observation) {
			// it's possible the observation doesn't actually
			// have any dependencies
			this.observation.value = newVal;
		}
		updateOnChange(this, newVal, oldVal, batchNum);
	},
	// ## toFunction
	// Returns a proxy form of this compute.
	toFunction: function() {
		return this._computeFn.bind( this);
	},
	_computeFn: function(newVal) {
		if(arguments.length) {
			return this.set(newVal);
		}

		return this.get();
	}
	//!steal-remove-start
	,
	trace: function(){
		var me = {
			computeValue: this.get(),
			definition: this.observation && this.observation.func,
			cid: this._cid
		};


		if(this.observation) {
			var deps = [];
			for(var name in this.observation.newObserved) {
				var obs = assign({},this.observation.newObserved[name]);
				if(obs.obj.isComputed) {
					deps.push(obs.obj.trace());

				} else {
					deps.push(obs);
				}
			}
			me.dependencies = deps;
		}
		return me;
	},
	log: function(){
		var log = function(trace){
			var currentTrace = '';

			if(trace.dependencies && trace.dependencies.length) {
				currentTrace = trace.cid + " = " + trace.computeValue;

				if(typeof console !== 'undefined' && console.group) {
					console.group(currentTrace);
				} else {
					canLog.log(currentTrace);
				}

				trace.dependencies.forEach(function(dep){
					if(dep.hasOwnProperty("computeValue")) {
						log(dep);
					} else {
						canLog.log(dep.obj, dep.event);
					}
				});

				if(typeof console !== 'undefined' && console.groupEnd) {
					console.groupEnd();
				}
			} else {
				canLog.log(trace.cid +" - "+ trace.computeValue);
			}
			return trace;
		};

		return log(this.trace());
	}
	//!steal-remove-end
});

var hasDependencies = function(){
	return this.observation && this.observation.hasDependencies();
};
Object.defineProperty(Compute.prototype,"hasDependencies",{
	get: hasDependencies
});
canReflect.set(Compute.prototype, canSymbol.for("can.valueHasDependencies"), hasDependencies);



Compute.prototype.on = Compute.prototype.bind = Compute.prototype.addEventListener;
Compute.prototype.off = Compute.prototype.unbind = Compute.prototype.removeEventListener;




canReflect.set(Compute.prototype, canSymbol.for("can.onValue"), function(handler){
	var translationHandler = function(ev, newValue){
		handler(newValue);
	};
	singleReference.set(handler, this, translationHandler);

	this.addEventListener("change", translationHandler);
});

canReflect.set(Compute.prototype, canSymbol.for("can.offValue"), function(handler){
	this.removeEventListener("change", singleReference.getAndDelete(handler, this) );
});

canReflect.set(Compute.prototype, canSymbol.for("can.getValue"), Compute.prototype.get);
canReflect.set(Compute.prototype, canSymbol.for("can.setValue"), Compute.prototype.set);


// ### temporarilyBind
// Binds computes for a moment to cache their value and prevent re-calculating it.
Compute.temporarilyBind = Observation.temporarilyBind;

// ### async
// A simple helper that makes an async compute a bit easier.
Compute.async = function(initialValue, asyncComputer, context){
	return new Compute(initialValue, {
		fn: asyncComputer,
		context: context
	});
};


// ### truthy
// Wraps a compute with another compute that only changes when
// the wrapped compute's `truthiness` changes.
Compute.truthy = function(compute) {
	return new Compute(function() {
		var res = compute.get();
		if(typeof res === 'function') {
			res = res.get();
		}
		return !!res;
	});
};

canReflect.set(Compute.prototype, canSymbol.for("can.setValue"), Compute.prototype.set);
canReflect.set(Compute.prototype, canSymbol.for("can.isValueLike"), true);
canReflect.set(Compute.prototype, canSymbol.for("can.isMapLike"), false);
canReflect.set(Compute.prototype, canSymbol.for("can.isListLike"), false);

canReflect.set(Compute.prototype, canSymbol.for("can.valueHasDependencies"), function() {
	return !!this.observation;
});
canReflect.set(Compute.prototype, canSymbol.for("can.getValueDependencies"), function() {
	var ret;
	if(this.observation) {
		ret = {
			valueDependencies: new CIDSet()
		};
		ret.valueDependencies.add(this.observation);
	}
	return ret;
});

module.exports = exports = Compute;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getCID = __webpack_require__(7).get;
var helpers = __webpack_require__(67);

var CIDMap;

if(typeof Map !== "undefined") {
	CIDMap = Map;
} else {
	var CIDMap = function(){
		this.values = {};
	};
	CIDMap.prototype.set = function(key, value){
		this.values[getCID(key)] = {key: key, value: value};
	};
	CIDMap.prototype["delete"] = function(key){
		var has = getCID(key) in this.values;
		if(has) {
			delete this.values[getCID(key)];
		}
		return has;
	};
	CIDMap.prototype.forEach = function(cb, thisArg) {
		helpers.each(this.values, function(pair){
			return cb.call(thisArg || this, pair.value, pair.key, this);
		}, this);
	};
	CIDMap.prototype.has = function(key) {
		return getCID(key) in this.values;
	};
	CIDMap.prototype.get = function(key) {
		var obj = this.values[getCID(key)];
		return obj && obj.value;
	};
	CIDMap.prototype.clear = function() {
		return this.values = {};
	};
	Object.defineProperty(CIDMap.prototype,"size",{
		get: function(){
			var size = 0;
			helpers.each(this.values, function(){
				size++;
			});
			return size;
		}
	});
}

module.exports = CIDMap;


/***/ }),
/* 70 */
/***/ (function(module, exports) {

/**
 * @module {function} can-define-lazy-value
 * @parent can-js-utilities
 * @collection can-infrastructure
 * @package ./package.json
 * @signature `defineLazyValue(obj, prop, fn, writable)`
 *
 * Use Object.defineProperty to define properties whose values will be created lazily when they are first read.
 *
 * ```js
 * var _id = 1;
 * function getId() {
 *     return _id++;
 * }
 *
 * function MyObj(name) {
 *     this.name = name;
 * }
 *
 * defineLazyValue(MyObj.prototype, 'id', getId);
 *
 * var obj1 = new MyObj('obj1');
 * var obj2 = new MyObj('obj2');
 *
 * console.log( obj2 ); // -> { name: "obj2" }
 * console.log( obj1 ); // -> { name: "obj1" }
 *
 * // the first `id` read will get id `1`
 * console( obj2.id ); // -> 1
 * console( obj1.id ); // -> 2
 *
 * console.log( obj2 ); // -> { name: "obj2", id: 1 }
 * console.log( obj1 ); // -> { name: "obj1", id: 2 }
 *
 * ```
 *
 * @param {Object} object The object to add the property to.
 * @param {String} prop   The name of the property.
 * @param {Function} fn   A function to get the value the property should be set to.
 * @param {boolean} writable   Whether the field should be writable (false by default).
 */
module.exports = function defineLazyValue(obj, prop, initializer, writable) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		get: function() {
			// make the property writable
			Object.defineProperty(this, prop, {
				value: undefined,
				writable: true
			});

			// get the value from the initializer function
			var value = initializer.call(this, obj, prop);

			// redefine the property to the value property
			// and reset the writable flag
			Object.defineProperty(this, prop, {
				value: value,
				writable: !!writable
			});

			// return the value
			return value;
		},
		set: function(value){
			Object.defineProperty(this, prop, {
				value: value,
				writable: !!writable
			});

			return value;
		}
	});
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var namespace = __webpack_require__(2);
var dev = __webpack_require__(5);

/**
 * @module {{}} can-attribute-encoder can-attribute-encoder
 * @parent can-dom-utilities
 * @collection can-infrastructure
 * @package ./package.json
 *
 * Encode and decode attribute names.
 *
 * @option {Object} An object with the methods:
 * [can-attribute-encoder.encode] and [can-attribute-encoder.decode].
 *
 */


function each(items, callback){
	for ( var i = 0; i < items.length; i++ ) {
		callback(items[i], i);
	}
}

function makeMap(str){
	var obj = {}, items = str.split(",");
	each(items, function(name){
		obj[name] = true;
	});
	return obj;
}

// Attributes for which the case matters - shouldn’t be lowercased.
var caseMattersAttributes = makeMap("allowReorder,attributeName,attributeType,autoReverse,baseFrequency,baseProfile,calcMode,clipPathUnits,contentScriptType,contentStyleType,diffuseConstant,edgeMode,externalResourcesRequired,filterRes,filterUnits,glyphRef,gradientTransform,gradientUnits,kernelMatrix,kernelUnitLength,keyPoints,keySplines,keyTimes,lengthAdjust,limitingConeAngle,markerHeight,markerUnits,markerWidth,maskContentUnits,maskUnits,patternContentUnits,patternTransform,patternUnits,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,repeatCount,repeatDur,requiredExtensions,requiredFeatures,specularConstant,specularExponent,spreadMethod,startOffset,stdDeviation,stitchTiles,surfaceScale,systemLanguage,tableValues,textLength,viewBox,viewTarget,xChannelSelector,yChannelSelector");

function camelCaseToSpinalCase(match, lowerCaseChar, upperCaseChar) {
	return lowerCaseChar + "-" + upperCaseChar.toLowerCase();
}

function startsWith(allOfIt, startsWith) {
	return allOfIt.indexOf(startsWith) === 0;
}

function endsWith(allOfIt, endsWith) {
	return (allOfIt.length - allOfIt.indexOf(endsWith)) === endsWith.length;
}

var regexes = {
	leftParens: /\(/g,
	rightParens: /\)/g,
	leftBrace: /\{/g,
	rightBrace: /\}/g,
	camelCase: /([a-z])([A-Z])/g,
	forwardSlash: /\//g,
	space: /\s/g,
	uppercase: /[A-Z]/g,
	uppercaseDelimiterThenChar: /:u:([a-z])/g,
	caret: /\^/g,
	dollar: /\$/g,
	at: /@/g
};

var delimiters = {
	prependUppercase: ':u:',
	replaceSpace: ':s:',
	replaceForwardSlash: ':f:',
	replaceLeftParens: ':lp:',
	replaceRightParens: ':rp:',
	replaceLeftBrace: ':lb:',
	replaceRightBrace: ':rb:',
	replaceCaret: ':c:',
	replaceDollar: ':d:',
	replaceAt: ':at:'
};

var encoder = {};

/**
 * @function can-attribute-encoder.encode encode
 * @parent can-attribute-encoder
 * @description Encode an attribute name
 *
 * @signature `encoder.encode(attributeName)`
 *
 * Note: specific encoding may change, but encoded attributes
 * can always be decoded using [can-attribute-encoder.decode].
 *
 * @body
 *
 * ```js
 * var encodedAttributeName = encoder.encode("{(^$foo/bar baz)}");
 * div.setAttribute(encodedAttributeName, "attribute value");
 * ```
 *
 * @param {String} attributeName The attribute name.
 * @return {String} The encoded attribute name.
 *
 */
encoder.encode = function(name) {
	var encoded = name;

	// encode or convert camelCase attributes unless in list of attributes
	// where case matters
	if (!caseMattersAttributes[encoded] && encoded.match(regexes.camelCase)) {
		// encode uppercase characters in new bindings
		// - on:fooBar, fooBar:to, fooBar:from, fooBar:bind
		if (startsWith(encoded, 'on:') || endsWith(encoded, ':to') || endsWith(encoded, ':from') || endsWith(encoded, ':bind')) {
			encoded = encoded
				.replace(regexes.uppercase, function(char) {
					return delimiters.prependUppercase + char.toLowerCase();
				});
		} else {
			// convert uppercase characters in older bindings to kebab-case
			// - {fooBar}, (fooBar), {(fooBar)}
			encoded = encoded.replace(regexes.camelCase, camelCaseToSpinalCase);
			//!steal-remove-start
			dev.warn("can-attribute-encoder: Found attribute with name: " + name + ". Converting to: " + encoded + '.');
			//!steal-remove-end
		}
	}

	//encode spaces
	encoded = encoded.replace(regexes.space, delimiters.replaceSpace)
		//encode forward slashes
		.replace(regexes.forwardSlash, delimiters.replaceForwardSlash)
		// encode left parentheses
		.replace(regexes.leftParens, delimiters.replaceLeftParens)
		// encode right parentheses
		.replace(regexes.rightParens, delimiters.replaceRightParens)
		// encode left braces
		.replace(regexes.leftBrace, delimiters.replaceLeftBrace)
		// encode left braces
		.replace(regexes.rightBrace, delimiters.replaceRightBrace)
		// encode ^
		.replace(regexes.caret, delimiters.replaceCaret)
		// encode $
		.replace(regexes.dollar, delimiters.replaceDollar)
		// encode @
		.replace(regexes.at, delimiters.replaceAt);

	return encoded;
};

/**
 * @function can-attribute-encoder.decode decode
 * @parent can-attribute-encoder
 * @description Decode an attribute name encoded by [can-attribute-encoder.encode]
 * @signature `encoder.decode(attributeName)`
 *
 * @body
 *
 * ```js
 * encoder.decode(attributeName); // -> "{(^$foo/bar baz)}"
 *
 * ```
 *
 * @param {String} attributeName The encoded attribute name.
 * @return {String} The decoded attribute name.
 *
 */
encoder.decode = function(name) {
	var decoded = name;

	// decode left parentheses
	decoded = decoded.replace(delimiters.replaceLeftParens, '(')
		// decode right parentheses
		.replace(delimiters.replaceRightParens, ')')
		// decode left braces
		.replace(delimiters.replaceLeftBrace, '{')
		// decode left braces
		.replace(delimiters.replaceRightBrace, '}')
		// decode forward slashes
		.replace(delimiters.replaceForwardSlash, '/')
		// decode spaces
		.replace(delimiters.replaceSpace, ' ')
		// decode ^
		.replace(delimiters.replaceCaret, '^')
		//decode $
		.replace(delimiters.replaceDollar, '$')
		//decode @
		.replace(delimiters.replaceAt, '@');

	// decode uppercase characters in new bindings
	if (!caseMattersAttributes[decoded] && decoded.match(regexes.uppercaseDelimiterThenChar)) {
		if (startsWith(decoded, 'on:') || endsWith(decoded, ':to') || endsWith(decoded, ':from') || endsWith(decoded, ':bind')) {
			decoded = decoded
				.replace(regexes.uppercaseDelimiterThenChar, function(match, char) {
					return char.toUpperCase();
				});
		}
	}

	return decoded;
};

if (namespace.encoder) {
	throw new Error("You can't have two versions of can-attribute-encoder, check your dependencies");
} else {
	module.exports = namespace.encoder = encoder;
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var Observation = __webpack_require__(4);

var dev = __webpack_require__(21);
var getGlobal = __webpack_require__(135);
var domMutate = __webpack_require__(35);
var namespace = __webpack_require__(2);

//!steal-remove-start
var requestedAttributes = {};
//!steal-remove-end

var attr = function (attributeName, attrHandler) {
	if(attrHandler) {
		if (typeof attributeName === "string") {
			attributes[attributeName] = attrHandler;
			//!steal-remove-start
			if(requestedAttributes[attributeName]) {
				dev.warn("can-view-callbacks: " + attributeName+ " custom attribute behavior requested before it was defined.  Make sure "+attributeName+" is defined before it is needed.");
			}
			//!steal-remove-end
		} else {
			regExpAttributes.push({
				match: attributeName,
				handler: attrHandler
			});

			//!steal-remove-start
			Object.keys(requestedAttributes).forEach(function(requested){
				if(attributeName.test(requested)) {
					dev.warn("can-view-callbacks: " + requested+ " custom attribute behavior requested before it was defined.  Make sure "+attributeName+" is defined before it is needed.");
				}
			});
			//!steal-remove-end
		}
	} else {
		var cb = attributes[attributeName];
		if( !cb ) {

			for( var i = 0, len = regExpAttributes.length; i < len; i++) {
				var attrMatcher = regExpAttributes[i];
				if(attrMatcher.match.test(attributeName)) {
					return attrMatcher.handler;
				}
			}
		}
		//!steal-remove-start
		requestedAttributes[attributeName] = true;
		//!steal-remove-end
		
		return cb;
	}
};

var attributes = {},
	regExpAttributes = [],
	automaticCustomElementCharacters = /[-\:]/;
var defaultCallback = function () {};

var tag = function (tagName, tagHandler) {
	if(tagHandler) {
		var GLOBAL = getGlobal();

		//!steal-remove-start
		if (typeof tags[tagName.toLowerCase()] !== 'undefined') {
			dev.warn("Custom tag: " + tagName.toLowerCase() + " is already defined");
		}
		if (!automaticCustomElementCharacters.test(tagName) && tagName !== "content") {
			dev.warn("Custom tag: " + tagName.toLowerCase() + " hyphen missed");
		}
		//!steal-remove-end
		// if we have html5shiv ... re-generate
		if (GLOBAL.html5) {
			GLOBAL.html5.elements += " " + tagName;
			GLOBAL.html5.shivDocument();
		}

		tags[tagName.toLowerCase()] = tagHandler;
	} else {
		var cb;

		// if null is passed as tagHandler, remove tag
		if (tagHandler === null) {
			delete tags[tagName.toLowerCase()];
		} else {
			cb = tags[tagName.toLowerCase()];
		}

		if(!cb && automaticCustomElementCharacters.test(tagName)) {
			// empty callback for things that look like special tags
			cb = defaultCallback;
		}
		return cb;
	}

};
var tags = {};

var callbacks = {
	_tags: tags,
	_attributes: attributes,
	_regExpAttributes: regExpAttributes,
	defaultCallback: defaultCallback,
	tag: tag,
	attr: attr,
	// handles calling back a tag callback
	tagHandler: function(el, tagName, tagData){
		var helperTagCallback = tagData.options.get('tags.' + tagName,{proxyMethods: false}),
			tagCallback = helperTagCallback || tags[tagName];

		// If this was an element like <foo-bar> that doesn't have a component, just render its content
		var scope = tagData.scope,
			res;

		if(tagCallback) {
			res = Observation.ignore(tagCallback)(el, tagData);
		} else {
			res = scope;
		}

		//!steal-remove-start
		if (!tagCallback) {
			var GLOBAL = getGlobal();
			var ceConstructor = GLOBAL.document.createElement(tagName).constructor;
			// If not registered as a custom element, the browser will use default constructors
			if (ceConstructor === GLOBAL.HTMLElement || ceConstructor === GLOBAL.HTMLUnknownElement) {
				dev.warn('can-view-callbacks: No custom element found for ' + tagName);	
			}
		}
		//!steal-remove-end

		// If the tagCallback gave us something to render with, and there is content within that element
		// render it!
		if (res && tagData.subtemplate) {

			if (scope !== res) {
				scope = scope.add(res);
			}
			var result = tagData.subtemplate(scope, tagData.options);
			var frag = typeof result === "string" ? can.view.frag(result) : result;
			domMutate.appendChild.call(el, frag);
		}
	}
};

namespace.view = namespace.view || {};

if (namespace.view.callbacks) {
	throw new Error("You can't have two versions of can-view-callbacks, check your dependencies");
} else {
	module.exports = namespace.view.callbacks = callbacks;
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(17)();

/**
 * @module can-util/js/set-immediate/set-immediate set-immediate
 * @parent can-util/js
 * @signature `setImmediate(function())`
 * @param  {Function} cb
 *
 * Polyfill for setImmediate() if it doesn't exist in the global context
 */
module.exports = global.setImmediate || function (cb) {
	return setTimeout(cb, 0);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(child){
	return this.contains(child);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint maxdepth:7 */
/* jshint latedef:false */
var childNodes = __webpack_require__(18);
var domAttr = __webpack_require__(32);
var each = __webpack_require__(6);
var makeArray = __webpack_require__(15);
var getDocument = __webpack_require__(9);
var domMutate = __webpack_require__(35);
var namespace = __webpack_require__(2);
var MUTATION_OBSERVER = __webpack_require__(23);

// if an object or a function
// convert into what it should look like
// then the modification can happen in place
// but it has to have more than the current node
// blah!
var processNodes = function(nodes, paths, location, document){
	var frag = document.createDocumentFragment();

	for(var i = 0, len = nodes.length; i < len; i++) {
		var node = nodes[i];
		frag.appendChild( processNode(node,paths,location.concat(i), document) );
	}
	return frag;
},
	keepsTextNodes =  typeof document !== "undefined" && (function(){
		var testFrag = document.createDocumentFragment();
		var div = document.createElement("div");

		div.appendChild(document.createTextNode(""));
		div.appendChild(document.createTextNode(""));
		testFrag.appendChild(div);

		var cloned  = testFrag.cloneNode(true);

		return childNodes(cloned.firstChild).length === 2;
	})(),
	clonesWork = typeof document !== "undefined" && (function(){
		// Since html5shiv is required to support custom elements, assume cloning
		// works in any browser that doesn't have html5shiv

		// Clone an element containing a custom tag to see if the innerHTML is what we
		// expect it to be, or if not it probably was created outside of the document's
		// namespace.
		var el = document.createElement('a');
		el.innerHTML = "<xyz></xyz>";
		var clone = el.cloneNode(true);
		var works = clone.innerHTML === "<xyz></xyz>";
		var MO, observer;

		if(works) {
			// Cloning text nodes with dashes seems to create multiple nodes in IE11 when
			// MutationObservers of subtree modifications are used on the documentElement.
			// Since this is not what we expect we have to include detecting it here as well.
			el = document.createDocumentFragment();
			el.appendChild(document.createTextNode('foo-bar'));

			MO = MUTATION_OBSERVER();

			if (MO) {
				observer = new MO(function() {});
				observer.observe(document.documentElement, { childList: true, subtree: true });

				clone = el.cloneNode(true);

				observer.disconnect();
			} else {
				clone = el.cloneNode(true);
			}

			return clone.childNodes.length === 1;
		}

		return works;
	})(),
	namespacesWork = typeof document !== "undefined" && !!document.createElementNS;

/**
 * @function cloneNode
 * @hide
 *
 * A custom cloneNode function to be used in browsers that properly support cloning
 * of custom tags (IE8 for example). Fixes it by doing some manual cloning that
 * uses innerHTML instead, which has been shimmed.
 *
 * @param {DocumentFragment} frag A document fragment to clone
 * @return {DocumentFragment} a new fragment that is a clone of the provided argument
 */
var cloneNode = clonesWork ?
	function(el){
		return el.cloneNode(true);
	} :
	function(node){
		var document = node.ownerDocument;
		var copy;

		if(node.nodeType === 1) {
			if(node.namespaceURI !== 'http://www.w3.org/1999/xhtml' && namespacesWork && document.createElementNS) {
				copy = document.createElementNS(node.namespaceURI, node.nodeName);
			}
			else {
				copy = document.createElement(node.nodeName);
			}
		} else if(node.nodeType === 3){
			copy = document.createTextNode(node.nodeValue);
		} else if(node.nodeType === 8) {
			copy = document.createComment(node.nodeValue);
		} else if(node.nodeType === 11) {
			copy = document.createDocumentFragment();
		}

		if(node.attributes) {
			var attributes = makeArray(node.attributes);
			each(attributes, function (node) {
				if(node && node.specified) {
					domAttr.setAttribute(copy, node.nodeName || node.name, node.nodeValue || node.value);
				}
			});
		}

		if(node && node.firstChild) {
			var child = node.firstChild;

			while(child) {
				copy.appendChild( cloneNode(child) );
				child = child.nextSibling;
			}
		}

		return copy;
	};

function processNode(node, paths, location, document){
	var callback,
		loc = location,
		nodeType = typeof node,
		el,
		p,
		i , len;
	var getCallback = function(){
		if(!callback) {
			callback  = {
				path: location,
				callbacks: []
			};
			paths.push(callback);
			loc = [];
		}
		return callback;
	};

	if(nodeType === "object") {
		if( node.tag ) {
			if(namespacesWork && node.namespace) {
				el = document.createElementNS(node.namespace, node.tag);
			} else {
				el = document.createElement(node.tag);
			}

			if(node.attrs) {
				for(var attrName in node.attrs) {
					var value = node.attrs[attrName];
					if(typeof value === "function"){
						getCallback().callbacks.push({
							callback:  value
						});
					} else  {
						domAttr.setAttribute(el, attrName, value);
					}
				}
			}
			if(node.attributes) {
				for(i = 0, len = node.attributes.length; i < len; i++ ) {
					getCallback().callbacks.push({callback: node.attributes[i]});
				}
			}
			if(node.children && node.children.length) {
				// add paths
				if(callback) {
					p = callback.paths = [];
				} else {
					p = paths;
				}

				el.appendChild( processNodes(node.children, p, loc, document) );
			}
		} else if(node.comment) {
			el = document.createComment(node.comment);

			if(node.callbacks) {
				for(i = 0, len = node.attributes.length; i < len; i++ ) {
					getCallback().callbacks.push({callback: node.callbacks[i]});
				}
			}
		}


	} else if(nodeType === "string"){

		el = document.createTextNode(node);

	} else if(nodeType === "function") {

		if(keepsTextNodes) {
			el = document.createTextNode("");
			getCallback().callbacks.push({
				callback: node
			});
		} else {
			el = document.createComment("~");
			getCallback().callbacks.push({
				callback: function(){
					var el = document.createTextNode("");
					domMutate.replaceChild.call(this.parentNode, el, this);
					return node.apply(el,arguments );
				}
			});
		}

	}
	return el;
}

function getCallbacks(el, pathData, elementCallbacks){
	var path = pathData.path,
		callbacks = pathData.callbacks,
		paths = pathData.paths,
		child = el,
		pathLength = path ? path.length : 0,
		pathsLength = paths ? paths.length : 0;

	for(var i = 0; i < pathLength; i++) {
		child = child.childNodes.item(path[i]);
	}

	for( i= 0 ; i < pathsLength; i++) {
		getCallbacks(child, paths[i], elementCallbacks);
	}

	elementCallbacks.push({element: child, callbacks: callbacks});
}

function hydrateCallbacks(callbacks, args) {
	var len = callbacks.length,
		callbacksLength,
		callbackElement,
		callbackData;

	for(var i = 0; i < len; i++) {
		callbackData = callbacks[i];
		callbacksLength = callbackData.callbacks.length;
		callbackElement = callbackData.element;
		for(var c = 0; c < callbacksLength; c++) {
			callbackData.callbacks[c].callback.apply(callbackElement, args);
		}
	}
}

function makeTarget(nodes, doc){
	var paths = [];
	var frag = processNodes(nodes, paths, [], doc || getDocument());
	return {
		paths: paths,
		clone: frag,
		hydrate: function(){
			var cloned = cloneNode(this.clone);
			var args = makeArray(arguments);

			var callbacks = [];
			for(var i = 0; i < paths.length; i++) {
				getCallbacks(cloned, paths[i], callbacks);
			}
			hydrateCallbacks(callbacks, args);

			return cloned;
		}
	};
}
makeTarget.keepsTextNodes = keepsTextNodes;
makeTarget.cloneNode = cloneNode;

namespace.view = namespace.view || {};
module.exports = namespace.view.target = makeTarget;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = [].slice;
// a b c
// a b c d
// [[2,0, d]]

var defaultIdentity = function(a, b){ return a === b; };

function reverseDiff(oldDiffStopIndex, newDiffStopIndex, oldList, newList, identity) {
	var oldIndex = oldList.length - 1,
		newIndex =  newList.length - 1;

	while( oldIndex > oldDiffStopIndex && newIndex > newDiffStopIndex) {
		var oldItem = oldList[oldIndex],
			newItem = newList[newIndex];

		if( identity( oldItem, newItem ) ) {
			oldIndex--;
			newIndex--;
			continue;
		} else {
			// use newIndex because it reflects any deletions
			return [{
				index: newDiffStopIndex,
			 	deleteCount: (oldIndex-oldDiffStopIndex+1),
			 	insert: slice.call(newList, newDiffStopIndex,newIndex+1)
			}];
		}
	}
	// if we've reached of either the new or old list
	// we simply return
	return [{
		index: newDiffStopIndex,
		deleteCount: (oldIndex-oldDiffStopIndex+1),
		insert: slice.call(newList, newDiffStopIndex,newIndex+1)
	}];

}

/**
 * @module {function} can-util/js/diff/diff diff
 * @parent can-util/js
 * @signature `diff( oldList, newList, [identity] )`
 *
 * @param  {ArrayLike} oldList the array to diff from
 * @param  {ArrayLike} newList the array to diff to
 * @param  {function} identity an optional identity function for comparing elements
 * @return {Array}     a list of Patch objects representing the differences
 *
 * Returns the difference between two ArrayLike objects (that have nonnegative
 * integer keys and the `length` property) as an array of patch objects.
 *
 * A patch object returned by this function has the following properties:
 * - **index**:  the index of newList where the patch begins
 * - **deleteCount**: the number of items deleted from that index in newList
 * - **insert**: an Array of items newly inserted at that index in newList
 *
 * ```js
 * var diff = require("can-util/js/diff/diff");
 *
 * console.log(diff([1], [1, 2])); // -> [{index: 1, deleteCount: 0, insert: [2]}]
 * console.log(diff([1, 2], [1])); // -> [{index: 1, deleteCount: 1, insert: []}]
 *
 * // with an optional identity function:
 * diff(
 *     [{id:1},{id:2}],
 *     [{id:1},{id:3}],
 *     (a,b) => a.id === b.id
 * ); // -> [{index: 1, deleteCount: 1, insert: [{id:3}]}]
 * ```
 */

// TODO: update for a better type reference. E.g.:
//    @typdef {function(*,*)} can-util/diff/diff/typedefs.identity identify(a, b)
//
//    @param {*} a This is something.
//    @param {can-util/diff/diff/typedefs.identity} identity(a, b)
//    @option {*} a

module.exports = exports = function(oldList, newList, identity){
	identity = identity || defaultIdentity;

	var oldIndex = 0,
		newIndex =  0,
		oldLength = oldList.length,
		newLength = newList.length,
		patches = [];

	while(oldIndex < oldLength && newIndex < newLength) {
		var oldItem = oldList[oldIndex],
			newItem = newList[newIndex];

		if( identity( oldItem, newItem ) ) {
			oldIndex++;
			newIndex++;
			continue;
		}
		// look for single insert, does the next newList item equal the current oldList.
		// 1 2 3
		// 1 2 4 3
		if(  newIndex+1 < newLength && identity( oldItem, newList[newIndex+1] ) ) {
			patches.push({index: newIndex, deleteCount: 0, insert: [ newList[newIndex] ]});
			oldIndex++;
			newIndex += 2;
			continue;
		}
		// look for single removal, does the next item in the oldList equal the current newList item.
		// 1 2 3
		// 1 3
		else if( oldIndex+1 < oldLength  && identity( oldList[oldIndex+1], newItem ) ) {
			patches.push({index: newIndex, deleteCount: 1, insert: []});
			oldIndex += 2;
			newIndex++;
			continue;
		}
		// just clean up the rest and exit
		// 1 2 3
		// 1 2 5 6 7
		else {
			// iterate backwards to `newIndex`
			// "a", "b", "c", "d", "e"
			// "a", "x", "y", "z", "e"
			// -> {}
			patches.push.apply(patches, reverseDiff(oldIndex, newIndex , oldList, newList, identity) );


			return patches;
		}
	}
	if( (newIndex === newLength) && (oldIndex === oldLength) ) {
		return patches;
	}
	// a b
	// a b c d e
	patches.push(
				{index: newIndex,
				 deleteCount: oldLength-oldIndex,
				 insert: slice.call(newList, newIndex) } );

	return patches;
};




// a b c
// a d e b c


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This sets up an inserted event to work through mutation observers if
// mutation observers are present.  If they aren't you have to use
// the mutate methods.
var events = __webpack_require__(13);
var domData = __webpack_require__(22);
var getMutationObserver = __webpack_require__(23);
var domDispatch = __webpack_require__(30);
var mutationDocument = __webpack_require__(65);
var getDocument = __webpack_require__(9);
var CIDMap = __webpack_require__(69);
var string = __webpack_require__(41);

__webpack_require__(50);

/**
 * @module {Function} can-util/dom/events/make-mutation-event/make-mutation-event makeMutationEvent
 * @parent can-util/dom/events/events
 *
 * @signature `makeMutationEvent(specialEventName, mutationNodesProperty)`
 *
 * @param {String} specialEventName the event to handle as a mutation observer-based event
 * @param {String} mutationNodesProperty the property of interest in a DOM mutation
 *
 * This function provides a simple interface to bind the DOM events interface to the mutation
 * observer interface, by firing an event when a matching mutation is generated by the client
 */
module.exports = function(specialEventName, mutationNodesProperty){
	var originalAdd = events.addEventListener,
		originalRemove = events.removeEventListener;

	events.addEventListener = function(eventName){
		// on an inserted event
		// if it's the first inserted event, we'll register a handler to the
		// mutationDocument singleton.  This will take nodes that are added
		// and fire add / remove events.
		if(eventName === specialEventName && getMutationObserver()) {
			var documentElement = getDocument().documentElement;
			var specialEventData = domData.get.call(documentElement,specialEventName+"Data");
			if(!specialEventData) {
				specialEventData = {
					handler: function(mutatedNode){
						// keeps track of elements that have already been checked
						// so we don't double check (a parent and then a child added to the parent)
						if(specialEventData.nodeIdsRespondingToInsert.has(mutatedNode)) {
							domDispatch.call(mutatedNode, specialEventName, [], false);
							specialEventData.nodeIdsRespondingToInsert.delete(mutatedNode);
						}
					},
					nodeIdsRespondingToInsert: new CIDMap()
				};
				mutationDocument["on" + string.capitalize(mutationNodesProperty)](specialEventData.handler);
				domData.set.call(documentElement, specialEventName+"Data", specialEventData);
			}

			if(this.nodeType !== 11) {
				// count the number of handlers for this event
				var count = specialEventData.nodeIdsRespondingToInsert.get(this) || 0;
				specialEventData.nodeIdsRespondingToInsert.set(this, count + 1);
			}
		}
		return originalAdd.apply(this, arguments);

	};

	events.removeEventListener = function(eventName){
		if(eventName === specialEventName && getMutationObserver() ) {
			var documentElement = getDocument().documentElement;
			var specialEventData = domData.get.call(documentElement, specialEventName+"Data");
			if(specialEventData) {
				var newCount = specialEventData.nodeIdsRespondingToInsert.get(this) - 1;

				// if there is still at least one handler for this event, update the count
				// otherwise remove this element from the CIDMap
				if (newCount) {
					specialEventData.nodeIdsRespondingToInsert.set(this, newCount);
				} else {
					specialEventData.nodeIdsRespondingToInsert.delete(this);
				}

				if(!specialEventData.nodeIdsRespondingToInsert.size) {
					mutationDocument["off" + string.capitalize(mutationNodesProperty)](specialEventData.handler);
					domData.clean.call(documentElement, specialEventName+"Data");
				}
			}
		}
		return originalRemove.apply(this, arguments);
	};
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// ## Expression Types
//
// These expression types return a value. They are assembled by `expression.parse`.
var Arg = __webpack_require__(79);
var Literal = __webpack_require__(54);
var Hashes = __webpack_require__(55);
var Bracket = __webpack_require__(150);
var Call = __webpack_require__(151);
var ScopeLookup = __webpack_require__(152);
var Helper = __webpack_require__(158);
var Lookup = __webpack_require__(37);
var HelperLookup = __webpack_require__(159);
var HelperScopeLookup = __webpack_require__(160);

var SetIdentifier = __webpack_require__(80);
var expressionHelpers = __webpack_require__(14);
var utils = __webpack_require__(19);
var each = __webpack_require__(6);
var assign = __webpack_require__(3);
var last = __webpack_require__(33);
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);

// A placeholder. This isn't actually used.
var Hash = function(){ }; // jshint ignore:line

// NAME - \w
// KEY - foo, foo.bar, foo@bar, %foo (special), &foo (references), ../foo, ./foo
// ARG - ~KEY, KEY, CALLEXPRESSION, PRIMITIVE
// CALLEXPRESSION = KEY(ARG,ARG, NAME=ARG)
// HELPEREXPRESSION = KEY ARG ARG NAME=ARG
// DOT .NAME
// AT @NAME
//
var keyRegExp = /[\w\.\\\-_@\/\&%]+/,
	tokensRegExp = /('.*?'|".*?"|=|[\w\.\\\-_@\/*%\$]+|[\(\)]|,|\~|\[|\]\s*|\s*(?=\[))/g,
	bracketSpaceRegExp = /\]\s+/,
	literalRegExp = /^('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)$/;

var isTokenKey = function(token){
	return keyRegExp.test(token);
};

var testDot = /^[\.@]\w/;
var isAddingToExpression = function(token) {

	return isTokenKey(token) && testDot.test(token);
};

var ensureChildren = function(type) {
	if(!type.children) {
		type.children = [];
	}
	return type;
};

var Stack = function(){

	this.root = {children: [], type: "Root"};
	this.current = this.root;
	this.stack = [this.root];
};
assign(Stack.prototype,{
	top: function(){
		return last(this.stack);
	},
	isRootTop: function(){
		return this.top() === this.root;
	},
	popTo: function(types){
		this.popUntil(types);
		this.pop();
	},
	pop: function() {
		if(!this.isRootTop()) {
			this.stack.pop();
		}
	},
	first: function(types){
		var curIndex = this.stack.length - 1;
		while( curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1 ) {
			curIndex--;
		}
		return this.stack[curIndex];
	},
	firstParent: function(types){
		var curIndex = this.stack.length - 2;
		while( curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1 ) {
			curIndex--;
		}
		return this.stack[curIndex];
	},
	popUntil: function(types){
		while( types.indexOf(this.top().type) === -1 && !this.isRootTop() ) {
			this.stack.pop();
		}
		return this.top();
	},
	addTo: function(types, type){
		var cur = this.popUntil(types);
		ensureChildren(cur).children.push(type);
	},
	addToAndPush: function(types, type){
		this.addTo(types, type);
		this.stack.push(type);
	},
	push: function(type) {
		this.stack.push(type);
	},
	topLastChild: function(){
		return last(this.top().children);
	},
	replaceTopLastChild: function(type){
		var children = ensureChildren(this.top()).children;
		children.pop();
		children.push(type);
		return type;
	},
	replaceTopLastChildAndPush: function(type) {
		this.replaceTopLastChild(type);
		this.stack.push(type);
	},
	replaceTopAndPush: function(type){
		var children;
		if(this.top() === this.root) {
			children = ensureChildren(this.top()).children;
		} else {
			this.stack.pop();
			// get parent and clean
			children = ensureChildren(this.top()).children;
		}

		children.pop();
		children.push(type);
		this.stack.push(type);
		return type;
	}
});

// converts
// - "../foo" -> "../@foo",
// - "foo" -> "@foo",
// - ".foo" -> "@foo",
// - "./foo" -> "./@foo"
// - "foo.bar" -> "foo@bar"
var convertKeyToLookup = function(key){
	var lastPath = key.lastIndexOf("./");
	var lastDot = key.lastIndexOf(".");
	if(lastDot > lastPath) {
		return key.substr(0, lastDot)+"@"+key.substr(lastDot+1);
	}
	var firstNonPathCharIndex = lastPath === -1 ? 0 : lastPath+2;
	var firstNonPathChar = key.charAt(firstNonPathCharIndex);
	if(firstNonPathChar === "." || firstNonPathChar === "@" ) {
		return key.substr(0, firstNonPathCharIndex)+"@"+key.substr(firstNonPathCharIndex+1);
	} else {
		return key.substr(0, firstNonPathCharIndex)+"@"+key.substr(firstNonPathCharIndex);
	}
};
var convertToAtLookup = function(ast){
	if(ast.type === "Lookup") {
		ast.key = convertKeyToLookup(ast.key);
	}
	return ast;
};

var convertToHelperIfTopIsLookup = function(stack){
	var top = stack.top();
	// if two scopes, that means a helper
	if(top && top.type === "Lookup") {

		var base = stack.stack[stack.stack.length - 2];
		// That lookup shouldn't be part of a Helper already or
		if(base.type !== "Helper" && base) {
			stack.replaceTopAndPush({
				type: "Helper",
				method: top
			});
		}
	}
};

var expression = {
	toComputeOrValue: expressionHelpers.toComputeOrValue,
	convertKeyToLookup: convertKeyToLookup,

	Literal: Literal,
	Lookup: Lookup,
	ScopeLookup: ScopeLookup,
	Arg: Arg,
	Hash: Hash,
	Hashes: Hashes,
	Call: Call,
	Helper: Helper,
	HelperLookup: HelperLookup,
	HelperScopeLookup: HelperScopeLookup,
	Bracket: Bracket,

	SetIdentifier: SetIdentifier,
	tokenize: function(expression){
		var tokens = [];
		(expression.trim() + ' ').replace(tokensRegExp, function (whole, arg) {
			if (bracketSpaceRegExp.test(arg)) {
				tokens.push(arg[0]);
				tokens.push(arg.slice(1));
			} else {
				tokens.push(arg);
			}
		});
		return tokens;
	},
	lookupRules: {
		"default": function(ast, methodType, isArg){
			var name = (methodType === "Helper" && !ast.root ? "Helper" : "")+(isArg ? "Scope" : "")+"Lookup";
			return expression[name];
		},
		"method": function(ast, methodType, isArg){
			return ScopeLookup;
		}
	},
	methodRules: {
		"default": function(ast){

			return ast.type === "Call" ? Call : Helper;
		},
		"call": function(ast){
			return Call;
		}
	},
	// ## expression.parse
	//
	// - {String} expressionString - A stache expression like "abc foo()"
	// - {Object} options
	//   - baseMethodType - Treat this like a Helper or Call.  Default to "Helper"
	//   - lookupRule - "default" or "method"
	//   - methodRule - "default" or "call"
	parse: function(expressionString, options){
		options =  options || {};
		var ast = this.ast(expressionString);

		if(!options.lookupRule) {
			options.lookupRule = "default";
		}
		if(typeof options.lookupRule === "string") {
			options.lookupRule = expression.lookupRules[options.lookupRule];
		}
		if(!options.methodRule) {
			options.methodRule = "default";
		}
		if(typeof options.methodRule === "string") {
			options.methodRule = expression.methodRules[options.methodRule];
		}

		var expr = this.hydrateAst(ast, options, options.baseMethodType || "Helper");

		return expr;
	},
	hydrateAst: function(ast, options, methodType, isArg){
		var hashes;
		if(ast.type === "Lookup") {
			var lookup = new (options.lookupRule(ast, methodType, isArg))(ast.key, ast.root && this.hydrateAst(ast.root, options, methodType) );
			//!steal-remove-start
			canReflect.setKeyValue(lookup, canSymbol.for("can-stache.originalKey"), ast[canSymbol.for("can-stache.originalKey")]);
			//!steal-remove-end
			return lookup;
		}
		else if(ast.type === "Literal") {
			return new Literal(ast.value);
		}
		else if(ast.type === "Arg") {
			return new Arg(this.hydrateAst(ast.children[0], options, methodType, isArg),{compute: true});
		}
		else if(ast.type === "Hash") {
			throw new Error("");
		}
		else if(ast.type === "Hashes") {
			hashes = {};
			each(ast.children, function(hash){
				hashes[hash.prop] = this.hydrateAst( hash.children[0], options, methodType, true );
			}, this);
			return new Hashes(hashes);
		}
		else if(ast.type === "Call" || ast.type === "Helper") {
			//get all arguments and hashes
			hashes = {};
			var args = [],
				children = ast.children,
				ExpressionType = options.methodRule(ast);
			if(children) {
				for(var i = 0 ; i <children.length; i++) {
					var child = children[i];
					if(child.type === "Hashes" && ast.type === "Helper" &&
						(ExpressionType !== Call)) {

						each(child.children, function(hash){
							hashes[hash.prop] = this.hydrateAst( hash.children[0], options, ast.type, true );
						}, this);

					} else {
						args.push( this.hydrateAst(child, options, ast.type, true) );
					}
				}
			}


			return new ExpressionType(this.hydrateAst(ast.method, options, ast.type),
																args, hashes);
		} else if (ast.type === "Bracket") {
			var originalKey;
			//!steal-remove-start
			originalKey = ast[canSymbol.for("can-stache.originalKey")]
			//!steal-remove-end
			return new Bracket(
				this.hydrateAst(ast.children[0], options),
				ast.root ? this.hydrateAst(ast.root, options) : undefined,
				originalKey
			);
		}
	},
	ast: function(expression){
		var tokens = this.tokenize(expression);
		return this.parseAst(tokens, {
			index: 0
		});
	},
	parseAst: function(tokens, cursor) {
		var stack = new Stack(),
			top,
			firstParent,
			lastToken;

		while(cursor.index < tokens.length) {
			var token = tokens[cursor.index],
				nextToken = tokens[cursor.index+1];

			cursor.index++;

			// Hash
			if(nextToken === "=") {
				//convertToHelperIfTopIsLookup(stack);
				top = stack.top();

				// If top is a Lookup, we might need to convert to a helper.
				if(top && top.type === "Lookup") {
					// Check if current Lookup is part of a Call, Helper, or Hash
					// If it happens to be first within a Call or Root, that means
					// this is helper syntax.
					firstParent = stack.firstParent(["Call","Helper","Hash"]);
					if(firstParent.type === "Call" || firstParent.type === "Root") {

						stack.popUntil(["Call"]);
						top = stack.top();
						stack.replaceTopAndPush({
							type: "Helper",
							method: top.type === "Root" ? last(top.children) : top
						});

					}
				}
				firstParent = stack.firstParent(["Call","Helper","Hashes"]);
				// makes sure we are adding to Hashes if there already is one
				// otherwise we create one.
				var hash = {type: "Hash", prop: token};
				if(firstParent.type === "Hashes") {
					stack.addToAndPush(["Hashes"], hash);
				} else {
					stack.addToAndPush(["Helper", "Call"], {
						type: "Hashes",
						children: [hash]
					});
					stack.push(hash);
				}
				cursor.index++;

			}
			// Literal
			else if(literalRegExp.test( token )) {
				convertToHelperIfTopIsLookup(stack);
				// only add to hash if there's not already a child.
				firstParent = stack.first(["Helper", "Call", "Hash", "Bracket"]);
				if(firstParent.type === "Hash" && (firstParent.children && firstParent.children.length > 0)) {
					stack.addTo(["Helper", "Call", "Bracket"], {type: "Literal", value: utils.jsonParse( token )});
				} else if(firstParent.type === "Bracket" && (firstParent.children && firstParent.children.length > 0)) {
					stack.addTo(["Helper", "Call", "Hash"], {type: "Literal", value: utils.jsonParse( token )});
				} else {
					stack.addTo(["Helper", "Call", "Hash", "Bracket"], {type: "Literal", value: utils.jsonParse( token )});
				}

			}
			// Lookup
			else if(keyRegExp.test(token)) {
				lastToken = stack.topLastChild();
				firstParent = stack.first(["Helper", "Call", "Hash", "Bracket"]);

				// if we had `foo().bar`, we need to change to a Lookup that looks up from lastToken.
				if(lastToken && (lastToken.type === "Call" || lastToken.type === "Bracket" ) && isAddingToExpression(token)) {
					stack.replaceTopLastChildAndPush({
						type: "Lookup",
						root: lastToken,
						key: token.slice(1) // remove leading `.`
					});
				}
				else if(firstParent.type === 'Bracket') {
					// a Bracket expression without children means we have
					// parsed `foo[` of an expression like `foo[bar]`
					// so we know to add the Lookup as a child of the Bracket expression
					if (!(firstParent.children && firstParent.children.length > 0)) {
						stack.addToAndPush(["Bracket"], {type: "Lookup", key: token});
					} else {
						// check if we are adding to a helper like `eq foo[bar] baz`
						// but not at the `.baz` of `eq foo[bar].baz xyz`
						if(stack.first(["Helper", "Call", "Hash", "Arg"]).type === 'Helper' && token[0] !== '.') {
							stack.addToAndPush(["Helper"], {type: "Lookup", key: token});
						} else {
							// otherwise, handle the `.baz` in expressions like `foo[bar].baz`
							stack.replaceTopAndPush({
								type: "Lookup",
								key: token.slice(1),
								root: firstParent
							});
						}
					}
				}
				else {
					// if two scopes, that means a helper
					convertToHelperIfTopIsLookup(stack);

					stack.addToAndPush(["Helper", "Call", "Hash", "Arg", "Bracket"], {type: "Lookup", key: token});
				}

			}
			// Arg
			else if(token === "~") {
				convertToHelperIfTopIsLookup(stack);
				stack.addToAndPush(["Helper", "Call", "Hash"], {type: "Arg", key: token});
			}
			// Call
			// foo[bar()]
			else if(token === "(") {
				top = stack.top();
				if(top.type === "Lookup") {
					//!steal-remove-start
					//This line is just for matching stache magic tags elsewhere,
					// because convertToAtLookup modifies the original key
					canReflect.setKeyValue(top, canSymbol.for("can-stache.originalKey"), top.key);
					//!steal-remove-end
					stack.replaceTopAndPush({
						type: "Call",
						method: convertToAtLookup(top)
					});
				} else {
					throw new Error("Unable to understand expression "+tokens.join(''));
				}
			}
			// End Call
			else if(token === ")") {
				stack.popTo(["Call"]);
			}
			// End Call argument
			else if(token === ",") {
				stack.popUntil(["Call"]);
			}
			// Bracket
			else if(token === "[") {
				top = stack.top();
				lastToken = stack.topLastChild();

				if (lastToken && (lastToken.type === "Call" || lastToken.type === "Bracket"  )  ) {
					stack.replaceTopAndPush({type: "Bracket", root: lastToken});
				} else if (top.type === "Lookup" || top.type === "Bracket") {
					var bracket = {type: "Bracket", root: top};
					//!steal-remove-start
					canReflect.setKeyValue(bracket, canSymbol.for("can-stache.originalKey"), top.key);
					//!steal-remove-end
					stack.replaceTopAndPush(bracket);
				} else if (top.type === "Call") {
					stack.addToAndPush(["Call"], { type: "Bracket" });
				} else if (top === " ") {
					stack.popUntil(["Lookup"]);
					convertToHelperIfTopIsLookup(stack);
					stack.addToAndPush(["Helper", "Call", "Hash"], {type: "Bracket"});
				} else {
					stack.replaceTopAndPush({type: "Bracket"});
				}
			}
			// End Bracket
			else if(token === "]") {
				stack.pop();
			}
			else if(token === " ") {
				stack.push(token);
			}
		}
		return stack.root.children[0];
	}
};

module.exports = expression;


/***/ }),
/* 79 */
/***/ (function(module, exports) {

// ### Arg
// `new Arg(Expression [,modifierOptions] )`
// Used to identify an expression that should return a value.
var Arg = function(expression, modifiers){
	this.expr = expression;
	this.modifiers = modifiers || {};
	this.isCompute = false;
};
Arg.prototype.value = function(){
	return this.expr.value.apply(this.expr, arguments);
};

module.exports = Arg;


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = function SetIdentifier(value){
    this.value = value;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var expressionHelpers = __webpack_require__(14);
var mustacheHelpers = __webpack_require__(38);

// Looks up a value in the scope, and if it is `undefined`, looks up
// the value as a helper.
function lookupValueOrHelper(key, scope, helperOptions, readOptions){
    var scopeKeyData = expressionHelpers.getObservableValue_fromKey(key, scope, readOptions);
    var result = {value: scopeKeyData};

    if(key.charAt(0) === "@" && key !== "@index") {
        key = key.substr(1);
    }
    
    // If it doesn't look like a helper and there is no value, check helpers
    // anyway. This is for when foo is a helper in `{{foo}}`.
    if(scopeKeyData.initialValue === undefined || mustacheHelpers.helpers[key]) {
        var helper = mustacheHelpers.getHelper(key, helperOptions);
        result.helper = helper;
    }
    return result;
}

module.exports = lookupValueOrHelper;


/***/ }),
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
(function webpackMissingModule() { throw new Error("Cannot find module \"bundle.js\""); }());


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// require can.js modules

var DefineMap = __webpack_require__(111),
	stache = __webpack_require__(134),

	data = new DefineMap({message: "Hello World"}),
	template = stache(__webpack_require__(165));

	document.body.appendChild(template(data));

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var Construct = __webpack_require__(57);
var define = __webpack_require__(62);
var defineHelpers = __webpack_require__(133);
var Observation = __webpack_require__(4);
var types = __webpack_require__(25);
var canBatch = __webpack_require__(12);
var ns = __webpack_require__(2);
var canLog = __webpack_require__(47);
var canLogDev = __webpack_require__(5);
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);
var CIDSet = __webpack_require__(48);
var CIDMap = __webpack_require__(34);

var keysForDefinition = function(definitions) {
	var keys = [];
	for(var prop in definitions) {
		var definition = definitions[prop];
		if(typeof definition !== "object" || ("serialize" in definition ? !!definition.serialize : !definition.get)) {
			keys.push(prop);
		}
	}
	return keys;
};

function assign(source) {
	canBatch.start();
	canReflect.assignMap(this, source || {});
	canBatch.stop();
}
function update(source) {
	canBatch.start();
	canReflect.updateMap(this, source || {});
	canBatch.stop();
}
function assignDeep(source){
	canBatch.start();
	// TODO: we should probably just throw an error instead of cleaning
	canReflect.assignDeepMap(this, source || {});
	canBatch.stop();
}
function updateDeep(source){
	canBatch.start();
	// TODO: we should probably just throw an error instead of cleaning
	canReflect.updateDeepMap(this, source || {});
	canBatch.stop();
}
function setKeyValue(key, value) {
	var defined = defineHelpers.defineExpando(this, key, value);
	if(!defined) {
		this[key] = value;
	}
}
function getKeyValue(key) {
	var value = this[key];
	if(value !== undefined || key in this || Object.isSealed(this)) {
		return value;
	} else {
		Observation.add(this, key);
		return this[key];
	}
}
var DefineMap = Construct.extend("DefineMap",{
	setup: function(base){
		var key,
			prototype = this.prototype;
		if(DefineMap) {
			// we have already created
			define(prototype, prototype, base.prototype._define);
			for(key in DefineMap.prototype) {
				define.defineConfigurableAndNotEnumerable(prototype, key, prototype[key]);
			}

			this.prototype.setup = function(props){
				define.setup.call(
					this,
					props || {},
					this.constructor.seal
				);
			};
		} else {
			for(key in prototype) {
				define.defineConfigurableAndNotEnumerable(prototype, key, prototype[key]);
			}
		}
		define.defineConfigurableAndNotEnumerable(prototype, "constructor", this);
	}
},{
	// setup for only dynamic DefineMap instances
	setup: function(props, sealed){
		if(!this._define) {
			Object.defineProperty(this,"_define",{
				enumerable: false,
				value: {
					definitions: {}
				}
			});
			Object.defineProperty(this,"_data",{
				enumerable: false,
				value: {}
			});
		}
		define.setup.call(
			this,
			props || {},
			sealed === true
		);
	},
	/**
	 * @function can-define/map/map.prototype.get get
	 * @parent can-define/map/map.prototype
	 *
	 * @description Get a value or all values from a DefineMap.
	 *
	 * @signature `map.get()`
	 *
	 * Returns a plain JavaScript object that contains the properties and values of the map instance.  Any property values
	 * that also have a `get` method will have their `get` method called and the resulting value will be used as
	 * the property value.  This can be used to recursively convert a map instance to an object of other plain
	 * JavaScript objects.  Cycles are supported and only create one object.
	 *
	 * `.get()` can still return other non plain JS objects like Date.
	 * Use [can-define/map/map.prototype.serialize] when a form proper for `JSON.stringify` is needed.
	 *
	 * ```js
	 * var map = new DefineMap({foo: new DefineMap({bar: "zed"})});
	 * map.get() //-> {foo: {bar: "zed"}};
	 * ```
	 *
	 *   @return {Object} A plain JavaScript `Object` that contains all the properties and values of the map instance.
	 *
	 * @signature `map.get(propName)`
	 *
	 * Get a single property on a DefineMap instance.
	 *
	 * `.get(propName)` only should be used when reading properties that might not have been defined yet, but
	 * will be later via [can-define/map/map.prototype.set].
	 *
	 * ```js
	 * var map = new DefineMap();
	 * map.get("name") //-> undefined;
	 * ```
	 *
	 *   @param {String} propName The property name of a property that may not have been defined yet.
	 *   @return {*} The value of that property.
	 */
	get: function(prop){
		if(prop) {
			return getKeyValue.call(this, prop);
		} else {
			return canReflect.unwrap(this, CIDMap);
		}
	},
	/**
	 * @function can-define/map/map.prototype.set set
	 * @parent can-define/map/map.prototype
	 *
	 * @deprecated {3.10.1} Using .set with {Object} `props` has been deprecated in favour of `assign` and `update`
	 *
	 * @description Sets multiple properties on a map instance or a property that wasn't predefined.
	 *
	 * @signature `map.set(props [,removeProps])`
	 *
	 * Assigns each value in `props` to a property on this map instance named after the
	 * corresponding key in `props`, effectively merging `props` into the Map. If `removeProps` is true, properties not in
	 * `props` will be set to `undefined`.
	 *
	 *   @param {Object} props A collection of key-value pairs to set.
	 *   If any properties already exist on the map, they will be overwritten.
	 *
	 *   @param {Boolean} [removeProps=false] Whether to set keys not present in `props` to `undefined`.
	 *
	 *   @return {can-define/map/map} The map instance for chaining.
	 *
	 * @signature `map.set(propName, value)`
	 *
	 * Assigns _value_ to a property on this map instance called _propName_.  This will define
	 * the property if it hasn't already been predefined.
	 *
	 *   @param {String} propName The property to set.
	 *   @param {*} value The value to assign to `propName`.
	 *   @return {can-define/map/map} This map instance, for chaining.
	 */
	set: function(prop, value){
		if(typeof prop === "object") {
			//!steal-remove-start
			canLogDev.warn('can-define/map/map.prototype.set is deprecated; please use can-define/map/map.prototype.assign or can-define/map/map.prototype.update instead');
			//!steal-remove-end
			if(value === true) {
				updateDeep.call(this, prop);
			} else {
				assignDeep.call(this, prop);
			}

		} else {
			setKeyValue.call(this, prop, value);
		}

		return this;
	},
	/**
	 * @function can-define/map/map.prototype.assignDeep assignDeep
	 * @parent can-define/map/map.prototype
	 *
	 * @description Sets multiple properties on a map instance or a property that wasn't predefined.
	 *
	 * @signature `map.assignDeep(props)`
	 *
	 * Assigns each value in `props` to a property on this map instance named after the
	 * corresponding key in `props`, effectively replacing `props` into the Map.
	 * Properties not in `props` will not be changed.
	 *
	 * ```js
	 * var MyMap = DefineMap.extend({
	 * 	list: DefineList,
	 * 	name: 'string'
	 * });
	 * var obj = new MyMap({
	 * 	list: ['1', '2', '3'],
	 * 	foo: 'bar'
	 * });
	 * obj.assignDeep({
	 * 	list: ['first']
 	 * });
	 *
	 * obj.list //-> ['first']
	 * obj.foo //-> 'bar'
	 * ```
	 *   @param {Object} props A collection of key-value pairs to set.
	 *   If any properties already exist on the map, they will be overwritten.
	 *
	 *   @return {can-define/map/map} The map instance for chaining.
	 *
	 */
	assignDeep: function(prop) {
		assignDeep.call(this, prop);
		return this;
	},
	/**
	 * @function can-define/map/map.prototype.updateDeep updateDeep
	 * @parent can-define/map/map.prototype
	 *
	 * @description Sets multiple properties on a map instance or a property that wasn't predefined.
	 *
	 * @signature `map.updateDeep(props)`
	 *
	 * Assigns each value in `props` to a property on this map instance named after the
	 * corresponding key in `props`, effectively merging `props` into the Map.
	 * Properties not in `props` will be set to `undefined`.
	 *
	 * ```js
	 * var MyMap = DefineMap.extend({
	 * 	list: DefineList,
	 * 	name: 'string'
	 * });
	 * var obj = new MyMap({
	 * 	list: ['1', '2', '3'],
	 * 	name: 'bar',
	 * 	foo: {
	 * 		bar: 'zed',
	 * 		boo: 'goo'
	 * 	}
	 * });
	 * obj.updateDeep({
	 * 	list: ['first'],
	 * 	foo: {
	 * 		bar: 'abc'
	 * 	}
 	 * });
	 *
	 * obj.list //-> ['first', '2', '3']
	 * obj.foo	//-> { bar: 'abc', boo: undefined }
	 * obj.name //-> 'undefined'
	 * ```
	 *   @param {Object} props A collection of key-value pairs to set.
	 *   If any properties already exist on the map, they will be overwritten.
	 *
	 *   @return {can-define/map/map} The map instance for chaining.
	 *
	 */
	updateDeep: function(prop) {
		updateDeep.call(this, prop);
		return this;
	},
	/**
	 * @function can-define/map/map.prototype.assign assign
	 * @parent can-define/map/map.prototype
	 *
	 * @description Sets multiple properties on a map instance or a property that wasn't predefined.
	 *
	 * @signature `map.assign(props)`
	 *
	 * ```js
	 * var MyMap = DefineMap.extend({
	 * 	list: DefineList,
	 * 	name: 'string'
	 * });
	 * var obj = new MyMap({
	 * 	list: ['1', '2', '3'],
	 * 	foo: 'bar'
	 * });
	 * obj.assign({
	 * 	list: ['first']
 	 * });
	 *
	 * obj.list //-> ['first']
	 * obj.foo //-> 'bar'
	 * ```
	 * Assigns each value in `props` to a property on this map instance named after the
	 * corresponding key in `props`, effectively replacing `props` into the Map.
	 * Properties not in `props` will not be changed.
	 *
	 *   @param {Object} props A collection of key-value pairs to set.
	 *   If any properties already exist on the map, they will be overwritten.
	 *
	 *   @return {can-define/map/map} The map instance for chaining.
	 *
	 */
	assign: function(prop) {
		assign.call(this, prop);
		return this;
	},
	/**
	 * @function can-define/map/map.prototype.update update
	 * @parent can-define/map/map.prototype
	 *
	 * @description Sets multiple properties on a map instance or a property that wasn't predefined.
	 *
	 * @signature `map.update(props)`
	 *
	 * ```js
	 * var MyMap = DefineMap.extend({
	 * 	list: DefineList,
	 * 	name: 'string'
	 * });
	 * var obj = new MyMap({
	 * 	list: ['1', '2', '3'],
	 * 	foo: 'bar'
	 * });
	 * obj.update({
	 * 	list: ['first']
 	 * });
	 *
	 * obj.list //-> ['first', '2', '3']
	 * obj.foo //-> 'undefined'
	 * ```
	 * Assigns each value in `props` to a property on this map instance named after the
	 * corresponding key in `props`, effectively merging `props` into the Map.
	 * Properties not in `props` will be set to `undefined`.
	 *
	 *   @param {Object} props A collection of key-value pairs to set.
	 *   If any properties already exist on the map, they will be overwritten.
	 *
	 *   @return {can-define/map/map} The map instance for chaining.
	 *
	 */
	update: function(prop) {
		update.call(this, prop);
		return this;
	},
	/**
	 * @function can-define/map/map.prototype.serialize serialize
	 * @parent can-define/map/map.prototype
	 *
	 * @description Get a serialized representation of the map instance and its children.
	 *
	 * @signature `map.serialize()`
	 *
	 * Get the serialized Object form of the map.  Serialized
	 * data is typically used to send back to a server.  Use [can-define.types.serialize]
	 * to customize a property's serialized value or if the property should be added to
	 * the result or not.
	 *
	 * `undefined` serialized values are not added to the result.
	 *
	 * ```js
	 * var MyMap = DefineMap.extend({
	 *   date: {
	 *     type: "date",
	 *     serialize: function(date){
	 *       return date.getTime()
	 *     }
	 *   }
	 * });
	 *
	 * var myMap = new MyMap({date: new Date(), count: 5});
	 * myMap.serialize() //-> {date: 1469566698504, count: 5}
	 * ```
	 *
	 *   @return {Object} A JavaScript Object that can be serialized with `JSON.stringify` or other methods.
	 *
	 */
	serialize: function () {
		return canReflect.serialize(this, CIDMap);
	},

	forEach: (function(){

		var forEach = function(list, cb, thisarg){
			return canReflect.eachKey(list, cb, thisarg);
		},
			noObserve = Observation.ignore(forEach);

		return function(cb, thisarg, observe) {
			return observe === false ? noObserve(this, cb, thisarg) : forEach(this, cb, thisarg);
		};

	})(),
	"*": {
		type: define.types.observable
	}
});

canReflect.assignSymbols(DefineMap.prototype,{
	// -type-
	"can.isMapLike": true,
	"can.isListLike":  false,
	"can.isValueLike": false,

	// -get/set-
	"can.getKeyValue": getKeyValue,
	"can.setKeyValue": setKeyValue,
	"can.deleteKeyValue": function(prop) {
		this.set(prop, undefined);
		return this;
	},

	// -shape
	"can.getOwnEnumerableKeys": function(){
		Observation.add(this, '__keys');
		return keysForDefinition(this._define.definitions).concat(keysForDefinition(this._instanceDefinitions) );
	},

	// -shape get/set-
	"can.assignDeep": assignDeep,
	"can.updateDeep": updateDeep,
	"can.unwrap": defineHelpers.reflectUnwrap,
	"can.serialize": defineHelpers.reflectSerialize,

	// observable
	"can.keyHasDependencies": function(key) {
		return !!(this._computed && this._computed[key] && this._computed[key].compute);
	},
	"can.getKeyDependencies": function(key) {
		var ret;
		if(this._computed && this._computed[key] && this._computed[key].compute) {
			ret = {};
			ret.valueDependencies = new CIDSet();
			ret.valueDependencies.add(this._computed[key].compute);
		}
		return ret;
	}
});

canReflect.setKeyValue(DefineMap.prototype, canSymbol.iterator, function() {
	return new define.Iterator(this);
});

// Add necessary event methods to this object.
for(var prop in define.eventsProto) {
	DefineMap[prop] = define.eventsProto[prop];
	Object.defineProperty(DefineMap.prototype, prop, {
		enumerable:false,
		value: define.eventsProto[prop],
		writable: true
	});
}
// @@can.onKeyValue and @@can.offKeyValue are also on define.eventsProto
//  but symbols are not enumerated in for...in loops
var eventsProtoSymbols = ("getOwnPropertySymbols" in Object) ?
  Object.getOwnPropertySymbols(define.eventsProto) :
  [canSymbol.for("can.onKeyValue"), canSymbol.for("can.offKeyValue")];

eventsProtoSymbols.forEach(function(sym) {
  Object.defineProperty(DefineMap.prototype, sym, {
    enumerable:false,
    value: define.eventsProto[sym],
    writable: true
  });
});

types.DefineMap = DefineMap;
types.DefaultMap = DefineMap;

Object.defineProperty(DefineMap.prototype, "toObject", {
	enumerable: false,
	writable: true,
	value: function(){
		canLog.warn("Use DefineMap::get instead of DefineMap::toObject");
		return this.get();
	}
});
Object.defineProperty(DefineMap.prototype, "each", {
	enumerable: false,
	writable: true,
	value: DefineMap.prototype.forEach
});

module.exports = ns.DefineMap = DefineMap;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(27);
var isPlainObject = __webpack_require__(39);

function deepAssign() {
	/*jshint maxdepth:6 */
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length;

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && !isFunction(target)) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if (length === i) {
		/*jshint validthis:true*/
		target = this;
		--i;
	}

	for (; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = deepAssign(clone, copy);

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}

module.exports = deepAssign;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.warnTimeout = 5000;
exports.logLevel = 0;

/**
 * @module {{}} can-log log
 * @parent can-js-utilities
 * @collection can-infrastructure
 * @hide
 * 
 * Utilities for logging to the console.
 */

/**
 * @function can-log.warn warn
 * @parent can-log
 * @description
 * 
 * Adds a warning message to the console.
 *
 * ```
 * var canLog = require("can-log");
 * 
 * canLog.warn("something evil");
 * ```
 *
 * @signature `canLog.warn(msg)`
 * @param {String} msg the message to be logged.
 */
exports.warn = function(out) {
	var ll = this.logLevel;
	if (ll < 2) {
		Array.prototype.unshift.call(arguments, 'WARN:');
		if (typeof console !== "undefined" && console.warn) {
			this._logger("warn", Array.prototype.slice.call(arguments));
		} else if (typeof console !== "undefined" && console.log) {
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("CanJS WARNING: " + out);
		}
	}
};

/**
 * @function can-log.log log
 * @parent can-log
 * @description
 * Adds a message to the console.
 * @hide
 *
 * ```
 * var canLog = require("can-log");
 * 
 * canLog.log("hi");
 * ```
 *
 * @signature `canLog.log(msg)`
 * @param {String} msg the message
 */
exports.log = function(out) {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.log) {
			Array.prototype.unshift.call(arguments, 'INFO:');
			this._logger("log", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("CanJS INFO: " + out);
		}
	}
};

/**
 * @function can-log.error error
 * @parent can-log
 * @description
 * Adds an error message to the console.
 * @hide
 *
 * ```
 * var canLog = require("can-log");
 * 
 * canLog.error(new Error("Oh no!"));
 * ```
 *
 * @signature `canLog.error(err)`
 * @param {String|Error} err The error to be logged.
 */
exports.error = function(out) {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.error) {
			Array.prototype.unshift.call(arguments, 'ERROR:');
			this._logger("error", Array.prototype.slice.call(arguments));
		} else if (window && window.opera && window.opera.postError) {
			window.opera.postError("ERROR: " + out);
		}
	}
};

exports._logger = function (type, arr) {
	try {
		console[type].apply(console, arr);
	} catch(e) {
		console[type](arr);
	}
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dev = __webpack_require__(5);
var hasWarned = false;

module.exports = function(arr) {
	//!steal-remove-start
	if (!hasWarned) {
		dev.warn('js/is-array/is-array is deprecated; use Array.isArray');
		hasWarned = true;
	}
	//!steal-remove-end

	return Array.isArray(arr);
};


/***/ }),
/* 115 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canReflect = __webpack_require__(0);

function dispatch(key) {
	// jshint -W040
	var handlers = this.eventHandlers[key];
	if (handlers) {
		var handlersCopy = handlers.slice();
		var value = this.getKeyValue(key);
		for (var i = 0; i < handlersCopy.length; i++) {
			handlersCopy[i](value);
		}
	}
}

function Globals() {
	this.eventHandlers = {};
	this.properties = {};
}

/**
 * @function define 
 * @parent can-globals/methods
 * 
 * Create a new global environment variable.
 * 
 * @signature `globals.define(key, value[, cache])`
 * 
 * Defines a new global called `key`, who's value defaults to `value`.
 * 
 * The following example defines the `global` key's default value to the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object:
 * ```javascript
 * globals.define('global', window);
 * globals.getKeyValue('window') //-> window
 * ```
 * 
 * If a function is provided and `cache` is falsy, that function is run every time the key value is read:
 * ```javascript
 * globals.define('isBrowserWindow', function() {
 *   console.log('EVALUATING')
 *   return typeof window !== 'undefined' &&
 *     typeof document !== 'undefined' && typeof SimpleDOM === 'undefined'
 * }, false);
 * globals.get('isBrowserWindow') // logs 'EVALUATING'
 *                                // -> true
 * globals.get('isBrowserWindow') // logs 'EVALUATING' again
 *                                // -> true
 * ```
 * 
 * If a function is provided and `cache` is truthy, that function is run only the first time the value is read:
 * ```javascript
 * globals.define('isWebkit', function() {
 *   console.log('EVALUATING')
 *   var div = document.createElement('div')
 *   return 'WebkitTransition' in div.style
 * })
 * globals.getKeyValue('isWebkit') // logs 'EVALUATING'
 * 								   // -> true
 * globals.getKeyValue('isWebkit') // Does NOT log again!
 * 								   // -> true
 * ```
 * 
 * @param {String} key
 * The key value to create.
 * 
 * @param {*} value
 * The default value. If this is a function, its return value will be used.
 * 
 * @param {Boolean} [cache=true]
 * Enable cache. If false the `value` function is run every time the key value is read.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.define = function (key, value, enableCache) {
	if (enableCache === undefined) {
		enableCache = true;
	}
	if (!this.properties[key]) {
		this.properties[key] = {
			default: value,
			value: value,
			enableCache: enableCache
		};
	}
	return this;
};

/**
 * @function getKeyValue 
 * @parent can-globals/methods
 * 
 * Get a global environment variable by name.
 * 
 * @signature `globals.getKeyValue(key)`
 * 
 * Returns the current value at `key`. If no value has been set, it will return the default value (if it is not a function). If the default value is a function, it will return the output of the function. This execution is cached if the cache flag was set on initialization.
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.getKeyValue('foo'); //-> 'bar'
 * ```
 * 
 * @param {String} key
 * The key value to access.
 * 
 * @return {*}
 * Returns the value of a given key.
 */
Globals.prototype.getKeyValue = function (key) {
	var property = this.properties[key];
	if (property) {
		if (typeof property.value === 'function') {
			if (property.cachedValue) {
				return property.cachedValue;
			}
			if (property.enableCache) {
				property.cachedValue = property.value();
				return property.cachedValue;
			} else {
				return property.value();
			}
		}
		return property.value;
	}
};

Globals.prototype.makeExport = function (key) {
	return function (value) {
		if (arguments.length === 0) {
			return this.getKeyValue(key);
		}

		if (typeof value === 'undefined' || value === null) {
			this.deleteKeyValue(key);
		} else {
			if (typeof value === 'function') {
				this.setKeyValue(key, function () {
					return value;
				});
			} else {
				this.setKeyValue(key, value);
			}
			return value;
		}
	}.bind(this);
};

/**
 * @function offKeyValue 
 * @parent can-globals/methods
 * 
 * Remove handler from event queue.
 * 
 * @signature `globals.offKeyValue(key, handler)`
 * 
 * Removes `handler` from future change events for `key`.
 * 
 * 
 * ```javascript
 * var handler = (value) => {
 *   value === 'baz' //-> true
 * };
 * globals.define('foo', 'bar');
 * globals.onKeyValue('foo', handler);
 * globals.setKeyValue('foo', 'baz');
 * globals.offKeyValue('foo', handler);
 * ```
 * 
 * @param {String} key
 * The key value to observe.
 * 
 * @param {Function} handler([value])
 * The observer callback.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.offKeyValue = function (key, handler) {
	if (this.properties[key]) {
		var handlers = this.eventHandlers[key];
		if (handlers) {
			var i = handlers.indexOf(handler);
			handlers.splice(i, 1);
		}
	}
	return this;
};

/**
 * @function onKeyValue 
 * @parent can-globals/methods
 * 
 * Add handler to event queue.
 * 
 * @signature `globals.onKeyValue(key, handler)`
 * 
 * Calls `handler` each time the value of `key` is set or reset.
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.onKeyValue('foo', (value) => {
 *   value === 'baz' //-> true
 * });
 * globals.setKeyValue('foo', 'baz');
 * ```
 * 
 * @param {String} key
 * The key value to observe.
 * 
 * @param {function(*)} handler([value])
 * The observer callback.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.onKeyValue = function (key, handler) {
	if (this.properties[key]) {
		if (!this.eventHandlers[key]) {
			this.eventHandlers[key] = [];
		}
		this.eventHandlers[key].push(handler);
	}
	return this;
};

/**
 * @function deleteKeyValue 
 * @parent can-globals/methods
 * 
 * Reset global environment variable.
 * 
 * @signature `globals.deleteKeyValue(key)`
 * 
 * Deletes the current value at `key`. Future `get`s will use the default value.
 * 
 * ```javascript
 * globals.define('global', window);
 * globals.setKeyValue('global', {});
 * globals.deleteKeyValue('global');
 * globals.getKeyValue('global') === window; //-> true
 * ```
 * 
 * @param {String} key
 * The key value to access.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.deleteKeyValue = function (key) {
	var property = this.properties[key];
	if (property !== undefined) {
		property.value = property.default;
		property.cachedValue = undefined;
		dispatch.call(this, key);
	}
	return this;
};

/**
 * @function setKeyValue 
 * @parent can-globals/methods
 * 
 * Overwrite an existing global environment variable.
 * 
 * @signature `globals.setKeyValue(key, value)`
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.setKeyValue('foo', 'baz');
 * globals.getKeyValue('foo'); //-> 'baz'
 * ```
 * 
 * Sets the new value at `key`. Will override previously set values, but preserves the default (see `deleteKeyValue`).
 * 
 * Setting a key which was not previously defined will call `define` with the key and value.
 * 
 * @param {String} key
 * The key value to access.
 * 
 * @param {*} value
 * The new value.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.setKeyValue = function (key, value) {
	if (!this.properties[key]) {
		return this.define(key, value);
	}
	var property = this.properties[key];
	property.value = value;
	property.cachedValue = undefined;
	dispatch.call(this, key);
	return this;
};

/**
 * @function reset 
 * @parent can-globals/methods
 * 
 * Reset all keys to their default value and clear their caches.
 * 
 * @signature `globals.setKeyValue(key, value)`
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.setKeyValue('foo', 'baz');
 * globals.getKeyValue('foo'); //-> 'baz'
 * globals.reset();
 * globals.getKeyValue('foo'); //-> 'bar'
 * ```
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.reset = function () {
	for (var key in this.properties) {
		if (this.properties.hasOwnProperty(key)) {
			this.properties[key].value = this.properties[key].default;
			this.properties[key].cachedValue = undefined;
			dispatch.call(this, key);
		}
	}
	return this;
};

canReflect.assignSymbols(Globals.prototype, {
	'can.getKeyValue': Globals.prototype.getKeyValue,
	'can.setKeyValue': Globals.prototype.setKeyValue,
	'can.deleteKeyValue': Globals.prototype.deleteKeyValue,
	'can.onKeyValue': Globals.prototype.onKeyValue,
	'can.offKeyValue': Globals.prototype.offKeyValue
});

module.exports = Globals;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var canSymbol = __webpack_require__(1);
var typeReflections = __webpack_require__(29);

module.exports = {
	/**
	 * @function {function(...), Object, ...} can-reflect/call.call call
	 * @parent can-reflect/call
	 * @description  Call a callable, with a context object and parameters
	 *
	 * @signature `call(func, context, ...rest)`
	 *
	 * Call the callable `func` as if it were a function, bound to `context` and with any additional parameters
	 * occurring after `context` set to the positional parameters.
	 *
	 * Note that `func` *must* either be natively callable, implement [can-symbol/symbols/apply @@@@can.apply],
	 * or have a callable `apply` property to work with `canReflect.call`
	 *
	 * ```
	 * var compute = canCompute("foo");
	 *
	 * canReflect.call(compute, null, "bar");
	 * canReflect.call(compute, null); // -> "bar"
	 * ```
	 *
	 * @param  {function(...)} func the function to call with the supplied arguments
	 * @param  {Object} context the context object to set as `this` on the function call
	 * @param  {*} rest any arguments after `context` will be passed to the function call
	 * @return {*}  return types and values are determined by the call to `func`
	 */
	call: function(func, context){
		var args = [].slice.call(arguments, 2);
		var apply = func[canSymbol.for("can.apply")];
		if(apply) {
			return apply.call(func, context, args);
		} else {
			return func.apply(context, args);
		}
	},
	/**
	 * @function {function(...), Object, ...} can-reflect/call.apply apply
	 * @parent can-reflect/call
	 * @description  Call a callable, with a context object and a list of parameters
	 *
	 * @signature `apply(func, context, args)`
	 *
	 * Call the callable `func` as if it were a function, bound to `context` and with any additional parameters
	 * contained in the Array-like `args`
	 *
	 * Note that `func` *must* either be natively callable, implement [can-symbol/symbols/apply @@@@can.apply],
	 * or have a callable `apply` property to work with `canReflect.apply`
	 *
	 * ```
	 * var compute = canCompute("foo");
	 *
	 * canReflect.apply(compute, null, ["bar"]);
	 * canReflect.apply(compute, null, []); // -> "bar"
	 * ```
	 *
	 * @param  {function(...)} func the function to call
	 * @param  {Object} context the context object to set as `this` on the function call
	 * @param  {*} args arguments to be passed to the function call
	 * @return {*}  return types and values are determined by the call to `func`
	 */
	apply: function(func, context, args){
		var apply = func[canSymbol.for("can.apply")];
		if(apply) {
			return apply.call(func, context, args);
		} else {
			return func.apply(context, args);
		}
	},
	/**
	 * @function {function(...), ...} can-reflect/call.new new
	 * @parent can-reflect/call
	 * @description  Construct a new instance of a callable constructor
	 *
	 * @signature `new(func, ...rest)`
	 *
	 * Call the callable `func` as if it were a function, bound to a new instance of `func`, and with any additional
	 * parameters occurring after `func` set to the positional parameters.
	 *
	 * Note that `func` *must* either implement [can-symbol/symbols/new @@@@can.new],
	 * or have a callable `apply` property *and* a prototype to work with `canReflect.new`
	 *
	 * ```
	 * canReflect.new(DefineList, ["foo"]); // -> ["foo"]<DefineList>
	 * ```
	 *
	 * @param  {function(...)} func a constructor
	 * @param  {*} rest arguments to be passed to the constructor
	 * @return {Object}  if `func` returns an Object, that returned Object; otherwise a new instance of `func`
	 */
	"new": function(func){
		var args = [].slice.call(arguments, 1);
		var makeNew = func[canSymbol.for("can.new")];
		if(makeNew) {
			return makeNew.apply(func, args);
		} else {
			var context = Object.create(func.prototype);
			var ret = func.apply(context, args);
			if(typeReflections.isPrimitive(ret)) {
				return context;
			} else {
				return ret;
			}
		}
	}
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var canSymbol = __webpack_require__(1);

var slice = [].slice;

function makeFallback(symbolName, fallbackName) {
	return function(obj, event, handler, queueName){
		var method = obj[canSymbol.for(symbolName)];
		if(method !== undefined) {
			return method.call(obj, event, handler, queueName);
		}
		return this[fallbackName].apply(this, arguments);
	};
}

function makeErrorIfMissing(symbolName, errorMessage){
	return function(obj){
		var method = obj[canSymbol.for(symbolName)];
		if(method !== undefined) {
			var args = slice.call(arguments, 1);
			return method.apply(obj, args);
		}
		throw new Error(errorMessage);
	};
}

module.exports = {
	// KEY
	/**
	 * @function {Object, String, function(*, *), String} can-reflect/observe.onKeyValue onKeyValue
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, based on a key change
	 *
	 * @signature `onKeyValue(obj, key, handler, [queueName])`
	 *
	 * Register a handler on the Map-like object `obj` to trigger when the property key `key` changes.
	 * `obj` *must* implement [can-symbol/symbols/onKeyValue @@@@can.onKeyValue] to be compatible with
	 * can-reflect.onKeyValue.  The function passed as `handler` will receive the new value of the property
	 * as the first argument, and the previous value of the property as the second argument.
	 *
	 * ```
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onKeyValue(obj, "foo", function(newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * });
	 *
	 * obj.foo = "baz";  // -> logs "foo is now baz , was bar"
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {String} key  the key to listen to
	 * @param {function(*, *)} handler a callback function that recieves the new value
	 * @param {String} [queueName]  the queue to dispatch events to
	 */
	onKeyValue: makeFallback("can.onKeyValue", "onEvent"),
	/**
	 * @function {Object, String, function(*), String} can-reflect/observe.offKeyValue offKeyValue
	 * @parent can-reflect/observe
	 * @description  Unregister an event handler on a MapLike object, based on a key change
	 *
	 * @signature `offKeyValue(obj, key, handler, [queueName])`
	 *
	 * Unregister a handler from the Map-like object `obj` that had previously been registered with
	 * [can-reflect/observe.onKeyValue onKeyValue]. The function passed as `handler` will no longer be called
	 * when the value of `key` on `obj` changes.
	 *
	 * ```
	 * var obj = new DefineMap({ foo: "bar" });
	 * var handler = function(newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * };
	 *
	 * canReflect.onKeyValue(obj, "foo", handler);
	 * canReflect.offKeyValue(obj, "foo", handler);
	 *
	 * obj.foo = "baz";  // -> nothing is logged
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {String} key  the key to stop listening to
	 * @param {function(*)} handler the callback function that should be removed from the event handlers for `key`
	 * @param {String} [queueName]  the queue that the handler was set to receive events from
	 */
	offKeyValue: makeFallback("can.offKeyValue","offEvent"),

	/**
	 * @function {Object, function(Array)} can-reflect/observe.onKeys onKeys
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, triggered on the key set changing
	 *
	 * @signature `onKeys(obj, handler)`
	 *
	 * Register an event handler on the Map-like object `obj` to trigger when `obj`'s keyset changes.
	 * `obj` *must* implement [can-symbol/symbols/onKeys @@@@can.onKeys] to be compatible with
	 * can-reflect.onKeys.  The function passed as `handler` will receive an Array of object diffs (see
	 * [can-util/js/diff-object/diff-object diffObject] for the format) as its one argument.
	 *
	 * ```
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onKeys(obj, function(diffs) {
	 * 	console.log(diffs);
	 * });
	 *
	 * obj.set("baz", "quux");  // -> logs '[{"property": "baz", "type": "add", "value": "quux"}]'
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {function(Array)} handler the callback function to receive the diffs in the key set
	 */
	// any key change (diff would normally happen)
	onKeys: makeErrorIfMissing("can.onKeys","can-reflect: can not observe an onKeys event"),
	/**
	 * @function {Object, function(Array)} can-reflect/observe.onKeysAdded onKeysAdded
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, triggered on new keys being added.
	 *
	 * @signature `onKeysAdded(obj, handler)`
	 *
	 * Register an event handler on the Map-like object `obj` to trigger when a new key or keys are set on
	 * `obj`. `obj` *must* implement [can-symbol/symbols/onKeysAdded @@@@can.onKeysAdded] to be compatible with
	 * can-reflect.onKeysAdded.  The function passed as `handler` will receive an Array of Strings as its one
	 * argument.
	 *
	 * ```
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onKeysAded(obj, function(newKeys) {
	 * 	console.log(newKeys);
	 * });
	 *
	 * foo.set("baz", "quux");  // -> logs '["baz"]'
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {function(Array)} handler the callback function to receive the array of added keys
	 */
	// keys added at a certain point {key: 1}, index
	onKeysAdded: makeErrorIfMissing("can.onKeysAdded","can-reflect: can not observe an onKeysAdded event"),
	/**
	 * @function {Object, function(Array)} can-reflect/observe.onKeysRemoved onKeysRemoved
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, triggered on keys being deleted.
	 *
	 * @signature `onKeysRemoved(obj, handler)`
	 *
	 * Register an event handler on the Map-like object `obj` to trigger when a key or keys are removed from
	 * `obj`'s keyset. `obj` *must* implement [can-symbol/symbols/onKeysRemoved @@@@can.onKeysRemoved] to be
	 * compatible with can-reflect.onKeysAdded.  The function passed as `handler` will receive an Array of
	 * Strings as its one argument.
	 *
	 * ```
	 * var obj = new CanMap({ foo: "bar" });
	 * canReflect.onKeys(obj, function(diffs) {
	 * 	console.log(JSON.stringify(diffs));
	 * });
	 *
	 * foo.removeAttr("foo");  // -> logs '["foo"]'
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {function(Array)} handler the callback function to receive the array of removed keys
	 */
	onKeysRemoved: makeErrorIfMissing("can.onKeysRemoved","can-reflect: can not unobserve an onKeysRemoved event"),

	/**
	 * @function {Object, String} can-reflect/observe.getKeyDependencies getKeyDependencies
	 * @parent can-reflect/observe
	 * @description  Return the observable objects that compute to the value of a named property on an object
	 *
	 * @signature `getKeyDependencies(obj, key)`
	 *
	 * Return the observable objects that provide input values to generate the computed value of the
	 * property `key` on Map-like object `obj`.  If `key` does not have dependencies on `obj`, returns `undefined`.
	 * Otherwise returns an object with up to two keys: `keyDependencies` is a [can-util/js/cid-map/cid-map CIDMap] that
	 * maps each Map-like object providing keyed values to an Array of the relevant keys; `valueDependencies` is a
	 * [can-util/js/cid-set/cid-set CIDSet] that contains all Value-like dependencies providing their own values.
	 *
	 * `obj` *must* implement [can-symbol/symbols/getKeyDependencies @@@@can.getKeyDependencies] to work with
	 * `canReflect.getKeyDependencies`.
	 *
	 *
	 * ```
	 * var foo = new DefineMap({ "bar": "baz" })
	 * var obj = new (DefineMap.extend({
	 * 	 baz: {
	 * 	   get: function() {
	 * 	     return foo.bar;
	 * 	   }
	 * 	 }
	 * }))();
	 *
	 * canReflect.getKeyDependencies(obj, "baz");  // -> { valueDependencies: CIDSet }
	 * ```
	 *
	 * @param {Object} obj the object to check for key dependencies
	 * @param {String} key the key on the object to check
	 * @return {Object} the observable values that this keyed value depends on
	 */
	getKeyDependencies: makeErrorIfMissing("can.getKeyDependencies", "can-reflect: can not determine dependencies"),

	/**
	 * @function {Object, String} can-reflect/observe.getWhatIChange getWhatIChange
	 * @hide
	 * @parent can-reflect/observe
	 * @description Return the observable objects that derive their value from the
	 * obj, passed in.
	 *
	 * @signature `getWhatIChange(obj, key)`
	 *
	 * `obj` *must* implement `@@@@can.getWhatIChange` to work with
	 * `canReflect.getWhatIChange`.
	 *
	 * @param {Object} obj the object to check for what it changes
	 * @param {String} [key] the key on the object to check
	 * @return {Object} the observable values that derive their value from `obj`
	 */
	getWhatIChange: makeErrorIfMissing(
		"can.getWhatIChange",
		"can-reflect: can not determine dependencies"
	),

	/**
	 * @function {Function} can-reflect/observe.getChangesDependencyRecord getChangesDependencyRecord
	 * @hide
	 * @parent can-reflect/observe
	 * @description Return the observable objects that are mutated by the handler
	 * passed in as argument.
	 *
	 * @signature `getChangesDependencyRecord(handler)`
	 *
	 * `handler` *must* implement `@@@@can.getChangesDependencyRecord` to work with
	 * `canReflect.getChangesDependencyRecord`.
	 *
	 * ```
	 * var one = new SimpleObservable("one");
	 * var two = new SimpleObservable("two");
	 *
	 * var handler = function() {
	 *	two.set("2");
	 * };
	 *
	 * canReflect.onValue(one, handler);
	 * canReflect.getChangesDependencyRecord(handler); // -> { valueDependencies: new Set([two]) }
	 * ```
	 *
	 * @param {Function} handler the event handler to check for what it changes
	 * @return {Object} the observable values that are mutated by the handler
	 */
	getChangesDependencyRecord: function getChangesDependencyRecord(handler) {
		var fn = handler[canSymbol.for("can.getChangesDependencyRecord")];

		if (typeof fn === "function") {
			return fn();
		}
	},

	/**
	 * @function {Object, String} can-reflect/observe.keyHasDependencies keyHasDependencies
	 * @parent can-reflect/observe
	 * @description  Determine whether the value for a named property on an object is bound to other events
	 *
	 * @signature `keyHasDependencies(obj, key)`
	 *
	 * Returns `true` if the computed value of the property `key` on Map-like object `obj` derives from other values.
	 * Returns `false` if `key` is computed on `obj` but does not have dependencies on other objects. If `key` is not
	 * a computed value on `obj`, returns `undefined`.
	 *
	 * `obj` *must* implement [can-symbol/symbols/keyHasDependencies @@@@can.keyHasDependencies] to work with
	 * `canReflect.keyHasDependencies`.
	 *
	 * ```
	 * var foo = new DefineMap({ "bar": "baz" })
	 * var obj = new (DefineMap.extend({
	 * 	 baz: {
	 * 	   get: function() {
	 * 	     return foo.bar;
	 * 	   }
	 * 	 },
	 * 	 quux: {
	 * 	 	 get: function() {
	 * 	 	   return "thud";
	 * 	 	 }
	 * 	 }
	 * }))();
	 *
	 * canReflect.keyHasDependencies(obj, "baz");  // -> true
	 * canReflect.keyHasDependencies(obj, "quux");  // -> false
	 * canReflect.keyHasDependencies(foo, "bar");  // -> undefined
	 * ```
	 *
	 * @param {Object} obj the object to check for key dependencies
	 * @param {String} key the key on the object to check
	 * @return {Boolean} `true` if there are other objects that may update the keyed value; `false` otherwise
	 *
	 */
	// TODO: use getKeyDeps once we know what that needs to look like
	keyHasDependencies: makeErrorIfMissing("can.keyHasDependencies","can-reflect: can not determine if this has key dependencies"),

	// VALUE
	/**
	 * @function {Object, function(*)} can-reflect/observe.onValue onValue
	 * @parent can-reflect/observe
	 * @description  Register an event handler on an observable ValueLike object, based on a change in its value
	 *
	 * @signature `onValue(handler, [queueName])`
	 *
	 * Register an event handler on the Value-like object `obj` to trigger when its value changes.
	 * `obj` *must* implement [can-symbol/symbols/onValue @@@@can.onValue] to be compatible with
	 * can-reflect.onKeyValue.  The function passed as `handler` will receive the new value of `obj`
	 * as the first argument, and the previous value of `obj` as the second argument.
	 *
	 * ```
	 * var obj = canCompute("foo");
	 * canReflect.onValue(obj, function(newVal, oldVal) {
	 * 	console.log("compute is now", newVal, ", was", oldVal);
	 * });
	 *
	 * obj("bar");  // -> logs "compute is now bar , was foo"
	 * ```
	 *
	 * @param {*} obj  any object implementing @@can.onValue
	 * @param {function(*, *)} handler  a callback function that receives the new and old values
	 */
	onValue: makeErrorIfMissing("can.onValue","can-reflect: can not observe value change"),
	/**
	 * @function {Object, function(*)} can-reflect/observe.offValue offValue
	 * @parent can-reflect/observe
	 * @description  Unregister an value change handler from an observable ValueLike object
	 *
	 * @signature `offValue(handler, [queueName])`
	 *
	 * Unregister an event handler from the Value-like object `obj` that had previously been registered with
	 * [can-reflect/observe.onValue onValue]. The function passed as `handler` will no longer be called
	 * when the value of `obj` changes.
	 *
	 * ```
	 * var obj = canCompute( "foo" );
	 * var handler = function(newVal, oldVal) {
	 * 	console.log("compute is now", newVal, ", was", oldVal);
	 * };
	 *
	 * canReflect.onKeyValue(obj, handler);
	 * canReflect.offKeyValue(obj, handler);
	 *
	 * obj("baz");  // -> nothing is logged
	 * ```
	 *
	 * @param {*} obj
	 * @param {function(*)} handler
	 */
	offValue: makeErrorIfMissing("can.offValue","can-reflect: can not unobserve value change"),

	/**
	 * @function {Object} can-reflect/observe.getValueDependencies getValueDependencies
	 * @parent can-reflect/observe
	 * @description  Return all the events that bind to the value of an observable, Value-like object
	 *
	 * @signature `getValueDependencies(obj)`
	 *
	 * Return the observable objects that provide input values to generate the computed value of the
	 * Value-like object `obj`.  If `obj` does not have dependencies, returns `undefined`.
	 * Otherwise returns an object with up to two keys: `keyDependencies` is a [can-util/js/cid-map/cid-map CIDMap] that
	 * maps each Map-like object providing keyed values to an Array of the relevant keys; `valueDependencies` is a
	 * [can-util/js/cid-set/cid-set CIDSet] that contains all Value-like dependencies providing their own values.
	 *
	 * `obj` *must* implement [can-symbol/symbols/getValueDependencies @@@@can.getValueDependencies] to work with
	 * `canReflect.getValueDependencies`.
	 *
	 *
	 * ```
	 * var foo = new DefineMap({ "bar": "baz" })
	 * var obj = canCompute(function() {
	 * 	 return foo.bar;
	 * });
	 *
	 * canReflect.getValueDependencies(obj);  // -> { valueDependencies: CIDSet } because `obj` is internally backed by
	 * a [can-observation]
	 * ```
	 *
	 * @param {Object} obj the object to check for value dependencies
	 * @return {Object} the observable objects that `obj`'s value depends on
	 *
	 */
	getValueDependencies: makeErrorIfMissing("can.getValueDependencies","can-reflect: can not determine dependencies"),

	/**
	 * @function {Object} can-reflect/observe.valueHasDependencies valueHasDependencies
	 * @parent can-reflect/observe
	 * @description  Determine whether the value of an observable object is bound to other events
	 *
	 * @signature `valueHasDependencies(obj)`
	 *
	 * Returns `true` if the computed value of the Value-like object `obj` derives from other values.
	 * Returns `false` if `obj` is computed but does not have dependencies on other objects. If `obj` is not
	 * a computed value, returns `undefined`.
	 *
	 * `obj` *must* implement [can-symbol/symbols/valueHasDependencies @@@@can.valueHasDependencies] to work with
	 * `canReflect.valueHasDependencies`.
	 *
	 * ```
	 * var foo = canCompute( "bar" );
	 * var baz = canCompute(function() {
	 * 	 return foo();
	 * });
	 * var quux = "thud";
	 * var jeek = canCompute(function(plonk) {
	 * 	 if(argument.length) {
	 * 	 	  quux = plonk;
	 * 	 }
	 * 	 return quux;
	 * });
	 *
	 * canReflect.valueHasDependencies(baz);  // -> true
	 * canReflect.valueHasDependencies(jeek);  // -> false
	 * canReflect.valueHasDependencies(foo);  // -> undefined
	 * ```
	 *
	 * @param {Object} obj the object to check for dependencies
	 * @return {Boolean} `true` if there are other dependencies that may update the object's value; `false` otherwise
	 *
	 */
	valueHasDependencies: makeErrorIfMissing("can.valueHasDependencies","can-reflect: can not determine if value has dependencies"),

	// PATCHES
	/**
	 * @function {Object, function(*), String} can-reflect/observe.onPatches onPatches
	 * @parent can-reflect/observe
	 * @description  Register an handler on an observable that listens to any key changes
	 *
	 * @signature `onPatches(obj, handler, [queueName])`
	 *
	 * Register an event handler on the object `obj` that fires when anything changes on an object: a key value is added,
	 * an existing key has is value changed, or a key is deleted from the object.
	 *
	 * If object is an array-like and the changed property includes numeric indexes, patch sets will include array-specific
	 * patches in addition to object-style patches
	 *
	 * For more on the patch formats, see [can-util/js/diff-object/diff-object] and [can-util/js/diff-array/diff-array].
	 *
	 * ```
	 * var obj = new DefineMap({});
	 * var handler = function(patches) {
	 * 	console.log(patches);
	 * };
	 *
	 * canReflect.onPatches(obj, handler);
	 * obj.set("foo", "bar");  // logs [{ type: "add", property: "foo", value: "bar" }]
	 * obj.set("foo", "baz");  // logs [{ type: "set", property: "foo", value: "baz" }]
	 *
	 * var arr = new DefineList([]);
	 * canReflect.onPatches(arr, handler);
	 * arr.push("foo");  // logs [{type: "add", property:"0", value: "foo"},
	 *                            {index: 0, deleteCount: 0, insert: ["foo"]}]
   * arr.pop();  // logs [{type: "remove", property:"0"},
	 *                            {index: 0, deleteCount: 1, insert: []}]
	 * ```
	 *
	 * @param {*} obj
	 * @param {function(*)} handler
	 * @param {String} [queueName] the name of a queue in [can-queues]; dispatches to `handler` will happen on this queue
	 */
	onPatches: makeErrorIfMissing("can.onPatches", "can-reflect: can not observe patches on object"),
	/**
	 * @function {Object, function(*), String} can-reflect/observe.offPatches offPatches
	 * @parent can-reflect/observe
	 * @description  Unregister an object patches handler from an observable object
	 *
	 * @signature `offPatches(obj, handler, [queueName])`
	 *
	 * Unregister an event handler from the object `obj` that had previously been registered with
	 * [can-reflect/observe.onPatches onPatches]. The function passed as `handler` will no longer be called
	 * when `obj` has key or index changes.
	 *
	 * ```
	 * var obj = new DefineMap({});
	 * var handler = function(patches) {
	 * 	console.log(patches);
	 * };
	 *
	 * canReflect.onPatches(obj, handler);
	 * canReflect.offPatches(obj, handler);
	 *
	 * obj.set("foo", "bar");  // nothing is logged
	 * ```
	 *
	 * @param {*} obj
	 * @param {function(*)} handler
	 * @param {String} [queueName] the name of the queue in [can-queues] the handler was registered under
	 */
	offPatches: makeErrorIfMissing("can.offPatches", "can-reflect: can not unobserve patches on object"),

	// HAS BINDINGS VS DOES NOT HAVE BINDINGS
	/**
	 * @function {Object, function(*), String} can-reflect/observe.onInstanceBoundChange onInstanceBoundChange
	 * @parent can-reflect/observe
	 * @description Listen to when observables of a type are bound and unbound.
	 *
	 * @signature `onInstanceBoundChange(Type, handler, [queueName])`
	 *
	 * Register an event handler on the object `Type` that fires when instances of the type become bound (the first handler is added)
	 * or unbound (the last remaining handler is removed). The function passed as `handler` will be called
	 * with the `instance` as the first argument and `true` as the second argument when `instance` gains its first binding,
	 * and called with `false` when `instance` loses its
	 * last binding.
	 *
	 * ```
	 * Person = DefineMap.extend({ ... });
	 *
	 * var person = Person({});
	 * var handler = function(instance, newVal) {
	 * 	console.log(instance, "bound state is now", newVal);
	 * };
	 * var keyHandler = function() {};
	 *
	 * canReflect.onInstanceBoundChange(Person, handler);
	 * canReflect.onKeyValue(obj, "name", keyHandler);  // logs person Bound state is now true
	 * canReflect.offKeyValue(obj, "name", keyHandler);  // logs person Bound state is now false
	 * ```
	 *
	 * @param {function} Type A constructor function
	 * @param {function(*,Boolean)} handler(instance,isBound) A function called with the `instance` whose bound status changed and the state of the bound status.
	 * @param {String} [queueName] the name of a queue in [can-queues]; dispatches to `handler` will happen on this queue
	 */
	onInstanceBoundChange: makeErrorIfMissing("can.onInstanceBoundChange", "can-reflect: can not observe bound state change in instances."),
	/**
	 * @function {Object, function(*), String} can-reflect/observe.offInstanceBoundChange offInstanceBoundChange
	 * @parent can-reflect/observe
	 * @description Stop listening to when observables of a type are bound and unbound.
	 *
	 * @signature `offInstanceBoundChange(Type, handler, [queueName])`
	 *
	 * Unregister an event handler from the type `Type` that had previously been registered with
	 * [can-reflect/observe.onInstanceBoundChange onInstanceBoundChange]. The function passed as `handler` will no longer be called
	 * when instances of `Type` gains its first or loses its last binding.
	 *
	 * ```
	 * Person = DefineMap.extend({ ... });
	 *
	 * var person = Person({});
	 * var handler = function(instance, newVal) {
	 * 	console.log(instance, "bound state is now", newVal);
	 * };
	 * var keyHandler = function() {};
	 *
	 * canReflect.onInstanceBoundChange(Person, handler);
	 * canReflect.offInstanceBoundChange(Person, handler);
	 * canReflect.onKeyValue(obj, "name", keyHandler);  // nothing is logged
	 * canReflect.offKeyValue(obj, "name", keyHandler); // nothing is logged
	 * ```
	 *
	 * @param {function} Type A constructor function
	 * @param {function(*,Boolean)} handler(instance,isBound) The `handler` passed to `canReflect.onInstanceBoundChange`.
	 * @param {String} [queueName] the name of the queue in [can-queues] the handler was registered under
	 */
	offInstanceBoundChange: makeErrorIfMissing("can.offInstanceBoundChange", "can-reflect: can not unobserve bound state change"),
	/**
	 * @function {Object} can-reflect/observe.isBound isBound
	 * @parent can-reflect/observe
	 * @description  Determine whether any listeners are bound to the observable object
	 *
	 * @signature `isBound(obj)`
	 *
	 * `isBound` queries an observable object to find out whether any listeners have been set on it using
	 * [can-reflect/observe.onKeyValue onKeyValue] or [can-reflect/observe.onValue onValue]
	 *
	 * ```
	 * var obj = new DefineMap({});
	 * var handler = function() {};
	 * canReflect.isBound(obj); // -> false
	 * canReflect.onKeyValue(obj, "foo", handler);
	 * canReflect.isBound(obj); // -> true
	 * canReflect.offKeyValue(obj, "foo", handler);
	 * canReflect.isBound(obj); // -> false
	 * ```
	 *
	 * @param {*} obj
	 * @return {Boolean} `true` if obj has at least one key-value or value listener, `false` otherwise
	 */
	isBound: makeErrorIfMissing("can.isBound", "can-reflect: cannot determine if object is bound"),

	// EVENT
	/**
	 * @function {Object, String, function(*)} can-reflect/observe.onEvent onEvent
	 * @parent can-reflect/observe
	 * @description  Register a named event handler on an observable object
	 *
	 * @signature `onEvent(obj, eventName, callback)`
	 *
	 *
	 * Register an event handler on the object `obj` to trigger when the event `eventName` is dispatched.
	 * `obj` *must* implement [can-symbol/symbols/onKeyValue @@@@can.onEvent] or `.addEventListener()` to be compatible
	 * with can-reflect.onKeyValue.  The function passed as `callback` will receive the event descriptor as the first
	 * argument, and any data passed to the event dispatch as subsequent arguments.
	 *
	 * ```
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onEvent(obj, "foo", function(ev, newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * });
	 *
	 * canEvent.dispatch.call(obj, "foo", ["baz", "quux"]);  // -> logs "foo is now baz , was quux"
	 * ```
	 *
	 * @param {Object} obj the object to bind a new event handler to
	 * @param {String} eventName the name of the event to bind the handler to
	 * @param {function(*)} callback  the handler function to bind to the event
	 */
	onEvent: function(obj, eventName, callback, queue){
		if(obj) {
			var onEvent = obj[canSymbol.for("can.onEvent")];
			if(onEvent !== undefined) {
				return onEvent.call(obj, eventName, callback, queue);
			} else if(obj.addEventListener) {
				obj.addEventListener(eventName, callback, queue);
			}
		}
	},
	/**
	 * @function {Object, String, function(*)} can-reflect/observe.offValue offEvent
	 * @parent can-reflect/observe
	 * @description  Unregister an event handler on a MapLike object, based on a key change
	 *
	 * @signature `offKeyValue(obj, eventName, callback)`
	 *
	 * Unregister an event handler from the object `obj` that had previously been registered with
	 * [can-reflect/observe.onEvent onEvent]. The function passed as `callback` will no longer be called
	 * when the event named `eventName` is dispatched on `obj`.
	 *
	 * ```
	 * var obj = new DefineMap({ foo: "bar" });
	 * var handler = function(ev, newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * };
	 *
	 * canReflect.onEvent(obj, "foo", handler);
	 * canReflect.offKeyValue(obj, "foo", handler);
	 *
	 * canEvent.dispatch.call(obj, "foo", ["baz", "quux"]);  // -> nothing is logged
	 * ```
	 *
	 * @param {Object} obj the object to unbind an event handler from
	 * @param {String} eventName the name of the event to unbind the handler from
	 * @param {function(*)} callback the handler function to unbind from the event
	 */
	offEvent: function(obj, eventName, callback, queue){
		if(obj) {
			var offEvent = obj[canSymbol.for("can.offEvent")];
			if(offEvent !== undefined) {
				return offEvent.call(obj, eventName, callback, queue);
			}  else if(obj.removeEventListener) {
				obj.removeEventListener(eventName, callback, queue);
			}
		}

	},
	/**
	 * @function {function} can-reflect/setPriority setPriority
	 * @parent can-reflect/observe
	 * @description  Provide a priority for when an observable that derives its
	 * value should be re-evaluated.
	 *
	 * @signature `setPriority(obj, priority)`
	 *
	 * Calls an underlying `@@can.setPriority` symbol on `obj` if it exists with `priorty`.
	 * Returns `true` if a priority was set, `false` if otherwise.
	 *
	 * Lower priorities (`0` being the lowest), will be an indication to run earlier than
	 * higher priorities.
	 *
	 * ```js
	 * var obj = canReflect.assignSymbols({},{
	 *   "can.setPriority": function(priority){
	 *     return this.priority = priority;
	 *   }
	 * });
	 *
	 * canReflect.setPriority(obj, 0) //-> true
	 * obj.priority //-> 0
	 *
	 * canReflect.setPriority({},20) //-> false
	 * ```
	 *
	 * @param {Object} obj An observable that will update its priority.
	 * @param {Number} priority The priority number.  Lower priorities (`0` being the lowest),
	 * indicate to run earlier than higher priorities.
	 * @return {Boolean} `true` if a priority was able to be set, `false` if otherwise.
	 *
	 * @body
	 *
	 * ## Use
	 *
	 * There's often a need to specify the order of re-evaluation for
	 * __observables__ that derive (or compute) their value from other observables.
	 *
	 * This is needed by templates to avoid unnecessary re-evaluation.  Say we had the following template:
	 *
	 * ```js
	 * {{#if value}}
	 *   {{value}}
	 * {{/if}}
	 * ```
	 *
	 * If `value` became falsey, we'd want the `{{#if}}` to be aware of it before
	 * the `{{value}}` magic tags updated. We can do that by setting priorities:
	 *
	 * ```js
	 * canReflect.setPriority(magicIfObservable, 0);
	 * canReflect.setPriority(magicValueObservable,1);
	 * ```
	 *
	 * Internally, those observables will use that `priority` to register their
	 * re-evaluation with the `derive` queue in [can-queues].
	 *
	 */
	setPriority: function(obj, priority) {
		if(obj) {
			var setPriority =  obj[canSymbol.for("can.setPriority")];
			if(setPriority !== undefined) {
				setPriority.call(obj, priority);
			 	return true;
			}
		}
		return false;
	},
	/**
	 * @function {function} can-reflect/getPriority getPriority
	 * @parent can-reflect/observe
	 * @description  Read the priority for an observable that derives its
	 * value.
	 *
	 * @signature `getPriority(obj)`
	 *
	 * Calls an underlying `@@can.getPriority` symbol on `obj` if it exists
	 * and returns its value. Read [can-reflect/setPriority] for more information.
	 *
	 *
	 *
	 * @param {Object} obj An observable.
	 * @return {Undefined|Number} Returns the priority number if
	 * available, undefined if this object does not support the `can.getPriority`
	 * symbol.
	 *
	 * @body
	 *
	 */
	getPriority: function(obj) {
		if(obj) {
			var getPriority =  obj[canSymbol.for("can.getPriority")];
			if(getPriority !== undefined) {
				return getPriority.call(obj);
			}
		}
		return undefined;
	}
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var canSymbol = __webpack_require__(1);
var typeReflections = __webpack_require__(29);

var getNameSymbol = canSymbol.for("can.getName");

/**
 * @function {Object, String} can-reflect.setName setName
 * @parent can-reflect/shape
 * @description Set a human-readable name of an object.
 *
 * @signature `setName(obj, value)`
 *
 * ```
 * var f = function() {};
 *
 * canReflect.setName(f, "myFunction")
 * f.name //-> "myFunction"
 * ```
 *
 * @param {Object} obj   the object to set on
 * @param {String} value the value to set for the object
 */
function setName(obj, nameGetter) {
	if (typeof nameGetter !== "function") {
		var value = nameGetter;
		nameGetter = function() {
			return value;
		};
	}

	Object.defineProperty(obj, getNameSymbol, {
		value: nameGetter
	});
}

/**
 * @function {Object} can-reflect.getName getName
 * @parent can-reflect/shape
 * @description Get the name of an object.
 *
 * @signature `getValue(obj)`
 *
 * @body
 *
 * The [@@@can.getName](can-symbol/symbols/getName.html) symbol is used to
 * provide objects human readable names; the main goal of these names is to help
 * users get a glance of what the object does and what it is used for.
 *
 * There are no hard rules to define names but CanJS uses the following convention
 * for consistent names across its observable types:
 *
 * - The name starts with the observable constructor name
 * - The constructor name is decorated with the following characters based on its type:
 *		- `<>`: for [value-like](can-reflect.isValueLike.html) observables, e.g: `SimpleObservable<>`
 *		- `[]`: for [list-like](can-reflect.isListLike.html) observables, e.g: `DefineList[]`
 *		- `{}`: for [map-like](can-reflect.isMapLike.html) observables, e.g: `DefineMap{}`
 * - Any property that makes the instance unique (like ids) are printed inside
 *    the chars mentioned before.
 *
 * The example below shows how to implement [@@@can.getName](can-symbol/symbols/getName.html),
 * in a value-like observable (similar to [can-simple-observable]).
 *
 * ```js
 * var canReflect = require("can-reflect");
 *
 * function MySimpleObservable(value) {
 *		this.value = value;
 * }
 *
 * canReflect.assignSymbols(MySimpleObservable.prototype, {
 *		"can.getName": function() {
 *			//!steal-remove-start
 *			var value = JSON.stringify(this.value);
 *			return canReflect.getName(this.constructor) + "<" + value + ">";
 *			//!steal-remove-end
 *		}
 * });
 * ```
 *
 * With that in place, `MySimpleObservable` can be used like this:
 *
 * ```js
 * var one = new MySimpleObservable(1);
 * canReflect.getName(one); // MySimpleObservable<1>
 * ```
 *
 * @param  {Object} obj The object to get from
 * @return {String} The human-readable name of the object
 */
function getName(obj) {
	var nameGetter = obj[getNameSymbol];
	if (nameGetter) {
		return nameGetter.call(obj);
	}

	if (typeof obj === "function") {
		return obj.name; // + "()" // should we do this?
	}

	if (obj.constructor && obj !== obj.constructor) {
		var parent = getName(obj.constructor);
		if (parent) {
			if (typeReflections.isValueLike(obj)) {
				return parent + "<>";
			}

			if (typeReflections.isMoreListLikeThanMapLike(obj)) {
				return parent + "[]";
			}

			if (typeReflections.isMapLike(obj)) {
				return parent + "{}";
			}
		}
	}

	return undefined;
}

module.exports = {
	setName: setName,
	getName: getName
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var shape = __webpack_require__(44);
var CanSymbol = __webpack_require__(1);

function keysPolyfill() {
  var keys = [];
  var currentIndex = 0;

  this.forEach(function(val, key) {
    keys.push(key);
  });

  return {
    next: function() {
      return {
        value: keys[currentIndex],
        done: (currentIndex++ === keys.length)
      };
    }
  }
}

if (typeof Map !== "undefined") {
  shape.assignSymbols(Map.prototype, {
    "can.getOwnEnumerableKeys": Map.prototype.keys,
    "can.setKeyValue": Map.prototype.set,
    "can.getKeyValue": Map.prototype.get,
    "can.deleteKeyValue": Map.prototype["delete"],
    "can.hasOwnKey": Map.prototype.has
  });

  if (typeof Map.prototype.keys !== "function") {
    Map.prototype.keys = Map.prototype[CanSymbol.for("can.getOwnEnumerableKeys")] = keysPolyfill;
  }
}

if (typeof WeakMap !== "undefined") {
  shape.assignSymbols(WeakMap.prototype, {
    "can.getOwnEnumerableKeys": function() {
      throw new Error("can-reflect: WeakMaps do not have enumerable keys.");
    },
    "can.setKeyValue": WeakMap.prototype.set,
    "can.getKeyValue": WeakMap.prototype.get,
    "can.deleteKeyValue": WeakMap.prototype["delete"],
    "can.hasOwnKey": WeakMap.prototype.has
  });
}


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var shape = __webpack_require__(44);
var CanSymbol = __webpack_require__(1);

if (typeof Set !== "undefined") {
  shape.assignSymbols(Set.prototype, {
    "can.isMoreListLikeThanMapLike": true,
    "can.updateValues": function(index, removing, adding) {
      if (removing !== adding) {
        shape.each(
          removing,
          function(value) {
            this.delete(value);
          },
          this
        );
      }
      shape.each(
        adding,
        function(value) {
          this.add(value);
        },
        this
      );
    },
    "can.size": function() {
      return this.size;
    }
  });

  // IE11 doesn't support Set.prototype[@@iterator]
  if (typeof Set.prototype[CanSymbol.iterator] !== "function") {
	  Set.prototype[CanSymbol.iterator] = function() {
		  var arr = [];
		  var currentIndex = 0;

		  this.forEach(function(val) {
			  arr.push(val);
		  });

		  return {
			  next: function() {
				  return {
					  value: arr[currentIndex],
					  done: (currentIndex++ === arr.length)
				  };
			  }
		  }
	  };
  }
}
if (typeof WeakSet !== "undefined") {
  shape.assignSymbols(WeakSet.prototype, {
    "can.isListLike": true,
    "can.isMoreListLikeThanMapLike": true,
    "can.updateValues": function(index, removing, adding) {
      if (removing !== adding) {
        shape.each(
          removing,
          function(value) {
            this.delete(value);
          },
          this
        );
      }
      shape.each(
        adding,
        function(value) {
          this.add(value);
        },
        this
      );
    },
    "can.size": function() {
      throw new Error("can-reflect: WeakSets do not have enumerable keys.");
    }
  });
}


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var globals = __webpack_require__(28);

// This module depends on isNode being defined
__webpack_require__(123);

/**
 * @module {function} can-globals/is-browser-window/is-browser-window is-browser-window
 * @parent can-globals/modules
 * @signature `isBrowserWindow()`
 *
 * Returns `true` if the code is running within a Browser window. Use this function if you need special code paths for when running in a Browser window, a Web Worker, or another environment (such as Node.js).
 *
 * ```js
 * var isBrowserWindow = require("can-globals/is-browser-window/is-browser-window");
 * var GLOBAL = require("can-globals/global/global");
 *
 * if(isBrowserWindow()) {
 *   console.log(GLOBAL() === window); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if the environment is a Browser window.
 */

globals.define('isBrowserWindow', function(){
	var isNode = globals.getKeyValue('isNode');
	return typeof window !== "undefined" &&
		typeof document !== "undefined" &&
		isNode === false;
});

module.exports = globals.makeExport('isBrowserWindow');


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var globals = __webpack_require__(28);

/**
 * @module {function} can-globals/is-node/is-node is-node
 * @parent can-globals/modules
 * @description Determines if your code is running in [Node.js](https://nodejs.org).
 * @signature `isNode()`
 *
 * ```js
 * var isNode = require("can-globals/is-node/is-node");
 * var GLOBAL = require("can-globals/global/global");
 *
 * if(isNode()) {
 *   console.log(GLOBAL() === global); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if running in Node.js
 */

globals.define('isNode', function(){
	return typeof process === "object" &&
		{}.toString.call(process) === "[object process]";
});

module.exports = globals.makeExport('isNode');

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domEvents = __webpack_require__(13);
var domData = __webpack_require__(22);
var domMatches = __webpack_require__(125);
var each = __webpack_require__(6);
var isEmptyObject = __webpack_require__(16);
var canCid = __webpack_require__(7);

var dataName = "delegateEvents";

// Some events do not bubble, so delegating them requires registering the handler in the
// capturing phase.
// http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
var useCapture = function(eventType) {
	return eventType === 'focus' || eventType === 'blur';
};

/**
 * @module {events} can-util/dom/events/delegate/delegate delegateEvents
 * @parent can-util/dom/events/events
 *
 * Add delegate listeners to DOM events.  Delegated listeners use a selector on an
 * ancestor element to determine when to fire the event for an item.  This can help
 * cases where large numbers of similar DOM nodes are added into a DOM subtree, since
 * event handlers do not have to be attached to each new node.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/delegate/delegate");
 * var el = document.createElement("div");
 * var sub = document.createElement("div");
 * sub.className = "foo"
 * el.appendChild(sub);
 *
 * function delegateEventsHandler() {
 *  console.log("delegate event fired");
 * }
 *
 * events.addDelegateListener.call(el, "click", ".foo", delegateEventsHandler, false);
 *
 * events.removeDelegateListener.call(el, "click", ".foo", delegateEventsHandler);
 * ```
 */
var handleEvent = function (overrideEventType, ev) {
	var events = domData.get.call(this, dataName);
	var eventTypeEvents = events[overrideEventType || ev.type];
	// contains the element and the handlers to call back
	var matches = [];

	if(eventTypeEvents) {
		var selectorDelegates = [];
		// convert eventTypeEvents from an object to
		// an array.
		each(eventTypeEvents, function(delegates){
			selectorDelegates.push(delegates);
		});

		// walk from the target to the delegate element
		// checking each selector
		var cur = ev.target;
		do {
			selectorDelegates.forEach(function(delegates){
				if (domMatches.call(cur, delegates[0].selector )) {
					matches.push({
						target: cur,
						delegates: delegates
					});
				}
			});
			cur = cur.parentNode;
		} while (cur && cur !== ev.currentTarget);
	}

	// make sure `cancelBubble` is  set
	var oldStopProp = ev.stopPropagation;
	ev.stopPropagation = function() {
		oldStopProp.apply(this, arguments);
		this.cancelBubble = true;
	};

	for(var i = 0; i < matches.length; i++) {
		var match = matches[i];
		var delegates = match.delegates;

		for(var d = 0, dLen = delegates.length; d < dLen; d++) {
			if (delegates[d].handler.call(match.target, ev) === false) {
				return false;
			}
			if (ev.cancelBubble) {
				return;
			}
		}
	}
};

/**
 * @function can-util/dom/events/delegate/delegate.addDelegateListener events.addDelegateListener
 * @parent can-util/dom/events/delegate/delegate
 * @signature `events.addDelegateListener(eventType, selector, handler)`
 * @param {String} eventType The type of the event to virtually bind to delegates
 * @param {String} selector  A CSS selector that matches all intended delegates
 * @param {function(event)} handler   The function to call when the event is dispatched
 *
 * Add an event as in [can-util/dom/events/events.addEventListener addEventListener] but with a selector
 * matching child nodes ("delegates") for which the event should fire.
 *
 * Delegate events are limited to firing in the bubble phase.
 */
domEvents.addDelegateListener = function(eventType, selector, handler) {
	var events = domData.get.call(this, dataName),
		eventTypeEvents;

	if (!events) {
		domData.set.call(this, dataName, events = {});
	}

	// if the first of that event type, bind
	if (!(eventTypeEvents = events[eventType])) {
		eventTypeEvents = events[eventType] = {};

		var delegateHandler = handleEvent.bind(this, eventType);
		domData.set.call(this, canCid(handler), delegateHandler);
		domEvents.addEventListener.call(this, eventType, delegateHandler, useCapture(eventType));
	}

	if (!eventTypeEvents[selector]) {
		eventTypeEvents[selector] = [];
	}

	eventTypeEvents[selector].push({
		handler: handler,
		selector: selector
	});
};

/**
 * @function can-util/dom/events/delegate/delegate.removeDelegateListener events.removeDelegateListener
 * @parent can-util/dom/events/delegate/delegate
 * @signature `events.removeDelegateListener(eventType, selector, handler)`
 * @param {String} eventType The type of the event to unbind
 * @param {String} selector  A CSS selector that matches a delegate selector added for this event type
 * @param {function(event)} handler   The function bound as handler when the listener was added
 *
 * Remove a delegated event added by in [can-util/dom/delegate/delegate.addDelegateListener addDelegateListener]
 */
domEvents.removeDelegateListener = function(eventType, selector, handler) {
	var events = domData.get.call(this, dataName);

	if (events && events[eventType] && events[eventType][selector]) {
		var eventTypeEvents = events[eventType],
			delegates = eventTypeEvents[selector],
			i = 0;

		// remove the matching eventType/selector/handler
		while (i < delegates.length) {
			if (delegates[i].handler === handler) {
				delegates.splice(i, 1);
			} else {
				i++;
			}
		}
		// if there are no more selectors, remove the selector
		if(delegates.length === 0) {
			delete eventTypeEvents[selector];
			// if there are no more events for that eventType, unbind
			if(isEmptyObject(eventTypeEvents)) {
				var delegateHandler = domData.get.call(this, canCid(handler));
				domEvents.removeEventListener.call(this, eventType, delegateHandler, useCapture(eventType));
				delete events[eventType];
				if(isEmptyObject(events)) {
					domData.clean.call(this, dataName);
				}
			}
		}
	}
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchesMethod = function(element) {
	return element.matches || element.webkitMatchesSelector || element.webkitMatchesSelector ||
		element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector;
};

module.exports = function(){
	var method = matchesMethod(this);
	return method ? method.apply(this, arguments) : false;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Based on jQuery v3.2.1 https://jquery.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 */

var domEvents = __webpack_require__(13),
	singleRef = __webpack_require__(24),
	cid = __webpack_require__(127);

// Some mouse/pointer events do not bubble so we derive these events from other
// bubbling events so they work with delegated listeners

var eventMap = {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	},
	classMap = {
		mouseenter: "MouseEvent",
		mouseleave: "MouseEvent",
		pointerenter: "PointerEvent",
		pointerleave: "PointerEvent"
	},
	_addDelegateListener = domEvents.addDelegateListener,
	_removeDelegateListener = domEvents.removeDelegateListener;


domEvents.addDelegateListener = function(eventType, selector, handler) {
	if (eventMap[eventType] !== undefined) {
		var origHandler = handler,
			origType = eventType;

		eventType = eventMap[eventType];
		handler = function(event) {
			var target = this,
				related = event.relatedTarget;

			// For mouseenter/leave call the handler if related is outside the target.
			// No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !target.contains(related)) ) {
				// get new event with correct event type
				var eventClass = classMap[origType];

				if (eventClass === 'MouseEvent') {
					var newEv = document.createEvent(eventClass);
					newEv.initMouseEvent(origType, false, false, event.view, event.detail, event.screenX, event.screenY,
						event.clientX, event.clientY, event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, event.button,
						event.relatedTarget);
					event = newEv;
				} else if (eventClass === 'PointerEvent') {
					event = new PointerEvent(origType, event);
				}

				return origHandler.call(this, event);
			}
		};

		singleRef.set(origHandler, cid(this)+eventType, handler);
	}

	_addDelegateListener.call(this, eventType, selector, handler);
};

domEvents.removeDelegateListener = function(eventType, selector, handler) {
	if (eventMap[eventType] !== undefined) {
		eventType = eventMap[eventType];
		handler = singleRef.getAndDelete(handler, cid(this)+eventType);
	}

	_removeDelegateListener.call(this, eventType, selector, handler);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CID = __webpack_require__(7);
var domDataState = __webpack_require__(45);

module.exports = function(obj){
	if(typeof obj.nodeType === "number") {
		return domDataState.cid.call(obj);
	} else {
		var type = typeof obj;
		var isObject = type !== null && (type === "object" || type === "function");
		return type+":"+( isObject ? CID(obj) : obj );
	}
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module {function} can-util/js/is-promise-like/is-promise-like is-promise-like
 * @parent can-util/js
 * @signature `isPromiseLike(obj)`
 *
 * Determines if an object is "Then-able".
 * Also see `isPromise(obj)` which checks for a standard [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 *
 * ```js
 * var isPromiseLike = require("can-util/js/is-promise-like/is-promise-like");
 *
 * var promise = new Promise(function(resolve){
 *   resolve();
 * });
 *
 * console.log(isPromiseLike(promise)); // -> true
 * console.log(isPromiseLike("foo bar")); // -> false
 * ```
 *
 * @param {Object} obj An object to be tested.
 * @return {Boolean} True if the object is a Promise.
 */
module.exports = function(obj){
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);
var dev = __webpack_require__(21);

var Observation = __webpack_require__(4);
var CID = __webpack_require__(7);
var assign = __webpack_require__(3);
var canEvent = __webpack_require__(11);
var singleReference = __webpack_require__(24);

var getValueSymbol = canSymbol.for("can.getValue"),
	getKeyValueSymbol = canSymbol.for("can.getKeyValue"),
	onValueSymbol = canSymbol.for("can.onValue"),
	onKeyValueSymbol = canSymbol.for("can.onKeyValue"),
	offKeyValueSymbol = canSymbol.for("can.offKeyValue"),
	observeDataSymbol = canSymbol.for("can.observeData");

var promiseDataPrototype = {
	isPending: true,
	state: "pending",
	isResolved: false,
	isRejected: false,
	value: undefined,
	reason: undefined
};
assign(promiseDataPrototype, canEvent);
canReflect.set(promiseDataPrototype, onKeyValueSymbol, function(key, handler) {
	var observeData = this;
	var translated = function() {
		handler(observeData[key]);
	};
	singleReference.set(handler, this, translated, key);
	canEvent.on.call(this, "state", translated);
});
canReflect.set(promiseDataPrototype, offKeyValueSymbol, function(key, handler) {
	var translated = singleReference.getAndDelete(handler, this, key);
	canEvent.off.call(this, "state", translated);
});

function initPromise(promise) {
	var observeData = promise[observeDataSymbol];
	if(!observeData) {
		Object.defineProperty(promise, observeDataSymbol, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: Object.create(promiseDataPrototype)
		});
		observeData = promise[observeDataSymbol];
		CID(observeData);
	}
	promise.then(function(value){
		observeData.isPending = false;
		observeData.isResolved = true;
		observeData.value = value;
		observeData.state = "resolved";
		observeData.dispatch("state",["resolved","pending"]);
	}, function(reason){
		observeData.isPending = false;
		observeData.isRejected = true;
		observeData.reason = reason;
		observeData.state = "rejected";
		observeData.dispatch("state",["rejected","pending"]);

		//!steal-remove-start
		dev.error("Failed promise:", reason);
		//!steal-remove-end
	});
}

function setupPromise(value) {
	var oldPromiseFn;
	var proto = "getPrototypeOf" in Object ? Object.getPrototypeOf(value) : value.__proto__; //jshint ignore:line

	if(value[getKeyValueSymbol] && value[observeDataSymbol]) {
		// promise has already been set up.  Don't overwrite.
		return;
	}

	if(proto === null || proto === Object.prototype) {
		// promise type is a plain object or dictionary.  Set up object instead of proto.
		proto = value;

		if(typeof proto.promise === "function") {
			// Duck-type identification as a jQuery.Deferred;
			// In that case, the promise() function returns a new object
			//  that needs to be decorated.
			oldPromiseFn = proto.promise;
			proto.promise = function() {
				var result = oldPromiseFn.call(proto);
				setupPromise(result);
				return result;
			};
		}
	}

	// For conciseness and ES5 compatibility, the key/value pairs of the symbols
	// and their respective values for proto are a list, and every other iteration
	// in forEach sets a symbol to a value.
	[getKeyValueSymbol,
	function(key) {
		if(!this[observeDataSymbol]) {
			initPromise(this);
		}
		
		Observation.add(this[observeDataSymbol], "state");
		switch(key) {
			case "state":
			case "isPending":
			case "isResolved":
			case "isRejected":
			case "value":
			case "reason":
			return this[observeDataSymbol][key];
			default:
			return this[key];
		}
	}, 
	getValueSymbol,
	function() {
		return this[getKeyValueSymbol]("value");
	}, canSymbol.for("can.isValueLike"), false,
	onValueSymbol,
	function(handler) {
		return this[onKeyValueSymbol]("value", handler);
	},
	onKeyValueSymbol,
	function(key, handler) {
		if(!this[observeDataSymbol]) {
			initPromise(this);
		}
		var promise = this;
		var translated = function() {
			handler(promise[getKeyValueSymbol](key));
		};
		singleReference.set(handler, this, translated, key);
		canEvent.on.call(this[observeDataSymbol], "state", translated);
	},
	canSymbol.for("can.offValue"),
	function(handler) {
		return this[offKeyValueSymbol]("value", handler);
	},
	offKeyValueSymbol,
	function(key, handler) {
		var translated = singleReference.getAndDelete(handler, this, key);
		if(translated) {
			canEvent.off.call(this[observeDataSymbol], "state", translated);
		}
	}].forEach(function(symbol, index, list) {
		if(index % 2 === 0) {
			canReflect.set(proto, symbol, list[index + 1]);
		}
	});
}

module.exports = setupPromise;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * @module {function} can-util/js/defaults/defaults defaults
 * @parent can-util/js
 * @signature `defaults(target, [ ... sources])`
 *
 * Mimics [_.defaults](https://lodash.com/docs/4.16.2#defaults). Assigns first level properties in sources from left to
 * right if they are not already defined.
 *
 * ```js
 * var defaults = require("can-util/js/defaults/defaults");
 *
 * var obj = {a: 1, b: 2};
 * var src = {b: 3, c: 3};
 *
 * assign(obj, src, {a: 2, d: 4});
 *
 * console.log(obj); // -> {a: 1, b: 2, c: 3, d: 4}
 * ```
 *
 * @param {Object} target The destination object. This object's properties will be mutated based on the objects provided as [ ... sources].
 * @param {Object} [ ... sources] The source objects whose own properties will be applied to `target`.
 *
 * @return {Object} Returns the `target` argument.
 */

module.exports = function (target) {
	var length = arguments.length;
	for (var i = 1; i < length; i++) {
		for (var prop in arguments[i]) {
			if (target[prop] === undefined) {
				target[prop] = arguments[i][prop];
			}
		}
	}
	return target;
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = function(str){
	switch(str) {
		case "NaN":
		case "Infinity":
			return +str;
		case "null":
			return null;
		case "undefined":
			return undefined;
		case "true":
		case "false":
			return str === "true";
		default:
			var val = +str;
			if(!isNaN(val)) {
				return val;
			} else {
				return str;
			}
	}
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var canReflect = __webpack_require__(0);
var canBatch = __webpack_require__(12);
var Observation = __webpack_require__(4);
var CID = __webpack_require__(7);
var ns = __webpack_require__(2);

/**
 * @module {function} can-simple-observable
 * @parent can-observables
 * @collection can-infrastructure
 * @package ./package.json
 * @description Create an observable value.
 *
 * @signature `observable(initialValue)`
 *
 * Creates an observable value that can be read, written, and observed using [can-reflect].
 *
 * @param {*} initialValue The initial value of the observable.
 *
 * @return {can-simple-observable} The observable.
 *
 * @body
 *
 * ## Use
 *
 * ```js
 *  var obs = observable('one');
 *
 *  canReflect.getValue(obs); // -> "one"
 *
 *  canReflect.setValue(obs, 'two');
 *  canReflect.getValue(obs); // -> "two"
 *
 *  function handler(newValue) {
 *    // -> "three"
 *  };
 *  canReflect.onValue(obs, handler);
 *  canReflect.setValue(obs, 'three');
 *
 *  canReflect.offValue(obs, handler);
 * ```
 */
module.exports = ns.simpleObservable = function simpleObservable(initialValue) {
	var value = initialValue;
	var handlers = [];

	var fn = function(newValue) {
		if(arguments.length) {
			value = newValue;
			handlers.forEach(function(handler) {
				canBatch.queue([handler, fn, [newValue]]);
			}, this);
		} else {
			Observation.add(fn);
			return value;
		}
	};

	CID(fn);

	canReflect.assignSymbols(fn, {
		'can.onValue': function(handler) {
			handlers.push(handler);
		},
		'can.offValue': function(handler) {
			var index = handlers.indexOf(handler);
			handlers.splice(index, 1);
		},
		'can.setValue': function(newValue) {
			return fn(newValue);
		},
		'can.getValue': function() {
			return fn();
		}
	});

	return fn;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var define = __webpack_require__(62);
var canBatch = __webpack_require__(12);
var canEvent = __webpack_require__(11);
var canReflect = __webpack_require__(0);


var defineHelpers = {
	defineExpando: function(map, prop, value) {
		// first check if it's already a constructor define
		var constructorDefines = map._define.definitions;
		if(constructorDefines && constructorDefines[prop]) {
			return;
		}
		// next if it's already on this instances
		var instanceDefines = map._instanceDefinitions;
		if(!instanceDefines) {
			Object.defineProperty(map, "_instanceDefinitions", {
				configurable: true,
				enumerable: false,
				value: {}
			});
			instanceDefines = map._instanceDefinitions;
		}
		if(!instanceDefines[prop]) {
			var defaultDefinition = map._define.defaultDefinition || {type: define.types.observable};
			define.property(map, prop, defaultDefinition, {},{});
			// possibly convert value to List or DefineMap
			map._data[prop] = defaultDefinition.type ? defaultDefinition.type(value) : define.types.observable(value);
			instanceDefines[prop] = defaultDefinition;
			canBatch.start();
			canEvent.dispatch.call(map, {
				type: "__keys",
				target: map
			});
			if(map._data[prop] !== undefined) {
				canEvent.dispatch.call(map, {
					type: prop,
					target: map
				},[map._data[prop], undefined]);
			}
			canBatch.stop();
			return true;
		}
	},
	reflectSerialize: function(unwrapped){
		var constructorDefinitions = this._define.definitions;
		var defaultDefinition = this._define.defaultDefinition;
		this.each(function(val, name){
			var propDef = constructorDefinitions[name];

			if(propDef && typeof propDef.serialize === "function") {
				val = propDef.serialize.call(this, val, name);
			}
			else if(defaultDefinition && typeof defaultDefinition.serialize === "function") {
				val =  defaultDefinition.serialize.call(this, val, name);
			} else {
				val = canReflect.serialize(val);
			}
			if(val !== undefined) {
				unwrapped[name] = val;
			}
		}, this);
		return unwrapped;
	},
	reflectUnwrap: function(unwrapped){
		this.forEach(function(value, key){
			if(value !== undefined) {
				unwrapped[key] = canReflect.unwrap(value);
			}
		});
		return unwrapped;
	}
};
module.exports = defineHelpers;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

/* jshint undef: false */

var parser = __webpack_require__(49);
var viewCallbacks = __webpack_require__(72);

var HTMLSectionBuilder = __webpack_require__(136);
var TextSectionBuilder = __webpack_require__(161);
var mustacheCore = __webpack_require__(52);
var mustacheHelpers = __webpack_require__(38);
__webpack_require__(162);
var getIntermediateAndImports = __webpack_require__(163);
var makeRendererConvertScopes = __webpack_require__(19).makeRendererConvertScopes;

var attributeEncoder = __webpack_require__(71);
var dev = __webpack_require__(5);
var namespace = __webpack_require__(2);
var DOCUMENT = __webpack_require__(9);
var assign = __webpack_require__(3);
var last = __webpack_require__(33);
var importer = __webpack_require__(164);
// Make sure that we can also use our modules with Stache as a plugin

__webpack_require__(75);
__webpack_require__(20);

if(!viewCallbacks.tag("content")) {
	// This was moved from the legacy view/scanner.js to here.
	// This makes sure content elements will be able to have a callback.
	viewCallbacks.tag("content", function(el, tagData) {
		return tagData.scope;
	});
}

var wrappedAttrPattern = /[{(].*[)}]/;
var colonWrappedAttrPattern = /^on:|(:to|:from|:bind)$|.*:to:on:.*/;
var svgNamespace = "http://www.w3.org/2000/svg";
var namespaces = {
	"svg": svgNamespace,
	// this allows a partial to start with g.
	"g": svgNamespace
},
	textContentOnlyTag = {style: true, script: true};

function stache (filename, template) {
	if (arguments.length === 1) {
		template = arguments[0];
		filename = undefined;
	}

	var inlinePartials = {};

	// Remove line breaks according to mustache's specs.
	if(typeof template === "string") {
		template = mustacheCore.cleanWhitespaceControl(template);
		template = mustacheCore.cleanLineEndings(template);
	}

	// The HTML section that is the root section for the entire template.
	var section = new HTMLSectionBuilder(filename),
		// Tracks the state of the parser.
		state = {
			node: null,
			attr: null,
			// A stack of which node / section we are in.
			// There is probably a better way of doing this.
			sectionElementStack: [],
			// If text should be inserted and HTML escaped
			text: false,
			// which namespace we are in
			namespaceStack: [],
			// for style and script tags
			// we create a special TextSectionBuilder and add things to that
			// when the element is done, we compile the text section and
			// add it as a callback to `section`.
			textContentOnly: null

		},

		// This function is a catch all for taking a section and figuring out
		// how to create a "renderer" that handles the functionality for a
		// given section and modify the section to use that renderer.
		// For example, if an HTMLSection is passed with mode `#` it knows to
		// create a liveBindingBranchRenderer and pass that to section.add.
		makeRendererAndUpdateSection = function(section, mode, stache, lineNo){

			if(mode === ">") {
				// Partials use liveBindingPartialRenderers
				section.add(mustacheCore.makeLiveBindingPartialRenderer(stache, copyState(), lineNo));

			} else if(mode === "/") {

				var createdSection = section.last();
				if ( createdSection.startedWith === "<" ) {
					inlinePartials[ stache ] = section.endSubSectionAndReturnRenderer();
					section.removeCurrentNode();
				} else {
					section.endSection();
				}

				if(section instanceof HTMLSectionBuilder) {
					//!steal-remove-start
					var last = state.sectionElementStack[state.sectionElementStack.length - 1];
					if (last.tag && last.type === "section" && stache !== "" && stache !== last.tag) {
						if (filename) {
							dev.warn(filename + ":" + lineNo + ": unexpected closing tag {{/" + stache + "}} expected {{/" + last.tag + "}}");
						}
						else {
							dev.warn(lineNo + ": unexpected closing tag {{/" + stache + "}} expected {{/" + last.tag + "}}");
						}
					}
					//!steal-remove-end

					state.sectionElementStack.pop();
				}
			} else if(mode === "else") {

				section.inverse();

			} else {

				// If we are an HTMLSection, we will generate a
				// a LiveBindingBranchRenderer; otherwise, a StringBranchRenderer.
				// A LiveBindingBranchRenderer function processes
				// the mustache text, and sets up live binding if an observable is read.
				// A StringBranchRenderer function processes the mustache text and returns a
				// text value.
				var makeRenderer = section instanceof HTMLSectionBuilder ?
					mustacheCore.makeLiveBindingBranchRenderer:
					mustacheCore.makeStringBranchRenderer;

				if(mode === "{" || mode === "&") {

					// Adds a renderer function that just reads a value or calls a helper.
					section.add(makeRenderer(null,stache, copyState(), lineNo));

				} else if(mode === "#" || mode === "^" || mode === "<") {
					// Adds a renderer function and starts a section.
					var renderer = makeRenderer(mode, stache, copyState(), lineNo);
					section.startSection(renderer);
					section.last().startedWith = mode;

					// If we are a directly nested section, count how many we are within
					if(section instanceof HTMLSectionBuilder) {
						//!steal-remove-start
						var tag = typeof renderer.exprData.closingTag === 'function' ?
							renderer.exprData.closingTag() : '';
						//!steal-remove-end

						state.sectionElementStack.push({
							type: "section",
							//!steal-remove-start
							tag: tag
							//!steal-remove-end
						});
					}
				} else {
					// Adds a renderer function that only updates text.
					section.add(makeRenderer(null, stache, copyState({text: true}), lineNo));
				}

			}
		},
		// Copys the state object for use in renderers.
		copyState = function(overwrites){
			var lastElement = state.sectionElementStack[state.sectionElementStack.length - 1];
			var cur = {
				tag: state.node && state.node.tag,
				attr: state.attr && state.attr.name,
				// <content> elements should be considered direclty nested
				directlyNested: state.sectionElementStack.length ?
					lastElement.type === "section" || lastElement.type === "custom": true,
				textContentOnly: !!state.textContentOnly
			};
			return overwrites ? assign(cur, overwrites) : cur;
		},
		addAttributesCallback = function(node, callback){
			if( !node.attributes ) {
				node.attributes = [];
			}
			node.attributes.unshift(callback);
		};

	parser(template, {
		filename: filename,
		start: function(tagName, unary, lineNo){
			var matchedNamespace = namespaces[tagName];

			if (matchedNamespace && !unary ) {
				state.namespaceStack.push(matchedNamespace);
			}

			// either add templates: {} here or check below and decorate
			// walk up the stack/targetStack until you find the first node
			// with a templates property, and add the popped renderer
			state.node = {
				tag: tagName,
				children: [],
				namespace: matchedNamespace || last(state.namespaceStack)
			};
		},
		end: function(tagName, unary, lineNo){
			var isCustomTag =  viewCallbacks.tag(tagName);

			if(unary){
				// If it's a custom tag with content, we need a section renderer.
				section.add(state.node);
				if(isCustomTag) {
					addAttributesCallback(state.node, function(scope, options, parentNodeList){
						//!steal-remove-start
						scope.set('scope.lineNumber', lineNo);
						//!steal-remove-end
						viewCallbacks.tagHandler(this,tagName, {
							scope: scope,
							options: options,
							subtemplate: null,
							templateType: "stache",
							parentNodeList: parentNodeList
						});
					});
				}
			} else {
				section.push(state.node);

				state.sectionElementStack.push({
					type: isCustomTag ? "custom" : null,
					tag: isCustomTag ? null : tagName,
					templates: {}
				});

				// If it's a custom tag with content, we need a section renderer.
				if( isCustomTag ) {
					section.startSubSection();
				} else if(textContentOnlyTag[tagName]) {
					state.textContentOnly = new TextSectionBuilder();
				}
			}


			state.node =null;

		},
		close: function(tagName, lineNo) {
			var matchedNamespace = namespaces[tagName];

			if (matchedNamespace  ) {
				state.namespaceStack.pop();
			}

			var isCustomTag = viewCallbacks.tag(tagName),
				renderer;

			if( isCustomTag ) {
				renderer = section.endSubSectionAndReturnRenderer();
			}

			if(textContentOnlyTag[tagName]) {
				section.last().add(state.textContentOnly.compile(copyState()));
				state.textContentOnly = null;
			}

			var oldNode = section.pop();
			if( isCustomTag ) {
				if (tagName === "can-template") {
					// If we find a can-template we want to go back 2 in the stack to get it's inner content
					// rather than the <can-template> element itself
					var parent = state.sectionElementStack[state.sectionElementStack.length - 2];
					parent.templates[oldNode.attrs.name] = makeRendererConvertScopes(renderer);
					section.removeCurrentNode();
				} else {
					// Get the last element in the stack
					var current = state.sectionElementStack[state.sectionElementStack.length - 1];
					addAttributesCallback(oldNode, function(scope, options, parentNodeList){
						//!steal-remove-start
						scope.set('scope.lineNumber', lineNo);
						//!steal-remove-end
						viewCallbacks.tagHandler(this,tagName, {
							scope: scope,
							options: options,
							subtemplate: renderer  ? makeRendererConvertScopes(renderer) : renderer,
							templateType: "stache",
							parentNodeList: parentNodeList,
							templates: current.templates
						});
					});
				}
			}
			state.sectionElementStack.pop();
		},
		attrStart: function(attrName, lineNo){
			if(state.node.section) {
				state.node.section.add(attrName+"=\"");
			} else {
				state.attr = {
					name: attrName,
					value: ""
				};
			}

		},
		attrEnd: function(attrName, lineNo){
			if(state.node.section) {
				state.node.section.add("\" ");
			} else {
				if(!state.node.attrs) {
					state.node.attrs = {};
				}

				state.node.attrs[state.attr.name] =
					state.attr.section ? state.attr.section.compile(copyState()) : state.attr.value;

				var attrCallback = viewCallbacks.attr(attrName);

				//!steal-remove-start
				var decodedAttrName = attributeEncoder.decode(attrName);
				var weirdAttribute = !!wrappedAttrPattern.test(decodedAttrName) || !!colonWrappedAttrPattern.test(decodedAttrName);
				if (weirdAttribute && !attrCallback) {
					dev.warn("unknown attribute binding " + decodedAttrName + ". Is can-stache-bindings imported?");
				}
				//!steal-remove-end

				if(attrCallback) {
					if( !state.node.attributes ) {
						state.node.attributes = [];
					}
					state.node.attributes.push(function(scope, options, nodeList){
						//!steal-remove-start
						scope.set('scope.lineNumber', lineNo);
						//!steal-remove-end
						attrCallback(this,{
							attributeName: attrName,
							scope: scope,
							options: options,
							nodeList: nodeList
						});
					});
				}

				state.attr = null;
			}
		},
		attrValue: function(value, lineNo){
			var section = state.node.section || state.attr.section;
			if(section){
				section.add(value);
			} else {
				state.attr.value += value;
			}
		},
		chars: function(text, lineNo) {
			(state.textContentOnly || section).add(text);
		},
		special: function(text, lineNo){
			var firstAndText = mustacheCore.splitModeFromExpression(text, state, lineNo),
				mode = firstAndText.mode,
				expression = firstAndText.expression;


			if(expression === "else") {
				var inverseSection;
				if(state.attr && state.attr.section) {
					inverseSection = state.attr.section;
				} else if(state.node && state.node.section ) {
					inverseSection = state.node.section;
				} else {
					inverseSection = state.textContentOnly || section;
				}
				inverseSection.inverse();
				return;
			}

			if(mode === "!") {
				return;
			}

			if(state.node && state.node.section) {

				makeRendererAndUpdateSection(state.node.section, mode, expression, lineNo);

				if(state.node.section.subSectionDepth() === 0){
					state.node.attributes.push( state.node.section.compile(copyState()) );
					delete state.node.section;
				}

			}
			// `{{}}` in an attribute like `class="{{}}"`
			else if(state.attr) {

				if(!state.attr.section) {
					state.attr.section = new TextSectionBuilder();
					if(state.attr.value) {
						state.attr.section.add(state.attr.value);
					}
				}
				makeRendererAndUpdateSection(state.attr.section, mode, expression, lineNo);

			}
			// `{{}}` in a tag like `<div {{}}>`
			else if(state.node) {

				if(!state.node.attributes) {
					state.node.attributes = [];
				}
				if(!mode) {
					state.node.attributes.push(mustacheCore.makeLiveBindingBranchRenderer(null, expression, copyState(), lineNo));
				} else if( mode === "#" || mode === "^" ) {
					if(!state.node.section) {
						state.node.section = new TextSectionBuilder();
					}
					makeRendererAndUpdateSection(state.node.section, mode, expression, lineNo);
				} else {
					throw new Error(mode+" is currently not supported within a tag.");
				}
			}
			else {
				makeRendererAndUpdateSection(state.textContentOnly || section, mode, expression, lineNo);
			}
		},
		comment: function(text) {
			// create comment node
			section.add({
				comment: text
			});
		},
		done: function(lineNo){}
	});

	var renderer = section.compile();
	var scopifiedRenderer = HTMLSectionBuilder.scopify(function( scope, optionsScope, nodeList ) {
		if( Object.keys( inlinePartials ).length ) {
			optionsScope.inlinePartials = optionsScope.inlinePartials || {};
			assign( optionsScope.inlinePartials, inlinePartials );
		}

		// allow the current renderer to be called with {{>scope.view}}
		scope.set('scope.view', scopifiedRenderer);

		// allow reading from the root context using {{scope.root.<whatever>}}
		scope.set('scope.root', scope._context);

		//!steal-remove-start
		scope.set('scope.filename', section.filename);
		//!steal-remove-end

		return renderer.apply( this, arguments );
	});
	return scopifiedRenderer;
}

// At this point, can.stache has been created
assign(stache, mustacheHelpers);

stache.safeString = function(text){
	return {
		toString: function () {
			return text;
		}
	};
};
stache.async = function(source){
	var iAi = getIntermediateAndImports(source);
	var importPromises = iAi.imports.map(function(moduleName){
		return importer(moduleName);
	});
	return Promise.all(importPromises).then(function(){
		return stache(iAi.intermediate);
	});
};
var templates = {};
stache.from = mustacheCore.getTemplateById = function(id){
	if(!templates[id]) {
		var el = DOCUMENT().getElementById(id);
		templates[id] = stache("#" + id, el.innerHTML);
	}
	return templates[id];
};

stache.registerPartial = function(id, partial) {
	templates[id] = (typeof partial === "string" ? stache(partial) : partial);
};

module.exports = namespace.stache = stache;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//var canDev = require("can-log/dev/dev");

/**
 * @module can-util/js/global/global global
 * @parent deprecated
 * @description Deprecated. Use [can-globals] instead.
 */

//!steal-remove-start
// canDev.warn('js/global/global is deprecated; please use can-globals instead: https://github.com/canjs/can-globals');
//!steal-remove-end

module.exports = __webpack_require__(17);


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var target = __webpack_require__(75);
var Scope = __webpack_require__(51);
var Observation = __webpack_require__(4);

var utils = __webpack_require__(19);
var mustacheCore = __webpack_require__(52);

var getDocument = __webpack_require__(9);

var assign = __webpack_require__(3);
var last = __webpack_require__(33);

var decodeHTML = typeof document !== "undefined" && (function(){
	var el = getDocument().createElement('div');
	return function(html){
		if(html.indexOf("&") === -1) {
			return html.replace(/\r\n/g,"\n");
		}
		el.innerHTML = html;
		return el.childNodes.length === 0 ? "" : el.childNodes.item(0).nodeValue;
	};
})();
// ## HTMLSectionBuilder
//
// Contains a stack of HTMLSections.
// An HTMLSection is created everytime a subsection is found. For example:
//
//     {{#if(items)}} {{#items}} X
//
// At the point X was being processed, there would be 2 HTMLSections in the
// stack.  One for the content of `{{#if(items)}}` and the other for the
// content of `{{#items}}`
var HTMLSectionBuilder = function(filename){
	if (filename) {
		this.filename = filename;
	}
	this.stack = [new HTMLSection()];
};

HTMLSectionBuilder.scopify = function(renderer) {
	return Observation.ignore(function(scope, options, nodeList){
		if ( !(scope instanceof Scope) ) {
			scope = Scope.refsScope().add(scope || {});
		}
		if ( !(options instanceof mustacheCore.Options) ) {
			options = new mustacheCore.Options(options || {});
		}
		return renderer(scope, options, nodeList);
	});
};

assign(HTMLSectionBuilder.prototype,utils.mixins);

assign(HTMLSectionBuilder.prototype,{
	startSubSection: function(process){
		var newSection = new HTMLSection(process);
		this.stack.push(newSection);
		return newSection;
	},
	// Ends the current section and returns a renderer.
	// But only returns a renderer if there is a template.
	endSubSectionAndReturnRenderer: function(){
		if(this.last().isEmpty()) {
			this.stack.pop();
			return null;
		} else {
			var htmlSection = this.endSection();
			return htmlSection.compiled.hydrate.bind(htmlSection.compiled);
		}
	},
	startSection: function( process ) {
		var newSection = new HTMLSection(process);
		this.last().add(newSection.targetCallback);
		// adding a section within a section ...
		// the stack has section ...
		this.stack.push(newSection);
	},
	endSection: function(){
		this.last().compile();
		return this.stack.pop();
	},
	inverse: function(){
		this.last().inverse();
	},
	compile: function(){
		var compiled = this.stack.pop().compile();
		// ignore observations here.  the render fn
		//  itself doesn't need to be observable.
		return Observation.ignore(function(scope, options, nodeList){
			if ( !(scope instanceof Scope) ) {
				scope = Scope.refsScope().add(scope || {});
			}
			if ( !(options instanceof mustacheCore.Options) ) {
				options = new mustacheCore.Options(options || {});
			}
			return compiled.hydrate(scope, options, nodeList);
		});
	},
	push: function(chars){
		this.last().push(chars);
	},
	pop: function(){
		return this.last().pop();
	},
	removeCurrentNode: function() {
		this.last().removeCurrentNode();
	}
});

var HTMLSection = function(process){
	this.data = "targetData";
	this.targetData = [];
	// A record of what targetData element we are within.
	this.targetStack = [];
	var self = this;
	this.targetCallback = function(scope, options, sectionNode){
		process.call(this,
			scope,
			options,
			sectionNode,
			self.compiled.hydrate.bind(self.compiled),
			self.inverseCompiled && self.inverseCompiled.hydrate.bind(self.inverseCompiled)  ) ;
	};
};
assign(HTMLSection.prototype,{
	inverse: function(){
		this.inverseData = [];
		this.data = "inverseData";
	},
	// Adds a DOM node.
	push: function(data){
		this.add(data);
		this.targetStack.push(data);
	},
	pop: function(){
		return this.targetStack.pop();
	},
	add: function(data){
		if(typeof data === "string"){
			data = decodeHTML(data);
		}
		if(this.targetStack.length) {
			last(this.targetStack).children.push(data);
		} else {
			this[this.data].push(data);
		}
	},
	compile: function(){
		this.compiled = target(this.targetData, getDocument());
		if(this.inverseData) {
			this.inverseCompiled = target(this.inverseData, getDocument());
			delete this.inverseData;
		}
		this.targetStack = this.targetData = null;
		return this.compiled;
	},
	removeCurrentNode: function() {
		var children = this.children();
		return children.pop();
	},
	children: function(){
		if(this.targetStack.length) {
			return last(this.targetStack).children;
		} else {
			return this[this.data];
		}
	},
	// Returns if a section is empty
	isEmpty: function(){
		return !this.targetData.length;
	}
});
HTMLSectionBuilder.HTMLSection = HTMLSection;

module.exports = HTMLSectionBuilder;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var events = __webpack_require__(13);
var isOfGlobalDocument = __webpack_require__(50);
var domData = __webpack_require__(22);
var getMutationObserver = __webpack_require__(23);
var assign = __webpack_require__(58);
var domDispatch = __webpack_require__(30);

var originalAdd = events.addEventListener,
	originalRemove = events.removeEventListener;

/**
 * @module {events} can-util/dom/events/attributes/attributes attributes
 * @parent can-util/dom/events/events
 *
 * Adds a listenable "attributes" event to DOM nodes, which fires when
 * the node's attributes change.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/attributes/attributes");
 * var el = document.createElement("div");
 *
 * function attributesHandler() {
 * 	console.log("attributes event fired");
 * }
 *
 * events.addEventListener.call(el, "attributes", attributesHandler, false);
 *
 * events.removeEventListener.call(el, "attributes", attributesHandler);
 * ```
 */
events.addEventListener = function(eventName){
	if(eventName === "attributes") {
		var MutationObserver = getMutationObserver();
		if( isOfGlobalDocument(this) && MutationObserver ) {
			var existingObserver = domData.get.call(this, "canAttributesObserver");
			if (!existingObserver) {
				var self = this;
				var observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						var copy = assign({}, mutation);
						domDispatch.call(self, copy, [], false);
					});

				});
				observer.observe(this, {
					attributes: true,
					attributeOldValue: true
				});
				domData.set.call(this, "canAttributesObserver", observer);
			}
		} else {
			domData.set.call(this, "canHasAttributesBindings", true);
		}
	}
	return originalAdd.apply(this, arguments);

};

events.removeEventListener = function(eventName){
	if(eventName === "attributes") {
		var MutationObserver = getMutationObserver();
		var observer;

		if(isOfGlobalDocument(this) && MutationObserver) {
			observer = domData.get.call(this, "canAttributesObserver");

			if (observer && observer.disconnect) {
				observer.disconnect();
				domData.clean.call(this, "canAttributesObserver");
			}
		} else {
			domData.clean.call(this, "canHasAttributesBindings");
		}
	}
	return originalRemove.apply(this, arguments);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var makeMutationEvent = __webpack_require__(77);

/**
 * @module {events} can-util/dom/events/inserted/inserted inserted
 * @parent can-util/dom/events/events
 *  
 * This event fires when the bound element is added to the DOM.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/inserted/inserted");
 *
 * var foo = document.createElement("div");
 *
 * var log = function() { console.log("inserted event fired"); }
 * events.addEventListener.call(foo, "inserted", log);
 *
 * document.body.appendChild(foo); // inserted event fired
 */
makeMutationEvent("inserted", "addedNodes");


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var SimpleMap = __webpack_require__(140);

var TemplateContext = function() {
	this.vars = new SimpleMap({});
};

module.exports = TemplateContext;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var Construct = __webpack_require__(57);
var canEvent = __webpack_require__(11);
var canBatch = __webpack_require__(12);
var assign = __webpack_require__(3);
var each = __webpack_require__(6);
var types = __webpack_require__(25);
var Observation = __webpack_require__(4);
var canReflect = __webpack_require__(0);
var singleReference = __webpack_require__(24);
var CIDMap = __webpack_require__(34);

// this is a very simple can-map like object
var SimpleMap = Construct.extend(
	{
		// ### setup
		// A setup function for the instantiation of a simple-map.
		setup: function(initialData){
			this._data = {};
			this.attr(initialData);
		},
		// ### attr
		// The main get/set interface simple-map.
		// Either sets or gets one or more properties depending on how it is called.
		attr: function(prop, value) {
			var self = this;

			if(arguments.length === 0 ) {
				Observation.add(this,"__keys");
				var data = {};
				each(this._data, function(value, prop){
					Observation.add(this, prop);
					data[prop] = value;
				}, this);
				return data;
			}
			else if(arguments.length > 1) {
				var had = this._data.hasOwnProperty(prop);
				var old = this._data[prop];
				this._data[prop] = value;
				canBatch.start();
				if(!had) {
					canEvent.dispatch.call(this, "__keys", []);
				}
				canEvent.dispatch.call(this, prop, [value, old]);
				canBatch.stop();
			}
			// 1 argument
			else if(typeof prop === 'object') {
				canReflect.eachKey(prop, function(value, key) {
					self.attr(key, value);
				});
			}
			else {
				if(prop !== "constructor") {
					Observation.add(this, prop);
					return this._data[prop];
				}

				return this.constructor;
			}
		},
		serialize: function(){
			return canReflect.serialize(this, CIDMap);
		},
		get: function(){
			return this.attr.apply(this, arguments);
		},
		set: function(){
			return this.attr.apply(this, arguments);
		}
	});

assign(SimpleMap.prototype, canEvent);

if(!types.DefaultMap) {
	types.DefaultMap = SimpleMap;
}


canReflect.assignSymbols(SimpleMap.prototype,{
	// -type-
	"can.isMapLike": true,
	"can.isListLike": false,
	"can.isValueLike": false,

	// -get/set-
	"can.getKeyValue": SimpleMap.prototype.get,
	"can.setKeyValue": SimpleMap.prototype.set,
	"can.deleteKeyValue": function(prop) {
		return this.attr(prop, undefined);
	},


	// -shape
	"can.getOwnEnumerableKeys": function(){
		Observation.add(this, '__keys');
		return Object.keys(this._data);
	},

	// -shape get/set-
	"can.assignDeep": function(source){
		canBatch.start();
		// TODO: we should probably just throw an error instead of cleaning
		canReflect.assignMap(this, source);
		canBatch.stop();
	},
	"can.updateDeep": function(source){
		canBatch.start();
		// TODO: we should probably just throw an error instead of cleaning
		canReflect.updateMap(this, source);
		canBatch.stop();
	},
	// observable
	"can.onKeyValue": function(key, handler){
		var translationHandler = function(ev, newValue, oldValue){
			handler.call(this, newValue, oldValue);
		};
		singleReference.set(handler, this, translationHandler, key);

		this.addEventListener(key, translationHandler);
	},
	"can.offKeyValue": function(key, handler){
		this.removeEventListener(key, singleReference.getAndDelete(handler, this, key) );
	},
	"can.keyHasDependencies": function(key) {
		return false;
	},
	"can.getKeyDependencies": function(key) {
		return undefined;
	}
});

// Setup other symbols


module.exports = SimpleMap;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observation = __webpack_require__(4);
var observeReader = __webpack_require__(31);
var makeCompute = __webpack_require__(10);
var assign = __webpack_require__(3);
var isFunction = __webpack_require__(27);
var canBatch = __webpack_require__(12);
var CID = __webpack_require__(7);
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);




// The goal of this is to create a high-performance compute that represents a key value from can.view.Scope.
// If the key value is something like {{name}} and the context is a can.Map, a faster
// binding path will be used where new rebindings don't need to be looked for with every change of
// the observable property.
// However, if the property changes to a compute, then the slower `can.compute.read` method of
// observing values will be used.

// ideally, we would know the order things were read.  If the last thing read
// was something we can observe, and the value of it matched the value of the observation,
// and the key matched the key of the observation
// it's a fair bet that we can just listen to that last object.
// If the `this` is not that object ... freak out.  Though `this` is not necessarily part of it.  can-observation could make
// this work.
var getFastPathRoot = function(computeData){
	if( computeData.reads &&
				// a single property read
				computeData.reads.length === 1 ) {
		var root = computeData.root;
		if( root && root[canSymbol.for("can.getValue")] ) {
			root = canReflect.getValue(root);
		}
		// on a map
		return root && canReflect.isObservableLike(root) && canReflect.isMapLike(root) &&
			// that isn't calling a function
			!isFunction(root[computeData.reads[0].key]) && root;
	}
	return;
};

var isEventObject = function(obj){
	return obj && typeof obj.batchNum === "number" && typeof obj.type === "string";
};


// could we make this an observation first ... and have a getter for the compute?

// This is a fast-path enabled Observation wrapper use many places in can-stache.
// The goal of this is to:
//
// 1.  Make something that can be passed to can-view-live directly, hopefully
//     avoiding creating expensive computes.  Instead we will only be creating
//     `ScopeKeyData` which are thin wrappers.
//
// 2. Support the old "computeData" data type structure. If someone reads the
//    .compute property, they will get a compute that behaves the same way.
//
// 3. We should begin eliminating creating computes in as many places as possible
//    within CanJS code.  All of our helpers should be made to work with "faster"
//    observable values: Observation -> ScopeKeyData -> Compute -> compute
var ScopeKeyData = function(scope, key, options){
	CID(this);
	this.startingScope = scope;
	this.key = key;
	this.observation = new Observation(this.read, this);
	this.options = assign({ observation: this.observation }, options);
	this.handlers = [];
	this.dispatchHandler = this.dispatch.bind(this);

	// things added later
	this.fastPath = undefined;
	this.root = undefined;
	this.initialValue = undefined;
	this.reads = undefined;
	this.setRoot = undefined;
};
// have things bind to this, not the underlying observation.  This makes it
// so performance optimizations will work.
ScopeKeyData.prototype.getValue = function(){
	Observation.add(this);
	return this.getObservationValue();
};
ScopeKeyData.prototype.getObservationValue = Observation.ignore(function(){
	return this.observation.get();
});
// this is used by the Observation.
// We use the observation for `getValue`
ScopeKeyData.prototype.read = function(){
	if (this.root) {
		// if we've figured out a root observable, start reading from there
		return observeReader.read(this.root, this.reads, this.options).value;
	}
	// If the key has not already been located in a observable then we need to search the scope for the
	// key.  Once we find the key then we need to return it's value and if it is found in an observable
	// then we need to store the observable so the next time this compute is called it can grab the value
	// directly from the observable.
	var data = this.startingScope.read(this.key, this.options);
	this.scope = data.scope;
	this.reads = data.reads;
	this.root = data.rootObserve;
	this.setRoot = data.setRoot;
	return this.initialValue = data.value;
};
ScopeKeyData.prototype.setValue = function(newVal){
	var root = this.root || this.setRoot;
	if(root) {
		observeReader.write(root, this.reads, newVal, this.options);
	} else {
		this.startingScope.set(this.key, newVal, this.options);
	}
};
ScopeKeyData.prototype.hasDependencies = function(){
	return this.observation.hasDependencies();
};

var canOnValue = canSymbol.for("can.onValue"),
	canOffValue = canSymbol.for("can.offValue");
canReflect.set(ScopeKeyData.prototype, canOnValue, function(handler){
	if(!this.handlers.length) {
		canReflect.onValue(this.observation, this.dispatchHandler);
		// TODO: we should check this sometime in the background.
		var fastPathRoot = getFastPathRoot(this);
		if( fastPathRoot ) {
			// rewrite the observation to call its event handlers

			var self = this,
				observation = this.observation;

			this.fastPath = true;
			// there won't be an event in the future ...
			observation.dependencyChange = function(target, newVal, altNewValue){
				if(isEventObject(newVal)) {
					newVal = altNewValue;
				}
				// but I think we will be able to get at it b/c there should only be one
				// dependency we are binding to ...
				if(target === fastPathRoot && typeof newVal !== "function") {
					this.newVal = newVal;
				} else {
					// restore
					observation.dependencyChange = Observation.prototype.dependencyChange;
					observation.start = Observation.prototype.start;
					self.fastPath = false;
				}

				return Observation.prototype.dependencyChange.call(this, target, newVal, altNewValue);
			};
			observation.start = function(){
				this.value = this.newVal;
			};

		}
	}
	this.handlers.push(handler);
});

// Does this need to use the event queue?
ScopeKeyData.prototype.dispatch = function(){
	var handlers = this.handlers.slice(0);
	for(var i = 0, len = handlers.length; i < len; i++) {
		canBatch.batchNum = this.observation.batchNum;
		handlers[i].apply(this, arguments);
	}
};

canReflect.set(ScopeKeyData.prototype, canOffValue, function(handler){
	var index = this.handlers.indexOf(handler);
	this.handlers.splice(index, 1);
	if(!this.handlers.length) {
		canReflect.offValue(this.observation, this.dispatchHandler);

		this.observation.dependencyChange = Observation.prototype.dependencyChange;
		this.observation.start = Observation.prototype.start;
	}
});

canReflect.set(ScopeKeyData.prototype, canSymbol.for("can.getValue"), ScopeKeyData.prototype.getValue);

canReflect.set(ScopeKeyData.prototype, canSymbol.for("can.setValue"), ScopeKeyData.prototype.setValue);

canReflect.set(ScopeKeyData.prototype, canSymbol.for("can.valueHasDependencies"), ScopeKeyData.prototype.hasDependencies);



// once a compute is read, cache it
Object.defineProperty(ScopeKeyData.prototype,"compute",{
	get: function(){
		var scopeKeyData = this;
		var compute = makeCompute(undefined,{
			on: function(updater) {
				scopeKeyData[canOnValue](updater);
				// this uses a lot of inside knowledge
				this.value = scopeKeyData.observation.value;
			},
			off: function(updater){
				scopeKeyData[canOffValue](updater);
			},
			get: function(){
				return scopeKeyData.observation.get();
			},
			set: function(newValue){
				return scopeKeyData.setValue(newValue);
			}
		});
		// this is important so it will always call observation.get
		// This is something that should be "fixed" somehow for everything
		// related to observations.
		compute.computeInstance.observation = this.observation;
		compute.computeInstance._canObserve = false;
		Object.defineProperty(this, "compute", {
			value: compute,
			writable: false,
			configurable: false
		});
		return compute;
	},
	configurable: true
});





module.exports = function(scope, key, options){
	return new ScopeKeyData(scope, key, options || {
		args: []
	});

};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDocument = __webpack_require__(9),
	childNodes = __webpack_require__(18);
// fragment.js
// ---------
// _DOM Fragment support._
var fragmentRE = /^\s*<(\w+)[^>]*>/,
	toString = {}.toString,
	fragment = function (html, name, doc) {
		if (name === undefined) {
			name = fragmentRE.test(html) && RegExp.$1;
		}
		if (html && toString.call(html.replace) === "[object Function]") {
			// Fix "XHTML"-style tags in all browsers
			html = html.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, '<$1></$2>');
		}
		var container = doc.createElement('div'),
			temp = doc.createElement('div');
		// IE's parser will strip any `<tr><td>` tags when `innerHTML`
		// is called on a `tbody`. To get around this, we construct a
		// valid table with a `tbody` that has the `innerHTML` we want.
		// Then the container is the `firstChild` of the `tbody`.
		// [source](http://www.ericvasilik.com/2006/07/code-karma.html).
		if (name === 'tbody' || name === 'tfoot' || name === 'thead' || name === 'colgroup') {
			temp.innerHTML = '<table>' + html + '</table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
		} else if (name === 'col') {
			temp.innerHTML = '<table><colgroup>' + html + '</colgroup></table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
		} else if (name === 'tr') {
			temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
		} else if (name === 'td' || name === 'th') {
			temp.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild.firstChild;
		} else if (name === 'option') {
			temp.innerHTML = '<select>' + html + '</select>';
			container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
		} else {
			container.innerHTML = '' + html;
		}
		// IE8 barfs if you pass slice a `childNodes` object, so make a copy.
		var tmp = {},
			children = childNodes( container );
		tmp.length = children.length;
		for (var i = 0; i < children.length; i++) {
			tmp[i] = children[i];
		}
		return [].slice.call(tmp);
	};
var buildFragment = function (html, doc) {
	if(html && html.nodeType === 11) {
		return html;
	}
	if(!doc) {
		doc = getDocument();
	} else if(doc.length) {
		doc = doc[0];
	}

	var parts = fragment(html, undefined, doc),
		frag = (doc || document).createDocumentFragment();
	for(var i = 0, length = parts.length; i < length; i++) {
		frag.appendChild(parts[i]);
	}
	return frag;
};

// ## Fix build fragment.
// In IE8, we can pass a fragment and it removes newlines.
// This checks for that and replaces can.buildFragment with something
// that if only a single text node is returned, returns a fragment with
// a text node that is set to the content.


module.exports = buildFragment;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var makeMutationEvent = __webpack_require__(77);

/**
 * @module {events} can-util/dom/events/removed/removed removed
 * @parent can-util/dom/events/events
 *  
 * This event fires when the bound element is detached or destroyed.
 *
 * ```js
 * var events = require("can-util/dom/events/events");
 * require("can-util/dom/events/removed/removed");
 *
 * var foo = document.createElement("div");
 * document.body.appendChild(foo);
 *
 * var log = function() { console.log("removed event fired"); }
 * events.addEventListener.call(foo, "removed", log);
 *
 * document.body.removeChild(foo); // remove event fired
 */
makeMutationEvent("removed", "removedNodes");


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var attr = __webpack_require__(32);
var live = __webpack_require__(26);
var canReflect = __webpack_require__(0);
/**
 * @function can-view-live.attr attr
 * @parent can-view-live
 *
 * @signature `live.attr(el, attributeName, compute)`
 *
 * Keep an attribute live to a [can-compute].
 *
 * ```js
 * var div = document.createElement('div');
 * var compute = canCompute("foo bar");
 * live.attr(div,"class", compute);
 * ```
 *
 * @param {HTMLElement} el The element whos attribute will be kept live.
 * @param {String} attributeName The attribute name.
 * @param {can-compute} compute The compute.
 *
 */
live.attr = function(el, attributeName, compute){
	// #### live.attr
	// Bind a single attribute on an element to a compute
	live.listen(el, compute, function (newVal) {
		// when compute gets a new value, set the attribute
		//  to the new value
		attr.set(el, attributeName, newVal);
	});
	// do initial set of attribute as well
	attr.set(el, attributeName, canReflect.getValue(compute));
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// This provides live binding for stache attributes.
var live = __webpack_require__(26);
var viewCallbacks = __webpack_require__(72);
var attr = __webpack_require__(32);
var domEvents = __webpack_require__(13);
var types = __webpack_require__(25);
var canReflect = __webpack_require__(0);

live.attrs = function(el, compute, scope, options) {

	if(!canReflect.isObservableLike(compute)) {
		// Non-live case (`compute` was not a compute):
		//  set all attributes on the element and don't
		//  worry about setting up live binding since there
		//  is not compute to bind on.
		var attrs = live.getAttributeParts(compute);
		for(var name in attrs) {
			attr.set(el, name, attrs[name]);
		}
		return;
	}

	// last set of attributes
	var oldAttrs = {};

	// set up a callback for handling changes when the compute
	// changes
	var setAttrs = function (newVal) {
		var newAttrs = live.getAttributeParts(newVal),
			name;
		for(name in newAttrs) {
			var newValue = newAttrs[name],
				// `oldAttrs` was set on the last run of setAttrs in this context
				//  (for this element and compute)
				oldValue = oldAttrs[name];
			// Only fire a callback
			//  if the value of the attribute has changed
			if(newValue !== oldValue) {
				// set on DOM attributes (dispatches an "attributes" event as well)
				attr.set(el, name, newValue);
				// get registered callback for attribute name and fire
				var callback = viewCallbacks.attr(name);
				if(callback) {
					callback(el, {
						attributeName: name,
						scope: scope,
						options: options
					});
				}
			}
			// remove key found in new attrs from old attrs
			delete oldAttrs[name];
		}
		// any attrs left at this point are not set on the element now,
		// so remove them.
		for(name in oldAttrs) {
			attr.remove(el, name);
		}
		oldAttrs = newAttrs;
	};

	var handler = function (newVal) {
		setAttrs(newVal);
	};

	// set attributes on any change to the compute
	canReflect.onValue(compute, handler);

	var teardownHandler = function() {
		canReflect.offValue(compute, handler);
		domEvents.removeEventListener.call(el, 'removed', teardownHandler);
	};
	// unbind on element removal
	domEvents.addEventListener.call(el, 'removed', teardownHandler);

	// set up a current attribute set and assign to oldAttrs
	setAttrs(canReflect.getValue(compute));
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(26);
var nodeLists = __webpack_require__(20);
var makeFrag = __webpack_require__(36);
var makeArray = __webpack_require__(15);
var childNodes = __webpack_require__(18);
var canReflect = __webpack_require__(0);

/**
 * @function can-view-live.html html
 * @parent can-view-live
 * @release 2.0.4
 *
 * Live binds a compute's value to a collection of elements.
 *
 * @signature `live.html(el, compute, [parentNode])`
 *
 * `live.html` is used to setup incremental live-binding on a block of html.
 *
 * ```js
 * // a compute that changes its list
 * var greeting = compute(function(){
 *   return "Welcome <i>"+me.attr("name")+"</i>"
 * });
 *
 * var placeholder = document.createTextNode(" ");
 * $("#greeting").append(placeholder);
 *
 * live.html(placeholder, greeting);
 * ```
 *
 * @param {HTMLElement} el An html element to replace with the live-section.
 *
 * @param {can.compute} compute A [can.compute] whose value is HTML.
 *
 * @param {HTMLElement} [parentNode] An overwritable parentNode if `el`'s parent is
 * a documentFragment.
 *
 *
 */
live.html = function (el, compute, parentNode, nodeList) {
	var data,
		makeAndPut,
		nodes;

	// prefer to manipulate el's actual parent over the supplied parent
	parentNode = live.getParentNode(el, parentNode);
	data = live.listen(parentNode, compute, function (newVal) {
		// the attachment point for the nodelist
		var attached = nodeLists.first(nodes).parentNode;
		// update the nodes in the DOM with the new rendered value
		if (attached) {
			makeAndPut(newVal);
		}
		var pn = nodeLists.first(nodes).parentNode;
		data.teardownCheck(pn);
		live.callChildMutationCallback(pn);
	});

	// Nodes registered to the live operation, either a list of nodes or a single element
	nodes = nodeList || [el];
	makeAndPut = function (val) {
		// ##### makeandput
		// Receives the compute output (must be some DOM representation or a function)
		var isFunction = typeof val === "function",
			// translate val into a document fragment if it's DOM-like
			frag = makeFrag(isFunction ? "" : val),
			// previous set of nodes
			oldNodes = makeArray(nodes);

		// Add a placeholder textNode if necessary.
		live.addTextNodeIfNoChildren(frag);

		// Mark each node as belonging to the node list.
		oldNodes = nodeLists.update(nodes, childNodes(frag));
		if(isFunction) {
			val(frag.firstChild);
		}
		// DOM replace old nodes with new frag (which might contain some old nodes)
		nodeLists.replace(oldNodes, frag);
	};

	data.nodeList = nodes;

	// register the span so nodeLists knows the parentNodeList
	if(!nodeList) {
		nodeLists.register(nodes, data.teardownCheck);
	} else {
		nodeList.unregistered = data.teardownCheck;
	}
	// Finally give the subtree an initial value
	makeAndPut(canReflect.getValue(compute));
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(26);
var queueFns = __webpack_require__(148);

var nodeLists = __webpack_require__(20);
var makeCompute = __webpack_require__(10);
var canBatch = __webpack_require__(12);

var frag = __webpack_require__(36);
var domMutate = __webpack_require__(35);
var childNodes = __webpack_require__(18);

var makeArray = __webpack_require__(15);
var each = __webpack_require__(6);
var isFunction = __webpack_require__(27);
var diff = __webpack_require__(76);
var splice = [].splice;
var Compute = __webpack_require__(68);
var canReflect = __webpack_require__(0);

// #### renderAndAddToNodeLists
// a helper function that renders something and adds its nodeLists to newNodeLists
// in the right way for stache.
var renderAndAddToNodeLists = function(newNodeLists, parentNodeList, render, context, args){
	var itemNodeList = [];

	if(parentNodeList) {
		// With a supplied parent list, "directly" register the new nodeList
		//  as a child.
		nodeLists.register(itemNodeList,null, parentNodeList, true);
		itemNodeList.parentList = parentNodeList;
		itemNodeList.expression = "#each SUBEXPRESSION";
	}

	// call the renderer, passing in the new nodeList as the last argument
	var itemHTML = render.apply(context, args.concat([itemNodeList])),
	// and put the output into a document fragment
		itemFrag = frag(itemHTML);

	// get all the direct children of the frag
	var children = makeArray(childNodes(itemFrag));
	if(parentNodeList) {
		// if a parent list was supplied, children of the frag become the
		//  child nodeList items.
		nodeLists.update(itemNodeList, children);
		newNodeLists.push(itemNodeList);
	} else {
		// If no parent nodeList, register the new array of frag children as a nodeList
		//  and push into the nodeLists
		newNodeLists.push(nodeLists.register(children));
	}
	return itemFrag;
},
// #### removeFromNodeList
// a splicing helper for nodeLists, which removes sublists, including unregistering,
//  for a contiguous slice of the master list.
removeFromNodeList = function(masterNodeList, index, length){
	var removedMappings = masterNodeList.splice(index + 1, length),
		itemsToRemove = [];
	each(removedMappings, function (nodeList) {

		// Unregister to free up event bindings.
		var nodesToRemove = nodeLists.unregister(nodeList);

		// add items that we will remove all at once
		[].push.apply(itemsToRemove, nodesToRemove);
	});
	return itemsToRemove;
},
// #### addFalseyIfEmpty
// Add the results of redering the "falsey" or inverse case render to the
// master nodeList and the DOM if the live list is empty
addFalseyIfEmpty = function(list, falseyRender, masterNodeList, nodeList){
	if(falseyRender && list.length === 0){
		// If there are no items ... we should render the falsey template
		var falseyNodeLists = [];
		var falseyFrag = renderAndAddToNodeLists(falseyNodeLists, nodeList, falseyRender, list, [list]);

		// put the frag after the reference element in the associated nodeList
		nodeLists.after([masterNodeList[0]], falseyFrag);
		// and push the first element onto the master list
		masterNodeList.push(falseyNodeLists[0]);
	}
};

/**
 * @function can-view-live.list list
 * @parent can-view-live
 * @release 2.0.4
 *
 * @signature `live.list(el, list, render, context, [parentNode])`
 *
 * Live binds a compute's list incrementally.
 *
 * ```js
 * // a compute that change's it's list
 * var todos = compute(function(){
 *   return new Todo.List({page: can.route.attr("page")})
 * })
 *
 * var placeholder = document.createTextNode(" ");
 * $("ul#todos").append(placeholder);
 *
 * can.view.live.list(
 *   placeholder,
 *   todos,
 *   function(todo, index){
 *     return "<li>"+todo.attr("name")+"</li>"
 *   });
 * ```
 *
 * @param {HTMLElement} el An html element to replace with the live-section.
 *
 * @param {can-compute|can-list|can-define/list/list} list An observable list type.
 *
 * @param {function(this:*,*,index):String} render(index, index) A function that when called with
 * the incremental item to render and the index of the item in the list.
 *
 * @param {Object} context The `this` the `render` function will be called with.
 *
 * @param {HTMLElement} [parentNode] An overwritable parentNode if `el`'s parent is
 * a documentFragment.
 *
 *
 */
live.list = function (el, compute, render, context, parentNode, nodeList, falseyRender) {
	// A nodeList of all elements this live-list manages.
	// This is here so that if this live list is within another section
	// that section is able to remove the items in this list.
	var masterNodeList = nodeList || [el],
		// A mapping of items to their indices
		indexMap = [],
		// True once all previous events have been fired
		afterPreviousEvents = false,
		// Indicates that we should not be responding to changes in the list.
		// It's possible that the compute change causes this list behavior to be torn down.
		// However that same "change" dispatch will eventually fire the updateList handler because
		// the list of "change" handlers is copied when dispatching starts.
		// A 'perfect' fix would be to use linked lists for event handlers.
		isTornDown = false,
		// Called when items are added to the list.
		add = function add (ev, items, index) {

			if (!afterPreviousEvents) {
				return;
			}
			// Collect new html and mappings
			var frag = text.ownerDocument.createDocumentFragment(),
				newNodeLists = [],
				newIndicies = [];
			// For each new item,
			each(items, function (item, key) {

				var itemIndex = new Compute(key + index),
					itemCompute = new Compute(function(newVal){
						if(arguments.length) {
							if("set" in list) {
								list.set(itemIndex.get(), newVal);
							} else {
								list.attr(itemIndex.get(), newVal);
							}
						} else {
							return item;
						}
					}),
					itemFrag = renderAndAddToNodeLists(newNodeLists, nodeList, render, context, [itemCompute, itemIndex]);

				// Hookup the fragment (which sets up child live-bindings) and
				// add it to the collection of all added elements.
				frag.appendChild(itemFrag);
				// track indicies;
				newIndicies.push(itemIndex);
			});
			// The position of elements is always after the initial text placeholder node
			var masterListIndex = index+1;

			// remove falsey if there's something there
			if(!indexMap.length) {
				// remove all leftover things
				var falseyItemsToRemove = removeFromNodeList(masterNodeList, 0, masterNodeList.length - 1);
				nodeLists.remove(falseyItemsToRemove);
			}

			// Check if we are adding items at the end
			if (!masterNodeList[masterListIndex]) {
				nodeLists.after(masterListIndex === 1 ? [text] : [nodeLists.last(masterNodeList[masterListIndex - 1])], frag);
			} else {
				// Add elements before the next index's first element.
				var el = nodeLists.first(masterNodeList[masterListIndex]);
				domMutate.insertBefore.call(el.parentNode, frag, el);
			}
			splice.apply(masterNodeList, [
				masterListIndex,
				0
			].concat(newNodeLists));

			// update indices after insert point
			splice.apply(indexMap, [
				index,
				0
			].concat(newIndicies));

			for (var i = index + newIndicies.length, len = indexMap.length; i < len; i++) {
				indexMap[i].set(i);
			}
			if(ev.callChildMutationCallback !== false) {
				live.callChildMutationCallback(text.parentNode);
			}

		},
		// Called when an item is set with .attr
		set = function set (ev, newVal, index) {
			remove({}, { length: 1 }, index, true);
			add({}, [newVal], index);
		},
		// Called when items are removed or when the bindings are torn down.
		remove = function remove (ev, items, index, duringTeardown, fullTeardown) {

			if (!afterPreviousEvents) {
				return;
			}
			// If this is because an element was removed, we should
			// check to make sure the live elements are still in the page.
			// If we did this during a teardown, it would cause an infinite loop.
			if (!duringTeardown && data.teardownCheck(text.parentNode)) {
				return;
			}
			if(index < 0) {
				index = indexMap.length + index;
			}
			var itemsToRemove = removeFromNodeList(masterNodeList, index, items.length);

			// update indices after remove point
			indexMap.splice(index, items.length);
			for (var i = index, len = indexMap.length; i < len; i++) {
				indexMap[i].set(i);
			}

			// don't remove elements during teardown.  Something else will probably be doing that.
			if(!fullTeardown) {
				// adds the falsey section if the list is empty
				addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
				nodeLists.remove(itemsToRemove);
				if(ev.callChildMutationCallback !== false) {
					live.callChildMutationCallback(text.parentNode);
				}
			} else {
				nodeLists.unregister(masterNodeList);
			}
		},
		move = function move (ev, item, newIndex, currentIndex) {
			if (!afterPreviousEvents) {
				return;
			}
			// The position of elements is always after the initial text
			// placeholder node
			newIndex = newIndex + 1;
			currentIndex = currentIndex + 1;

			var referenceNodeList = masterNodeList[newIndex];
			var movedElements = frag( nodeLists.flatten(masterNodeList[currentIndex]) );
			var referenceElement;

			// If we're moving forward in the list, we want to be placed before
			// the item AFTER the target index since removing the item from
			// the currentIndex drops the referenceItem's index. If there is no
			// nextSibling, insertBefore acts like appendChild.
			if (currentIndex < newIndex) {
				referenceElement = nodeLists.last(referenceNodeList).nextSibling;
			} else {
				referenceElement = nodeLists.first(referenceNodeList);
			}

			var parentNode = masterNodeList[0].parentNode;

			// Move the DOM nodes into the proper location
			parentNode.insertBefore(movedElements, referenceElement);

			// Now, do the same for the masterNodeList. We need to keep it
			// in sync with the DOM.

			// Save a reference to the "node" that we're manually moving
			var temp = masterNodeList[currentIndex];

			// Remove the movedItem from the masterNodeList
			[].splice.apply(masterNodeList, [currentIndex, 1]);

			// Move the movedItem to the correct index in the masterNodeList
			[].splice.apply(masterNodeList, [newIndex, 0, temp]);

			// Convert back to a zero-based array index
			newIndex = newIndex - 1;
			currentIndex = currentIndex - 1;

			// Grab the index compute from the `indexMap`
			var indexCompute = indexMap[currentIndex];

			// Remove the index compute from the `indexMap`
			[].splice.apply(indexMap, [currentIndex, 1]);

			// Move the index compute to the correct index in the `indexMap`
			[].splice.apply(indexMap, [newIndex, 0, indexCompute]);

			var i = Math.min(currentIndex, newIndex);
			var len = indexMap.length;

			for (i, len; i < len; i++) {
				// set each compute to have its current index in the map as its value
				indexMap[i].set(i);
			}
			if(ev.callChildMutationCallback !== false) {
				// fire any registered mutation callback
				live.callChildMutationCallback(text.parentNode);
			}
		},
		// wrap `add`, `remove`, `move` in Observation.registerUpdate
		// this allows the updateQueue to be cleaned up if `teardownList` is called
		// prior to the `update` callback being called
		// which can happen in cases where batch.flush() is called multiple times
		queuedFns = queueFns({ add: add, set: set, remove: remove, move: move }, nodeList && nodeList.nesting),
		// A text node placeholder
		text = el.ownerDocument.createTextNode(''),
		// The current list.
		list,
		// Called when the list is replaced with a new list or the binding is torn-down.
		teardownList = function (fullTeardown) {
			// there might be no list right away, and the list might be a plain
			// array
			if (list && list.removeEventListener) {
				list.removeEventListener('add', queuedFns.add);
				list.removeEventListener('set', queuedFns.set);
				list.removeEventListener('remove', queuedFns.remove);
				list.removeEventListener('move', queuedFns.move);
			}
			// use remove to clean stuff up for us
			remove({callChildMutationCallback: !!fullTeardown}, {
				length: masterNodeList.length - 1
			}, 0, true, fullTeardown);

			// clean up the updateQueue so that any queued updates are not
			// called after the list has been torn down
			queuedFns.clear();
		},
		oldList,
		updateList = function (newList) {

			if(isTornDown) {
				// take no further action if teardown is already done
				return;
			}

			afterPreviousEvents = true;
			if(newList && oldList) {
				// Update old list nodes to new ones if an update from list to list
				list = newList || [];
				// The minimal diff between lists
				var patches = diff(oldList, newList);

				// Tear down event bindings if old list is observable
				if ( oldList.removeEventListener ) {
					oldList.removeEventListener('add', queuedFns.add);
					oldList.removeEventListener('set', queuedFns.set);
					oldList.removeEventListener('remove', queuedFns.remove);
					oldList.removeEventListener('move', queuedFns.move);
				}
				oldList = newList;
				for(var i = 0, patchLen = patches.length; i < patchLen; i++) {
					var patch = patches[i];
					if(patch.deleteCount) {
						// Remove any items scheduled for deletion from the patch.
						remove({callChildMutationCallback: false}, {
							length: patch.deleteCount
						}, patch.index, true);
					}
					if(patch.insert.length) {
						// Insert any new items at the index
						add({callChildMutationCallback: false}, patch.insert, patch.index);
					}
				}
			} else {
				if(oldList) {
					// no new list.  Teardown.
					teardownList();
				}
				// push new items list onto the list (there are no oldItems of concern)
				list = newList || [];
				oldList = list;
				add({callChildMutationCallback: false}, list, 0);
				// for an empty newList, render the falsey section
				addFalseyIfEmpty(list, falseyRender, masterNodeList, nodeList);
			}
			// Listeners on the mutation observer should fire now (DOM has been fully updated)
			live.callChildMutationCallback(text.parentNode);

			afterPreviousEvents = false;
			// list might be a plain array.
			if (list.addEventListener) {
				// If observable, set up bindings on list changes
				list.addEventListener('add', queuedFns.add);
				list.addEventListener('set', queuedFns.set);
				list.addEventListener('remove', queuedFns.remove);
				list.addEventListener('move', queuedFns.move);
			}

			canBatch.afterPreviousEvents(function(){
				// at this time, all current add/move/set/remove in this context is complete,
				// so allow those functions to be called again.
				afterPreviousEvents = true;
			});
		};

	var isValueLike = canReflect.isValueLike(compute),
		isObservableLike = canReflect.isObservableLike(compute);

	// Use element's parent node if available
	parentNode = live.getParentNode(el, parentNode);
	// Setup binding and teardown to add and remove events
	var data = live.setup(parentNode, function () {
		// TODO: for stache, binding on the compute is not necessary.

		if (isValueLike && isObservableLike) {
			canReflect.onValue(compute, updateList);
		}
	}, function () {
		// Teardown handler when parentNode is removed
		if (isValueLike && isObservableLike) {
			canReflect.offValue(compute, updateList);
		}
		teardownList(true);
	});

	if(!nodeList) {
		// When no nodeList specified, the masterNodeList is the original element;
		//  replace with the rendered text transformed to DOM elements.
		live.replace(masterNodeList, text, data.teardownCheck);
	} else {
		// Otherwise replace the nodeList elements, and set up an unregister
		// handler
		nodeLists.replace(masterNodeList, text);
		nodeLists.update(masterNodeList, [text]);
		nodeList.unregistered = function(){
			data.teardownCheck();
			isTornDown = true;
		};
	}
	// run the list setup

	updateList(isValueLike ? canReflect.getValue(compute) : compute);
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var Observation = __webpack_require__(4);

// wrap each of the passed `fn`s in `Observation.registerUpdate`
//
// each `fn` will be added to the `updateQueue`
// and then called in order when the `registerUpdate` triggers `update`
//
// also adds a `clear()` function that will remove all the `fn`s from the queue
module.exports = function queueFns(fns, primaryDepth) {
	var updateQueue = [],
		queuedFns = {};

	// create an "Observation" that duck types the properties needed
	// for Observation.registerUpdate
	var updateQueueObservation = {
		needsUpdate: false,
		update: function() {
			for (var i=0; i<updateQueue.length; i++) {
				var obj = updateQueue[i];
				obj.fn.apply(obj.context, obj.args);
			}

			// clean up the updateQueue after all `fn`s have been called
			updateQueue = [];
		},
		getPrimaryDepth: function() {
			return primaryDepth || 0;
		}
	};

	var wrapFn = function(fn) {
		return function() {
			// add function to queue
			updateQueue.push({
				fn: fn,
				context: this,
				args: arguments
			});

			// mark observation as needing an update
			updateQueueObservation.needsUpdate = false;

			// register the update queue to be updated
			// this ensures that add, set, remove, move are not called
			// after the nodelist has been torn down
			Observation.registerUpdate(updateQueueObservation);
		};
	};

	// wrap each of the passed functions
	for (var key in fns) {
		queuedFns[key] = wrapFn(fns[key]);
	}

	// add a `clear()` method that can be used to empty the updateQueue
	queuedFns.clear = function() {
		updateQueue = [];
	};

	return queuedFns;
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var live = __webpack_require__(26);
var nodeLists = __webpack_require__(20);
var canReflect = __webpack_require__(0);

/**
 * @function can-view-live.text text
 * @parent can-view-live
 * @release 2.0.4
 *
 * @signature `live.text(el, compute, [parentNode], [nodeList])`
 *
 * Replaces one element with some content while keeping [can-view-live.nodeLists nodeLists] data correct.
 */
live.text = function (el, compute, parentNode, nodeList) {
	var parent = live.getParentNode(el, parentNode);
	// setup listening right away so we don't have to re-calculate value
	var data = live.listen(parent, compute, function (newVal) {
		// Sometimes `node.nodeValue` is 'unknown' in IE and will throw an exception if it is
		/* jshint ignore:start */
		if (typeof node.nodeValue !== 'unknown') {
			node.nodeValue = live.makeString(newVal);
		}
		/* jshint ignore:end */
	});

	// Create a new text node from the compute value
	var node = el.ownerDocument.createTextNode(live.makeString(canReflect.getValue(compute)));
	if(nodeList) {
		// If a known nodelist is passed in, update the list to have the new
		//  callbacks... 
		nodeList.unregistered = data.teardownCheck;
		data.nodeList = nodeList;

		// ...and new text node, and replace the previously associated node with 
		//  the new node
		nodeLists.update(nodeList, [node]);
		nodeLists.replace([el], node);
	} else {
		// Otherwise, replace the placeholder with the live node and do the nodeLists thing.
		// Add that node to nodeList so we can remove it when the parent element is removed from the page
		data.nodeList = live.replace([el], node, data.teardownCheck);
	}
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

//!steal-remove-start
var canSymbol = __webpack_require__(1);
//!steal-remove-end
var expressionHelpers = __webpack_require__(14);

// ### Bracket
// For accessing properties using bracket notation like `foo[bar]`
var Bracket = function (key, root, originalKey) {
	this.root = root;
	this.key = key;
	//!steal-remove-start
	this[canSymbol.for("can-stache.originalKey")] = originalKey;
	//!steal-remove-end
};
Bracket.prototype.value = function (scope, helpers) {
	var root = this.root ? this.root.value(scope, helpers) : scope.peek('.');
	return expressionHelpers.getObservableValue_fromDynamicKey_fromObservable(this.key.value(scope, helpers), root, scope, helpers, {});
};

Bracket.prototype.closingTag = function() {
	//!steal-remove-start
	return this[canSymbol.for('can-stache.originalKey')] || '';
	//!steal-remove-end
};

module.exports = Bracket;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var Scope = __webpack_require__(51);
var Hashes = __webpack_require__(55);
var SetIdentifier = __webpack_require__(80);
var compute = __webpack_require__(10);
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);
var assign = __webpack_require__(3);
var isEmptyObject = __webpack_require__(16);
var expressionHelpers = __webpack_require__(14);

// ### Call
// `new Call( new Lookup("method"), [new ScopeExpr("name")], {})`
// A call expression like `method(arg1, arg2)` that, by default,
// calls `method` with non compute values.
var Call = function(methodExpression, argExpressions){
	this.methodExpr = methodExpression;
	this.argExprs = argExpressions.map(expressionHelpers.convertToArgExpression);
};
Call.prototype.args = function(scope, helperOptions){
	var hashExprs = {};
	var args = [];
	for(var i = 0, len = this.argExprs.length; i < len; i++) {
		var arg = this.argExprs[i];
		if(arg.expr instanceof Hashes){
			assign(hashExprs, arg.expr.hashExprs);
		}
		var value = arg.value.apply(arg, arguments);
		args.push({
			// always do getValue unless compute is false
			call: !arg.modifiers || !arg.modifiers.compute,
			value: value
		});
	}
	return function(doNotWrapArguments){
		var finalArgs = [];
		if(!isEmptyObject(hashExprs)){
			finalArgs.hashExprs = hashExprs;
		}
		for(var i = 0, len = args.length; i < len; i++) {
			if (doNotWrapArguments) {
				finalArgs[i] = args[i].value;
			} else {
				finalArgs[i] = args[i].call ?
					canReflect.getValue( args[i].value ) :
					expressionHelpers.toCompute( args[i].value );
			}
		}
		return finalArgs;
	};
};

Call.prototype.value = function(scope, helperScope, helperOptions){

	var method = this.methodExpr.value(scope, helperScope);
	var metadata = method.metadata || {};

	// TODO: remove this hack
	assign(this, metadata);

	var getArgs = this.args(scope, helperScope);

	var computeValue = compute(function(newVal){
		var func = canReflect.getValue( method.fn || method );

		if(typeof func === "function") {
			var args = getArgs(metadata.isLiveBound);

			if(metadata.isHelper && helperOptions) {
				// Some helpers assume options has a helpers object that is an instance of Scope.Options
				helperOptions.helpers = helperOptions.helpers || new Scope.Options({});
				if(args.hashExprs && helperOptions.exprData){
					helperOptions.exprData.hashExprs = args.hashExprs;
				}
				args.push(helperOptions);
			}
			if(arguments.length) {
				args.unshift(new SetIdentifier(newVal));
			}

			return func.apply(null, args);
		}
	});

	compute.temporarilyBind(computeValue);
	return computeValue;
};

Call.prototype.closingTag = function() {
	//!steal-remove-start
	if(this.methodExpr[canSymbol.for('can-stache.originalKey')]) {
		return this.methodExpr[canSymbol.for('can-stache.originalKey')];
	}
	//!steal-remove-end
	return this.methodExpr.key;
};

module.exports = Call;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var expressionHelpers = __webpack_require__(14);
var Lookup = __webpack_require__(37);

// ### ScopeLookup
// Looks up a value in the scope, returns a compute for the value it finds.
// If passed an expression, that is used to lookup data
var ScopeLookup = function(key, root) {
	Lookup.apply(this, arguments);
};
ScopeLookup.prototype.value = function(scope, helperOptions){
	if (this.rootExpr) {
		return expressionHelpers.getObservableValue_fromDynamicKey_fromObservable(this.key, this.rootExpr.value(scope, helperOptions), scope, {}, {});
	}

	return expressionHelpers.getObservableValue_fromKey(this.key, scope, helperOptions);
};

module.exports = ScopeLookup;


/***/ }),
/* 153 */
/***/ (function(module, exports) {

// Provide a "System" global.
module.exports = {
	// Make sure import is only used as "System.import"
	import: function() {
		throw new Error("System.import cannot be used indirectly");
	}
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var getGlobal = __webpack_require__(17);
var getDomDocument = __webpack_require__(9);

/**
 * @module {function} can-util/js/base-url/base-url base-url
 * @parent can-util/js
 * @signature `baseUrl(optionalBaseUrlToSet)`
 *
 * Get and/or set the "base" (containing path) of the document.
 *
 * ```js
 * var baseUrl = require("can-util/js/base-url/base-url");
 *
 * console.log(baseUrl());           // -> "http://localhost:8080"
 * console.log(baseUrl(baseUrl() + "/foo/bar")); // -> "http://localhost:8080/foo/bar"
 * console.log(baseUrl());           // -> "http://localhost:8080/foo/bar"
 * ```
 *
 * @param {String} setUrl An optional base url to override reading the base URL from the known path.
 *
 * @return {String} Returns the set or computed base URL
 */

var setBaseUrl;
module.exports = function(setUrl){
	if(setUrl !== undefined) {
		setBaseUrl = setUrl;
	}
	if(setBaseUrl !== undefined) {
		return setBaseUrl;
	}
	var global = getGlobal();
	var domDocument = getDomDocument();
	if (domDocument && 'baseURI' in domDocument) {
		return domDocument.baseURI;
	} else if(global.location) {
		var href = global.location.href;
		var lastSlash = href.lastIndexOf("/");
		return lastSlash !== -1 ? href.substr(0, lastSlash) : href;
	} else if(typeof process !== "undefined") {
		return process.cwd();
	}
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseURI = __webpack_require__(156);

module.exports = function(base, href) {
	function removeDotSegments(input) {
		var output = [];
		input.replace(/^(\.\.?(\/|$))+/, '')
			.replace(/\/(\.(\/|$))+/g, '/')
			.replace(/\/\.\.$/, '/../')
			.replace(/\/?[^\/]*/g, function (p) {
				if (p === '/..') {
					output.pop();
				} else {
					output.push(p);
				}
			});
		return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
	}

	href = parseURI(href || '');
	base = parseURI(base || '');

	return !href || !base ? null : (href.protocol || base.protocol) +
		(href.protocol || href.authority ? href.authority : base.authority) +
		removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
			(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
			href.hash;
};


/***/ }),
/* 156 */
/***/ (function(module, exports) {

/*can-parse-uri@1.0.0#can-parse-uri*/
module.exports = function (url) {
    var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
    return m ? {
        href: m[0] || '',
        protocol: m[1] || '',
        authority: m[2] || '',
        host: m[3] || '',
        hostname: m[4] || '',
        port: m[5] || '',
        pathname: m[6] || '',
        search: m[7] || '',
        hash: m[8] || ''
    } : null;
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var canLog = __webpack_require__(47);
function noop () {};
var resolveValue = noop;
var evaluateArgs = noop;
var __testing = {}

//!steal-remove-start
var canReflect = __webpack_require__(0);
var canSymbol = __webpack_require__(1);

__testing = {
	allowDebugger: true
};

resolveValue = function (value) {
	if (value && value.isComputed) {
		return value();
	}
	if (value && value[canSymbol.for("can.isValueLike")] && value[canSymbol.for("can.getValue")]) {
		return canReflect.getValue(value);
	}
	return value;
}

evaluateArgs = function (left, right) {
	switch (arguments.length) {
		case 0: return true;
		case 1: return !!resolveValue(left);
		case 2: return resolveValue(left) === resolveValue(right);
		default:
			canLog.log([
				'Usage:',
				'  {{debugger}}: break any time this helper is evaluated',
				'  {{debugger condition}}: break when `condition` is truthy',
				'  {{debugger left right}}: break when `left` === `right`'
			].join('\n'));
			throw new Error('{{debugger}} must have less than three arguments');
	}
}
//!steal-remove-end

function debuggerHelper (left, right) {
	//!steal-remove-start
	var shouldBreak = evaluateArgs.apply(null, Array.prototype.slice.call(arguments, 0, -1));
	if (!shouldBreak) {
		return;
	}

	var options = arguments[arguments.length - 1];
	var get = function (path) {
		return options.scope.get(path);
	};

	canLog.log('Use `get(<path>)` to debug this template');
	var allowDebugger = __testing.allowDebugger;
	if (allowDebugger) {
		debugger;
		return;
	}
	//!steal-remove-end
	canLog.warn('Forgotten {{debugger}} helper');
}

module.exports = {
	helper: debuggerHelper,
	evaluateArgs: evaluateArgs,
	resolveValue: resolveValue,

	// used only for testing purposes
	__testing: __testing
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var Literal = __webpack_require__(54);
var compute = __webpack_require__(10);
var assign = __webpack_require__(3);
var dev = __webpack_require__(21);
var isEmptyObject = __webpack_require__(16);
var expressionHelpers = __webpack_require__(14);
var utils = __webpack_require__(19);
var mustacheHelpers = __webpack_require__(38);


var Helper = function(methodExpression, argExpressions, hashExpressions){
	this.methodExpr = methodExpression;
	this.argExprs = argExpressions;
	this.hashExprs = hashExpressions;
	this.mode = null;
};
Helper.prototype.args = function(scope, helperOptions){
	var args = [];
	for(var i = 0, len = this.argExprs.length; i < len; i++) {
		var arg = this.argExprs[i];
		// TODO: once we know the helper, we should be able to avoid compute conversion
		args.push( expressionHelpers.toComputeOrValue( arg.value.apply(arg, arguments) ) );
	}
	return args;
};
Helper.prototype.hash = function(scope, helperOptions){
	var hash = {};
	for(var prop in this.hashExprs) {
		var val = this.hashExprs[prop];
		// TODO: once we know the helper, we should be able to avoid compute conversion
		hash[prop] = expressionHelpers.toComputeOrValue( val.value.apply(val, arguments) );
	}
	return hash;
};
// looks up the name key in the scope
// returns a `helper` property if there is a helper for the key.
// returns a `value` property if the value is looked up.
Helper.prototype.helperAndValue = function(scope, helperOptions){

	//{{foo bar}}
	var looksLikeAHelper = this.argExprs.length || !isEmptyObject(this.hashExprs),
		helper,
		computeData,
		// If a literal, this means it should be treated as a key. But helpers work this way for some reason.
		// TODO: fix parsing so numbers will also be assumed to be keys.
		methodKey = this.methodExpr instanceof Literal ?
			""+this.methodExpr._value : this.methodExpr.key,
		initialValue,
		args;

	// If the expression looks like a helper, try to get a helper right away.
	if (looksLikeAHelper) {
		// Try to find a registered helper.
		helper = mustacheHelpers.getHelper(methodKey, helperOptions);

	}
	if(!helper) {
		// Try to find a value or function
		computeData = expressionHelpers.getObservableValue_fromKey(methodKey, scope, {
			isArgument: true
		});
		// if it's a function ... we need another compute that represents
		// the call to that function
		// This handles functions in any of these forms:
		// {{#foo}}...{{/foo}}
		// {{^foo}}...{{/foo}}
		// {{foo bar}}
		// {{foo}}
		// {{{foo}}}
		//
		// it also handles when `bar` is a function in `foo.bar` in any of the above
		if(typeof computeData.initialValue === "function") {
			//!steal-remove-start
			var filename = scope.peek('scope.filename');
			var lineNumber = scope.peek('scope.lineNumber');
			dev.warn(
				(filename ? filename + ':' : '') +
				(lineNumber ? lineNumber + ': ' : '') +
				'"' + methodKey + '" is being called as a function.\n' +
				'\tThis will not happen automatically in an upcoming release.\n' +
				'\tYou should call it explicitly using "' + methodKey + '()".\n\n'
			);
			//!steal-remove-end

			args = this.args(scope, helperOptions).map(expressionHelpers.toComputeOrValue);
			// TODO: this should be an observation.
			var functionResult = compute(function(){
				return computeData.initialValue.apply(null, args);
			});
			// TODO: probably don't need to bind
			compute.temporarilyBind(functionResult);
			return {
				value: functionResult
			};
		}
		// if it's some other value ..
		else if(typeof computeData.initialValue !== "undefined") {
			// we will use that
			return {value: computeData};
		}

		// If it doesn't look like a helper and there is no value, check helpers anyway.
		// This handles helper functions, arrays, lists, computes, or primitives in:
		// {{#foo}}...{{/foo}}
		// {{^foo}}...{{/foo}}
		// {{foo}}
		// {{{foo}}}
		// {{& foo}}
		//
		// also `foo.bar` in any of the above if bar is any of the mentioned types
		// or foo is null or undefined
		if( !looksLikeAHelper && initialValue === undefined ) {
			helper = mustacheHelpers.getHelper(methodKey, helperOptions);
		}
	}

	//!steal-remove-start
	if ( !helper ) {
		if(looksLikeAHelper) {
			dev.warn('can-stache/src/expression.js: Unable to find helper "' + methodKey + '".');
		} else {
			dev.warn('can-stache/src/expression.js: Unable to find key or helper "' + methodKey + '".');
		}
	}
	//!steal-remove-end

	return {
		value: computeData,
		args: args,
		helper: helper && helper.fn
	};
};
Helper.prototype.evaluator = function(helper, scope, helperOptions, /*REMOVE*/readOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly){

	var helperOptionArg = {
		stringOnly: stringOnly
	},
		context = scope.peek("."),
		args = this.args(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly),
		hash = this.hash(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

	// Add additional data to be used by helper functions
	utils.convertToScopes(helperOptionArg, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

	assign(helperOptionArg, {
		context: context,
		scope: scope,
		contexts: scope,
		hash: hash,
		nodeList: nodeList,
		exprData: this,
		helperOptions: helperOptions,
		helpers: helperOptions
	});

	args.push(helperOptionArg);
	// Call the helper.
	return function () {
		return helper.apply(context, args);
	};
};

Helper.prototype.value = function(scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly){

	var helperAndValue = this.helperAndValue(scope, helperOptions);

	var helper = helperAndValue.helper;
	// a method could have been called, resulting in a value
	if(!helper) {
		return helperAndValue.value;
	}

	var fn = this.evaluator(helper, scope, helperOptions, nodeList, truthyRenderer, falseyRenderer, stringOnly);

	var computeValue = compute(fn);

	compute.temporarilyBind(computeValue);

	if (!expressionHelpers.computeHasDependencies( computeValue ) ) {
		return computeValue();
	} else {
		return computeValue;
	}
};

Helper.prototype.closingTag = function() {
	return this.methodExpr.key;
};

module.exports = Helper;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var Lookup = __webpack_require__(37);
var lookupValueOrHelper = __webpack_require__(81);

// ### HelperLookup
// An expression that looks up a value in the helper or scope.
// Any functions found prior to the last one are called with
// the context and scope.
var HelperLookup = function(){
	Lookup.apply(this, arguments);
};
HelperLookup.prototype.value = function(scope, helperOptions){
	var result = lookupValueOrHelper(this.key, scope, helperOptions, {isArgument: true, args: [scope.peek('.'), scope]});
	return result.helper || result.value;
};

module.exports = HelperLookup;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var Lookup = __webpack_require__(37);
var expressionHelpers = __webpack_require__(14);

// ### HelperScopeLookup
// An expression that looks up a value in the scope.
// Any functions found prior to the last one are called with
// the context and scope.
var HelperScopeLookup = function(){
	Lookup.apply(this, arguments);
};
HelperScopeLookup.prototype.value = function(scope, helperOptions){
	return expressionHelpers.getObservableValue_fromKey(this.key, scope, {
		callMethodsOnObservables: true,
		//!steal-remove-start
		filename: scope.peek('scope.filename'),
		lineNumber: scope.peek('scope.lineNumber'),
		//!steal-remove-end
		isArgument: true,
		args: [scope.peek('.'), scope]
	});
};

module.exports = HelperScopeLookup;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var compute = __webpack_require__(10);
var live = __webpack_require__(53);

var utils = __webpack_require__(19);

var attr = __webpack_require__(32);

var assign = __webpack_require__(3);

var canReflect = __webpack_require__(0);
var Observation = __webpack_require__(4);

var noop = function(){};

var TextSectionBuilder = function(){
	this.stack = [new TextSection()];
};

assign(TextSectionBuilder.prototype,utils.mixins);

assign(TextSectionBuilder.prototype,{
	// Adds a subsection.
	startSection: function(process){
		var subSection = new TextSection();
		this.last().add({process: process, truthy: subSection});
		this.stack.push(subSection);
	},
	endSection: function(){
		this.stack.pop();
	},
	inverse: function(){
		this.stack.pop();
		var falseySection = new TextSection();
		this.last().last().falsey = falseySection;
		this.stack.push(falseySection);
	},
	compile: function(state){

		var renderer = this.stack[0].compile();

		return function(scope, options){

			var observation = new Observation(function(){
				return renderer(scope, options);
			}, null, {isObservable: false});

			canReflect.onValue(observation, noop);

			var value = canReflect.getValue(observation);
			if( canReflect.valueHasDependencies( observation ) ) {
				if(state.textContentOnly) {
					live.text(this, observation);
				}
				else if(state.attr) {
					live.attr(this, state.attr, observation);
				}
				else {
					live.attrs(this, observation, scope, options);
				}
				canReflect.offValue(observation, noop);
			} else {
				if(state.textContentOnly) {
					this.nodeValue = value;
				}
				else if(state.attr) {
					attr.set(this, state.attr, value);
				}
				else {
					live.attrs(this, value);
				}
			}
		};
	}
});

var passTruthyFalsey = function(process, truthy, falsey){
	return function(scope, options){
		return process.call(this, scope, options, truthy, falsey);
	};
};

var TextSection = function(){
	this.values = [];
};

assign( TextSection.prototype, {
	add: function(data){
		this.values.push(data);
	},
	last: function(){
		return this.values[this.values.length - 1];
	},
	compile: function(){
		var values = this.values,
			len = values.length;

		for(var i = 0 ; i < len; i++) {
			var value = this.values[i];
			if(typeof value === "object") {
				values[i] = passTruthyFalsey( value.process,
				    value.truthy && value.truthy.compile(),
				    value.falsey && value.falsey.compile());
			}
		}

		return function(scope, options){
			var txt = "",
				value;
			for(var i = 0; i < len; i++){
				value = values[i];
				txt += typeof value === "string" ? value : value.call(this, scope, options);
			}
			return txt;
		};
	}
});

module.exports = TextSectionBuilder;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var helpers = __webpack_require__(38);
var expression = __webpack_require__(78);
var makeArray = __webpack_require__(15)

helpers.registerConverter = function(name, getterSetter) {
	getterSetter = getterSetter || {};
	helpers.registerHelper(name, function(newVal, source) {
		var args = makeArray(arguments);
		if(newVal instanceof expression.SetIdentifier) {
			return typeof getterSetter.set === "function" 
				? getterSetter.set.apply(this, [newVal.value].concat(args.slice(1))) 
				: source(newVal.value);
		} else {
			return typeof getterSetter.get === "function" 
				? getterSetter.get.apply(this, args)
				: args[0];
		}
	});
};

module.exports = helpers;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var mustacheCore = __webpack_require__(52);
var parser = __webpack_require__(49);
// require('can/view/import/import');

module.exports = function(filename, source){
	if (arguments.length === 1) {
		source = arguments[0];
		filename = undefined;
	}

	var template = source;
	template = mustacheCore.cleanWhitespaceControl(template);
	template = mustacheCore.cleanLineEndings(template);

	var imports = [],
		dynamicImports = [],
		ases = {},
		inImport = false,
		inFrom = false,
		inAs = false,
		isUnary = false,
		importIsDynamic = false,
		currentAs = "",
		currentFrom = "";

	function processImport() {
		if(currentAs) {
			ases[currentAs] = currentFrom;
			currentAs = "";
		}
		if(importIsDynamic) {
			dynamicImports.push(currentFrom);
		} else {
			imports.push(currentFrom);
		}
	}

	var intermediate = parser(template, {
		filename: filename,
		start: function( tagName, unary ){
			if(tagName === "can-import") {
				isUnary = unary;
				importIsDynamic = false; // assume static import unless there is content (chars/tags/special).
				inImport = true;
			} else if(tagName === "can-dynamic-import") {
				isUnary = unary;
				importIsDynamic = true;
				inImport = true;
			} else if(inImport) {
				importIsDynamic = true;  // found content inside can-import tag.
				inImport = false;
			}
		},
		attrStart: function( attrName ){
			if(attrName === "from") {
				inFrom = true;
			} else if(attrName === "as" || attrName === "export-as") {
				inAs = true;
			}
		},
		attrEnd: function( attrName ){
			if(attrName === "from") {
				inFrom = false;
			} else if(attrName === "as" || attrName === "export-as") {
				inAs = false;
			}
		},
		attrValue: function( value ){
			if(inFrom && inImport) {
				currentFrom = value;
			} else if(inAs && inImport) {
				currentAs = value;
			}
		},
		end: function(tagName){
			if((tagName === "can-import" || tagName === "can-dymamic-import") && isUnary) {
				processImport();
			}
		},
		close: function(tagName){
			if((tagName === "can-import" || tagName === "can-dymamic-import")) {
				processImport();
			}
		},
		chars: function(text) {
			if(text.trim().length > 0) {
				importIsDynamic = true;
			}
		},
		special: function(text) {
			importIsDynamic = true;
		}
	}, true);

	return {
		intermediate: intermediate,
		imports: imports,
		dynamicImports: dynamicImports,
		ases: ases,
		exports: ases
	};
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(27);
var global = __webpack_require__(17)();

/**
 * @module {function} can-util/js/import/import import
 * @parent can-util/js
 * @signature `importModule(moduleName, parentName)`
 *
 * ```js
 * var importModule = require("can-util/js/import/import");
 *
 * importModule("foo.stache").then(function(){
 *   // module was imported
 * });
 * ```
 *
 * @param {String} moduleName The module to be imported.
 * @param {String} [parentName] A parent module that will be used as a reference for resolving relative module imports.
 * @return {Promise} A Promise that will resolve when the module has been imported.
 */

module.exports = function(moduleName, parentName) {
	return new Promise(function(resolve, reject) {
		try {
			if(typeof global.System === "object" && isFunction(global.System["import"])) {
				global.System["import"](moduleName, {
					name: parentName
				}).then(resolve, reject);
			} else if(global.define && global.define.amd){
				global.require([moduleName], function(value){
					resolve(value);
				});
			} else if(global.require){
				resolve(global.require(moduleName));
			} else {
				// ideally this will use can.getObject
				resolve();
			}
		} catch(err) {
			reject(err);
		}
	});
};


/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = "<!-- main.stache -->\r\n<h1>{{ message }}</h1>"

/***/ })
/******/ ]);