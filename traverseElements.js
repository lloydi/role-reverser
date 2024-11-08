function traverseElements() {
  // Get all specific HTML elements in the document using querySelectorAll
  const allElements = document.querySelectorAll('[role="banner"],[role="blockquote"],[role="button"],[role="caption"],[role="checkbox"],[role="checkbox"],[role="code"],[role="columnheader"],[role="complementary"],[role="contentinfo"],[role="definition"],[role="deletion"],[role="emphasis"],[role="figure"],[role="form"],[role="gridcell"],[role="heading"],[role="image"],[role="img"],[role="insertion"],[role="link"],[role="list"],[role="listbox"],[role="listitem"],[role="main"],[role="navigation"],[role="option"],[role="radio"],[role="region"],[role="row"],[role="rowgroup"],[role="rowgroup"],[role="strong"],[role="subscript"],[role="superscript"],[role="table"],[role="textbox"]');

  // Create an array to store the elements and their parents
  const elementTree = [];

  // Traverse the elements from deepest to parent
  for (let i = allElements.length - 1; i >= 0; i--) {
    const element = allElements[i];
    const parent = element.parentNode;

    elementTree.push({
      element: element,
      parent: parent
    });
  }

  return elementTree;
}