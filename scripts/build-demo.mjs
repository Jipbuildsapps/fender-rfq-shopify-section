import { readFile, writeFile } from 'node:fs/promises';

const sourcePath = new URL('../sections/fender-tekening-maker.liquid', import.meta.url);
const outputPath = new URL('../index.html', import.meta.url);
const uid = 'fender-rfq-demo';
const variants = [
  { id: 1001, title: 'DS Fender 100 x 100 mm solid', sku: 'DS-100-100' },
  { id: 1002, title: 'DD Fender 100 x 95 mm - D-bore 60 x 48 mm', sku: 'DD-100-095' },
  { id: 1003, title: 'DC Fender 100 x 100 mm - O-bore Ø 50 mm', sku: 'DC-100-100' }
];

let section = await readFile(sourcePath, 'utf8');
section = section.slice(section.indexOf('<div id='), section.indexOf('{% schema %}'));
section = section
  .replaceAll('{{ uid | json }}', JSON.stringify(uid))
  .replaceAll('{{ uid }}', uid)
  .replaceAll('{{ default_lang }}', 'nl')
  .replaceAll('{{ product.url | json }}', JSON.stringify('/products/fender-demo'))
  .replaceAll('{{ product.title | json }}', JSON.stringify('Fenderblok demo'))
  .replaceAll('{{ product.title | escape }}', 'Fenderblok demo')
  .replaceAll('{{ shop.url }}{{ product.url }}', 'https://example.com/products/fender-demo')
  .replaceAll('{{ product.url }}', '/products/fender-demo')
  .replaceAll('{{ v.title | escape }}', variants[0].title)
  .replaceAll('{{ v.sku | escape }}', variants[0].sku)
  .replace(
    /(<script type="application\/json" id="fender-rfq-demo-variant-data">)[\s\S]*?(<\/script>)/,
    `$1\n${JSON.stringify(variants, null, 2)}\n      $2`
  )
  .replace(
    /(<select class="frq__input" id="fender-rfq-demo-variant-select" required>)[\s\S]*?(<option value="custom")/,
    `$1\n${variants.map((variant, index) => `            <option value="${index}"${index === 0 ? ' selected' : ''}>${variant.title} - ${variant.sku}</option>`).join('\n')}\n            $2`
  )
  .replaceAll('action="/contact"', 'action="#" data-demo-form')
  .replace('id="fender-rfq-demo-L" name=', 'id="fender-rfq-demo-L" value="1000" name=')
  .replace('id="fender-rfq-demo-G" name=', 'id="fender-rfq-demo-G" value="120" name=')
  .replace('id="fender-rfq-demo-HH" name=', 'id="fender-rfq-demo-HH" value="250" name=')
  .replace('<option value="M20" data-dia="22">', '<option value="M20" data-dia="22" selected>')
  .replace('id="fender-rfq-demo-DIA" name=', 'id="fender-rfq-demo-DIA" value="22" name=')
  .replace('id="fender-rfq-demo-N" name=', 'id="fender-rfq-demo-N" value="4" name=')
  .replace('id="fender-rfq-demo-HC" name=', 'id="fender-rfq-demo-HC" value="50" name=')
  .replace('id="fender-rfq-demo-qty" name=', 'id="fender-rfq-demo-qty" value="10" name=');

const page = `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Interactieve preview van de Fender RFQ Shopify-section.">
  <title>Fender RFQ - live demo</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #f4f5f7; color: #111827; }
    .demo-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px max(3vw, 18px); border-bottom: 1px solid rgba(15, 23, 42, .1); background: #fff; }
    .demo-bar strong { font-size: 14px; }
    .demo-bar a { color: #bf1e2d; font-size: 13px; font-weight: 700; }
    .demo-note { margin: 18px auto; width: 85%; padding: 10px 12px; border-left: 3px solid #bf1e2d; background: #fff; color: #4b5563; font-size: 13px; box-sizing: border-box; }
    .demo-main { padding: 0 0 48px; }
    @media (max-width: 760px) { .demo-note { width: 94%; } .demo-bar { align-items: flex-start; flex-direction: column; } }
  </style>
</head>
<body>
  <header class="demo-bar">
    <strong>Fender RFQ live preview</strong>
    <a href="https://github.com/Jipbuildsapps/fender-rfq-shopify-section">Bekijk broncode op GitHub</a>
  </header>
  <div class="demo-note">Dit is de browserpreview. De configurator, technische tekening en downloads werken; het formulier verstuurt in deze demo geen echte offerte.</div>
  <main class="demo-main">
${section}
  </main>
  <script>
    (function () {
      var form = document.querySelector('[data-demo-form]');
      if (!form) return;
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var root = document.getElementById('${uid}');
        var success = root && root.querySelector('[data-success]');
        var language = document.getElementById('${uid}-language');
        if (success) {
          success.hidden = false;
          success.textContent = language && language.value === 'en'
            ? 'Demo complete: the configuration is ready. No real request was sent.'
            : 'Demo voltooid: de configuratie staat klaar. Er is geen echte aanvraag verstuurd.';
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    })();
  </script>
</body>
</html>
`;

await writeFile(outputPath, page);
console.log(`Built ${outputPath.pathname}`);
