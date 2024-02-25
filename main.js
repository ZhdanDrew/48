class CustomHTMLElement {
  constructor(tag, { parent = null, textContent = "", classList = [], children = [], attributes = {} }, events = {}) {
    this.tag = tag;
    this.attributes = attributes;
    this.events = events;
    this.children = children;

    this.element = document.createElement(tag);
    this.element.textContent = textContent;
    this.element.classList.add(...classList);

    for (const [attr, value] of Object.entries(attributes)) {
      this.element.setAttribute(attr, value);
    }

    if (parent) {
      parent.appendChild(this.element);
    }

    this.initChildren();
    this.initEvents();
  }

  initEvents() {
    for (const eventName in this.events) {
      const event = this.events[eventName];

      if (Array.isArray(event)) {
        event.forEach((handler) => {
          this.element.addEventListener(eventName, handler);
        });
      } else {
        this.element.addEventListener(eventName, event);
      }
    }
  }

  initChildren() {
    if (typeof this.children === "string") {
      this.element.innerHTML += this.children;
      return;
    }

    if (Array.isArray(this.children)) {
      this.children.forEach((child) => {
        const childToInsert = child instanceof CustomHTMLElement ? child.element : child;
        this.element.appendChild(childToInsert);
      });
    }
  }
}

const container = new CustomHTMLElement(
  "div",
  { classList: ["container"], parent: document.body }
);

const form = new CustomHTMLElement(
  "form",
  {
    parent: container.element,
    attributes: { action: "#", method: "POST" },
    events: { submit: (event) => { event.preventDefault(); console.log("Submit"); } }
  }
);

new CustomHTMLElement(
  "h1",
  { parent: form.element, textContent: "Log In" }
);

new CustomHTMLElement(
  "input",
  {
    parent: form.element,
    attributes: { type: "email", name: "email", placeholder: "Email", required: true }
  }
);

new CustomHTMLElement(
  "input",
  {
    parent: form.element,
    attributes: { type: "password", name: "password", placeholder: "Password", required: false }
  }
);

new CustomHTMLElement(
  "button",
  {
    parent: form.element,
    attributes: { type: "submit" },
    textContent: "Login"
  },
  {
    click: () => console.log("Login button clicked"),
  }
);
