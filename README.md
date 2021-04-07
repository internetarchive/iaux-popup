[TODO: add GHA + badges]
# Internet Archive Popup

This is a UI component that displays extra details when hovered or clicked on.

[gif]

## Usage

`npm/yarn install @internetarchive/ia-popup`
`import '@internetarchive/ia-popup`

[css info]
```
<style>
  .component-wrapper {
    /* Set Height, Width */
    /* Component will inherit height and width */
    height: 20px;
    width: 200px;
  }
  .primary-content.end-of-line-peekaboo {
    /* --- STYLE SLOT IF you want EOL fade out to work with these attrs */
    white-space: nowrap;
    overflow: hidden;
  }
</style>
<script>
  import '@internetarchive/ia-popup'
</script>

<div class='component-wrapper end-of-line-peekaboo'>
  <ia-popup
    header="Popup Header"
    content="Hello world this is our popup content"
  >
    <div slot="primary-content end-of-line-peekaboo">
      Must add main content into this slot as ia-popup will wrap itself around the content to set hover/click events.
    </div>
  </ia-popup>
</div>
```
+ CSS Vars to customize:

```
var(--secondaryTextColor, #767676);
var(--bcColor, white);
var(--popupBorderColor, #e9e9e9);
var(--boxshadowColor, #ccc);
var(--popupMarginTop, -20px);
var(--popupMarginLeft, -3px);
var(--popupAnimationTiming, 100ms);
```

See demo for more information/details.

## Local Demo with `web-dev-server`
```bash
yarn start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
yarn run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
yarn run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn run lint
```

You can lint with ESLint and Prettier individually as well
```bash
yarn run lint:eslint
```
```bash
yarn run lint:prettier
```

To automatically fix many linting errors, run
```bash
yarn run format
```

You can format using ESLint and Prettier individually as well
```bash
yarn run format:eslint
```
```bash
yarn run format:prettier
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
