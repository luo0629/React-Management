import {RouterProvider} from "react-router";
import router from "./routes/index.tsx"
function App() {

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
