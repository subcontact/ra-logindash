import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  row: {
    display: "flex",
    //justifyContent: "left",
    marginLeft: "2%"
  },
  avatar: {
    margin: 30
  },
  bigAvatar: {
    width: 200,
    height: 200
  }
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Adelle Charles"
        src="https://uploads.codesandbox.io/uploads/user/f1644fc7-5e84-45c1-bbd1-33ea2af2d350/7Uvn-Nancy%20Mayers.png"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageAvatars);
