# Descripción
 Visor de tenis nike uso de webGL para visualizar modelo 3D en el navegador.
![](./_img_readme/snapshot.png)
## Web Components

- Los web components están hechos para ser reutilizables, encapzulan ciertos fragmentos de codigo que pueden ser reutilizables en diferentes partes del proyecto.

- Los web components son primitivos de bajo nivel que te permiten definir tus propios elementos HTML

- Una vez tienes un componente listo es como si tuvieras una etiqueta de html ya lista para ser usada

- Los web components están construidos con web apis

* **HTML Templates** : etiquetas
* **Custom Elements**: algo que nos ayuda a definir una etiqueta que se convierte en una etiqueta estándar después
* **Shadow DOM**: es lo que nos ayuda a encapsular
* **ES Modules**: Los módulos que nos ayudan a importar cierto código de js a otro código de js y reutilizar ciertas cosas

###### Beneficios de web components son similares a los de cualquier framework o librería (exceptuando la interoperabilidad 👀)

Reutilización
Legibilidad
Mantenibilidad
Interoperabilidad
Consistencia

## Ciclo de Vida

- **constructor**: Directamente desde el JavaScript Engine, el constructor nos servirá para definir y cargar todas las variables en memoria que necesitemos, es mala práctica pintar el componente aquí
- **connectedCallback**: Cuando el componente ya está pintado dentro del DOM ypodemos hacer uso de él.
- **attributeChangedCallback**: Cuando un atributo de nuestro componente cambia
- **disconnectedCallback**: Cuando el componente se “destruye” o se quita del DOM
- **adoptedCallback**: Cuando el componente es movido a un nuevo DOM, básicamente cuando es pintado desde un iframe por ejemplo 😄

## Content Slot y multi slot

El content slot nos permite darle interactividad a nuestros componentes, pudiendo dejar información de manera dinámica.

Si se requiere pasar solo un fragmento de contenido a nuestro componente se puede usar <slot>Dentro de nuestro componente</slot>. Pero si requerimos hacer multi slot agregando un atributo name

```html
<my-element>
  <span slot="title">Soy el titulo</span>
  <span slot="parrafo">Soy el texto del parrafo</span>
</my-element>
```

```
  class myElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
        <section>
          <h2>
            <slot name="title"></slot>
          </h2>
          <div>
           <p>
            <slot name="parrafo"></slot>
           </p>
          </div>
        </section>
        ${this.getStyles()}
      `;
    return template;
  }
  getStyles() {
    return `
        <style>
          h2 {
            color: red;
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
customElements.define('my-element', myElement);

```

## :HOST

- Pseudoclase que utilizaremos para darle estilos a nuestro componente web (no se trata necesariamente de los estilos visuales)
- Se trata de los estilos que vienen definidos por default con una etiqueta, como pueden ser display, padding y margin.

* :host da estilos al componente

- La pseudoclase :host se utiliza dentro del método donde escribíamos nuestro css del componente getStyles(){}

* :host \*\*{estilos para el componente}

- Teniendo varias instancias de un componente, si a una le agregamos una clase por ejemplo ‘blue’
  :host(.blue) {estilos para el componente con la clase blue}
- Va a buscar el elemento que tenga de atributo una clase con el valor blue y le va a agregar los estilos que definimos.

- También podemos darle estilos por atributo. Por ejemplo si a una instancia le agregamos el atributo ‘yellow’
  :host([yellow]) {estilos para el elemento que tenga el atributo yellow}

- También podemos agregar cierto contexto.
  Por ejemplo, si tenemos una instancia del componente dentro de un article con una clase ‘card’
  :host-context(article.card) {estilos}

- Hacer cambios al contenido del componente
  :host([yellow]) h1 {estilos}

## ::slotted

- Pseudoelemento que sirve para poder agregar estilos específicos a todo el contenido dinámico que venga desde fuera del componente y se vaya a colocar en las etiquetas slot.

- ::slotted(que tipo de etiqueta viene por fuera) {estilos}
  Ejemplo ::slotted(span) {}

- Si queremos ser más específicos, podemos usar clases:
  ::slotted(.texto) {}

* Beneficio

- Que los devs que usen el componente puedan modificar las cosas desde fuera sin tener que entrar al componente para cambiar los estilos.

- Este pseudoelemento solo va a funcionar cuando tengamos un shadow DOM

|Author   |  Mail |
| ------------ | ------------ |
|  Omar Rivas |  orivasm44@gmail.com |
|  Cenit Studio |  hello@cenit.studio |

## Referencias

[Mozilla](https://developer.mozilla.org/es/docs/Web/Web_Components#conceptos_y_uso)
[Ciclo de vida](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_custom_elements#usando_callbacks_de_ciclo_de_vida)
[WebComponents](https://www.webcomponents.org/)
[Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
