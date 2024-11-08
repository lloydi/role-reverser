function roleReverser() {
  function swapElements(srcEl) {
    console.clear();
    const txtSource = document.querySelector("#txtSource");
    const txtAmended = document.querySelector("#txtAmended");
    const tempDOMDumpingGround = document.querySelector("#tempDOMDumpingGround");
    const log = document.querySelector("#log");
    const btnReverseRoles = document.querySelector("#btnReverseRoles");
    let scopeDoc = false;
    let consoleStr = "";
    let pointlessTabindexCount = 0;
    let pointlessRoles = "";
    let pointlessRolesCount = 0;
    let buttonWithButtonRole=false;
    let linkWithLinkRole=false;
    let headingWithHeadingRole=false;
    let textInputWithTextboxRole=false;

    function replaceElement(parent, newElementTagName, newElementType) {
      var newDOMel = document.createElement(newElementTagName);
      if (newElementType !== "") {
        newDOMel.setAttribute("type", newElementType);
      }
      if (newElementTagName === "a") {
        newDOMel.setAttribute("href", "#");
      }
      for (var i = elAttributes.length - 1; i >= 0; i--) {
        let attrName = elAttributes[i].split("->")[0];
        let attrVal = elAttributes[i].split("->")[1];
        if (attrName !== "role") {
          if (attrName !== "aria-level") {
            newDOMel.setAttribute(attrName, attrVal);
          }
        }
      }
      if (newElementTagName === "a" || newElementTagName === "button" || newElementTagName === "input" || newElementTagName === "select" || newElementTagName === "textarea") {
        if (newDOMel.getAttribute("tabindex")) {
          pointlessTabindexCount++;
          newDOMel.removeAttribute("tabindex");
        }
      }
      NodeList.prototype.forEach = Array.prototype.forEach;
      var children = parent.childNodes;
      children.forEach(function (item) {
        var clone = item.cloneNode(true);
        newDOMel.appendChild(clone);
      });
      parent.replaceWith(newDOMel);
    }

    let elAttributes = [];

    let src;
    if (srcEl) {
      src = srcEl;
      scopeDoc = true;
    } else {
      src = tempDOMDumpingGround;
      tempDOMDumpingGround.innerHTML = txtSource.value;
    }

    let swappedElementCount = 0;
    let allElementsWithRolesCount = 0;

    function sweepThrough() {
      let theadAlreadyOutput = false;
      const elementsWithRoles = src.querySelectorAll('[role="button"],[role="link"],[role="heading"],[role="banner"],[role="option"],[role="listbox"],[role="listitem"],[role="list"],[role="checkbox"],[role="checkbox"],[role="radio"],[role="textbox"],[role="main"],[role="navigation"],[role="img"],[role="image"],[role="table"],[role="rowgroup"],[role="rowgroup"],[role="row"],[role="columnheader"],[role="gridcell"]');
      const elementsWithRolesThatNeedSwapping = src.querySelectorAll('[role="button"],[role="link"],[role="heading"],[role="banner"],[role="option"]:not(option[role="option"]),[role="listbox"]:not(select[role="listbox"]),[role="listitem"]:not(li[role="listitem"]),[role="list"]:not(ul,ol),[role="checkbox"]:not(input),[role="checkbox"]:not(input),[role="radio"]:not(input),[role="textbox"],[role="main"]:not(main),[role="navigation"]:not(nav),[role="img"]:not(img),[role="image"]:not(img),[role="table"]:not(table),[role="table"]:not(table),[role="rowgroup"]:not(thead),[role="rowgroup"]:not(tbody),[role="row"]:not(tr),[role="columnheader"]:not(th),[role="gridcell"]:not(td)');
      if (elementsWithRolesThatNeedSwapping.length > swappedElementCount) {
        swappedElementCount = elementsWithRolesThatNeedSwapping.length;
      }
      if (elementsWithRoles.length > allElementsWithRolesCount) {
        allElementsWithRolesCount = elementsWithRoles.length;
      }
      Array.from(elementsWithRolesThatNeedSwapping).forEach((elementWithRoleThatNeedSwapping) => {
        let newElementTagName = "";
        let newElementType = "";
        let elRole = elementWithRoleThatNeedSwapping.getAttribute("role");
        newElementTagName = elRole;

        if ((elRole === "link")&&(elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="a")) {
          pointlessRolesCount++;
            if (!linkWithLinkRole) {
              linkWithLinkRole=true;
            pointlessRoles+="<li>1 or more <code>a</code> elements with role of <code>link</code> found</li>";
          }
        }
        if ((elRole === "button")&&(elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="button")) {
          pointlessRolesCount++;
            if (!buttonWithButtonRole) {
              buttonWithButtonRole=true;
            pointlessRoles+="<li>1 or more <code>button</code> elements with role of <code>button</code> found</li>";
          }
        }
        if ((elRole === "heading")&&(
          (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h1")||
          (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h2")||
          (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h3")||
          (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h4")||
          (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h5")||
          (elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="h6")
        )) {
          pointlessRolesCount++;
          if (!headingWithHeadingRole) {
            headingWithHeadingRole=true;
            pointlessRoles+="<li>1 or more <code>h*</code> elements with role of <code>heading</code> found</li>";
          }
        }
        if ((elRole === "textbox")&&(elementWithRoleThatNeedSwapping.tagName.toLowerCase()==="input")&&(elementWithRoleThatNeedSwapping.type.toLowerCase()==="text")) {
          pointlessRolesCount++;
            if (!textInputWithTextboxRole) {
              textInputWithTextboxRole=true;
            pointlessRoles+="<li>1 or more <code>input</code> (<code>type:text</code>) elements with role of <code>textbox</code> found</li>";
          }
        }

        if (elRole === "link") {
          newElementTagName = "a";
        }
        if (elRole === "banner") {
          newElementTagName = "header";
        }
        if (elRole === "image") {
          newElementTagName = "img";
        }
        if (elRole === "navigation") {
          newElementTagName = "nav";
        }
        if (elRole === "list") {
          newElementTagName = "ul";
        }
        if (elRole === "listitem") {
          newElementTagName = "li";
        }
        if (elRole === "listbox") {
          newElementTagName = "select";
        }
        if (elRole === "textbox") {
          newElementTagName = "input";
          newElementType = "text";
        }
        if (elRole === "heading") {
          newElementTagName = "h" + elementWithRoleThatNeedSwapping.getAttribute("aria-level");
        }
        if (elRole === "checkbox" || elRole === "radio") {
          newElementTagName = "input";
          newElementType = elRole;
        }
        if (elRole === "table") {
          newElementTagName = "table";
        }
        //assume that first instance of rowgroup is a table header (thead), next one is table body (tbody)
        if (theadAlreadyOutput) {
          if (elRole === "rowgroup") {
            newElementTagName = "tbody";
          }
        } else {
          if (elRole === "rowgroup") {
            newElementTagName = "thead";
            theadAlreadyOutput = true;
          }
        }
        if (elRole === "row") {
          newElementTagName = "tr";
        }
        if (elRole === "columnheader") {
          newElementTagName = "th";
        }
        if (elRole === "gridcell") {
          newElementTagName = "td";
        }
        elAttributes = [];
        let thisElAttributes = elementWithRoleThatNeedSwapping.attributes;
        for (var i = thisElAttributes.length - 1; i >= 0; i--) {
          elAttributes.push(thisElAttributes[i].name + "->" + thisElAttributes[i].value);
        }
        replaceElement(elementWithRoleThatNeedSwapping, newElementTagName, newElementType);
        consoleStr += elementWithRoleThatNeedSwapping.outerHTML + "\nChanges to <" + newElementTagName + ">\n----\n";
      });
    }
    sweepThrough();
    sweepThrough();
    sweepThrough();
    sweepThrough();
    sweepThrough();
    sweepThrough();
    let strChangeSummary = "";
    strChangeSummary += "<li>" + allElementsWithRolesCount + " elements in original markup have `role` attributes.</li>";
    strChangeSummary += "<li>" + swappedElementCount + " elements were swapped back to native HTML equivalents.</li>";
    if (allElementsWithRolesCount > swappedElementCount) {
      strChangeSummary += "<li>" + (allElementsWithRolesCount - swappedElementCount) + " elements have (possibly superfluous) `role` attributes applied to native HTML elements.</li>";
    }
    if (pointlessTabindexCount > 0) {
      strChangeSummary += "<li>" + pointlessTabindexCount + " `tabindex` attributes removed from (now) natively focusable elements</li>";
    }
    if (pointlessRolesCount > 0) {
      strChangeSummary += pointlessRoles;
    }
    if (!scopeDoc) {
      txtAmended.value = tempDOMDumpingGround.innerHTML;
      tempDOMDumpingGround.innerHTML = "";
    }
    strChangeSummary = "<ul>" + strChangeSummary + "</ul>";
    log.innerHTML = strChangeSummary;
    console.log("pointlessRolesCount = " + pointlessRolesCount);
  }

  btnReverseRoles.addEventListener("click", (e) => {
    swapElements();
  });
}

roleReverser();
