import DebugConfig from './DebugConfig'
export default () => {
  if (DebugConfig.yellowBox) {
    // If ReactNative's yellow box warnings are too much, it is possible to turn
    // it off, but the healthier approach is to fix the warnings.  =)
    console.disableYellowBox = !DebugConfig.yellowBox
  }
}
