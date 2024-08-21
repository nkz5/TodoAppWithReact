import { Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { indigo, lightBlue, pink } from "@mui/material/colors";

import Avatar from "@mui/material/Avatar";

import pjson from "../package.json";

const DrawerList = styled('div')(() => ({
    width: 250,
}));

const DrawerHeader = styled('div')(() => ({
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
    backgroundColor: indigo[500],
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const DrawerAvater = styled(Avatar)(({ theme }) => ({
    backgroundColor: pink[500],
    width: theme.spacing(6),
    height: theme.spacing(6),
}));

type Props = {
    drawerOpen: boolean;
    onToggleDrawer: () => void;
    onToggleQR: () => void;
    onSort: (filter: Filter) => void;
};

export const SideBar = (props: Props) => (
    <Drawer
        variant="temporary"
        open={props.drawerOpen}
        onClose={props.onToggleDrawer}
    >
        <DrawerList role="presentation" onClick={props.onToggleDrawer}>
            <DrawerHeader>
                <DrawerAvater>
                    <Icon>create</Icon>
                </DrawerAvater>
                <p>TODO v{pjson.version}</p>
            </DrawerHeader>
            <List>
                <ListItem disablePadding>
                    <ListItemButton aria-label="list-all" onClick={() => props.onSort('all')}>
                        <ListItemIcon>
                            <Icon>subject</Icon>
                        </ListItemIcon>
                        <ListItemText secondary="全てのタスク" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        aria-label="list-unchecked"
                        onClick={() => props.onSort('unchecked')}
                    >
                        <ListItemIcon>
                        <Icon sx={{ color: lightBlue[500] }}>radio_button_unchecked</Icon>
                        </ListItemIcon>
                        <ListItemText secondary="現在のタスク" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        aria-label="list-checked"
                        onClick={() => props.onSort('checked')}
                    >
                        <ListItemIcon>
                        <Icon sx={{ color: pink.A200 }}>check_circle_outline</Icon>
                        </ListItemIcon>
                        <ListItemText secondary="完了したタスク" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        aria-label="list-removed"
                        onClick={() => props.onSort('removed')}
                    >
                        <ListItemIcon>
                        <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText secondary="ごみ箱" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton
                        aria-label="list-share"
                        onClick={props.onToggleQR}
                    >
                        <ListItemIcon>
                            <Icon>share</Icon>
                        </ListItemIcon>
                        <ListItemText secondary="このアプリを共有" />
                    </ListItemButton>
                </ListItem>
            </List>
        </DrawerList>
    </Drawer>

    // <select defaultValue="all" onChange={(e) => props.onSort(e.target.value as Filter)}>
    //     <option value="all">全てのタスク</option>
    //     <option value="checked">完了したタスク</option>
    //     <option value="unchecked">現在のタスク</option>
    //     <option value="removed">ゴミ箱</option>
    // </select>
)