class Theme {
  static get defaultOpts () {
    return {
      type: 'light'
    }
  }

  static get light () {
    return {
      background: 'white',
      backgroundEmphasis: 'white'
    }
  }

  static get dark () {
    return {
      background: 'black',
      backgroundEmphasis: '#111'
    }
  }

  get theme () {
    return Object.assign({}, this)
  }

  constructor (props, opts = this.constructor.defaultOpts) {
    if (opts.type == `light`)
      this.assign(this.constructor.light)
    if (opts.type == `dark`)
      this.assign(this.constructor.dark)

    this.assign(props)
  }

  assign (props, keepOld = true) {
    Object.keys(props).forEach(prop => {
      if (keepOld && !this.hasOwnProperty(prop))
        this[prop] = props[prop]
    })
  }
}

export default {
  PRL: new Theme({
    primary: '#0267ea',
    secondary: '#afcbfe',
    textEmphasis: '#0267ea',
    textPrimary: '#EAF0F8',
    textSecondary: 'white',
    background: 'red',
    logo: '/images/logo.svg'
  }).theme,
  SHL: new Theme({
    primary: '#F7B224',
    secondary: '#FFD47B',
    textEmphasis: '#3a3a3a',
    textPrimary: '#FFF4DC',
    textSecondary: '#1B1916',
    backgroundEmphasis: 'white',
    logo: '/images/logo.svg'
  }).theme,
  default: new Theme({
    primary: '#43464C',
    secondary: '#B0B3BA',
    textEmphasis: '#43464C',
    textPrimary: '#DEE2EA',
    textSecondary: 'white',
    backgroundEmphasis: 'white',
    logo: '/images/logo.svg'
  }).theme
}