window.getPath = (() => {
  /**
   * A unique selector for `HTMLElement`
   *
   * @function getUniqueSelector
   * @param {HTMLElement} element
   * @return {string} unique selector
   */
  function getUniqueSelector(element) {
    /**
     * Join selectors in string
     *
     * @function joinSelectors
     * @param  {array|...any} path Selectors array
     * @return {string} unique selector
     */
    function joinSelectors(...path) {
      return path.flat(Infinity).join(" > ");
    }

    /**
     * Test selectors array  (path) to see if it returns one element
     *
     * @function isUniqueQuery
     * @param {array} path Selectors array
     * @return {boolean} `true` if the value is an one element; otherwise, `false`
     */
    function isUniqueQuery(path) {
      return document.querySelectorAll(joinSelectors(path) || null).length === 1;
    }

    const path = [];

    do {
      if (!(element instanceof Element)) return Error("No Element");

      let accSelectors = element.nodeName.toLowerCase();

      // 0 - SuperNode
      if (accSelectors === "body" || accSelectors === "head" || accSelectors === "html") {
        return joinSelectors(accSelectors, path);
      }

      // 1 - ID
      if (element.id) return joinSelectors(`#${element.id}`, path);

      // 2 - nodeName
      path.unshift(accSelectors);
      if (isUniqueQuery(path)) return joinSelectors(path);

      // 3 - add classes
      if (element.className) {
        accSelectors += `.${element.className.trim().replace(/ +/g, ".")}`;
        path[0] = accSelectors;
        if (isUniqueQuery(path)) return joinSelectors(path);
      }

      // 4 - add attributes
      const arrAttributes = ["name", "title", "placeholder", "data-*"];
      arrAttributes.forEach(attribute => {
        if (attribute === "data-*") {
          // data-* - universal data-attr
          const arrDataAttrs = [...element.attributes].filter(
            attr => attr.name.indexOf("data-") === 0
          );
          arrDataAttrs.forEach(dataAttr => {
            accSelectors += `[${dataAttr.name}='${dataAttr.value}']`;
            path[0] = accSelectors;
            if (isUniqueQuery(path)) return joinSelectors(path);
          });
        } else if (element[attribute]) {
          // specific attr
          accSelectors += `[${attribute}='${element[attribute]}']`;
          path[0] = accSelectors;
          if (isUniqueQuery(path)) return joinSelectors(path);
        }
      });

      // 5 - add nth-child()
      let elChild = element;
      let n = 1;
      while ((elChild = elChild.previousElementSibling) !== null) n++;

      if (n > 1) accSelectors += `:nth-child(${n})`;
      else accSelectors += ":first-child";

      path[0] = accSelectors;
      if (isUniqueQuery(path)) return joinSelectors(path);

      // 6 - go parent
      element = element.parentNode;
    } while (element.parentNode);
  }

  return getUniqueSelector;
})();
