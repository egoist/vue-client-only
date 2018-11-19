export default {
  name: 'no-ssr',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    },
    noPlaceholder: {
      type: Boolean,
      default: false
    }
  },
  render(h, { parent, slots, props }) {
    const { default: defaultSlot, placeholder: placeholderSlot } = slots()

    if (parent._isMounted) {
      return defaultSlot
    }

    parent.$once('hook:mounted', () => {
      parent.$forceUpdate()
    })

    if (props.noPlaceholder) {
      return null
    }

    return h(
      props.placeholderTag,
      {
        class: ['no-ssr-placeholder']
      },
      props.placeholder || placeholderSlot
    )
  }
}
