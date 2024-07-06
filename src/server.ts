import http from "http"
import express from "express"
import "./config/logging"
import { loggingHandler } from "./middleware/loggingHandler"
import { corsHandler } from "./middleware/corsHandler"
import { routeNotFound } from "./middleware/routeNotFound"
import { SERVER } from "./config/config"

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>

export const Main = () => {
    logging.info("----------------------------");
    logging.info("Intializing API")
    logging.info("----------------------------");

    application.use(express.urlencoded({ extended: true }))
    application.use(express.json())

    logging.info("Logging and Configuration")
    logging.info("----------------------------");

    application.use(loggingHandler)
    application.use(corsHandler)

    logging.info("Define Controller Routes")
    logging.info("----------------------------");

    application.get("/main/healthcheck", (req, res, next) => {
        return res.status(200).json({ hello: "world" });
    });

    logging.info("Define Controller Routes")
    logging.info("----------------------------");
    application.use(routeNotFound)


    logging.info("Start Server")
    logging.info("----------------------------");

    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info("Server Started: " + SERVER.SERVER_HOSTNAME + ":" + SERVER.SERVER_PORT)
        logging.info("----------------------------");
    });

};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
