import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      App Layout
      <Outlet />
    </div>
  );
}
