(() => {

  document.querySelector("#start-tests").addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
    
    // selector DevTools (copy selector)
    const arrSelectors = [
      '#id',
      'html',
      'body > div:nth-child(9) > div > div:nth-child(3)',
      '#id3 > div > div',
      'body > div:nth-child(12) > div > div',
      'body > div:nth-child(13) > div > div',
      'body > div:nth-child(13) > div',
      'body > div:nth-child(14) > div > div:nth-child(3)',
      'body > div:nth-child(16) > div > div',
      'body > div:nth-child(17) > div:nth-child(3)',
      'body > div:nth-child(17) > div:nth-child(2)',
      'body > div:nth-child(16)',
    ];
    const arrElements = [];

    arrSelectors.forEach(selector => {
      arrElements.push(document.querySelector(selector));
    });

    arrElements.forEach((test, i) => {
      console.assert(document.querySelectorAll(getPath(test)).length === 1, `№${i}`);
    });

    console.log('test ok');
  });

  document.querySelector("*").addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
    console.log(getPath(e.target));
  });

})();
