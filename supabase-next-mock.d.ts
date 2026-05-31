declare module "next/headers" {
  export interface CookieStore {
    getAll(): Array<{ name: string; value: string; options?: any }>;
    setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>): void;
    get(name: string): { name: string; value: string } | undefined;
    set(name: string, value: string, options?: any): void;
  }
  export function cookies(): Promise<CookieStore>;
}

declare module "next/server" {
  export class NextRequest {
    cookies: {
      getAll(): Array<{ name: string; value: string; options?: any }>;
      get(name: string): { name: string; value: string } | undefined;
      set(name: string, value: string): void;
    };
    headers: any;
  }
  export class NextResponse {
    static next(options?: any): NextResponse;
    cookies: {
      set(name: string, value: string, options?: any): void;
    };
  }
}
