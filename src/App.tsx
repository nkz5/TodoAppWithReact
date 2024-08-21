import { useEffect, useState } from "react";

import localforage from "localforage";

import GlobalStyles from "@mui/material/GlobalStyles";
import { TodoBar } from "./TodoBar";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";
import { QR } from "./QR";
import { AlertDialog } from "./AlertDialog.tsx";

import { createTheme, ThemeProvider } from "@mui/material";
import { indigo, pink } from "@mui/material/colors";

import { isTodos } from "./lib/isTodo.ts";

//themeを作成
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: "#757de8",
      dark: "#002984",
    },
    secondary: {
      main: pink[500],
      light: "#ff6090",
      dark: "#b0003a",
    },
  },
});

export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDoalogOpen] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleSubmit = () => {
    if (!text) {
      setDoalogOpen((dialogOpen) => !dialogOpen);
      return;
    }

    const nweTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos((todos) => [nweTodo, ...todos]);

    setText("");

    setDoalogOpen((dialogOpen) => !dialogOpen);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id == id) return { ...todo, [key]: value };
        else return todo;
      });
      return newTodos;
    });
  };

  const handleEmpty = () => {
    /**
     * シャローコピーの弱点は配列要素の一段階目までしかコピーされず、二段階目以降はもとの配列を参照して新しい配列を変更すると元の配列も変更されてしまう
     * 削除して新しい配列にした場合、変わるのは一段階目の要素のみなのでimutableを維持することができる
     */
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const handleToggleQr = () => {
    setQrOpen((qrOpen) => !qrOpen);
    console.log("toggleQr");
  };

  const handleToggleDialog = () => {
    setDoalogOpen((dialogOpen) => !dialogOpen);
    setText("");
  };

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };

  useEffect(() => {
    localforage
      .getItem("todo-20240819")
      .then((values) => isTodos(values) && setTodos(values));
  }, []);

  useEffect(() => {
    localforage.setItem("todo-20240819", todos);
  }, [todos]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <TodoBar filter={filter} onToggleDrawer={handleDrawerOpen} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleDrawerOpen}
        onToggleQR={handleToggleQr}
        onSort={handleSort}
      />
      <QR open={qrOpen} onClose={handleToggleQr} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        ontToggleDialog={handleToggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleEmpty}
        onToggleAlert={handleToggleAlert}
      />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  );
};
