import React from "react";

import { Image, Transformation } from "cloudinary-react";

const PopularDisplay = (props) => {
  const popular = props.posts.slice(0, 3);
  return (
    <div class="flex">
      {popular.map((i) => {
        return (
          <div class="flex justify-center">
            /{i.board}/
            <Image
              cloudName="dyvaitfrl"
              publicId={i.image_link.substring(
                i.image_link.lastIndexOf("/") + 1
              )}
            >
              <Transformation height="200" crop="scale" />
            </Image>
            {i.title}
          </div>
        );
      })}
    </div>
  );
};

export default PopularDisplay;
