import tinycolor from 'tinycolor'

export default {
  alpha: (context, content, selectors, parent, line, column, length) => {
    switch (context) {
      case 1: return content.replace(/\balpha\((#[a-f\d]{1,6}|(?:hs[lv]|rgb)a?\(\d+[, ]+\d+[, ]+\d+(?:[, ]+[\d.]+)?\))(?:[, ]+([\d.]+))?\)/gi, (...args) =>
        args[2] ? tinycolor(args[1]).setAlpha(Number(args[2])).toRgbString() : tinycolor(args[1]).getAlpha()
      )
    }
  }
}