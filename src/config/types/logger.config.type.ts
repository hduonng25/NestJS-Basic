export type LoggerConfigType = {
    log: LogConfigType;
    logStash: LogstashConfigType;
    fluentBit: FluentBitConfigType;
    enable: {
        logFile: boolean;
        logStash: boolean;
        fluentBit: boolean;
    };
};

export type LogConfigType = {
    logLevel: string[];
    maxFiles: string;
    maxSize: string;
    fileName: string;
};

export type LogstashConfigType = {
    host: string;
    port: number;
    protocol: string;
};

export type FluentBitConfigType = Partial<LogstashConfigType> & { prefix: string };
