
    (function(modules){
      function require(id){
        const [fn, mapping] = modules[id]
        function localRequire(relativePath){
          return require(mapping[relativePath])
        }
        console.log('fn', fn)
        const module = {exports:{}}
        fn(localRequire, module, module.exports)
        return module.exports
      }
      require(0)
    })({0:[
      function(require, module, exports){
        "use strict";

var _message = _interopRequireDefault(require("./message.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_message["default"]);
      },
      {"./message.js":1}
    ],1:[
      function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _name = _interopRequireDefault(require("./name.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = "hello ".concat(_name["default"]);

exports["default"] = _default;
      },
      {"./name.js":2}
    ],2:[
      function(require, module, exports){
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var name = 'simple, webpack';
var _default = name;
exports["default"] = _default;
      },
      {}
    ],})
  