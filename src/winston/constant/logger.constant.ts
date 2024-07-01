export enum LoggerConstant {
    APOSTROPHE = '',

    TIME_STAMP = 'YYYY-MM-DD, HH:mm:ss.SSS',
    DATE_PATTERN = 'YYYY-MM-DD-HH',
    DEFAULT_TAG = 'Nest',
    DEFAULT_ENABLED = 'true',

    //Tag
    REQUEST = 'Request',
    RESPONSE = 'Response',
    EXCEPTION = 'Exception',
    DEBUG = 'DEBUG',
    WARN = 'WARN',
    INFO = 'INFO',
    ERROR = 'ERROR',

    //PROTOCOL
    PROTOCOL_TCP = 'tcp',
    PROTOCOL_UDP = 'udp',
    PROTOCOL_PORT = 'port',
    PROTOCOL_HTTP = 'http',

    //SEND LOG
    TYPE_SOCKET = 'udp4',
    EMIT_EVENT = 'logged',
    CLIENT_ERROR_EVENT = 'error',

    INFO_TAG = '@tags',
    INFO_LEVEL = '@level',
    INFO_FROM = '@from',

    TIME_OUT = 3,
    RECONNECT_INTERVAL = 600000,
    APPLICATION_MONITOR = 'ApplicationMonitor',

    //Type transport
    LOGSTASH = 'Logstash',
    FLUENTBIT = 'FluentBit',
}
