import { serve } from "http";
import epto from "../src/server/app.ts";
import { error } from "../src/server/handler.ts";

serve(epto, { port: 3001, onError: error });
