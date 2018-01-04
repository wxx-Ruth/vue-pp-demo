let sessionCache = {}
let localCache = {}

export const sessionStorage = getSessionStorage() || getCacheStorage(sessionCache)
export const localStorage = getLocalStorage() || getCacheStorage(localCache)

function getSessionStorage () {
  var storage
  try {
    window.sessionStorage.removeItem('_Q_test_')
    window.sessionStorage.setItem('_Q_test_', 1)
    window.sessionStorage.removeItem('_Q_test_')
    storage = window.sessionStorage
  } catch (e) {
    return null
  }
  return getStorage(storage)
}

function getLocalStorage () {
  var storage
  try {
    window.localStorage.removeItem('_Q_test_')
    window.localStorage.setItem('_Q_test_', 1)
    window.localStorage.removeItem('_Q_test_')
    storage = window.localStorage
  } catch (e) {
    return null
  }
  return getStorage(storage)
}

function getStorage (storage) {
  const STRING_MARK = '__string__'
  return {
    getItem: function (key) {
      var value = storage.getItem(key)
      if (value && value.indexOf(STRING_MARK) >= 0) {
        return value.replace(STRING_MARK, '')
      } else if (value === 'undefined') {
        return undefined
      } else {
        return JSON.parse(value)
      }
    },
    setItem: function (key, value) {
      var _value
      if (isString(value)) {
        _value = value + STRING_MARK
      } else {
        _value = JSON.stringify(value)
      }
      storage.setItem(key, _value)
    },
    removeItem: function (key) {
      storage.removeItem(key)
    }
  }
  function isString (value) {
    return Object.prototype.toString.call(value) === '[object String]'
  }
}

function getCacheStorage (cacheStorage) {
  return {
    getItem: function (key) {
      return cacheStorage[key]
    },
    setItem: function (key, value) {
      cacheStorage[key] = value
    },
    removeItem: function (key) {
      delete cacheStorage[key]
    }
  }
}
