import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from "./auth";

const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>()]
});

export default authClient;