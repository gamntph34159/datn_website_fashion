"use client";
import {
  DialogContext_default
} from "./chunk-NVFFFDJ2.js";
import {
  dialogTitleClasses_default,
  getDialogTitleUtilityClass
} from "./chunk-RZKLVJ4V.js";
import {
  Typography_default
} from "./chunk-EPCP25WK.js";
import "./chunk-H4YEOD6U.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  composeClasses,
  init_extends,
  require_prop_types,
  styled_default,
  useThemeProps2 as useThemeProps
} from "./chunk-EKRZK5VT.js";
import {
  require_jsx_runtime
} from "./chunk-4NZ4UUYJ.js";
import {
  clsx_default
} from "./chunk-TMXZRJBF.js";
import {
  require_react
} from "./chunk-5TQB74YF.js";
import {
  __toESM
} from "./chunk-TIUEEL27.js";

// node_modules/@mui/material/DialogTitle/DialogTitle.js
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["className", "id"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};
var DialogTitleRoot = styled_default(Typography_default, {
  name: "MuiDialogTitle",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  padding: "16px 24px",
  flex: "0 0 auto"
});
var DialogTitle = React.forwardRef(function DialogTitle2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDialogTitle"
  });
  const {
    className,
    id: idProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const {
    titleId = idProp
  } = React.useContext(DialogContext_default);
  return (0, import_jsx_runtime.jsx)(DialogTitleRoot, _extends({
    component: "h2",
    className: clsx_default(classes.root, className),
    ownerState,
    ref,
    variant: "h6",
    id: idProp != null ? idProp : titleId
  }, other));
});
true ? DialogTitle.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * @ignore
   */
  id: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var DialogTitle_default = DialogTitle;
export {
  DialogTitle_default as default,
  dialogTitleClasses_default as dialogTitleClasses,
  getDialogTitleUtilityClass
};
//# sourceMappingURL=@mui_material_DialogTitle.js.map
