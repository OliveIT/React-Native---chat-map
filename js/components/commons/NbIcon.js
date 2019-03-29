import React, { Component } from 'react'
import { StyleProvider, getTheme, Icon } from 'native-base'

type Props = {
  family?: string,
  name: string,
  style?: any
}

export default class NbIcon extends Component<Props> {
  render () {
    const { family, name, style } = this.props
    const icon = <Icon name={name} style={style} />
    if (family) {
      const customTheme = getTheme({iconFamily: family})
      return <StyleProvider style={customTheme}>{icon}</StyleProvider>
    } else {
      return icon
    }
  }
}
