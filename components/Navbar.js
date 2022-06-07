import Link from 'next/link';
import styles from './Navbar.module.css';

import { auth, googleProvider } from '../firebaseConfig';
import { signOut, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

const Navbar = ({ isLoggedIn }) => {
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    router.push('/home');
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    await signInWithPopup(auth, googleProvider);
    router.push('/onboard-user');
  };

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
          {isLoggedIn ? (
            <Link href='/requests/create'>
              <a>Request</a>
            </Link>
          ) : null}
          {isLoggedIn ? (
            <Link href='/requests/open'>
              <a>Resolve</a>
            </Link>
          ) : null}
          {isLoggedIn ? (
            <Link href='/create-resource'>
              <a>Post</a>
            </Link>
          ) : null}
          <Link href='/login'>
            {isLoggedIn ? (
              <a onClick={logout}>Logout</a>
            ) : (
              <a onClick={signInWithGoogle}>Login</a>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
