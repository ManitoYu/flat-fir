'use strict'

const fs = require('fs')
const path = require('path')

const readDirPromise = dir => new Promise((resolve, reject) => {
  fs.readdir(dir, (err, items) => {
    if (err) return reject(err)
    resolve(items)
  })
})

const statsPromise = path => new Promise((resolve, reject) => {
  fs.stat(path, (err, stats) => {
    if (err) return reject(err)
    resolve(stats)
  })
})

const flattenDir = dir => {
  return readDirPromise(dir)
    .then(items =>
      Promise.all(
        items.map(i => {
          let absolutePath = path.resolve(dir, i)
          return statsPromise(absolutePath).then(s => Object.assign(s, { path: absolutePath }))
        })
      )
    )
    .then(stats =>
      Promise.all(stats.map(s => s.isDirectory() ? flattenDir(s.path) : s.path))
    )
    .then(result => result.reduce((a, i) => a.concat(i), []))
}

module.exports = flattenDir
