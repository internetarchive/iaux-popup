import { html, fixture, expect } from '@open-wc/testing';
import '../src/ia-popup.js';

describe('ia-popup', () => {
  it('is accessible', async () => {
    const el = await fixture(html`
      <ia-popup header="Foo" content="Bar">
        <p slot="primary-content">foo</p>
      </ia-popup>
    `);
    await expect(el).shadowDom.to.be.accessible();
  });

  it('takes properties: `header`, `content`, `clickOnly`', async () => {
    const headerStub = 'Test header';
    const contentStub = 'Content stub';
    const el = await fixture(html`
      <ia-popup header=${headerStub} content=${contentStub}>
        <p slot="primary-content">foo</p>
      </ia-popup>
    `);
    expect(el.header).to.equal(headerStub);
    expect(el.content).to.equal(contentStub);
    expect(el.clickOnly).to.be.true;
  });

  it('inherits parent height', async () => {
    const headerStub = 'Test header';
    const contentStub = 'Content stub';
    const parentNode = document.createElement('div');
    const heightStub = 50;
    const widthStub = 500;
    parentNode.setAttribute(
      'style',
      `height: ${heightStub}px; width: ${widthStub}px;`
    );

    const el = await fixture(
      html`
        <ia-popup .header=${headerStub} .content=${contentStub}>
          <p slot="primary-content">foo</p>
        </ia-popup>
      `,
      { parentNode }
    );

    const mainElement = el.shadowRoot.querySelector('div.main');
    expect(mainElement.offsetHeight).to.equal(heightStub);
    expect(mainElement.offsetWidth).to.equal(widthStub);
  });

  it('defaults to end-of-line fade out display', async () => {
    const headerStub = 'Test header';
    const contentStub = 'Content stub';
    const parentNode = document.createElement('div');
    const heightStub = 50;
    const widthStub = 500;
    parentNode.setAttribute(
      'style',
      `height: ${heightStub}px; width: ${widthStub}px;`
    );

    const el = await fixture(
      html`
        <ia-popup .header=${headerStub} .content=${contentStub}>
          <p slot="primary-content">foo</p>
        </ia-popup>
      `,
      { parentNode }
    );

    const fadeCover = el.shadowRoot.querySelector('.cover-eol-fade');
    expect(fadeCover).to.exist;
    expect(fadeCover.offsetHeight).to.equal(heightStub);
    expect(fadeCover.offsetWidth).to.equal(widthStub);
  });

  it('can open popup', async () => {
    const headerStub = 'Test header';
    const contentStub = 'Content stub';
    const parentNode = document.createElement('div');
    const heightStub = 50;
    const widthStub = 500;
    parentNode.setAttribute(
      'style',
      `height: ${heightStub}px; width: ${widthStub}px;`
    );

    const el = await fixture(
      html`
        <ia-popup .header=${headerStub} .content=${contentStub}>
          <p slot="primary-content">foo</p>
        </ia-popup>
      `,
      { parentNode }
    );

    await el.openPopup();

    const mainElement = el.shadowRoot.querySelector('div.main');
    expect(mainElement.classList.contains('open')).to.be.true;
    const tooltipPopup = el.shadowRoot.querySelector('.popup');
    expect(tooltipPopup.classList.contains('open')).to.be.true;
  });
});
