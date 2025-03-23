import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios, { RawAxiosRequestHeaders } from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const onCatchError = (error: any) => {
    const errorMsg = error?.message
      ? error?.message
      : "Oops, looks like something went wrong :(";
    window.dispatchEvent(
      new CustomEvent("global-toast", {
        detail: { message: errorMsg, severity: "error" },
      })
    );
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    if (!file) return;
    const token = localStorage.getItem("authorization_token");

    const headers: Partial<RawAxiosRequestHeaders> = {};
    if (token) {
      headers.Authorization = `Basic ${token}`;
    }

    try {
      // Get the presigned URL
      const response = await axios({
        method: "GET",
        url,
        params: {
          name: encodeURIComponent(file.name),
        },
        headers: {
          Authorization: token ? `Basic ${token}` : null,
        },
      }).catch((error) => {
        onCatchError(error);
      });
      console.log("File to upload: ", file.name);

      if (!response?.data) return;
      console.log("Uploading to: ", response.data);
      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });
      console.log("Result: ", result);
      setFile(undefined);
      window.dispatchEvent(
        new CustomEvent("global-toast", {
          detail: {
            message: "File was successfully uploaded",
            severity: "success",
          },
        })
      );
    } catch (error) {
      console.log(error);
      onCatchError(error);
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
