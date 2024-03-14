import React, { useEffect, useState } from "react";

import "./errorNotification.scss";

const ErrorNotification = ({ error }) => {
  const [visible, setVisible] = useState(true);
  const { status, data } = error;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className="status-message">
      <div className="notif notif-color-1 notif-active">
        <p>Status: {status} - <br /> {
          Object.entries(data)
            .map(([key, messages]) => `${key}: ${messages.join('\n')}`)
            .join('\n')
        }</p>
        <div className="notif-progress"></div>
      </div>
    </div>
  ) : null;
};

export default ErrorNotification;
