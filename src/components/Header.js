import Link from 'next/link';
import Image from 'next/image'
import bibiLogo from '../images/bibi.svg'
import styles from './header.module.css'

export default function Header() {
    return(
      <header className={styles.header}>
        <h1>
          <Link href="/">
            <a className={styles.logo}>
              <Image src={bibiLogo}
              alt='Logo da bibi'
              width={100}
              height={100}/>
              Bibi
            </a>
          </Link>
        </h1>
      </header>
    )
}
