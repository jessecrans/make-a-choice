import { faCircleNotch, faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const GameCard = ({
    title,
    icon,
    iconString
}: {
    title: string
    icon?: IconDefinition
    iconString?: string
}) => {
  return (
    <Link 
        className="flex flex-col justify-center items-center gap-4 text-purple-500 hover:border-purple-400 transition rounded-xl shadow-xl border-4 border-purple-300 py-8 px-16 min-w-64 text-2xl"
        href={`/${title}`}
    >
        <h2 className="tracking-widest capitalize">{title}</h2>
        {
            icon ? 
            <FontAwesomeIcon icon={icon} />
            : iconString ?
            <p>{iconString}</p> : ""
        }
    </Link>
  )
}

export default GameCard