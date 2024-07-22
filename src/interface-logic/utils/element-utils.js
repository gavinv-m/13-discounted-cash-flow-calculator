function appendChildren(parent, ...children) {
  parent.append(...children);
}

function createElement(elementName, { text, innerHTML, classList, id } = {}) {
  const element = document.createElement(elementName);
  if (text) element.textContent = text;
  if (innerHTML) element.innerHTML = innerHTML;
  if (classList) element.classList.add(...classList);
  if (id) element.id = id;
  return element;
}

function createInput({
  type,
  placeholder,
  value,
  min,
  max,
  size,
  classList,
  id,
} = {}) {
  const input = document.createElement('input');
  if (type) input.type = type;
  if (placeholder) input.placeholder = placeholder;
  if (value) input.value = value;
  if (min) input.min = min;
  if (max) input.max = max;
  if (size) input.size = size;
  if (classList) input.classList.add(...classList);
  if (id) input.id = id;
  return input;
}

export { appendChildren, createElement, createInput };
