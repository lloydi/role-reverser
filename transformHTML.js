function transformHTML(rootElement) {
  function transformNode(node) {
    // Only process elements with a role attribute
    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('role')) {
      const role = node.getAttribute('role');

      // Change the element type to match the role name
      const newElement = document.createElement(role);

      // Copy the child nodes to the new element
      while (node.firstChild) {
        newElement.appendChild(node.firstChild);
      }

      // Replace the original node with the new element
      node.parentNode.replaceChild(newElement, node);

      // Recursively transform the children of the new element
      for (let i = 0; i < newElement.childNodes.length; i++) {
        transformNode(newElement.childNodes[i]);
      }
    } else {
      // Recursively transform the children of the current node
      for (let i = 0; i < node.childNodes.length; i++) {
        transformNode(node.childNodes[i]);
      }
    }
  }

  transformNode(rootElement);
}