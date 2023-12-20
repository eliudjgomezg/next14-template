import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Home from 'components/Home'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('main')

    expect(heading).toBeInTheDocument()
  })
})
