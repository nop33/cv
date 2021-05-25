#!/usr/bin/env node
'use strict'

const fs = require('fs');
const nunjucks = require('nunjucks');
const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');
const yaml = require('js-yaml');

const sassConfig = {
  file: 'src/scss/index.scss',
  outFile: 'dist/styles.css',
  importer: packageImporter()
};

const pagesConfig = [
  {
    input: 'src/index.njk',
    output: 'dist/index.html'
  },
  {
    input: 'src/pages/back.njk',
    output: 'dist/back/index.html'
  }
]

sass.render(sassConfig, (error, result) => {
  if (error) return console.log(error);

  fs.writeFile(sassConfig.outFile, result.css, (error) => {
    if (error) return console.log(error);

    console.log(`✅ CSS file generated at ${sassConfig.outFile}`);
  })
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
