import { data1, data2, data3, data4, data5 } from './data.js';

const ELEMENT_ID = 'app';

const templateTree = document.createElement('template');
templateTree.innerHTML = `
  <style>
    :host {
      position: relative;
      margin: 5px;
      padding: 15px;
      display: inline-flex;
      align-items: flex-start;
      border: 2px solid dodgerblue;
      background-color: rgba(20, 20, 250, 0.1);
    }

    :host::after {
      content: attr(data-id);
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      display: inline;
      width: 24px;
      height: 24px;
      border-radius: 0 0 50% 0;
      overflow: hidden;
      word-wrap: break-word;
      text-emphasis: emphasis;
      background-color: rgba(255, 255, 255, 0.5);
    } 
  </style>
  <slot></slot>
`;

const templateLeaf = document.createElement('template');
templateLeaf.innerHTML = `
  <style>
    :host {
      position: relative;
      margin: 5px;
      padding: 15px;
      border: 2px solid goldenrod;
      background-color: rgba(250, 246, 20, 0.705);
    }

    :host::after {
      content: attr(data-id);
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      display: inline;
      width: 24px;
      height: 24px;
      border-radius: 0 0 50% 0;
      overflow: hidden;
      word-wrap: break-word;
      text-emphasis: emphasis;
      background-color: rgba(255, 255, 255, 0.5);
    } 
  </style>
  <slot></slot>
`;

class MyTree extends HTMLElement {
  constructor(props) {
    super();
    this.props = props;
  }
  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateTree.content.cloneNode(true));
  }
}

class MyLeaf extends HTMLElement {
  constructor(props) {
    super();
    this.props = props;
  }
  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateLeaf.content.cloneNode(true));
  }
}

const MyTreeCustomEl = customElements.define('my-tree', MyTree);
const MyLeafCustomEl = customElements.define('my-leaf', MyLeaf);

function renderTree(slot, text = '') {
  return `<my-tree data-id="${text}">${slot}</my-tree>`;
}

function renderLeaf(text = '0') {
  return `<my-leaf data-id="${text}"></my-leaf>`;
}

function renderNode(node) {
  if (node.items) {
    return renderTree(render(node.items, ''), node.id);
  }
  return renderLeaf(node.id);
}

function render(node, html) {
  if (Array.isArray(node)) {
    node.forEach(node => {
      html += renderNode(node);
    });
  } else {
    html += renderNode(node);
  }
  return html;
}

function start(tree) {
  document.querySelector(`#${ELEMENT_ID}`).innerHTML += render(tree, '');
}

start(data1);
start(data2);
start(data3);
start(data4);
start(data5);
