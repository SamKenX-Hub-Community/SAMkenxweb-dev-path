import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Nav.module.scss';
import { headerNavLinks } from '../utils/links';
import Image from 'next/image';

export default function Nav() {
  const [active, setActive] = useState(false);

  //This function fixes the Navlinks position if the hamburger menu is left open while resizing the window
  useEffect(() => {
    function setTrueSize() {
      if (window.innerWidth >= 768) setActive(false);
    }
    window.addEventListener('resize', setTrueSize);

    return () => window.removeEventListener('resize', setTrueSize);
  });

  const toggleActive = () => {
    setActive(active => !active);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} ${styles.row}`}>
        <div className={styles.align}>
          <Link href="/" passHref>
            <a>
              <Image
                src="/images/svg/logo.svg"
                height={115.54}
                width={180}
                alt="Logo"
              />
            </a>
          </Link>
          <button
            className={styles.navToggle}
            aria-label="open navigation"
            onClick={toggleActive}
          >
            <span className={styles.hamburger} />
          </button>
        </div>
        <nav className={`${active ? styles.navVisible : styles.nav}`}>
          <ul className={styles.navList}>
            {headerNavLinks.map(link => (
              <li className={styles.navItem} key={link.href}>
                <Link href={link.href}>
                  <a className={styles.navLink} title={link.text}>
                    {link.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
