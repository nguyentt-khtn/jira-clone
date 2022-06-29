import React from 'react'
import style from './Loading.module.css'
import { useSelector } from 'react-redux'

export default function Loading() {

    const loading = useSelector(state => state.LoadingReducer.loading)
    if (loading) {
        return (
            <div className={style.bgLoading}>
                <img src={require('../../assets/ImgLoading/Loading.gif')} alt='loading' />
            </div>
        )
    }else return ''
}
