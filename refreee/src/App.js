import "./assets/main.scss";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router />
      </Provider>
    </>
  );
}

export default App;
