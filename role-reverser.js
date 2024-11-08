function transformHTML() {

  console.clear();
  const txtSource = document.querySelector("#txtSource");
  const txtAmended = document.querySelector("#txtAmended");
  const tempDOMDumpingGround = document.querySelector("#tempDOMDumpingGround");
  const btnReverseRoles = document.querySelector("#btnReverseRoles");
  let removedRoleCount = 0;
  let swappedElCount = 0;
  // const log = document.querySelector("#log");
  // let scopeDoc = false;
  // let consoleStr = "";
  // let pointlessTabindexCount = 0;
  // let pointlessRoles = "";
  // let pointlessRolesCount = 0;
  // let buttonWithButtonRole=false;
  // let linkWithLinkRole=false;
  // let headingWithHeadingRole=false;
  // let textInputWithTextboxRole=false;

  function transformNode(node) {
    // Only process elements with a role attribute
    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('role')) {
      const role = node.getAttribute('role');

      if (role.toUpperCase()===node.tagName.toUpperCase()) {
        // Same element/role. No cloning
        removedRoleCount++;
        node.removeAttribute("role");
      } else {
        // Different element/role. Clone it
        swappedElCount++;
        // Change the element type to match the role

        const roleToElementMap = {
          // Basic elements from previous example
          link: { element: 'a' },
          banner: { element: 'header' },
          listitem: { element: 'li' },
          list: { element: 'ul' },
          navigation: { element: 'nav' },
          columnheader: { element: 'th' },
          gridcell: { element: 'td' },
          
          // Input elements with types
          checkbox: { element: 'input', type: 'checkbox' },
          radio: { element: 'input', type: 'radio' },
          textbox: { element: 'input', type: 'text' }
        };

        // Get the element and type in one lookup
        const mapping = roleToElementMap[role] || { element: 'div' };
        const newElTagName = mapping.element;
        const elType = mapping.type; // Will be undefined for non-input elements
        const newElement = document.createElement(newElTagName);

        // If the mapping has a type property, add it to the element
        if (mapping.type) {
            newElement.setAttribute('type', mapping.type);
        }
        // Copy all attributes from the original element to the new element
        Array.from(node.attributes).forEach(attr => {
          // Skip the class attribute since we're using it as the new tag name
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

    } else {
      // Recursively transform the children of the current node
      for (let i = 0; i < node.childNodes.length; i++) {
        transformNode(node.childNodes[i]);
      }
    }
  }

  function swapElements(){
    tempDOMDumpingGround.innerHTML = txtSource.value;
    transformNode(tempDOMDumpingGround);
    txtAmended.value = tempDOMDumpingGround.innerHTML;
    console.log("==================================================");
    console.log("Swapped elements: " + swappedElCount);
    console.log("Elements with superfluous `role` removed: " + removedRoleCount);
    console.log("==================================================");
  }

  btnReverseRoles.addEventListener("click", (e) => {
    swapElements();
  });

  swapElements();

}

// function roleReverser() {
//   function swapElements(srcEl) {
//     console.clear();
//     const txtSource = document.querySelector("#txtSource");
//     const txtAmended = document.querySelector("#txtAmended");
//     const tempDOMDumpingGround = document.querySelector("#tempDOMDumpingGround");
//     const log = document.querySelector("#log");
//     const btnReverseRoles = document.querySelector("#btnReverseRoles");
//     let scopeDoc = false;
//     let consoleStr = "";
//     let pointlessTabindexCount = 0;
//     let pointlessRoles = "";
//     let pointlessRolesCount = 0;
//     let buttonWithButtonRole=false;
//     let linkWithLinkRole=false;
//     let headingWithHeadingRole=false;
//     let textInputWithTextboxRole=false;

//     function replaceElement(parent, newElementTagName, newElementType) {
//       var newDOMel = document.createElement(newElementTagName);
//       if (newElementType !== "") {
//         newDOMel.setAttribute("type", newElementType);
//       }
//       if (newElementTagName === "a") {
//         newDOMel.setAttribute("href", "#");
//       }
//       for (var i = elAttributes.length - 1; i >= 0; i--) {
//         let attrName = elAttributes[i].split("->")[0];
//         let attrVal = elAttributes[i].split("->")[1];
//         if (attrName !== "role") {
//           if (attrName !== "aria-level") {
//             newDOMel.setAttribute(attrName, attrVal);
//           }
//         }
//       }
//       if (newElementTagName === "a" || newElementTagName === "button" || newElementTagName === "input" || newElementTagName === "select" || newElementTagName === "textarea") {
//         if (newDOMel.getAttribute("tabindex")) {
//           pointlessTabindexCount++;
//           newDOMel.removeAttribute("tabindex");
//         }
//       }
//       NodeList.prototype.forEach = Array.prototype.forEach;
//       var children = parent.childNodes;
//       children.forEach(function (item) {
//         var clone = item.cloneNode(true);
//         newDOMel.appendChild(clone);
//       });
//       parent.replaceWith(newDOMel);
//     }

//     let elAttributes = [];

//     let src;
//     if (srcEl) {
//       src = srcEl;
//       scopeDoc = true;
//     } else {
//       src = tempDOMDumpingGround;
//       tempDOMDumpingGround.innerHTML = txtSource.value;
//     }

//     let swappedElementCount = 0;
//     let allElementsWithRolesCount = 0;

//     function sweepThrough() {
//       let theadAlreadyOutput = false;
//       const elementsWithRoles = src.querySelectorAll('[role="button"],[role="link"],[role="heading"],[role="banner"],[role="option"],[role="listbox"],[role="listitem"],[role="list"],[role="checkbox"],[role="checkbox"],[role="radio"],[role="textbox"],[role="main"],[role="navigation"],[role="img"],[role="image"],[role="table"],[role="rowgroup"],[role="rowgroup"],[role="row"],[role="columnheader"],[role="gridcell"]');
//       const elementsWithRolesThatNeedSwapping = src.querySelectorAll('[role="button"],[role="link"],[role="heading"],[role="banner"],[role="option"]:not(option[role="option"]),[role="listbox"]:not(select[role="listbox"]),[role="listitem"]:not(li[role="listitem"]),[role="list"]:not(ul,ol),[role="checkbox"]:not(input),[role="checkbox"]:not(input),[role="radio"]:not(input),[role="textbox"],[role="main"]:not(main),[role="navigation"]:not(nav),[role="img"]:not(img),[role="image"]:not(img),[role="table"]:not(table),[role="table"]:not(table),[role="rowgroup"]:not(thead),[role="rowgroup"]:not(tbody),[role="row"]:not(tr),[role="columnheader"]:not(th),[role="gridcell"]:not(td)');
//       if (elementsWithRolesThatNeedSwapping.length > swappedElementCount) {
//         swappedElementCount = elementsWithRolesThatNeedSwapping.length;
//       }
//       if (elementsWithRoles.length > allElementsWithRolesCount) {
//         allElementsWithRolesCount = elementsWithRoles.length;
//       }
//       Array.from(elementsWithRolesThatNeedSwapping).forEach((elementWithRoleThatNeedSwapping) => {
//         let newElementTagName = "";
//         let newElementType = "";
//         let elRole = elementWithRoleThatNeedSwapping.getAttribute("role");
//         newElementTagName = elRole;

//         if ((elRole === "link")&&(elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="a")) {
//           pointlessRolesCount++;
//             if (!linkWithLinkRole) {
//               linkWithLinkRole=true;
//             pointlessRoles+="<li>1 or more <code>a</code> elements with role of <code>link</code> found</li>";
//           }
//         }
//         if ((elRole === "button")&&(elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="button")) {
//           pointlessRolesCount++;
//             if (!buttonWithButtonRole) {
//               buttonWithButtonRole=true;
//             pointlessRoles+="<li>1 or more <code>button</code> elements with role of <code>button</code> found</li>";
//           }
//         }
//         if ((elRole === "heading")&&(
//           (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h1")||
//           (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h2")||
//           (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h3")||
//           (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h4")||
//           (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h5")||
//           (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h6")
//         )) {
//           pointlessRolesCount++;
//           if (!headingWithHeadingRole) {
//             headingWithHeadingRole=true;
//             pointlessRoles+="<li>1 or more <code>h*</code> elements with role of <code>heading</code> found</li>";
//           }
//         }
//         if ((elRole === "textbox")&&(elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="input")&&(elementWithRoleThatNeedSwapping.type.toLowerCase()==="text")) {
//           pointlessRolesCount++;
//             if (!textInputWithTextboxRole) {
//               textInputWithTextboxRole=true;
//             pointlessRoles+="<li>1 or more <code>input</code> (<code>type:text</code>) elements with role of <code>textbox</code> found</li>";
//           }
//         }

//         if (elRole === "link") {
//           newElementTagName = "a";
//         }
//         if (elRole === "banner") {
//           newElementTagName = "header";
//         }
//         if (elRole === "image") {
//           newElementTagName = "img";
//         }
//         if (elRole === "navigation") {
//           newElementTagName = "nav";
//         }
//         if (elRole === "list") {
//           newElementTagName = "ul";
//         }
//         if (elRole === "listitem") {
//           newElementTagName = "li";
//         }
//         if (elRole === "listbox") {
//           newElementTagName = "select";
//         }
//         if (elRole === "textbox") {
//           newElementTagName = "input";
//           newElementType = "text";
//         }
//         if (elRole === "heading") {
//           newElementTagName = "h" + elementWithRoleThatNeedSwapping.getAttribute("aria-level");
//         }
//         if (elRole === "checkbox" || elRole === "radio") {
//           newElementTagName = "input";
//           newElementType = elRole;
//         }
//         if (elRole === "table") {
//           newElementTagName = "table";
//         }
//         //assume that first instance of rowgroup is a table header (thead), next one is table body (tbody)
//         if (theadAlreadyOutput) {
//           if (elRole === "rowgroup") {
//             newElementTagName = "tbody";
//           }
//         } else {
//           if (elRole === "rowgroup") {
//             newElementTagName = "thead";
//             theadAlreadyOutput = true;
//           }
//         }
//         if (elRole === "row") {
//           newElementTagName = "tr";
//         }
//         if (elRole === "columnheader") {
//           newElementTagName = "th";
//         }
//         if (elRole === "gridcell") {
//           newElementTagName = "td";
//         }
//         elAttributes = [];
//         let thisElAttributes = elementWithRoleThatNeedSwapping.attributes;
//         for (var i = thisElAttributes.length - 1; i >= 0; i--) {
//           elAttributes.push(thisElAttributes[i].name + "->" + thisElAttributes[i].value);
//         }
//         replaceElement(elementWithRoleThatNeedSwapping, newElementTagName, newElementType);
//         consoleStr += elementWithRoleThatNeedSwapping.outerHTML + "\nChanges to <" + newElementTagName + ">\n----\n";
//       });
//     }
//     for (i=0;i<50;i++){
//       sweepThrough();
//     }
//     let strChangeSummary = "";
//     strChangeSummary += "<li>" + allElementsWithRolesCount + " elements in original markup have `role` attributes.</li>";
//     strChangeSummary += "<li>" + swappedElementCount + " elements were swapped back to native HTML equivalents.</li>";
//     if (allElementsWithRolesCount > swappedElementCount) {
//       strChangeSummary += "<li>" + (allElementsWithRolesCount - swappedElementCount) + " elements have (possibly superfluous) `role` attributes applied to native HTML elements.</li>";
//     }
//     if (pointlessTabindexCount > 0) {
//       strChangeSummary += "<li>" + pointlessTabindexCount + " `tabindex` attributes removed from (now) natively focusable elements</li>";
//     }
//     if (pointlessRolesCount > 0) {
//       strChangeSummary += pointlessRoles;
//     }
//     if (!scopeDoc) {
//       txtAmended.value = tempDOMDumpingGround.innerHTML;
//       tempDOMDumpingGround.innerHTML = "";
//     }
//     strChangeSummary = "<ul>" + strChangeSummary + "</ul>";
//     log.innerHTML = strChangeSummary;
//     console.log("pointlessRolesCount = " + pointlessRolesCount);
//   }

//   btnReverseRoles.addEventListener("click", (e) => {
//     swapElements();
//   });
//   swapElements();;
// }

// roleReverser();
transformHTML();