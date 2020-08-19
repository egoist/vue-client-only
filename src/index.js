/* global window */

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
  render(h, { parent, slots, props }) {
    const { default: defaultSlot = [], placeholder: placeholderSlot } = slots()

    const isServerRendered =
      !parent._isMounted || // default detection
      Boolean(window.__PRERENDER_STATUS) || // prerender-spa-plugin
      window.navigator.userAgent === 'ReactSnap' // react-snap

    if (!isServerRendered) {
      return defaultSlot
    }

    parent.$once('hook:mounted', () => {
      parent.$forceUpdate()
    })

    if (props.placeholderTag && (props.placeholder || placeholderSlot)) {
      return h(
        props.placeholderTag,
        {
          class: ['client-only-placeholder']
        },
        props.placeholder || placeholderSlot
      )
    }

    // Return a placeholder element for each child in the default slot
    // Or if no children return a single placeholder
    return defaultSlot.length > 0 ? defaultSlot.map(() => h(false)) : h(false)
  }
}
