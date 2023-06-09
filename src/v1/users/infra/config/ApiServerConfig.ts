export class ApiServerConfig {
  public static readonly HOST = process.env.API_HOST;

  public static readonly PORT = process.env.API_PORT;

  public static readonly ACCESS_TOKEN_SECRET =
    process.env.API_ACCESS_TOKEN_SECRET;

  public static readonly ACCESS_TOKEN_TTL_IN_MINUTES =
    process.env.API_ACCESS_TOKEN_TTL_IN_MINUTES;

  public static readonly ACCESS_TOKEN_HEADER =
    process.env.API_ACCESS_TOKEN_HEADER;

  public static readonly LOGIN_USERNAME_FIELD =
    process.env.API_LOGIN_USERNAME_FIELD;

  public static readonly LOGIN_PASSWORD_FIELD =
    process.env.API_LOGIN_PASSWORD_FIELD;

  public static readonly LOG_ENABLE = process.env.API_LOG_ENABLE;
}
