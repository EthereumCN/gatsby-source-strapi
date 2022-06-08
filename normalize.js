'use strict'

var _typeof2 = require('babel-runtime/helpers/typeof')

var _typeof3 = _interopRequireDefault(_typeof2)

var _regenerator = require('babel-runtime/regenerator')

var _regenerator2 = _interopRequireDefault(_regenerator)

var _promise = require('babel-runtime/core-js/promise')

var _promise2 = _interopRequireDefault(_promise)

var _keys = require('babel-runtime/core-js/object/keys')

var _keys2 = _interopRequireDefault(_keys)

var _getIterator2 = require('babel-runtime/core-js/get-iterator')

var _getIterator3 = _interopRequireDefault(_getIterator2)

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator')

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)

var _fp = require('lodash/fp')

var _allowDirectImgDomain = require('./allowDirectImgDomain')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var _require = require('gatsby-source-filesystem'),
  createRemoteFileNode = _require.createRemoteFileNode

var commonmark = require('commonmark')

var reader = new commonmark.Parser()

function markdownImages(options, type) {
  var typesToParse = options.typesToParse || {}
  var fieldsToParse = typesToParse[type] || []

  var shouldParseForImages = function shouldParseForImages(key) {
    return fieldsToParse.indexOf(key) > -1
  }

  return {
    shouldParseForImages: shouldParseForImages,
  }
}

var extractFields = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee2(
      apiURL,
      store,
      cache,
      createNode,
      touchNode,
      auth,
      item,
      options
    ) {
      var _markdownImages,
        shouldParseForImages,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        key,
        field,
        fileNodeID,
        mediaDataCacheKey,
        cacheMediaData,
        source_url,
        fileNode,
        parsed,
        walker,
        event,
        node,
        _fileNodeID,
        fileNodeBase,
        filePathname,
        _mediaDataCacheKey,
        _cacheMediaData,
        _source_url,
        _fileNode

      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                ;(_markdownImages = markdownImages(options.markdownImages, options.itemType)),
                  (shouldParseForImages = _markdownImages.shouldParseForImages)
                _iteratorNormalCompletion = true
                _didIteratorError = false
                _iteratorError = undefined
                _context2.prev = 4
                _iterator = (0, _getIterator3.default)((0, _keys2.default)(item))

              case 6:
                if ((_iteratorNormalCompletion = (_step = _iterator.next()).done)) {
                  _context2.next = 79
                  break
                }

                key = _step.value
                field = item[key]

                if (!Array.isArray(field)) {
                  _context2.next = 14
                  break
                }

                _context2.next = 12
                return _promise2.default.all(
                  field.map(
                    (function() {
                      var _ref2 = (0, _asyncToGenerator3.default)(
                        /*#__PURE__*/ _regenerator2.default.mark(function _callee(f) {
                          return _regenerator2.default.wrap(
                            function _callee$(_context) {
                              while (1) {
                                switch ((_context.prev = _context.next)) {
                                  case 0:
                                    return _context.abrupt(
                                      'return',
                                      extractFields(apiURL, store, cache, createNode, touchNode, auth, f, options)
                                    )

                                  case 1:
                                  case 'end':
                                    return _context.stop()
                                }
                              }
                            },
                            _callee,
                            undefined
                          )
                        })
                      )

                      return function(_x9) {
                        return _ref2.apply(this, arguments)
                      }
                    })()
                  )
                )

              case 12:
                _context2.next = 76
                break

              case 14:
                if (!(field !== null && (0, _fp.has)('mime', field))) {
                  _context2.next = 38
                  break
                }

                fileNodeID = void 0
                // using field on the cache key for multiple image field

                mediaDataCacheKey = 'strapi-media-' + item.id + '-' + key
                _context2.next = 19
                return cache.get(mediaDataCacheKey)

              case 19:
                cacheMediaData = _context2.sent

                // If we have cached media data and it wasn't modified, reuse
                // previously created file node to not try to redownload
                if (cacheMediaData && field.updated_at === cacheMediaData.updated_at) {
                  fileNodeID = cacheMediaData.fileNodeID
                  touchNode({ nodeId: cacheMediaData.fileNodeID })
                }

                // If we don't have cached data, download the file

                if (fileNodeID) {
                  _context2.next = 35
                  break
                }

                _context2.prev = 22

                // full media url
                source_url = '' + (field.url.startsWith('http') ? '' : apiURL) + field.url
                _context2.next = 26
                return createRemoteFileNode({
                  url: source_url,
                  store: store,
                  cache: cache,
                  createNode: createNode,
                  auth: auth,
                })

              case 26:
                fileNode = _context2.sent

                if (!fileNode) {
                  _context2.next = 31
                  break
                }

                fileNodeID = fileNode.id

                _context2.next = 31
                return cache.set(mediaDataCacheKey, {
                  fileNodeID: fileNodeID,
                  updated_at: field.updated_at,
                })

              case 31:
                _context2.next = 35
                break

              case 33:
                _context2.prev = 33
                _context2.t0 = _context2['catch'](22)

              case 35:
                if (fileNodeID) {
                  item[key + '___NODE'] = fileNodeID
                }
                _context2.next = 76
                break

              case 38:
                if (
                  !(
                    field !== null &&
                    (typeof field === 'undefined' ? 'undefined' : (0, _typeof3.default)(field)) === 'object'
                  )
                ) {
                  _context2.next = 43
                  break
                }

                _context2.next = 41
                return extractFields(apiURL, store, cache, createNode, touchNode, auth, field, options)

              case 41:
                _context2.next = 76
                break

              case 43:
                if (!(field !== null && shouldParseForImages(key))) {
                  _context2.next = 76
                  break
                }

                // parse the markdown content
                parsed = reader.parse(field)
                walker = parsed.walker()
                ;(event = void 0), (node = void 0)

              case 47:
                if (!(event = walker.next())) {
                  _context2.next = 76
                  break
                }

                node = event.node
                // process image nodes

                if (!(event.entering && node.type === 'image')) {
                  _context2.next = 74
                  break
                }

                ;(_fileNodeID = void 0), (fileNodeBase = void 0)
                filePathname = node.destination

                // using filePathname on the cache key for multiple image field

                _mediaDataCacheKey = 'strapi-media-' + item.id + '-' + filePathname
                _context2.next = 55
                return cache.get(_mediaDataCacheKey)

              case 55:
                _cacheMediaData = _context2.sent

                // If we have cached media data and it wasn't modified, reuse
                // previously created file node to not try to redownload
                if (_cacheMediaData) {
                  _fileNodeID = _cacheMediaData.fileNodeID
                  fileNodeBase = _cacheMediaData.fileNodeBase
                  touchNode({ nodeId: _cacheMediaData.fileNodeID })
                }

                if (!(!_fileNodeID && !(0, _allowDirectImgDomain.isStartWithAllowDirectDomains)(filePathname))) {
                  _context2.next = 74
                  break
                }

                _context2.prev = 58

                // full media url
                _source_url = '' + (filePathname.startsWith('http') ? '' : apiURL) + filePathname

                console.log(item.id, ' source_url', _source_url)

                _context2.next = 63
                return createRemoteFileNode({
                  url: _source_url,
                  store: store,
                  cache: cache,
                  createNode: createNode,
                  auth: auth,
                })

              case 63:
                _fileNode = _context2.sent

                if (!_fileNode) {
                  _context2.next = 69
                  break
                }

                _fileNodeID = _fileNode.id
                fileNodeBase = _fileNode.base

                _context2.next = 69
                return cache.set(_mediaDataCacheKey, {
                  fileNodeID: _fileNodeID,
                  fileNodeBase: fileNodeBase,
                })

              case 69:
                _context2.next = 73
                break

              case 71:
                _context2.prev = 71
                _context2.t1 = _context2['catch'](58)

              case 73:
                if (_fileNodeID) {
                  // create an array of parsed and downloaded images as a new field
                  if (!item[key + '_images___NODE']) {
                    item[key + '_images___NODE'] = []
                  }
                  item[key + '_images___NODE'].push(_fileNodeID)

                  // replace filePathname with the newly created base
                  // useful for future operations in Gatsby
                  item[key] = item[key].replace(filePathname, fileNodeBase || filePathname)
                }

              case 74:
                _context2.next = 47
                break

              case 76:
                _iteratorNormalCompletion = true
                _context2.next = 6
                break

              case 79:
                _context2.next = 85
                break

              case 81:
                _context2.prev = 81
                _context2.t2 = _context2['catch'](4)
                _didIteratorError = true
                _iteratorError = _context2.t2

              case 85:
                _context2.prev = 85
                _context2.prev = 86

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return()
                }

              case 88:
                _context2.prev = 88

                if (!_didIteratorError) {
                  _context2.next = 91
                  break
                }

                throw _iteratorError

              case 91:
                return _context2.finish(88)

              case 92:
                return _context2.finish(85)

              case 93:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee2,
        undefined,
        [
          [4, 81, 85, 93],
          [22, 33],
          [58, 71],
          [86, , 88, 92],
        ]
      )
    })
  )

  return function extractFields(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments)
  }
})()

// Downloads media from image type fields
exports.downloadMediaFiles = (function() {
  var _ref3 = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/ _regenerator2.default.mark(function _callee4(_ref4) {
      var entities = _ref4.entities,
        apiURL = _ref4.apiURL,
        store = _ref4.store,
        cache = _ref4.cache,
        createNode = _ref4.createNode,
        touchNode = _ref4.touchNode,
        auth = _ref4.jwtToken,
        options = _ref4.options
      return _regenerator2.default.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                return _context4.abrupt(
                  'return',
                  _promise2.default.all(
                    entities.map(
                      (function() {
                        var _ref5 = (0, _asyncToGenerator3.default)(
                          /*#__PURE__*/ _regenerator2.default.mark(function _callee3(entity, i) {
                            var itemType,
                              _iteratorNormalCompletion2,
                              _didIteratorError2,
                              _iteratorError2,
                              _iterator2,
                              _step2,
                              item

                            return _regenerator2.default.wrap(
                              function _callee3$(_context3) {
                                while (1) {
                                  switch ((_context3.prev = _context3.next)) {
                                    case 0:
                                      itemType = options.allTypes[i]
                                      _iteratorNormalCompletion2 = true
                                      _didIteratorError2 = false
                                      _iteratorError2 = undefined
                                      _context3.prev = 4
                                      _iterator2 = (0, _getIterator3.default)(entity)

                                    case 6:
                                      if ((_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done)) {
                                        _context3.next = 13
                                        break
                                      }

                                      item = _step2.value
                                      _context3.next = 10
                                      return extractFields(apiURL, store, cache, createNode, touchNode, auth, item, {
                                        itemType: itemType,
                                        markdownImages: options.markdownImages,
                                      })

                                    case 10:
                                      _iteratorNormalCompletion2 = true
                                      _context3.next = 6
                                      break

                                    case 13:
                                      _context3.next = 19
                                      break

                                    case 15:
                                      _context3.prev = 15
                                      _context3.t0 = _context3['catch'](4)
                                      _didIteratorError2 = true
                                      _iteratorError2 = _context3.t0

                                    case 19:
                                      _context3.prev = 19
                                      _context3.prev = 20

                                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return()
                                      }

                                    case 22:
                                      _context3.prev = 22

                                      if (!_didIteratorError2) {
                                        _context3.next = 25
                                        break
                                      }

                                      throw _iteratorError2

                                    case 25:
                                      return _context3.finish(22)

                                    case 26:
                                      return _context3.finish(19)

                                    case 27:
                                      return _context3.abrupt('return', entity)

                                    case 28:
                                    case 'end':
                                      return _context3.stop()
                                  }
                                }
                              },
                              _callee3,
                              undefined,
                              [
                                [4, 15, 19, 27],
                                [20, , 22, 26],
                              ]
                            )
                          })
                        )

                        return function(_x11, _x12) {
                          return _ref5.apply(this, arguments)
                        }
                      })()
                    )
                  )
                )

              case 1:
              case 'end':
                return _context4.stop()
            }
          }
        },
        _callee4,
        undefined
      )
    })
  )

  return function(_x10) {
    return _ref3.apply(this, arguments)
  }
})()
