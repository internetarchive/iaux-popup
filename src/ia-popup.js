import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

export class IAPopup extends LitElement {
  static get properties() {
    return {
      content: { type: String },
      header: { type: String },

      /** private */
      open: { type: Boolean },
      eolFade: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.open = false;
    this.eolFade = true;
    this.content = '';
    this.header = '';

    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  openPopup() {
    this.open = true;
  }

  closePopup() {
    this.open = false;
  }

  togglePopUp() {
    if (this.open) {
      this.closePopup();
      return;
    }
    this.openPopup();
  }

  get headerSection() {
    return html`<div class="header">${this.header}</div>`;
  }

  get contentSection() {
    return html`<div class="content">${this.content}</div>`;
  }

  render() {
    const openClass = this.open ? 'open' : '';
    const ariaExpanded = this.open ? 'true' : 'false';
    return html`
      <div
        class="main ${openClass}"
        aria-expanded="${ariaExpanded}"
        @mouseover=${() => this.openPopup()}
        @mouseout=${() => this.closePopup()}
        @focus=${() => this.openPopup()}
        @blur=${() => this.closePopup()}
        @click=${() => this.togglePopUp()}
        @keyup=${() => this.togglePopUp()}
      >
        ${this.eolFade ? html`<div class="cover-eol-fade"></div>` : nothing}
        <slot name="primary-content"></slot>
        <div class="data ${openClass}" role="tooltip" tabindex="0">
          ${this.header ? this.headerSection : nothing} ${this.contentSection}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        cursor: pointer;
        position: relative;
        display: block;
        width: inherit;
        height: inherit;
      }

      * {
        height: inherit;
        width: inherit;
        display: block;
      }

      .cover-eol-fade {
        position: absolute;
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0) 60%,
          rgba(255, 255, 255, 1) 100%
        );
      }

      .data {
        height: 1px;
        opacity: 0;
        overflow: hidden;
        -webkit-animation: fadeout 200ms linear forwards;
        animation: fadeout 200ms linear forwards;
      }

      .data.open {
        position: fixed;
        margin-top: -20px;
        margin-left: -2px;
        box-shadow: 1px 1px 2px #ccc;
        border: 1px solid #e9e9e9;

        opacity: 1;
        min-height: 30px;
        height: auto;
        padding: 5px 0 5px 5px;
        background-color: white;

        -webkit-animation: fadein 300ms ease-out forwards;
        animation: fadein 300ms ease-out forwards;
      }

      .data .header {
        margin: 0 0 5px;
      }

      @-webkit-keyframes fadein {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fadeout {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `;
  }
}

customElements.define('ia-popup', IAPopup);
