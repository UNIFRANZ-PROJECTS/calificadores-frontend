export default function log({ next, to }) {
    console.log('LOG '+to.name);
  
    return next();
  }