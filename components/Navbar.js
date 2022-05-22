import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = ({ isLoggedIn }) => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.brand}>
          <Link href='/home'>
            <a>LearnUp</a>
          </Link>
        </div>
        <div className={styles.links}>
          <Link href='/home'>
            <a>Home</a>
          </Link>
          <Link href='/subjects'>
            <a>Categories</a>
          </Link>
          {isLoggedIn ? (
            <Link href='/profile'>
              <a>Profile</a>
            </Link>
          ) : null}
          <Link href='/featured'>
            <a>Featured</a>
          </Link>
          {isLoggedIn ? (
            <Link href='/login'>
              <a>Logout</a>
            </Link>
          ) : (
            <a>Login</a>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
