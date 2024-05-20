import "luch-request"

declare module "luch-request" {
  export interface HttpRequestConfig {
    custom?: {
      baseURLName?: string
    }
  }
}
