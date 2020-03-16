import camelCase from "lodash.camelcase"

import { createMuiTheme } from "@material-ui/core/styles"

import red from "@material-ui/core/colors/red"
import pink from "@material-ui/core/colors/pink"
import purple from "@material-ui/core/colors/purple"
import deepPurple from "@material-ui/core/colors/deepPurple"
import indigo from "@material-ui/core/colors/indigo"
import blue from "@material-ui/core/colors/blue"
import lightBlue from "@material-ui/core/colors/lightBlue"
import cyan from "@material-ui/core/colors/cyan"
import teal from "@material-ui/core/colors/teal"
import green from "@material-ui/core/colors/green"
import lightGreen from "@material-ui/core/colors/lightGreen"
import lime from "@material-ui/core/colors/lime"
import yellow from "@material-ui/core/colors/yellow"
import amber from "@material-ui/core/colors/amber"
import orange from "@material-ui/core/colors/orange"
import deepOrange from "@material-ui/core/colors/deepOrange"
import brown from "@material-ui/core/colors/brown"
import gray from "@material-ui/core/colors/grey"
import blueGray from "@material-ui/core/colors/blueGrey"

const colors = {
  red: {
    id: "red",
    name: "Red",
    import: red,
  },

  pink: {
    id: "pink",
    name: "Pink",
    import: pink,
  },

  purple: {
    id: "purple",
    name: "Purple",
    import: purple,
  },

  deepPurple: {
    id: "deep-purple",
    name: "Deep Purple",
    import: deepPurple,
  },

  indigo: {
    id: "indigo",
    name: "Indigo",
    import: indigo,
  },

  blue: {
    id: "blue",
    name: "Blue",
    import: blue,
  },

  lightBlue: {
    id: "light-blue",
    name: "Light Blue",
    import: lightBlue,
  },

  cyan: {
    id: "cyan",
    name: "Cyan",
    import: cyan,
  },

  teal: {
    id: "teal",
    name: "Teal",
    import: teal,
  },

  green: {
    id: "green",
    name: "Green",
    import: green,
  },

  lightGreen: {
    id: "light-green",
    name: "Light Green",
    import: lightGreen,
  },

  lime: {
    id: "lime",
    name: "Lime",
    import: lime,
  },

  yellow: {
    id: "yellow",
    name: "Yellow",
    import: yellow,
  },

  amber: {
    id: "amber",
    name: "Amber",
    import: amber,
  },

  orange: {
    id: "orange",
    name: "Orange",
    import: orange,
  },

  deepOrange: {
    id: "deep-orange",
    name: "Deep Orange",
    import: deepOrange,
  },

  brown: {
    id: "brown",
    name: "Brown",
    import: brown,
  },

  gray: {
    id: "gray",
    name: "Gray",
    import: gray,
  },

  blueGray: {
    id: "blue-gray",
    name: "Blue Gray",
    import: blueGray,
  },
}

const getColor = colorId => {
  if (!colorId) {
    return null
  }

  colorId = camelCase(colorId)

  return colors[colorId]
}

const defaultPrimaryColor = getColor("blue")
const defaultSecondaryColor = getColor("red")
const defaultDark = process.env.REACT_APP_THEME_DARK === "true"

const defaultTheme = createMuiTheme({
  // palette: {
  //   primary: defaultPrimaryColor.import,
  //   secondary: defaultSecondaryColor.import,
  //   type: defaultDark ? "dark" : "light",
  // },

  // palette: {

  // }

  palette: {
    primary: {
      light: "#63ccff",
      main: "#006db3",
      dark: "#006db3",
    },
  },

  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  // mixins: {
  //   toolbar: {
  //     minHeight: 48,
  //   },
  // },

  zIndex: {
    drawer: 10,
  },

  primaryColor: defaultPrimaryColor,
  secondaryColor: defaultSecondaryColor,
  dark: defaultDark,
})

const theme = {
  ...defaultTheme,
  overrides: {
    // MuiDrawer: {
    //   paper: {
    //     backgroundColor: "#18202c",
    //   },
    // },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
    // MuiTabs: {
    //   root: {
    //     marginLeft: defaultTheme.spacing(1),
    //   },
    //   indicator: {
    //     height: 3,
    //     borderTopLeftRadius: 3,
    //     borderTopRightRadius: 3,
    //     backgroundColor: defaultTheme.palette.common.white,
    //   },
    // },
    // MuiTab: {
    //   root: {
    //     textTransform: "none",
    //     margin: "0 16px",
    //     minWidth: 0,
    //     padding: 0,
    //     [defaultTheme.breakpoints.up("md")]: {
    //       padding: 0,
    //       minWidth: 0,
    //     },
    //   },
    // },
    MuiIconButton: {
      root: {
        padding: defaultTheme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854",
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: defaultTheme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
}

export default theme
