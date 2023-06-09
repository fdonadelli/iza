export class DatabaseConfig {
  public static readonly DB_HOST = process.env.DB_HOST;

  public static readonly DB_PORT = parseInt(process.env.DB_PORT);

  public static readonly DB_USERNAME = process.env.DB_USERNAME;

  public static readonly DB_PASSWORD = process.env.DB_PASSWORD;

  public static readonly DB_NAME = process.env.DB_NAME;

  public static readonly DB_LOG_ENABLE = process.env.DB_LOG_ENABLE;
}
