import styled from 'styled-components'
import { shade } from 'polished'

import signInBackgroundImg from '../../assets/sign-in-background.png'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;// Itens filhos
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center ;
  width: 100%;
  max-width: 700px;
  align-items: center;

  h2 {
    color: #ffffff;
  }

  p {
    color: #ffffff;
  }
`
