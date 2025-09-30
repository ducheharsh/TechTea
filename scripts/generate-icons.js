#!/usr/bin/env node

/**
 * Icon Generator for TechTea PWA
 * Generates icons from a source image
 * 
 * Usage: node scripts/generate-icons.js path/to/logo.png
 */

const fs = require('fs')
const path = require('path')

console.log('📱 TechTea Icon Generator')
console.log('========================\n')

const sourcePath = process.argv[2]

if (!sourcePath) {
  console.log('❌ Error: Please provide a source image path')
  console.log('\nUsage: node scripts/generate-icons.js path/to/logo.png')
  console.log('\nRequirements:')
  console.log('  - Source image should be at least 512x512px')
  console.log('  - PNG format recommended')
  console.log('  - Square aspect ratio')
  console.log('\nRecommended tools:')
  console.log('  - https://realfavicongenerator.net/')
  console.log('  - https://www.favicon-generator.org/')
  console.log('  - ImageMagick: convert logo.png -resize 192x192 icon-192x192.png')
  process.exit(1)
}

if (!fs.existsSync(sourcePath)) {
  console.log(`❌ Error: File not found: ${sourcePath}`)
  process.exit(1)
}

console.log(`✅ Source image: ${sourcePath}`)
console.log('\n📦 Manual Icon Generation Steps:')
console.log('\n1. Using ImageMagick (recommended):')
console.log('   brew install imagemagick  # or apt-get install imagemagick')
console.log(`   convert ${sourcePath} -resize 192x192 public/icon-192x192.png`)
console.log(`   convert ${sourcePath} -resize 512x512 public/icon-512x512.png`)
console.log(`   convert ${sourcePath} -resize 32x32 public/favicon.ico`)

console.log('\n2. Using Online Tool:')
console.log('   Visit: https://realfavicongenerator.net/')
console.log(`   Upload: ${sourcePath}`)
console.log('   Download and extract to public/')

console.log('\n3. Using Sharp (Node.js):')
console.log('   npm install sharp')
console.log('   Create a script to resize images')

console.log('\n✨ After generating icons, update public/manifest.json')
console.log('\n📱 Required sizes:')
console.log('   - 192x192 (PWA icon)')
console.log('   - 512x512 (PWA icon)')
console.log('   - 32x32 (favicon)')
console.log('   - 180x180 (Apple touch icon, optional)')

console.log('\n☕ TechTea')