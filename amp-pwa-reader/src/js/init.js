var itemsContainer = document.querySelector('main');
var articleContainer = document.querySelector('article');
var _animationSpeed;

function getAnimationSpeed() {

  if (_animationSpeed) {
    return _animationSpeed;
  }

  let htmlStyles = window.getComputedStyle(document.querySelector("html"));
  _animationSpeed = parseFloat(htmlStyles.getPropertyValue("--animation-speed")) * 1000;

  return _animationSpeed;
}

// setup nav
const nav = new Nav();