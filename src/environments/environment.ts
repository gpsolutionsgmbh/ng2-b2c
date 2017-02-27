// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  mockApi: true,
  api: {
    url: 'http://37.187.148.231/gptp/api/',
    apiKey: 'ROIw7Hy0Ps8enuIA7ynvimDp3OF+NoGtGHQBXKRfnbM='
  },
  googleApiKey: 'AIzaSyB3pDrfikCa8E_5twxILBe2mlZm-JHhqh8'
};
