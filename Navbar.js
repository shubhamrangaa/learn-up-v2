import Link from "next/link";

const Navbar = ({ isLoggedIn }) => {
  return (
    <>
      <Link href="/home">
        <a>Home</a>
      </Link>
      <Link href="/subjects">
        <a>Categories</a>
      </Link>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
      <Link href="/test">
        <a>Test</a>
      </Link>
      {isLoggedIn ? (
        <Link href="/login">
          <a>Login</a>
        </Link>
      ) : (
        "not logged in"
      )}
    </>
  );
};

export default Navbar;
