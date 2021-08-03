import { Typography } from "@material-ui/core";
import useStyles from "./Footer.styles";

type Props = {
  year: number;
};

export const Footer: React.FC<Props> = (props) => {
  const { year } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Copyright (C) CDM Ukraine. {year}</Typography>
    </div>
  );
};
