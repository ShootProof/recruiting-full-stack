import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import AppContext from './AppContext'


function PhotoTreeList({ nodes }) {
  const { webserviceUrl } = useContext(AppContext)

  // handle collapsed state server sync
  function updateCollapsedState(originalElemClicked) {
    const elems = originalElemClicked
      // maintain component context when selecting for tree items.
      .closest('.component-photo-tree')
      .querySelectorAll('li')

    const idToCollapsedStateMap = {}
    for (let i = 0; i < elems.length; i += 1) {
      const nodeId = elems[i].getAttribute('data-node-id')
      const isCollapsed = elems[i].classList.contains('collapsed')
      idToCollapsedStateMap[nodeId] = isCollapsed
    }

    fetch(`${webserviceUrl}?action=setNodesCollapsedState`,
      {
        method: 'POST',
        body: JSON.stringify({ nodeIdToCollapsedStateMap: idToCollapsedStateMap }),
      })
      .then(response => response.json())
      // .catch(app/component-specific handler as appropriate)
  }

  // handle collapsed state display updates.
  function handleTreeItemClick(target) {
    const elem = target.closest('li')

    // nothing to do if there are no children.
    if (!elem.classList.contains('has-children')) {
      return
    }

    // set everything below to collapsed first.
    // this allows the "collapsing of all sub folders effect" when items are collapsed
    // (rather than just collapsing the folder directly below, although showing only the folder directly below).
    const elems = elem.querySelectorAll('li, span.expanders')
    for (let i = 0; i < elems.length; i += 1) {
      const theElem = elems[i]
      theElem.classList.add('collapsed')
    }

    // then update current element collapsed state as necessary.
    const isCollapsed = elem.classList.contains('collapsed')
    if (isCollapsed) {
      elem.classList.remove('collapsed')
    }
    else {
      elem.classList.add('collapsed')
    }

    const expanders = elem.querySelectorAll('span.expanders')
    if (isCollapsed) {
      expanders[0].classList.remove('collapsed')
    }
    else {
      expanders[0].classList.add('collapsed')
    }

    updateCollapsedState(target)
  }

  if (nodes) {
    return (
      <ul className="component-photo-tree-list">
        {nodes.map(node => (
          <li
            key={node.id}
            data-node-id={node.id}
            className={`line-data ${node.collapsed ? 'collapsed' : ''} ${node.children.length ? 'has-children' : ''}`}
          >
            <div
              className={`line-data ${node.children.length ? 'has-children' : ''}`}
              onClick={e => handleTreeItemClick(e.target)}
              onKeyPress={e => handleTreeItemClick(e.target)}
              role="button"
              tabIndex="0"
            >
              <img
                src={node.thumbnail.href}
                alt={node.thumbnail.description}
                title={node.thumbnail.description}
              />
              <span className="node-name">{node.name}</span>
              {node.children.length
                ? (
                  <span
                    className={`expanders ${node.collapsed ? 'collapsed' : ''}`}
                  >
                    <span className="icon-right">&#9656;</span>
                    <span className="icon-down">&#9662;</span>
                  </span>
                )
                : ''}
            </div>
            {node.children.length ? <PhotoTreeList nodes={node.children} /> : ''}
          </li>
        ))}
      </ul>
    )
  }

  return ''
}

PhotoTreeList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    parent: PropTypes.number,
  })).isRequired,
}


export default PhotoTreeList
