declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_API_URL: string;
  readonly CYPRESS_email: string;
  readonly CYPRESS_password: string;
  // @ts-expect-error env.d.ts
  [key: string]: any;
}

declare interface ImportMeta {
  readonly env: Env;
}
