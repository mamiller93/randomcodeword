// Types for compiled templates
declare module 'elevator/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';

  const tmpl: TemplateFactory;
  export default tmpl;
}
