import { initializeDB } from "./db";
import { Server } from "./server"

export const main = async () => {

    /* Validate DB Connection & Load Models & Create missing tables, columns */
    await initializeDB();
    await new Server().initializeResources();
}

main();