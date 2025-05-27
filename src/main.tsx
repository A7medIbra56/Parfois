import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
import { MyContextProvider } from "@context/UserContext";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
<MyContextProvider>
  <AppRouter />
</MyContextProvider>
)
;
