var Storage = require('remix-lib').Storage
var EventEmitter = require('events')

// Boostrap themes
// TODO : Put it somewhere else
const themes = {
  dark: 'https://bootstrap.themes.guide/darkster/theme.min.css',
  light: 'https://bootstrap.themes.guide/herbie/theme.min.css',
  clean: 'https://bootstrap.themes.guide/fresca/theme.min.css'
}
// Used for the scroll color
const themeVariable = {
  dark: 'dark',
  light: 'light',
  clean: 'light'
}
module.exports = {
  event: new EventEmitter(),
  chooser: function () {
    const themeStorage = new Storage('style:')
    if (themeStorage.exists('theme')) {
      if (themeStorage.get('theme') === 'dark') {
        document.getElementById('theme-link').setAttribute('href', themes['dark'])
        document.documentElement.style.setProperty('--theme', 'dark')
      } else if (themeStorage.get('theme') === 'clean') {
        document.getElementById('theme-link').setAttribute('href', themes['clean'])
        document.documentElement.style.setProperty('--theme', 'light')
      } else {
        document.getElementById('theme-link').setAttribute('href', themes['light'])
        document.documentElement.style.setProperty('--theme', 'light')
      }
    } else {
      document.getElementById('theme-link').setAttribute('href', themes['light'])
      document.documentElement.style.setProperty('--theme', 'light')
    }
  },

  switchTheme: function (theme) {
    var themeStorage = new Storage('style:')
    if (theme) themeStorage.set('theme', theme)
    else {
      theme = themeStorage.get('theme')
    }
    if (!theme) theme = 'light'
    if (themes[theme]) {
      document.getElementById('theme-link').setAttribute('href', themes[theme])
      document.documentElement.style.setProperty('--theme', themeVariable[theme])
      this.event.emit('switchTheme', themeVariable[theme])
    }
  }
}
