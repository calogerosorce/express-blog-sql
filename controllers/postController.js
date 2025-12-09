const posts = require('../posts/posts')
const { tag, posFil } = require('../helper/help')
const connection = require('../database/connection')


const index = (req, res) => {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        res.json(results);
    })


    /*  let postFilter = posts
     const currentTag = tag(req?.query?.tag);
 
     if (currentTag) {
         postFilter = posts.filter(item => item.tags.includes(currentTag))
     }
     res.json(postFilter) */
}

const show = (req, res) => {

    const id = Number(req.params.id)

    const sql = 'SELECT * FROM posts WHERE id = ?';
    const sqlTags = 'SELECT * FROM tags JOIN post_tag ON post_tag.tag_id = tags.id WHERE post_tag.post_id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        if (results.length === 0) return res.status(404).json({ error: true, message: 'Post not found' })

        const post = results[0]

        connection.query(sqlTags, [id], (errTags, resTags) => {
            post.tag = resTags
            res.json(post)
        })
    })

    /*  const postFilter = posFil(posts, res, req.params.id);
 
     res.json(postFilter)*/
}

const store = (req, res) => {
    const newPost = {
        id: Date.now(),
        ...req.body
    }

    posts.push(newPost)
    res.status(201).json(newPost)
}

const update = (req, res) => {
    const postData = req.body
    const postFilter = posFil(posts, res, req.params.id);

    postFilter.title = postData.title
    postFilter.content = postData.content
    postFilter.image = postData.image
    postFilter.tags = postData.tags

    res.json(postFilter)
}

const modify = (req, res) => {
    res.send(`Modify the post whith ${req.params.id}`)
}

const destroy = (req, res) => {

    const id = Number(req.params.id)

    const sql = 'DELETE FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })

        return res.sendStatus(204)
    })
    /* const postFilter = posFil(posts, res, req.params.id);

    posts.splice(posts.indexOf(postFilter), 1)

    res.sendStatus(204) */
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}