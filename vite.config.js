import nunjucks from 'vite-plugin-nunjucks';
import fs from 'fs';
import yaml from 'js-yaml';
import { globSync } from 'glob';
import path from 'path';

const data = {};

function loadContent() {
  const sectionFiles = globSync('src/sections/**/*.yml');

  // Clear existing data
  for (const key in data) {
    delete data[key];
  }

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
      data[key] = value;
    } catch (e) {
      console.error(`Error loading ${filepath}:`, e);
    }
  });
}

// Initial load
loadContent();

const watchContent = () => ({
  name: 'watch-content',
  handleHotUpdate({ file, server }) {
    if (path.extname(file) === '.yml') {
      loadContent();
      server.ws.send({ type: 'full-reload' });
      return [];
    }
    if (path.extname(file) === '.njk') {
      server.ws.send({ type: 'full-reload' });
      return [];
    }
  },
});

export default {
  base: './',
  plugins: [
    watchContent(),
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
