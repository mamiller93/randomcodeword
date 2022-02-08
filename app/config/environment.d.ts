export default config;

/**
 * Type declarations for
 *    import config from 'randomcodeword/config/environment'
 */
declare const config: {
  environment: string;
  modulePrefix: string;
  podModulePrefix: string;
  locationType: string;
  rootURL: string;
  EmberENV: {
    URL: string;
  };
  APP: Record<string, unknown>;
};
