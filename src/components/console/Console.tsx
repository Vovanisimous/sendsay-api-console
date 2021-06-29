import React, { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

export const Console = () => {
  const [value, setValue] = useState({});

  return (
    <div>
      <JSONInput
        id="a_unique_id"
        theme={"light_mitsuketa_tribute"}
        locale={locale}
        height="550px"
      />
    </div>
  );
};
