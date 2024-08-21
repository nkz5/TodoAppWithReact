import { Button, Dialog, DialogActions, TextField } from "@mui/material";

type Props = {
  text: string;
  dialogOpen: boolean;
  onSubmit: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  ontToggleDialog: () => void;
};

export const FormDialog = (props: Props) => (
  <Dialog fullWidth open={props.dialogOpen} onClose={props.ontToggleDialog}>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <div style={{ margin: "1em" }}>
        <TextField
          aria-label="todo-input"
          variant="standard"
          style={{
            width: "100%",
            fontSize: "16px",
            fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          }}
          label="タスクを入力..."
          autoFocus
          value={props.text}
          onChange={(e) => props.onChange(e)}
        />
        <DialogActions>
          <Button
            variant="contained"
            onClick={props.onSubmit}
            color="secondary"
            aria-label="form-add"
          >
            追加
          </Button>
        </DialogActions>
      </div>
    </form>
  </Dialog>
);
