import { html, css, LitElement } from 'lit';
import { nothing } from 'lit/html.js';

const modeTypes = {
  clickOnly: 'clickOnly',
  clickOrHover: 'clickOrHover',
};
export class IAPopup extends LitElement {
  static get properties() {
    return {
      popupMode: { type: String },
      content: { type: String },
      header: { type: String },

      /** private */
      open: { type: Boolean },
      eolFade: { type: Boolean },
    };
  }

  constructor() {
    super();
    /**
     * @typedef {modeTypes.clickOnly | modeTypes.clickOrHover} this.popupMode
     */
    this.popupMode = modeTypes.clickOnly;
    this.open = false;
    this.eolFade = true;
    this.content = '';
    this.header = '';
  }

  updated() {
    const mouseoutEventHandler = () => this.closePopup();
    if (this.open) {
      this.addEventListener('mouseout', mouseoutEventHandler);
    }
    if (!this.open) {
      this.removeEventListener('mouseout', mouseoutEventHandler);
    }
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

  get openClass() {
    return this.open ? 'open' : '';
  }

  get tooltipBodyNoTitle() {
    return html` <div class="popup ${this.openClass}" tabindex="0">
      ${this.header ? this.headerSection : nothing} ${this.contentSection}
    </div>`;
  }

  get tooltipBody() {
    return html` <div
      class="popup ${this.openClass}"
      title=${this.toolTipTitle}
      tabindex="0"
    >
      ${this.header ? this.headerSection : nothing} ${this.contentSection}
    </div>`;
  }

  render() {
    const hasMouseEvents = this.popupMode !== modeTypes.clickOnly;
    return html`
      <div
        class="main ${this.openClass}"
        @mouseover=${() => {
          if (!hasMouseEvents) {
            return;
          }
          this.openPopup();
        }}
        @focus=${() => {
          if (!hasMouseEvents) {
            return;
          }
          this.openPopup();
        }}
        @keyup=${() => {
          if (!hasMouseEvents) {
            return;
          }
          this.togglePopUp();
        }}
        @blur=${this.closePopup}
        @click=${this.togglePopUp}
      >
        ${this.eolFade ? html`<div class="cover-eol-fade"></div>` : nothing}
        ${hasMouseEvents ? this.tooltipBodyNoTitle : this.tooltipBody}
        <slot></slot>
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

      .main {
        position: relative;
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

      .popup {
        height: inherit;
        display: unset;
        position: absolute;
        opacity: 0;
        overflow: hidden;
        -webkit-animation: fadeout 200ms linear forwards;
        animation: fadeout 200ms linear forwards;
      }

      .popup.open {
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
