Package.describe({
  summary: 'Accounts Templates styled for Semantic UI.',
  version: '1.12.3',
  name: 'useraccounts:react-semantic-ui',
  git: 'https://github.com/meteor-useraccounts/reac-semantic-ui.git',
});

Package.on_use(function(api, where) {
  api.versionsFrom('1.2');

  api.use([
    'templating',
    'underscore',
  ], 'client');

  api.use([
    'react',
    'es5-shim',
    'ecmascript',
    'useraccounts:core',
    'timbrandin:sideburns'
  ], ['client', 'server']);

  // Requires all routing packages loads before this asking for weak dependencies.
  api.use('useraccounts:flow-ssr-react@1.12.1', ['client', 'server'], {weak: true});

  api.imply([
    'react',
    'es5-shim',
    'ecmascript',
    'useraccounts:core@1.12.3'
  ], ['client', 'server']);

  api.add_files([
    'lib/at_error.html.jsx',
    'lib/at_error.js',
    'lib/at_form.html.jsx',
    'lib/at_form.js',
    'lib/at_input.html.jsx',
    'lib/at_input.js',
    'lib/at_message.html.jsx',
    'lib/at_message.js',
    'lib/at_nav_button.html.jsx',
    'lib/at_nav_button.js',
    'lib/at_oauth.html.jsx',
    'lib/at_oauth.js',
    'lib/at_pwd_form.html.jsx',
    'lib/at_pwd_form.js',
    'lib/at_pwd_form_btn.html.jsx',
    'lib/at_pwd_form_btn.js',
    'lib/at_pwd_link.html.jsx',
    'lib/at_pwd_link.js',
    'lib/at_reCaptcha.html.jsx',
    'lib/at_reCaptcha.js',
    'lib/at_result.html.jsx',
    'lib/at_result.js',
    'lib/at_sep.html.jsx',
    'lib/at_sep.js',
    'lib/at_signin_link.html.jsx',
    'lib/at_signin_link.js',
    'lib/at_signup_link.html.jsx',
    'lib/at_signup_link.js',
    'lib/at_social.html.jsx',
    'lib/at_social.js',
    'lib/at_terms_link.html.jsx',
    'lib/at_terms_link.js',
    'lib/at_resend_verification_email_link.html.jsx',
    'lib/at_resend_verification_email_link.js',
    'lib/at_title.html.jsx',
    'lib/at_title.js',
    'lib/full_page_at_form.html.jsx',
    'lib/at_semantic-ui.css',
  ], ['client']);
});

Package.on_test(function(api) {
  api.use([
    'useraccounts:semantic-ui',
    'useraccounts:core@1.12.3',
  ]);

  api.use([
    'accounts-password',
    'tinytest',
    'test-helpers'
  ], ['client', 'server']);

  api.add_files([
    'tests/tests.js'
  ], ['client', 'server']);
});
