import { FC } from "react";
import { HomeDesc as HomeDescType } from "../../types/homeResTypes";

import "./HomeDesc.css";

interface IHomeDesc {
  homeDescs: HomeDescType[];
}

const HomeDesc: FC<IHomeDesc> = ({ homeDescs }) => {
  return (
    <div className="home-desc">
      {homeDescs.map(({ attributes, id }) => (
        <p key={id}>{attributes.text}</p>
      ))}
    </div>
  );
};

export default HomeDesc;
