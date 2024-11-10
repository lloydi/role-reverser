// TODO

// Handle heading levels

function transformHTML() {
  console.clear();
  const txtSource = document.querySelector("#txtSource");
  const txtAmended = document.querySelector("#txtAmended");
  const tempDOMDumpingGround = document.querySelector("#tempDOMDumpingGround");
  const btnReverseRoles = document.querySelector("#btnReverseRoles");
  let removedRoleCount = 0;
  let swappedElCount = 0;
  let labelCounter = 0;

  function transformNode(node) {
    // Only process elements with a role attribute
    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('role')) {
      const role = node.getAttribute('role');
      
      // Capture the text content early
      const originalText = node.textContent.trim();

      if (role.toUpperCase() === node.tagName.toUpperCase()) {
        // Same element/role. No cloning
        // TODO - also strip when role and element are equivalent, e.g. <a>/role=link
        removedRoleCount++;
        node.removeAttribute("role");
      } else {
        // Different element/role. Clone it
        swappedElCount++;
        
        const roleToElementMap = {
          link: { element: 'a' },
          banner: { element: 'header' },
          listitem: { element: 'li' },
          list: { element: 'ul' },
          navigation: { element: 'nav' },
          columnheader: { element: 'th' },
          gridcell: { element: 'td' },
          
          // Input elements with types
          checkbox: { element: 'input', type: 'checkbox', needsLabel: true, labelAfter: true },
          radio: { element: 'input', type: 'radio', needsLabel: true, labelAfter: true },
          textbox: { element: 'input', type: 'text', needsLabel: true, labelAfter: false }
        };

        // Get the element and type in one lookup
        const mapping = roleToElementMap[role] || { element: 'div' };
        const newElTagName = mapping.element;
        const elType = mapping.type;
        const needsLabel = mapping.needsLabel;
        const labelAfter = mapping.labelAfter;
        
        // Create wrapper div for input + label if needed
        const wrapper = needsLabel ? document.createElement('div') : null;
        
        // Create the new element
        const newElement = document.createElement(newElTagName);

        // If the mapping has a type property, add it to the element
        if (mapping.type) {
          newElement.setAttribute('type', mapping.type);
        }

        // For elements that need labels, create a unique ID and label
        if (needsLabel) {
          labelCounter++;
          const id = `${role}_${labelCounter}`;
          newElement.setAttribute('id', id);
          
          // Create label element
          const label = document.createElement('label');
          label.setAttribute('for', id);
          label.textContent = originalText || `${role} ${labelCounter}`;
          
          // Add input and label to wrapper in the correct order
          if (labelAfter) {
            wrapper.appendChild(newElement);
            wrapper.appendChild(label);
          } else {
            wrapper.appendChild(label);
            wrapper.appendChild(newElement);
          }
          
          // Replace the original node with the wrapper
          node.parentNode.replaceChild(wrapper, node);
        } else {
          // Copy all attributes from the original element to the new element
          Array.from(node.attributes).forEach(attr => {
            if (attr.name !== 'role') {
              newElement.setAttribute(attr.name, attr.value);
            }
          });

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
        }
      }
    } else {
      // Recursively transform the children of the current node
      for (let i = 0; i < node.childNodes.length; i++) {
        transformNode(node.childNodes[i]);
      }
    }
  }

  function logResults(){
    console.log("==================================================");
    console.log("Swapped elements: " + swappedElCount);
    console.log("Elements with superfluous `role` removed: " + removedRoleCount);
    console.log("==================================================");
    const log = document.querySelector("#log");
    let strChangeSummary = "";
    strChangeSummary += "<li>Swapped elements: " + swappedElCount + "</li>";
    strChangeSummary += "<li>Elements with superfluous `role` removed: " + removedRoleCount + "</li>";
    strChangeSummary = "<ul>" + strChangeSummary + "</ul>";
    log.innerHTML = strChangeSummary;
  }
  function swapElements() {
    tempDOMDumpingGround.innerHTML = txtSource.value;
    transformNode(tempDOMDumpingGround);
    txtAmended.value = tempDOMDumpingGround.innerHTML;
    logResults();
  }

  btnReverseRoles.addEventListener("click", (e) => {
    swapElements();
  });

  swapElements();
}

transformHTML();