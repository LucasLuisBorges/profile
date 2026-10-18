import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except Next internals and files with an extension (images, CVs, favicon).
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
};
