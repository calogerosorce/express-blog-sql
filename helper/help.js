
const tag = (tagName) => {
    if (tagName) {
        return tagName?.charAt(0).toUpperCase() + tagName.slice(1)
    }
};

const posFil = (posts, res, id) => {
    if (posts && posts.length > 0) {
        const postId = Number(id)


        const postFilter = posts.find(item => item.id === postId)

        if (!postFilter) {
            return res.status(404).json({
                error: true,
                message: "Not found!"
            })
        }
        return postFilter
    }
}

module.exports = {
    tag,
    posFil
}