import React, { useEffect, useRef } from 'react';
import { ReactComponent as Travel } from './assets/travel.svg';
import gsap from 'gsap';

const App = (): JSX.Element => {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapper.current === null) return;

    const elements = wrapper.current.children[0];

    const line = elements.querySelector('#line');

    const person = elements.querySelector('#person');
    const head = elements.querySelector('#head');
    const cloudR = elements.querySelector('#cloudR');
    const cloudL = elements.querySelector('#cloudL');
    const sun = elements.querySelector('#sun');

    if (line === null || head === null) return;

    const tl: GSAPTimeline = gsap.timeline();

    tl.set(elements, { visibility: 'visible' });
    tl.set(head, { transformOrigin: '10% 85%' });

    tl.from(person, { x: 100, opacity: 0, duration: 0.5, delay: 1 })
      .from(line.children, {
        scale: 0,
        duration: 0.23,
        stagger: 0.23,
        delay: 0.5,
      })
      .addLabel('sky')
      .from(cloudR, { duration: 1, x: 100, opacity: 0 }, 'sky+=0.5')
      .from(cloudL, { duration: 1, x: -100, opacity: 0 }, 'sky+=0.3')
      .from(sun, { duration: 1, y: 100, x: 100, opacity: 0 }, 'sky')
      .to(head, { rotate: '20deg', duration: 0.5 })
      .to(head, { rotate: '0deg', duration: 0.5, delay: 0.5 });
  }, []);

  return (
    <div ref={wrapper} className='travel'>
      <Travel />
    </div>
  );
};

export default App;
