#!/usr/bin/env node
'use strict'

const fs = require('fs');
const nunjucks = require('nunjucks');
const { exec } = require('child_process');
const yaml = require('js-yaml');

const pagesConfig = [
  {
    input: 'src/index.njk',
    output: 'dist/index.html'
  }
]

exec('npx tailwindcss -i src/css/styles.css -o dist/styles.css', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    console.error(stderr);
    return;
  }
  console.log(`✅ CSS file generated at dist/styles.css`);
});

buildContent().then(content => {
  render(content);
});

function buildContent() {
  return new Promise((resolve, reject) => {
    let content = {};

    fs.readdir('src/components/', (error, components) => {
      if (error) return console.log(error);

      components.forEach(component => {
        let contentFilePath = `src/components/${component}/content.yml`;

        if (fs.existsSync(contentFilePath)) {
          let key = `${component}_component_content`;
          let value = yaml.load(fs.readFileSync(contentFilePath, 'utf8'));

          content[key] = value;
        }
      });

      console.log('✅ Content was compiled');
      resolve(content);
    });
  });
}

function render(content) {
  pagesConfig.forEach(page => {
    nunjucks.render(
      page.input,
      content,
      (error, result) => {
        if (error) return console.log(error);

        fs.writeFileSync(page.output, result);

        console.log(`✅ HTML generated at ${page.output}`);
      }
    );
  });
}
