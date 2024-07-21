function appendChildren(parent, ...children) {
  parent.append(...children);
}

function createElement(elementName, { text, classList, id } = {}) {
  const element = document.createElement(elementName);
  if (text) element.textContent = text;
  if (classList) element.classList.add(...classList);
  if (id) element.id = id;
  return element;
}

export { appendChildren, createElement };
