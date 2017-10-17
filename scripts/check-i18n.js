#!/usr/bin/env node

const fs = require('fs-extra')
const globby = require('globby')
const path = require('path')

var pattern = [
	'./src/**/*.jsx',
	'./src/**/*.json',
	'./src/**/*.js'
]

var reg = /[\u4e00-\u9fa5]+/g

var invalids = globby.sync(pattern)
	.map(filename => {
		return {
			path: filename,
			content: fs.readFileSync(filename, 'utf8')
		}
	})
	.reduce((list, config) => {
		var matches = config.content.match(reg)
		matches && list.push({
			path: config.path,
			matches: matches
		})
		return list
	}, [])

var outputPath = path.join('invalids.json')
if(invalids.length > 0) {
	fs.writeFileSync(outputPath, JSON.stringify(invalids, null, 2))
	console.log(`there are ${invalids.length} invalids, see ${outputPath}`)
} else {
	fs.removeSync(outputPath)
	console.log('all well')
}
