interface ToastProps {
  open: boolean;
  message: string;
}

export const Toast = ({ open, message }: ToastProps) => {
  return (
    open && (
      <div
        style={{
          position: "absolute",
          padding: "5px",
          top: "20px",
          left: "20px",
          border: "solid",
          borderWidth: "1px",
          borderColor: "white",
        }}
      >
        <p>{message}</p>
      </div>
    )
  );
};
