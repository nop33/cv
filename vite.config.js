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
    try {
      const fileContent = fs.readFileSync(filepath, 'utf8');
      const value = yaml.load(fileContent);
      content[key] = value;
    } catch (e) {
      console.error(`Error loading ${filepath}:`, e);
    }
  });

  return content;
}

const data = loadContent();

export default {
  base: './',
  plugins: [
    nunjucks({
      variables: { '*': data },
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
