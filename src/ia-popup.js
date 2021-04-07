import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

export class IAPopup extends LitElement {
  static get properties() {
    return {
      content: { type: String },
      header: { type: String },
      clickOnly: {
        type: Boolean,
        converter: value => {
          if (value === 'false') {
            return false;
          }
          return true;
        },
      },

      /** private */
      open: { type: Boolean },
      eolFade: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.clickOnly = true;
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

  get toolTipTitle() {
    return `${this.header} ${this.content}`;
  }

  tooltipBodyNoTitle(openClass = '') {
    return html` <div class="data ${openClass}" tabindex="0">
      ${this.header ? this.headerSection : nothing} ${this.contentSection}
    </div>`;
  }

  tooltipBody(openClass = '') {
    return html` <div
      class="data ${openClass}"
      title=${this.toolTipTitle}
      tabindex="0"
    >
      ${this.header ? this.headerSection : nothing} ${this.contentSection}
    </div>`;
  }

  render() {
    const openClass = this.open ? 'open' : '';
    const ariaExpanded = this.open ? 'true' : 'false';
    const hasMouseEvents = this.clickOnly === false;
    return html`
      <div
        class="main ${openClass}"
        aria-expanded="${ariaExpanded}"
        @mouseover=${() => {
          if (hasMouseEvents) {
            this.openPopup();
          }
        }}
        @focus=${() => {
          if (hasMouseEvents) {
            this.openPopup();
          }
        }}
        @keyup=${() => {
          if (hasMouseEvents) {
            this.togglePopUp();
          }
        }}
        @mouseout=${() => this.closePopup()}
        @blur=${() => this.closePopup()}
        @click=${() => this.togglePopUp()}
      >
        ${this.eolFade ? html`<div class="cover-eol-fade"></div>` : nothing}
        <slot name="primary-content"></slot>
        ${hasMouseEvents
          ? this.tooltipBodyNoTitle(openClass)
          : this.tooltipBody(openClass)}
      </div>
    `;
  }

  static get styles() {
    const textColor = css`var(--secondaryTextColor, #767676)`;
    const bgColor = css`var(--bcColor, white)`;
    const borderColor = css`var(--popupBorderColor, #e9e9e9)`;
    const boxShadowColor = css`var(--boxshadowColor, #ccc)`;
    const popupMarginTop = css`var(--popupMarginTop, -20px)`;
    const popupMarginLeft = css`var(--popupMarginLeft, -3px)`;
    const popupAnimationTime = css`var(--popupAnimationTime, 100ms)`;
    return css`
      :host {
        cursor: pointer;
        position: relative;
        display: block;
        width: inherit;
        height: inherit;
        font-color: ${textColor};
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
        width: 100%;
        height: 100%;
      }

      .data {
        height: 1px;
        opacity: 0;
        overflow: hidden;
        -webkit-animation: fadeout 200ms linear forwards;
        animation: fadeout 200ms linear forwards;
      }

      .data.open {
        margin-top: ${popupMarginTop};
        margin-left: ${popupMarginLeft};
        box-shadow: 1px 1px 2px ${boxShadowColor};
        border: 1px solid ${borderColor};
        word-wrap: break-word;

        opacity: 1;
        min-height: 30px;
        height: auto;
        padding: 5px 0 5px 5px;
        background-color: ${bgColor};

        -webkit-animation: fadein ${popupAnimationTime} ease-out forwards;
        animation: fadein ${popupAnimationTime} ease-out forwards;
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

      style {
        display: none;
      }
    `;
  }
}

window.customElements.define('ia-popup', IAPopup);
