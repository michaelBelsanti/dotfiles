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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_rollbar_rollbar_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _lib_url_inspector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _lib_blocked_domains_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _lib_util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);

var rollbar = Object(_lib_rollbar_rollbar_loader_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
window.rollbar = rollbar;





var urlParser = __webpack_require__(5);

var browser;

if (!browser) {
  browser = chrome;
} // always allow browser extension domain and freedom domain


var browserRuntimeId;

try {
  browserRuntimeId = browser.runtime.id;
} catch (e) {
  browserRuntimeId = null;
}

var allowedDomains = ["ljfdccdjpfjpfjbpdiihanpodilolofh", "freedom.to"];
allowedDomains.push(browserRuntimeId);
var inspector;
var pausePageCounter = 0;

var setExtensionInactive = function setExtensionInactive() {
  browser.browserAction.setIcon({
    path: 'images/pause_icon_off_48.png'
  });
  inspector.setInactive();
  browser.storage.sync.set({
    'extensionIsActive': false
  });
  browser.browserAction.setTitle({
    'title': 'Pause is disabled. Click to start pausing distracting sites'
  });
  browser.tabs.query({}, Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (tabs) {
    tabs.forEach(function (tab) {
      if (tab) {
        browser.tabs.sendMessage(tab.id, {
          'subject': 'extensionInactive'
        });
      }
    });
  }));
};

var setExtensionActive = function setExtensionActive() {
  browser.browserAction.setIcon({
    path: 'images/pause_icon_48.png'
  });
  inspector.setActive();
  browser.storage.sync.set({
    'extensionIsActive': true
  });
  browser.browserAction.setTitle({
    'title': "Pause is enabled, and you're pausing distracting sites"
  }); // gets all the tabs in all the windows, and sends them a message to make the extension active

  browser.tabs.query({}, Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (tabs) {
    tabs.forEach(function (tab) {
      if (tab) {
        browser.tabs.sendMessage(tab.id, {
          'subject': 'extensionActive'
        });
      }
    });
  }));
}; // get the allowed and blocked domains from storage and initialize the Url Inspector
// allowed domains need to be in storage in case the extension is turned off and on again


var initializeExtension = function initializeExtension() {
  return new Promise(function (resolve, reject) {
    browser.storage.sync.get(['allowedDomainsUntil', 'extensionIsActive', 'blockedDomains'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
      if (typeof result === 'undefined') {
        result = {};
      }

      var allowedDomainsUntil;
      var extensionIsActive = true;

      if (result && 'allowedDomainsUntil' in result) {
        allowedDomainsUntil = result.allowedDomainsUntil;
      }

      if (result && 'extensionIsActive' in result) {
        extensionIsActive = result.extensionIsActive;
      } // initialized blocked domains as default list (first install)
      // if they are present in storage, use the list from storage


      var blockedDomains = _lib_blocked_domains_js__WEBPACK_IMPORTED_MODULE_3__["default"];

      if (result && 'blockedDomains' in result) {
        blockedDomains = result.blockedDomains;
      } else {
        browser.storage.sync.set({
          'blockedDomains': blockedDomains
        });
      }

      inspector = new _lib_url_inspector_js__WEBPACK_IMPORTED_MODULE_2__["default"](blockedDomains, allowedDomainsUntil, allowedDomains); // turn off extension, if isActive is false from storage

      if (!extensionIsActive) {
        setExtensionInactive();
      }

      resolve();
    }));
  });
}; // syncs the storage with the blocked domains loaded in the inspector


var syncBlockedDomains = function syncBlockedDomains() {
  browser.storage.sync.get(['blockedDomains'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
    if ('blockedDomains' in result) {
      inspector.setBlockedDomains(result.blockedDomains);
    }
  }));
}; // allowDomain function
// tells the inspector to allow the domain, and saves the domain in browser storage
// we need allowed domains to be in storage in case the extension is turned off and on again


var allowDomain = function allowDomain(url, callback) {
  var allowUntilTimestamp = new Date().getTime() + _settings_js__WEBPACK_IMPORTED_MODULE_1__["default"].ALLOWED_DOMAIN_TIMEOUT;
  inspector.allowDomainUntil(url, allowUntilTimestamp);
  browser.storage.sync.get(['allowedDomainsUntil'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
    var hostname = inspector.getHostname(url);
    var allowedDomainsUntil = {};

    if ('allowedDomainsUntil' in result) {
      allowedDomainsUntil = result.allowedDomainsUntil;
    }

    allowedDomainsUntil[hostname] = allowUntilTimestamp;
    browser.storage.sync.set({
      'allowedDomainsUntil': allowedDomainsUntil
    }, callback);
  }));
}; // addBlockedDomain function
// tells the inspector to add a new blocked domain in the pause list, and adds it in storage


var addBlockedDomain = function addBlockedDomain(domain, callback) {
  if (inspector.isDomainAllowed(domain)) {
    callback({
      'error': 'Cannot add ' + domain + ' to the Pause list'
    });
    return;
  }

  var blockSubdomains = true; // for now facebook is hardcoded as the only domain where we would not block subdomains
  // in the future this will be an extra parameter

  if (domain == "facebook.com") {
    blockSubdomains = false;
  }

  if (!inspector.addBlockedDomain(domain, null, blockSubdomains)) {
    callback({
      'error': 'Error adding website to pause list. Invalid domain: ' + domain
    });
    return;
  }

  browser.storage.sync.get(['blockedDomains'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = result.blockedDomains[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var blockedDomain = _step.value;

        if (blockedDomain.domain == domain) {
          callback({
            'error': domain + ' is already present in the pause list.'
          });
          return;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    result.blockedDomains.push({
      'domain': domain,
      'blockSubdomains': blockSubdomains
    });
    browser.storage.sync.set({
      'blockedDomains': result.blockedDomains
    }, Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function () {
      callback({});
    }));
  }));
}; // removeBlockedDomain function
// tells the inspector to remove a blocked domian from the pause list and updates the storage


var removeBlockedDomain = function removeBlockedDomain(domain, callback) {
  inspector.removeBlockedDomain(domain);
  browser.storage.sync.get(['blockedDomains'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
    var i = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = result.blockedDomains[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var blockedDomain = _step2.value;

        if (blockedDomain.domain == domain) {
          result.blockedDomains.splice(i, 1);
          break;
        }

        i++;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    browser.storage.sync.set({
      'blockedDomains': result.blockedDomains
    }, Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function () {
      callback();
    }));
  }));
}; // increment local in-memory page counter, and set the load date in storage


var incrementPausePageCounter = function incrementPausePageCounter(callback) {
  pausePageCounter++;
  callback(pausePageCounter);
  browser.storage.sync.get(['pausePageOpens'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
    var pausePageOpens;

    if ('pausePageOpens' in result) {
      pausePageOpens = result.pausePageOpens;

      if (Array.isArray(pausePageOpens)) {
        pausePageOpens.push(new Date().toJSON());
      } else {
        pausePageOpens = [new Date().toJSON()];
      }
    } else {
      pausePageOpens = [new Date().toJSON()];
    }

    browser.storage.sync.set({
      'pausePageOpens': pausePageOpens
    });
  }));
};

var setPauseTimeout = function setPauseTimeout(timeout, callback) {
  if (isNaN(timeout)) {
    callback({
      'error': 'Invalid Timeout value' + timeout
    });
  } else {
    if (timeout > 300 || timeout < 1) {
      callback({
        'error': 'The timeout value must be between 1 and 300 seconds'
      });
      return;
    }

    browser.storage.sync.set({
      'pauseTimeout': parseInt(timeout)
    }, function () {
      callback({
        'success': true
      });
    });
  }
};

var getStats = function getStats() {
  return new Promise(function (resolve, reject) {
    browser.storage.sync.get(['pausePageOpens'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
      var pausePageOpens;

      if ('pausePageOpens' in result) {
        pausePageOpens = result.pausePageOpens;

        if (Array.isArray(pausePageOpens)) {
          var firstOpen = pausePageOpens[0];
          var countOpens = pausePageOpens.length; // a 24 element array where each hour will be hold the cumulative for that hour

          var opensByHour = new Array(24).fill(0);
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = pausePageOpens[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var pausePageOpen = _step3.value;

              if (pausePageOpen < firstOpen) {
                firstOpen = pausePageOpen;
              }

              var pausePageOpenDate = new Date(pausePageOpen);
              opensByHour[pausePageOpenDate.getHours()] += 1;
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          var dateDiff = function dateDiff(date1, date2) {
            var dt1 = new Date(date1);
            var dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
          };

          var daysSinceFirstOpen = dateDiff(firstOpen, new Date());
          var weeksSinceFirstOpen = daysSinceFirstOpen / 7;

          if (weeksSinceFirstOpen < 1) {
            weeksSinceFirstOpen = 1;
          }

          var monthsSinceFirstOpen = daysSinceFirstOpen / 30.5;

          if (monthsSinceFirstOpen < 1) {
            monthsSinceFirstOpen = 1;
          }

          var opensPerDay = Math.round(100 * countOpens / daysSinceFirstOpen) / 100;
          var opensPerWeek = Math.round(100 * countOpens / weeksSinceFirstOpen) / 100;
          var opensPerMonth = Math.round(100 * countOpens / monthsSinceFirstOpen) / 100;
          resolve({
            'opensPerDay': opensPerDay,
            'opensPerWeek': opensPerWeek,
            'opensPerMonth': opensPerMonth,
            'opensByHour': opensByHour
          });
        } else {
          reject();
        }
      } else {
        reject();
      }
    }));
  });
};

var resolveMessage = function resolveMessage(msg, sender, msgCallback) {
  if (msg.subject === 'allowDomainOnce') {
    // allow domain once, for specific tab (continue button)
    var tabId = null; // check  if the sender.tab.id is present
    // messages from popups will not have a sender.tab.id

    if (Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["checkNested"])(sender, 'tab', 'id')) {
      tabId = sender.tab.id;
    }

    inspector.allowDomainOnce(msg.url, tabId);
    msgCallback();
  } else if (msg.subject === 'allowDomain') {
    // allow domain for 24 hours (persistent)
    allowDomain(msg.url, msgCallback);
    return true;
  } else if (msg.subject === 'isUrlAllowed') {
    // check if url is allowed, for specific tab
    // wrap it in a try catch block, so that if there is a bug, always return true
    if (!msg.url || msg.url == "") {
      msgCallback(true);
    }

    if (!sender.tab) {
      msgCallback(true);
    }

    var resultIsAllowed = true;

    try {
      var _tabId = null; // make sure that sender.tab.id is present, otherwise we will be getting rollbar errors
      // messages from popups will not have a sender.tab.id

      if (Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["checkNested"])(sender, 'tab', 'id')) {
        _tabId = sender.tab.id;
      }

      resultIsAllowed = inspector.isUrlAllowed(msg.url, _tabId, msg.referrer);
    } catch (e) {
      rollbar.error(e);
    }

    msgCallback(resultIsAllowed);
  } else if (msg.subject === 'getBlockedUrlName') {
    msgCallback(inspector.getBlockedUrlName(msg.url));
  } else if (msg.subject === 'toggleOnOff') {
    var toggle = inspector.getActiveState();
    toggle = !toggle;

    if (toggle) {
      setExtensionActive();
    } else {
      setExtensionInactive();
    }

    msgCallback(inspector.getActiveState());
  } else if (msg.subject === 'getActiveState') {
    msgCallback(inspector.getActiveState());
  } else if (msg.subject === 'getBlockedDomains') {
    browser.storage.sync.get(['blockedDomains'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
      msgCallback(result.blockedDomains);
    }));
    return true;
  } else if (msg.subject === 'getPauseTimeout') {
    browser.storage.sync.get(['pauseTimeout'], Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (result) {
      if (!result.pauseTimeout) {
        msgCallback(5);
      } else {
        msgCallback(result.pauseTimeout);
      }
    }));
    return true;
  } else if (msg.subject === 'addBlockedDomain') {
    addBlockedDomain(msg.domain, msgCallback);
    return true;
  } else if (msg.subject === 'removeBlockedDomain') {
    removeBlockedDomain(msg.domain, msgCallback);
    return true;
  } else if (msg.subject === 'incrementPausePageCounter') {
    incrementPausePageCounter(msgCallback);
    return true;
  } else if (msg.subject === 'setPauseTimeout') {
    setPauseTimeout(msg.timeout, msgCallback);
    return true;
  } else if (msg.subject === 'getStats') {
    getStats().then(function (result) {
      msgCallback(result);
    }, function () {
      msgCallback({
        'error': 'No stats found'
      });
    });
    return true;
  }
};

initializeExtension(); // sync the local blocked domains with the sync storage every 10 minutes

setInterval(function () {
  syncBlockedDomains();
}, 10 * 60 * 1000); // 10 minutes
// message listener
// listen from various messages from pages and content scripts

browser.runtime.onMessage.addListener(Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (msg, sender, msgCallback) {
  if (!inspector) {
    // if inspector is not initialized, initialize it, and then resolve the message
    initializeExtension().then(function () {
      resolveMessage(msg, sender, msgCallback);
    });
    return true;
  } else {
    return resolveMessage(msg, sender, msgCallback);
  }
})); // listen for tab create
// this is to catch opening secondary pages in new tabs on pages that were allowed once (continue btn)

browser.tabs.onCreated.addListener(Object(_lib_util_js__WEBPACK_IMPORTED_MODULE_4__["callbackErrorHandler"])(function (newTab) {
  if (!newTab) {
    return;
  } // since chrome 79, there is a new parameter pendingUrl. 
  // depending on timing, we can find the URL in url or pendingUrl


  var newTabUrl = newTab.url;

  if (!newTabUrl) {
    newTabUrl = newTab.pendingUrl;
  }

  if (!inspector) {
    // if inspector is not initialized, initialize it, and then processNewTabOpen
    initializeExtension().then(function () {
      inspector.processNewTabOpen(newTab.openerTabId, newTab.id, newTabUrl);
    });
    return true;
  } else {
    inspector.processNewTabOpen(newTab.openerTabId, newTab.id, newTabUrl);
  }
}));
browser.runtime.setUninstallURL("https://freedom-app.typeform.com/to/KvYEZp#ext=pause");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


var Rollbar = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var isContentScripLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (isContentScripLoad == true && _settings_js__WEBPACK_IMPORTED_MODULE_0__["default"].BROWSER == 'firefox') {
    // do not load rollbar if it is a Firefox content script
    // for some unknown reason rollbar does not work in a FF content script
    return {};
  } else {
    // load rollbar for all other cases
    return new Rollbar({
      accessToken: _settings_js__WEBPACK_IMPORTED_MODULE_0__["default"]['ROLLBAR_TOKEN'],
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: _settings_js__WEBPACK_IMPORTED_MODULE_0__["default"]['ENV']
      },
      checkIgnore: function checkIgnore(isUncaught, args, payload) {
        // ignore resize observer loop error
        if (args[0] == 'ResizeObserver loop limit exceeded') {
          return true;
        } else if (args[0] == '"[unhandledrejection] error getting `reason` from event"') {
          return true;
        } else if (args[0] == 'Unknown error. There was no error message to display.') {
          return true;
        } else {
          return false;
        }
      }
    });
  }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var appSettings = {
  ENV: "production",
  VERSION: Object({"NODE_ENV":"production","BROWSER":undefined,"MICROSOFT":undefined}).VERSION,
  BROWSER: undefined,
  ROLLBAR_TOKEN: "0abc5cd4a44e4e669b6ec556bd5c2521",
  ALLOWED_DOMAIN_TIMEOUT: 24 * 60 * 60 * 1000,
  GOOGLE_ANALYTICS_ID: 'UA-58052768-15'
};
/* harmony default export */ __webpack_exports__["default"] = (appSettings);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(1)},function(t,e,r){"use strict";var n=r(2),o="undefined"!=typeof window&&window._rollbarConfig,i=o&&o.globalAlias||"Rollbar",a="undefined"!=typeof window&&window[i]&&"function"==typeof window[i].shimId&&void 0!==window[i].shimId();if("undefined"==typeof window||window._rollbarStartTime||(window._rollbarStartTime=(new Date).getTime()),!a&&o){var s=new n(o);window[i]=s}else"undefined"!=typeof window?(window.rollbar=n,window._rollbarDidLoad=!0):"undefined"!=typeof self&&(self.rollbar=n,self._rollbarDidLoad=!0);t.exports=n},function(t,e,r){"use strict";function n(t,e){this.options=c.handleOptions(x,t);var r=new l(this.options,h,d);this.client=e||new u(this.options,r,p,"browser");var n="undefined"!=typeof window&&window||"undefined"!=typeof self&&self,o="undefined"!=typeof document&&document;i(this.client.notifier,n),a(this.client.queue),(this.options.captureUncaught||this.options.handleUncaughtExceptions)&&(f.captureUncaughtExceptions(n,this),f.wrapGlobals(n,this)),(this.options.captureUnhandledRejections||this.options.handleUnhandledRejections)&&f.captureUnhandledRejections(n,this),this.instrumenter=new w(this.options,this.client.telemeter,this,n,o),this.instrumenter.instrument()}function o(t){var e="Rollbar is not initialized";p.error(e),t&&t(new Error(e))}function i(t,e){t.addTransform(m.handleItemWithError).addTransform(m.ensureItemHasSomethingToSay).addTransform(m.addBaseInfo).addTransform(m.addRequestInfo(e)).addTransform(m.addClientInfo(e)).addTransform(m.addPluginInfo(e)).addTransform(m.addBody).addTransform(g.addMessageWithError).addTransform(g.addTelemetryData).addTransform(g.addConfigToPayload).addTransform(m.scrubPayload).addTransform(g.userTransform(p)).addTransform(g.itemToPayload)}function a(t){t.addPredicate(y.checkLevel).addPredicate(v.checkIgnore).addPredicate(y.userCheckIgnore(p)).addPredicate(y.urlIsNotBlacklisted(p)).addPredicate(y.urlIsWhitelisted(p)).addPredicate(y.messageIsIgnored(p))}function s(t){for(var e=0,r=t.length;e<r;++e)if(c.isFunction(t[e]))return t[e]}var u=r(3),c=r(5),l=r(11),p=r(13),f=r(16),h=r(17),d=r(19),m=r(20),g=r(24),v=r(25),y=r(26),b=r(21),w=r(27),_=null;n.init=function(t,e){return _?_.global(t).configure(t):_=new n(t,e)},n.prototype.global=function(t){return this.client.global(t),this},n.global=function(t){return _?_.global(t):void o()},n.prototype.configure=function(t,e){var r=this.options,n={};return e&&(n={payload:e}),this.options=c.handleOptions(r,t,n),this.client.configure(this.options,e),this.instrumenter.configure(this.options),this},n.configure=function(t,e){return _?_.configure(t,e):void o()},n.prototype.lastError=function(){return this.client.lastError},n.lastError=function(){return _?_.lastError():void o()},n.prototype.log=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.log(t),{uuid:e}},n.log=function(){if(_)return _.log.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.debug=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.debug(t),{uuid:e}},n.debug=function(){if(_)return _.debug.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.info=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.info(t),{uuid:e}},n.info=function(){if(_)return _.info.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.warn=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warn(t),{uuid:e}},n.warn=function(){if(_)return _.warn.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.warning=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.warning(t),{uuid:e}},n.warning=function(){if(_)return _.warning.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.error=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.error(t),{uuid:e}},n.error=function(){if(_)return _.error.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.critical=function(){var t=this._createItem(arguments),e=t.uuid;return this.client.critical(t),{uuid:e}},n.critical=function(){if(_)return _.critical.apply(_,arguments);var t=s(arguments);o(t)},n.prototype.handleUncaughtException=function(t,e,r,n,o,i){var a,s=c.makeUnhandledStackInfo(t,e,r,n,o,"onerror","uncaught exception",b);c.isError(o)?(a=this._createItem([t,o,i]),a._unhandledStackInfo=s):c.isError(e)?(a=this._createItem([t,e,i]),a._unhandledStackInfo=s):(a=this._createItem([t,i]),a.stackInfo=s),a.level=this.options.uncaughtErrorLevel,a._isUncaught=!0,this.client.log(a)},n.prototype.handleUnhandledRejection=function(t,e){var r="unhandled rejection was null or undefined!";if(t)if(t.message)r=t.message;else{var n=c.stringify(t);n.value&&(r=n.value)}var o,i=t&&t._rollbarContext||e&&e._rollbarContext;c.isError(t)?o=this._createItem([r,t,i]):(o=this._createItem([r,t,i]),o.stackInfo=c.makeUnhandledStackInfo(r,"",0,0,null,"unhandledrejection","",b)),o.level=this.options.uncaughtErrorLevel,o._isUncaught=!0,o._originalArgs=o._originalArgs||[],o._originalArgs.push(e),this.client.log(o)},n.prototype.wrap=function(t,e,r){try{var n;if(n=c.isFunction(e)?e:function(){return e||{}},!c.isFunction(t))return t;if(t._isWrap)return t;if(!t._rollbar_wrapped&&(t._rollbar_wrapped=function(){r&&c.isFunction(r)&&r.apply(this,arguments);try{return t.apply(this,arguments)}catch(r){var e=r;throw e&&window._rollbarWrappedError!==e&&(c.isType(e,"string")&&(e=new String(e)),e._rollbarContext=n()||{},e._rollbarContext._wrappedSource=t.toString(),window._rollbarWrappedError=e),e}},t._rollbar_wrapped._isWrap=!0,t.hasOwnProperty))for(var o in t)t.hasOwnProperty(o)&&"_rollbar_wrapped"!==o&&(t._rollbar_wrapped[o]=t[o]);return t._rollbar_wrapped}catch(e){return t}},n.wrap=function(t,e){return _?_.wrap(t,e):void o()},n.prototype.captureEvent=function(){var t=c.createTelemetryEvent(arguments);return this.client.captureEvent(t.type,t.metadata,t.level)},n.captureEvent=function(){return _?_.captureEvent.apply(_,arguments):void o()},n.prototype.captureDomContentLoaded=function(t,e){return e||(e=new Date),this.client.captureDomContentLoaded(e)},n.prototype.captureLoad=function(t,e){return e||(e=new Date),this.client.captureLoad(e)},n.prototype._createItem=function(t){return c.createItem(t,p,this)};var x={version:"2.5.5",scrubFields:["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken","cc-number","card number","cardnumber","cardnum","ccnum","ccnumber","cc num","creditcardnumber","credit card number","newcreditcardnumber","new credit card","creditcardno","credit card no","card#","card #","cc-csc","cvc2","cvv2","ccv2","security code","card verification","name on credit card","name on card","nameoncard","cardholder","card holder","name des karteninhabers","card type","cardtype","cc type","cctype","payment type","expiration date","expirationdate","expdate","cc-exp"],logLevel:"debug",reportLevel:"debug",uncaughtErrorLevel:"error",endpoint:"api.rollbar.com/api/1/item/",verbose:!1,enabled:!0,sendConfig:!1,includeItemsInTelemetry:!0,captureIp:!0};t.exports=n},function(t,e,r){"use strict";function n(t,e,r,o){this.options=c.merge(t),this.logger=r,n.rateLimiter.configureGlobal(this.options),n.rateLimiter.setPlatformOptions(o,this.options),this.queue=new a(n.rateLimiter,e,r,this.options),this.notifier=new s(this.queue,this.options),this.telemeter=new u(this.options),this.lastError=null,this.lastErrorHash="none"}function o(t){var e=t.message||"",r=(t.err||{}).stack||String(t.err);return e+"::"+r}var i=r(4),a=r(8),s=r(9),u=r(10),c=r(5),l={maxItems:0,itemsPerMinute:60};n.rateLimiter=new i(l),n.prototype.global=function(t){return n.rateLimiter.configureGlobal(t),this},n.prototype.configure=function(t,e){var r=this.options,n={};return e&&(n={payload:e}),this.options=c.merge(r,t,n),this.notifier&&this.notifier.configure(this.options),this.telemeter&&this.telemeter.configure(this.options),this.global(this.options),this},n.prototype.log=function(t){var e=this._defaultLogLevel();return this._log(e,t)},n.prototype.debug=function(t){this._log("debug",t)},n.prototype.info=function(t){this._log("info",t)},n.prototype.warn=function(t){this._log("warning",t)},n.prototype.warning=function(t){this._log("warning",t)},n.prototype.error=function(t){this._log("error",t)},n.prototype.critical=function(t){this._log("critical",t)},n.prototype.wait=function(t){this.queue.wait(t)},n.prototype.captureEvent=function(t,e,r){return this.telemeter.captureEvent(t,e,r)},n.prototype.captureDomContentLoaded=function(t){return this.telemeter.captureDomContentLoaded(t)},n.prototype.captureLoad=function(t){return this.telemeter.captureLoad(t)},n.prototype._log=function(t,e){var r;if(e.callback&&(r=e.callback,delete e.callback),this._sameAsLastError(e)){if(r){var n=new Error("ignored identical item");n.item=e,r(n)}}else try{e.level=e.level||t,this.telemeter._captureRollbarItem(e),e.telemetryEvents=this.telemeter.copyEvents(),this.notifier.log(e,r)}catch(t){this.logger.error(t)}},n.prototype._defaultLogLevel=function(){return this.options.logLevel||"debug"},n.prototype._sameAsLastError=function(t){if(!t._isUncaught)return!1;var e=o(t);return this.lastErrorHash===e||(this.lastError=t.err,this.lastErrorHash=e,!1)},t.exports=n},function(t,e,r){"use strict";function n(t){this.startTime=s.now(),this.counter=0,this.perMinCounter=0,this.platform=null,this.platformOptions={},this.configureGlobal(t)}function o(t,e,r){return!t.ignoreRateLimit&&e>=1&&r>e}function i(t,e,r,n,o,i,s){var u=null;return r&&(r=new Error(r)),r||n||(u=a(t,e,o,i,s)),{error:r,shouldSend:n,payload:u}}function a(t,e,r,n,o){var i,a=e.environment||e.payload&&e.payload.environment;i=o?"item per minute limit reached, ignoring errors until timeout":"maxItems has been hit, ignoring errors until reset.";var s={body:{message:{body:i,extra:{maxItems:r,itemsPerMinute:n}}},language:"javascript",environment:a,notifier:{version:e.notifier&&e.notifier.version||e.version}};return"browser"===t?(s.platform="browser",s.framework="browser-js",s.notifier.name="rollbar-browser-js"):"server"===t?(s.framework=e.framework||"node-js",s.notifier.name=e.notifier.name):"react-native"===t&&(s.framework=e.framework||"react-native",s.notifier.name=e.notifier.name),s}var s=r(5);n.globalSettings={startTime:s.now(),maxItems:void 0,itemsPerMinute:void 0},n.prototype.configureGlobal=function(t){void 0!==t.startTime&&(n.globalSettings.startTime=t.startTime),void 0!==t.maxItems&&(n.globalSettings.maxItems=t.maxItems),void 0!==t.itemsPerMinute&&(n.globalSettings.itemsPerMinute=t.itemsPerMinute)},n.prototype.shouldSend=function(t,e){e=e||s.now();var r=e-this.startTime;(r<0||r>=6e4)&&(this.startTime=e,this.perMinCounter=0);var a=n.globalSettings.maxItems,u=n.globalSettings.itemsPerMinute;if(o(t,a,this.counter))return i(this.platform,this.platformOptions,a+" max items reached",!1);if(o(t,u,this.perMinCounter))return i(this.platform,this.platformOptions,u+" items per minute reached",!1);this.counter++,this.perMinCounter++;var c=!o(t,a,this.counter),l=c;return c=c&&!o(t,u,this.perMinCounter),i(this.platform,this.platformOptions,null,c,a,u,l)},n.prototype.setPlatformOptions=function(t,e){this.platform=t,this.platformOptions=e},t.exports=n},function(t,e,r){"use strict";function n(){if(!P&&(P=!0,c(JSON)&&(s(JSON.stringify)&&(q.stringify=JSON.stringify),s(JSON.parse)&&(q.parse=JSON.parse)),!a(q.stringify)||!a(q.parse))){var t=r(7);t(q)}}function o(t,e){return e===i(t)}function i(t){var e=typeof t;return"object"!==e?e:t?t instanceof Error?"error":{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase():"null"}function a(t){return o(t,"function")}function s(t){var e=/[\\^$.*+?()[\]{}|]/g,r=Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(e,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?"),n=RegExp("^"+r+"$");return u(t)&&n.test(t)}function u(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}function c(t){return!o(t,"undefined")}function l(t){var e=i(t);return"object"===e||"array"===e}function p(t){return o(t,"error")||o(t,"exception")}function f(t,e,r){var n,i,a,s=o(t,"object"),u=o(t,"array"),c=[];if(s&&r.indexOf(t)!==-1)return t;if(r.push(t),s)for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&c.push(n);else if(u)for(a=0;a<t.length;++a)c.push(a);var l=s?{}:[],p=!0;for(a=0;a<c.length;++a)n=c[a],i=t[n],l[n]=e(n,i,r),p=p&&l[n]===t[n];return 0==c.length||p?t:l}function h(){return"********"}function d(){var t=j(),e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var r=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?r:7&r|8).toString(16)});return e}function m(t){var e=g(t);return e?(""===e.anchor&&(e.source=e.source.replace("#","")),t=e.source.replace("?"+e.query,"")):"(unknown)"}function g(t){if(o(t,"string")){for(var e=M,r=e.parser[e.strictMode?"strict":"loose"].exec(t),n={},i=0,a=e.key.length;i<a;++i)n[e.key[i]]=r[i]||"";return n[e.q.name]={},n[e.key[12]].replace(e.q.parser,function(t,r,o){r&&(n[e.q.name][r]=o)}),n}}function v(t,e,r){r=r||{},r.access_token=t;var n,o=[];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&o.push([n,r[n]].join("="));var i="?"+o.sort().join("&");e=e||{},e.path=e.path||"";var a,s=e.path.indexOf("?"),u=e.path.indexOf("#");s!==-1&&(u===-1||u>s)?(a=e.path,e.path=a.substring(0,s)+i+"&"+a.substring(s+1)):u!==-1?(a=e.path,e.path=a.substring(0,u)+i+a.substring(u)):e.path=e.path+i}function y(t,e){if(e=e||t.protocol,!e&&t.port&&(80===t.port?e="http:":443===t.port&&(e="https:")),e=e||"https:",!t.hostname)return null;var r=e+"//"+t.hostname;return t.port&&(r=r+":"+t.port),t.path&&(r+=t.path),r}function b(t,e){var r,n;try{r=q.stringify(t)}catch(o){if(e&&a(e))try{r=e(t)}catch(t){n=t}else n=o}return{error:n,value:r}}function w(t){var e,r;try{e=q.parse(t)}catch(t){r=t}return{error:r,value:e}}function _(t,e,r,n,o,i,a,s){var u={url:e||"",line:r,column:n};u.func=s.guessFunctionName(u.url,u.line),u.context=s.gatherContext(u.url,u.line);var c=document&&document.location&&document.location.href,l=window&&window.navigator&&window.navigator.userAgent;return{mode:i,message:o?String(o):t||a,url:c,stack:[u],useragent:l}}function x(t,e){return function(r,n){try{e(r,n)}catch(e){t.error(e)}}}function k(t,e,r,n,o){for(var a,s,u,c,l,p,f=[],h=0,m=t.length;h<m;++h){p=t[h];var g=i(p);switch(g){case"undefined":break;case"string":a?f.push(p):a=p;break;case"function":c=x(e,p);break;case"date":f.push(p);break;case"error":case"domexception":case"exception":s?f.push(p):s=p;break;case"object":case"array":if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}if(n&&"object"===g&&!l){for(var v=0,y=n.length;v<y;++v)if(void 0!==p[n[v]]){l=p;break}if(l)break}u?f.push(p):u=p;break;default:if(p instanceof Error||"undefined"!=typeof DOMException&&p instanceof DOMException){s?f.push(p):s=p;break}f.push(p)}}f.length>0&&(u=F(u),u.extraArgs=f);var b={message:a,err:s,custom:u,timestamp:j(),callback:c,uuid:d()};return u&&void 0!==u.level&&(b.level=u.level,delete u.level),n&&l&&(b.request=l),o&&(b.lambdaContext=o),b._originalArgs=t,b}function E(t,e){for(var r=0;r<t.length;++r)if(t[r]===e)return!0;return!1}function I(t){for(var e,r,n,o,a=0,s=t.length;a<s;++a){o=t[a];var u=i(o);switch(u){case"string":E(U,o)?e=o:E(H,o)&&(n=o);break;case"object":r=o}}var c={type:e||"manual",metadata:r||{},level:n};return c}function T(t,e){if(t){var r=e.split("."),n=t;try{for(var o=0,i=r.length;o<i;++o)n=n[r[o]]}catch(t){n=void 0}return n}}function S(t,e,r){if(t){var n=e.split("."),o=n.length;if(!(o<1)){if(1===o)return void(t[n[0]]=r);try{for(var i=t[n[0]]||{},a=i,s=1;s<o-1;++s)i[n[s]]=i[n[s]]||{},i=i[n[s]];i[n[o-1]]=r,t[n[0]]=a}catch(t){return}}}}function O(t,e){function r(t,e){return e+h()}function n(t){var e;if(o(t,"string"))for(e=0;e<u.length;++e)t=t.replace(u[e],r);return t}function i(t,e){var r;for(r=0;r<s.length;++r)if(s[r].test(t)){e=h();break}return e}function a(t,e,r){var s=i(t,e);return s===e?o(e,"object")||o(e,"array")?f(e,a,r):n(s):s}e=e||[];var s=L(e),u=N(e);return f(t,a,[])}function L(t){for(var e,r=[],n=0;n<t.length;++n)e="^\\[?(%5[bB])?"+t[n]+"\\[?(%5[bB])?\\]?(%5[dD])?$",r.push(new RegExp(e,"i"));return r}function N(t){for(var e,r=[],n=0;n<t.length;++n)e="\\[?(%5[bB])?"+t[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",r.push(new RegExp("("+e+"=)([^&\\n]+)","igm"));return r}function C(t){var e,r,n,o=[];for(e=0,r=t.length;e<r;++e){switch(n=t[e],i(n)){case"object":n=b(n),n=n.error||n.value,n.length>500&&(n=n.substr(0,497)+"...");break;case"null":n="null";break;case"undefined":n="undefined";break;case"symbol":n=n.toString()}o.push(n)}return o.join(" ")}function j(){return Date.now?+Date.now():+new Date}function R(t,e){if(t&&t.user_ip&&e!==!0){var r=t.user_ip;if(e)try{var n;if(r.indexOf(".")!==-1)n=r.split("."),n.pop(),n.push("0"),r=n.join(".");else if(r.indexOf(":")!==-1){if(n=r.split(":"),n.length>2){var o=n.slice(0,3),i=o[2].indexOf("/");i!==-1&&(o[2]=o[2].substring(0,i));var a="0000:0000:0000:0000:0000";r=o.concat(a).join(":")}}else r=null}catch(t){r=null}else r=null;t.user_ip=r}}function A(t,e,r){var n=F(t,e,r);return!e||e.overwriteScrubFields?n:(e.scrubFields&&(n.scrubFields=(t.scrubFields||[]).concat(e.scrubFields)),n)}var F=r(6),q={},P=!1;n();var D={debug:0,info:1,warning:2,error:3,critical:4},M={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},U=["log","network","dom","navigation","error","manual"],H=["critical","error","warning","info","debug"];t.exports={addParamsAndAccessTokenToPath:v,createItem:k,createTelemetryEvent:I,filterIp:R,formatArgsAsString:C,formatUrl:y,get:T,handleOptions:A,isError:p,isFunction:a,isIterable:l,isNativeFunction:s,isType:o,jsonParse:w,LEVELS:D,makeUnhandledStackInfo:_,merge:F,now:j,redact:h,sanitizeUrl:m,scrub:O,set:S,stringify:b,traverse:f,typeName:i,uuid4:d}},function(t,e){"use strict";function r(){var t,e,n,o,a,s={},u=null,c=arguments.length;for(t=0;t<c;t++)if(u=arguments[t],null!=u)for(a in u)e=s[a],n=u[a],s!==n&&(n&&i(n)?(o=e&&i(e)?e:{},s[a]=r(o,n)):"undefined"!=typeof n&&(s[a]=n));return s}var n=Object.prototype.hasOwnProperty,o=Object.prototype.toString,i=function(t){if(!t||"[object Object]"!==o.call(t))return!1;var e=n.call(t,"constructor"),r=t.constructor&&t.constructor.prototype&&n.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!e&&!r)return!1;var i;for(i in t);return"undefined"==typeof i||n.call(t,i)};t.exports=r},function(t,e){var r=function(t){function e(t){return t<10?"0"+t:t}function r(){return this.valueOf()}function n(t){return i.lastIndex=0,i.test(t)?'"'+t.replace(i,function(t){var e=u[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function o(t,e){var r,i,u,l,p,f=a,h=e[t];switch(h&&"object"==typeof h&&"function"==typeof h.toJSON&&(h=h.toJSON(t)),"function"==typeof c&&(h=c.call(e,t,h)),typeof h){case"string":return n(h);case"number":return isFinite(h)?String(h):"null";case"boolean":case"null":return String(h);case"object":if(!h)return"null";if(a+=s,p=[],"[object Array]"===Object.prototype.toString.apply(h)){for(l=h.length,r=0;r<l;r+=1)p[r]=o(r,h)||"null";return u=0===p.length?"[]":a?"[\n"+a+p.join(",\n"+a)+"\n"+f+"]":"["+p.join(",")+"]",a=f,u}if(c&&"object"==typeof c)for(l=c.length,r=0;r<l;r+=1)"string"==typeof c[r]&&(i=c[r],u=o(i,h),u&&p.push(n(i)+(a?": ":":")+u));else for(i in h)Object.prototype.hasOwnProperty.call(h,i)&&(u=o(i,h),u&&p.push(n(i)+(a?": ":":")+u));return u=0===p.length?"{}":a?"{\n"+a+p.join(",\n"+a)+"\n"+f+"}":"{"+p.join(",")+"}",a=f,u}}var i=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+e(this.getUTCMonth()+1)+"-"+e(this.getUTCDate())+"T"+e(this.getUTCHours())+":"+e(this.getUTCMinutes())+":"+e(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=r,Number.prototype.toJSON=r,String.prototype.toJSON=r);var a,s,u,c;"function"!=typeof t.stringify&&(u={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},t.stringify=function(t,e,r){var n;if(a="",s="","number"==typeof r)for(n=0;n<r;n+=1)s+=" ";else"string"==typeof r&&(s=r);if(c=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return o("",{"":t})}),"function"!=typeof t.parse&&(t.parse=function(){function t(t){return t.replace(/\\(?:u(.{4})|([^u]))/g,function(t,e,r){return e?String.fromCharCode(parseInt(e,16)):a[r]})}var e,r,n,o,i,a={"\\":"\\",'"':'"',"/":"/",t:"\t",n:"\n",r:"\r",f:"\f",b:"\b"},s={go:function(){e="ok"},firstokey:function(){o=i,e="colon"},okey:function(){o=i,e="colon"},ovalue:function(){e="ocomma"},firstavalue:function(){e="acomma"},avalue:function(){e="acomma"}},u={go:function(){e="ok"},ovalue:function(){e="ocomma"},firstavalue:function(){e="acomma"},avalue:function(){e="acomma"}},c={"{":{go:function(){r.push({state:"ok"}),n={},e="firstokey"},ovalue:function(){r.push({container:n,state:"ocomma",key:o}),n={},e="firstokey"},firstavalue:function(){r.push({container:n,state:"acomma"}),n={},e="firstokey"},avalue:function(){r.push({container:n,state:"acomma"}),n={},e="firstokey"}},"}":{firstokey:function(){var t=r.pop();i=n,n=t.container,o=t.key,e=t.state},ocomma:function(){var t=r.pop();n[o]=i,i=n,n=t.container,o=t.key,e=t.state}},"[":{go:function(){r.push({state:"ok"}),n=[],e="firstavalue"},ovalue:function(){r.push({container:n,state:"ocomma",key:o}),n=[],e="firstavalue"},firstavalue:function(){r.push({container:n,state:"acomma"}),n=[],e="firstavalue"},avalue:function(){r.push({container:n,state:"acomma"}),n=[],e="firstavalue"}},"]":{firstavalue:function(){var t=r.pop();i=n,n=t.container,o=t.key,e=t.state},acomma:function(){var t=r.pop();n.push(i),i=n,n=t.container,o=t.key,e=t.state}},":":{colon:function(){if(Object.hasOwnProperty.call(n,o))throw new SyntaxError("Duplicate key '"+o+'"');e="ovalue"}},",":{ocomma:function(){n[o]=i,e="okey"},acomma:function(){n.push(i),e="avalue"}},true:{go:function(){i=!0,e="ok"},ovalue:function(){i=!0,e="ocomma"},firstavalue:function(){i=!0,e="acomma"},avalue:function(){i=!0,e="acomma"}},false:{go:function(){i=!1,e="ok"},ovalue:function(){i=!1,e="ocomma"},firstavalue:function(){i=!1,e="acomma"},avalue:function(){i=!1,e="acomma"}},null:{go:function(){i=null,e="ok"},ovalue:function(){i=null,e="ocomma"},firstavalue:function(){i=null,e="acomma"},avalue:function(){i=null,e="acomma"}}};return function(n,o){var a,l=/^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;e="go",r=[];try{for(;;){if(a=l.exec(n),!a)break;a[1]?c[a[1]][e]():a[2]?(i=+a[2],u[e]()):(i=t(a[3]),s[e]()),n=n.slice(a[0].length)}}catch(t){e=t}if("ok"!==e||/[^\u0020\t\n\r]/.test(n))throw e instanceof SyntaxError?e:new SyntaxError("JSON");return"function"==typeof o?function t(e,r){var n,a,s=e[r];if(s&&"object"==typeof s)for(n in i)Object.prototype.hasOwnProperty.call(s,n)&&(a=t(s,n),void 0!==a?s[n]=a:delete s[n]);return o.call(e,r,s)}({"":i},""):i}}())};t.exports=r},function(t,e,r){"use strict";function n(t,e,r,n){this.rateLimiter=t,this.api=e,this.logger=r,this.options=n,this.predicates=[],this.pendingItems=[],this.pendingRequests=[],this.retryQueue=[],this.retryHandle=null,this.waitCallback=null,this.waitIntervalID=null}var o=r(5);n.prototype.configure=function(t){this.api&&this.api.configure(t);var e=this.options;return this.options=o.merge(e,t),this},n.prototype.addPredicate=function(t){return o.isFunction(t)&&this.predicates.push(t),this},n.prototype.addPendingItem=function(t){this.pendingItems.push(t)},n.prototype.removePendingItem=function(t){var e=this.pendingItems.indexOf(t);e!==-1&&this.pendingItems.splice(e,1)},n.prototype.addItem=function(t,e,r,n){e&&o.isFunction(e)||(e=function(){});var i=this._applyPredicates(t);if(i.stop)return this.removePendingItem(n),void e(i.err);this._maybeLog(t,r),this.removePendingItem(n),this.pendingRequests.push(t);try{this._makeApiRequest(t,function(r,n){this._dequeuePendingRequest(t),e(r,n)}.bind(this))}catch(r){this._dequeuePendingRequest(t),e(r)}},n.prototype.wait=function(t){o.isFunction(t)&&(this.waitCallback=t,this._maybeCallWait()||(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitIntervalID=setInterval(function(){this._maybeCallWait()}.bind(this),500)))},n.prototype._applyPredicates=function(t){for(var e=null,r=0,n=this.predicates.length;r<n;r++)if(e=this.predicates[r](t,this.options),!e||void 0!==e.err)return{stop:!0,err:e.err};return{stop:!1,err:null}},n.prototype._makeApiRequest=function(t,e){var r=this.rateLimiter.shouldSend(t);r.shouldSend?this.api.postItem(t,function(r,n){r?this._maybeRetry(r,t,e):e(r,n)}.bind(this)):r.error?e(r.error):this.api.postItem(r.payload,e)};var i=["ECONNRESET","ENOTFOUND","ESOCKETTIMEDOUT","ETIMEDOUT","ECONNREFUSED","EHOSTUNREACH","EPIPE","EAI_AGAIN"];n.prototype._maybeRetry=function(t,e,r){var n=!1;if(this.options.retryInterval)for(var o=0,a=i.length;o<a;o++)if(t.code===i[o]){n=!0;break}n?this._retryApiRequest(e,r):r(t)},n.prototype._retryApiRequest=function(t,e){this.retryQueue.push({item:t,callback:e}),this.retryHandle||(this.retryHandle=setInterval(function(){for(;this.retryQueue.length;){var t=this.retryQueue.shift();this._makeApiRequest(t.item,t.callback)}}.bind(this),this.options.retryInterval))},n.prototype._dequeuePendingRequest=function(t){var e=this.pendingRequests.indexOf(t);e!==-1&&(this.pendingRequests.splice(e,1),this._maybeCallWait())},n.prototype._maybeLog=function(t,e){if(this.logger&&this.options.verbose){var r=e;if(r=r||o.get(t,"body.trace.exception.message"),r=r||o.get(t,"body.trace_chain.0.exception.message"))return void this.logger.error(r);r=o.get(t,"body.message.body"),r&&this.logger.log(r)}},n.prototype._maybeCallWait=function(){return!(!o.isFunction(this.waitCallback)||0!==this.pendingItems.length||0!==this.pendingRequests.length)&&(this.waitIntervalID&&(this.waitIntervalID=clearInterval(this.waitIntervalID)),this.waitCallback(),!0)},t.exports=n},function(t,e,r){"use strict";function n(t,e){this.queue=t,this.options=e,this.transforms=[]}var o=r(5);n.prototype.configure=function(t){this.queue&&this.queue.configure(t);var e=this.options;return this.options=o.merge(e,t),this},n.prototype.addTransform=function(t){return o.isFunction(t)&&this.transforms.push(t),this},n.prototype.log=function(t,e){if(e&&o.isFunction(e)||(e=function(){}),!this.options.enabled)return e(new Error("Rollbar is not enabled"));this.queue.addPendingItem(t);var r=t.err;this._applyTransforms(t,function(n,o){return n?(this.queue.removePendingItem(t),e(n,null)):void this.queue.addItem(o,e,r,t)}.bind(this))},n.prototype._applyTransforms=function(t,e){var r=-1,n=this.transforms.length,o=this.transforms,i=this.options,a=function(t,s){return t?void e(t,null):(r++,r===n?void e(null,s):void o[r](s,i,a))};a(null,t)},t.exports=n},function(t,e,r){"use strict";function n(t){this.queue=[],this.options=i.merge(t);var e=this.options.maxTelemetryEvents||a;this.maxQueueSize=Math.max(0,Math.min(e,a))}function o(t,e){if(e)return e;var r={error:"error",manual:"info"};return r[t]||"info"}var i=r(5),a=100;n.prototype.configure=function(t){var e=this.options;this.options=i.merge(e,t);var r=this.options.maxTelemetryEvents||a,n=Math.max(0,Math.min(r,a)),o=0;this.maxQueueSize>n&&(o=this.maxQueueSize-n),this.maxQueueSize=n,this.queue.splice(0,o)},n.prototype.copyEvents=function(){var t=Array.prototype.slice.call(this.queue,0);if(i.isFunction(this.options.filterTelemetry))try{for(var e=t.length;e--;)this.options.filterTelemetry(t[e])&&t.splice(e,1)}catch(t){this.options.filterTelemetry=null}return t},n.prototype.capture=function(t,e,r,n,a){var s={level:o(t,r),type:t,timestamp_ms:a||i.now(),body:e,source:"client"};n&&(s.uuid=n);try{if(i.isFunction(this.options.filterTelemetry)&&this.options.filterTelemetry(s))return!1}catch(t){this.options.filterTelemetry=null}return this.push(s),s},n.prototype.captureEvent=function(t,e,r,n){return this.capture(t,e,r,n)},n.prototype.captureError=function(t,e,r,n){var o={message:t.message||String(t)};return t.stack&&(o.stack=t.stack),this.capture("error",o,e,r,n)},n.prototype.captureLog=function(t,e,r,n){return this.capture("log",{message:t},e,r,n)},n.prototype.captureNetwork=function(t,e,r,n){e=e||"xhr",t.subtype=t.subtype||e,n&&(t.request=n);var o=this.levelFromStatus(t.status_code);return this.capture("network",t,o,r)},n.prototype.levelFromStatus=function(t){return t>=200&&t<400?"info":0===t||t>=400?"error":"info"},n.prototype.captureDom=function(t,e,r,n,o){var i={subtype:t,element:e};return void 0!==r&&(i.value=r),void 0!==n&&(i.checked=n),this.capture("dom",i,"info",o)},n.prototype.captureNavigation=function(t,e,r){return this.capture("navigation",{from:t,to:e},"info",r)},n.prototype.captureDomContentLoaded=function(t){return this.capture("navigation",{subtype:"DOMContentLoaded"},"info",void 0,t&&t.getTime())},n.prototype.captureLoad=function(t){return this.capture("navigation",{subtype:"load"},"info",void 0,t&&t.getTime())},n.prototype.captureConnectivityChange=function(t,e){return this.captureNetwork({change:t},"connectivity",e)},n.prototype._captureRollbarItem=function(t){if(this.options.includeItemsInTelemetry)return t.err?this.captureError(t.err,t.level,t.uuid,t.timestamp):t.message?this.captureLog(t.message,t.level,t.uuid,t.timestamp):t.custom?this.capture("log",t.custom,t.level,t.uuid,t.timestamp):void 0},n.prototype.push=function(t){this.queue.push(t),this.queue.length>this.maxQueueSize&&this.queue.shift()},t.exports=n},function(t,e,r){"use strict";function n(t,e,r,n){this.options=t,this.transport=e,this.url=r,this.jsonBackup=n,this.accessToken=t.accessToken,this.transportOptions=o(t,r)}function o(t,e){return a.getTransportFromOptions(t,s,e)}var i=r(5),a=r(12),s={hostname:"api.rollbar.com",path:"/api/1/item/",search:null,version:"1",protocol:"https:",port:443};n.prototype.postItem=function(t,e){var r=a.transportOptions(this.transportOptions,"POST"),n=a.buildPayload(this.accessToken,t,this.jsonBackup);this.transport.post(this.accessToken,r,n,e)},n.prototype.configure=function(t){var e=this.oldOptions;return this.options=i.merge(e,t),this.transportOptions=o(this.options,this.url),void 0!==this.options.accessToken&&(this.accessToken=this.options.accessToken),this},t.exports=n},function(t,e,r){"use strict";function n(t,e,r){if(!s.isType(e.context,"string")){var n=s.stringify(e.context,r);n.error?e.context="Error: could not serialize 'context'":e.context=n.value||"",e.context.length>255&&(e.context=e.context.substr(0,255))}return{access_token:t,data:e}}function o(t,e,r){var n=e.hostname,o=e.protocol,i=e.port,a=e.path,s=e.search,u=t.proxy;if(t.endpoint){var c=r.parse(t.endpoint);n=c.hostname,o=c.protocol,i=c.port,a=c.pathname,s=c.search}return{hostname:n,protocol:o,port:i,path:a,search:s,proxy:u}}function i(t,e){var r=t.protocol||"https:",n=t.port||("http:"===r?80:"https:"===r?443:void 0),o=t.hostname,i=t.path;
return t.search&&(i+=t.search),t.proxy&&(i=r+"//"+o+i,o=t.proxy.host||t.proxy.hostname,n=t.proxy.port,r=t.proxy.protocol||r),{protocol:r,hostname:o,path:i,port:n,method:e}}function a(t,e){var r=/\/$/.test(t),n=/^\//.test(e);return r&&n?e=e.substring(1):r||n||(e="/"+e),t+e}var s=r(5);t.exports={buildPayload:n,getTransportFromOptions:o,transportOptions:i,appendPathToPath:a}},function(t,e,r){"use strict";function n(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.error(s.formatArgsAsString(t)):console.error.apply(console,t)}function o(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.info(s.formatArgsAsString(t)):console.info.apply(console,t)}function i(){var t=Array.prototype.slice.call(arguments,0);t.unshift("Rollbar:"),a.ieVersion()<=8?console.log(s.formatArgsAsString(t)):console.log.apply(console,t)}r(14);var a=r(15),s=r(5);t.exports={error:n,info:o,log:i}},function(t,e){!function(t){"use strict";t.console||(t.console={});for(var e,r,n=t.console,o=function(){},i=["memory"],a="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");e=i.pop();)n[e]||(n[e]={});for(;r=a.pop();)n[r]||(n[r]=o)}("undefined"==typeof window?this:window)},function(t,e){"use strict";function r(){var t;if(!document)return t;for(var e=3,r=document.createElement("div"),n=r.getElementsByTagName("i");r.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->",n[0];);return e>4?e:t}var n={ieVersion:r};t.exports=n},function(t,e){"use strict";function r(t,e,r){if(t){var o;if("function"==typeof e._rollbarOldOnError)o=e._rollbarOldOnError;else if(t.onerror){for(o=t.onerror;o._rollbarOldOnError;)o=o._rollbarOldOnError;e._rollbarOldOnError=o}var i=function(){var r=Array.prototype.slice.call(arguments,0);n(t,e,o,r)};r&&(i._rollbarOldOnError=o),t.onerror=i}}function n(t,e,r,n){t._rollbarWrappedError&&(n[4]||(n[4]=t._rollbarWrappedError),n[5]||(n[5]=t._rollbarWrappedError._rollbarContext),t._rollbarWrappedError=null),e.handleUncaughtException.apply(e,n),r&&r.apply(t,n)}function o(t,e,r){if(t){"function"==typeof t._rollbarURH&&t._rollbarURH.belongsToShim&&t.removeEventListener("unhandledrejection",t._rollbarURH);var n=function(t){var r,n,o;try{r=t.reason}catch(t){r=void 0}try{n=t.promise}catch(t){n="[unhandledrejection] error getting `promise` from event"}try{o=t.detail,!r&&o&&(r=o.reason,n=o.promise)}catch(t){}r||(r="[unhandledrejection] error getting `reason` from event"),e&&e.handleUnhandledRejection&&e.handleUnhandledRejection(r,n)};n.belongsToShim=r,t._rollbarURH=n,t.addEventListener("unhandledrejection",n)}}function i(t,e,r){if(t){var n,o,i="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(n=0;n<i.length;++n)o=i[n],t[o]&&t[o].prototype&&a(e,t[o].prototype,r)}}function a(t,e,r){if(e.hasOwnProperty&&e.hasOwnProperty("addEventListener")){for(var n=e.addEventListener;n._rollbarOldAdd&&n.belongsToShim;)n=n._rollbarOldAdd;var o=function(e,r,o){n.call(this,e,t.wrap(r),o)};o._rollbarOldAdd=n,o.belongsToShim=r,e.addEventListener=o;for(var i=e.removeEventListener;i._rollbarOldRemove&&i.belongsToShim;)i=i._rollbarOldRemove;var a=function(t,e,r){i.call(this,t,e&&e._rollbar_wrapped||e,r)};a._rollbarOldRemove=i,a.belongsToShim=r,e.removeEventListener=a}}t.exports={captureUncaughtExceptions:r,captureUnhandledRejections:o,wrapGlobals:i}},function(t,e,r){"use strict";function n(t,e,r,n,o){n&&p.isFunction(n)||(n=function(){}),p.addParamsAndAccessTokenToPath(t,e,r);var a="GET",s=p.formatUrl(e);i(t,s,a,null,n,o)}function o(t,e,r,n,o){if(n&&p.isFunction(n)||(n=function(){}),!r)return n(new Error("Cannot send empty request"));var a=f.truncate(r);if(a.error)return n(a.error);var s=a.value,u="POST",c=p.formatUrl(e);i(t,c,u,s,n,o)}function i(t,e,r,n,o,i){var s="undefined"!=typeof window&&window||"undefined"!=typeof self&&self,u=s&&s.Zone&&s.Zone.current;if(u&&"angular"===u._name){var c=u._parent;c.run(function(){a(t,e,r,n,o,i)})}else a(t,e,r,n,o,i)}function a(t,e,r,n,o,i){var a;if(a=i?i():s(),!a)return o(new Error("No way to send a request"));try{try{var f=function(){try{if(f&&4===a.readyState){f=void 0;var t=p.jsonParse(a.responseText);if(u(a))return void o(t.error,t.value);if(c(a)){if(403===a.status){var e=t.value&&t.value.message;h.error(e)}o(new Error(String(a.status)))}else{var r="XHR response had no status code (likely connection failure)";o(l(r))}}}catch(t){var n;n=t&&t.stack?t:new Error(t),o(n)}};a.open(r,e,!0),a.setRequestHeader&&(a.setRequestHeader("Content-Type","application/json"),a.setRequestHeader("X-Rollbar-Access-Token",t)),a.onreadystatechange=f,a.send(n)}catch(t){if("undefined"!=typeof XDomainRequest){if(!window||!window.location)return o(new Error("No window available during request, unknown environment"));"http:"===window.location.href.substring(0,5)&&"https"===e.substring(0,5)&&(e="http"+e.substring(5));var d=new XDomainRequest;d.onprogress=function(){},d.ontimeout=function(){var t="Request timed out",e="ETIMEDOUT";o(l(t,e))},d.onerror=function(){o(new Error("Error during request"))},d.onload=function(){var t=p.jsonParse(d.responseText);o(t.error,t.value)},d.open(r,e,!0),d.send(n)}else o(new Error("Cannot find a method to transport a request"))}}catch(t){o(t)}}function s(){var t,e,r=[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],n=r.length;for(e=0;e<n;e++)try{t=r[e]();break}catch(t){}return t}function u(t){return t&&t.status&&200===t.status}function c(t){return t&&p.isType(t.status,"number")&&t.status>=400&&t.status<600}function l(t,e){var r=new Error(t);return r.code=e||"ENOTFOUND",r}var p=r(5),f=r(18),h=r(13);t.exports={get:n,post:o}},function(t,e,r){"use strict";function n(t,e){return[t,f.stringify(t,e)]}function o(t,e){var r=t.length;return r>2*e?t.slice(0,e).concat(t.slice(r-e)):t}function i(t,e,r){r="undefined"==typeof r?30:r;var n,i=t.data.body;if(i.trace_chain)for(var a=i.trace_chain,s=0;s<a.length;s++)n=a[s].frames,n=o(n,r),a[s].frames=n;else i.trace&&(n=i.trace.frames,n=o(n,r),i.trace.frames=n);return[t,f.stringify(t,e)]}function a(t,e){return e&&e.length>t?e.slice(0,t-3).concat("..."):e}function s(t,e,r){function n(e,r,o){switch(f.typeName(r)){case"string":return a(t,r);case"object":case"array":return f.traverse(r,n,o);default:return r}}return e=f.traverse(e,n,[]),[e,f.stringify(e,r)]}function u(t){return t.exception&&(delete t.exception.description,t.exception.message=a(255,t.exception.message)),t.frames=o(t.frames,1),t}function c(t,e){var r=t.data.body;if(r.trace_chain)for(var n=r.trace_chain,o=0;o<n.length;o++)n[o]=u(n[o]);else r.trace&&(r.trace=u(r.trace));return[t,f.stringify(t,e)]}function l(t,e){return t.length>e}function p(t,e,r){r="undefined"==typeof r?524288:r;for(var o,a,u,p=[n,i,s.bind(null,1024),s.bind(null,512),s.bind(null,256),c];o=p.shift();)if(a=o(t,e),t=a[0],u=a[1],u.error||!l(u.value,r))return u;return u}var f=r(5);t.exports={truncate:p,raw:n,truncateFrames:i,truncateStrings:s,maybeTruncateValue:a}},function(t,e){"use strict";function r(t){var e,r,n={protocol:null,auth:null,host:null,path:null,hash:null,href:t,hostname:null,port:null,pathname:null,search:null,query:null};if(e=t.indexOf("//"),e!==-1?(n.protocol=t.substring(0,e),r=e+2):r=0,e=t.indexOf("@",r),e!==-1&&(n.auth=t.substring(r,e),r=e+1),e=t.indexOf("/",r),e===-1){if(e=t.indexOf("?",r),e===-1)return e=t.indexOf("#",r),e===-1?n.host=t.substring(r):(n.host=t.substring(r,e),n.hash=t.substring(e)),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),n;n.host=t.substring(r,e),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),r=e}else n.host=t.substring(r,e),n.hostname=n.host.split(":")[0],n.port=n.host.split(":")[1],n.port&&(n.port=parseInt(n.port,10)),r=e;if(e=t.indexOf("#",r),e===-1?n.path=t.substring(r):(n.path=t.substring(r,e),n.hash=t.substring(e)),n.path){var o=n.path.split("?");n.pathname=o[0],n.query=o[1],n.search=n.query?"?"+n.query:null}return n}t.exports={parse:r}},function(t,e,r){"use strict";function n(t,e,r){if(t.data=t.data||{},t.err)try{t.stackInfo=t.err._savedStackTrace||d.parse(t.err)}catch(e){m.error("Error while parsing the error object.",e);try{t.message=t.err.message||t.err.description||t.message||String(t.err)}catch(e){t.message=String(t.err)||String(e)}delete t.err}r(null,t)}function o(t,e,r){t.message||t.stackInfo||t.custom||r(new Error("No message, stack info, or custom data"),null),r(null,t)}function i(t,e,r){var n=e.payload&&e.payload.environment||e.environment;t.data=h.merge(t.data,{environment:n,level:t.level,endpoint:e.endpoint,platform:"browser",framework:"browser-js",language:"javascript",server:{},uuid:t.uuid,notifier:{name:"rollbar-browser-js",version:e.version}}),r(null,t)}function a(t){return function(e,r,n){if(!t||!t.location)return n(null,e);var o="$remote_ip";r.captureIp?r.captureIp!==!0&&(o+="_anonymize"):o=null,h.set(e,"data.request",{url:t.location.href,query_string:t.location.search,user_ip:o}),n(null,e)}}function s(t){return function(e,r,n){if(!t)return n(null,e);var o=t.navigator||{},i=t.screen||{};h.set(e,"data.client",{runtime_ms:e.timestamp-t._rollbarStartTime,timestamp:Math.round(e.timestamp/1e3),javascript:{browser:o.userAgent,language:o.language,cookie_enabled:o.cookieEnabled,screen:{width:i.width,height:i.height}}}),n(null,e)}}function u(t){return function(e,r,n){if(!t||!t.navigator)return n(null,e);for(var o,i=[],a=t.navigator.plugins||[],s=0,u=a.length;s<u;++s)o=a[s],i.push({name:o.name,description:o.description});h.set(e,"data.client.javascript.plugins",i),n(null,e)}}function c(t,e,r){t.stackInfo?p(t,e,r):l(t,e,r)}function l(t,e,r){var n=t.message,o=t.custom;if(!n)if(o){var i=e.scrubFields,a=h.stringify(h.scrub(o,i));n=a.error||a.value||""}else n="";var s={body:n};o&&(s.extra=h.merge(o)),h.set(t,"data.body",{message:s}),r(null,t)}function p(t,e,r){var n=t.data.description,o=t.stackInfo,i=t.custom,a=d.guessErrorClass(o.message),s=o.name||a[0],u=a[1],c={exception:{class:s,message:u}};n&&(c.exception.description=n);var p=o.stack;if(p&&0===p.length&&t._unhandledStackInfo&&t._unhandledStackInfo.stack&&(p=t._unhandledStackInfo.stack),p){0===p.length&&(c.exception.stack=o.rawStack,c.exception.raw=String(o.rawException));var f,m,g,v,y,b,w,_;for(c.frames=[],w=0;w<p.length;++w)f=p[w],m={filename:f.url?h.sanitizeUrl(f.url):"(unknown)",lineno:f.line||null,method:f.func&&"?"!==f.func?f.func:"[anonymous]",colno:f.column},e.sendFrameUrl&&(m.url=f.url),m.method&&m.method.endsWith&&m.method.endsWith("_rollbar_wrapped")||(g=v=y=null,b=f.context?f.context.length:0,b&&(_=Math.floor(b/2),v=f.context.slice(0,_),g=f.context[_],y=f.context.slice(_)),g&&(m.code=g),(v||y)&&(m.context={},v&&v.length&&(m.context.pre=v),y&&y.length&&(m.context.post=y)),f.args&&(m.args=f.args),c.frames.push(m));c.frames.reverse(),i&&(c.extra=h.merge(i)),h.set(t,"data.body",{trace:c}),r(null,t)}else t.message=s+": "+u,l(t,e,r)}function f(t,e,r){var n=e.scrubFields;t.data=h.scrub(t.data,n),r(null,t)}var h=r(5),d=r(21),m=r(13);t.exports={handleItemWithError:n,ensureItemHasSomethingToSay:o,addBaseInfo:i,addRequestInfo:a,addClientInfo:s,addPluginInfo:u,addBody:c,scrubPayload:f}},function(t,e,r){"use strict";function n(){return l}function o(){return null}function i(t){var e={};return e._stackFrame=t,e.url=t.fileName,e.line=t.lineNumber,e.func=t.functionName,e.column=t.columnNumber,e.args=t.args,e.context=o(),e}function a(t){function e(){var e,r=[];if(t.stack)e=t;else try{throw t}catch(t){e=t}try{r=c.parse(e)}catch(t){r=[]}for(var n=[],o=0;o<r.length;o++)n.push(new i(r[o]));return n}var r=t.constructor&&t.constructor.name;return(!r||!r.length||r.length<3)&&(r=t.name),{stack:e(),message:t.message,name:r,rawStack:t.stack,rawException:t}}function s(t){return new a(t)}function u(t){if(!t||!t.match)return["Unknown error. There was no error message to display.",""];var e=t.match(p),r="(unknown)";return e&&(r=e[e.length-1],t=t.replace((e[e.length-2]||"")+r+":",""),t=t.replace(/(^[\s]+|[\s]+$)/g,"")),[r,t]}var c=r(22),l="?",p=new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");t.exports={guessFunctionName:n,guessErrorClass:u,gatherContext:o,parse:s,Stack:a,Frame:i}},function(t,e,r){var n,o,i;!function(a,s){"use strict";o=[r(23)],n=s,i="function"==typeof n?n.apply(e,o):n,!(void 0!==i&&(t.exports=i))}(this,function(t){"use strict";function e(t,e,r){if("function"==typeof Array.prototype.map)return t.map(e,r);for(var n=new Array(t.length),o=0;o<t.length;o++)n[o]=e.call(r,t[o]);return n}function r(t,e,r){if("function"==typeof Array.prototype.filter)return t.filter(e,r);for(var n=[],o=0;o<t.length;o++)e.call(r,t[o])&&n.push(t[o]);return n}var n=/(^|@)\S+\:\d+/,o=/^\s*at .*(\S+\:\d+|\(native\))/m,i=/^(eval@)?(\[native code\])?$/;return{parse:function(t){if("undefined"!=typeof t.stacktrace||"undefined"!=typeof t["opera#sourceloc"])return this.parseOpera(t);if(t.stack&&t.stack.match(o))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},extractLocation:function(t){if(t.indexOf(":")===-1)return[t];var e=t.replace(/[\(\)\s]/g,"").split(":"),r=e.pop(),n=e[e.length-1];if(!isNaN(parseFloat(n))&&isFinite(n)){var o=e.pop();return[e.join(":"),o,r]}return[e.join(":"),r,void 0]},parseV8OrIE:function(n){var i=r(n.stack.split("\n"),function(t){return!!t.match(o)},this);return e(i,function(e){e.indexOf("(eval ")>-1&&(e=e.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=e.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),n=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i="eval"===n[0]?void 0:n[0];return new t(o,void 0,i,n[1],n[2],e)},this)},parseFFOrSafari:function(n){var o=r(n.stack.split("\n"),function(t){return!t.match(i)},this);return e(o,function(e){if(e.indexOf(" > eval")>-1&&(e=e.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),e.indexOf("@")===-1&&e.indexOf(":")===-1)return new t(e);var r=e.split("@"),n=this.extractLocation(r.pop()),o=r.shift()||void 0;return new t(o,void 0,n[0],n[1],n[2],e)},this)},parseOpera:function(t){return!t.stacktrace||t.message.indexOf("\n")>-1&&t.message.split("\n").length>t.stacktrace.split("\n").length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},parseOpera9:function(e){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,n=e.message.split("\n"),o=[],i=2,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new t(void 0,void 0,s[2],s[1],void 0,n[i]))}return o},parseOpera10:function(e){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,n=e.stacktrace.split("\n"),o=[],i=0,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new t(s[3]||void 0,void 0,s[2],s[1],void 0,n[i]))}return o},parseOpera11:function(o){var i=r(o.stack.split("\n"),function(t){return!!t.match(n)&&!t.match(/^Error created at/)},this);return e(i,function(e){var r,n=e.split("@"),o=this.extractLocation(n.pop()),i=n.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new t(a,s,o[0],o[1],o[2],e)},this)}}})},function(t,e,r){var n,o,i;!function(r,a){"use strict";o=[],n=a,i="function"==typeof n?n.apply(e,o):n,!(void 0!==i&&(t.exports=i))}(this,function(){"use strict";function t(t){return!isNaN(parseFloat(t))&&isFinite(t)}function e(t,e,r,n,o,i){void 0!==t&&this.setFunctionName(t),void 0!==e&&this.setArgs(e),void 0!==r&&this.setFileName(r),void 0!==n&&this.setLineNumber(n),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i)}return e.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(t){this.functionName=String(t)},getArgs:function(){return this.args},setArgs:function(t){if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("Args must be an Array");this.args=t},getFileName:function(){return this.fileName},setFileName:function(t){this.fileName=String(t)},getLineNumber:function(){return this.lineNumber},setLineNumber:function(e){if(!t(e))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(e)},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(e){if(!t(e))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(e)},getSource:function(){return this.source},setSource:function(t){this.source=String(t)},toString:function(){var e=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",n=this.getFileName()?"@"+this.getFileName():"",o=t(this.getLineNumber())?":"+this.getLineNumber():"",i=t(this.getColumnNumber())?":"+this.getColumnNumber():"";return e+r+n+o+i}},e})},function(t,e,r){"use strict";function n(t,e,r){var n=e.payload||{};n.body&&delete n.body;var o=u.merge(t.data,n);t._isUncaught&&(o._isUncaught=!0),t._originalArgs&&(o._originalArgs=t._originalArgs),r(null,o)}function o(t,e,r){t.telemetryEvents&&u.set(t,"data.body.telemetry",t.telemetryEvents),r(null,t)}function i(t,e,r){if(!t.message)return void r(null,t);var n="data.body.trace_chain.0",o=u.get(t,n);if(o||(n="data.body.trace",o=u.get(t,n)),o){if(!o.exception||!o.exception.description)return u.set(t,n+".exception.description",t.message),void r(null,t);var i=u.get(t,n+".extra")||{},a=u.merge(i,{message:t.message});u.set(t,n+".extra",a)}r(null,t)}function a(t){return function(e,r,n){var o=u.merge(e);try{u.isFunction(r.transform)&&r.transform(o.data,e)}catch(o){return r.transform=null,t.error("Error while calling custom transform() function. Removing custom transform().",o),void n(null,e)}n(null,o)}}function s(t,e,r){if(!e.sendConfig)return r(null,t);var n="_rollbarConfig",o=u.get(t,"data.custom")||{};o[n]=e,t.data.custom=o,r(null,t)}var u=r(5);t.exports={itemToPayload:n,addTelemetryData:o,addMessageWithError:i,userTransform:a,addConfigToPayload:s}},function(t,e,r){"use strict";function n(t,e){return!o.get(e,"plugins.jquery.ignoreAjaxErrors")||!o.get(t,"body.message.extra.isAjax")}var o=r(5);t.exports={checkIgnore:n}},function(t,e,r){"use strict";function n(t,e){var r=t.level,n=c.LEVELS[r]||0,o=e.reportLevel,i=c.LEVELS[o]||0;return!(n<i)}function o(t){return function(e,r){var n=!!e._isUncaught;delete e._isUncaught;var o=e._originalArgs;delete e._originalArgs;try{c.isFunction(r.onSendCallback)&&r.onSendCallback(n,o,e)}catch(e){r.onSendCallback=null,t.error("Error while calling onSendCallback, removing",e)}try{if(c.isFunction(r.checkIgnore)&&r.checkIgnore(n,o,e))return!1}catch(e){r.checkIgnore=null,t.error("Error while calling custom checkIgnore(), removing",e)}return!0}}function i(t){return function(e,r){return!s(e,r,"blacklist",t)}}function a(t){return function(e,r){return s(e,r,"whitelist",t)}}function s(t,e,r,n){var o=!1;"blacklist"===r&&(o=!0);var i,a,s,u,l,p,f,h,d,m;try{if(i=o?e.hostBlackList:e.hostWhiteList,f=i&&i.length,a=c.get(t,"body.trace"),!i||0===f)return!o;if(!a||!a.frames||0===a.frames.length)return!o;for(l=a.frames.length,d=0;d<l;d++){if(s=a.frames[d],u=s.filename,!c.isType(u,"string"))return!o;for(m=0;m<f;m++)if(p=i[m],h=new RegExp(p),h.test(u))return!0}}catch(t){o?e.hostBlackList=null:e.hostWhiteList=null;var g=o?"hostBlackList":"hostWhiteList";return n.error("Error while reading your configuration's "+g+" option. Removing custom "+g+".",t),!o}return!1}function u(t){return function(e,r){var n,o,i,a,s,u,l,p,f;try{if(s=!1,i=r.ignoredMessages,!i||0===i.length)return!0;if(l=e.body,p=c.get(l,"trace.exception.message"),f=c.get(l,"message.body"),n=p||f,!n)return!0;for(a=i.length,o=0;o<a&&(u=new RegExp(i[o],"gi"),!(s=u.test(n)));o++);}catch(e){r.ignoredMessages=null,t.error("Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.")}return!s}}var c=r(5);t.exports={checkLevel:n,userCheckIgnore:o,urlIsNotBlacklisted:i,urlIsWhitelisted:a,messageIsIgnored:u}},function(t,e,r){"use strict";function n(t,e,r,n,o){var i=t[e];t[e]=r(i),n&&n[o].push([t,e,i])}function o(t,e){for(var r;t[e].length;)r=t[e].shift(),r[0][r[1]]=r[2]}function i(t){if(!t||!t.attributes)return null;for(var e=t.attributes,r=0;r<e.length;++r)if("name"===e[r].key)return e[r].value;return null}function a(t){for(var e=[],r=0;r<t.length;++r)e.push(new RegExp(t[r],"i"));return function(t){var r=i(t);if(!r)return!1;for(var n=0;n<e.length;++n)if(e[n].test(r))return!0;return!1}}function s(t,e,r,n,o){var i=t.autoInstrument;t.enabled===!1||i===!1?this.autoInstrument={}:(u.isType(i,"object")||(i=p),this.autoInstrument=u.merge(p,i)),this.scrubTelemetryInputs=!!t.scrubTelemetryInputs,this.telemetryScrubber=t.telemetryScrubber,this.defaultValueScrubber=a(t.scrubFields),this.telemeter=e,this.rollbar=r,this._window=n||{},this._document=o||{},this.replacements={network:[],log:[],navigation:[],connectivity:[]},this.eventRemovers={dom:[],connectivity:[]},this._location=this._window.location,this._lastHref=this._location&&this._location.href}var u=r(5),c=r(19),l=r(28),p={network:!0,networkResponseHeaders:!1,networkResponseBody:!1,networkRequestBody:!1,log:!0,dom:!0,navigation:!0,connectivity:!0};s.prototype.configure=function(t){var e=t.autoInstrument,r=u.merge(this.autoInstrument);t.enabled===!1||e===!1?this.autoInstrument={}:(u.isType(e,"object")||(e=p),this.autoInstrument=u.merge(p,e)),this.instrument(r),void 0!==t.scrubTelemetryInputs&&(this.scrubTelemetryInputs=!!t.scrubTelemetryInputs),void 0!==t.telemetryScrubber&&(this.telemetryScrubber=t.telemetryScrubber)},s.prototype.instrument=function(t){!this.autoInstrument.network||t&&t.network?!this.autoInstrument.network&&t&&t.network&&this.deinstrumentNetwork():this.instrumentNetwork(),!this.autoInstrument.log||t&&t.log?!this.autoInstrument.log&&t&&t.log&&this.deinstrumentConsole():this.instrumentConsole(),!this.autoInstrument.dom||t&&t.dom?!this.autoInstrument.dom&&t&&t.dom&&this.deinstrumentDom():this.instrumentDom(),!this.autoInstrument.navigation||t&&t.navigation?!this.autoInstrument.navigation&&t&&t.navigation&&this.deinstrumentNavigation():this.instrumentNavigation(),!this.autoInstrument.connectivity||t&&t.connectivity?!this.autoInstrument.connectivity&&t&&t.connectivity&&this.deinstrumentConnectivity():this.instrumentConnectivity()},s.prototype.deinstrumentNetwork=function(){o(this.replacements,"network")},s.prototype.instrumentNetwork=function(){function t(t,r){t in r&&u.isFunction(r[t])&&n(r,t,function(t){return e.rollbar.wrap(t)})}var e=this;if("XMLHttpRequest"in this._window){var r=this._window.XMLHttpRequest.prototype;n(r,"open",function(t){return function(e,r){return u.isType(r,"string")&&(this.__rollbar_xhr={method:e,url:r,status_code:null,start_time_ms:u.now(),end_time_ms:null}),t.apply(this,arguments)}},this.replacements,"network"),n(r,"send",function(r){return function(o){function i(){if(a.__rollbar_xhr){if(null===a.__rollbar_xhr.status_code){a.__rollbar_xhr.status_code=0;var t=null;e.autoInstrument.networkRequestBody&&(t=o),a.__rollbar_event=e.telemeter.captureNetwork(a.__rollbar_xhr,"xhr",void 0,t)}if(a.readyState<2&&(a.__rollbar_xhr.start_time_ms=u.now()),a.readyState>3){a.__rollbar_xhr.end_time_ms=u.now();var r=null;if(e.autoInstrument.networkResponseHeaders){var n=e.autoInstrument.networkResponseHeaders;r={};try{var i,s;if(n===!0){var c=a.getAllResponseHeaders();if(c){var l,p,f=c.trim().split(/[\r\n]+/);for(s=0;s<f.length;s++)l=f[s].split(": "),i=l.shift(),p=l.join(": "),r[i]=p}}else for(s=0;s<n.length;s++)i=n[s],r[i]=a.getResponseHeader(i)}catch(t){}}var h=null;if(e.autoInstrument.networkResponseBody)try{h=a.responseText}catch(t){}var d=null;(h||r)&&(d={},h&&(d.body=h),r&&(d.headers=r)),d&&(a.__rollbar_xhr.response=d);try{var m=a.status;m=1223===m?204:m,a.__rollbar_xhr.status_code=m,a.__rollbar_event.level=e.telemeter.levelFromStatus(m)}catch(t){}}}}var a=this;return t("onload",a),t("onerror",a),t("onprogress",a),"onreadystatechange"in a&&u.isFunction(a.onreadystatechange)?n(a,"onreadystatechange",function(t){return e.rollbar.wrap(t,void 0,i)}):a.onreadystatechange=i,r.apply(this,arguments)}},this.replacements,"network")}"fetch"in this._window&&n(this._window,"fetch",function(t){return function(r,n){for(var o=new Array(arguments.length),i=0,a=o.length;i<a;i++)o[i]=arguments[i];var s,c=o[0],l="GET";u.isType(c,"string")?s=c:c&&(s=c.url,c.method&&(l=c.method)),o[1]&&o[1].method&&(l=o[1].method);var p={method:l,url:s,status_code:null,start_time_ms:u.now(),end_time_ms:null},f=null;return e.autoInstrument.networkRequestBody&&(o[1]&&o[1].body?f=o[1].body:o[0]&&!u.isType(o[0],"string")&&o[0].body&&(f=o[0].body)),e.telemeter.captureNetwork(p,"fetch",void 0,f),t.apply(this,o).then(function(t){p.end_time_ms=u.now(),p.status_code=t.status;var r=null;if(e.autoInstrument.networkResponseHeaders){var n=e.autoInstrument.networkResponseHeaders;r={};try{if(n===!0);else for(var o=0;o<n.length;o++){var i=n[o];r[i]=t.headers.get(i)}}catch(t){}}var a=null;return r&&(a={headers:r}),a&&(p.response=a),t})}},this.replacements,"network")},s.prototype.deinstrumentConsole=function(){if("console"in this._window&&this._window.console.log)for(var t;this.replacements.log.length;)t=this.replacements.log.shift(),this._window.console[t[0]]=t[1]},s.prototype.instrumentConsole=function(){function t(t){var n=r[t],o=r,i="warn"===t?"warning":t;r[t]=function(){var t=Array.prototype.slice.call(arguments),r=u.formatArgsAsString(t);e.telemeter.captureLog(r,i),n&&Function.prototype.apply.call(n,o,t)},e.replacements.log.push([t,n])}if("console"in this._window&&this._window.console.log)for(var e=this,r=this._window.console,n=["debug","info","warn","error","log"],o=0,i=n.length;o<i;o++)t(n[o])},s.prototype.deinstrumentDom=function(){("addEventListener"in this._window||"attachEvent"in this._window)&&this.removeListeners("dom")},s.prototype.instrumentDom=function(){if("addEventListener"in this._window||"attachEvent"in this._window){var t=this.handleClick.bind(this),e=this.handleBlur.bind(this);this.addListener("dom",this._window,"click","onclick",t,!0),this.addListener("dom",this._window,"blur","onfocusout",e,!0)}},s.prototype.handleClick=function(t){try{var e=l.getElementFromEvent(t,this._document),r=e&&e.tagName,n=l.isDescribedElement(e,"a")||l.isDescribedElement(e,"button");r&&(n||l.isDescribedElement(e,"input",["button","submit"]))?this.captureDomEvent("click",e):l.isDescribedElement(e,"input",["checkbox","radio"])&&this.captureDomEvent("input",e,e.value,e.checked)}catch(t){}},s.prototype.handleBlur=function(t){try{var e=l.getElementFromEvent(t,this._document);e&&e.tagName&&(l.isDescribedElement(e,"textarea")?this.captureDomEvent("input",e,e.value):l.isDescribedElement(e,"select")&&e.options&&e.options.length?this.handleSelectInputChanged(e):l.isDescribedElement(e,"input")&&!l.isDescribedElement(e,"input",["button","submit","hidden","checkbox","radio"])&&this.captureDomEvent("input",e,e.value))}catch(t){}},s.prototype.handleSelectInputChanged=function(t){if(t.multiple)for(var e=0;e<t.options.length;e++)t.options[e].selected&&this.captureDomEvent("input",t,t.options[e].value);else t.selectedIndex>=0&&t.options[t.selectedIndex]&&this.captureDomEvent("input",t,t.options[t.selectedIndex].value)},s.prototype.captureDomEvent=function(t,e,r,n){if(void 0!==r)if(this.scrubTelemetryInputs||"password"===l.getElementType(e))r="[scrubbed]";else{var o=l.describeElement(e);this.telemetryScrubber?this.telemetryScrubber(o)&&(r="[scrubbed]"):this.defaultValueScrubber(o)&&(r="[scrubbed]")}var i=l.elementArrayToString(l.treeToArray(e));this.telemeter.captureDom(t,i,r,n)},s.prototype.deinstrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,r=!e&&this._window.history&&this._window.history.pushState;r&&o(this.replacements,"navigation")},s.prototype.instrumentNavigation=function(){var t=this._window.chrome,e=t&&t.app&&t.app.runtime,r=!e&&this._window.history&&this._window.history.pushState;if(r){var o=this;n(this._window,"onpopstate",function(t){return function(){var e=o._location.href;o.handleUrlChange(o._lastHref,e),t&&t.apply(this,arguments)}},this.replacements,"navigation"),n(this._window.history,"pushState",function(t){return function(){var e=arguments.length>2?arguments[2]:void 0;return e&&o.handleUrlChange(o._lastHref,e+""),t.apply(this,arguments)}},this.replacements,"navigation")}},s.prototype.handleUrlChange=function(t,e){var r=c.parse(this._location.href),n=c.parse(e),o=c.parse(t);this._lastHref=e,r.protocol===n.protocol&&r.host===n.host&&(e=n.path+(n.hash||"")),r.protocol===o.protocol&&r.host===o.host&&(t=o.path+(o.hash||"")),this.telemeter.captureNavigation(t,e)},s.prototype.deinstrumentConnectivity=function(){("addEventListener"in this._window||"body"in this._document)&&(this._window.addEventListener?this.removeListeners("connectivity"):o(this.replacements,"connectivity"))},s.prototype.instrumentConnectivity=function(){if("addEventListener"in this._window||"body"in this._document)if(this._window.addEventListener)this.addListener("connectivity",this._window,"online",void 0,function(){this.telemeter.captureConnectivityChange("online")}.bind(this),!0),this.addListener("connectivity",this._window,"offline",void 0,function(){this.telemeter.captureConnectivityChange("offline")}.bind(this),!0);else{var t=this;n(this._document.body,"ononline",function(e){return function(){t.telemeter.captureConnectivityChange("online"),e&&e.apply(this,arguments)}},this.replacements,"connectivity"),n(this._document.body,"onoffline",function(e){return function(){t.telemeter.captureConnectivityChange("offline"),e&&e.apply(this,arguments)}},this.replacements,"connectivity")}},s.prototype.addListener=function(t,e,r,n,o,i){e.addEventListener?(e.addEventListener(r,o,i),this.eventRemovers[t].push(function(){e.removeEventListener(r,o,i)})):n&&(e.attachEvent(n,o),this.eventRemovers[t].push(function(){e.detachEvent(n,o)}))},s.prototype.removeListeners=function(t){for(var e;this.eventRemovers[t].length;)(e=this.eventRemovers[t].shift())()},t.exports=s},function(t,e){"use strict";function r(t){return(t.getAttribute("type")||"").toLowerCase()}function n(t,e,n){if(t.tagName.toLowerCase()!==e.toLowerCase())return!1;if(!n)return!0;t=r(t);for(var o=0;o<n.length;o++)if(n[o]===t)return!0;return!1}function o(t,e){return t.target?t.target:e&&e.elementFromPoint?e.elementFromPoint(t.clientX,t.clientY):void 0}function i(t){for(var e,r=5,n=[],o=0;t&&o<r&&(e=u(t),"html"!==e.tagName);o++)n.unshift(e),t=t.parentNode;return n}function a(t){for(var e,r,n=80,o=" > ",i=o.length,a=[],u=0,c=t.length-1;c>=0;c--){if(e=s(t[c]),r=u+a.length*i+e.length,c<t.length-1&&r>=n+3){a.unshift("...");break}a.unshift(e),u+=e.length}return a.join(o)}function s(t){if(!t||!t.tagName)return"";var e=[t.tagName];t.id&&e.push("#"+t.id),t.classes&&e.push("."+t.classes.join("."));for(var r=0;r<t.attributes.length;r++)e.push("["+t.attributes[r].key+'="'+t.attributes[r].value+'"]');return e.join("")}function u(t){if(!t||!t.tagName)return null;var e,r,n,o,i={};i.tagName=t.tagName.toLowerCase(),t.id&&(i.id=t.id),e=t.className,e&&"string"==typeof e&&(i.classes=e.split(/\s+/));var a=["type","name","title","alt"];for(i.attributes=[],o=0;o<a.length;o++)r=a[o],n=t.getAttribute(r),n&&i.attributes.push({key:r,value:n});return i}t.exports={describeElement:u,descriptionToString:s,elementArrayToString:a,treeToArray:i,getElementFromEvent:o,isDescribedElement:n,getElementType:r}}])});
//# sourceMappingURL=rollbar.umd.min.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UrlInspector; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var urlParser = __webpack_require__(5);

var UrlInspector =
/*#__PURE__*/
function () {
  function UrlInspector(blockedDomains, allowedDomainsUntil, allowedDomains) {
    _classCallCheck(this, UrlInspector);

    this.allowedDomains = {};
    this.blockedDomains = {};
    this.blockedSubdomains = {};
    this.allowedDomainsOnce = {};
    this.allowedDomainsUntil = allowedDomainsUntil || {};
    this.setBlockedDomains(blockedDomains);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = allowedDomains[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var allowedDomain = _step.value;
        this.allowedDomains[allowedDomain] = true;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.isActive = true;
  }

  _createClass(UrlInspector, [{
    key: "isUrlAllowed",
    value: function isUrlAllowed(url, tabId) {
      var allowedAt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      // checks if a url is allowed within a given tab
      var oneTimeAllowedDomain = this.allowedDomainsOnce[tabId]; // forget the one time allowed domain
      // it will be allowed it again if needed

      delete this.allowedDomainsOnce[tabId]; // always return true if extension is off

      if (!this.isActive) {
        return true;
      }

      var subdomains = this.getSubdomains(url);

      if (subdomains[0] in this.allowedDomains) {
        // if domain is allowed, return true
        return true;
      }

      if (!allowedAt) {
        allowedAt = new Date().getTime();
      } // the order of this subdomains list is very important
      // it is set in the getSubdomains method
      // we want to check the longest subdomains first. 
      // if a subdomain is in the block list, and a parent domain is allowed manually
      // we still want to block the subdomain


      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = subdomains[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var subdomain = _step2.value;

          if (subdomain in this.allowedDomainsUntil && allowedAt < this.allowedDomainsUntil[subdomain]) {
            // return true if domain is allowed within time frame
            return true;
          }

          if (subdomain == oneTimeAllowedDomain) {
            // if domain is allowed once for this tab, return true
            // reassign one time allowed domain for this tab
            this.allowedDomainsOnce[tabId] = oneTimeAllowedDomain;
            return true;
          }

          if (subdomain in this.blockedDomains) {
            // returns false for subdomains that are blocked 
            // and are not in the allowedDomains or allowedDomainsOnce objects
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  }, {
    key: "getHostname",
    value: function getHostname(url) {
      if (!url) {
        return null;
      }

      var urlParsed = urlParser.parse(String(url));

      if (!urlParsed.hostname) {
        return null;
      }

      return this.stripCommonSubDomains(urlParsed.hostname);
    }
  }, {
    key: "getSubdomains",
    value: function getSubdomains(url) {
      // returns all the possible subdomains from a hostname, 
      // in order from the longest to the shortest
      // example: xyz.abc.com returns ['xyz.abc.com', 'abc.com', 'com']
      if (!url) {
        return [];
      }

      var hostname = this.getHostname(url);

      if (!hostname) {
        return [];
      } // return a full list of subdomains if the blockSubdomain flag is true


      var subdomains = [];
      var subdomain = '';
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = hostname.split('.').reverse()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var subdomainPart = _step3.value;
          subdomain = subdomainPart + '.' + subdomain;
          var subdomainSliced = subdomain.slice(0, -1);

          if (this.blockedSubdomains[subdomainSliced] === false) {
            // return only the hostname if one of the parent domain does not block subdomains
            return [hostname];
          }

          subdomains.push(subdomainSliced);
        } // the order is important, because they need to be chacked in order

      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      subdomains.reverse();
      return subdomains;
    }
  }, {
    key: "stripCommonSubDomains",
    value: function stripCommonSubDomains(hostname) {
      // subdomains that start with www. are considered the same as the root domain
      if (hostname.startsWith('www.')) {
        return hostname.substring(4);
      }

      hostname = hostname.toLowerCase();
      return hostname;
    }
  }, {
    key: "allowDomainUntil",
    value: function allowDomainUntil(url, dateTime) {
      // sets the domain to be allowed, until a specific date
      var hostname = this.getHostname(url);

      if (!hostname) {
        // if we were not able to identify a domain
        return;
      }

      this.allowedDomainsUntil[hostname] = dateTime;
    }
  }, {
    key: "allowDomainOnce",
    value: function allowDomainOnce(url, tabId) {
      // sets the domain to be allowed within the selected tab
      var hostname = this.getHostname(url);

      if (!hostname) {
        // if we were not able to identify a domain
        return;
      }

      this.allowedDomainsOnce[tabId] = hostname;
    }
  }, {
    key: "processNewTabOpen",
    value: function processNewTabOpen(openerTabId, newTabId, newTabUrl) {
      var newTabHostname = this.getHostname(newTabUrl);

      if (this.allowedDomainsOnce[openerTabId] == newTabHostname) {
        this.allowedDomainsOnce[newTabId] = String(this.allowedDomainsOnce[openerTabId]);
      }
    }
  }, {
    key: "getOnceAllowedDomain",
    value: function getOnceAllowedDomain(tabId) {
      return this.allowedDomainsOnce[tabId];
    }
  }, {
    key: "getBlockedUrlName",
    value: function getBlockedUrlName(url) {
      var hostname = this.getHostname(url);
      return this.blockedDomains[hostname] || hostname;
    }
  }, {
    key: "setActive",
    value: function setActive() {
      this.isActive = true;
      this.allowedDomainsOnce = {};
      this.tabsReferrerCheck = {};
    }
  }, {
    key: "setInactive",
    value: function setInactive() {
      this.isActive = false;
      this.allowedDomainsOnce = {};
      this.tabsReferrerCheck = {};
    }
  }, {
    key: "getActiveState",
    value: function getActiveState() {
      return this.isActive;
    }
  }, {
    key: "addBlockedDomain",
    value: function addBlockedDomain(domain) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var blockSubdomains = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      domain = domain.trim().toLowerCase();

      if (!domain || domain == "") {
        return false;
      }

      if (!name) {
        name = domain;
      }

      this.blockedDomains[domain] = name;
      this.blockedSubdomains[domain] = blockSubdomains;
      return true;
    }
  }, {
    key: "removeBlockedDomain",
    value: function removeBlockedDomain(domain) {
      delete this.blockedDomains[domain];
    }
  }, {
    key: "isDomainAllowed",
    value: function isDomainAllowed(domain) {
      if (domain in this.allowedDomains) {
        return true;
      }

      return false;
    }
  }, {
    key: "setBlockedDomains",
    value: function setBlockedDomains(blockedDomains) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = blockedDomains[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var blockedDomain = _step4.value;
          var domain = blockedDomain.domain.trim().toLowerCase();
          this.blockedDomains[domain] = blockedDomain.name;
          this.blockedSubdomains[domain] = blockedDomain.blockSubdomains;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);

  return UrlInspector;
}();



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(6);
var util = __webpack_require__(9);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(10);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module), __webpack_require__(8)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(11);
exports.encode = exports.stringify = __webpack_require__(12);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var blockedDomains = [{
  'domain': 'facebook.com',
  'name': 'Facebook',
  'blockSubdomains': false
}, {
  'domain': 'instagram.com',
  'name': 'Instagram',
  'blockSubdomains': true
}, {
  'domain': 'youtube.com',
  'name': 'YouTube',
  'blockSubdomains': true
}, {
  'domain': 'twitter.com',
  'name': 'Twitter',
  'blockSubdomains': true
}, {
  'domain': 'cnn.com',
  'name': 'CNN',
  'blockSubdomains': true
}, {
  'domain': 'reddit.com',
  'name': 'Reddit',
  'blockSubdomains': true
}, {
  'domain': 'buzzfeed.com',
  'name': 'BuzzFeed',
  'blockSubdomains': true
}, {
  'domain': 'snapchat.com',
  'name': 'Snapchat',
  'blockSubdomains': true
}, {
  'domain': 'yahoo.com',
  'name': 'Yahoo',
  'blockSubdomains': true
}, {
  'domain': 'netflix.com',
  'name': 'Netflix',
  'blockSubdomains': true
}, {
  'domain': 'tumblr.com',
  'name': 'Tumblr',
  'blockSubdomains': true
}, {
  'domain': 'washingtonpost.com',
  'name': 'Washington Post',
  'blockSubdomains': true
}, {
  'domain': 'espn.com',
  'name': 'ESPN',
  'blockSubdomains': true
}, {
  'domain': 'nytimes.com',
  'name': 'The New York Times',
  'blockSubdomains': true
}, {
  'domain': 'amazon.com',
  'name': 'Amazon',
  'blockSubdomains': true
}, {
  'domain': 'theguardian.com',
  'name': 'The Guardian',
  'blockSubdomains': true
}, {
  'domain': 'vk.com',
  'name': 'VKontakte',
  'blockSubdomains': true
}, {
  'domain': 'bbc.co.uk',
  'name': 'BBC',
  'blockSubdomains': true
}, {
  'domain': 'pinterest.com',
  'name': 'Pinterest',
  'blockSubdomains': true
}, {
  'domain': 'bbc.com',
  'name': 'BBC',
  'blockSubdomains': true
}, {
  'domain': 'hulu.com',
  'name': 'Hulu',
  'blockSubdomains': true
}, {
  'domain': 'news.google.com',
  'name': 'Google News',
  'blockSubdomains': true
}, {
  'domain': 'messenger.com',
  'name': 'Messenger',
  'blockSubdomains': true
}, {
  'domain': 'gmail.com',
  'name': 'Gmail',
  'blockSubdomains': true
}, {
  'domain': 'dailymail.co.uk',
  'name': 'Daily Mail',
  'blockSubdomains': true
}, {
  'domain': 'huffingtonpost.com',
  'name': 'Huffington Post',
  'blockSubdomains': true
}, {
  'domain': '9gag.com',
  'name': '9GAG',
  'blockSubdomains': true
}, {
  'domain': 'imgur.com',
  'name': 'Imgur',
  'blockSubdomains': true
}, {
  'domain': 'quora.com',
  'name': 'Quora',
  'blockSubdomains': true
}, {
  'domain': 'bing.com',
  'name': 'Bing',
  'blockSubdomains': true
}, {
  'domain': 'foxnews.com',
  'name': 'Fox News',
  'blockSubdomains': true
}, {
  'domain': 'twitch.tv',
  'name': 'Twitch',
  'blockSubdomains': true
}, {
  'domain': 'slate.com',
  'name': 'Slate',
  'blockSubdomains': true
}, {
  'domain': 'feedly.com',
  'name': 'Feedly',
  'blockSubdomains': true
}, {
  'domain': 'whatsapp.com',
  'name': 'WhatsApp',
  'blockSubdomains': true
}, {
  'domain': 'theatlantic.com',
  'name': 'The Atlantic',
  'blockSubdomains': true
}, {
  'domain': 'vimeo.com',
  'name': 'Vimeo',
  'blockSubdomains': true
}, {
  'domain': 'itunes.apple.com',
  'name': 'iTunes',
  'blockSubdomains': true
}, {
  'domain': 'etsy.com',
  'name': 'Etsy',
  'blockSubdomains': true
}, {
  'domain': 'politico.com',
  'name': 'Politico',
  'blockSubdomains': true
}, {
  'domain': 'linkedin.com',
  'name': 'LinkedIn',
  'blockSubdomains': true
}, {
  'domain': 'guardian.co.uk',
  'name': 'The Guardian',
  'blockSubdomains': true
}];
/* harmony default export */ __webpack_exports__["default"] = (blockedDomains);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callbackErrorHandler", function() { return callbackErrorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkNested", function() { return checkNested; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includeReview", function() { return includeReview; });
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var mustache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_rollbar_rollbar_loader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


var rollbar = Object(_lib_rollbar_rollbar_loader_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
window.rollbar = rollbar;
function callbackErrorHandler(originalCallback) {
  // wrapper function for wrapping chrome API callbacks
  // workaround for chrome not sending errors to onerror listner for callbacks
  return function () {
    try {
      return originalCallback.apply(void 0, arguments);
    } catch (e) {
      rollbar.error(e);
      throw e;
    }
  };
}
function checkNested(obj, level) {
  // checks if a nested argument exists in an object
  // based on this SO answer:
  // https://stackoverflow.com/a/2631198/855475
  if (obj === undefined) {
    return false;
  }

  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  if (rest.length == 0 && obj.hasOwnProperty(level)) {
    return true;
  }

  return checkNested.apply(void 0, [obj[level]].concat(rest));
}
function includeReview() {
  var reviewTemplateId = undefined ? 'review-no-href-tmpl' : 'review-tmpl';
  var reviewTemplate = document.getElementById(reviewTemplateId).innerHTML;
  mustache__WEBPACK_IMPORTED_MODULE_0___default.a.parse(reviewTemplate);
  document.getElementById('review-container').innerHTML = mustache__WEBPACK_IMPORTED_MODULE_0___default.a.render(reviewTemplate);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if ( true && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
  } else {}
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */
  function primitiveHasOwnProperty (primitive, propName) {  
    return (
      primitive != null
      && typeof primitive !== 'object'
      && primitive.hasOwnProperty
      && primitive.hasOwnProperty(propName)
    );
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          intermediateValue = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = (
                hasProperty(intermediateValue, names[index]) 
                || primitiveHasOwnProperty(intermediateValue, names[index])
              );

            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];

          /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) {
          value = intermediateValue;
          break;
        }

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
    var tokens = cache[cacheKey];

    if (tokens == null)
      tokens = cache[cacheKey] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `tags` argument is given here it must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   */
  Writer.prototype.render = function render (template, view, partials, tags) {
    var tokens = this.parse(template, tags);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template, tags);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, tags) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, tags);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials, tags) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value, tags), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '3.0.1';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer. If the optional `tags` argument is given here it must be an
   * array with two string values: the opening and closing tags used in the
   * template (e.g. [ "<%", "%>" ]). The default is to mustache.tags.
   */
  mustache.render = function render (template, view, partials, tags) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials, tags);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;
}));


/***/ })
/******/ ]);
//# sourceMappingURL=background.js.map