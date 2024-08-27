import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../index.vue'

describe('Button', () => {
  test('should emit click event', () => {
    const wrapper = mount(Button)
    wrapper.find('.ml-button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  test('should not emit click event when disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })

    wrapper.find('.ml-button').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  test('should not emit click event when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })

    wrapper.find('.ml-button').trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  test('should render correct type', () => {
    const mlBtn = mount(Button, {
      props: {
        type: 'outline'
      }
    })

    expect(mlBtn.classes()).toContain('ml-button-outline')
  })
})
