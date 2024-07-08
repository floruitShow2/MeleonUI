declare namespace Meleon {
  type MlStyle = {
    [key in keyof CSSStyleDeclaration]?: any
  }

  type MlSize = 'mini' | 'small' | 'medium' | 'large'

  type MlStatus = 'primary' | 'success' | 'warning' | 'info' | 'danger'
}
