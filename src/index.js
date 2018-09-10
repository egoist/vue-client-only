export default {
  name: 'no-ssr',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
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

    return h(
      props.placeholderTag,
      {
        class: ['no-ssr-placeholder']
      },
      props.placeholder || placeholderSlot
    )
  }
}
