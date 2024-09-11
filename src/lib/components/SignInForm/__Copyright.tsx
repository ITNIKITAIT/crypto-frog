import Typography from "lib/ui/Typography";

import style from "./__style.module.scss";

const Copyright = () => (
  <Typography
    variant="body2"
    className={style.copyright}
  >
    {"Copyright © "}
    {new Date().getFullYear()}.
  </Typography>
);

Copyright.displayName = "Copyright";
export default Copyright;
