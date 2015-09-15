# Start gulp
gulp = require 'gulp'
# Load automatically all declared plugin from the package.json
p = require('gulp-load-plugins')
  # The glob(s) for searching plugins
  pattern: ['gulp-*', 'gulp.*']
  # Plugins are extracted from the regular package.json (default)
  #config: 'package.json'
  # Get plugins from all gulp's keys
  scope: ['dependencies', 'devDependencies', 'peerDependencies']
  # Removal pattern for shortening package's name
  replaceString: /^gulp(-|\.)/
  # Transform package's name using a camel case convention
  camelize: true
  # Lazy load packages: they are loaded on demand
  lazy: true
  # Mapping for renaming plugins
  rename: {}
# PNG quantization
pngquant = require 'imagemin-pngquant'
# Node's utils
path = require 'path'

# Distribution folders
videoDist = '../app/public/videos/'
imgDist = '../app/public/img/'
faviconsDist = '../app/public/'

# Video compression
# ffmpeg -y -i $videoIn -vcodec libx264 -preset veryslow -an -f mp4 $videoOut
gulp.task 'video', ->
  options =
    continueOnError: false
    pipeStdout: false
    distDir: (f) -> "#{videoDist}#{path.basename f}"
  reporterOptions =
    err: true
    stderr: true
    stdout: true
  gulp.src 'src/*.mp4'
    .pipe p.exec 'ffmpeg -y -i <%= file.path %> -vcodec libx264 \
      -preset veryslow -an -f mp4 \
      <%= options.distDir(file.path) %>', options
    .pipe p.exec.reporter reporterOptions

# Video screenshot
# ffmpeg -ss $timeStamp -i $videoOut -frames 1 $tmpCover
gulp.task 'screenshot', ['video'], ->
  options =
    continueOnError: false
    pipeStdout: false
    distDir: (f) ->
      "#{imgDist}#{((path.basename f).split path.extname f)[0]}.jpg"
  reporterOptions =
    err: true
    stderr: true
    stdout: true
  gulp.src 'src/*.mp4'
    .pipe p.exec 'ffmpeg -y -ss 00:00:03 -i <%= file.path %> -frames 1 \
      <%= options.distDir(file.path) %>', options
    .pipe p.exec.reporter reporterOptions

# Resize images
# See breakpoints in site.variables.import.less
profiles =
  widescreenMonitor: 1920
  largeMonitor: 1200
  computer: 992
  tablet: 768
  mobile: 320

_ = require 'underscore'
types = _.keys profiles
for type in types
  do (type) ->
    gulp.task "resize-#{type}", ->
      gulp.src 'src/*.jpg'
        .pipe p.imageResize width: profiles[type]
        .pipe p.rename (path) -> path.basename += "_#{type}"
        .pipe gulp.dest imgDist

targets = _.map types, (type) -> "resize-#{type}"

# Optimize images
gulp.task 'imagemin', targets, ->
  gulp.src "#{imgDist}/*.{jpg,png,gif,svg}"
    .pipe p.imagemin
      progressive: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngquant()]
    .pipe gulp.dest imgDist

# Create all webp images
gulp.task 'webp', ['imagemin'], ->
  gulp.src "#{imgDist}/*.jpg"
    .pipe p.webp()
    .pipe gulp.dest imgDist

# Default task call every tasks created so far
gulp.task 'default', ['webp']
