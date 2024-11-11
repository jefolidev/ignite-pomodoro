import { HeaderContainer } from './styles'

import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import ignite from '../../assets/ignite.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={ignite} alt="" />
      <nav>
        <NavLink to={'/'} title="Timer">
          <Timer size={26} />
        </NavLink>
        <NavLink to={'/history'} title="Histórico">
          <Scroll size={26} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
