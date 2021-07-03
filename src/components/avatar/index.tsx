import React from "react";
import { cloudinaryPrefix } from "../../config";
import avatar from "../../assets/user.svg";

interface AvatarProps {
  src?: string;
  style?: React.CSSProperties;
  className?: string;
  icon?: string;
  notCloudinaryImg?: boolean;
}

const Avatar = ({
  src,
  style,
  className,
  icon,
  notCloudinaryImg,
}: AvatarProps) => {
  const prefix =
    src?.includes(cloudinaryPrefix) || notCloudinaryImg ? "" : cloudinaryPrefix;
  const styling = {
    width: "2.5em",
    height: "2.5em",
    borderRadius: "50%",
    objectFit: "cover",
    ...style,
  };

  return (
    <img
      style={styling as any}
      alt="Avatar"
      src={src ? prefix + src : avatar}
    />
  );
};

export default Avatar;
