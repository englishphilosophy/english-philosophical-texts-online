import { serve } from "http";
import router from "../src/server/router.ts";
import { error } from "../src/server/handler.tsx";

serve(router, { port: 3002, onError: error });
