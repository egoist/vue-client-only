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
    const { default: defaultSlot = [], placeholder: placeholderSlot } = slots()

    if (parent._isMounted) {
      return defaultSlot
    }

    parent.$once('hook:mounted', () => {
      parent.$forceUpdate()
    })

    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
      return h(
        props.placeholderTag,
        {
          class: ['no-ssr-placeholder']
        },
        props.placeholder || placeholderSlot
      )
    }

    // return a placeholder element for each child in the default slot
    // or if no children return a single placeholder
    return defaultSlot.length ? defaultSlot.map(() => h(false)) : h(false)
  }
}
