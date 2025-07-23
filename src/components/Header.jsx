import React from "react";
import { FaRegListAlt } from "react-icons/fa";

const Header = (props) => {
  return (
    <div className="row">
      <div className="col py-5">
        <h1 className="d-flex align-items-center justify-content-center">
          <FaRegListAlt className="me-2" />
          {props.title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
