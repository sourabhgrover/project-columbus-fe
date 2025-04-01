import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";

export const Login = lazy(() => import("../pages/login"));
export const Home = lazy(() => import("../pages/home"));
export const SetTargets = lazy(() => import("../pages/SetTargets"));
export const Settings = lazy(() => import("../pages/Settings"));
export const ControlFlow = lazy(() => import("../pages/ControlFlow"));
export const PageNotFound = lazy(() => import("../pages/page-not-found"));
export const AddBusinessTerm = lazy(() => import("../pages/addBusinessTerm"));
export const AddUseCase = lazy(() => import("../pages/addUseCase"));
export const SourceSystem = lazy(() => import("../pages/sourceSystem"));
export const BusinessGlossary = lazy(() => import("../pages/businessGlossary"));
export const BusinessTerms = lazy(() => import("../pages/businessTerms"));
export const AddBusinessGlossary = lazy(() => import("../pages/addBusinessGlossary"));
export const UseCaseCatalog = lazy(() => import("../pages/useCaseCatalog"));
export const AddYourData = lazy(() => import("../pages/addYourData"));
export const RequestData = lazy(() => import("../pages/requestNewData"));
export const SourceSystemDetails = lazy(() => import("../pages/SourceSystemDetails"));
export const UseCaseDetails = lazy(() => import("../pages/useCaseDetails"));
export const ViewBusinessTerm = lazy(() => import("../pages/viewBusinessTerm"));
export const ManageOwnership = lazy(() => import("../pages/ManageOwnership"));



export default function Router() {
  const routes = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <Home />, index: true },
        { path: 'settings', element: <Settings /> },
        { path: 'set-targets', element: <SetTargets /> },
        { path: 'add-business-glossary', element: <AddBusinessGlossary /> },
        // { path: 'add-business-term', element: <AddBusinessTerm /> },
        { path: 'add-business-term/:id', element: <AddBusinessTerm /> },
        { path: 'add-use-case', element: <AddUseCase /> },
        { path: 'source-system', element: <SourceSystem /> },
        { path: 'source-system/:id', element: <SourceSystemDetails /> },
        { path: 'home', element: <Home /> },
        // { path: 'business-terms', element: <BusinessTerms /> },
        { path: 'business-terms/:id', element: <BusinessTerms /> },
        { path: 'business-glossary', element: <BusinessGlossary /> },
        { path: 'business-glossary/:id', element: <ViewBusinessTerm /> },
        { path: 'use-case-catalog', element: <UseCaseCatalog /> },
        { path: 'use-case-catalog/:id', element: <UseCaseDetails /> },
        { path: 'add-your-data', element: <AddYourData /> },
        { path: 'request-new-data', element: <RequestData /> },
        { path: 'view-business-term', element: <ViewBusinessTerm /> },
        { path: 'manage-ownership', element: <ManageOwnership /> },
        // { path: 'use-case-details', element: <UseCaseDetails /> }
      ],
    },
    {
      path: "/404",
      element: <PageNotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
