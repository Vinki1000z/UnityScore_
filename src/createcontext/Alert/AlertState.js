import React, { useState } from "react";
import Alertcontext from "./AlertContext";

function Alertstate(props) {
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const showalert = (alert) => {
    const { grole, gmsg, gshow } = alert;
    setRole(grole);
    setMsg(gmsg);
    setShow(gshow);

    // Automatically hide the alert after a certain time (optional)
    setTimeout(() => {
      setShow(false);
    }, 3000); // 3 seconds
  };

  return (
    <>
      <Alertcontext.Provider value={{ showalert }}>
        {show && (
          <div
            key={msg} // Use a unique key for each alert
            className={`alert alert-${role} alert-dismissible position-fixed top-0 start-50 translate-middle-x mt-3`}
            style={{ zIndex: 1050, width: '50%' }}
            role="alert"
          >
            {msg}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setShow(false)}
            ></button>
          </div>
        )}
        {props.children}
      </Alertcontext.Provider>
    </>
  );
}

export default Alertstate;
