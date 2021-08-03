import Link from 'next/link';

export default function Header() {
    return(
      <header>
        <h1 className='logo'>
          <Link href="/">
            <a>Go<span>Book</span></a>
          </Link>
        </h1>
      </header>
    )
}
