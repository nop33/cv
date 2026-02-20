import nunjucks from 'vite-plugin-nunjucks';
import fs from 'fs';
import yaml from 'js-yaml';
import { globSync } from 'glob';
import path from 'path';

function loadContent() {
  const content = {};
  const components = globSync('src/components/*/content.yml');

  components.forEach(filepath => {
    const componentName = path.basename(path.dirname(filepath));
    const key = `${componentName}_component_content`;
    const value = yaml.load(fs.readFileSync(filepath, 'utf8'));
    content[key] = value;
  });

  return content;
}

export default {
  base: './',
  plugins: [
    nunjucks({
      variables: loadContent(),
      nunjucksEnvironment: {
        autoescape: true,
      }
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
}
