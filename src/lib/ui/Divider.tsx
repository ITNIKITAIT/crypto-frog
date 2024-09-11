import classNames from "classnames";
import style from "./__style.module.scss";

type DividerPadding = "small" | "medium" | "large";

const Divider = ({
  paddingTop,
  paddingBottom,
}: {
  paddingTop?: DividerPadding;
  paddingBottom?: DividerPadding;
}): JSX.Element => (
  <hr
    className={classNames(
      style.divider,
      paddingTop && style[`divider--padding-top_${paddingTop}`],
      paddingBottom && style[`divider--padding-bottom_${paddingBottom}`],
    )}
  />
);

Divider.displayName = "Divider";

export default Divider;
