import React from "react";
import { Link } from "react-router-dom";

import Moment from "moment";
import { Image, Transformation } from "cloudinary-react";

const PopularDisplay = (props) => {
  Moment.locale("en");

  const nPopular = 4;
  var popular = props.posts;
  popular = popular.sort(
    (a, b) =>
      b.replies_count / (Moment().diff(b.last_bump, "seconds") / 86400) -
      a.replies_count / (Moment().diff(a.last_bump, "seconds") / 86400)
  );
  popular = popular.slice(0, nPopular);

  return (
    <div class="flex space-x-10 justify-center">
      {popular.map((i) => {
        // console.log(
        //   i.title +
        //     " " +
        //     i.replies_count +
        //     " " +
        //     Moment().diff(i.last_bump, "seconds") / 86400 +
        //     " " +
        //     i.replies_count /
        //       (1 / (Moment().diff(i.last_bump, "seconds") / 86400))
        // );
        return (
          <div key={i.id}>
            <p class="text-center">/{i.board}/</p>
            <div class="flex justify-center">
              <Link to={"/" + i.board + "/" + i.id}>
                <Image
                  cloudName="dyvaitfrl"
                  publicId={i.image_link.substring(
                    i.image_link.lastIndexOf("/") + 1
                  )}
                >
                  <Transformation width="200" crop="scale" />
                </Image>
              </Link>
            </div>
            <p class="text-center">{i.title.substring(0, 30)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PopularDisplay;
