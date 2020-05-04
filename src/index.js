export default {
  name: 'ClientOnly',
  functional: true,
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: 'div'
    }
  },
  render(h, { parent, scopedSlots, props }) {

    if (parent._isMounted) {
      return scopedSlots.default(undefined);
    }

    parent.$once('hook:mounted', () => {
      parent.$forceUpdate()
    })

    const placeholderSlot = scopedSlots.placeholder(undefined) || [];

    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
      return h(
        props.placeholderTag,
        {
          class: ['client-only-placeholder']
        },
        props.placeholder || placeholderSlot
      )
    }

    const defaultSlot = scopedSlots.default(undefined) || [];

    // Return a placeholder element for each child in the default slot
    // Or if no children return a single placeholder
    return defaultSlot.length > 0 ? defaultSlot.map(() => h(false)) : h(false)
  }
}
