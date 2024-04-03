// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: {logistica: 'http://localhost:3000/', armazem:'http://localhost:5001/', planeamento:'http://localhost:4201/'},
  roles: {admin: '609dce1d-b1a0-4898-b490-2738b963c67f', warehouse: 'ec89216d-dd33-4822-b80e-40bd910dfbd2', logistics: '765784b7-7b42-4e9e-bf9f-58bc5439cb25', shipping: '0523e4a7-4e3f-4c9a-bc7b-d7569bad5ff3'}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
