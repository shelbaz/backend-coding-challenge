import winston from "winston";

let LOGGER_LEVEL = "info";

export const logFormatFactory = (logInfo) => {
    let date = new Date().toLocaleString();
    return `${date} - ${logInfo.level}: ${logInfo.message}`;
};

const logFormat = winston.format.printf((logInfo) => {
    return logFormatFactory(logInfo);
});

export const logger = winston.createLogger({
    level: LOGGER_LEVEL,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat,
            )
        }),
    ],
});