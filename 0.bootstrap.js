(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/wasm_game_of_life.js":
/*!***********************************!*\
  !*** ../pkg/wasm_game_of_life.js ***!
  \***********************************/
/*! exports provided: Universe, __wbg_new_693216e109162396, __wbg_stack_0ddaca5d1abfb52f, __wbg_error_09919627ac0992f5, __wbindgen_object_drop_ref, __wbg_random_7b8246250fd79f60, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_game_of_life_bg.wasm */ \"../pkg/wasm_game_of_life_bg.wasm\");\n/* harmony import */ var _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wasm_game_of_life_bg.js */ \"../pkg/wasm_game_of_life_bg.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"Universe\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_693216e109162396\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_new_693216e109162396\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_0ddaca5d1abfb52f\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_stack_0ddaca5d1abfb52f\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_09919627ac0992f5\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_error_09919627ac0992f5\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_object_drop_ref\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_7b8246250fd79f60\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbg_random_7b8246250fd79f60\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return _wasm_game_of_life_bg_js__WEBPACK_IMPORTED_MODULE_1__[\"__wbindgen_throw\"]; });\n\n\n\n\n//# sourceURL=webpack:///../pkg/wasm_game_of_life.js?");

/***/ }),

/***/ "../pkg/wasm_game_of_life_bg.js":
/*!**************************************!*\
  !*** ../pkg/wasm_game_of_life_bg.js ***!
  \**************************************/
/*! exports provided: Universe, __wbg_new_693216e109162396, __wbg_stack_0ddaca5d1abfb52f, __wbg_error_09919627ac0992f5, __wbindgen_object_drop_ref, __wbg_random_7b8246250fd79f60, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Universe\", function() { return Universe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_693216e109162396\", function() { return __wbg_new_693216e109162396; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_0ddaca5d1abfb52f\", function() { return __wbg_stack_0ddaca5d1abfb52f; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_09919627ac0992f5\", function() { return __wbg_error_09919627ac0992f5; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_random_7b8246250fd79f60\", function() { return __wbg_random_7b8246250fd79f60; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_game_of_life_bg.wasm */ \"../pkg/wasm_game_of_life_bg.wasm\");\n\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n\nfunction notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }\n/**\n*/\nclass Universe {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Universe.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_universe_free\"](ptr);\n    }\n    /**\n    */\n    get width() {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_universe_width\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set width(arg0) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_universe_width\"](this.ptr, arg0);\n    }\n    /**\n    */\n    get height() {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_get_universe_height\"](this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set height(arg0) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_set_universe_height\"](this.ptr, arg0);\n    }\n    /**\n    * @returns {Universe}\n    */\n    static new() {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_new\"]();\n        return Universe.__wrap(ret);\n    }\n    /**\n    * @returns {number}\n    */\n    cells() {\n        var ret = _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_cells\"](this.ptr);\n        return ret;\n    }\n    /**\n    */\n    tick() {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_tick\"](this.ptr);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    */\n    toggle_cell(row, column) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_toggle_cell\"](this.ptr, row, column);\n    }\n    /**\n    */\n    randomize_cells() {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_randomize_cells\"](this.ptr);\n    }\n    /**\n    */\n    kill_all_cells() {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_kill_all_cells\"](this.ptr);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    */\n    insert_glider(row, column) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_insert_glider\"](this.ptr, row, column);\n    }\n    /**\n    * @param {number} row\n    * @param {number} column\n    */\n    insert_pulsar(row, column) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_insert_pulsar\"](this.ptr, row, column);\n    }\n    /**\n    * Set the width of the universe.\n    *\n    * Resets all cells to the dead state.\n    * @param {number} width\n    */\n    set_width(width) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_set_width\"](this.ptr, width);\n    }\n    /**\n    * Set the height of the universe.\n    *\n    * Resets all cells to the dead state.\n    * @param {number} height\n    */\n    set_height(height) {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"universe_set_height\"](this.ptr, height);\n    }\n}\n\nfunction __wbg_new_693216e109162396() {\n    var ret = new Error();\n    return addHeapObject(ret);\n};\n\nfunction __wbg_stack_0ddaca5d1abfb52f(arg0, arg1) {\n    var ret = getObject(arg1).stack;\n    var ptr0 = passStringToWasm0(ret, _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nfunction __wbg_error_09919627ac0992f5(arg0, arg1) {\n    try {\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        _wasm_game_of_life_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](arg0, arg1);\n    }\n};\n\nfunction __wbindgen_object_drop_ref(arg0) {\n    takeObject(arg0);\n};\n\nconst __wbg_random_7b8246250fd79f60 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///../pkg/wasm_game_of_life_bg.js?");

/***/ }),

/***/ "../pkg/wasm_game_of_life_bg.wasm":
/*!****************************************!*\
  !*** ../pkg/wasm_game_of_life_bg.wasm ***!
  \****************************************/
/*! exports provided: memory, __wbg_universe_free, __wbg_get_universe_width, __wbg_set_universe_width, __wbg_get_universe_height, __wbg_set_universe_height, universe_new, universe_cells, universe_tick, universe_toggle_cell, universe_randomize_cells, universe_kill_all_cells, universe_insert_glider, universe_insert_pulsar, universe_set_width, universe_set_height, __wbindgen_free, __wbindgen_malloc, __wbindgen_realloc */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_game_of_life_bg.js */ \"../pkg/wasm_game_of_life_bg.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/wasm_game_of_life_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-game-of-life */ \"../pkg/wasm_game_of_life.js\");\n/* harmony import */ var wasm_game_of_life_wasm_game_of_life_bg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wasm-game-of-life/wasm_game_of_life_bg */ \"../pkg/wasm_game_of_life_bg.wasm\");\n\n\n\nconst CELL_SIZE = 5; // px\nconst GRID_COLOR = \"#CCCCCC\";\nconst DEAD_COLOR = \"#FFFFFF\";\nconst ALIVE_COLOR = \"#000000\";\n\nlet animationID = null;\n\nconst universe = wasm_game_of_life__WEBPACK_IMPORTED_MODULE_0__[\"Universe\"].new();\nconst { width: universeWidth, height: universeHeight } = universe;\n\nconst gameOfLifeCanvas = (() => {\n  const canvas = document.getElementById(\"game-of-life-canvas\");\n  canvas.height = (CELL_SIZE + 1) * universeHeight + 1;\n  canvas.width = (CELL_SIZE + 1) * universeWidth + 1;\n  return canvas;\n})();\nconst playPauseButton = document.getElementById(\"play-pause\");\nconst randomizeButton = document.getElementById(\"randomize\");\nconst killAllButton = document.getElementById(\"kill-all\");\nconst ticksPerFrameSlider = document.getElementById(\"ticks-per-frame-slider\");\nconst ticksPerFrameLabel = document.getElementById(\"ticks-per-frame-label\");\n\nconst gameOfLifeCanvasContext = gameOfLifeCanvas.getContext(\"2d\");\n\nconst renderLoop = () => {\n  let ticksPerFrame = Number(ticksPerFrameSlider.value);\n  if (Number.isNaN(ticksPerFrame)) ticksPerFrame = 1;\n\n  for (let i = 0; i < ticksPerFrame; i += 1) {\n    universe.tick();\n  }\n\n  drawGrid();\n  drawCells();\n\n  animationID = requestAnimationFrame(renderLoop);\n};\n\nconst play = () => {\n  playPauseButton.textContent = \"⏸\";\n  renderLoop();\n};\n\nconst pause = () => {\n  playPauseButton.textContent = \"▶\";\n  cancelAnimationFrame(animationID);\n  animationID = null;\n};\n\nconst isPaused = () => animationID === null;\n\nconst drawGrid = () => {\n  gameOfLifeCanvasContext.beginPath();\n  gameOfLifeCanvasContext.strokeStyle = GRID_COLOR;\n\n  // Vertical lines.\n  for (let i = 0; i <= universeWidth; i += 1) {\n    gameOfLifeCanvasContext.moveTo(i * (CELL_SIZE + 1) + 1, 0);\n    gameOfLifeCanvasContext.lineTo(\n      i * (CELL_SIZE + 1) + 1,\n      (CELL_SIZE + 1) * universeHeight + 1\n    );\n  }\n\n  // Horizontal lines.\n  for (let i = 0; i <= universeHeight; i += 1) {\n    gameOfLifeCanvasContext.moveTo(0, i * (CELL_SIZE + 1) + 1);\n    gameOfLifeCanvasContext.lineTo(\n      (CELL_SIZE + 1) * universeWidth + 1,\n      i * (CELL_SIZE + 1) + 1\n    );\n  }\n\n  gameOfLifeCanvasContext.stroke();\n};\n\nconst getIndex = (row, column) => row * universeWidth + column;\n\nconst bitIsSet = (number, array) => {\n  const byte = Math.floor(number / 8);\n  const mask = 1 << number % 8;\n  return (array[byte] & mask) === mask;\n};\n\nconst drawCells = () => {\n  const cellsPointer = universe.cells();\n\n  const cells = new Uint8Array(\n    wasm_game_of_life_wasm_game_of_life_bg__WEBPACK_IMPORTED_MODULE_1__[\"memory\"].buffer,\n    cellsPointer,\n    (universeWidth * universeHeight) / 8\n  );\n\n  gameOfLifeCanvasContext.beginPath();\n\n  for (let row = 0; row < universeHeight; row += 1) {\n    for (let column = 0; column < universeWidth; column += 1) {\n      const index = getIndex(row, column);\n\n      if (bitIsSet(index, cells)) {\n        gameOfLifeCanvasContext.fillStyle = ALIVE_COLOR;\n      } else {\n        gameOfLifeCanvasContext.fillStyle = DEAD_COLOR;\n      }\n\n      gameOfLifeCanvasContext.fillRect(\n        column * (CELL_SIZE + 1) + 1,\n        row * (CELL_SIZE + 1) + 1,\n        CELL_SIZE,\n        CELL_SIZE\n      );\n    }\n  }\n\n  gameOfLifeCanvasContext.stroke();\n};\n\ngameOfLifeCanvas.addEventListener(\"click\", (event) => {\n  const boundingRect = gameOfLifeCanvas.getBoundingClientRect();\n\n  const scaleX = gameOfLifeCanvas.width / boundingRect.width;\n  const scaleY = gameOfLifeCanvas.height / boundingRect.height;\n\n  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;\n  const canvasTop = (event.clientY - boundingRect.top) * scaleY;\n\n  const row = Math.min(\n    Math.floor(canvasTop / (CELL_SIZE + 1)),\n    universeHeight - 1\n  );\n  const column = Math.min(\n    Math.floor(canvasLeft / (CELL_SIZE + 1)),\n    universeWidth - 1\n  );\n\n  if (event.metaKey) {\n    universe.insert_glider(row, column);\n  } else if (event.shiftKey) {\n    universe.insert_pulsar(row, column);\n  } else {\n    universe.toggle_cell(row, column);\n  }\n\n  drawGrid();\n  drawCells();\n});\n\nplayPauseButton.addEventListener(\"click\", (_event) => {\n  if (isPaused()) play();\n  else pause();\n});\n\nrandomizeButton.addEventListener(\"click\", (_event) => {\n  pause();\n\n  universe.randomize_cells();\n\n  universe.tick();\n\n  drawGrid();\n  drawCells();\n});\n\nkillAllButton.addEventListener(\"click\", (_event) => {\n  pause();\n\n  universe.kill_all_cells();\n\n  drawGrid();\n  drawCells();\n});\n\nticksPerFrameSlider.addEventListener(\"change\", (event) => {\n  const value = Number(event.target.value);\n  if (Number.isNaN(value)) return;\n\n  let textPrefix;\n  if (value === 1) textPrefix = \"1 tick\";\n  else textPrefix = `${value} ticks`;\n\n  ticksPerFrameLabel.textContent = `${textPrefix} per frame`;\n});\n\nplay();\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ })

}]);