async function hello(req, res) {
    res.json({
        success: true,
        error: []
    })
}

module.exports = hello;