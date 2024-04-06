import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { App as AntdApp } from "antd";

import Layout from "./components/layout";
import { resources } from "@/config/resources";
import { authProvider, dataProvider, liveProvider } from "./providers";
import Create from "./pages/company/create";
import EditPage from "./pages/company/edit";
import TasksCreatePage from "./components/tasks/create";
import TasksEditPage from "./components/tasks/edit";
import { Home, ForgotPassword, Login, Register, CompanyList } from "./pages";

import "@refinedev/antd/dist/reset.css";
import TasksListPage from "./pages/tasks/list";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "fH7Q0p-zLNGaT-etMA1c",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route 
                    element={<Authenticated 
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                      >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }>
                    <Route index element={<Home />} />
                    <Route path="/companies" >
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<EditPage />} />
                    </Route>
                    <Route path="/tasks" element={
                      <TasksListPage>
                        <Outlet />
                      </TasksListPage>
                    }>
                      <Route path="new" element={<TasksCreatePage />} />
                      <Route path="edit/:id" element={<TasksEditPage />} />
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
