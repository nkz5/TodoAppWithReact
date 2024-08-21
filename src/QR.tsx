import { QRCode } from "react-qrcode-logo";

import { Backdrop } from "@mui/material";
import { styled } from "@mui/material/styles";

const TodoBackDrop = styled(Backdrop)(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
}));

type Props = {
    open: boolean;
    onClose: () => void;
};

export const QR = (props: Props) => (
    <TodoBackDrop open={props.open} onClick={props.onClose}>
        <QRCode value="https://howcollect.jp/" />
    </TodoBackDrop>
);