import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("cadastro", "routes/cadastro.tsx"),
  route("principal", "routes/principal.tsx"),
] satisfies RouteConfig;
