import { memo, useState, useId } from "react";
import { useFormikContext } from "formik";
import uploadIcon from "../../assets/upload-file-icon.svg"

import "./fileLoaderField.scss";

const FileLoaderField = memo(({ name, label = "" }) => {
  const { setFieldValue, values } = useFormikContext();
  const [fileName, setFileName] = useState(values[name].name);
  const id = useId();

  return (
    <div className="file">
      <h2 className="label">{label}</h2>
      <div className="file__inner">
        <label className="btn-upload" htmlFor={id}>
          Upload <img src={uploadIcon} alt="file-icon" />
        </label>
        {fileName && <p className="file__name">{fileName}</p>}
        <input
          id={id}
          type="file"
          onChange={(event) => {
            if (event.currentTarget.files) {
              setFieldValue(name, event.currentTarget.files[0]);
              setFileName(event.currentTarget.files[0].name);
            }
          }} />
      </div>
    </div>
  )
});

export default FileLoaderField;