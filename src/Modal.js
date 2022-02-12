import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");
const Modal = ({ children }) => {
  // refs help if theres something you only want 1 of that stays between rerenders, here we only ever want 1 div created
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    // append this to the DOM
    modalRoot.appendChild(elRef.current);
    // removing/cleaning up an effect after its done
    return () => modalRoot.removeChild(elRef.current);
  }, []); // empty [] = happens once

  //rendering this to the dom @ this location ('modal' in index.html for this one)
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
