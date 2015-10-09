// Scroll history plugin for FlowRouter

// Article
// * https://kadira.io/academy/meteor-routing-guide/content/triggers

// we only need to keep history for two paths at once
// first path is what we need to check always
previousPaths = [null, null];

let saveScrollPosition = function(context) {
  var pathInfo = {
    path: context.path,
    scrollPosition: $('body').scrollTop()
  };
  // add a new path and remove the first path
  // using as a queue
  previousPaths.push(pathInfo);
  previousPaths.shift();
};

let jumpToPrevScrollPosition = function(context) {
  const path = context.path;
  let scrollPosition = 0;
  let prevPathInfo = previousPaths[0];
  if (prevPathInfo && prevPathInfo.path === context.path) {
    scrollPosition = prevPathInfo.scrollPosition;
  }
  if (scrollPosition === 0) {
    // we can scroll right away since we don't need to wait for rendering
    $('body')
      .velocity('scroll', {
        duration: 300, offset: scrollPosition, easing: 'easeInOutQuad'
      });
  } else {
    // Now we need to wait a bit for blaze/react does rendering.
    // We assume, there's subs-manager and we've previous page's data.
    // Here 10 millis deley is a arbitary value with some testing.
    setTimeout(function () {
      $('body')
        .velocity('scroll', {
          duration: 300, offset: scrollPosition, easing: 'easeInOutQuad'
        });
    }, 15);
  }
};

FlowRouter.triggers.exit([saveScrollPosition]);
FlowRouter.triggers.enter([jumpToPrevScrollPosition]);
