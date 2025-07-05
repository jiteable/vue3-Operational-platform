declare module 'nprogress' {
  interface NProgress {
    start(): NProgress;
    done(force?: boolean): NProgress;
    inc(amount?: number): NProgress;
    set(n: number): NProgress;
    configure(options: {
      minimum?: number;
      template?: string;
      easing?: string;
      speed?: number;
      trickle?: boolean;
      trickleSpeed?: number;
      showSpinner?: boolean;
      parent?: string;
    }): NProgress;
    status: number | null;
    remove(): void;
  }
  const nprogress: NProgress;
  export default nprogress;
}