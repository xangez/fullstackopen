import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test.skip('renders content', () => {
  const blog = {
    title: 'baking cake',
    author: 'billy',
    url: 'asdf',
    user: 'bob',
  }

  const component = render(<Blog blog={blog} />)

  // component.debug()

  expect(component.container).toHaveTextContent('baking cake')

  // const blogDiv = component.container.querySelector('.blog')
  // console.log(prettyDOM(blogDiv))
})

describe('Blog', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'baking cake',
      author: 'billy',
      url: 'asdf',
      user: 'bob',
    }

    component = render(<Blog blog={blog} addUpvote={mockHandler} />)
  })

  test.skip('url and likes are hidden', () => {
    const div = component.container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

  test.skip('after clicking button, url and likes are shown', () => {
    const div = component.container.querySelector('.toggleableContent')
    const button = component.container.querySelector('.viewButton')
    fireEvent.click(button)
    expect(div).toHaveStyle('display: block')
  })

  test.skip('if upvote button is clicked twice, the event handler is called twice', () => {
    const button = component.container.querySelector('.upvoteButton')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
