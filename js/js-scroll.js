const scrollElements = document.querySelectorAll(".jsScroll")
scrollElements.forEach((el) => {
  if (elementInView(el, .25, .75)) {
    console.log("in view")
    displayScrollElement(el)
  }
}
)
// display functions
//"el" is short for "element"
//checks wether element is in viewable area
function elementInView(el, amountInViewDown = 1, amountInViewUp = 1 ) {
  const elTop = el.getBoundingClientRect().top
  const elHeight = el.getBoundingClientRect().height
  return (
    elTop + elHeight * amountInViewDown <= document.documentElement.clientHeight && elTop + elHeight * amountInViewUp > 0
  )
}

//check wether element is above the viewable area
function elementOutOfView(el) {
  const elTop = el.getBoundingClientRect().top
  const elBottom = el.getBoundingClientRect().bottom
  return (
    elTop >= document.documentElement.clientHeight || elBottom < 0
  )
}

//show element
function displayScrollElement(el) {
  el.classList.add("scrolled")
}

//hide element
function hideScrollElement(el) {
  el.classList.remove("scrolled")
}

function handleScrollAnimation() {
  scrollElements.forEach((el) => {
    if (elementInView(el, .25, .75)) {
      displayScrollElement(el)
    } else if (elementOutOfView(el)) {
      hideScrollElement(el)
    }
  }
  )
}
window.addEventListener('scroll', handleScrollAnimation)
//UTILITY
// throttle - fn = function to call, wait = interval in ms
function throttle(fn, wait) {
  let inThrottle, lastFn, lastTime
  return function () {
    const context = this,
      args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  };
};
