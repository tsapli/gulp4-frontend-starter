import LazyLoad from 'vanilla-lazyload';
import canUseWebp from '../helpers/canUseWebp';

export default () => {
  if (canUseWebp() === false) {
    const LazyBgItems = document.querySelectorAll('.lazy[data-bg-fallback]');

    LazyBgItems.forEach((item) => {
      const scrBgFallback = item.getAttribute('data-bg-fallback');
      item.setAttribute('data-bg', scrBgFallback);
    });
  }
  // eslint-disable-next-line no-unused-vars
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
  });
};
