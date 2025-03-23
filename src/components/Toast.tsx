import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

export const Toast: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("error");

  useEffect(() => {
    const handleToast = (event: CustomEvent) => {
      setMessage(event.detail.message);
      setSeverity(event.detail.severity || "error");
      setOpen(true);
    };

    window.addEventListener("global-toast", handleToast as EventListener);
    return () =>
      window.removeEventListener("global-toast", handleToast as EventListener);
  }, []);

  return (
    <>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
