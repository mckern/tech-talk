/*jshint esversion: 6 */

/*
 * Slideshow Configuration
 */
// One of https://github.com/isagalaev/highlight.js/tree/master/src/styles
const HIGHLIGHT_THEME = 'railscasts';

// See options at https://daneden.github.io/animate.css/
const TRANSITIONS = {
  NEXT: 'slideInRight',
  PREV: 'slideInLeft',
  INCREMENTAL: 'fadeIn'
};

 // hack to track any windows we clone, so we can send commands between presenter mode
 // and the slide deck
const OPENEDWINDOWS = [];
// window._open = window.open; // saving original function
// window.open = function(url,name,params){
//   OPENEDWINDOWS.push(window._open(url,name,params));
// }

// Get the first title element of a slide and return its text content.
function getTitle(element) {
  const header = element.querySelector('h1, h2, h3, h4, h5');
  let title = '';

  if (header) {
    title = header.textContent;
  }

  return title;
}

// Create the slideshow on the page.
const slideshow = remark.create({
  highlightStyle: HIGHLIGHT_THEME,
  navigation: { scroll: false },
  ratio: '16:9',
  cloneTarget: "__blank"
});

// Set up transitions between slides by monitoring which direction we are
// traveling and whether the slides are incremental (by checking titles).
slideshow.on('beforeShowSlide', (next) => {
  const nextIndex = next.getSlideIndex();
  const prevIndex = slideshow.getCurrentSlideIndex();
  const slides = document.querySelectorAll('.remark-slide-container');
  const nextDiv = slides[nextIndex];
  const prevDiv = slides[prevIndex];
  const nextTitle = getTitle(nextDiv);
  const prevTitle = getTitle(prevDiv);

  let direction = nextIndex > prevIndex ? TRANSITIONS.NEXT : TRANSITIONS.PREV;

  if (prevTitle === nextTitle) {
    // Special case, either incremental slides or similar enough.
    direction = TRANSITIONS.INCREMENTAL;
  }

  nextDiv.classList.add('animated');
  nextDiv.classList.add(direction);

  prevDiv.classList.remove('animated');
  prevDiv.classList.remove(TRANSITIONS.NEXT);
  prevDiv.classList.remove(TRANSITIONS.PREV);
  prevDiv.classList.remove(TRANSITIONS.INCREMENTAL);
});

const term = document.querySelector('#terminal');

// Slide the term into or out of the viewport.
function toggleTerm() {
  term.classList.toggle('slideInDown');
  term.classList.toggle('slideOutUp');
}

function toggleAllTerms() {
  if (slideshow.clone && !slideshow.clone.closed) {
    console.log("calling for clone");
    slideshow.clone.toggleTerm();
  } else {
    console.log("calling for main window");
    toggleTerm();
  }
}

function reconnectTerm() {
  document.getElementById('terminal-frame').contentWindow.location.reload();
}

// Toggle either from keypress or pressing the close button.
window.addEventListener('keyup', (event) => {
  //console.log(event);
  if (event.keyCode == 192 /* Key: ~ */) {
    // toggleTerm();
    toggleAllTerms();

    // If there is a selection, send it to the terminal. To make
    // the code examples a bit nicer, we don't need a `\` at the end
    // of each continued line. Instead, indent subsequent lines and this
    // will replace the newline + join with a single space.
    const selected = document
      .getSelection()
      .toString()
      .replace(/\n  /gm, ' ');

    let msg = '';
    if (selected) {
      msg = `clear\n${selected}\n`;
    }

    document
      .querySelector('iframe')
      .contentWindow
      .postMessage(msg, '*');
  }
});

// Toggle terminal when pressing the `close` button.
// term.querySelector('a.close').addEventListener('click', toggleTerm)
term.querySelector('a.close').addEventListener('click', toggleAllTerms);
// Reconnect terminal when pressing the `reconnect button
term.querySelector('a.reconnect').addEventListener('click', reconnectTerm);

window.addEventListener('load', () => {
  setTimeout(() => {
    // Enable animations
    document.body.classList.remove('preload');
  }, 200);
});

// Setup MathJax
MathJax.Hub.Config({
  asciimath2jax: {
    // Since Markdown makes heavy use of backticks, prefer a syntax that
    // won't conflict with Markdown processing.
    delimiters: [['%%','%%']]
  }
});

MathJax.Hub.Configured();
