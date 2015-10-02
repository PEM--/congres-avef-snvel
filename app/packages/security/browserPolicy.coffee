# Browser policy

# Black list everything
BrowserPolicy.framing.disallow()
BrowserPolicy.content.disallowEval()
# BrowserPolicy.content.disallowInlineScripts()
BrowserPolicy.content.disallowConnect()
# Only allow necessary protocols
BrowserPolicy.content.allowFontDataUrl()
log.info 'Settings Browser Policy'
# Allow origin for Meteor hosting
for origin in [
  '*.meteor.com'
  '*.meteor.com/*'
  Meteor.settings.public.proxy.url.split('://')[1]
  "#{Meteor.settings.public.proxy.url.split('://')[1]}*"
  Meteor.absoluteUrl().split('://')[1]
  Meteor.absoluteUrl('*').split('://')[1]
]
  for protocol in ['http', 'https', 'ws', 'wss']
    url = "#{protocol}://#{origin}"
    log.info 'Allowing', url
    BrowserPolicy.content.allowConnectOrigin url
# Allow external CSS
for origin in ['fonts.googleapis']
  for protocol in ['http', 'https']
    BrowserPolicy.content.allowStyleOrigin "#{protocol}://#{origin}"
# Allow external fonts
for origin in ['fonts.gstatic.com']
  for protocol in ['http', 'https']
    BrowserPolicy.content.allowFontOrigin "#{protocol}://#{origin}"
# Allow Fonts and CSS
for protocol in ['http', 'https']
  BrowserPolicy.content.allowStyleOrigin "#{protocol}://fonts.googleapis.com"
  BrowserPolicy.content.allowFontOrigin "#{protocol}://fonts.gstatic.com"
# Trusted sites
for origin in [
  # Google services
  '*.google-analytics.com'
  '*.googleapis.com'
  '*.gstatic.com'
  # Browser update warning
  'browser-update.org'
  # Braintree
  '*.braintreegateway.com'
  # Mix Panel analytics
  #'cdn.mxpnl.com'
  # Kadira
  '*.kadira.io'
  # Meteor
  '*.meteor.com'
  # Meteor
  Meteor.absoluteUrl('*').split('://')[1]
]
  for protocol in ['http', 'https']
    log.info 'Allowing', porigin
    porigin = "#{protocol}://#{origin}"
    BrowserPolicy.content.allowOriginForAll porigin
    BrowserPolicy.content.allowEval porigin
