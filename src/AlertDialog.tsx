import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Alert = styled(Dialog)(() => ({
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));

type Props = {
  alertOpen: boolean;
  onEmpty: () => void;
  onToggleAlert: () => void;
};

export const AlertDialog = (props: Props) => (
  <Alert open={props.alertOpen} onClose={props.onToggleAlert}>
    <DialogTitle>アラート</DialogTitle>
    <DialogContent>
      <DialogContentText>本当にゴミ箱を完全に空にしますか？</DialogContentText>
      <DialogContentText>この操作は取り消しできません。</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        aria-label="alert-cancel"
        onClick={props.onToggleAlert}
        color="primary"
      >
        キャンセル
      </Button>
      <Button
        aria-label="alert-ok"
        onClick={() => {
          props.onToggleAlert();
          props.onEmpty();
        }}
        color="secondary"
      >
        OK
      </Button>
    </DialogActions>
  </Alert>
);
