/**
 * This module detects the server
 * and applies the API to the
 * request and response objects
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gengojsDebug = require('gengojs-debug');

var _gengojsDebug2 = _interopRequireDefault(_gengojsDebug);

var Servify = (function () {
  function Servify(_this) {
    _classCallCheck(this, Servify);

    (0, _gengojsDebug2['default'])('core', 'debug', 'class: ' + Servify.name, 'process: constructor');
    this.server = '';
    this.context = _this;
  }

  /* Applies the API to the objects */

  _createClass(Servify, [{
    key: 'apply',
    value: function apply(req, res, next) {
      (0, _gengojsDebug2['default'])('core', 'debug', 'class: ' + Servify.name, 'process: apply');
      var _this = this.context;
      // Koa?
      if (this.isKoa(req) && !_lodash2['default'].isEmpty(req)) {
        this.server = 'koa';
        // Apply api to koa
        _this.assign(req);
        _this.assign(req.request, req.response);
        if (req.req || req.res) _this.assign(req.req, req.res);
        if (req.state) _this.assign(req.state);
      }
      // Hapi?
      if (this.isHapi(req) && !_lodash2['default'].isEmpty(req)) {
        this.server = 'hapi';
        if (req.response) if (req.response.variety === 'view') _this.assign(req.response.source.context);
        _this.assign(req);
      }
      // Express ?
      if (this.isExpress(req) && !_lodash2['default'].isEmpty(req)) {
        this.server = 'express';
        _this.assign(req, res);
        // Apply to API to the view
        if (res && res.locals) _this.assign(res.locals);
      }
      (0, _gengojsDebug2['default'])('core', 'info', 'class: ' + Servify.name, 'server: ' + this.server);
      // Make sure next exists and call it.
      if (_lodash2['default'].isFunction(next)) next();
      return this;
    }

    /* Framework detection */
  }, {
    key: 'isKoa',
    value: function isKoa(req) {
      return req && !req.raw ? req.response && req.request : !_lodash2['default'].isEmpty(this.server) ? this.server === 'koa' : false;
    }
  }, {
    key: 'isHapi',
    value: function isHapi(req) {
      return req ? req.raw : !_lodash2['default'].isEmpty(this.server) ? this.server === 'hapi' : false;
    }
  }, {
    key: 'isExpress',
    value: function isExpress(req) {
      return req && !req.raw ? req && !req.raw && !req.response : !_lodash2['default'].isEmpty(this.server) ? this.server === 'express' : false;
    }
  }]);

  return Servify;
})();

exports['default'] = function (_this) {
  'use strict';
  return new Servify(_this);
};

module.exports = exports['default'];
//# sourceMappingURL=../source maps/modules/servify.js.map