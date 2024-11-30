const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = { // подключите плагины к PostCSS
  plugins: [
    autoprefixer, // подключите autoprefixer
    cssnano({ preset: 'default' }) // cssnano при подключении нужно передать объект опций
  ]
};
