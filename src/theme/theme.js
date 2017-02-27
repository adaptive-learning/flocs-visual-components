import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  grey400, grey600, grey700,
  amber500, amber700, amber100,
  cyan500, cyan700, cyan100,
  fullWhite,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';


const theme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: cyan500,
    primary2Color: cyan700,
    primary3Color: cyan100,
    accent1Color: amber500,
    accent2Color: amber700,
    accent3Color: amber100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  raisedButton: {
    color: grey700,
  },
  toggle: {
    thumbOffColor: grey400,
    trackOffColor: grey600,
  },
});


export default theme;
