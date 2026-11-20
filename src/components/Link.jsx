import { transitionRoute } from './Curtain';

export default function Link({ to, children, ...rest }) {
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    transitionRoute(to);
  };
  return <a href={to} onClick={onClick} {...rest}>{children}</a>;
}
