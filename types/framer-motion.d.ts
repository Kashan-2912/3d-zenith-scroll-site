import 'framer-motion';

declare module 'framer-motion' {
  export interface HTMLMotionProps<T> {
    initial?: any;
    animate?: any;
    exit?: any;
    whileInView?: any;
    whileHover?: any;
    whileTap?: any;
    viewport?: any;
    transition?: any;
  }
}
