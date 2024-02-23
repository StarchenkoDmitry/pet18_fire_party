import { config } from "dotenv";

export const ENVIROMENT_LIST = ["test", "development", "production", "provision"];

function createEnvPath(): string {
    const NODE_ENV = process.env.NODE_ENV;
    const WORKING_DIR = process.cwd();

    if (!NODE_ENV) {
        return `${WORKING_DIR}/.env`;
    }

    if (ENVIROMENT_LIST.includes(NODE_ENV)) {
        return `${WORKING_DIR}/.env.${NODE_ENV}`;
    } else {
        throw new Error(`NODE_ENV:'${NODE_ENV}' dont exist in ENVIROMENT_LIST`);
    }
}

export class Config {
    static get SSL_SWITCH(): boolean {
        const ssl_switch = process.env.SSL_SWITCH;
        if (ssl_switch === "ON") {
            return true;
        } else if (ssl_switch === "OFF") {
            return false;
        } else {
            throw new Error("SSL_SWITCH must be [ON|OFF]");
        }
    }

    static get COOKIE_SECRET(): string {
        const secret = process.env.COOKIE_SECRET;
        if (typeof secret === "string" && secret.length > 0) {
            return secret;
        } else {
            throw new Error("COOKIE_SECRET is not exist");
        }
    }

    static get PORT() {
        const port = parseInt(process.env.PORT);
        console.log("POOORT: ", port);
        return port;
    }

    static get EnvName() {
        const NODE_ENV = process.env.NODE_ENV || "";
        return NODE_ENV;
    }

    static {
        const envPath = createEnvPath();
        config({
            path: envPath,
            override: true,
        });
    }
}
