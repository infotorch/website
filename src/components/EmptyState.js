import React, { Component } from "react"

import PropTypes from "prop-types"

class EmptyState extends Component {
  render() {
    // Properties
    const { type, size, padding, icon, title, description } = this.props

    let fontSize
    let variant

    if (size === "small") {
      fontSize = "h3.fontSize"
      variant = "h6"
    } else if (size === "medium") {
      fontSize = "h2.fontSize"
      variant = "h5"
    } else if (size === "big") {
      fontSize = "h1.fontSize"
      variant = "h4"
    }

    if (type === "content") {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            paddingTop: "25px",
          }}
          // position="absolute"
          // top="50%"
          // left="50%"
          margin="0 auto"
          textAlign="center"
        >
          {icon && (
            <div clone color="text.secondary" fontSize={fontSize}>
              {icon}
            </div>
          )}

          {title && (
            <span color="textSecondary" variant={variant}>
              {title}
            </span>
          )}

          {description && (
            <span color="textSecondary" variant="body1">
              {description}
            </span>
          )}
        </div>
      )
    }

    if (type === "card") {
      return (
        <div padding={padding} textAlign="center">
          {icon && (
            <div clone color="text.secondary" fontSize={fontSize}>
              {icon}
            </div>
          )}

          {title && (
            <span color="textSecondary" variant={variant}>
              {title}
            </span>
          )}

          {description && (
            <span color="textSecondary" variant="body1">
              {description}
            </span>
          )}
        </div>
      )
    }

    return null
  }
}

EmptyState.defaultProps = {
  type: "content",
  size: "medium",
  padding: 2,
}

EmptyState.propTypes = {
  // Properties
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  padding: PropTypes.number,
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default EmptyState
