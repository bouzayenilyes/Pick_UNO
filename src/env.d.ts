/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_LIVEBLOCKS_API_KEY: string;
  readonly PUBLIC_UPLOAD_API_KEY: string;
  readonly PUBLIC_ASSETS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}