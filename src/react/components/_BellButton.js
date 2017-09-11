import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { closeInformation,
  showInformation
} from 'transactions-interface-state'
import { getNormalizerEntities } from 'transactions-redux-normalizer'

import Button from './Button'
import Icon from './Icon'

const BellButton = ({ closeInformation,
  isEmpty,
  isInformationActive,
  isNewNotification,
  showInformation
}) => {
  const classes = classnames({
    'bell-button--inactivated': isEmpty
  }, 'bell-button')
  return (<Button
      className={classes}
      disabled={isEmpty}
      onClick={e => {
        e.preventDefault()
        if (!isInformationActive && !isEmpty) {
          showInformation()
        } else {
          // For keyboard users.
          // Not used for mouseclicks, instead we capture clicks via dismiss overlay
          closeInformation()
        }
      }}
    >
      <Icon
        className='bell-button__icon'
        icon='bell'
      />
      {
        isNewNotification && (<svg className='bell-button__alert'>
          <circle className='bell-button__alert__circle' />
        </svg>)
      }
    </Button>)
}

BellButton.propTypes = { closeInformation: PropTypes.func.isRequired,
  isInformationActive: PropTypes.bool.isRequired,
  onTopOfDarkSection: PropTypes.bool,
  showInformation: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const { information: {
      isActive
    }
  } = state
  const notifications = getNormalizerEntities(state, 'notifications')
  const isEmpty = notifications.length === 0
  const isNewNotification = notifications.find(({isSeen}) => !isSeen)
  return { isEmpty,
    isInformationActive: isActive,
    isNewNotification
  }
}
export default connect(mapStateToProps, { closeInformation,
  showInformation
})(BellButton)