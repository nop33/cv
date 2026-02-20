import nunjucks from 'vite-plugin-nunjucks';
import fs from 'fs';
import yaml from 'js-yaml';
import { globSync } from 'glob';
import path from 'path';

function loadContent() {
  const content = {};
  const sectionFiles = globSync('src/sections/**/*.yml');

  sectionFiles.forEach((filepath) => {
    let key;
    // If filename is content.yml, use parent directory name (e.g. src/sections/footer/content.yml -> footer)
    if (path.basename(filepath) === 'content.yml') {
      key = path.basename(path.dirname(filepath));
    } else {
      // Otherwise use filename without extension (e.g. src/sections/activities.yml -> activities)
      key = path.basename(filepath, '.yml');
    }

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
      },
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
};
