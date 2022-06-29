import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {

    const state = useSelector(state => state.UserReducer.user)

    return (
        <div>
            {state.name}
            <img src={state.avatar} alt={state.avatar} />
        </div>
    )
}
