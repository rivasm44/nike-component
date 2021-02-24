class productCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['img', 'title', 'price', 'description', 'collection'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (oldVal !== newVal) {
      this[attr] = newVal;
    }
  }

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
    <main class="container">
        <section class="imgBox">
        <img src="${this.img}" alt="Zapatos deportivos para correr color azul"/>
        </section>
        <section class="details">
        <div class="content">
            <h2>${this.title} <span>${this.collection}</span></h2>
            <p>${this.description}</p>
            <h3>${this.price}</h3>
            <button>Comprar</button>
        </div>
        </section>
    </main>
    ${this.getStyles()}
    `;
    return template;
  }

  getStyles() {
    return `
      <style>
      :host {
        --primary-background: #5a6cb2;
          width: 80%;
          max-width: 900px;
          min-width: 280px;
          margin: 0 auto;
      }
      .container {
          position: relative;
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 900px;
          height: 600px;
          margin: 20px;
          background-color: #fff;
          border-radius: 20px;
      }
      .container .imgBox {
          position: relative;
          display: inline-flex;
          justify-content: center;
          width: 50%;
          height: auto;
          background-color: var(--primary-background);
          border-radius: 20px;
      }
      .container .imgBox:before {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 6em;
          font-weight: 800;
          color: #000;
          content: 'Nike';
          opacity: 0.1;
      }
      .container .imgBox img {
          position: relative;
          top: 100px;
          left: -30px;
          width: 720px;
          height: 480px;
          transform: rotate(-30deg);
          transition: all 0.5s ease-out;
      }
      .container .imgBox img:hover{
        transform: scale(0.8);
    }
      .container .details {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          padding: 40px;

      }
      .container .details h2 {
          margin-bottom: 25px;
          font-size: 2.5em;
          line-height: 0.8em;
          color: #444;
      }
      .container .details h2 span {
          font-size: 0.4em;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #999;
      }
      .container .details p {
          max-width: 85%;
          margin-left: 15%;
          margin-bottom: 35px;
          color: #333;
          font-size: 15px;
      }
      .container .details h3 {
          float: left;
          font-size: 2.5em;
          color: #a2a2a2;
      }
      .container .details button {
          margin-top: 35px;
          float: right;
          padding: 15px 20px;
          font-size: 16px;
          color: #fff;
          letter-spacing: 1px;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 40px;
          background-color: var(--primary-background);
          cursor: pointer;
      }
      .container .details button:hover{
        opacity:0.7;
      }
      @media (max-width: 1080px) {
          .container {
              height: auto;
              width: auto;
          }
          .container .imgBox {
              padding: 40px;
              width: 100%;
              box-sizing: border-box;
              height: auto;
              text-align: center;
          }
          .container .imgBox img {
              width: 100%;
              height: auto;
              transform: rotate(0deg);
          }

          .container .details {
              width: 100%;
              height: auto;
              padding: 20px;
          }

          .container .details p {
              max-width: 100%;
              margin-left: 0;
          }
      }

      @media (max-width: 768px) {
        .container .imgBox img {
          width: 255px;
          height: 170px;
          transform: rotate(0deg);
      }
      }
      </style>
    `;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}
customElements.define('product-card', productCard);
