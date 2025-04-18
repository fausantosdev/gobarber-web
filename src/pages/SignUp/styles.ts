import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import signInBackgroundImg from '../../assets/sign-up-background.png'

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

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition:  color 0.2s;

        &:hover {
          color: ${shade(0.2, '#f4ede8')};
        }
    }
  }

  > a {
        color: #ff9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition:  color 0.2s;
        display: flex;
        align-items: center;

        &:hover {
          color: ${shade(0.2, '#ff9000')};
        }

        svg {
          margin-right: 16px;
        }
    }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform:  translateX(50px);
  }
  to {
     opacity: 1;
     transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4edeb;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition:  color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4edeb')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition:  color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
}
`
