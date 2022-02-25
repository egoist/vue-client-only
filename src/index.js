export default {
  name: 'ClientOnly',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    },
    placeholderClass: {
      type: String,
      default: 'client-only-placeholder'
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
          class: [props.placeholderClass]
        },
        props.placeholder || placeholderSlot
      )
    }

    // Return a placeholder element for each child in the default slot
    // Or if no children return a single placeholder
    return defaultSlot.length > 0 ? defaultSlot.map(() => h(false)) : h(false)
  }
}
