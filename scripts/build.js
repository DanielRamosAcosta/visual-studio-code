'use strict';

const fsp = require('./fsp');
const path = require('path');
const loadThemes = require('./loadThemes');

const THEME_DIR = path.join(__dirname, '..', 'theme');
const THEME_YAML_FILE = path.join(__dirname, '..', 'src', 'dracula.yml');

function toJSON(theme) {
    return JSON.stringify(theme, null, 4);
}

(async () => {
    if (!(await fsp.exists(THEME_DIR))) {
        await fsp.mkdir(THEME_DIR);
    }

    const { standardTheme, sotfTheme } = await loadThemes(THEME_YAML_FILE);
    const standardThemePath = path.join(THEME_DIR, 'dracula.json');
    const softThemePath = path.join(THEME_DIR, 'dracula-soft.json');

    await Promise.all([
        fsp.writeFile(standardThemePath, toJSON(standardTheme)),
        fsp.writeFile(softThemePath, toJSON(sotfTheme)),
    ]);
})().catch(err => console.error(err))
