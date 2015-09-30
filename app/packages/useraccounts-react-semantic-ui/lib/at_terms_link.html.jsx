<template name="atTermsLink">
  <div class="at-terms-link at-wrap">
    <p>
      {{text}}
      <br>
      {{#if privacyUrl}}
        <a href="{{privacyUrl}}" class="{{disabled}}">{{privacyLinkText}}</a>
      {{/if}}
      {{#if showTermsAnd}}
        {{and}}
      {{/if}}
      {{#if termsUrl}}
        <a href="{{termsUrl}}" class="{{disabled}}">{{termsLinkText}}</a>
      {{/if}}
    </p>
  </div>
</template>
