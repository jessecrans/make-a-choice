"use client";

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import { useState } from 'react'

const Navbar = () => {
    const [folded, setFolded] = useState(false);

    const handleFolding = () => {
        setFolded(prev => !prev);
    }

    return (
        <nav>
            {
                folded ?
                    <button
                        className="fixed top-0 right-0 m-4 text-white text-xl z-10"
                        onClick={handleFolding}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    :
                    <>
                        <button
                            className="fixed top-0 right-0 m-4 text-white text-xl z-10"
                            onClick={handleFolding}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <div className="fixed top-0 right-0 h-full w-64 bg-neutral-800 p-8 text-2xl font-extrabold border-l-2 border-purple-600">
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li className="text-purple-600 hover:text-purple-800"><Link href="/wheel">Wheel</Link></li>
                            </ul>
                        </div>
                    </>
            }
        </nav>
    )
}

export default Navbar;