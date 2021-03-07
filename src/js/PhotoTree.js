import React, { useState, useEffect, useContext } from 'react'

import PhotoTreeList from './PhotoTreeList'
import AppContext from './AppContext'


function PhotoTree() {
  const [nodes, setNodes] = useState([])
  const { webserviceUrl } = useContext(AppContext)

  // build out nested structure from node list for recursive rendering.
  function getRecursiveTree(_nodes) {
    // index by node.id
    let tree = {}
    for (let i = 0; i < _nodes.length; i += 1) {
      const node = _nodes[i]
      tree[node.id] = node
    }

    // take advantage of the fact that objects are references
    // so they can be both iterated over and moved within their parent element.
    for (let i = 0; i < _nodes.length; i += 1) {
      const node = _nodes[i]

      if (node.parent !== null) {
        if (typeof tree[node.parent].children === 'undefined') {
          tree[node.parent].children = {}
        }

        tree[node.parent].children[node.id] = node
      }
    }

    // delete the top-level item object refs in the object that don't have a parent
    // (since they've been moved under their correct parents at this point)
    for (let i = 0; i < _nodes.length; i += 1) {
      if (_nodes[i].parent !== null) {
        delete tree[_nodes[i].id]
      }
    }

    // convert the recursive object to an array since there is no
    // react PropTypes.objectOf style validation.
    function convertToArray(_tree) {
      const treeAr = []
      let i = 0

      Object.values(_tree).forEach((value) => {
        treeAr[i] = value
        if (treeAr[i].children) {
          treeAr[i].children = convertToArray(treeAr[i].children)
        }
        else {
          treeAr[i].children = []
        }
        i += 1
      })

      return treeAr
    }

    tree = convertToArray(tree)

    return tree
  }

  function initializePhotoTree() {
    fetch(`${webserviceUrl}?action=getNodes`)
      .then(response => response.json())
      .then((data) => {
        setNodes(getRecursiveTree(data))
      })
      // .catch(app/component-specific handler as appropriate)
  }

  useEffect(initializePhotoTree, [])


  return (
    <div className="component-photo-tree">
      Photo Tree:
      <PhotoTreeList nodes={nodes} />
    </div>
  )
}


export default PhotoTree
