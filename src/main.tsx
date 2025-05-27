import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
import { UserProvider } from "@context/UserContext";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
<UserProvider>
  <AppRouter />
</UserProvider>
)
;
