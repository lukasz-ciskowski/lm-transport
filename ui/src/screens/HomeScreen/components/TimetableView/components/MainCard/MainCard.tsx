import React from 'react'
import * as S from "./styles"

interface Props {
    children: React.ReactNode
}

function MainCard({ children }: Props) {
    return (
        <S.CardBox>
            {children}
        </S.CardBox>
    )
}

export default MainCard
