const createNodes = (payload, nodeSchema) => {
    Object.entries(payload).forEach(nodeSchema)
}

const createNodesFromList = (payload, nodeSchema) => {
    payload.forEach(nodeSchema)
}

module.exports = {
    createNodes,
    createNodesFromList
}
