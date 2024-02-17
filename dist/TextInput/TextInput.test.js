"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _TextInput = _interopRequireDefault(require("./TextInput"));
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
describe("TextInput", () => {
  it("renders properly", () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_TextInput.default, {
      label: "Email",
      placeholder: "name@example.com"
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
});